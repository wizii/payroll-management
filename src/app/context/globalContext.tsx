'use client';
import React, { createContext, useContext, useState, ReactNode, Dispatch, SetStateAction } from 'react';

type GlobalContextType = {
  pageTitle: string;
  setPageTitle: Dispatch<SetStateAction<string>>;
};

const GlobalContext = createContext<GlobalContextType | undefined>(undefined);

export const useGlobal = (): GlobalContextType => {
  const context = useContext(GlobalContext);
  if (!context) {
    throw new Error('useGlobal must be used within a GlobalProvider');
  }
  return context;
};

export const GlobalProvider = ({ children }: { children: ReactNode}) => {
  const [pageTitle, setPageTitle] = useState<string>('Dashboard');

  return (
    <GlobalContext.Provider value={{ pageTitle, setPageTitle}}>
      {children}
    </GlobalContext.Provider>
  );
};
