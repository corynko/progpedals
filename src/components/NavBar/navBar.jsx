import { useState } from 'react';
import { ShoppingCart } from 'lucide-react';
import {
  ActionIcon,
  Anchor,
  Box,
  Burger,
  Container,
  Drawer,
  Flex,
  Text,
  Title,
  useMantineColorScheme,
  useMantineTheme,
} from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { useCart } from '../../contexts/cartContext';
import { useCartModal } from '../../contexts/cartModalContext';
import { usePrimaryColor } from '../../theme/usePrimaryColor';
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

  const { cart } = useCart();
  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);

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
          <Box style={{ position: 'relative' }}>
            <ActionIcon
              onClick={openCart}
              title="View Cart"
              variant="subtle"
              style={{ color: navColor }}
            >
              <ShoppingCart />
            </ActionIcon>
            {totalItems > 0 && (
              <Text
                size="xs"
                fw={700}
                style={{
                  position: 'absolute',
                  top: -5,
                  right: -5,
                  backgroundColor: theme.colors.red[7],
                  color: 'white',
                  borderRadius: '50%',
                  padding: '2px 6px',
                  fontSize: '0.7rem',
                  lineHeight: 1,
                  minWidth: 18,
                  textAlign: 'center',
                }}
              >
                {totalItems}
              </Text>
            )}
          </Box>

          <ColorSchemeToggle
            navColor={navColor}
            isDark={isDark}
            toggleColorScheme={toggleColorScheme}
          />
        </div>

        {/* Mobile Burger */}
        <Box className={classes.mobileCart} style={{ position: 'relative' }}>
          <ActionIcon
            onClick={openCart}
            title="View Cart"
            variant="subtle"
            style={{ color: navColor }}
          >
            <ShoppingCart />
          </ActionIcon>
          {totalItems > 0 && (
            <Text
              size="xs"
              fw={700}
              style={{
                position: 'absolute',
                top: -5,
                right: -5,
                backgroundColor: theme.colors.red[7],
                color: 'white',
                borderRadius: '50%',
                padding: '2px 6px',
                fontSize: '0.7rem',
                lineHeight: 1,
                minWidth: 18,
                textAlign: 'center',
              }}
            >
              {totalItems}
            </Text>
          )}
        </Box>
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
