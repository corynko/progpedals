import { useMantineTheme } from '@mantine/core';
import { Products } from '../components/Products/Products';

export function ProductsPage() {
  const theme = useMantineTheme();
  return (
    <>
      <Products theme={theme} />
    </>
  );
}
