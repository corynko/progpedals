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
          <Paper className={classes.detailPaper}>
            <Text c={navColor} className={classes.detailH1}>
              {product.description}
            </Text>
            <Text c={navColor} className={classes.detailH3}>
              {product.price}
            </Text>
            <Text c={navColor} className={classes.detailBody}>
              The Rufus was already an incredibly versatile fuzz, capable of classic Hendrix Fuzz
              Face tones to soaring Gilmour leads. We decided to bring it up to par with some of the
              more modern demands of fuzz pedals, hot rodding the gain range to allow access to
              crushing doom riffage and the overly square tones of certain indie-rock darlings.
              Thus, <span style={{ fontFamily: 'Gotham Medium' }}>Harvey</span> was born, pushing
              forward a great fuzz circuit into the future in the true spirit of progressivism. We
              ditched the switchable octave-up in favor of more gain and more clarity, with a very
              musical two band EQ and switchable low-mid fatness and treble boosts. Just in time for
              Pride Month, Harvey is available for Pay What You Want, minimum $85 -{' '}
              <span style={{ fontFamily: 'Gotham Medium' }}>
                every dollar above the minimum will be donated to the{' '}
                <a href="https://www.thetrevorproject.org/">Trevor Project</a>, dedicated to helping
                LGBTQ2A+ youth find alternatives to suicide.
              </span>
            </Text>
          </Paper>
        </div>
      </Container>
    </div>
  );
}
