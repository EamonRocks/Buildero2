import React, { useState } from 'react';
import { useLoadout } from '../state/LoadoutContext';
import { CharacterItem } from './CharacterItem';
import { GearItem } from './GearItem';
import { RuneItem } from './RuneItem';
import { SelectionModal } from './SelectionModal';
import { NineSliceButton } from './NineSliceButton';
import { COMMON_ENCHANTS, CATEGORY_ENCHANTS } from '../data/database';
import { RUNE_RARITY_ORDER, MIN_ENCHANT_RARITY } from '../types';
import type { GearType, RuneCategory, GearItem as GearItemType, RuneItem as RuneItemType, Character, Loadout, CharacterState, Enchantment, EnchantRarity, Skin, SkinState, GearRarity, RuneRarity, WeaponSkin } from '../types';

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

export const Dashboard: React.FC = () => {
  const { state, dispatch } = useLoadout();
  const [activeTab, setActiveTab] = useState<'gear' | 'runes'>('gear');
  const [modalConfig, setModalConfig] = useState<{
    isOpen: boolean;
    type: 'character' | 'gear' | 'rune' | 'resonance' | 'enchant' | 'skin';
    targetId: string;
    gearType?: GearType;
    runeCategory?: RuneCategory;
    runeIndex?: number;
    resonanceIndex?: number;
    enchantPool?: Enchantment[];
    skinIndex?: number;
    enchantSlotIndex?: number;
  }>({
    isOpen: false,
    type: 'character',
    targetId: '',
  });

  const leftGear: { label: string; type: GearType; id: keyof Loadout['gear'] }[] = [
    { label: 'Weapon', type: 'weapon', id: 'weapon' },
    { label: 'Amulet', type: 'amulet', id: 'amulet' },
    { label: 'Ring', type: 'ring', id: 'ring' },
  ];

  const rightGear: { label: string; type: GearType; id: keyof Loadout['gear'] }[] = [
    { label: 'Helmet', type: 'helmet', id: 'helmet' },
    { label: 'Armor', type: 'armor', id: 'armor' },
    { label: 'Boots', type: 'boots', id: 'boots' },
  ];

  const openGearModal = (slot: keyof Loadout['gear'], type: GearType) => {
    setModalConfig({ isOpen: true, type: 'gear', targetId: slot, gearType: type });
  };

  const openRuneModal = (category: RuneCategory, index: number) => {
    setModalConfig({ isOpen: true, type: 'rune', targetId: category, runeCategory: category, runeIndex: index });
  };

  const openEnchantModal = (category: RuneCategory, index: number, slotIndex: number = 0) => {
    const rune = state.runes[category][index].item;
    if (!rune) return;

    const common = COMMON_ENCHANTS[category] || [];
    const categorySpecific = rune.gameplayCategory ? (CATEGORY_ENCHANTS[rune.gameplayCategory]?.[category as 'enhancement' | 'ability'] || []) : [];
    const unique = rune.uniqueEnchant ? [rune.uniqueEnchant] : [];
    const twinUniques = rune.uniqueEnchants || [];
    const pool = [...common, ...categorySpecific, ...unique, ...twinUniques];

    setModalConfig({
      isOpen: true,
      type: 'enchant',
      targetId: category,
      runeCategory: category,
      runeIndex: index,
      enchantPool: pool,
      enchantSlotIndex: slotIndex
    });
  };

  const openCharModal = () => {
    setModalConfig({ isOpen: true, type: 'character', targetId: 'character' });
  };

  const openSkinModal = (index: number, resonanceIdx?: number, isWeaponSkin: boolean = false) => {
    setModalConfig({
      isOpen: true,
      type: 'skin',
      targetId: isWeaponSkin ? 'weapon' : (resonanceIdx !== undefined ? `res-skin-${resonanceIdx}-${index}` : `skin-${index}`),
      skinIndex: index,
      resonanceIndex: resonanceIdx
    });
  };

  const openResonanceModal = (index: number) => {
    setModalConfig({ isOpen: true, type: 'resonance', targetId: `resonance-${index}`, resonanceIndex: index });
  };

  const handleSelect = (item: Character | GearItemType | RuneItemType | Enchantment | Skin | WeaponSkin | null, rarity?: GearRarity | RuneRarity | EnchantRarity | null, stars?: number) => {
    if (modalConfig.type === 'character') {
      if (item) {
        dispatch({ type: 'SET_CHARACTER', payload: (item as Character).id });
        if (stars !== undefined) dispatch({ type: 'SET_CHARACTER_STARS', payload: stars });
      }
    } else if (modalConfig.type === 'skin') {
      const skinState: SkinState | undefined = item ? {
        id: (item as Skin).id,
        stars: stars || 0
      } : undefined;

      if (modalConfig.targetId === 'weapon') {
        dispatch({
          type: 'SET_WEAPON_SKIN',
          payload: { index: modalConfig.skinIndex!, skin: skinState }
        });
      } else if (modalConfig.resonanceIndex !== undefined) {
        dispatch({
          type: 'SET_RESONANCE_SKIN',
          payload: {
            resonanceIndex: modalConfig.resonanceIndex,
            skinIndex: modalConfig.skinIndex!,
            skin: skinState
          }
        });
      } else {
        dispatch({
          type: 'SET_SKIN',
          payload: {
            index: modalConfig.skinIndex!,
            skin: skinState
          }
        });
      }
    } else if (modalConfig.type === 'resonance') {
      const resonanceChar: CharacterState | undefined = item ? {
        id: (item as Character).id,
        stars: stars || 0,
        activeSkins: []
      } : undefined;
      dispatch({ type: 'SET_RESONANCE', payload: { index: modalConfig.resonanceIndex!, character: resonanceChar } });
    } else if (modalConfig.type === 'gear') {
      const gearItem = item ? { ...item as GearItemType, rarity: rarity as GearRarity } : undefined;
      dispatch({
        type: 'SET_GEAR',
        payload: { slot: modalConfig.targetId as keyof Loadout['gear'], item: gearItem }
      });
    } else if (modalConfig.type === 'rune') {
      const runeItem = item ? { ...item as RuneItemType, rarity: rarity as RuneRarity } : undefined;
      dispatch({
        type: 'SET_RUNE',
        payload: { category: modalConfig.runeCategory!, index: modalConfig.runeIndex!, item: runeItem }
      });
    } else if (modalConfig.type === 'enchant') {
      dispatch({
        type: 'SET_RUNE_ENCHANT',
        payload: {
          category: modalConfig.runeCategory!,
          index: modalConfig.runeIndex!,
          enchantId: (item as Enchantment)?.id,
          rarity: rarity as EnchantRarity,
          slotIndex: modalConfig.enchantSlotIndex
        }
      });
    }
    setModalConfig({ ...modalConfig, isOpen: false });
  };

  const renderGearSlot = (slot: { label: string; type: GearType; id: keyof Loadout['gear'] }) => (
    <div key={slot.id} className="w-full flex flex-col items-center px-2 relative">
      <button
        onClick={() => openGearModal(slot.id, slot.type)}
        className="w-full flex flex-col items-center group transition-transform active:scale-95"
      >
        <div className={`w-full max-w-[100px] aspect-square flex items-center justify-center transition-all ${!state.gear[slot.id] ? 'bg-zinc-800/40 rounded-2xl border-2 border-zinc-700/50 group-hover:border-accent/50 shadow-inner overflow-hidden' : ''}`}>
          {state.gear[slot.id] ? (
            <GearItem
              item={state.gear[slot.id]!}
              className="w-full h-full scale-110"
              onGodforgeToggle={() => dispatch({ type: 'TOGGLE_GODFORGE', payload: { slot: slot.id } })}
              onSkinClick={(idx) => openSkinModal(idx, undefined, true)}
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center p-4">
              <img
                src={`${import.meta.env.BASE_URL}assets/ui/icon_${slot.type}.png`}
                className="w-full h-full object-contain opacity-40 group-hover:opacity-70 transition-opacity"
                alt={slot.label}
              />
            </div>
          )}
        </div>
      </button>
    </div>
  );

  const renderResonance = (idx: number) => {
    const isEnabled = idx === 0 ? state.character.stars >= 3 : state.character.stars >= 6;
    const resonance = state.resonances[idx];

    return (
      <button
        key={idx}
        disabled={!isEnabled}
        onClick={() => openResonanceModal(idx)}
        className="active:scale-90 transition-transform"
      >
        <CharacterItem
          character={resonance}
          isLocked={!isEnabled}
          size="small"
          onSkinClick={(skinIdx) => openSkinModal(skinIdx, idx)}
        />
      </button>
    );
  };

  // Coordinates based on 1608x1259 image
  const enhancementCoords = [
    { x: (294 / 1608) * 100, y: (238 / 1259) * 100 },
    { x: (170 / 1608) * 100, y: (475 / 1259) * 100 },
    { x: (155 / 1608) * 100, y: (743 / 1259) * 100 },
    { x: (287 / 1608) * 100, y: (967 / 1259) * 100 },
  ];

  const abilityCoords = [
    { x: (1291 / 1608) * 100, y: (237 / 1259) * 100 },
    { x: (1416 / 1608) * 100, y: (455 / 1259) * 100 },
    { x: (1427 / 1608) * 100, y: (729 / 1259) * 100 },
    { x: (1297 / 1608) * 100, y: (966 / 1259) * 100 },
  ];

  const blessingCoords = [
    { x: (423 / 1608) * 100, y: (595 / 1259) * 100 },
    { x: (1163 / 1608) * 100, y: (595 / 1259) * 100 },
  ];

  const etchedCoords = [
    { x: (538 / 1608) * 100, y: (1094 / 1259) * 100 },
    { x: (791 / 1608) * 100, y: (1094 / 1259) * 100 },
    { x: (1044 / 1608) * 100, y: (1094 / 1259) * 100 },
  ];

  const renderRuneSlot = (category: RuneCategory, index: number, coords: { x: number, y: number }, isEtched: boolean = false, hideEnchants: boolean = false, enchantsOnly: boolean = false) => {
    const slot = state.runes[category][index];
    const hasItem = !!slot.item;

    const canEnchant = hasItem && !isEtched && RUNE_RARITY_ORDER.indexOf(slot.item!.rarity) >= RUNE_RARITY_ORDER.indexOf(MIN_ENCHANT_RARITY);

    const bubbleSide = (category === 'blessing' || category === 'etched') 
      ? 'center' 
      : (coords.x < 50 ? 'right' : 'left');

    return (
      <div
        key={`${category}-${index}-${enchantsOnly ? 'enchants' : 'base'}`}
        className="absolute transition-transform -translate-x-1/2 -translate-y-1/2 z-30 group"
        style={{ top: `${coords.y}%`, left: `${coords.x}%`, width: isEtched ? '14.5%' : '13.5%', height: isEtched ? '18.5%' : '17.3%' }}
      >
        <button
          onClick={() => !enchantsOnly && openRuneModal(category, index)}
          className={`w-full h-full flex items-center justify-center transition-transform relative ${enchantsOnly ? 'pointer-events-none' : 'active:scale-90'}`}
        >
          {!enchantsOnly && isEtched && (
            <img
              src={`${import.meta.env.BASE_URL}assets/ui/Frame_4.png`}
              alt=""
              className="absolute inset-0 w-full h-full object-contain opacity-60 pointer-events-none"
            />
          )}
          {hasItem ? (
            <RuneItem
              item={slot.item!}
              enchantId={slot.enchantId}
              enchantRarity={slot.enchantRarity}
              enchantId2={slot.enchantId2}
              enchantRarity2={slot.enchantRarity2}
              bubbleSide={bubbleSide}
              onEnchantClick={(slotIdx) => openEnchantModal(category, index, slotIdx)}
              canEnchant={canEnchant}
              className="w-full h-full"
              hideEnchants={hideEnchants}
              enchantsOnly={enchantsOnly}
            />
          ) : (
            !enchantsOnly && <PlusIcon className="w-1/2 h-1/2 text-zinc-400/20 group-hover:text-zinc-400/40 transition-colors relative z-10" />
          )}
        </button>
      </div>
    );
  };

  return (
    <div className="w-full flex flex-col items-center">
      {/* 9-Slice Tab Selectors */}
      <div className="w-full relative flex flex-col items-center pt-4">
        {/* Container for tabs with NO vertical offset */}
        <div className="relative z-10 flex gap-2">
          {[
            { id: 'gear', label: 'Gear' },
            { id: 'runes', label: 'Runes' }
          ].map((t) => (
            <NineSliceButton
              key={t.id}
              imageSrc={activeTab === t.id ? `${import.meta.env.BASE_URL}assets/ui/tab_xuanzhong_3.png` : `${import.meta.env.BASE_URL}assets/ui/tab_weixuanzhong_2.png`}
              onClick={() => setActiveTab(t.id as 'gear' | 'runes')}
              // origin-bottom ensures expansion happens upwards, not into the content
              className={`w-28 h-10 text-[10px] lowercase tracking-normal border-b-0 rounded-b-none origin-bottom transition-all duration-200 ${activeTab === t.id ? 'z-20 scale-y-110' : 'z-10 opacity-80'
                }`}
            >
              {t.label}
            </NineSliceButton>
          ))}
        </div>
      </div>

      {/* Main Content Area */}
      <div className="relative w-full overflow-hidden flex items-center justify-center aspect-[1608/1259]">
        {activeTab === 'gear' && (
          /* Gear Layout - FLUID 3-COLUMN with New Background */
          <div className="w-full h-full flex relative overflow-hidden items-stretch py-2">
            {/* Gear Background - Fills vertically, overflows horizontal */}
            <img
              src={`${import.meta.env.BASE_URL}assets/ui/rank_bg_zhuxian_01.png`}
              className="absolute inset-0 w-full h-full object-cover z-0"
              alt="background"
            />

            <div className="flex-[0_0_28%] flex flex-col items-center justify-around gap-1 p-1 z-10">
              {leftGear.map(renderGearSlot)}
            </div>
            <div className="flex-[0_0_44%] flex flex-col items-center justify-center gap-2 z-0 relative p-1">
              <CharacterItem
                character={state.character}
                onMainClick={openCharModal}
                onSkinClick={(skinIdx) => openSkinModal(skinIdx)}
                className="shadow-2xl hover:ring-4 ring-accent/30 rounded-2xl transition-all"
              />
              <div className="flex flex-col gap-1 w-full items-center">
                {renderResonance(0)}
                {renderResonance(1)}
              </div>
            </div>
            <div className="flex-[0_0_28%] flex flex-col items-center justify-around gap-1 p-1 z-10">
              {rightGear.map(renderGearSlot)}
            </div>
          </div>
        )}

        {activeTab === 'runes' && (
          /* Runes Layout - No rounded edges */
          <div className="w-full aspect-[1608/1259] relative bg-black/20 overflow-hidden shadow-2xl border border-white/5">
            <img src={`${import.meta.env.BASE_URL}assets/rune_bg.png`} alt="Rune Background" className="absolute inset-0 w-full h-full object-cover" />
            <div className="absolute top-[38%] left-[50%] -translate-x-1/2 -translate-y-1/2 z-10 flex flex-col items-center gap-[1%]">
              <CharacterItem
                character={state.character}
                onMainClick={openCharModal}
                onSkinClick={(skinIdx) => openSkinModal(skinIdx)}
                className="shadow-2xl hover:ring-4 ring-accent/30 rounded-2xl transition-all"
              />
              <div className="flex flex-col gap-[1%]">
                {renderResonance(0)}
                {renderResonance(1)}
              </div>
            </div>

            {/* Pass 1: Runes only */}
            {blessingCoords.map((pos, i) => renderRuneSlot('blessing', i, pos, false, true))}
            {enhancementCoords.map((pos, i) => renderRuneSlot('enhancement', i, pos, false, true))}
            {abilityCoords.map((pos, i) => renderRuneSlot('ability', i, pos, false, true))}
            {etchedCoords.map((pos, i) => renderRuneSlot('etched', i, pos, true, true))}

            {/* Pass 2: Enchants only */}
            <div className="absolute inset-0 pointer-events-none z-40">
              {blessingCoords.map((pos, i) => renderRuneSlot('blessing', i, pos, false, false, true))}
              {enhancementCoords.map((pos, i) => renderRuneSlot('enhancement', i, pos, false, false, true))}
              {abilityCoords.map((pos, i) => renderRuneSlot('ability', i, pos, false, false, true))}
              {etchedCoords.map((pos, i) => renderRuneSlot('etched', i, pos, true, false, true))}
            </div>
          </div>
        )}
      </div>

      <SelectionModal
        {...modalConfig}
        onClose={() => setModalConfig({ ...modalConfig, isOpen: false })}
        onSelect={handleSelect}
      />
    </div>
  );
};