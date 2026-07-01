import React, { useState, useEffect } from 'react';
import { GEAR_DATABASE, RUNE_DATABASE, CHARACTER_DATABASE, SKIN_DATABASE, WEAPON_SKIN_DATABASE } from '../data/database';
import { useLoadout } from '../state/LoadoutContext';
import { GEAR_META_RARITIES, RUNE_META_RARITIES, RUNE_RARITY_ORDER, GEAR_RARITY_ORDER } from '../types';
import type { GearRarity, RuneRarity, GearType, RuneCategory, Loadout, Enchantment, EnchantRarity, WeaponSkin, Character, GearItem as GearItemType, RuneItem as RuneItemType, Skin } from '../types';
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
  enchantSlotIndex?: number;
  onSelect: (item: Character | GearItemType | RuneItemType | Enchantment | Skin | WeaponSkin | null, rarity?: GearRarity | RuneRarity | EnchantRarity | null, stars?: number) => void;
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

const RARITY_GRADIENTS: Record<string, string> = {
  common: 'linear-gradient(135deg, #a1a1aa 0%, #71717a 100%)',
  fine: 'linear-gradient(135deg, #22c55e 0%, #15803d 100%)',
  rare: 'linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%)',
  epic: 'linear-gradient(135deg, #a855f7 0%, #7e22ce 100%)',
  epic_1: 'linear-gradient(135deg, #a855f7 0%, #7e22ce 100%)',
  epic_2: 'linear-gradient(135deg, #a855f7 0%, #7e22ce 100%)',
  legendary: 'linear-gradient(135deg, #eab308 0%, #ca8a04 100%)',
  legendary_1: 'linear-gradient(135deg, #eab308 0%, #ca8a04 100%)',
  legendary_2: 'linear-gradient(135deg, #eab308 0%, #ca8a04 100%)',
  legendary_3: 'linear-gradient(135deg, #eab308 0%, #ca8a04 100%)',
  mythic: 'linear-gradient(135deg, #ef4444 0%, #dc2626 100%)',
  mythic_1: 'linear-gradient(135deg, #ef4444 0%, #dc2626 100%)',
  mythic_2: 'linear-gradient(135deg, #ef4444 0%, #dc2626 100%)',
  mythic_3: 'linear-gradient(135deg, #ef4444 0%, #dc2626 100%)',
  mythic_4: 'linear-gradient(135deg, #ef4444 0%, #dc2626 100%)',
  chaotic: 'linear-gradient(135deg, #f472b6 0%, #db2777 100%)',
  // Meta
  legendary_plus: 'linear-gradient(135deg, #eab308 33.33%, #ef4444 33.33% 66.66%, #f472b6 66.66%)',
  mythic_plus: 'linear-gradient(135deg, #f87171 0%, #991b1b 100%)',
  mythic_3_plus: 'linear-gradient(135deg, #f87171 0%, #7f1d1d 100%)',
  epic2_plus: 'linear-gradient(135deg, #a855f7 25%, #eab308 25% 50%, #ef4444 50% 75%, #f472b6 75%)',
};

export const SelectionModal: React.FC<SelectionModalProps> = ({
  isOpen, onClose, type, gearType, runeCategory, runeIndex, resonanceIndex, skinIndex, targetId, enchantPool, enchantSlotIndex, onSelect
}) => {
  const { state, lastGearRarity, lastRuneRarity } = useLoadout();
  const [selectedRarity, setSelectedRarity] = useState<GearRarity | RuneRarity | EnchantRarity | null>(null);
  const [selectedItem, setSelectedItem] = useState<Character | GearItemType | RuneItemType | Enchantment | Skin | WeaponSkin | null>(null);
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
        setSelectedItem(currentGear ? GEAR_DATABASE[currentGear.id] as GearItemType : null);
        setSelectedRarity(currentGear?.rarity || lastGearRarity);
      } else if (type === 'rune' && runeCategory && runeIndex !== undefined) {
        const currentRune = state.runes[runeCategory][runeIndex];
        setSelectedItem(currentRune?.item ? RUNE_DATABASE[currentRune.item.id] as RuneItemType : null);
        
        const initialRarity = currentRune?.item?.rarity || lastRuneRarity;
        const availableRarities = (runeCategory === 'blessing' || runeCategory === 'etched') ? ADVANCED_RUNE_RARITIES : RUNE_RARITIES;
        
        if (initialRarity && (availableRarities as string[]).includes(initialRarity as string)) {
          setSelectedRarity(initialRarity);
        } else {
          setSelectedRarity(null);
        }
      } else if (type === 'enchant') {
        const currentRune = state.runes[runeCategory!][runeIndex!];
        const targetEnchantId = enchantSlotIndex === 1 ? currentRune.enchantId2 : currentRune.enchantId;
        const targetEnchantRarity = enchantSlotIndex === 1 ? currentRune.enchantRarity2 : currentRune.enchantRarity;
        const currentEnchant = enchantPool?.find(e => e.id === targetEnchantId);
        setSelectedItem(currentEnchant || null);
        setSelectedRarity(targetEnchantRarity || null);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isOpen, type, targetId, runeCategory, runeIndex, resonanceIndex, skinIndex, lastGearRarity, lastRuneRarity, enchantSlotIndex]);

  if (!isOpen) return null;

  const formatRarityLabel = (r: string) => {
    if (r === 'legendary_plus') return '>= LEGENDARY';
    if (r === 'mythic_plus') return '>= MYTHIC';
    if (r === 'mythic_3_plus') return '>= MYTHIC+3';
    if (r === 'epic2_plus') return '>= EPIC+2';

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

  const isItemDisabled = (item: Character | GearItemType | RuneItemType | Enchantment | Skin | WeaponSkin) => {
    if (type === 'rune' && runeCategory) {
      if (item.id.startsWith('any_')) return false; // ANY runes can be duplicates
      const categoryRunes = state.runes[runeCategory];
      return categoryRunes.some((slot, idx) => {
        if (idx === runeIndex) return false;
        
        // Exact match
        if (slot.item?.id === item.id) return true;

        // Twin Rune Exclusion:
        // 1. If 'item' is a twin rune, disable if any of its sources are equipped.
        const runeItem = item as RuneItemType;
        if (runeItem.isTwin && (slot.item?.id === runeItem.twinSource1 || slot.item?.id === runeItem.twinSource2)) return true;

        // 2. If the equipped rune is a twin rune, disable if 'item' is one of its sources.
        if (slot.item?.isTwin && (item.id === slot.item.twinSource1 || item.id === slot.item.twinSource2)) return true;

        return false;
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

  const isRarityValid = (item: Character | GearItemType | RuneItemType | Enchantment | Skin | WeaponSkin | null, rarity: string) => {
    if (!item || !rarity) return true;

    if (type === 'gear') {
      const isSTier = (item as GearItemType).isSTier;
      const isMetaRarity = GEAR_META_RARITIES.includes(rarity as GearRarity);

      if (isMetaRarity && !isSTier) return false;

      const rarityIndex = GEAR_RARITY_ORDER.indexOf(rarity as GearRarity);
      const epicIndex = GEAR_RARITY_ORDER.indexOf('epic');
      const leg3Index = GEAR_RARITY_ORDER.indexOf('legendary_3');
      if (isSTier && rarityIndex < epicIndex) return false;
      if (!isSTier && rarityIndex > leg3Index) return false;
    }

    if (type === 'rune') {
      const runeItem = item as RuneItemType;
      if (runeItem?.isTwin) {
        const rarityIndex = RUNE_RARITY_ORDER.indexOf(rarity as RuneRarity);
        const minIndex = RUNE_RARITY_ORDER.indexOf('legendary_2');
        if (rarityIndex < minIndex) return false;
      }
    }

    if (type === 'enchant') {
      return (item as Enchantment).availableRarities?.includes(rarity as EnchantRarity) ?? false;
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

              return (
                <button
                  key={i}
                  onMouseEnter={() => setHoveredStars(starNum)}
                  onClick={() => setSelectedStars(starNum)}
                  className="w-5.5 h-5.5 transition-transform active:scale-90"
                >
                  <div className={`w-full h-full relative ${isHovered ? "scale-110" : ""} transition-transform`}>
                    <img
                      src={isFilled || isHovered ? `${import.meta.env.BASE_URL}assets/ui/Star_Full.png` : `${import.meta.env.BASE_URL}assets/ui/Star_Empty.png`}
                      alt=""
                      className="w-full h-full object-contain"
                    />
                  </div>
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
    let metaRarities: string[] = [];

    if (type === 'gear') {
      rarities = GEAR_RARITIES as string[];
      metaRarities = GEAR_META_RARITIES as string[];
    }
    else if (type === 'rune') {
      rarities = (runeCategory === 'blessing' || runeCategory === 'etched') ? ADVANCED_RUNE_RARITIES as string[] : RUNE_RARITIES as string[];
      metaRarities = RUNE_META_RARITIES as string[];
    } else if (type === 'enchant') {
      rarities = (selectedItem as Enchantment)?.availableRarities || ENCHANT_RARITIES;
    }

    if (rarities.length === 0 && metaRarities.length === 0) return null;

    const renderRarityButton = (r: string) => {
      const isValid = isRarityValid(selectedItem, r);
      const gradient = RARITY_GRADIENTS[r];
      const isSelected = selectedRarity === r;

      return (
        <button
          key={r}
          onClick={() => setSelectedRarity(r as any)}
          disabled={!isValid}
          style={{
            backgroundImage: isValid ? gradient : 'none',
            backgroundColor: isValid ? 'transparent' : 'rgba(0,0,0,0.1)',
            opacity: isValid ? (isSelected ? 1 : 0.6) : 0.2
          }}
          className={`px-1.5 py-0.5 rounded border-2 text-[8px] font-black uppercase transition-all shadow-sm ${isSelected
            ? 'border-[#4a3424] scale-105'
            : isValid ? 'border-[#4a3424]/20 hover:border-[#4a3424]/40' : 'border-transparent text-black/20 cursor-not-allowed'
            }`}
        >
          <span className="text-white drop-shadow-[0_1px_1px_rgba(0,0,0,0.8)]">
            {formatRarityLabel(r)}
          </span>
        </button>
      );
    };

    return (
      <ModalSubsection title="Quality" className="p-1">
        <div className="flex flex-col gap-2">
          {/* Regular Rarities */}
          <div className="flex flex-wrap gap-1 justify-center items-center">
            {rarities.map(renderRarityButton)}
          </div>

          {/* Meta Rarities */}
          {metaRarities.length > 0 && (
            <>
              <div className="h-[1px] w-3/4 bg-[#4a3424]/10 mx-auto" />
              <div className="flex flex-wrap gap-2 justify-center items-center">
                {metaRarities.map(renderRarityButton)}
              </div>
            </>
          )}
        </div>
      </ModalSubsection>
    );
  };

  const renderItemSelector = () => {
    let items: (Character | GearItemType | RuneItemType | Enchantment | Skin | WeaponSkin)[] = [];
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
    if (type === 'gear') items = Object.values(GEAR_DATABASE).filter(i => i.type === gearType) as GearItemType[];
    if (type === 'rune') items = Object.values(RUNE_DATABASE).filter(i => i.category === runeCategory) as RuneItemType[];
    if (type === 'enchant') items = enchantPool || [];

    const isGearType = type === 'gear';

    return (
      <ModalSubsection title="Inventory" className="p-1">
        <div className={type === 'enchant' ? "flex flex-col gap-0.5" : `grid ${isGearType ? 'grid-cols-3' : 'grid-cols-4'} gap-1`}>
          {items.map((item) => {
            const isDisabled = isItemDisabled(item);
            const isRarityMatch = selectedRarity ? isRarityValid(item, selectedRarity as string) : true;
            const isEnabled = !isDisabled && isRarityMatch;

            return (
              <button
                key={item.id}
                onClick={() => {
                  setSelectedItem(item);
                  if (selectedRarity && !isRarityValid(item, selectedRarity as string)) {
                    setSelectedRarity(null);
                  }
                }}
                disabled={!isEnabled}
                className={`rounded-lg border-2 transition-all p-0.5 flex items-center relative ${type === 'enchant' ? 'justify-start px-2 py-1' : 'aspect-square justify-center'
                  } ${selectedItem?.id === item.id
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
                          <img src={`${import.meta.env.BASE_URL}assets/characters/skin_${(item as Skin).characterId}_${item.id}.png`} className="relative z-10 w-full h-full object-cover" />
                        )}
                      </div>
                    ) : (
                      (selectedRarity && isRarityMatch) ? (
                        type === 'gear' ?
                          <GearItemComponent item={{ ...item as GearItemType, rarity: selectedRarity as GearRarity }} className="w-full h-full scale-110" showExtras={false} /> :
                          <RuneItemComponent item={{ ...item as RuneItemType, rarity: selectedRarity as RuneRarity }} className="w-full h-full scale-110" />
                      ) : (
                        type === 'rune' && (item as RuneItemType).isTwin ? (
                          /* For twin runes with no rarity selected, show icons only with no frame */
                          <RuneItemComponent item={{ ...item as RuneItemType, rarity: 'common' }} hideFrame={true} className="w-full h-full" />
                        ) : (
                          <img 
                            src={item.id.startsWith('any_') 
                              ? `${import.meta.env.BASE_URL}assets/runes/rune_any.png`
                              : `${import.meta.env.BASE_URL}assets/${type === 'gear' ? 'gear' : 'runes'}/${type === 'gear' ? '' : 'rune_'}${item.id}.png`
                            } 
                            className="w-full h-full object-contain" 
                          />
                        )
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
      {(type === 'gear' || type === 'rune' || type === 'enchant' || resonanceIndex !== undefined || skinIndex !== undefined) && (
        <NineSliceButton
          imageSrc={`${import.meta.env.BASE_URL}assets/ui/Btn_Red_S.png`}
          onClick={handleClear}
          className="flex-1 h-11 text-xs"
        >
          Clear
        </NineSliceButton>
      )}
      <NineSliceButton
        imageSrc={(!selectedItem || (type !== 'character' && resonanceIndex === undefined && skinIndex === undefined && !selectedRarity)) ? `${import.meta.env.BASE_URL}assets/ui/Btn_Gray_S.png` : `${import.meta.env.BASE_URL}assets/ui/Btn_Yellow_S.png`}
        onClick={handleConfirm}
        disabled={!selectedItem || (type !== 'character' && resonanceIndex === undefined && skinIndex === undefined && !selectedRarity)}
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
        {(type === 'character' || resonanceIndex !== undefined || skinIndex !== undefined) && renderStarSelector()}
        {renderRaritySelector()}
        {renderItemSelector()}
      </div>
    </ModalPopup>
  );
};
