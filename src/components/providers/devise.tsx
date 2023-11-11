"use client";
import {
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

const DeviseContext = createContext({ isMobile: true });

export const useDeviseContext = () => useContext(DeviseContext);

export const DeviseProvider = ({ children }: { children: ReactNode }) => {
  const MAXMOBILEWIDTH = 767;

  const [isMobile, setIsMobile] = useState(true);

  useEffect(() => {
    setIsMobile(window.innerWidth <= MAXMOBILEWIDTH);
  }, []);

  return (
    <DeviseContext.Provider value={{ isMobile }}>
      {children}
    </DeviseContext.Provider>
  );
};
