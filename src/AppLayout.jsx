import { Outlet } from 'react-router-dom';
import { BackgroundManager } from './BackgroundManager';

export function AppLayout() {
  return (
    <>
      <BackgroundManager />
      <Outlet />
    </>
  );
}
