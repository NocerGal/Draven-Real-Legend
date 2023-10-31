import { Link } from 'react-router-dom';
import LOL_ICON from '../assets/LoL.svg';
import { ListBulletIcon, MoonIcon, SunIcon } from '@radix-ui/react-icons';
import { useSidebarContext } from '../context/NavBar';

export default function Header() {
  const { toggleNavBar } = useSidebarContext();

  return (
    <>
      <header
        className="sticky top-0 bg-blue-1 border-b-2 border-blue-6 border-solid dark:border-bluedark-7 z-50
      h-full rounded-md bg-clip-padding backdrop-filter backdrop-blur-md bg-opacity-0 dark:bg-bluedark-1"
      >
        <div className="max-w-screen-xl mx-auto flex justify-between align-middle px-12 py-4 w-full max-h-full ">
          <Link to={'/'}>
            <img src={LOL_ICON} alt="lol icone" className="h-32 w-32" />
          </Link>
          <div className="flex gap-6 items-center align-middle my-auto  xl:hidden">
            <Theme />
            <ListBulletIcon
              className="h-16 w-16 p-3 items-center rounded-full cursor-pointer text-blue-9 fill-current dark:text-bluedark-12 hover:bg-blue-4 dark:hover:bg-blue-4  dark:hover:text-bluedark-3"
              onClick={toggleNavBar}
            />
          </div>

          <nav className="hidden items-center align-middle justify-between w-96 xl:flex">
            <ul className="flex items-center align-middle justify-between w-full">
              <Link to={'/champions'}>
                <li className="text-2xl text-blue-12 border-b-">Champs</li>
              </Link>
              <Link to={'/champions'}>
                <li className="text-2xl text-blue-12">Statistics</li>
              </Link>
              <Link to={'/champions'}>
                <li className="text-2xl text-blue-12">Items</li>
              </Link>
              <Theme />
            </ul>
          </nav>
        </div>
      </header>
    </>
  );
}

function Theme() {
  const { toggleTheme, theme } = useSidebarContext();

  return (
    <div>
      {theme == 'light' && (
        <SunIcon
          className="h-14 w-14 p-3 items-center rounded-full cursor-pointer text-blue-9 dark:text-bluedark-12 fill-current hover:bg-blue-4   "
          onClick={() => toggleTheme()}
        />
      )}
      {theme == 'dark' && (
        <MoonIcon
          className="h-14 w-14 p-3 items-center rounded-full cursor-pointer text-blue-9 dark:text-bluedark-12 fill-current hover:bg-blue-4 dark:hover:bg-blue-4 dark:hover:text-bluedark-3"
          onClick={() => toggleTheme()}
        />
      )}
    </div>
  );
}
