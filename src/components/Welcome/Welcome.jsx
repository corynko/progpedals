import { useEffect, useState } from 'react';
import cx from 'clsx'; // for conditional classNames
import { motion } from 'motion/react';
import { Link } from 'react-router-dom';
import { Text, Title, useMantineColorScheme } from '@mantine/core';
import darkBg from '../../assets/png/EKP_CIR-60Dark.jpg';
import lightBg from '../../assets/png/EKP_CIR-69Light.jpg';
import { useBackground } from '../../contexts/backgroundContext';
import { usePrimaryColor } from '../../theme/usePrimaryColor';
import classes from './Welcome.module.css';

export function Welcome() {
  const { setBackgrounds } = useBackground();

  useEffect(() => {
    setBackgrounds({
      light: lightBg,
      dark: darkBg,
    });
  }, [setBackgrounds]);

  const { colorScheme } = useMantineColorScheme();
  const isDark = colorScheme === 'dark';
  const navColor = usePrimaryColor(9, 3);

  return (
    <>
      <div className={classes.content}>
        <div className={classes.progPedals}>
          <Text className={classes.title} variant="gradient" component="span">
            progressive
          </Text>

          <Text className={classes.title2} component="span" c={'lightest'}>
            pedals
          </Text>
        </div>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.5, ease: 'easeInOut', staggerChildren: 0.3 }}
          className={cx(classes.navButtons, { [classes.dark]: isDark })}
        >
          {['about', 'products', 'contact'].map((label) => (
            <Link
              key={label}
              to={`/${label}`}
              style={{ textDecoration: 'none' }}
              onMouseDown={(e) => {
                e.preventDefault();
                e.currentTarget.blur();
              }}
              className={cx(classes.navButton, 'hvr-glow', classes.hvr_underline_from_center, {
                [classes.dark]: isDark,
              })}
            >
              {label}
            </Link>
          ))}
        </motion.div>
        <div className={classes.slogan}>
          <Title c={navColor}>progressive tools for progressive players</Title>
        </div>
      </div>
    </>
  );
}
