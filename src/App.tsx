import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import Header from './layout/Header';
import HeaderMobile from './layout/HeaderMobile';
import { useSidebarContext } from './context/NavBar';
import { useEffect } from 'react';

function App() {
  const { userTheme, systemeTheme } = useSidebarContext();

  useEffect(() => {
    if (userTheme === 'dark' || (!userTheme && systemeTheme)) {
      document.documentElement.classList.add('dark');
      return;
    }

    localStorage.setItem('theme', systemeTheme ? 'dark' : 'light');
  }, []);

  return (
    <BrowserRouter>
      <div className="flex flex-col bg-blue-1 dark:bg-bluedark-2 min-h-screen">
        <Header />
        <div className="relative">
          <HeaderMobile />
          <Routes>
            <Route path="/" element={<Home />} />
          </Routes>
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;
