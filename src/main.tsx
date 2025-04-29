import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import './index.css';
import { RentalProvider } from './context/RentalContext';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <RentalProvider>
      <App />
    </RentalProvider>
  </StrictMode>
);