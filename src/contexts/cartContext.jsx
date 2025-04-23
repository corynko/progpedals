import { createContext, useContext, useState } from 'react';

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);

  const addToCart = (product, extraDonation = 0) => {
    setCart((prev) => [
      ...prev,
      {
        ...product,
        extraDonation,
        totalPrice: product.minimumPrice + extraDonation,
      },
    ]);
  };

  const updateDonation = (slug, newDonation) => {
    setCart((prev) =>
      prev.map((item) =>
        item.slug === slug
          ? {
              ...item,
              extraDonation: newDonation,
              totalPrice: item.minimumPrice + newDonation,
            }
          : item
      )
    );
  };

  const removeFromCart = (slug) => {
    setCart((prev) => prev.filter((item) => item.slug !== slug));
  };

  return (
    <CartContext.Provider value={{ cart, addToCart, updateDonation, removeFromCart }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);
