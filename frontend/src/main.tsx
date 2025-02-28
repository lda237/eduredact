// main.tsx
import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom'; // Importe BrowserRouter
import App from './App';
import './index.css';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <BrowserRouter> {/* Enveloppe App avec BrowserRouter */}
      <App />
    </BrowserRouter>
  </React.StrictMode>,
);