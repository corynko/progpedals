import { useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { useMantineColorScheme } from '@mantine/core';
import { useBackground } from './contexts/backgroundContext';

export function BackgroundManager() {
  const { backgrounds } = useBackground();
  const { colorScheme } = useMantineColorScheme();
  const isDark = colorScheme === 'dark';

  const currentBg = isDark ? backgrounds.dark : backgrounds.light;
  const [visibleBg, setVisibleBg] = useState(currentBg);
  const [prevBg, setPrevBg] = useState(null);
  const timeoutRef = useRef(null);

  useEffect(() => {
    if (!currentBg || currentBg === visibleBg) return;

    setPrevBg(visibleBg);

    timeoutRef.current = setTimeout(() => {
      setVisibleBg(currentBg);
      setPrevBg(null);
    }, 50);

    return () => clearTimeout(timeoutRef.current);
  }, [currentBg, visibleBg]);

  return (
    <>
      <AnimatePresence mode="sync">
        {prevBg && (
          <motion.div
            key={prevBg + '-exit'}
            style={{
              position: 'fixed',
              inset: 0,
              backgroundImage: `url(${prevBg})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              backgroundRepeat: 'no-repeat',
              zIndex: -1,
            }}
            initial={{ opacity: 1 }}
            animate={{ opacity: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.6, ease: 'easeInOut' }}
          />
        )}
      </AnimatePresence>

      {visibleBg && (
        <motion.div
          key={visibleBg + '-enter'}
          style={{
            position: 'fixed',
            inset: 0,
            backgroundImage: `url(${visibleBg})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat',
            zIndex: -2,
          }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, ease: 'easeInOut' }}
        />
      )}
    </>
  );
}
