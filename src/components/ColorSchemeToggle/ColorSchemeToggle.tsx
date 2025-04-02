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
          <motion.svg
            key={isDark ? 'moon' : 'sun'}
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            exit={{ pathLength: 0 }}
            transition={{ duration: 0.4, ease: 'easeInOut' }}
          >
            {isDark ? (
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
            ) : (
              <motion.g
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                exit={{ pathLength: 0 }}
                transition={{ duration: 0.4, ease: 'easeInOut' }}
              >
                <circle cx="12" cy="12" r="5" stroke={navColor} strokeWidth="3" />
                <line x1="12" y1="1" x2="12" y2="3" stroke={navColor} strokeWidth="3" />
                <line x1="12" y1="21" x2="12" y2="23" stroke={navColor} strokeWidth="3" />
                <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" stroke={navColor} strokeWidth="3" />
                <line
                  x1="18.36"
                  y1="18.36"
                  x2="19.78"
                  y2="19.78"
                  stroke={navColor}
                  strokeWidth="3"
                />
                <line x1="1" y1="12" x2="3" y2="12" stroke={navColor} strokeWidth="3" />
                <line x1="21" y1="12" x2="23" y2="12" stroke={navColor} strokeWidth="3" />
                <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" stroke={navColor} strokeWidth="3" />
                <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" stroke={navColor} strokeWidth="3" />
              </motion.g>
            )}
          </motion.svg>
        </AnimatePresence>
      )}
    </ActionIcon>
  );
}
