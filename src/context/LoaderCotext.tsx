import { ReactNode, createContext, useContext, useState } from 'react';
import Loader from '../components/Loader';

type LoaderContext = { children: ReactNode };
type LoaderProviderProps = {
  showLoader: () => void;
  hideLoader: () => void;
};

export const LoaderContext = createContext<null | LoaderProviderProps>(null);

export function useLoaderContext() {
  const value = useContext(LoaderContext);
  if (value == null) throw Error('Cannot use outside of LoaderContext');
  return value;
}
export function LoaderProvider({ children }: LoaderContext) {
  const [loader, setLoader] = useState(false);
  const showLoader = () => setLoader((prev) => !prev);
  const hideLoader = () => setLoader((prev) => !prev);

  return (
    <LoaderContext.Provider value={{ showLoader, hideLoader }}>
      {loader && <Loader />}
      {children}
    </LoaderContext.Provider>
  );
}
