import AXE from '../assets/PngItem_2955839.png';
import { useLockBodyScroll } from '@uidotdev/usehooks';

export default function Loader() {
  useLockBodyScroll();

  return (
    <div className="absolute z-[9999] left-0 top-0 w-screen h-screen bg-blue-4 bg-opacity-40 dark:bg-bluedark-4  dark:bg-opacity-40 flex justify-center items-center">
      <div className=" h-72 w-56 bg-blue-4 dark:bg-bluedark-12  shadow-[0px_0px_70px_rgba(234,245,255,0.40)]  border-solid border-2 border-blue-6 dark: dark:border-bluedark-6 rounded-lg  flex flex-col items-center justify-center">
        <div className="axe--animation w-fit">
          <img className="axe--1 h-24 w-16" src={AXE} alt="Draven's Axe" />
          <img className="axe--2 h-24 w-16" src={AXE} alt="Draven's Axe" />
        </div>
        <p className="text-center mt-4 text-blue-12 dark:text-bluedark-2">
          Draven is looking for your match history!
        </p>
      </div>
    </div>
  );
}
