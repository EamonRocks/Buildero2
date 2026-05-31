import React from 'react';
import { useLoadout } from '../state/LoadoutContext';
import { RenderModeView } from './RenderModeView';
import { JsonModeView } from './JsonModeView';

export const BotView: React.FC = () => {
  const { mode } = useLoadout();

  if (mode === 'json') return <JsonModeView />;
  if (mode === 'render') return <RenderModeView />;
  return null;
};
