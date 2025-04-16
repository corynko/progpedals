import { Helmet } from 'react-helmet-async';
import { useMantineTheme } from '@mantine/core';
import { Contact } from '../components/Contact/Contact';

export function ContactPage() {
  const theme = useMantineTheme();
  return (
    <>
      <Helmet>
        <title>Contact | Progressive Pedals</title>
        <meta
          name="description"
          content="Custom pedals, comments, questions — all answered here."
        />
        <meta
          name="keywords"
          content="fuzz pedal, custom guitar pedals, contact, boutique stompboxes"
        />
        <meta property="og:title" content="Contact | Progressive Pedals" />
        <meta property="og:description" content="Get in touch for custom projects or questions." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://progpedals.com/contact" />
        <meta name="twitter:title" content="Contact | Progressive Pedals" />
        <meta name="twitter:description" content="Progressive tools for progressive musicians." />
      </Helmet>
      <Contact theme={theme} />
    </>
  );
}
