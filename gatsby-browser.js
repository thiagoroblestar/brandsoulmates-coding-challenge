import React from 'react';
import './src/styles/global.css'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
const queryClient = new QueryClient();

export const wrapRootElement = ({ element }) => {
  return <QueryClientProvider client={queryClient}>{element}</QueryClientProvider>;
}