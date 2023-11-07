import { ReactNode, createContext, useContext, useState } from 'react';

type NavBarProviderProps = {
  children: ReactNode;
};

type NavBarContextType = {
  isSmallNavBarOpened: boolean;
  toggleNavBar: () => void;
  language: string;
  toggleLanguage: (lang: string) => void;
  theme: string;
  toggleTheme: () => void;
  systemeTheme: boolean;
  setTheme: (arg: string) => void;
  userTheme: string | null;
};

export const NavBarContext = createContext<null | NavBarContextType>(null);

export function useSidebarContext() {
  const value = useContext(NavBarContext);
  if (value == null) throw Error('Cannot use outside of SidebarProvider');
  return value;
}

export function NavBarProvider({ children }: NavBarProviderProps) {
  const systemeTheme = window.matchMedia(
    '(prefers-color-scheme: dark)'
  ).matches;
  const userTheme = localStorage ? localStorage.getItem('theme') : null;
  const [isSmallNavBarOpened, setIsSmallNavBarOpened] = useState(false);
  const [theme, setTheme] = useState(systemeTheme ? 'dark' : 'light');
  const [language, setLanguage] = useState<string>('en_US');

  const toggleNavBar = () => {
    setIsSmallNavBarOpened((prev) => !prev);
  };
  const toggleTheme = () => {
    setTheme((prev) => (prev == 'light' ? 'dark' : 'light'));
    if (document.documentElement.classList.contains('dark')) {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
      return;
    }
    document.documentElement.classList.add('dark');
    localStorage.setItem('theme', 'dark');
  };
  const toggleLanguage = (lang: string) => {
    setLanguage(lang);
  };

  return (
    <NavBarContext.Provider
      value={{
        isSmallNavBarOpened,
        toggleNavBar,
        language,
        toggleLanguage,
        theme,
        toggleTheme,
        systemeTheme,
        setTheme,
        userTheme,
      }}
    >
      {children}
    </NavBarContext.Provider>
  );
}
