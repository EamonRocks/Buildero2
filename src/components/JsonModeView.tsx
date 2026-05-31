import React from 'react';
import { useLoadout } from '../state/LoadoutContext';

export const JsonModeView: React.FC = () => {
  const { state } = useLoadout();
  return (
    <pre className="p-4 bg-black text-green-400 font-mono text-xs overflow-auto h-screen">
      {JSON.stringify(state, null, 2)}
    </pre>
  );
};
