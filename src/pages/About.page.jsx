import { useMantineTheme } from '@mantine/core';
import { About } from '../components/About/About';

export function AboutPage() {
  const theme = useMantineTheme();
  return (
    <>
      <About theme={theme} />
    </>
  );
}
