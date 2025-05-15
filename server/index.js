require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const session = require('express-session');
const MongoStore = require('connect-mongo');
const cors = require('cors');

const app = express();

// Middleware
const allowedOrigins = [
  'http://localhost:5173',
  'https://progpedals.com',
  'https://api.progpedals.com',
];

const corsOptions = {
  origin: function (origin, callback) {
    // console.log('Incoming origin:', origin);
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Blocked by CORS'));
    }
  },
  credentials: true,
};

app.use(cors(corsOptions));
// app.options('*', cors(corsOptions));

const sendOrderEmail = require('./utils/sendOrderEmail');

app.post('/webhook', express.raw({ type: '*/*' }), async (req, res) => {
  // console.log('🔥🔥🔥 Hit webhook route');
  const sig = req.headers['stripe-signature'];
  let event;

  try {
    // console.log('⚡ raw body length:', req.body?.length);
    // console.log('⚡ stripe-signature:', req.headers['stripe-signature']);

    event = stripe.webhooks.constructEvent(req.body, sig, process.env.STRIPE_WEBHOOK_SECRET);
    // console.log(`✅ Received event: ${event.type}`);
  } catch (err) {
    // console.error('⚠️ Webhook signature verification failed:', err.message);
    return res.status(400).send(`Webhook Error: ${err.message}`);
  }
  // console.log('✅ Received Stripe event:', event.type);

  if (event.type === 'checkout.session.completed') {
    const session = event.data.object;

    // console.log('🔥 Session metadata:', session.metadata);
    // console.log('🔥 Customer details:', session.customer_details);

    let cart = [];
    try {
      cart = JSON.parse(session.metadata.cart_json || '[]');
    } catch (e) {
      console.warn('❌ Failed to parse cart_json metadata:', e.message);
    }

    // console.log('📦 Calling sendOrderEmail with:', {
    //   customerName: session.customer_details?.name,
    //   customerEmail: session.customer_details?.email,
    //   cart,
    //   totalPrice: (session.amount_total / 100).toFixed(2),
    //   totalDonation: session.metadata?.total_donation || '0',
    // });
    try {
      await sendOrderEmail({
        customerName: session.customer_details.name,
        customerEmail: session.customer_details.email,
        cart,
        totalPrice: (session.amount_total / 100).toFixed(2),
        totalDonation: session.metadata.total_donation || '0',
      });
      console.log('✅ Order email sent!');
    } catch (err) {
      console.error('❌ Failed to send order email:', err.response?.data || err.message);
    }
  }

  res.status(200).json({ received: true });
});

app.use(express.json());

// MongoDB connection
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

app.set('trust proxy', 1);

// Sessions
// TODO: uncomment for local production, comment out other session
// app.use(
//   session({
//     secret: process.env.SESSION_SECRET,
//     resave: false,
//     saveUninitialized: false,
//     store: MongoStore.create({ mongoUrl: process.env.MONGO_URI }),
//     cookie: {
//       maxAge: 1000 * 60 * 60 * 24 * 7, // 1 week
//       httpOnly: true,
//     },
//   })
// );

const isProd = process.env.NODE_ENV === 'production';

app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    store: MongoStore.create({ mongoUrl: process.env.MONGO_URI }),
    cookie: {
      httpOnly: true,
      sameSite: 'none',
      secure: true,
      maxAge: 1000 * 60 * 60 * 24 * 7,
    },
  })
);

app.get('/debug-cookie', (req, res) => {
  res.cookie('testCookie', '123abc', {
    sameSite: 'none',
    secure: true,
    httpOnly: true,
  });
  res.send('Set testCookie');
});

// Routes

const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

// Get cart from session
app.get('/api/cart', (req, res) => {
  if (!req.session.cart) {
    req.session.cart = [];
  } else {
    // Mark session as modified to force cookie write
    req.session.touch();
  }

  res.json({ cart: req.session.cart });
});

app.post('/api/cart', cors({ origin: allowedOrigins, credentials: true }), (req, res) => {
  const { cart } = req.body;
  if (!Array.isArray(cart)) {
    return res.status(400).json({ error: 'Cart must be an array' });
  }

  req.session.cart = cart;
  res.json({ success: true, cart: req.session.cart });
});

app.post('/api/create-checkout-session', async (req, res) => {
  const cart = req.body.cart;

  if (!Array.isArray(cart) || cart.length === 0) {
    return res.status(400).json({ error: 'Cart is empty or invalid' });
  }

  try {
    const line_items = cart.map((item) => ({
      price_data: {
        currency: 'usd',
        product_data: {
          name: item.title,
          description: item.charity?.name || '',
        },
        unit_amount: Math.round(item.totalPrice * 100), // convert to cents
      },
      quantity: 1,
    }));

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      mode: 'payment',
      line_items,
      success_url: `${process.env.DOMAIN}/thank-you?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.DOMAIN}/cart`,
      metadata: {
        cart_json: JSON.stringify(
          cart.map((item) => ({
            slug: item.slug,
            quantity: item.quantity,
            totalDonation: item.totalDonation,
            totalPrice: item.totalPrice,
          }))
        ),
        total_donation: cart.reduce((sum, item) => sum + (item.totalDonation || 0), 0),
      },
    });

    res.json({ url: session.url });
  } catch (err) {
    console.error('Stripe session creation failed:', err.message);
    res.status(500).json({ error: 'Something went wrong' });
  }
});

// Start server
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
