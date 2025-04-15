import { useEffect } from 'react';
import { ArrowRight } from 'lucide-react';
import { useParams } from 'react-router-dom';
import {
  Container,
  Image,
  List,
  Paper,
  Text,
  ThemeIcon,
  Title,
  useMantineColorScheme,
  useMantineTheme,
} from '@mantine/core';
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
  const theme = useMantineTheme();

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
              {product.longText}
            </Text>
            <Title c={navColor} className={classes.detailTitle2}>
              the little things:
            </Title>
            <List className={classes.detailList}>
              <List.Item
                icon={
                  <ThemeIcon color={theme.colors.prideRed[6]} size={24} radius="xl">
                    <ArrowRight size={16} />
                  </ThemeIcon>
                }
                classNames={{
                  itemWrapper: classes.itemWrapper,
                  itemIcon: classes.itemIcon,
                  itemLabel: classes.itemLabel,
                }}
              >
                {product.li1}
              </List.Item>
              <List.Item
                icon={
                  <ThemeIcon color={theme.colors.prideBlue[8]} size={24} radius="xl">
                    <ArrowRight size={16} />
                  </ThemeIcon>
                }
                classNames={{
                  itemWrapper: classes.itemWrapper,
                  itemIcon: classes.itemIcon,
                  itemLabel: classes.itemLabel,
                }}
              >
                {product.li2}
              </List.Item>
              <List.Item
                icon={
                  <ThemeIcon color={theme.colors.prideYellow[4]} size={24} radius="xl">
                    <ArrowRight size={16} />
                  </ThemeIcon>
                }
                classNames={{
                  itemWrapper: classes.itemWrapper,
                  itemIcon: classes.itemIcon,
                  itemLabel: classes.itemLabel,
                }}
              >
                {product.li3}
              </List.Item>
              <List.Item
                icon={
                  <ThemeIcon color={theme.colors.prideGreen[6]} size={24} radius="xl">
                    <ArrowRight size={16} />
                  </ThemeIcon>
                }
                classNames={{
                  itemWrapper: classes.itemWrapper,
                  itemIcon: classes.itemIcon,
                  itemLabel: classes.itemLabel,
                }}
              >
                {product.li4}
              </List.Item>
            </List>
          </Paper>
        </div>
      </Container>
    </div>
  );
}
