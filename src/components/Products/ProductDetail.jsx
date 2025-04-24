import { useEffect, useState } from 'react';
import { ArrowRight } from 'lucide-react';
import { useParams } from 'react-router-dom';
import {
  Button,
  Container,
  Image,
  List,
  NumberInput,
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
import { useCart } from '../../contexts/cartContext';
import { useContrastColor } from '../../theme/useContrastColor';
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
  const contrastColor = useContrastColor(9, 1);
  const theme = useMantineTheme();

  const [donation, setDonation] = useState(0);
  const { addToCart } = useCart();

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
          <Paper className={classes.detailPaper}>
            <Button
              className={classes.detailButton}
              onClick={() => addToCart(product, donation)}
              fullWidth
              mt="md"
            >
              Add to cart — ${product.minimumPrice + donation}
            </Button>

            <NumberInput
              value={donation}
              onChange={setDonation}
              label="Additional Donation"
              classNames={{ input: classes.detailInput }}
              thousandSeparator=","
              className={classes.detailNumber}
              min={0}
              step={10}
              prefix="$"
              stepHoldDelay={500}
              stepHoldInterval={(t) => Math.max(1000 / t ** 2, 25)}
            />
          </Paper>
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
              <List.Item
                icon={
                  <ThemeIcon color={theme.colors.prideOrange[6]} size={24} radius="xl">
                    <ArrowRight size={16} />
                  </ThemeIcon>
                }
                classNames={{
                  itemWrapper: classes.itemWrapper,
                  itemIcon: classes.itemIcon,
                  itemLabel: classes.itemLabel,
                }}
              >
                {product.li5}
              </List.Item>
            </List>
          </Paper>
        </div>
      </Container>
    </div>
  );
}
