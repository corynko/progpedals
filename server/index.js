// server/index.js
require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const session = require('express-session');
const MongoStore = require('connect-mongo');

const app = express();

// 1. Connect to MongoDB
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// 2. Middleware
app.use(cors({
  origin: process.env.FRONTEND_URL,  // e.g. http://localhost:3000
  credentials: true,
}));
app.use(express.json());

// 3. Session (stores cart data)
app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false,
  store: MongoStore.create({ mongoUrl: process.env.MONGO_URI }),
  cookie: {
    maxAge: 1000 * 60 * 60 * 24 * 7, // one week
    httpOnly: true,
  },
}));

// 4. Simple Cart Routes
app.get('/api/cart', (req, res) => {
  // initialize empty cart if first time
  req.session.cart = req.session.cart || [];
  res.json({ cart: req.session.cart });
});

app.post('/api/cart', (req, res) => {
  // req.body should be { items: [...] }
  req.session.cart = req.body.items;
  res.json({ ok: true, cart: req.session.cart });
});

// placeholder for orders
app.post('/api/orders', async (req, res) => {
  // later: validate, save to DB, clear session.cart
  res.json({ ok: true });
});

// 5. Serve built React (optional)
if (process.env.NODE_ENV === 'production') {
  app.use(express.static('../client/dist'));
  app.get('*', (_, res) => {
    res.sendFile(path.resolve(__dirname, '../client/dist/index.html'));
  });
}

// 6. Launch
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log(`API listening on ${PORT}`));
