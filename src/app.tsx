import { QueryClientProvider } from '@tanstack/react-query';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import { Toaster } from 'sonner';
import { queryClient } from './lib/react-query';
import { CreateRoom } from './pages/create-room';
import { Room } from './pages/room';

export function App() {
  const router = createBrowserRouter([
    {
    path: '/',
    element: <CreateRoom />
  },
  {
    path: '/room/:roomId',
    element: <Room />
  }
  ]);
  
  return (
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router}></RouterProvider>
      <Toaster invert richColors />
    </QueryClientProvider>
  )
}