import React from 'react';
import type { GearItem as GearItemType, GearRarity } from '../types';
import { WEAPON_SKIN_DATABASE } from '../data/database';

interface GearItemProps {
  item: GearItemType;
  className?: string;
  showExtras?: boolean;
  onGodforgeToggle?: () => void;
  onSkinClick?: (index: number) => void;
  hideEmptySkins?: boolean;
}

const RARITY_ORDER: GearRarity[] = [
  'common', 'fine', 'rare', 'epic', 'epic_1', 'epic_2', 
  'legendary', 'legendary_1', 'legendary_2', 'legendary_3', 
  'mythic', 'mythic_1', 'mythic_2', 'mythic_3', 'mythic_4', 'chaotic'
];

export const GearItem: React.FC<GearItemProps> = ({ 
  item, 
  className = '', 
  showExtras = true,
  onGodforgeToggle,
  onSkinClick,
  hideEmptySkins = false
}) => {
  const frameSrc = `/assets/frames/gear/frame_${item.rarity}.png`;
  const iconSrc = `/assets/gear/${item.id}.png`;
  const sTierSrc = `/assets/gear/s_tier_badge.png`;

  const canGodforge = RARITY_ORDER.indexOf(item.rarity) >= RARITY_ORDER.indexOf('mythic_3');

  return (
    <div className={`relative w-24 h-24 flex items-center justify-center ${className}`}>
      {/* Rarity Frame */}
      <img 
        src={frameSrc} 
        alt={item.rarity} 
        className="absolute inset-0 w-full h-full object-contain"
      />
      
      {/* Gear Icon */}
      <img 
        src={iconSrc} 
        alt={item.name} 
        className="relative z-10 w-3/4 h-3/4 object-contain"
      />

      {/* S-Tier Overlay - Bottom Left */}
      {item.isSTier && (
        <img 
          src={sTierSrc} 
          alt="S-Tier" 
          className="absolute bottom-0 left-0 z-20 w-1/3 h-1/3 object-contain"
        />
      )}

      {/* Godforge Star - Top Center */}
      {showExtras && canGodforge && (
        <button 
          onClick={(e) => {
            e.stopPropagation();
            onGodforgeToggle?.();
          }}
          className="absolute -top-2 left-1/2 -translate-x-1/2 z-40 w-8 h-8 transition-transform active:scale-90"
        >
          <img 
            src={item.isGodforged ? "/assets/gear/yes_godforge.png" : "/assets/gear/no_godforge.png"} 
            alt="Godforge" 
            className="w-full h-full object-contain"
          />
        </button>
      )}

      {/* Weapon Skins Overlay (only for weapon) - 3 slots stacked to the RIGHT */}
      {showExtras && item.type === 'weapon' && (
        <div 
          className="absolute -right-7 flex flex-col gap-0.5 z-30"
          style={{ top: '50%' }} // Top edge aligned with center
        >
          {[0, 1, 2].map(idx => {
            const skin = item.activeSkins?.[idx];
            const prevSkin = idx > 0 ? item.activeSkins?.[idx - 1] : true;
            const skinData = skin ? WEAPON_SKIN_DATABASE[skin.id] : null;
            
            // Only render if it's the first slot OR the previous slot is filled
            // IF hideEmptySkins is true, also don't render if there's no skin
            if (!prevSkin || (hideEmptySkins && !skin)) return null;

            return (
              <button 
                key={idx} 
                onClick={(e) => {
                  e.stopPropagation();
                  onSkinClick?.(idx);
                }}
                className={`w-6 h-6 border border-white/30 rounded bg-gray-900/80 overflow-hidden relative transition-all active:scale-95 ${!skin ? 'opacity-20 hover:opacity-40' : 'hover:border-white/60'}`}
              >
                {skinData && (
                  <>
                    <img 
                      src={`/assets/frames/gear/frame_${skinData.rarity}.png`} 
                      className="absolute inset-0 w-full h-full object-cover"
                    />
                    <img 
                      src={`/assets/gear/skin_${item.set}_${skinData.id}.png`} 
                      alt={skinData.id} 
                      className="relative z-10 w-full h-full object-cover"
                    />
                  </>
                )}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
};
