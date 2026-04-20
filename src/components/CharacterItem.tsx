import React from 'react';
import type { CharacterState } from '../types';
import { SKIN_DATABASE } from '../data/database';

interface CharacterItemProps {
  character?: CharacterState;
  className?: string;
  size?: 'normal' | 'small';
  isLocked?: boolean;
  onSkinClick?: (index: number) => void;
  onMainClick?: () => void;
  hideEmptySkins?: boolean;
}

const StarIcon = ({ filled }: { filled: boolean }) => (
  <div className="w-full h-full relative">
    <img 
      src={filled ? `${import.meta.env.BASE_URL}assets/ui/Star_Full.png` : `${import.meta.env.BASE_URL}assets/ui/Star_Empty.png`} 
      alt="" 
      className="w-full h-full object-contain"
    />
  </div>
);

const LockIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="w-1/2 h-1/2 text-zinc-700">
    <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
    <path d="M7 11V7a5 5 0 0 1 10 0v4" />
  </svg>
);

const PlusIcon = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <line x1="12" y1="5" x2="12" y2="19" />
    <line x1="5" y1="12" x2="19" y2="12" />
  </svg>
);

export const CharacterItem: React.FC<CharacterItemProps> = ({ 
  character, 
  className = '', 
  size = 'normal', 
  isLocked = false,
  onSkinClick,
  onMainClick,
  hideEmptySkins = false
}) => {
  const isNormal = size === 'normal';
  const containerWidth = isNormal ? 'w-[28vmin] max-w-[120px]' : 'w-[20vmin] max-w-[80px]';

  if (isLocked) {
    return (
      <div className={`flex flex-col items-center gap-1 ${className} ${containerWidth}`}>
        <div className="w-[75%] aspect-square bg-zinc-900 border-2 border-zinc-800 rounded-xl flex items-center justify-center grayscale opacity-50 shadow-inner">
          <LockIcon />
        </div>
      </div>
    );
  }

  if (!character) {
    return (
      <div className={`flex flex-col items-center gap-1 ${className} ${containerWidth}`}>
        <button 
          onClick={onMainClick}
          className="w-[75%] aspect-square bg-zinc-900/50 border-2 border-zinc-800 rounded-xl flex items-center justify-center group hover:border-accent/50 transition-all shadow-inner active:scale-95"
        >
          <span className="text-[4vmin] font-black text-zinc-800 group-hover:text-accent/50 transition-colors">+</span>
        </button>
      </div>
    );
  }

  const { id: characterId, activeSkins, stars } = character;
  
  const renderSkinSlot = (idx: number) => {
    const skinState = activeSkins[idx];
    const skinData = skinState ? SKIN_DATABASE[skinState.id] : null;
    const isEnabled = idx === 0 || (idx === 1 && activeSkins.length > 0);

    if (hideEmptySkins && !skinState) return null;

    return (
      <button
        key={idx}
        disabled={!onSkinClick || !isEnabled}
        onClick={(e) => {
          e.stopPropagation();
          onSkinClick?.(idx);
        }}
        className={`w-full aspect-square border rounded-md overflow-hidden bg-zinc-950/50 shadow-sm relative transition-all active:scale-95 ${
          !isEnabled ? 'opacity-10 grayscale cursor-not-allowed border-zinc-900' :
          !skinState ? 'border-zinc-800 hover:border-accent/50' : 
          'border-accent/50 bg-accent/5'
        }`}
      >
        {skinData ? (
          <div className="w-full h-full flex flex-col items-center justify-center">
            <img 
              src={`${import.meta.env.BASE_URL}assets/characters/skin_${characterId}_${skinData.id}.png`} 
              className="w-full h-full object-cover"
              alt={skinData.name}
            />
          </div>
        ) : (
          <div className="w-full h-full flex items-center justify-center opacity-20">
            <PlusIcon className="w-1/2 h-1/2 text-zinc-400" />
          </div>
        )}
      </button>
    );
  };

  const hasAnySkins = activeSkins.length > 0;

  return (
    <div className={`flex flex-col items-center ${className} ${containerWidth}`}>
      <div className="flex items-start gap-[4%] w-full">
        {/* Main Character Square Button */}
        <button 
          onClick={onMainClick}
          className="relative w-[70%] aspect-square border-2 border-zinc-800 rounded-xl overflow-hidden shadow-xl bg-zinc-900 transition-transform active:scale-95 group hover:border-accent/30"
        >
          <img 
            src={`${import.meta.env.BASE_URL}assets/characters/character_${characterId}.png`} 
            alt={characterId} 
            className="w-full h-full object-cover"
          />
        </button>

        {/* Skins Column */}
        {(!hideEmptySkins || hasAnySkins) && (
          <div className="flex flex-col gap-[8%] w-[26%]">
            {[0, 1].map(renderSkinSlot)}
          </div>
        )}
      </div>

      {/* Stars */}
      <div className="flex gap-[2%] mt-0.5 justify-center w-[70%] mr-[30%]">
        {Array.from({ length: 8 }).map((_, i) => (
          <div key={i} className="w-[10%] aspect-square min-w-[4px]">
            <StarIcon filled={i < stars} />
          </div>
        ))}
      </div>
    </div>
  );
};
