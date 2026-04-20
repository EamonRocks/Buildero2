import LZString from 'lz-string';
import { GEAR_DATABASE, RUNE_DATABASE, CHARACTER_DATABASE } from '../data/database';
import { initialState } from './loadoutReducer';
import type { Loadout, GearItem, RuneSlot, RuneItem, GearRarity, RuneRarity, EnchantRarity } from '../types';

const CURRENT_VERSION = 1;

/**
 * Versioned Data Transfer Object (DTO) for loadout state.
 * Using short keys to minimize string length before compression.
 */
interface V1DTO {
  v: 1;
  d: {
    n: string; // build name
    c: [string, number, [string, number][]]; // main char: [id, stars, [[skinId, stars]]]
    r: ([string, number, [string, number][]] | null)[]; // resonances: [[id, stars, [[skinId, stars]]], null]
    g: Partial<Record<string, [string, string, boolean, [string, number][]]>>; // gear: { slot: [id, rarity, isGodforged, [[skinId, stars]]] }
    ru: Record<string, ([string, string, string?, string?] | null)[]>; // runes: { cat: [[id, rarity, enchantId, enchantRarity]] }
  }
}

/**
 * Migration pipeline to handle future versions.
 */
const migrate = (payload: any): V1DTO => {
  let data = payload;
  
  // Example of future migration:
  // if (data.v === 1) data = migrateV1ToV2(data);
  // if (data.v === 2) data = migrateV2ToV3(data);
  
  if (data.v === CURRENT_VERSION) {
    return data as V1DTO;
  }
  
  throw new Error('Unsupported version');
};

/**
 * Serializes a full Loadout object into a versioned DTO.
 */
export const exportLoadout = (loadout: Loadout): string => {
  const dto: V1DTO = {
    v: 1,
    d: {
      n: loadout.name,
      c: [
        loadout.character.id, 
        loadout.character.stars, 
        loadout.character.activeSkins.map(s => [s.id, s.stars])
      ],
      r: loadout.resonances.map(r => r ? [
        r.id, 
        r.stars, 
        r.activeSkins.map(s => [s.id, s.stars])
      ] : null),
      g: {},
      ru: {}
    }
  };

  // Serialize Gear
  (Object.entries(loadout.gear) as [keyof Loadout['gear'], GearItem][]).forEach(([slot, item]) => {
    if (item) {
      dto.d.g[slot] = [
        item.id, 
        item.rarity, 
        !!item.isGodforged, 
        (item.activeSkins || []).map(s => [s.id, s.stars])
      ];
    }
  });

  // Serialize Runes
  (Object.entries(loadout.runes) as [keyof Loadout['runes'], RuneSlot[]][]).forEach(([cat, slots]) => {
    dto.d.ru[cat] = slots.map(s => {
      if (s.item) {
        return [s.item.id, s.item.rarity, s.enchantId, s.enchantRarity];
      }
      return null;
    });
  });

  return LZString.compressToEncodedURIComponent(JSON.stringify(dto));
};

/**
 * Deserializes an encoded string back into a full Loadout object.
 * Includes graceful degradation for missing database assets.
 */
export const importLoadout = (code: string): Loadout => {
  if (!code) return initialState;

  try {
    const json = LZString.decompressFromEncodedURIComponent(code);
    if (!json) return initialState;
    
    const payload = JSON.parse(json);
    const dto = migrate(payload);
    const d = dto.d;

    const loadout: Loadout = JSON.parse(JSON.stringify(initialState));

    // Restore Name
    if (d.n) {
      loadout.name = d.n;
    }

    // Restore Character
    if (CHARACTER_DATABASE[d.c[0]]) {
      loadout.character = {
        id: d.c[0],
        stars: d.c[1],
        activeSkins: d.c[2].map(s => ({ id: s[0], stars: s[1] }))
      };
    }

    // Restore Resonances
    loadout.resonances = d.r.map(r => {
      if (r && CHARACTER_DATABASE[r[0]]) {
        return { 
          id: r[0], 
          stars: r[1], 
          activeSkins: (r[2] || []).map(s => ({ id: s[0], stars: s[1] }))
        };
      }
      return undefined;
    });

    // Restore Gear
    Object.entries(d.g).forEach(([slot, data]) => {
      if (data && GEAR_DATABASE[data[0]]) {
        const baseGear = GEAR_DATABASE[data[0]];
        loadout.gear[slot as keyof Loadout['gear']] = {
          ...baseGear,
          rarity: data[1] as GearRarity,
          isGodforged: data[2],
          activeSkins: data[3].map(s => ({ id: s[0], stars: s[1] }))
        } as GearItem;
      }
    });

    // Restore Runes
    Object.entries(d.ru).forEach(([cat, slots]) => {
      if (loadout.runes[cat as keyof Loadout['runes']]) {
        loadout.runes[cat as keyof Loadout['runes']] = slots.map(s => {
          if (s && RUNE_DATABASE[s[0]]) {
            const baseRune = RUNE_DATABASE[s[0]];
            return {
              item: { ...baseRune, rarity: s[1] as RuneRarity } as RuneItem,
              enchantId: s[2],
              enchantRarity: s[3] as EnchantRarity
            };
          }
          return {};
        });
      }
    });

    return loadout;
  } catch (error) {
    console.error('Failed to import loadout:', error);
    return initialState;
  }
};
