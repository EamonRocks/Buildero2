import React, { useState, useEffect } from 'react';
import { GEAR_DATABASE, RUNE_DATABASE, CHARACTER_DATABASE, SKIN_DATABASE, WEAPON_SKIN_DATABASE } from '../data/database';
import { useLoadout } from '../state/LoadoutContext';
import type { GearRarity, RuneRarity, GearType, RuneCategory, Loadout, Enchantment, EnchantRarity, WeaponSkin } from '../types';
import { GearItem as GearItemComponent } from './GearItem';
import { RuneItem as RuneItemComponent } from './RuneItem';
import ModalPopup from './ModalPopup';
import ModalSubsection from './ModalSubsection';
import { NineSliceButton } from './NineSliceButton';

interface SelectionModalProps {
  isOpen: boolean;
  onClose: () => void;
  type: 'character' | 'gear' | 'rune' | 'resonance' | 'enchant' | 'skin';
  targetId: string;
  gearType?: GearType;
  runeCategory?: RuneCategory;
  runeIndex?: number;
  resonanceIndex?: number;
  enchantPool?: Enchantment[];
  skinIndex?: number;
  onSelect: (item: any, rarity?: any, stars?: number) => void;
}

const GEAR_RARITIES: GearRarity[] = [
  'common', 'fine', 'rare', 'epic', 'epic_1', 'epic_2', 
  'legendary', 'legendary_1', 'legendary_2', 'legendary_3', 
  'mythic', 'mythic_1', 'mythic_2', 'mythic_3', 'mythic_4', 'chaotic'
];

const RUNE_RARITIES: RuneRarity[] = [
  'common', 'fine', 'rare', 'epic', 'epic_1', 'epic_2', 
  'legendary', 'legendary_1', 'legendary_2', 'legendary_3', 'mythic'
];

const ADVANCED_RUNE_RARITIES: RuneRarity[] = [
  'rare', 'epic', 'epic_1', 'epic_2', 
  'legendary', 'legendary_1', 'legendary_2', 'legendary_3', 'mythic'
];

const ENCHANT_RARITIES: EnchantRarity[] = ['common', 'fine', 'rare', 'epic', 'legendary', 'mythic'];

const RARITY_TINTS: Record<string, string> = {
  common: 'rgba(161, 161, 170, 0.4)',
  fine: 'rgba(34, 197, 94, 0.4)',
  rare: 'rgba(59, 130, 246, 0.4)',
  epic: 'rgba(168, 85, 247, 0.4)',
  legendary: 'rgba(234, 179, 8, 0.4)',
  mythic: 'rgba(239, 68, 68, 0.4)',
  chaotic: 'rgba(247, 91, 195, 0.4)',
};

const getRarityColor = (r: string) => {
  const base = r.split('_')[0];
  return RARITY_TINTS[base] || 'rgba(255, 255, 255, 0.05)';
};

const StarIcon = ({ filled, hovered }: { filled: boolean; hovered: boolean; isBreakpoint: boolean }) => (
  <div className={`w-full h-full relative ${hovered ? "scale-110" : ""} transition-transform`}>
    <img 
      src={filled || hovered ? `${import.meta.env.BASE_URL}assets/ui/Star_Full.png` : `${import.meta.env.BASE_URL}assets/ui/Star_Empty.png`} 
      alt="" 
      className="w-full h-full object-contain"
    />
  </div>
);

export const SelectionModal: React.FC<SelectionModalProps> = ({ 
  isOpen, onClose, type, gearType, runeCategory, runeIndex, resonanceIndex, skinIndex, targetId, enchantPool, onSelect 
}) => {
  const { state } = useLoadout();
  const [selectedRarity, setSelectedRarity] = useState<any>(null);
  const [selectedItem, setSelectedItem] = useState<any>(null);
  const [selectedStars, setSelectedStars] = useState<number>(0);
  const [hoveredStar, setHoveredStars] = useState<number | null>(null);

  useEffect(() => {
    if (isOpen) {
      if (type === 'character') {
        setSelectedItem(CHARACTER_DATABASE[state.character.id]);
        setSelectedStars(state.character.stars);
        setSelectedRarity(null);
      } else if (type === 'skin' && skinIndex !== undefined) {
        if (targetId === 'weapon') {
          const currentSkin = state.gear.weapon?.activeSkins?.[skinIndex];
          setSelectedItem(currentSkin ? WEAPON_SKIN_DATABASE[currentSkin.id] : null);
          setSelectedStars(currentSkin?.stars || 0);
          setSelectedRarity(null);
        } else {
          const charState = resonanceIndex !== undefined ? state.resonances[resonanceIndex] : state.character;
          const currentSkin = charState?.activeSkins[skinIndex];
          setSelectedItem(currentSkin ? SKIN_DATABASE[currentSkin.id] : null);
          setSelectedStars(currentSkin?.stars || 0);
          setSelectedRarity(null);
        }
      } else if (type === 'resonance' && resonanceIndex !== undefined) {
        const currentRes = state.resonances[resonanceIndex];
        setSelectedItem(currentRes ? CHARACTER_DATABASE[currentRes.id] : null);
        setSelectedStars(currentRes?.stars || 0);
        setSelectedRarity(null);
      } else if (type === 'gear') {
        const currentGear = state.gear[targetId as keyof Loadout['gear']];
        setSelectedItem(currentGear ? GEAR_DATABASE[currentGear.id] : null);
        setSelectedRarity(currentGear?.rarity || null);
      } else if (type === 'rune' && runeCategory && runeIndex !== undefined) {
        const currentRune = state.runes[runeCategory][runeIndex];
        setSelectedItem(currentRune?.item ? RUNE_DATABASE[currentRune.item.id] : null);
        setSelectedRarity(currentRune?.item?.rarity || null);
      } else if (type === 'enchant') {
        const currentRune = state.runes[runeCategory!][runeIndex!];
        const currentEnchant = enchantPool?.find(e => e.id === currentRune.enchantId);
        setSelectedItem(currentEnchant || null);
        setSelectedRarity(currentRune.enchantRarity || null);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isOpen, type, targetId, runeCategory, runeIndex, resonanceIndex, skinIndex]);

  if (!isOpen) return null;

  const formatRarityLabel = (r: string) => {
    if (r.includes('_')) {
      const [base, num] = r.split('_');
      return `${base.charAt(0).toUpperCase()}+${num}`;
    }
    return r.charAt(0).toUpperCase() + r.slice(1);
  };

  const handleConfirm = () => {
    if (type === 'character' || type === 'resonance' || type === 'skin') {
      onSelect(selectedItem, null, selectedStars);
    } else {
      onSelect(selectedItem, selectedRarity);
    }
  };

  const handleClear = () => {
    onSelect(null, null, 0);
  };

  const isItemDisabled = (item: any) => {
    if (type === 'rune' && runeCategory) {
      const categoryRunes = state.runes[runeCategory];
      return categoryRunes.some((slot, idx) => {
        if (idx === runeIndex) return false; 
        return slot.item?.id === item.id;
      });
    }
    if (type === 'skin') {
      if (targetId === 'weapon') {
        const activeSkins = state.gear.weapon?.activeSkins || [];
        return activeSkins.some((s, idx) => {
          if (idx === skinIndex) return false;
          return s.id === item.id;
        });
      } else {
        const activeSkins = resonanceIndex !== undefined 
          ? state.resonances[resonanceIndex]?.activeSkins || []
          : state.character.activeSkins;
        return activeSkins.some((s, idx) => {
          if (idx === skinIndex) return false;
          return s.id === item.id;
        });
      }
    }
    if (type === 'resonance') {
      if (item.id === state.character.id) return true;
      const otherIdx = resonanceIndex === 0 ? 1 : 0;
      if (state.resonances[otherIdx]?.id === item.id) return true;
    }
    return false;
  };

  const isRarityValid = (item: any, rarity: string) => {
    if (!item || !rarity) return true;
    
    if (type === 'gear') {
      const isSTier = item.isSTier;
      const rarityIndex = GEAR_RARITIES.indexOf(rarity as GearRarity);
      const epicIndex = GEAR_RARITIES.indexOf('epic');
      const leg3Index = GEAR_RARITIES.indexOf('legendary_3');
      if (isSTier && rarityIndex < epicIndex) return false;
      if (!isSTier && rarityIndex > leg3Index) return false;
    }

    if (type === 'enchant') {
      return item.availableRarities?.includes(rarity) ?? false;
    }

    return true;
  };

  const renderStarSelector = () => {
    if (type === 'skin') return null; // No stars for skins
    
    const maxStars = 8;
    return (
      <ModalSubsection title="Progression" className="p-1">
        <div className="flex items-center justify-center gap-3">
          <button
            onClick={() => setSelectedStars(0)}
            className="w-7 h-7 flex items-center justify-center active:scale-90 transition-transform"
          >
            <img 
              src={`${import.meta.env.BASE_URL}assets/ui/btn_close_dark.png`} 
              alt="Clear" 
              className="w-full h-full object-contain"
            />
          </button>

          <div className="flex gap-0.5 items-center" onMouseLeave={() => setHoveredStars(null)}>
            {Array.from({ length: maxStars }).map((_, i) => {
              const starNum = i + 1;
              const isFilled = starNum <= selectedStars;
              const isHovered = hoveredStar !== null && starNum <= hoveredStar;
              const isBreakpoint = starNum === 3 || starNum === 6;
              
              return (
                <button
                  key={i}
                  onMouseEnter={() => setHoveredStars(starNum)}
                  onClick={() => setSelectedStars(starNum)}
                  className="w-5.5 h-5.5 transition-transform active:scale-90"
                >
                  <StarIcon filled={isFilled} hovered={isHovered} isBreakpoint={isBreakpoint} />
                </button>
              );
            })}
          </div>

          <div className="w-6 flex justify-center">
            <span className="text-xl font-black italic text-[#4a3424] drop-shadow-sm leading-none">{selectedStars}</span>
          </div>
        </div>
      </ModalSubsection>
    );
  };

  const renderRaritySelector = () => {
    let rarities: string[] = [];
    if (type === 'gear') rarities = GEAR_RARITIES;
    else if (type === 'rune') {
      rarities = (runeCategory === 'blessing' || runeCategory === 'etched') ? ADVANCED_RUNE_RARITIES : RUNE_RARITIES;
    } else if (type === 'enchant') {
      rarities = selectedItem?.availableRarities || ENCHANT_RARITIES;
    }

    if (rarities.length === 0) return null;

    return (
      <ModalSubsection title="Quality" className="p-1">
        <div className="flex flex-wrap gap-0.5 justify-center">
          {rarities.map((r) => {
            const isValid = isRarityValid(selectedItem, r);
            const tint = getRarityColor(r);
            const isSelected = selectedRarity === r;
            
            return (
              <button
                key={r}
                onClick={() => setSelectedRarity(r)}
                disabled={!isValid}
                style={{ 
                  backgroundColor: isValid ? tint : 'rgba(0,0,0,0.1)',
                  opacity: isValid ? (isSelected ? 1 : 0.6) : 0.2
                }}
                className={`px-1.5 py-0.5 rounded border-2 text-[8px] font-black uppercase transition-all ${
                  isSelected 
                    ? 'border-[#4a3424] text-[#4a3424]' 
                    : isValid ? 'border-[#4a3424]/20 text-[#4a3424]/80 hover:border-[#4a3424]/40' : 'border-transparent text-black/20 cursor-not-allowed'
                }`}
              >
                {formatRarityLabel(r)}
              </button>
            );
          })}
        </div>
      </ModalSubsection>
    );
  };

  const renderItemSelector = () => {
    let items: any[] = [];
    if (type === 'character' || type === 'resonance' || type === 'skin') {
      if (type === 'skin') {
        if (targetId === 'weapon') {
          const weaponId = state.gear.weapon?.id;
          items = Object.values(WEAPON_SKIN_DATABASE).filter(s => s.weaponId === weaponId);
        } else {
          const charId = resonanceIndex !== undefined ? state.resonances[resonanceIndex]?.id : state.character.id;
          items = Object.values(SKIN_DATABASE).filter(s => s.characterId === charId && s.id !== 'base');
        }
      } else {
        items = Object.values(CHARACTER_DATABASE);
      }
    }
    if (type === 'gear') items = Object.values(GEAR_DATABASE).filter(i => i.type === gearType);
    if (type === 'rune') items = Object.values(RUNE_DATABASE).filter(i => i.category === runeCategory);
    if (type === 'enchant') items = enchantPool || [];

    const isGearType = type === 'gear';

    return (
      <ModalSubsection title="Inventory" className="p-1">
        <div className={type === 'enchant' ? "flex flex-col gap-0.5" : `grid ${isGearType ? 'grid-cols-3' : 'grid-cols-4'} gap-1`}>
          {items.map((item) => {
            const isDisabled = isItemDisabled(item);
            const isRarityMatch = selectedRarity ? isRarityValid(item, selectedRarity) : true;
            const isEnabled = !isDisabled && isRarityMatch;

            return (
              <button
                key={item.id}
                onClick={() => {
                  setSelectedItem(item);
                  if (selectedRarity && !isRarityValid(item, selectedRarity)) {
                    setSelectedRarity(null);
                  }
                }}
                disabled={!isEnabled}
                className={`rounded-lg border-2 transition-all p-0.5 flex items-center relative ${
                  type === 'enchant' ? 'justify-start px-2 py-1' : 'aspect-square justify-center'
                } ${
                  selectedItem?.id === item.id 
                    ? 'border-[#4a3424] bg-[#4a3424]/10 shadow-inner' 
                    : isEnabled 
                      ? (type === 'rune' ? 'border-transparent bg-black/40 hover:border-[#4a3424]/20' : 'border-transparent bg-black/5 hover:border-[#4a3424]/20') 
                      : 'opacity-10 grayscale cursor-not-allowed'
                }`}
              >
                 {type === 'enchant' ? (
                   <span className="text-xs font-bold text-[#4a3424]">{item.name}</span>
                 ) : (
                   <>
                     {type === 'character' || type === 'resonance' ? (
                        <img src={`${import.meta.env.BASE_URL}assets/characters/character_${item.id}.png`} className="w-full h-full object-cover rounded-lg" />
                     ) : type === 'skin' ? (
                        <div className="w-full h-full flex flex-col items-center justify-center relative overflow-hidden rounded-md">
                          {targetId === 'weapon' ? (
                             <>
                               <img src={`${import.meta.env.BASE_URL}assets/frames/gear/frame_${(item as WeaponSkin).rarity}.png`} className="absolute inset-0 w-full h-full object-cover" />
                               <img src={`${import.meta.env.BASE_URL}assets/gear/skin_${state.gear.weapon?.set}_${item.id}.png`} className="relative z-10 w-full h-full object-cover" />
                             </>
                          ) : (
                             <img src={`${import.meta.env.BASE_URL}assets/characters/skin_${item.characterId}_${item.id}.png`} className="w-full h-full object-cover" />
                          )}
                        </div>
                     ) : (
                        selectedRarity && isRarityMatch ? (
                          type === 'gear' ? 
                            <GearItemComponent item={{...item, rarity: selectedRarity}} className="w-full h-full scale-110" showExtras={false} /> :
                            <RuneItemComponent item={{...item, rarity: selectedRarity}} className="w-full h-full scale-110" />
                        ) : (
                          <img src={`${import.meta.env.BASE_URL}assets/${type === 'gear' ? 'gear' : 'runes'}/${type === 'gear' ? '' : 'rune_'}${item.id}.png`} className="w-full h-full object-contain" />
                        )
                     )}
                   </>
                 )}
                 {isDisabled && (
                  <div className="absolute inset-0 flex items-center justify-center bg-black/40 rounded-lg pointer-events-none">
                    <span className="text-[6px] font-black uppercase tracking-tighter text-white bg-red-600/80 px-1 rounded-sm">
                      {type === 'resonance' ? 'Occupied' : 'Used'}
                    </span>
                  </div>
                 )}
              </button>
            );
          })}
        </div>
      </ModalSubsection>
    );
  };

  const actions = (
    <>
      {(type === 'gear' || type === 'rune' || type === 'enchant' || type === 'resonance' || type === 'skin') && (
        <NineSliceButton
          imageSrc={`${import.meta.env.BASE_URL}assets/ui/Btn_Red_S.png`}
          onClick={handleClear}
          className="flex-1 h-11 text-xs"
        >
          Clear
        </NineSliceButton>
      )}
      <NineSliceButton
        imageSrc={(!selectedItem || (type !== 'character' && type !== 'resonance' && type !== 'skin' && !selectedRarity)) ? `${import.meta.env.BASE_URL}assets/ui/Btn_Gray_S.png` : `${import.meta.env.BASE_URL}assets/ui/Btn_Yellow_S.png`}
        onClick={handleConfirm}
        disabled={!selectedItem || (type !== 'character' && type !== 'resonance' && type !== 'skin' && !selectedRarity)}
        className="flex-1 h-11 text-xs"
      >
        Confirm
      </NineSliceButton>
    </>
  );

  return (
    <ModalPopup 
      isOpen={isOpen} 
      onClose={onClose} 
      title={`Select ${type}`}
      actions={actions}
    >
      <div className="flex flex-col gap-0.5 p-0">
        {(type === 'character' || type === 'resonance' || type === 'skin') && renderStarSelector()}
        {renderRaritySelector()}
        {renderItemSelector()}
      </div>
    </ModalPopup>
  );
};
