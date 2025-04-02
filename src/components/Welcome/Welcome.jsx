import cx from 'clsx'; // for conditional classNames
import { motion } from 'motion/react';
import { Text, Title, useMantineColorScheme } from '@mantine/core';
import { usePrimaryColor } from '../../theme/usePrimaryColor';
import { Navbar } from '../NavBar/navBar';
import classes from './Welcome.module.css';

export function Welcome() {
  const { colorScheme } = useMantineColorScheme();
  const isDark = colorScheme === 'dark';
  const navColor = usePrimaryColor(9, 3);

  return (
    <>
      <Navbar />
      <div className={classes.homeHeader}>
        <motion.div
          className={cx(classes.bgImage, classes.darkBg)}
          animate={{ opacity: isDark ? 1 : 0 }}
          transition={{ duration: 0.6, ease: 'easeInOut' }}
        />
        <motion.div
          className={cx(classes.bgImage, classes.lightBg)}
          animate={{ opacity: isDark ? 0 : 1 }}
          transition={{ duration: 0.6, ease: 'easeInOut' }}
        />
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
            <button key={label} className={cx(classes.navButton, { [classes.dark]: isDark })}>
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
