require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const session = require('express-session');
const MongoStore = require('connect-mongo');
const cors = require('cors');

const app = express();

// Middleware
const allowedOrigins = ['http://localhost:5173', 'https://www.progpedals.com'];

app.use(
  cors({
    origin: allowedOrigins,
    credentials: true,
  })
);

app.options(
  '/*',
  cors({
    origin: allowedOrigins,
    credentials: true,
  })
);

app.use(express.json());

// MongoDB connection
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

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
      maxAge: 1000 * 60 * 60 * 24 * 7,
      httpOnly: true,
      sameSite: isProd ? 'none' : 'lax',
      secure: isProd,
    },
  })
);

// Routes

// Get cart from session
app.get('/api/cart', (req, res) => {
  if (!req.session.cart) {
    req.session.cart = [];
  }
  res.json({ cart: req.session.cart });
});

// Update cart in session
app.post('/api/cart', (req, res) => {
  const { cart } = req.body;
  if (!Array.isArray(cart)) {
    return res.status(400).json({ error: 'Cart must be an array' });
  }

  req.session.cart = cart;
  res.json({ success: true, cart: req.session.cart });
});

// Start server
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
