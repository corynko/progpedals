import { motion } from 'motion/react';
import { useMantineColorScheme } from '@mantine/core';
import classes from './NavBar.module.css';

const pathData = [
  {
    type: 'circle',
    props: { cx: '227.3', cy: '148.1', r: '44' },
  },
  {
    type: 'path',
    props: {
      d: 'M102.5 355.8h33.4l-2-2.5v-66.6l2-2.5h-33.4zm-1.8-327.2 1.8 1.9V47 28.6zm33.2 1.9a4 4 0 0 1 3-2l-34.4.1v119h31.4zm0 117.2h-31.4v119.2h33.4l-2-2.2zm-33.5 119.2h2.1v-2.2z',
    },
  },
  {
    type: 'path',
    props: {
      d: 'M100.4 261.4H24c-1.3 0-7.2 5.3-8.1 6.9a15 15 0 0 0 1.3 17.6c.8 1 6.3 5.5 6.8 5.5h78.5v-30zM85.6 34.8l16.9-.3V4.8h-77c-14.8 3.1-15.3 27-1.5 30h76.4l.3.3h1.8v-.6z',
    },
  },
  {
    type: 'path',
    props: {
      d: 'M222 4.8H102.4v29.7l54.4-1 9.2-.2h.5-.5c29.4-.2 66.6 2.9 85.1 10.4C338 79 345.5 199.8 264 246.1c-11 6.2-35.3 15.3-47.5 15.3h-114v30h122.2c34.2 0 81.6-32.8 100.9-60.2 64-91 5.2-215-103.7-226.4Z',
    },
  },
  {
    type: 'path',
    props: {
      d: 'M35 429.1c-15-9.3-31.4 6.3-19.3 22 22.3 28.9 59.7 56 85.6 84.5l.5-40.3z',
    },
  },
  {
    type: 'path',
    props: {
      d: 'M202.2 428.7c15.7-9.8 33 6.6 20.3 23-23.3 30.3-62.5 58.6-89.6 88.6l-.5-42.2z',
    },
  },
  {
    type: 'path',
    props: {
      d: 'm133.9 383.6 1.8-1.9h-33.2l-.7 104.5v7.2l-.6 42.2 6.7 7.7c8.4 6.5 13.5 6.5 22 0l3.9-4z',
    },
  },
  {
    type: 'path',
    props: {
      d: 'M100.8 348.2H28.1c-11.7 0-18.8 18.2-10.9 29a31 31 0 0 0 8.2 6.2h77l33.3.2.2-.2H211c1 0 7.8-4.3 8.9-5.8 8.3-10.7 1.7-29.4-10.3-29.4z',
    },
  },
  {
    type: 'circle',
    props: { cx: '227.3', cy: '148.1', r: '44' },
  },
];

export default function LogoDraw() {
  const { colorScheme } = useMantineColorScheme();
  const isDark = colorScheme === 'dark';

  const strokeColorInitial = isDark ? '#ffffff' : '#000000';
  const fillColorInitial = isDark ? '#ffffff00' : '#00000000';
  const fillColorAfter = isDark ? '#ffffff' : '#000000';
  const strokeColorAfter = isDark ? '#000000' : '#ffffff';

  const containerVariants = {
    animate: {
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const drawVariants = {
    initial: {
      pathLength: 0,
      strokeDasharray: 1,
      strokeDashoffset: 1,
      stroke: strokeColorInitial,
      fill: fillColorInitial,
    },
    animate: {
      pathLength: 1,
      strokeDashoffset: 0,
      stroke: strokeColorAfter,
      fill: fillColorAfter,
      transition: {
        duration: 1.25,
        ease: 'easeIn',
        fill: {
          delay: 1.25,
          duration: 0.75,
          ease: 'easeInOut',
        },
        stroke: {
          delay: 1.25,
          duration: 0.75,
          ease: 'easeInOut',
        },
      },
    },
  };

  return (
    <motion.svg
      width="100px"
      height="100px"
      viewBox="0 0 363.6 553"
      xmlns="http://www.w3.org/2000/svg"
      className={classes.logo}
      variants={containerVariants}
      initial="initial"
      animate="animate"
    >
      {pathData.map((el, i) =>
        el.type === 'circle' ? (
          <motion.circle
            key={i}
            {...el.props}
            className={classes.cls1}
            variants={drawVariants}
            initial="initial"
            animate="animate"
            whileInView="fillIn"
          />
        ) : (
          <motion.path
            key={i}
            {...el.props}
            className={classes.cls1}
            variants={drawVariants}
            initial="initial"
            animate="animate"
            whileInView="fillIn"
          />
        )
      )}
    </motion.svg>
  );
}
