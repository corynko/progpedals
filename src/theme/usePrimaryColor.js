import { useMantineColorScheme, useMantineTheme } from '@mantine/core';

export function usePrimaryColor(lightShade = 8, darkShade = 1) {
  const theme = useMantineTheme();
  const { colorScheme } = useMantineColorScheme();

  const shade = colorScheme === 'dark' ? darkShade : lightShade;
  return theme.colors.primary[shade];
}
