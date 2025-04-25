import { useEffect, useRef } from 'react';
import { motion } from 'motion/react';
import { Container, Paper, Text, Title, useMantineColorScheme } from '@mantine/core';
import lightBg from '../../assets/png/EKP_CIR-67.jpg';
import darkBg from '../../assets/png/EKP_SGV-32.jpg';
import { useBackground } from '../../contexts/backgroundContext';
import { usePrimaryColor } from '../../theme/usePrimaryColor';
import { AboutCardArray } from './aboutCardArray';
import classes from './About.module.css';

export function About() {
  const { colorScheme } = useMantineColorScheme();
  const isDark = colorScheme === 'dark';
  const isInvert = colorScheme !== 'dark';
  const navColor = usePrimaryColor(9, 3);
  const invertColor = usePrimaryColor(1, 9);

  const { setBackgrounds } = useBackground();

  const paperRef = useRef(null);

  const headerVariants = {
    start: {
      opacity: 0,
    },
    finish: {
      opacity: 1,
      transition: {
        delay: 0.2,
        duration: 0.75,
        ease: 'easeInOut',
      },
    },
  };
  const paperContainerVariants = {
    start: {
      opacity: 0,
    },
    finish: {
      opacity: 1,
      transition: {
        staggerChildren: 0.4,
        delayChildren: 0.5,
      },
    },
  };
  const paperVariants = {
    start: {
      opacity: 0,
      y: 20,
    },
    finish: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: 'easeInOut',
      },
    },
  };

  useEffect(() => {
    setBackgrounds({
      light: lightBg,
      dark: darkBg,
    });
  }, [setBackgrounds]);

  return (
    <>
      <div className={classes.content}>
        <motion.div variants={headerVariants} initial="start" animate="finish">
          <Title className={classes.titleLocation}>
            <Text className={classes.title} component="span">
              about
            </Text>
            <Text className={classes.titleSpacer} component="span">
              ||
            </Text>
            <Text className={classes.title} component="span">
              us
            </Text>
          </Title>
        </motion.div>
        <motion.div variants={paperContainerVariants} initial="start" animate="finish">
          <Container className={classes.paperContainer}>
            {AboutCardArray.map(({ title, text }, index) => (
              <motion.div
                key={index}
                variants={paperVariants}
                whileInView={{
                  backdropFilter: 'blur(4px)',
                  backgroundColor: isDark ? '#00000044' : '#ffffff22',
                  transition: {
                    duration: 0.8,
                    ease: 'easeInOut',
                  },
                }}
              >
                <Paper className={classes.aboutPaper}>
                  <Title className={classes.paperHeadline} c={navColor}>
                    {title}
                  </Title>
                  <Text className={classes.paperText} c={navColor}>
                    {text}
                  </Text>
                </Paper>
              </motion.div>
            ))}
          </Container>
        </motion.div>
      </div>
    </>
  );
}
