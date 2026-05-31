import React from 'react';
import { useLoadout } from '../state/LoadoutContext';
import { GearItem } from './GearItem';
import { RuneItem } from './RuneItem';
import { CharacterItem } from './CharacterItem';
import { VERSION } from '../types';
import type { GearType, RuneCategory } from '../types';

export const RenderModeView: React.FC = () => {
  const { state } = useLoadout();
  
  const leftGear: { type: GearType; id: keyof typeof state.gear }[] = [
    { type: 'weapon', id: 'weapon' },
    { type: 'amulet', id: 'amulet' },
    { type: 'ring', id: 'ring' },
  ];
  const rightGear: { type: GearType; id: keyof typeof state.gear }[] = [
    { type: 'helmet', id: 'helmet' },
    { type: 'armor', id: 'armor' },
    { type: 'boots', id: 'boots' },
  ];

  const enhancementCoords = [
    { x: (294/1608)*100, y: (238/1259)*100 },
    { x: (170/1608)*100, y: (475/1259)*100 },
    { x: (155/1608)*100, y: (743/1259)*100 },
    { x: (287/1608)*100, y: (967/1259)*100 },
  ];
  const abilityCoords = [
    { x: (1291/1608)*100, y: (237/1259)*100 },
    { x: (1416/1608)*100, y: (455/1259)*100 },
    { x: (1427/1608)*100, y: (729/1259)*100 },
    { x: (1297/1608)*100, y: (966/1259)*100 },
  ];
  const blessingCoords = [
    { x: (423/1608)*100, y: (595/1259)*100 },
    { x: (1163/1608)*100, y: (595/1259)*100 },
  ];
  const etchedCoords = [
    { x: (538/1608)*100, y: (1094/1259)*100 },
    { x: (791/1608)*100, y: (1094/1259)*100 },
    { x: (1044/1608)*100, y: (1094/1259)*100 },
  ];

  const renderRuneSlot = (category: RuneCategory, index: number, coords: {x: number, y: number}, isEtched: boolean = false, hideEnchants: boolean = false, enchantsOnly: boolean = false) => {
    const slot = state.runes[category][index];
    if (!slot?.item) return null;

    const bubbleSide = (category === 'blessing' || category === 'etched') 
      ? 'center' 
      : (coords.x < 50 ? 'right' : 'left');

    return (
      <div 
        key={`${category}-${index}-${enchantsOnly ? 'enchants' : 'base'}`}
        className="absolute -translate-x-1/2 -translate-y-1/2"
        style={{ top: `${coords.y}%`, left: `${coords.x}%`, width: isEtched ? '14.5%' : '13.5%', height: isEtched ? '18.5%' : '17.3%' }}
      >
        {!enchantsOnly && isEtched && <img src={`${import.meta.env.BASE_URL}assets/ui/Frame_4.png`} alt="" className="absolute inset-0 w-full h-full object-contain opacity-60" />}
        <RuneItem 
          item={slot.item} 
          enchantId={slot.enchantId} 
          enchantRarity={slot.enchantRarity} 
          enchantId2={slot.enchantId2}
          enchantRarity2={slot.enchantRarity2}
          bubbleSide={bubbleSide}
          className="w-full h-full" 
          hideEnchants={hideEnchants}
          enchantsOnly={enchantsOnly}
        />
      </div>
    );
  };

  return (
    <div className="flex flex-col bg-[#0a0a0c] p-6 gap-0 w-[480px] text-white min-h-screen mx-auto overflow-hidden" data-render-ready="true">
      <div className="flex flex-col items-center gap-2 mb-6 text-center">
        <img src={`${import.meta.env.BASE_URL}assets/LOGO_EN.png`} alt="" className="w-48 h-auto" />
        <div className="flex items-center gap-1.5 text-[10px] font-black uppercase tracking-widest">
          <span style={{ color: '#cead7b' }}>{state.name || 'New Build'}</span>
        </div>
      </div>

      <div className="relative aspect-[1608/1259] w-full flex items-stretch overflow-hidden rounded-t-2xl border-x border-t border-white/10 shadow-2xl">
        <img src={`${import.meta.env.BASE_URL}assets/ui/rank_bg_zhuxian_01.png`} className="absolute inset-0 w-full h-full object-cover z-0" alt="" />
        <div className="flex-[0_0_28%] flex flex-col items-center justify-around h-full z-10 py-2">
            {leftGear.map(slot => (
              <div key={slot.id} className="w-20 h-20">
                {state.gear[slot.id] && <GearItem item={state.gear[slot.id]!} hideEmptySkins={true} className="w-full h-full scale-110" />}
              </div>
            ))}
        </div>
        <div className="flex-[0_0_44%] flex flex-col items-center justify-center gap-2 z-10 p-1">
            <CharacterItem character={state.character} hideEmptySkins={true} className="w-[120px]" />
            <div className="flex flex-col gap-1 w-full items-center scale-90">
              {state.resonances.map((r, i) => r && (
                <CharacterItem key={i} character={r} size="small" hideEmptySkins={true} />
              ))}
            </div>
        </div>
        <div className="flex-[0_0_28%] flex flex-col items-center justify-around h-full z-10 py-2">
            {rightGear.map(slot => (
              <div key={slot.id} className="w-20 h-20">
                {state.gear[slot.id] && <GearItem item={state.gear[slot.id]!} hideEmptySkins={true} className="w-full h-full scale-110" />}
              </div>
            ))}
        </div>
      </div>

      <div className="relative z-50 h-2" />

      <div className="relative aspect-[1608/1259] w-full overflow-hidden border-x border-white/10 bg-black/40 shadow-2xl rounded-b-2xl border-b">
        <img src={`${import.meta.env.BASE_URL}assets/rune_bg.png`} className="absolute inset-0 w-full h-full object-cover" alt="" />
        
        {/* Pass 1: Runes only */}
        {blessingCoords.map((pos, i) => renderRuneSlot('blessing', i, pos, false, true))}
        {enhancementCoords.map((pos, i) => renderRuneSlot('enhancement', i, pos, false, true))}
        {abilityCoords.map((pos, i) => renderRuneSlot('ability', i, pos, false, true))}
        {etchedCoords.map((pos, i) => renderRuneSlot('etched', i, pos, true, true))}

        {/* Pass 2: Enchants only */}
        <div className="absolute inset-0 pointer-events-none z-50">
          {blessingCoords.map((pos, i) => renderRuneSlot('blessing', i, pos, false, false, true))}
          {enhancementCoords.map((pos, i) => renderRuneSlot('enhancement', i, pos, false, false, true))}
          {abilityCoords.map((pos, i) => renderRuneSlot('ability', i, pos, false, false, true))}
          {etchedCoords.map((pos, i) => renderRuneSlot('etched', i, pos, true, false, true))}
        </div>
      </div>

      <div className="flex justify-between items-center opacity-30 text-[8px] font-black uppercase tracking-tighter mt-4">
        <span className="normal-case">{window.location.origin}{import.meta.env.BASE_URL}</span>
        <span>V{VERSION}</span>
      </div>
    </div>
  );
};
