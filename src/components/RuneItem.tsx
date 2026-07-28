import React from 'react';
import { COMMON_ENCHANTS, CATEGORY_ENCHANTS } from '../data/database';
import type { RuneItem as RuneItemType, EnchantRarity } from '../types';

interface RuneItemProps {
  item: RuneItemType;
  enchantId?: string;
  enchantRarity?: EnchantRarity;
  enchantId2?: string;
  enchantRarity2?: EnchantRarity;
  className?: string;
  hideFrame?: boolean;
  bubbleSide?: 'left' | 'right' | 'center';
  onEnchantClick?: (slotIdx: number) => void;
  canEnchant?: boolean;
  hideEnchants?: boolean;
  enchantsOnly?: boolean;
  badgeOffset?: number;
}

const RARITY_COLORS: Record<string, string> = {
  common: 'bg-zinc-500',
  fine: 'bg-green-500',
  rare: 'bg-blue-500',
  epic: 'bg-purple-500',
  legendary: 'bg-yellow-500',
  mythic: 'bg-red-500',
};

const PlusIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="4"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <line x1="12" y1="5" x2="12" y2="19" />
    <line x1="5" y1="12" x2="19" y2="12" />
  </svg>
);

export const RuneItem: React.FC<RuneItemProps> = ({ 
  item, 
  enchantId, 
  enchantRarity, 
  enchantId2, 
  enchantRarity2, 
  className = '', 
  hideFrame = false,
  bubbleSide = 'right',
  onEnchantClick,
  canEnchant = false,
  hideEnchants = false,
  enchantsOnly = false,
  badgeOffset = -7
}) => {
  const frameSrc = `${import.meta.env.BASE_URL}assets/frames/runes/${item.category}/frame_${item.rarity}.png`;
  
  const getIconSrc = (id: string) => {
    if (id.startsWith('any_')) return `${import.meta.env.BASE_URL}assets/runes/rune_any.png`;
    return `${import.meta.env.BASE_URL}assets/runes/rune_${id}.png`;
  };

  const getEnchantName = (eid?: string) => {
    if (!eid) return '';

    // Search in common
    const common = COMMON_ENCHANTS[item.category]?.find(e => e.id === eid);
    if (common) return common.name;

    // Search in category
    if (item.gameplayCategory) {
      const category = CATEGORY_ENCHANTS[item.gameplayCategory]?.[item.category as 'enhancement' | 'ability']?.find(e => e.id === eid);
      if (category) return category.name;
    }

    // Search in unique
    if (item.uniqueEnchant?.id === eid) return item.uniqueEnchant.name;

    // Search in twin unique enchants
    if (item.uniqueEnchants) {
      const unique = item.uniqueEnchants.find(e => e.id === eid);
      if (unique) return unique.name;
    }

    return '';
  };

  const enchantName = getEnchantName(enchantId);
  const enchantName2 = getEnchantName(enchantId2);

  const getBadgeSrc = () => {
    if (!item.isTwin) return null;
    if (item.rarity === 'legendary_2') return `${import.meta.env.BASE_URL}assets/ui/badge_legendary_2.png`;
    if (item.rarity === 'legendary_3') return `${import.meta.env.BASE_URL}assets/ui/badge_legendary_3.png`;
    if (item.rarity === 'mythic') return `${import.meta.env.BASE_URL}assets/ui/badge_mythic.png`;
    return null;
  };

  const badgeSrc = getBadgeSrc();

  // Anchoring logic for enchantment bubbles
  let bubbleContainerClasses = 'absolute -top-2 z-20 flex flex-col gap-0.5';
  if (bubbleSide === 'right') {
    bubbleContainerClasses += ' left-1/2 items-start';
  } else if (bubbleSide === 'left') {
    bubbleContainerClasses += ' right-1/2 items-end';
  } else {
    bubbleContainerClasses += ' left-1/2 -translate-x-1/2 items-center';
  }

  const renderEnchantBubble = (eid: string | undefined, rarity: EnchantRarity | undefined, name: string, slotIdx: number) => {
    const hasEnchant = !!eid;

    if (!hasEnchant && !onEnchantClick) return null;
    if (!canEnchant && !hasEnchant) return null;

    const content = hasEnchant ? (
      <div className={`px-1 py-[0.5px] rounded-full border border-[#0a0a0c] shadow-md ${RARITY_COLORS[rarity!] || 'bg-zinc-500'} whitespace-nowrap flex items-center justify-center`}>
        <span className="text-[6.5px] font-extrabold text-white uppercase tracking-tighter leading-none">
          {name || '...'}
        </span>
      </div>
    ) : (
      <div className="w-4 h-4 bg-black/60 backdrop-blur-md rounded-full border border-white/20 flex items-center justify-center hover:bg-accent/40 transition-colors shadow-md">
        <PlusIcon className="w-2.5 h-2.5 text-white" />
      </div>
    );

    if (onEnchantClick) {
      return (
        <button
          key={slotIdx}
          onClick={(e) => {
            e.stopPropagation();
            onEnchantClick(slotIdx);
          }}
          className="transition-transform hover:scale-110 active:scale-95 pointer-events-auto"
        >
          {content}
        </button>
      );
    }

    return <div key={slotIdx}>{content}</div>;
  };

  if (enchantsOnly) {
    return (
      <div className={`relative w-20 h-20 flex items-center justify-center pointer-events-none ${className}`}>
        <div className={bubbleContainerClasses}>
          {renderEnchantBubble(enchantId, enchantRarity, enchantName, 0)}
          {item.isTwin && renderEnchantBubble(enchantId2, enchantRarity2, enchantName2, 1)}
        </div>
      </div>
    );
  }

  return (
    <div className={`relative w-20 h-20 flex items-center justify-center ${className}`}>
      {/* Rune Frame */}
      {!hideFrame && (
        <img 
          src={frameSrc} 
          alt={item.rarity} 
          className="absolute inset-0 w-full h-full object-contain"
        />
      )}

      {/* Rune Icons */}
      {item.isTwin && item.twinSource1 && item.twinSource2 ? (
        <div className="relative w-3/4 h-3/4 pointer-events-none">
          {/* Source 1 (Top Left) */}
          <img 
            src={getIconSrc(item.twinSource1)} 
            alt="" 
            className="absolute top-0 left-0 w-[70%] h-[70%] object-contain z-10"
          />
          {/* Source 2 (Bottom Right) */}
          <img 
            src={getIconSrc(item.twinSource2)} 
            alt="" 
            className="absolute bottom-0 right-0 w-[70%] h-[70%] object-contain z-10"
          />
        </div>
      ) : (
        <img 
          src={getIconSrc(item.id)} 
          alt={item.name} 
          className="relative z-10 w-2/3 h-2/3 object-contain"
        />
      )}

      {/* Twin Badges */}
      {badgeSrc && (
        <>
          <div 
            className="absolute left-0 top-1/2 z-20 w-[30%] pointer-events-none flex justify-center" 
            style={{ 
              transform: `translate(calc(-50% - ${badgeOffset}px), -50%)`,
            }}
          >
            <img src={badgeSrc} alt="" className="w-full h-auto" />
          </div>
          <div 
            className="absolute right-0 top-1/2 z-20 w-[30%] pointer-events-none flex justify-center" 
            style={{ 
              transform: `translate(calc(50% + ${badgeOffset}px), -50%)`,
            }}
          >
            <img src={badgeSrc} alt="" className="w-full h-auto" />
          </div>
        </>
      )}

      {/* Overlays Container */}
      {!hideEnchants && (
        <div className={bubbleContainerClasses}>
          {renderEnchantBubble(enchantId, enchantRarity, enchantName, 0)}
          {item.isTwin && renderEnchantBubble(enchantId2, enchantRarity2, enchantName2, 1)}
        </div>
      )}
    </div>
  );
};
