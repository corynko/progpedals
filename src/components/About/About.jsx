import { useEffect } from 'react';
import { useMantineColorScheme } from '@mantine/core';
import lightBg from '../../assets/png/EKP_CIR-67.jpg';
import darkBg from '../../assets/png/EKP_SGV-32.jpg';
import { useBackground } from '../../contexts/backgroundContext';
import { usePrimaryColor } from '../../theme/usePrimaryColor';
import { Navbar } from '../NavBar/navBar';
import classes from './About.module.css';

import '../../hover.css';

export function About() {
  const { colorScheme } = useMantineColorScheme();
  const isDark = colorScheme === 'dark';
  const navColor = usePrimaryColor(9, 3);

  const { setBackgrounds } = useBackground();

  useEffect(() => {
    setBackgrounds({
      light: lightBg,
      dark: darkBg,
    });
  }, [setBackgrounds]);

  return (
    <>
      <Navbar />
      <div className={classes.content}></div>
    </>
  );
}
