import { createContext, useContext } from "react";

interface LoaderState {
  isLoading: boolean;
  setLoading: (state: boolean) => void;
}

const LoaderContext = createContext<LoaderState | undefined>(undefined);

export const useLoader = () => {
  const context = useContext(LoaderContext);
  if (!context) {
    throw new Error("useLoader must be used within a LoaderProvider");
  }
  return context;
};

export default LoaderContext;
