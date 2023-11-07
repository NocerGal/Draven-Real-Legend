import { Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import Header from './layout/Header';
import HeaderMobile from './layout/HeaderMobile';
import { useSidebarContext } from './context/NavBar';
import { useEffect } from 'react';
import UserInfos from './pages/UserInfos';
import Items from './pages/Items';

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
    <div
      className={`flex flex-col bg-blue-1 dark:bg-bluedark-2 min-h-screen ${
        userTheme === 'dark' ? 'darkblob' : 'lightblob'
      }`}
    >
      <Header />
      <div className="relative">
        <HeaderMobile />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/items" element={<Items />} />

          <Route path="/:region/:puuid" element={<UserInfos />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
