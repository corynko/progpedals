import { Outlet } from 'react-router-dom';
import { Modal } from '@mantine/core';
import { BackgroundManager } from './BackgroundManager';
import { Cart } from './components/Cart/Cart';
import { useCartModal } from './contexts/cartModalContext';

export function AppLayout() {
  const { isCartOpen, closeCart } = useCartModal();

  return (
    <>
      <BackgroundManager />
      <Outlet />
      <Modal
        opened={isCartOpen}
        onClose={closeCart}
        title="Your Cart"
        size="lg"
        overlayProps={{ blur: 3, opacity: 0.55 }}
        withinPortal={true}
      >
        <Cart />
      </Modal>
    </>
  );
}
