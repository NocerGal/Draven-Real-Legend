import { Link } from 'react-router-dom';
import { useSidebarContext } from '../context/NavBar';
import { Cross1Icon } from '@radix-ui/react-icons';

export default function HeaderMobile() {
  const { isSmallNavBarOpened, toggleNavBar } = useSidebarContext();
  return (
    <>
      <div
        className={`absolute top-0 left-0 z-10 h-screen w-full bg-blue-2 px-14 py-24 overflow-scroll dark:bg-bluedark-3 ${
          isSmallNavBarOpened ? 'block' : 'hidden'
        }`}
      >
        <div className="relative">
          <Cross1Icon
            className="absolute right-0 bottom-full p-1.5 text-blue-12 rounded-xl text-xl cursor-pointer hover:bg-blue-12 hover:text-blue-2 dark:text-bluedark-12 dark:hover:bg-bluedark-5 h-9 w-9"
            onClick={toggleNavBar}
          />

          <NavTitle text="League of Legends Datas" />
          <div className="flex gap-5 flex-col">
            <NavButton text="Homepage" link="/" />
            <NavButton text="Homepage" link="/" />
            <NavButton text="Homepage" link="/" />
          </div>
        </div>
      </div>
    </>
  );
}

type NavButtonProps = {
  text: string;
  link: string;
};

function NavButton({ text, link }: NavButtonProps) {
  return (
    <Link
      className="block rounded-2xl text-xl hover:bg-blue-4 py-4 px-4 w-full text-blue-12 dark:text-bluedark-12 dark:hover:bg-bluedark-5"
      to={link}
    >
      {text}
    </Link>
  );
}

type NavTitleProps = {
  text: string;
};

function NavTitle({ text }: NavTitleProps) {
  return (
    <>
      <h4 className="text-2xl mb-4 text-blue-12 dark:text-bluedark-12">
        {text}
      </h4>
    </>
  );
}
