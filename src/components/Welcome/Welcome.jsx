import { useEffect, useState } from 'react';
import cx from 'clsx'; // for conditional classNames
import { AnimatePresence, motion } from 'motion/react';
import { Text, Title, useMantineColorScheme } from '@mantine/core';
import { usePrimaryColor } from '../../theme/usePrimaryColor';
import { Navbar } from '../NavBar/navBar';
import classes from './Welcome.module.css';

import '../../hover.css';

export function Welcome() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const { colorScheme } = useMantineColorScheme();
  const isDark = colorScheme === 'dark';
  const navColor = usePrimaryColor(9, 3);

  return (
    <>
      <Navbar />
      <div className={classes.homeHeader}>
        <AnimatePresence mode="sync" initial={false}>
          {isDark ? (
            <motion.div
              key="dark"
              className={cx(classes.bgImage, classes.darkBg)}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.6, ease: 'easeInOut' }}
            />
          ) : (
            <motion.div
              key="light"
              className={cx(classes.bgImage, classes.lightBg)}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.6, ease: 'easeInOut' }}
            />
          )}
        </AnimatePresence>
        <div className={classes.progPedals}>
          <Title className={classes.title}>
            <Text className={classes.title} variant="gradient" component="span">
              progressive
            </Text>

            <Text className={classes.title2} component="span" c={'lightest'}>
              pedals
            </Text>
          </Title>
        </div>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.5, ease: 'easeInOut', staggerChildren: 0.3 }}
          className={cx(classes.navButtons, { [classes.dark]: isDark })}
        >
          {['about', 'products', 'contact'].map((label) => (
            <button
              key={label}
              className={cx(classes.navButton, 'hvr-shutter-in-horizontal', {
                [classes.dark]: isDark,
              })}
            >
              {label}
            </button>
          ))}
        </motion.div>
        <div className={classes.slogan}>
          <Title c={navColor}>progressive tools for progressive players</Title>
        </div>
      </div>
    </>
  );
}
