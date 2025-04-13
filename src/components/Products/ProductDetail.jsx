import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Container, Image, Paper, Text, Title, useMantineColorScheme } from '@mantine/core';
import lightBg from '../../assets/png/EKP_LW_1.jpg';
import darkBg from '../../assets/png/EKP_S-C-12.jpg';
import { useBackground } from '../../contexts/backgroundContext';
import { usePrimaryColor } from '../../theme/usePrimaryColor';
import { ProductCardArray } from './ProductCardArray';
import classes from './ProductDetail.module.css';

export function ProductDetail() {
  const { slug } = useParams();
  const product = ProductCardArray.find((p) => p.slug === slug);
  const { colorScheme } = useMantineColorScheme();
  const isDark = colorScheme === 'dark';
  const { setBackgrounds } = useBackground();
  const navColor = usePrimaryColor(9, 3);

  useEffect(() => {
    setBackgrounds({
      light: lightBg,
      dark: darkBg,
    });
  }, [setBackgrounds]);

  if (!product) {
    return <Text>Product not found</Text>;
  }

  return (
    <div className={classes.content}>
      <Container className={classes.detailContainer}>
        <div>
          <Image
            src={isDark ? product.imageDark : product.imageLight}
            alt={product.title}
            className={classes.detailImg}
          />
          <Title c={navColor} className={classes.detailTitle}>
            {product.title}
          </Title>
        </div>
        <div>
          <Paper>
            <Text c={navColor} className={classes.detailH1}>
              {product.description}
            </Text>
            <Text c={navColor} className={classes.detailH3}>
              {product.price}
            </Text>
            <Text c={navColor} className={classes.detailBody}>
              {product.price}
            </Text>
          </Paper>
        </div>
      </Container>
    </div>
  );
}
