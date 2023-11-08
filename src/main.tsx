import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import './index.css';
import { NavBarProvider } from './context/NavBar.tsx';
import { BrowserRouter } from 'react-router-dom';
import { LoaderProvider } from './context/LoaderCotext.tsx';

ReactDOM.createRoot(document.getElementById('root')!).render(
  // <React.StrictMode>
  <BrowserRouter>
    <NavBarProvider>
      <LoaderProvider>
        <App />
      </LoaderProvider>
    </NavBarProvider>
  </BrowserRouter>
  // </React.StrictMode>
);
