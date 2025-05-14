import { createContext, useContext, useEffect, useMemo, useState } from 'react';
import debounce from 'lodash.debounce';
import { getCart, saveCart } from '../services/cartService';

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);

  // Load cart once on mount
  useEffect(() => {
    getCart().then(setCart);
  }, []);

  // Debounced saveCart function (only re-created once)
  const debouncedSaveCart = useMemo(() => debounce(saveCart, 500), []);

  // Save cart on every change, but debounced
  useEffect(() => {
    debouncedSaveCart(cart);
  }, [cart, debouncedSaveCart]);

  useEffect(() => {
    return () => debouncedSaveCart.cancel();
  }, [debouncedSaveCart]);

  const addToCart = (product, extraDonation = 0) => {
    setCart((prevCart) => {
      const existing = prevCart.find((item) => item.slug === product.slug);

      if (existing) {
        return prevCart.map((item) =>
          item.slug === product.slug
            ? {
                ...item,
                quantity: item.quantity + 1,
                totalDonation: item.totalDonation + extraDonation,
                totalPrice:
                  item.minimumPrice * (item.quantity + 1) + item.totalDonation + extraDonation,
              }
            : item
        );
      } else {
        return [
          ...prevCart,
          {
            ...product,
            quantity: 1,
            totalDonation: typeof extraDonation === 'number' ? extraDonation : 5,
            totalPrice: product.minimumPrice + extraDonation,
          },
        ];
      }
    });
  };

  const updateDonation = (slug, newDonation) => {
    setCart((prev) =>
      prev.map((item) =>
        item.slug === slug
          ? {
              ...item,
              totalDonation: newDonation,
              totalPrice: item.minimumPrice * item.quantity + newDonation,
            }
          : item
      )
    );
  };

  const updateQuantity = (slug, newQuantity) => {
    setCart((prev) =>
      prev.map((item) =>
        item.slug === slug
          ? {
              ...item,
              quantity: newQuantity,
              totalPrice: item.minimumPrice * newQuantity + item.totalDonation,
            }
          : item
      )
    );
  };

  const removeFromCart = (slug) => {
    setCart((prev) => prev.filter((item) => item.slug !== slug));
  };

  return (
    <CartContext.Provider
      value={{ cart, addToCart, updateDonation, updateQuantity, removeFromCart }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);
