import { useParams } from 'react-router-dom';
import { Container, Image, Text, Title, useMantineColorScheme } from '@mantine/core';
import { ProductCardArray } from '../components/Products/ProductCardArray';
import { usePrimaryColor } from '../theme/usePrimaryColor';

export function ProductDetail() {
  const { slug } = useParams();
  const product = ProductCardArray.find((p) => p.slug === slug);
  const { colorScheme } = useMantineColorScheme();
  const isDark = colorScheme === 'dark';
  const navColor = usePrimaryColor(9, 3);

  if (!product) {
    return <Text>Product not found</Text>;
  }

  return (
    <Container>
      <Image src={isDark ? product.imageDark : product.imageLight} alt={product.title} />
      <Title c={navColor}>{product.title}</Title>
      <Text c={navColor}>{product.description}</Text>
      <Text c={navColor}>{product.price}</Text>
    </Container>
  );
}
