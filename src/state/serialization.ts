import LZString from 'lz-string';
import { 
  GEAR_DATABASE, 
  RUNE_DATABASE, 
  CHARACTER_DATABASE, 
  SKIN_DATABASE, 
  WEAPON_SKIN_DATABASE,
  COMMON_ENCHANTS,
  CATEGORY_ENCHANTS
} from '../data/database';
import { initialState } from './loadoutReducer';
import type { 
  Loadout, 
  GearItem, 
  RuneSlot, 
  RuneItem, 
  GearRarity, 
  RuneRarity, 
  EnchantRarity,
  Enchantment,
  CharacterState
} from '../types';

const V1_VERSION = 1;

// --- V2/V3 COMPACT FORMAT UTILS ---

const RARITY_MAP: string[] = [
  'common', 'fine', 'rare', 'epic', 'epic_1', 'epic_2',
  'legendary', 'legendary_1', 'legendary_2', 'legendary_3',
  'mythic', 'mythic_1', 'mythic_2', 'mythic_3', 'mythic_4',
  'chaotic', 'legendary_plus', 'mythic_plus', 'mythic_3_plus', 'epic2_plus'
];


const rarityToChar = (rarity: string): string => {
  const idx = RARITY_MAP.indexOf(rarity);
  return (idx === -1 ? 0 : idx).toString(36);
};

const charToRarity = (char: string): string => {
  const idx = parseInt(char, 36);
  return RARITY_MAP[idx] || 'common';
};

/**
 * Lightweight CRC-16 implementation for checksum validation.
 */
const crc16 = (str: string): number => {
  let crc = 0xFFFF;
  for (let i = 0; i < str.length; i++) {
    crc ^= str.charCodeAt(i);
    for (let j = 0; j < 8; j++) {
      if (crc & 1) {
        crc = (crc >>> 1) ^ 0xA001;
      } else {
        crc >>>= 1;
      }
    }
  }
  return crc;
};

// --- Lookups for Import ---
const GEAR_SID_MAP = Object.fromEntries(Object.values(GEAR_DATABASE).map(i => [i.sid, i.id]));
const RUNE_SID_MAP = Object.fromEntries(Object.values(RUNE_DATABASE).map(i => [i.sid, i.id]));
const CHAR_SID_MAP = Object.fromEntries(Object.values(CHARACTER_DATABASE).map(i => [i.sid, i.id]));
const SKIN_SID_MAP = Object.fromEntries(Object.values(SKIN_DATABASE).map(i => [i.sid, i.id]));
const WEAPON_SKIN_SID_MAP = Object.fromEntries(Object.values(WEAPON_SKIN_DATABASE).map(i => [i.sid, i.id]));

const ALL_ENCHANTS = [
  ...Object.values(COMMON_ENCHANTS).flat(),
  ...Object.values(CATEGORY_ENCHANTS).flatMap(c => [...c.enhancement, ...c.ability]),
  ...(Object.values(RUNE_DATABASE).map(r => r.uniqueEnchant).filter(Boolean) as Enchantment[]),
  ...(Object.values(RUNE_DATABASE).flatMap(r => r.uniqueEnchants || []))
];
const ENCHANT_SID_MAP = Object.fromEntries(ALL_ENCHANTS.map(e => [e.sid, e.id]));

const findEnchantById = (id?: string) => ALL_ENCHANTS.find(e => e.id === id);

/**
 * Serializes a loadout into the B3 compact format.
 */
export const exportV3 = (loadout: Loadout): string => {
  const parts: string[] = ['B3'];
  
  if (loadout.name) parts.push(`BN${encodeURIComponent(loadout.name)}`);
  
  const serializeChar = (char: CharacterState) => {
    const base = CHARACTER_DATABASE[char.id];
    if (!base) return '';
    let data = base.sid + char.stars.toString(36);
    data += char.activeSkins.length.toString(36);
    char.activeSkins.forEach(s => {
      const skin = SKIN_DATABASE[s.id];
      if (skin) data += skin.sid + s.stars.toString(36);
    });
    return data;
  };

  parts.push(`MC${serializeChar(loadout.character)}`);
  loadout.resonances.forEach((r, i) => {
    if (r) parts.push(`R${i + 1}${serializeChar(r)}`);
  });

  const GEAR_SLOT_MAP: Record<string, string> = {
    weapon: 'GW', amulet: 'GA', ring: 'GR', helmet: 'GH', armor: 'GM', boots: 'GB'
  };

  Object.entries(loadout.gear).forEach(([slot, item]) => {
    if (item && GEAR_DATABASE[item.id]) {
      const base = GEAR_DATABASE[item.id];
      let data = base.sid + rarityToChar(item.rarity) + (item.godforgeLevel || 0).toString(36);
      if (slot === 'weapon') {
        const skins = item.activeSkins || [];
        data += skins.length.toString(36);
        skins.forEach(s => {
          const skin = WEAPON_SKIN_DATABASE[s.id];
          if (skin) data += skin.sid + s.stars.toString(36);
        });
      }
      parts.push(`${GEAR_SLOT_MAP[slot]}${data}`);
    }
  });

  const RUNE_CAT_MAP: Record<string, string> = {
    enhancement: 'E', ability: 'A', blessing: 'L', etched: 'T'
  };

  Object.entries(loadout.runes).forEach(([cat, slots]) => {
    slots.forEach((s, i) => {
      if (s.item && RUNE_DATABASE[s.item.id]) {
        const base = RUNE_DATABASE[s.item.id];
        let data = base.sid + rarityToChar(s.item.rarity);
        
        // Slot 1
        const enchant = findEnchantById(s.enchantId);
        if (enchant) {
          data += enchant.sid + rarityToChar(s.enchantRarity || 'common');
        }

        // Slot 2
        const enchant2 = findEnchantById(s.enchantId2);
        if (enchant2) {
          data += enchant2.sid + rarityToChar(s.enchantRarity2 || 'common');
        }

        parts.push(`${RUNE_CAT_MAP[cat]}${i}${data}`);
      }
    });
  });

  const mainStr = parts.join('~');
  const checksum = crc16(mainStr).toString(36);
  return `${mainStr}~CS${checksum}`;
};

/**
 * Deserializes a B3 compact format string.
 */
export const importV3 = (code: string): Loadout => {
  const sections = code.split('~');
  const checksumPart = sections.find(s => s.startsWith('CS'));
  if (!checksumPart) return initialState;

  const dataSections = sections.filter(s => !s.startsWith('CS'));
  const rawStr = dataSections.join('~');
  
  let finalSections = dataSections;

  if (crc16(rawStr).toString(36) !== checksumPart.substring(2)) {
    // Try re-encoding BN/BA sections (they might have been pasted in decoded format)
    const reEncodedSections = dataSections.map(s => {
      if (s.startsWith('BN') || s.startsWith('BA')) {
        const tag = s.substring(0, 2);
        const val = s.substring(2);
        return tag + encodeURIComponent(val);
      }
      return s;
    });
    const reEncodedStr = reEncodedSections.join('~');
    if (crc16(reEncodedStr).toString(36) === checksumPart.substring(2)) {
      finalSections = reEncodedSections;
    } else {
      console.error('B3 Checksum mismatch');
      return initialState;
    }
  }

  const loadout: Loadout = JSON.parse(JSON.stringify(initialState));

  const parseChar = (data: string): CharacterState | undefined => {
    const charId = CHAR_SID_MAP[data.substring(0, 2)];
    if (!charId) return undefined;
    const stars = parseInt(data[2], 36);
    const skinCount = parseInt(data[3], 36);
    const activeSkins = [];
    let pos = 4;
    for (let i = 0; i < skinCount; i++) {
      const skinId = SKIN_SID_MAP[data.substring(pos, pos + 2)];
      const skinStars = parseInt(data[pos + 2], 36);
      if (skinId) activeSkins.push({ id: skinId, stars: skinStars });
      pos += 3;
    }
    return { id: charId, stars, activeSkins };
  };

  finalSections.forEach(s => {
    const tag = s.substring(0, 2);
    const data = s.substring(2);

    if (tag === 'BN') loadout.name = decodeURIComponent(data);
    else if (tag === 'BA') loadout.author = decodeURIComponent(data);
    else if (tag === 'MC') {
      const char = parseChar(data);
      if (char) loadout.character = char;
    }
    else if (tag === 'R1' || tag === 'R2') {
      const char = parseChar(data);
      loadout.resonances[tag === 'R1' ? 0 : 1] = char;
    }
    else if (['GW', 'GA', 'GR', 'GH', 'GM', 'GB'].includes(tag)) {
      const slotMap: Record<string, keyof Loadout['gear']> = {
        GW: 'weapon', GA: 'amulet', GR: 'ring', GH: 'helmet', GM: 'armor', GB: 'boots'
      };
      const sid = data.substring(0, 2);
      const gearId = GEAR_SID_MAP[sid];
      if (gearId) {
        const item: GearItem = {
          ...GEAR_DATABASE[gearId],
          rarity: charToRarity(data[2]) as GearRarity,
          godforgeLevel: parseInt(data[3], 36),
          activeSkins: []
        } as GearItem;
        if (tag === 'GW' && data.length > 4) {
          const skinCount = parseInt(data[4], 36);
          let pos = 5;
          for (let i = 0; i < skinCount; i++) {
            const skinId = WEAPON_SKIN_SID_MAP[data.substring(pos, pos + 2)];
            const skinStars = parseInt(data[pos + 2], 36);
            if (skinId) item.activeSkins?.push({ id: skinId, stars: skinStars });
            pos += 3;
          }
        }
        loadout.gear[slotMap[tag]] = item;
      }
    }
    else if (['E', 'A', 'L', 'T'].includes(tag[0])) {
      const catMap: Record<string, keyof Loadout['runes']> = {
        E: 'enhancement', A: 'ability', L: 'blessing', T: 'etched'
      };
      const cat = catMap[tag[0]];
      const index = parseInt(tag[1], 10);
      const sid = data.substring(0, 2);
      const runeId = RUNE_SID_MAP[sid];
      if (runeId && loadout.runes[cat][index]) {
        const runeItem: RuneItem = {
          ...RUNE_DATABASE[runeId],
          rarity: charToRarity(data[2]) as RuneRarity
        } as RuneItem;
        const slot: RuneSlot = { item: runeItem };
        
        // Slot 1
        if (data.length > 3) {
          const enchantId = ENCHANT_SID_MAP[data.substring(3, 5)];
          if (enchantId) {
            slot.enchantId = enchantId;
            slot.enchantRarity = charToRarity(data[5]) as EnchantRarity;
          }
        }

        // Slot 2
        if (data.length > 6) {
          const enchantId2 = ENCHANT_SID_MAP[data.substring(6, 8)];
          if (enchantId2) {
            slot.enchantId2 = enchantId2;
            slot.enchantRarity2 = charToRarity(data[8]) as EnchantRarity;
          }
        }

        loadout.runes[cat][index] = slot;
      }
    }
  });

  return loadout;
};

/**
 * Serializes a loadout into the B2 compact format.
 */
export const exportV2 = (loadout: Loadout): string => {
  const parts: string[] = ['B2'];
  
  if (loadout.name) parts.push(`BN${encodeURIComponent(loadout.name)}`);
  
  const serializeChar = (char: CharacterState) => {
    const base = CHARACTER_DATABASE[char.id];
    if (!base) return '';
    let data = base.sid + char.stars.toString(36);
    data += char.activeSkins.length.toString(36);
    char.activeSkins.forEach(s => {
      const skin = SKIN_DATABASE[s.id];
      if (skin) data += skin.sid + s.stars.toString(36);
    });
    return data;
  };

  parts.push(`MC${serializeChar(loadout.character)}`);
  loadout.resonances.forEach((r, i) => {
    if (r) parts.push(`R${i + 1}${serializeChar(r)}`);
  });

  const GEAR_SLOT_MAP: Record<string, string> = {
    weapon: 'GW', amulet: 'GA', ring: 'GR', helmet: 'GH', armor: 'GM', boots: 'GB'
  };

  Object.entries(loadout.gear).forEach(([slot, item]) => {
    if (item && GEAR_DATABASE[item.id]) {
      const base = GEAR_DATABASE[item.id];
      let data = base.sid + rarityToChar(item.rarity) + (item.godforgeLevel || 0).toString(36);
      if (slot === 'weapon') {
        const skins = item.activeSkins || [];
        data += skins.length.toString(36);
        skins.forEach(s => {
          const skin = WEAPON_SKIN_DATABASE[s.id];
          if (skin) data += skin.sid + s.stars.toString(36);
        });
      }
      parts.push(`${GEAR_SLOT_MAP[slot]}${data}`);
    }
  });

  const RUNE_CAT_MAP: Record<string, string> = {
    enhancement: 'E', ability: 'A', blessing: 'L', etched: 'T'
  };

  Object.entries(loadout.runes).forEach(([cat, slots]) => {
    slots.forEach((s, i) => {
      if (s.item && RUNE_DATABASE[s.item.id]) {
        const base = RUNE_DATABASE[s.item.id];
        let data = base.sid + rarityToChar(s.item.rarity);
        if (cat !== 'etched') {
          const enchant = findEnchantById(s.enchantId);
          if (enchant) {
            data += enchant.sid + rarityToChar(s.enchantRarity || 'common');
          }
        }
        parts.push(`${RUNE_CAT_MAP[cat]}${i}${data}`);
      }
    });
  });

  const mainStr = parts.join('~');
  const checksum = crc16(mainStr).toString(36);
  return `${mainStr}~CS${checksum}`;
};

/**
 * Deserializes a B2 compact format string.
 */
export const importV2 = (code: string): Loadout => {
  const sections = code.split('~');
  const checksumPart = sections.find(s => s.startsWith('CS'));
  if (!checksumPart) return initialState;

  // Re-encode certain parts if they were auto-decoded (e.g. spaces back to %20)
  // so that the checksum validation still works.
  const normalizedSections = sections.filter(s => !s.startsWith('CS')).map(s => {
    if (s.startsWith('BN') || s.startsWith('BA')) {
      const tag = s.substring(0, 2);
      const val = s.substring(2);
      return tag + encodeURIComponent(val).replace(/[!'()*]/g, c => `%${c.charCodeAt(0).toString(16).toUpperCase()}`);
    }
    return s;
  });

  const mainStr = normalizedSections.join('~');
  if (crc16(mainStr).toString(36) !== checksumPart.substring(2)) {
    console.error('B2 Checksum mismatch');
    return initialState;
  }

  const loadout: Loadout = JSON.parse(JSON.stringify(initialState));

  const parseChar = (data: string): CharacterState | undefined => {
    const charId = CHAR_SID_MAP[data.substring(0, 2)];
    if (!charId) return undefined;
    const stars = parseInt(data[2], 36);
    const skinCount = parseInt(data[3], 36);
    const activeSkins = [];
    let pos = 4;
    for (let i = 0; i < skinCount; i++) {
      const skinId = SKIN_SID_MAP[data.substring(pos, pos + 2)];
      const skinStars = parseInt(data[pos + 2], 36);
      if (skinId) activeSkins.push({ id: skinId, stars: skinStars });
      pos += 3;
    }
    return { id: charId, stars, activeSkins };
  };

  sections.forEach(s => {
    const tag = s.substring(0, 2);
    const data = s.substring(2);

    if (tag === 'BN') loadout.name = decodeURIComponent(data);
    else if (tag === 'BA') loadout.author = decodeURIComponent(data);
    else if (tag === 'MC') {
      const char = parseChar(data);
      if (char) loadout.character = char;
    }
    else if (tag === 'R1' || tag === 'R2') {
      const char = parseChar(data);
      loadout.resonances[tag === 'R1' ? 0 : 1] = char;
    }
    else if (['GW', 'GA', 'GR', 'GH', 'GM', 'GB'].includes(tag)) {
      const slotMap: Record<string, keyof Loadout['gear']> = {
        GW: 'weapon', GA: 'amulet', GR: 'ring', GH: 'helmet', GM: 'armor', GB: 'boots'
      };
      const sid = data.substring(0, 2);
      const gearId = GEAR_SID_MAP[sid];
      if (gearId) {
        const item: GearItem = {
          ...GEAR_DATABASE[gearId],
          rarity: charToRarity(data[2]) as GearRarity,
          godforgeLevel: parseInt(data[3], 36),
          activeSkins: []
        } as GearItem;
        if (tag === 'GW' && data.length > 4) {
          const skinCount = parseInt(data[4], 36);
          let pos = 5;
          for (let i = 0; i < skinCount; i++) {
            const skinId = WEAPON_SKIN_SID_MAP[data.substring(pos, pos + 2)];
            const skinStars = parseInt(data[pos + 2], 36);
            if (skinId) item.activeSkins?.push({ id: skinId, stars: skinStars });
            pos += 3;
          }
        }
        loadout.gear[slotMap[tag]] = item;
      }
    }
    else if (['E', 'A', 'L', 'T'].includes(tag[0])) {
      const catMap: Record<string, keyof Loadout['runes']> = {
        E: 'enhancement', A: 'ability', L: 'blessing', T: 'etched'
      };
      const cat = catMap[tag[0]];
      const index = parseInt(tag[1], 10);
      const sid = data.substring(0, 2);
      const runeId = RUNE_SID_MAP[sid];
      if (runeId && loadout.runes[cat][index]) {
        const runeItem: RuneItem = {
          ...RUNE_DATABASE[runeId],
          rarity: charToRarity(data[2]) as RuneRarity
        } as RuneItem;
        const slot: RuneSlot = { item: runeItem };
        if (tag[0] !== 'T' && data.length > 3) {
          const enchantId = ENCHANT_SID_MAP[data.substring(3, 5)];
          if (enchantId) {
            slot.enchantId = enchantId;
            slot.enchantRarity = charToRarity(data[5]) as EnchantRarity;
          }
        }
        loadout.runes[cat][index] = slot;
      }
    }
  });

  return loadout;
};

/**
 * Public API: Serializes a full Loadout object.
 */
export const exportLoadout = (loadout: Loadout): string => {
  return exportV3(loadout);
};

/**
 * Public API: Deserializes an encoded string back into a full Loadout object.
 */
export const importLoadout = (code: string): Loadout => {
  if (!code) return initialState;
  
  // Detect B3 format
  if (code.startsWith('B3')) {
    return importV3(code);
  }

  // Detect B2 format
  if (code.startsWith('B2')) {
    return importV2(code);
  }

  // Fallback to V1 (LZString JSON)
  try {
    const json = LZString.decompressFromEncodedURIComponent(code);
    if (!json) return initialState;
    
    /* eslint-disable @typescript-eslint/no-explicit-any */
    const payload = JSON.parse(json);
    if (payload.v !== V1_VERSION) return initialState;
    
    const d = payload.d;
    const loadout: Loadout = JSON.parse(JSON.stringify(initialState));

    if (d.n) loadout.name = d.n;
    loadout.author = d.a || 'Unknown';

    if (CHARACTER_DATABASE[d.c[0]]) {
      loadout.character = {
        id: d.c[0],
        stars: d.c[1],
        activeSkins: d.c[2].map((s: any) => ({ id: s[0], stars: s[1] }))
      };
    }

    loadout.resonances = d.r.map((r: any) => {
      if (r && CHARACTER_DATABASE[r[0]]) {
        return { 
          id: r[0], 
          stars: r[1], 
          activeSkins: (r[2] || []).map((s: any) => ({ id: s[0], stars: s[1] }))
        };
      }
      return undefined;
    });

    Object.entries(d.g).forEach(([slot, data]: [string, any]) => {
      if (data && GEAR_DATABASE[data[0]]) {
        const baseGear = GEAR_DATABASE[data[0]];
        let godforgeLevel = 0;
        if (typeof data[2] === 'boolean') {
          godforgeLevel = data[2] ? 5 : 0;
        } else if (typeof data[2] === 'number') {
          godforgeLevel = data[2];
        }

        loadout.gear[slot as keyof Loadout['gear']] = {
          ...baseGear,
          rarity: data[1] as GearRarity,
          godforgeLevel,
          activeSkins: data[3].map((s: any) => ({ id: s[0], stars: s[1] }))
        } as GearItem;
      }
    });

    Object.entries(d.ru).forEach(([cat, slots]: [string, any]) => {
      if (loadout.runes[cat as keyof Loadout['runes']]) {
        loadout.runes[cat as keyof Loadout['runes']] = slots.map((s: any) => {
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
    /* eslint-enable @typescript-eslint/no-explicit-any */

    return loadout;
  } catch (error) {
    console.error('Failed to import V1 loadout:', error);
    return initialState;
  }
};
