export const VERSION = '1.0.0';

export type GearRarity = 
  | 'common' | 'fine' | 'rare' | 'epic' | 'epic_1' | 'epic_2' 
  | 'legendary' | 'legendary_1' | 'legendary_2' | 'legendary_3' 
  | 'mythic' | 'mythic_1' | 'mythic_2' | 'mythic_3' | 'mythic_4' 
  | 'chaotic';

export type RuneRarity = 
  | 'common' | 'fine' | 'rare' | 'epic' | 'epic_1' | 'epic_2' 
  | 'legendary' | 'legendary_1' | 'legendary_2' | 'legendary_3' 
  | 'mythic';

export type EnchantRarity = 'common' | 'fine' | 'rare' | 'epic' | 'legendary' | 'mythic';

export type GearType = 'weapon' | 'amulet' | 'ring' | 'helmet' | 'armor' | 'boots';

export type GearSet = 
  | 'oracle' | 'griffin' | 'dragoon' // S-tier (Epic+)
  | 'echo' | 'decisiveness' | 'destruction'; // Non S-tier (Legendary 3 or below)

export type RuneCategory = 'enhancement' | 'ability' | 'blessing' | 'etched';

export type GameplayCategory = 'Circles' | 'Sword Strikes' | 'Sprites' | 'Meteors' | 'Main Weapon' | 'Elemental' | 'Plants';

export interface SkinState {
  id: string;
  stars: number;
}

export interface CharacterState {
  id: string;
  stars: number; // 0-8
  activeSkins: SkinState[]; // max 2
}

export interface WeaponSkin {
  id: string;
  name: string;
  weaponId: string;
  rarity: GearRarity; // For background frame
}

export interface GearItem {
  id: string;
  name: string;
  type: GearType;
  set: GearSet;
  rarity: GearRarity;
  isSTier: boolean;
  skins?: string[]; // Available skin IDs
  activeSkins?: SkinState[]; // Max 3, only for weapon
  isGodforged?: boolean;
}

export interface Enchantment {
  id: string;
  name: string;
  availableRarities: EnchantRarity[];
}

export interface RuneItem {
  id: string;
  name: string;
  category: RuneCategory;
  gameplayCategory?: GameplayCategory; // For Enhancement/Ability
  rarity: RuneRarity;
  uniqueEnchant?: Enchantment;
}

export interface RuneSlot {
  item?: RuneItem;
  enchantId?: string;
  enchantRarity?: EnchantRarity;
}

export interface Skin {
  id: string;
  name: string;
  characterId: string;
}

export interface Character {
  id: string;
  name: string;
  skins: string[]; // List of Skin IDs
}

export interface Loadout {
  name: string;
  character: CharacterState;
  resonances: (CharacterState | undefined)[]; // Max 2 slots
  gear: {
    weapon?: GearItem;
    amulet?: GearItem;
    ring?: GearItem;
    helmet?: GearItem;
    armor?: GearItem;
    boots?: GearItem;
  };
  runes: {
    enhancement: RuneSlot[]; // 4 slots
    ability: RuneSlot[];     // 4 slots
    blessing: RuneSlot[];    // 2 slots
    etched: RuneSlot[];      // 3 slots
  };
}
