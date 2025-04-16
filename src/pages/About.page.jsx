import { Helmet } from 'react-helmet-async';
import { useMantineTheme } from '@mantine/core';
import { About } from '../components/About/About';

export function AboutPage() {
  const theme = useMantineTheme();
  return (
    <>
      <Helmet>
        <title>Contact | Progressive Pedals</title>
        <meta name="description" content="Progressive Pedals - Who Are We, What Do We Do" />
        <meta
          name="keywords"
          content="fuzz pedal, custom guitar pedals, about, boutique stompboxes"
        />
        <meta property="og:title" content="About | Progressive Pedals" />
        <meta property="og:description" content="Progressive Pedals - Our Story, Our Mission" />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://progpedals.com/about" />
        <meta name="twitter:title" content="About | Progressive Pedals" />
        <meta name="twitter:description" content="Progressive tools for progressive musicians." />
      </Helmet>
      <About theme={theme} />
    </>
  );
}
