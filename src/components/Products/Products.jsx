import React, { useEffect } from 'react';
import { motion } from 'motion/react';
import { useNavigate } from 'react-router-dom';
import {
  Button,
  Card,
  Container,
  Image,
  Paper,
  Text,
  Title,
  useMantineColorScheme,
} from '@mantine/core';
import darkBg from '../../assets/png/EKP_F-E-15.jpg';
import lightBg from '../../assets/png/EKP_L-W-37.jpg';
import { useBackground } from '../../contexts/backgroundContext';
import { usePrimaryColor } from '../../theme/usePrimaryColor';
import { ProductCardArray } from './ProductCardArray';
import classes from './Products.module.css';

export function Products() {
  const navColor = usePrimaryColor(9, 3);
  const { colorScheme } = useMantineColorScheme();
  const isDark = colorScheme === 'dark';
  const { setBackgrounds } = useBackground();
  const navigate = useNavigate();

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

  useEffect(() => {
    setBackgrounds({
      light: lightBg,
      dark: darkBg,
    });
  }, [setBackgrounds]);

  const cardVariants = {
    start: { opacity: 0, y: 20 },
    finish: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: 'easeInOut' },
    },
  };

  return (
    <div className={classes.content}>
      <motion.div variants={headerVariants} initial="start" animate="finish">
        <Title className={classes.titleLocation}>
          <Text className={classes.title} component="span">
            products
          </Text>
        </Title>
      </motion.div>
      <Container className={classes.paperContainer}>
        <Paper className={classes.comingSoon}>
          <Text c={navColor} className={classes.comingSoonH1}>
            first drop coming soon
          </Text>
          <Text c={navColor} className={classes.comingSoonH3}>
            stay tuned
          </Text>
        </Paper>
        {ProductCardArray.map((product) => (
          <motion.div
            key={product.slug}
            variants={cardVariants}
            initial="start"
            animate="finish"
            whileHover={{ scale: 1.02 }}
          >
            <Card className={classes.productCard} withBorder padding="md" shadow="md">
              <Card.Section>
                <Image
                  src={isDark ? product.imageDark : product.imageLight}
                  alt={product.title}
                  className={classes.productCardImg}
                />
              </Card.Section>

              <div className={classes.productCardContent}>
                <Title order={4} className={classes.paperHeadline} c={navColor}>
                  {product.title}
                </Title>
                <Text className={classes.paperText} c={navColor}>
                  {product.description}
                </Text>
                <Text className={classes.paperText} c={navColor}>
                  {product.price}
                </Text>
                <Button
                  variant="light"
                  color={navColor}
                  mt="auto"
                  onClick={() => navigate(`/products/${product.slug}`)}
                >
                  Learn More
                </Button>
              </div>
            </Card>
          </motion.div>
        ))}
      </Container>
    </div>
  );
}
