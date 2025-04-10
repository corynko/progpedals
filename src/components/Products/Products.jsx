import React, { useEffect } from 'react';
import { motion } from 'motion/react';
import { Container, Paper, Text, Title, useMantineColorScheme } from '@mantine/core';
import darkBg from '../../assets/png/EKP_F-E-15.jpg';
import lightBg from '../../assets/png/EKP_L-W-37.jpg';
import { useBackground } from '../../contexts/backgroundContext';
import { usePrimaryColor } from '../../theme/usePrimaryColor';
import classes from './Products.module.css';

export function Products() {
  const navColor = usePrimaryColor(9, 3);
  const { colorScheme } = useMantineColorScheme();
  const isDark = colorScheme === 'dark';

  const { setBackgrounds } = useBackground();

  useEffect(() => {
    setBackgrounds({
      light: lightBg,
      dark: darkBg,
    });
  }, [setBackgrounds]);

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

  return (
    <div className={classes.content}>
      <Container className={classes.paperContainer}>
        <motion.div
          variants={paperVariants}
          style={{
            backdropFilter: 'blur(0px)',
          }}
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
              FIRST RELEASE COMING SOON
            </Title>
            <Text className={classes.paperText} c={navColor}>
              stay tuned for new drops
            </Text>
          </Paper>
        </motion.div>
      </Container>
    </div>
  );
}
