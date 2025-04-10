import { useEffect } from 'react';
import { motion } from 'motion/react';
import { Container, Paper, Text, Title, useMantineColorScheme } from '@mantine/core';
import lightBg from '../../assets/png/EKP_RATL-46.jpg';
import darkBg from '../../assets/png/EKP_RATL-84.jpg';
import { useBackground } from '../../contexts/backgroundContext';
import { usePrimaryColor } from '../../theme/usePrimaryColor';
import ContactForm from './ContactForm';
import classes from './Contact.module.css';

export function Contact() {
  const { colorScheme } = useMantineColorScheme();
  const isDark = colorScheme === 'dark';
  const navColor = usePrimaryColor(9, 3);

  const { setBackgrounds } = useBackground();

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
              contact
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
              <Paper className={classes.contactPaper}>
                <Title className={classes.paperHeadline} ta={'center'} c={navColor}>
                  custom projects? comments? questions? hate mail? all answered here.
                </Title>
              </Paper>
              <ContactForm />
            </motion.div>
          </Container>
        </motion.div>
      </div>
    </>
  );
}
