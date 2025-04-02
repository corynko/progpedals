import { useMantineTheme } from '@mantine/core';
import { ColorSchemeToggle } from '../components/ColorSchemeToggle/ColorSchemeToggle';
import { Welcome } from '../components/Welcome/Welcome';

export function HomePage() {
  const theme = useMantineTheme();
  return (
    <>
      <Welcome theme={theme} />
    </>
  );
}
