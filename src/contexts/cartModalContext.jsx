// /contexts/CartModalContext.jsx
import { createContext, useContext, useState } from 'react';

const CartModalContext = createContext();

export function CartModalProvider({ children }) {
  const [isCartOpen, setIsCartOpen] = useState(false);

  const openCart = () => setIsCartOpen(true);
  const closeCart = () => setIsCartOpen(false);
  const toggleCart = () => setIsCartOpen((prev) => !prev);

  return (
    <CartModalContext.Provider value={{ isCartOpen, openCart, closeCart, toggleCart }}>
      {children}
    </CartModalContext.Provider>
  );
}

export const useCartModal = () => {
  const ctx = useContext(CartModalContext);
  if (!ctx) throw new Error('useCartModal must be used within a CartModalProvider');
  return ctx;
};
