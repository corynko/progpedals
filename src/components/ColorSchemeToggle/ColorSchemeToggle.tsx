import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { ActionIcon } from '@mantine/core';

interface ColorSchemeToggleProps {
  navColor: string;
  isDark: boolean;
  toggleColorScheme: () => void;
}

export function ColorSchemeToggle({ navColor, isDark, toggleColorScheme }: ColorSchemeToggleProps) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <ActionIcon
      onClick={toggleColorScheme}
      variant="subtle"
      size="lg"
      aria-label="Toggle color scheme"
      style={{ transition: 'color 0.3s ease' }}
    >
      {mounted && (
        <AnimatePresence mode="wait" initial={false}>
          {isDark ? (
            <motion.svg
              key={isDark ? 'moon' : 'sun'}
              width="60"
              height="60"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              exit={{ pathLength: 0 }}
              transition={{ duration: 0.4, ease: 'easeInOut' }}
            >
              <motion.path
                d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"
                stroke={navColor}
                strokeWidth="2"
                fill="none"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                exit={{ pathLength: 0 }}
                transition={{ duration: 0.4, ease: 'easeInOut' }}
              />
            </motion.svg>
          ) : (
            <motion.svg
              key={isDark ? 'moon' : 'sun'}
              width="60"
              height="60"
              viewBox="0 0 63 63"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              // initial={{ pathLength: 0 }}
              // animate={{ pathLength: 1 }}
              // exit={{ pathLength: 0 }}
              // transition={{ duration: 0.4, ease: 'easeInOut' }}
            >
              <motion.path
                stroke={navColor}
                strokeWidth="2"
                fill="none"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                exit={{ pathLength: 0 }}
                transition={{ duration: 0.4, ease: 'easeInOut' }}
                stroke-miterlimit="10"
                d="M55.62 26.77c1.85.68 3.73 1.8 5.68 3.05l.2-.14c-1.11-4.19-4.86-5.86-8.58-5.5-1.11.11-2.16-.49-2.64-1.49l-.03-.06c-.84-1.77.43-3.83 2.38-3.81 1.95.02 4.07.41 6.3.92l.14-.2c-2.46-3.54-6.53-3.84-9.89-2.26-1.02.48-2.23.34-3.03-.45l-.12-.12c-1.36-1.33-.93-3.65.86-4.3 1.86-.68 4.04-1.04 6.36-1.34l.06-.23c-3.52-2.48-7.45-1.38-10.06 1.26-.79.8-1.98 1.08-3 .61-.06-.03-.11-.05-.17-.08-1.72-.79-2.11-3.11-.66-4.33 1.52-1.27 3.44-2.36 5.52-3.43l-.02-.24c-3.67-.99-6.68.74-8.41 3.48-1.05 1.66-2.82 2.69-4.78 2.66h-.26c-.98 0-1.7-.97-1.37-1.89.87-2.39 2.75-4.65 4.91-6.99l-.1-.22c-4.33.37-6.63 3.79-6.91 7.52-.08 1.09-.84 2.01-1.9 2.3h-.05c-1.91.53-3.74-1.11-3.37-3.05.36-1.89 1.12-3.89 1.99-5.97l-.17-.17c-3.9 1.81-4.91 5.73-3.96 9.31.3 1.13-.11 2.34-1.06 3.02l-.05.03c-1.56 1.11-3.76.23-4.09-1.65-.34-1.94-.32-4.13-.2-6.45l-.22-.1c-3.06 3.04-2.65 7.1-.51 10.13.65.92.72 2.14.08 3.06-.02.03-.05.06-.07.1-1.1 1.58-3.49 1.56-4.44-.11-.98-1.71-1.71-3.77-2.39-5.98l-.24-.02c-1.83 3.9-.07 7.57 2.98 9.69.92.64 1.41 1.76 1.12 2.85l-.03.12c-.48 1.86-2.73 2.66-4.2 1.42-1.5-1.27-2.89-2.96-4.3-4.8l-.23.06c-.38 4.25 2.47 7.08 6.01 8.06 1.15.32 2.02 1.26 2.14 2.45l.02.18c.19 1.86-1.59 3.26-3.32 2.65-1.9-.68-3.83-1.82-5.84-3.11l-.2.14c1.1 4.16 4.81 5.84 8.5 5.51 1.15-.1 2.25.51 2.75 1.55l.02.05c.83 1.74-.43 3.77-2.35 3.76-1.96-.01-4.1-.41-6.35-.92l-.14.2c2.46 3.54 6.53 3.84 9.89 2.26 1.02-.48 2.23-.34 3.03.45l.13.13c1.36 1.33.93 3.64-.85 4.29-1.87.68-4.05 1.05-6.38 1.34l-.06.23c3.49 2.46 7.38 1.4 9.99-1.18.85-.84 2.1-1.12 3.19-.62l.13.06c1.7.77 2.03 3.05.61 4.25-1.52 1.29-3.46 2.38-5.56 3.46l.02.24c3.67.99 6.68-.74 8.41-3.47 1.05-1.66 2.82-2.69 4.78-2.66h.26c.98 0 1.7.97 1.37 1.89-.87 2.39-2.75 4.65-4.91 6.99l.1.22c4.29-.37 6.59-3.73 6.9-7.42.1-1.13.85-2.11 1.94-2.41.02 0 .04 0 .05-.01 1.93-.53 3.71 1.12 3.34 3.08-.36 1.89-1.11 3.88-1.99 5.96l.17.17c3.89-1.8 4.91-5.71 3.96-9.28-.3-1.14.08-2.35 1.04-3.03.02-.01.03-.02.05-.03 1.55-1.11 3.76-.28 4.09 1.6.34 1.95.32 4.15.21 6.49l.22.1c3.06-3.04 2.65-7.1.51-10.13-.65-.92-.72-2.14-.08-3.06l.06-.09c1.1-1.59 3.5-1.57 4.45.11.97 1.71 1.7 3.76 2.39 5.97l.24.02c1.83-3.9.07-7.57-2.98-9.69-.92-.64-1.41-1.76-1.12-2.85.01-.05.03-.1.04-.15.48-1.85 2.71-2.64 4.17-1.41 1.51 1.27 2.91 2.97 4.32 4.82l.23-.06c.38-4.29-2.53-7.14-6.11-8.09-1.11-.29-1.94-1.21-2.03-2.35 0-.05 0-.1-.01-.15-.19-1.88 1.69-3.36 3.47-2.7ZM31.5 49.74c-10.06 0-18.24-8.18-18.24-18.24s8.18-18.24 18.24-18.24 18.24 8.18 18.24 18.24-8.18 18.24-18.24 18.24Z"
              />
            </motion.svg>
          )}
        </AnimatePresence>
      )}
    </ActionIcon>
  );
}
