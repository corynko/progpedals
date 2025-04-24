import { Helmet } from '@dr.pogodin/react-helmet';
import { useMantineTheme } from '@mantine/core';
import { Products } from '../components/Products/Products';

export function ProductsPage() {
  const theme = useMantineTheme();
  return (
    <>
      <Helmet>
        <title>Contact | Progressive Pedals</title>
        <meta name="description" content="The latest small-batch builds from Progressive Pedals" />
        <meta
          name="keywords"
          content="fuzz pedal, custom guitar pedals, contact, boutique stompboxes"
        />
        <meta property="og:title" content="Products | Progressive Pedals" />
        <meta property="og:description" content="Boutique, small-batch pedals available now." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://progpedals.com/products" />
        <meta name="twitter:title" content="Products | Progressive Pedals" />
        <meta name="twitter:description" content="Progressive tools for progressive musicians." />
      </Helmet>
      <Products theme={theme} />
    </>
  );
}
