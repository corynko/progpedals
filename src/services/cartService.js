// src/services/cartService.js

// TODO: uncomment the following for local dev
// const API_URL = 'http://localhost:4000/api/cart';
const API_URL = 'https://progpedals.onrender.com/api/cart';

export async function getCart() {
  try {
    const res = await fetch(API_URL, {
      credentials: 'include',
    });
    const data = await res.json();
    return data.cart;
  } catch (error) {
    console.error('Failed to load cart:', error);
    return [];
  }
}

export async function saveCart(cart) {
  try {
    const res = await fetch(API_URL, {
      method: 'POST',
      credentials: 'include',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ cart }),
    });
    const data = await res.json();
    return data.cart;
  } catch (error) {
    console.error('Failed to save cart:', error);
  }
}
