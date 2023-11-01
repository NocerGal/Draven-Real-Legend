import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import './index.css';
import { NavBarProvider } from './context/NavBar.tsx';
import { BrowserRouter } from 'react-router-dom';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <BrowserRouter>
      <NavBarProvider>
        <App />
      </NavBarProvider>
    </BrowserRouter>
  </React.StrictMode>
);
