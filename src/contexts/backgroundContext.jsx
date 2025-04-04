// background-context.jsx
import { createContext, useContext, useState } from 'react';

const BackgroundContext = createContext(null);

export function BackgroundProvider({ children }) {
  const [backgrounds, setBackgrounds] = useState({
    light: '',
    dark: '',
  });

  return (
    <BackgroundContext.Provider value={{ backgrounds, setBackgrounds }}>
      {children}
    </BackgroundContext.Provider>
  );
}

export function useBackground() {
  const context = useContext(BackgroundContext);
  if (!context) throw new Error('useBackground must be used within BackgroundProvider');
  return context;
}
