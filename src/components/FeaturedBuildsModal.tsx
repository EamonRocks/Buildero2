import React from 'react';
import ModalPopup from './ModalPopup';
import { NineSliceButton } from './NineSliceButton';
import { useLoadout } from '../state/LoadoutContext';
import { importLoadout } from '../state/serialization';
import { FEATURED_BUILDS } from '../data/database';

interface FeaturedBuildsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const FeaturedBuildsModal: React.FC<FeaturedBuildsModalProps> = ({ isOpen, onClose }) => {
  const { dispatch } = useLoadout();

  const handleLoad = (code: string) => {
    try {
      const imported = importLoadout(code);
      dispatch({ type: 'LOAD_LOADOUT', payload: imported });
      onClose();
    } catch (err) {
      console.error('Failed to load featured build:', err);
    }
  };

  return (
    <ModalPopup isOpen={isOpen} onClose={onClose} title="Featured Builds">
      {/* Scrollable list directly inside the bg_chat_01.png container */}
      <div className="flex flex-col gap-1 max-h-[500px] overflow-y-auto p-1 pr-2 custom-scrollbar">
        {FEATURED_BUILDS.map((build, idx) => (
          <div 
            key={idx}
            className="w-full relative min-h-[50px] flex items-center justify-between px-6 py-1 group active:scale-[0.98] transition-all"
          >
            {/* 9-Slice Style Frame for the Tile */}
            <div 
              className="absolute inset-0 z-0 opacity-90 group-hover:opacity-100 transition-opacity"
              style={{
                borderStyle: 'solid',
                borderWidth: '12px',
                borderImageSource: 'url(/assets/ui/BGTop_Popup.png)',
                borderImageSlice: '40 fill',
                borderImageRepeat: 'stretch',
              }}
            />
            
            <span className="relative z-10 text-sm font-bold text-[#4a3424] truncate pr-4 drop-shadow-sm">
              {build.name}
            </span>
            
            <div className="relative z-10 scale-90">
              <NineSliceButton
                imageSrc="/assets/ui/Btn_Blue_S.png"
                onClick={() => handleLoad(build.code)}
                className="h-8 px-4 text-[10px] font-black"
              >
                Load
              </NineSliceButton>
            </div>
          </div>
        ))}
      </div>
    </ModalPopup>
  );
};
