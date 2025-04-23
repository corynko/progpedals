import { Button, Container, Divider, Group, NumberInput, Paper, Text, Title } from '@mantine/core';
import { useCart } from '../../contexts/cartContext';
import classes from './Cart.module.css';

export function Cart() {
  const { cart, updateDonation, removeFromCart } = useCart();

  const total = cart.reduce((sum, item) => sum + item.totalPrice, 0);

  return (
    <Container>
      <Title mb="lg">Your Cart</Title>
      {cart.length === 0 ? (
        <Text>Your cart is empty.</Text>
      ) : (
        cart.map((item) => (
          <Paper key={item.slug} p="md" mb="md" shadow="xs" withBorder>
            <Group position="apart">
              <div>
                <Text fw={500}>{item.title}</Text>
                <Text size="sm">Minimum: ${item.minimumPrice}</Text>
                <Text size="sm">
                  Benefits:{' '}
                  <a href={item.charity.url} target="_blank" rel="noopener noreferrer">
                    {item.charity.name}
                  </a>
                </Text>
              </div>
              <Button variant="light" color="red" onClick={() => removeFromCart(item.slug)}>
                Remove
              </Button>
            </Group>
            <NumberInput
              mt="sm"
              value={item.extraDonation}
              onChange={(val) => updateDonation(item.slug, val)}
              label="Additional donation"
              min={0}
              step={5}
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
            Checkout (coming soon)
          </Button>
        </>
      )}
    </Container>
  );
}
