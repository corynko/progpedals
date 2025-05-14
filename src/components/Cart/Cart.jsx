import { Button, Container, Divider, Group, NumberInput, Paper, Text, Title } from '@mantine/core';
import { useCart } from '../../contexts/cartContext';
import classes from './Cart.module.css';

export function Cart() {
  const { cart, updateDonation, updateQuantity, removeFromCart } = useCart();

  const total = cart.reduce((sum, item) => sum + item.totalPrice, 0);

  return (
    <Container className={classes.cartContainer}>
      {cart.length === 0 ? (
        <Text>Your cart is empty.</Text>
      ) : (
        cart.map((item) => (
          <Paper
            className={classes.cartPaper}
            key={item.slug}
            p="md"
            mb="md"
            shadow="xs"
            withBorder
          >
            <Group justify="space-between">
              <div>
                <Text fw={500}>{item.title}</Text>
                <Text size="sm">Minimum: ${item.minimumPrice}</Text>
                {item.charity?.url && item.charity?.name ? (
                  <Text size="sm">
                    Benefits:{' '}
                    <a href={item.charity.url} target="_blank" rel="noopener noreferrer">
                      {item.charity.name}
                    </a>
                  </Text>
                ) : (
                  <Text size="sm">No listed charity</Text>
                )}
              </div>
              <Button className={classes.cartButton} onClick={() => removeFromCart(item.slug)}>
                Remove
              </Button>
            </Group>

            <NumberInput
              mt="sm"
              value={item.quantity}
              onChange={(val) => updateQuantity(item.slug, val)}
              label="Quantity"
              min={1}
              step={1}
            />
            <NumberInput
              mt="sm"
              value={typeof item.totalDonation === 'number' ? item.totalDonation : 5}
              onChange={(val) => updateDonation(item.slug, val)}
              label="Additional donation"
              min={5}
              step={10}
              prefix="$"
            />

            <Text mt="xs" fw={700}>
              Total for this item: ${item.totalPrice}
            </Text>
          </Paper>
        ))
      )}

      {cart.length > 0 && (
        <>
          <Divider my="xl" />
          <Title order={3}>Total: ${total}</Title>
          <Button mt="md" fullWidth disabled>
            Checkout (available July 1)
          </Button>
        </>
      )}
    </Container>
  );
}
