import { useState } from 'react';
import { ShoppingCart } from 'lucide-react';
import {
  ActionIcon,
  Anchor,
  Burger,
  Container,
  Drawer,
  Flex,
  Title,
  useMantineColorScheme,
  useMantineTheme,
} from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { useCartModal } from '../../contexts/cartModalContext';
import { usePrimaryColor } from '../../theme/usePrimaryColor';
import { Cart } from '../Cart/Cart';
import { ColorSchemeToggle } from '../ColorSchemeToggle/ColorSchemeToggle';
import LogoDraw from './logoDraw';
import classes from './NavBar.module.css';

export function Navbar() {
  const theme = useMantineTheme();
  const { colorScheme, toggleColorScheme } = useMantineColorScheme();
  const isDark = colorScheme === 'dark';
  const [drawerOpened, { open, close }] = useDisclosure(false);
  const links = ['about', 'products', 'contact'];

  const { openCart } = useCartModal();

  const navColor = usePrimaryColor(8, 1);

  return (
    <Container fluid className={classes.navbarContainer}>
      <div className={classes.navbarInner}>
        <Title order={2}>
          {/* <Image className={classes.logo} src={logo} /> */}

          <Anchor className={classes.navLink} c={navColor} href={`/`} size="md">
            <LogoDraw />
          </Anchor>
        </Title>

        {/* Desktop Links */}
        <div className={classes.desktopLinks}>
          {links.map((link) => {
            const [isHovered, setIsHovered] = useState(false);

            const linkColor = isHovered
              ? isDark
                ? theme.colors.transBlue[4]
                : theme.colors.transPink[2]
              : navColor;

            return (
              <Anchor
                key={link}
                href={`/${link.toLowerCase()}`}
                size="md"
                className={classes.navLink}
                style={{ color: linkColor, transition: 'all 0.3s ease-in-out' }}
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
              >
                {link}
              </Anchor>
            );
          })}
          <ActionIcon
            onClick={openCart}
            title="View Cart"
            variant="subtle"
            style={{ color: navColor }}
          >
            <ShoppingCart />
          </ActionIcon>
          <ColorSchemeToggle
            navColor={navColor}
            isDark={isDark}
            toggleColorScheme={toggleColorScheme}
          />
        </div>

        {/* Mobile Burger */}
        <Burger
          className={classes.mobileBurger}
          opened={drawerOpened}
          onClick={open}
          size="sm"
          aria-label="Toggle navigation"
        />
      </div>

      {/* Mobile Drawer */}
      <Drawer
        opened={drawerOpened}
        onClose={close}
        size="60%"
        title="Menu"
        position="bottom"
        offset={12}
        className={classes.mobileDrawer}
      >
        <Flex direction="column" gap="md">
          {links.map((link) => (
            <Anchor
              key={link}
              href={`/${link.toLowerCase()}`}
              size="md"
              className={classes.navLink}
              style={{ color: navColor, transition: 'all 0.3s ease-in-out' }}
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}
            >
              {link}
            </Anchor>
          ))}
          <ActionIcon
            onClick={openCart}
            title="View Cart"
            variant="subtle"
            style={{ color: navColor }}
          >
            <ShoppingCart />
          </ActionIcon>

          <ColorSchemeToggle
            navColor={navColor}
            isDark={isDark}
            toggleColorScheme={toggleColorScheme}
          />
        </Flex>
      </Drawer>
    </Container>
  );
}
