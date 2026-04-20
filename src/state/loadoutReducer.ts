import type { Loadout, GearItem, RuneItem, RuneCategory, CharacterState, SkinState, EnchantRarity } from '../types';
import { COMMON_ENCHANTS, CATEGORY_ENCHANTS } from '../data/database';

export type LoadoutAction =
  | { type: 'SET_CHARACTER'; payload: string }
  | { type: 'SET_CHARACTER_STARS'; payload: number }
  | { type: 'SET_SKIN'; payload: { index: number; skin: SkinState | undefined } }
  | { type: 'SET_RESONANCE'; payload: { index: number; character: CharacterState | undefined } }
  | { type: 'SET_RESONANCE_SKIN'; payload: { resonanceIndex: number; skinIndex: number; skin: SkinState | undefined } }
  | { type: 'SET_GEAR'; payload: { slot: keyof Loadout['gear']; item: GearItem | undefined } }
  | { type: 'SET_WEAPON_SKIN'; payload: { index: number; skin: SkinState | undefined } }
  | { type: 'TOGGLE_GODFORGE'; payload: { slot: keyof Loadout['gear'] } }
  | { type: 'SET_RUNE', payload: { category: RuneCategory; index: number; item: RuneItem | undefined } }
  | { type: 'SET_RUNE_ENCHANT'; payload: { category: RuneCategory; index: number; enchantId: string | undefined; rarity: EnchantRarity | undefined } }
  | { type: 'LOAD_LOADOUT'; payload: Loadout }
  | { type: 'SET_NAME'; payload: string }
  | { type: 'SET_AUTHOR'; payload: string };


export const initialState: Loadout = {
  name: 'New Build',
  author: '',
  character: {
    id: 'atreus',
    stars: 0,
    activeSkins: [],
  },
  resonances: [undefined, undefined],
  gear: {},
  runes: {
    enhancement: new Array(4).fill(null).map(() => ({})),
    ability: new Array(4).fill(null).map(() => ({})),
    blessing: new Array(2).fill(null).map(() => ({})),
    etched: new Array(3).fill(null).map(() => ({})),
  },
};

const RUNE_RARITY_ORDER = ['common', 'fine', 'rare', 'epic', 'epic_1', 'epic_2', 'legendary', 'legendary_1', 'legendary_2', 'legendary_3', 'mythic'];
const MIN_ENCHANT_RARITY = 'epic_2';

export function loadoutReducer(state: Loadout, action: LoadoutAction): Loadout {
  switch (action.type) {
    case 'SET_NAME':
      return { ...state, name: action.payload };
    case 'SET_AUTHOR':
      return { ...state, author: action.payload };
    case 'LOAD_LOADOUT':
      return action.payload;
    case 'SET_CHARACTER': {
      const newCharId = action.payload;
      // RULE: Resonances can't be the same character as main. Invalidate if collision occurs.
      const newResonances = state.resonances.map(r => r?.id === newCharId ? undefined : r);
      
      return {
        ...state,
        character: {
          ...state.character,
          id: newCharId,
          activeSkins: [],
        },
        resonances: newResonances,
      };
    }
    case 'SET_CHARACTER_STARS':
      return {
        ...state,
        character: {
          ...state.character,
          stars: action.payload,
        },
      };
    case 'SET_SKIN': {
      const { index, skin } = action.payload;
      const currentSkins = [...state.character.activeSkins];
      
      if (index === 1 && currentSkins.length === 0 && skin) {
        return state;
      }

      if (skin) {
        currentSkins[index] = skin;
      } else {
        if (index === 0) {
          currentSkins.length = 0;
        } else {
          currentSkins.splice(index, 1);
        }
      }

      return {
        ...state,
        character: {
          ...state.character,
          activeSkins: currentSkins.filter(Boolean),
        },
      };
    }
    case 'SET_RESONANCE': {
      const newResonances = [...state.resonances];
      newResonances[action.payload.index] = action.payload.character;
      return {
        ...state,
        resonances: newResonances,
      };
    }
    case 'SET_RESONANCE_SKIN': {
      const { resonanceIndex, skinIndex, skin } = action.payload;
      const resonance = state.resonances[resonanceIndex];
      if (!resonance) return state;

      const currentSkins = [...resonance.activeSkins];
      
      if (skinIndex === 1 && currentSkins.length === 0 && skin) {
        return state;
      }

      if (skin) {
        currentSkins[skinIndex] = skin;
      } else {
        if (skinIndex === 0) {
          currentSkins.length = 0;
        } else {
          currentSkins.splice(skinIndex, 1);
        }
      }

      const newResonances = [...state.resonances];
      newResonances[resonanceIndex] = {
        ...resonance,
        activeSkins: currentSkins.filter(Boolean),
      };

      return {
        ...state,
        resonances: newResonances,
      };
    }
    case 'SET_GEAR':
      return {
        ...state,
        gear: {
          ...state.gear,
          [action.payload.slot]: action.payload.item,
        },
      };
    case 'SET_WEAPON_SKIN': {
      const { index, skin } = action.payload;
      if (!state.gear.weapon) return state;
      
      const currentSkins = [...(state.gear.weapon.activeSkins || [])];
      
      // RULE: Can't set skin at index 1 if 0 is empty, etc. (similar to character skins)
      if (index > currentSkins.length && skin) {
        return state;
      }

      if (skin) {
        currentSkins[index] = skin;
      } else {
        if (index === 0) {
          currentSkins.length = 0;
        } else {
          currentSkins.splice(index, 1);
        }
      }

      return {
        ...state,
        gear: {
          ...state.gear,
          weapon: {
            ...state.gear.weapon,
            activeSkins: currentSkins.filter(Boolean),
          },
        },
      };
    }
    case 'TOGGLE_GODFORGE': {
      const { slot } = action.payload;
      const gearItem = state.gear[slot];
      if (!gearItem) return state;

      const currentLevel = gearItem.godforgeLevel || 0;
      const nextLevel = (currentLevel + 1) % 6;

      return {
        ...state,
        gear: {
          ...state.gear,
          [slot]: {
            ...gearItem,
            godforgeLevel: nextLevel,
          },
        },
      };
    }
    case 'SET_RUNE': {
      const newCategoryRunes = [...state.runes[action.payload.category]];
      const newItem = action.payload.item;
      const currentSlot = newCategoryRunes[action.payload.index];
      
      let enchantId = currentSlot.enchantId;
      let enchantRarity = currentSlot.enchantRarity;

      if (newItem) {
        const rarityIndex = RUNE_RARITY_ORDER.indexOf(newItem.rarity);
        const minIndex = RUNE_RARITY_ORDER.indexOf(MIN_ENCHANT_RARITY);
        if (rarityIndex < minIndex) {
          enchantId = undefined;
          enchantRarity = undefined;
        }

        if (enchantId) {
          const common = COMMON_ENCHANTS[action.payload.category] || [];
          const categorySpecific = newItem.gameplayCategory ? (CATEGORY_ENCHANTS[newItem.gameplayCategory]?.[action.payload.category as 'enhancement' | 'ability'] || []) : [];
          const unique = newItem.uniqueEnchant ? [newItem.uniqueEnchant] : [];
          const pool = [...common, ...categorySpecific, ...unique];
          
          if (!pool.some(e => e.id === enchantId)) {
            enchantId = undefined;
            enchantRarity = undefined;
          }
        }
      } else {
        enchantId = undefined;
        enchantRarity = undefined;
      }

      newCategoryRunes[action.payload.index] = {
        item: newItem,
        enchantId,
        enchantRarity,
      };
      return {
        ...state,
        runes: {
          ...state.runes,
          [action.payload.category]: newCategoryRunes,
        },
      };
    }
    case 'SET_RUNE_ENCHANT': {
      if (action.payload.category === 'etched') return state;
      const newCategoryRunes = [...state.runes[action.payload.category]];
      newCategoryRunes[action.payload.index] = {
        ...newCategoryRunes[action.payload.index],
        enchantId: action.payload.enchantId,
        enchantRarity: action.payload.rarity,
      };
      return {
        ...state,
        runes: {
          ...state.runes,
          [action.payload.category]: newCategoryRunes,
        },
      };
    }
    default:
      return state;
  }
}
