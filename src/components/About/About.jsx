import cx from 'clsx'; // for conditional classNames
import { AnimatePresence, motion } from 'motion/react';
import { Text, Title, useMantineColorScheme } from '@mantine/core';
import { usePrimaryColor } from '../../theme/usePrimaryColor';
import { Navbar } from '../NavBar/navBar';
import classes from './About.module.css';

import '../../hover.css';

export function About() {
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
      </div>
    </>
  );
}
