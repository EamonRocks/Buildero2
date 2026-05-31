/* eslint-disable react-refresh/only-export-components */
import React, { createContext, useContext, useReducer, useState, useEffect } from 'react';
import type { ReactNode } from 'react';
import { loadoutReducer, initialState } from './loadoutReducer';
import type { LoadoutAction } from './loadoutReducer';
import type { Loadout, GearRarity, RuneRarity } from '../types';
import { importLoadout } from './serialization';

export type BotMode = 'render' | 'json' | null;

interface LoadoutContextType {
  state: Loadout;
  dispatch: React.Dispatch<LoadoutAction>;
  mode: BotMode;
  lastGearRarity: GearRarity | null;
  setLastGearRarity: (rarity: GearRarity | null) => void;
  lastRuneRarity: RuneRarity | null;
  setLastRuneRarity: (rarity: RuneRarity | null) => void;
}

const LoadoutContext = createContext<LoadoutContextType | undefined>(undefined);

export const LoadoutProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer(loadoutReducer, initialState);
  const [lastGearRarity, setLastGearRarity] = useState<GearRarity | null>(null);
  const [lastRuneRarity, setLastRuneRarity] = useState<RuneRarity | null>(null);
  
  const [mode] = useState<BotMode>(() => {
    const params = new URLSearchParams(window.location.search);
    const modeParam = params.get('mode') as BotMode;
    return (modeParam === 'render' || modeParam === 'json') ? modeParam : null;
  });

  const enhancedDispatch = (action: LoadoutAction) => {
    if (action.type === 'LOAD_LOADOUT') {
      setLastGearRarity(null);
      setLastRuneRarity(null);
    }
    dispatch(action);
  };

  useEffect(() => {
    // We need the RAW code parameter to avoid automatic URL decoding (e.g. %20 -> ' ')
    // because the B3 checksum is calculated on the encoded string.
    const search = window.location.search;
    const codeMatch = search.match(/[?&]code=([^&]*)/);
    const codeParam = codeMatch ? codeMatch[1] : null;

    if (codeParam) {
      const loaded = importLoadout(codeParam);
      enhancedDispatch({ type: 'LOAD_LOADOUT', payload: loaded });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <LoadoutContext.Provider value={{ 
      state, 
      dispatch: enhancedDispatch, 
      mode,
      lastGearRarity,
      setLastGearRarity,
      lastRuneRarity,
      setLastRuneRarity
    }}>
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
