import { Helmet } from 'react-helmet-async';
import { useMantineTheme } from '@mantine/core';
import { Welcome } from '../components/Welcome/Welcome.jsx';

export function HomePage() {
  const theme = useMantineTheme();
  return (
    <>
      <Helmet>
        <title>Progressive Pedals</title>
        <meta
          name="description"
          content="The home of Progressive Pedals, Boutique Stompboxes for Social Change"
        />
        <meta
          name="keywords"
          content="fuzz pedal, custom guitar pedals, contact, boutique stompboxes"
        />
        <meta property="og:title" content="Progressive Pedals" />
        <meta property="og:description" content="Get in touch for custom projects or questions." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://progpedals.com" />
        <meta name="twitter:title" content="Progressive Pedals" />
        <meta name="twitter:description" content="Progressive tools for progressive musicians." />
      </Helmet>
      <Welcome theme={theme} />
    </>
  );
}
