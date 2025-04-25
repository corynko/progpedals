import { Helmet } from '@dr.pogodin/react-helmet';
import { ProductCardArray } from '../components/Products/ProductCardArray';
import { ProductDetail } from '../components/Products/ProductDetail';

export function ProductDetailPage() {
  const productCardArray = ProductCardArray;
  const slug = productCardArray.slug;
  const url = `https://progpedals.com/products/${slug}`;
  return (
    <>
      <Helmet>
        <title>{productCardArray.slug} | Progressive Pedals</title>
        <meta name="description" content={productCardArray.description} />
        <meta
          name="keywords"
          content="fuzz pedal, custom guitar pedals, about, boutique stompboxes"
        />
        <meta property="og:title" content={productCardArray.title} />
        <meta property="og:description" content="Pedal Details | Progressive Pedals" />
        <meta property="og:type" content="website" />
        <meta property="og:url" content={url} />
        <meta name="twitter:title" content={productCardArray.title} />
        <meta name="twitter:description" content={productCardArray.description} />
      </Helmet>
      <ProductDetail />
    </>
  );
}
