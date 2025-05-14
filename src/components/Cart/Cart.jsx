import { useState } from 'react';
import { send } from '@emailjs/browser';
import Swal from 'sweetalert2';
import {
  Button,
  Container,
  Divider,
  Group,
  NumberInput,
  Paper,
  Text,
  TextInput,
  Title,
} from '@mantine/core';
import { useCart } from '../../contexts/cartContext';
import { useCartModal } from '../../contexts/cartModalContext';
import classes from './Cart.module.css';

export function Cart() {
  //react and context imports
  const { cart, updateDonation, updateQuantity, removeFromCart } = useCart();
  const { closeCart } = useCartModal();
  const [emailSent, setEmailSent] = useState(false);
  const [showEmailInput, setShowEmailInput] = useState(false);
  const [email, setEmail] = useState('');

  //cart math
  const total = cart.reduce((sum, item) => sum + item.totalPrice, 0);
  const totalDonation = cart.reduce((sum, item) => sum + (item.totalDonation || 0), 0);
  const itemOnlyTotal = cart.reduce((sum, item) => item.minimumPrice * item.quantity, 0);

  //button regex
  const isValidEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  const handleSendReminder = async () => {
    try {
      closeCart();
      Swal.fire({
        title: 'Sending...',
        text: 'Your message is on its way.',
        showConfirmButton: false,
        allowOutsideClick: false,
        didOpen: () => {
          Swal.showLoading();
        },
      });

      await send(
        import.meta.env.VITE_EMAILJS_SERVICE_ID,
        import.meta.env.VITE_EMAILJS_TEMPLATE_ID2,
        {
          cart_summary: cart
            .map((item) => `${item.title} x${item.quantity} - $${itemOnlyTotal}`)
            .join('\n'),
          additional_donation: `$${totalDonation}`,
          total_price: `$${total}`,
          to_email: email,
        },
        import.meta.env.VITE_EMAILJS_PUBLIC_KEY
      );

      setEmailSent(true);
      Swal.fire({
        icon: 'success',
        title: 'Message Sent',
        text: `We'll send you a reminder on launch day!`,
        timer: 3000,
        showConfirmButton: false,
      });
    } catch (error) {
      console.error('Email send failed:', error);
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Something went wrong. Please try again later.',
      });
      setEmailSent(false);
    }
  };

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
              label="Additional Donation"
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
            Checkout (coming July 1st)
          </Button>
          {!showEmailInput ? (
            <Button
              mt="sm"
              className={classes.cartButton}
              fullWidth
              onClick={() => setShowEmailInput(true)}
            >
              Sign Up for a Reminder
            </Button>
          ) : (
            <>
              <TextInput
                mt="sm"
                placeholder="Enter your email address"
                value={email}
                onChange={(event) => setEmail(event.currentTarget.value)}
              />
              <Button
                mt="sm"
                fullWidth
                onClick={handleSendReminder}
                className={classes.cartButton}
                disabled={emailSent || !isValidEmail(email)}
              >
                {emailSent ? 'Reminder Sent!' : 'Send Reminder'}
              </Button>
            </>
          )}
        </>
      )}
    </Container>
  );
}
