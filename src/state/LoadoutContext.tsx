import React, { createContext, useContext, useReducer } from 'react';
import type { ReactNode } from 'react';
import { loadoutReducer, initialState } from './loadoutReducer';
import type { LoadoutAction } from './loadoutReducer';
import type { Loadout } from '../types';

interface LoadoutContextType {
  state: Loadout;
  dispatch: React.Dispatch<LoadoutAction>;
}

const LoadoutContext = createContext<LoadoutContextType | undefined>(undefined);

export const LoadoutProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer(loadoutReducer, initialState);

  return (
    <LoadoutContext.Provider value={{ state, dispatch }}>
      {children}
    </LoadoutContext.Provider>
  );
};

export const useLoadout = () => {
  const context = useContext(LoadoutContext);
  if (context === undefined) {
    throw new Error('useLoadout must be used within a LoadoutProvider');
  }
  return context;
};
