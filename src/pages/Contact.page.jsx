import { useMantineTheme } from '@mantine/core';
import { Contact } from '../components/Contact/Contact';

export function ContactPage() {
  const theme = useMantineTheme();
  return (
    <>
      <Contact theme={theme} />
    </>
  );
}
