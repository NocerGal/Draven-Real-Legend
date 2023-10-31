import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import './index.css';
import { NavBarProvider } from './context/NavBar.tsx';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <NavBarProvider>
      <App />
    </NavBarProvider>
  </React.StrictMode>
);
