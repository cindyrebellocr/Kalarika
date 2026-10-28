import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { HashRouter } from 'react-router-dom';
import './styles/global.css';
import App from './App';
import { CustomerProvider } from './lib/customer';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <HashRouter>
      <CustomerProvider>
        <App />
      </CustomerProvider>
    </HashRouter>
  </StrictMode>,
);
