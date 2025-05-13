import { Outlet } from 'react-router-dom';
import { Modal } from '@mantine/core';
import { BackgroundManager } from './BackgroundManager';
import { Cart } from './components/Cart/Cart';
import { useCartModal } from './contexts/cartModalContext';
import modalClasses from './modalOverrides.module.css';

export function AppLayout() {
  const { isCartOpen, closeCart } = useCartModal();

  return (
    <>
      <BackgroundManager />
      <Outlet />
      <Modal
        opened={isCartOpen}
        onClose={closeCart}
        size="lg"
        overlayProps={{ blur: 3, opacity: 0.55 }}
        withinPortal={true}
        classNames={{
          content: modalClasses.modalContent,
          header: modalClasses.modalHeader,
          title: modalClasses.modalTitle,
        }}
        title="Your Cart"
        transitionProps={{ duration: 300, transition: 'fade-left' }}
        zIndex="9999"
      >
        <Cart />
      </Modal>
    </>
  );
}
