import { useMantineColorScheme, useMantineTheme } from '@mantine/core';

export function useContrastColor(lightShade = 9, darkShade = 1) {
  const theme = useMantineTheme();
  const { colorScheme } = useMantineColorScheme();

  const shade = colorScheme === 'dark' ? darkShade : lightShade;
  const colorKey = colorScheme === 'dark' ? 'whitest' : 'blackest';

  return theme.colors[colorKey][shade];
}
