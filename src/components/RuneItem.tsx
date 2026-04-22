import React from 'react';
import { COMMON_ENCHANTS, CATEGORY_ENCHANTS } from '../data/database';
import type { RuneItem as RuneItemType, EnchantRarity } from '../types';

interface RuneItemProps {
  item: RuneItemType;
  enchantId?: string;
  enchantRarity?: EnchantRarity;
  className?: string;
}

const RARITY_COLORS: Record<string, string> = {
  common: 'bg-zinc-500',
  fine: 'bg-green-500',
  rare: 'bg-blue-500',
  epic: 'bg-purple-500',
  legendary: 'bg-yellow-500',
  mythic: 'bg-red-500',
};

export const RuneItem: React.FC<RuneItemProps> = ({ item, enchantId, enchantRarity, className = '' }) => {
  const frameSrc = `${import.meta.env.BASE_URL}assets/frames/runes/${item.category}/frame_${item.rarity}.png`;
  const iconSrc = item.id.startsWith('any_')
    ? `${import.meta.env.BASE_URL}assets/runes/rune_any.png`
    : `${import.meta.env.BASE_URL}assets/runes/rune_${item.id}.png`;

  const getEnchantName = () => {
    if (!enchantId) return '';

    // Search in common
    const common = COMMON_ENCHANTS[item.category]?.find(e => e.id === enchantId);
    if (common) return common.name;

    // Search in category
    if (item.gameplayCategory) {
      const category = CATEGORY_ENCHANTS[item.gameplayCategory]?.[item.category as 'enhancement' | 'ability']?.find(e => e.id === enchantId);
      if (category) return category.name;
    }

    // Search in unique
    if (item.uniqueEnchant?.id === enchantId) return item.uniqueEnchant.name;

    return '';
  };

  const enchantName = getEnchantName();

  return (
    <div className={`relative w-20 h-20 flex items-center justify-center ${className}`}>
      {/* Rune Frame */}
      <img 
        src={frameSrc} 
        alt={item.rarity} 
        className="absolute inset-0 w-full h-full object-contain"
      />

      {/* Rune Icon */}
      <img 
        src={iconSrc} 
        alt={item.name} 
        className="relative z-10 w-2/3 h-2/3 object-contain"
      />

      {/* Enchantment Bubble - Single Line */}
      {enchantRarity && (
        <div className={`absolute -top-1 -right-1 z-20 px-1 py-0 rounded-full border border-[#0a0a0c] shadow-md ${RARITY_COLORS[enchantRarity]} whitespace-nowrap flex items-center justify-center transition-transform`}>
          <span className="text-[7px] font-black text-white uppercase tracking-tight leading-tight">
            {enchantName || '...'}
          </span>
        </div>
      )}
    </div>
  );
};