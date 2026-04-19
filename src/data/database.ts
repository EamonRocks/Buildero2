import type { GearItem, RuneItem, Character, RuneCategory, Enchantment, GameplayCategory, Skin, WeaponSkin } from '../types';

export const GEAR_DATABASE: Record<string, Omit<GearItem, 'rarity'>> = {
  // S-Tier Sets (Oracle, Griffin, Dragoon)
  'oracle_weapon': { id: 'oracle_weapon', name: 'Oracle Spear', type: 'weapon', set: 'oracle', isSTier: true, skins: ['eldritch_tower', 'goldwish_cudgel', 'shackling_sunlance', 'star_of_christmas'] },
  'oracle_amulet': { id: 'oracle_amulet', name: 'Oracle Amulet', type: 'amulet', set: 'oracle', isSTier: true },
  'oracle_ring': { id: 'oracle_ring', name: 'Oracle Ring', type: 'ring', set: 'oracle', isSTier: true },
  'oracle_helmet': { id: 'oracle_helmet', name: 'Oracle Helmet', type: 'helmet', set: 'oracle', isSTier: true },
  'oracle_armor': { id: 'oracle_armor', name: 'Oracle Armor', type: 'armor', set: 'oracle', isSTier: true },
  'oracle_boots': { id: 'oracle_boots', name: 'Oracle Boots', type: 'boots', set: 'oracle', isSTier: true },

  'griffin_weapon': { id: 'griffin_weapon', name: 'Griffin Claw', type: 'weapon', set: 'griffin', isSTier: true, skins: ['cosmic_hoop', 'holly_blitz', 'monarchs_fang', 'shadesteal_claw'] },
  'griffin_amulet': { id: 'griffin_amulet', name: 'Griffin Amulet', type: 'amulet', set: 'griffin', isSTier: true },
  'griffin_ring': { id: 'griffin_ring', name: 'Griffin Ring', type: 'ring', set: 'griffin', isSTier: true },
  'griffin_helmet': { id: 'griffin_helmet', name: 'Griffin Helmet', type: 'helmet', set: 'griffin', isSTier: true },
  'griffin_armor': { id: 'griffin_armor', name: 'Griffin Armor', type: 'armor', set: 'griffin', isSTier: true },
  'griffin_boots': { id: 'griffin_boots', name: 'Griffin Boots', type: 'boots', set: 'griffin', isSTier: true },

  'dragoon_weapon': { id: 'dragoon_weapon', name: 'Dragoon Crossbow', type: 'weapon', set: 'dragoon', isSTier: true, skins: ['gigawyrms_roar', 'quetzal_whisper', 'sleighbound_voyage', 'sunpiercer_bow'] },
  'dragoon_amulet': { id: 'dragoon_amulet', name: 'Dragoon Amulet', type: 'amulet', set: 'dragoon', isSTier: true },
  'dragoon_ring': { id: 'dragoon_ring', name: 'Dragoon Ring', type: 'ring', set: 'dragoon', isSTier: true },
  'dragoon_helmet': { id: 'dragoon_helmet', name: 'Dragoon Helmet', type: 'helmet', set: 'dragoon', isSTier: true },
  'dragoon_armor': { id: 'dragoon_armor', name: 'Dragoon Armor', type: 'armor', set: 'dragoon', isSTier: true },
  'dragoon_boots': { id: 'dragoon_boots', name: 'Dragoon Boots', type: 'boots', set: 'dragoon', isSTier: true },

  // Non S-Tier Sets (Echo, Decisiveness, Destruction)
  'echo_weapon': { id: 'echo_weapon', name: 'Beam Staff', type: 'weapon', set: 'echo', isSTier: false, skins: ['bean_staff'] },
  'echo_amulet': { id: 'echo_amulet', name: 'Echo Amulet', type: 'amulet', set: 'echo', isSTier: false },
  'echo_ring': { id: 'echo_ring', name: 'Echo Ring', type: 'ring', set: 'echo', isSTier: false },
  'echo_helmet': { id: 'echo_helmet', name: 'Echo Helmet', type: 'helmet', set: 'echo', isSTier: false },
  'echo_armor': { id: 'echo_armor', name: 'Echo Armor', type: 'armor', set: 'echo', isSTier: false },
  'echo_boots': { id: 'echo_boots', name: 'Echo Boots', type: 'boots', set: 'echo', isSTier: false },

  'decisiveness_weapon': { id: 'decisiveness_weapon', name: 'Agile Knuckles', type: 'weapon', set: 'decisiveness', isSTier: false, skins: ['agile_knuckles_rozen'] },
  'decisiveness_amulet': { id: 'decisiveness_amulet', name: 'Amulet of Decisiveness', type: 'amulet', set: 'decisiveness', isSTier: false },
  'decisiveness_ring': { id: 'decisiveness_ring', name: 'Ring of Decisiveness', type: 'ring', set: 'decisiveness', isSTier: false },
  'decisiveness_helmet': { id: 'decisiveness_helmet', name: 'Helmet of Decisiveness', type: 'helmet', set: 'decisiveness', isSTier: false },
  'decisiveness_armor': { id: 'decisiveness_armor', name: 'Armor of Decisiveness', type: 'armor', set: 'decisiveness', isSTier: false },
  'decisiveness_boots': { id: 'decisiveness_boots', name: 'Boots of Decisiveness', type: 'boots', set: 'decisiveness', isSTier: false },

  'destruction_weapon': { id: 'destruction_weapon', name: 'Heroic Longbow', type: 'weapon', set: 'destruction', isSTier: false, skins: ['heroic_longbow_twilight'] },
  'destruction_amulet': { id: 'destruction_amulet', name: 'Amulet of Destruction', type: 'amulet', set: 'destruction', isSTier: false },
  'destruction_ring': { id: 'destruction_ring', name: 'Ring of Destruction', type: 'ring', set: 'destruction', isSTier: false },
  'destruction_helmet': { id: 'destruction_helmet', name: 'Helmet of Destruction', type: 'helmet', set: 'destruction', isSTier: false },
  'destruction_armor': { id: 'destruction_armor', name: 'Armor of Destruction', type: 'armor', set: 'destruction', isSTier: false },
  'destruction_boots': { id: 'destruction_boots', name: 'Boots of Destruction', type: 'boots', set: 'destruction', isSTier: false },
};

// ENCHANTMENT POOLS
const ATK_MAXHP_RARITIES = ['common', 'fine', 'rare', 'epic'] as const;
const ALL_RARITIES = ['common', 'fine', 'rare', 'epic', 'legendary', 'mythic'] as const;
const ADVANCED_RARITIES = ['rare', 'epic', 'legendary', 'mythic'] as const;
const GLOBALCRIT_RARITIES = ['epic', 'legendary', 'mythic'] as const;
const BOSSMINION_RARITIES = ['fine', 'rare', 'epic', 'legendary', 'mythic'] as const;
const UNIQUE_RARITIES = ['legendary', 'mythic'] as const;

export const COMMON_ENCHANTS: Record<RuneCategory, Enchantment[]> = {
  enhancement: [
    { id: 'atk_pwr', name: 'ATK PWR', availableRarities: [...ATK_MAXHP_RARITIES] },
    { id: 'boss_dmg', name: 'Boss DMG', availableRarities: [...BOSSMINION_RARITIES] },
    { id: 'minion_dmg', name: 'More damage vs minions', availableRarities: [...BOSSMINION_RARITIES] },
    { id: 'crit_dmg', name: 'CRIT DMG', availableRarities: [...GLOBALCRIT_RARITIES] },
  ],
  ability: [
    { id: 'max_hp', name: 'Max HP', availableRarities: [...ATK_MAXHP_RARITIES] },
    { id: 'boss_dmg_reduc', name: 'Boss DMG REDUC', availableRarities: [...BOSSMINION_RARITIES] },
    { id: 'minion_dmg_reduc', name: 'Minion DMG REDUC', availableRarities: [...BOSSMINION_RARITIES] },
    { id: 'crit_dmg_reduc', name: 'CRIT DMG REDUC', availableRarities: [...GLOBALCRIT_RARITIES] },
  ],
  blessing: [
    { id: 'atk_pwr_bless', name: 'ATK PWR', availableRarities: [...ATK_MAXHP_RARITIES] },
    { id: 'max_hp_bless', name: 'Max HP', availableRarities: [...ATK_MAXHP_RARITIES] },
    { id: 'reduc_circle', name: 'Reduced Circle DMG taken', availableRarities: [...BOSSMINION_RARITIES] },
    { id: 'reduc_sword', name: 'Reduced Strike DMG taken', availableRarities: [...BOSSMINION_RARITIES] },
    { id: 'reduc_sprite', name: 'Reduced Sprite DMG taken', availableRarities: [...BOSSMINION_RARITIES] },
    { id: 'reduc_weapon', name: 'Reduced Main Weapon DMG taken', availableRarities: [...BOSSMINION_RARITIES] },
    { id: 'reduc_meteor', name: 'Reduced Meteor DMG taken', availableRarities: [...BOSSMINION_RARITIES] },
    { id: 'reduc_elemental', name: 'Reduced Elemental DMG taken', availableRarities: [...BOSSMINION_RARITIES] },
  ],
  etched: [],
};

export const CATEGORY_ENCHANTS: Record<GameplayCategory, Record<'enhancement' | 'ability', Enchantment[]>> = {
  'Circles': {
    enhancement: [
      { id: 'circle_dmg_enh', name: 'Circle DMG', availableRarities: [...ALL_RARITIES] },
      { id: 'circles_crit_rate_enh', name: 'Circle CRIT Rate', availableRarities: [...ADVANCED_RARITIES] },
    ],
    ability: [
      { id: 'circles_dmg_abi', name: 'Circle DMG', availableRarities: [...ALL_RARITIES] },
      { id: 'circles_crit_dmg_abi', name: 'Circle CRIT DMG', availableRarities: [...ADVANCED_RARITIES] },
    ]
  },
  'Sword Strikes': {
    enhancement: [
      { id: 'sword_dmg_enh', name: 'Strike DMG', availableRarities: [...ALL_RARITIES] },
      { id: 'sword_crit_rate_enh', name: 'Strike CRIT Rate', availableRarities: [...ADVANCED_RARITIES] },
    ],
    ability: [
      { id: 'sword_dmg_abi', name: 'Strike DMG', availableRarities: [...ALL_RARITIES] },
      { id: 'sword_crit_dmg_abi', name: 'Strike CRIT DMG', availableRarities: [...ADVANCED_RARITIES] },
    ]
  },
  'Sprites': {
    enhancement: [
      { id: 'sprites_dmg_enh', name: 'Sprite DMG', availableRarities: [...ALL_RARITIES] },
      { id: 'sprites_crit_rate_enh', name: 'Sprite CRIT Rate', availableRarities: [...ADVANCED_RARITIES] },
    ],
    ability: [
      { id: 'sprites_dmg_abi', name: 'Sprite DMG', availableRarities: [...ALL_RARITIES] },
      { id: 'sprites_crit_dmg_abi', name: 'Sprite CRIT DMG', availableRarities: [...ADVANCED_RARITIES] },
    ]
  },
  'Meteors': {
    enhancement: [
      { id: 'meteors_dmg_enh', name: 'Meteor DMG', availableRarities: [...ALL_RARITIES] },
      { id: 'meteors_crit_rate_enh', name: 'Meteor CRIT Rate', availableRarities: [...ADVANCED_RARITIES] },
    ],
    ability: [
      { id: 'meteors_dmg_abi', name: 'Meteor DMG', availableRarities: [...ALL_RARITIES] },
      { id: 'meteors_crit_dmg_abi', name: 'Meteor CRIT DMG', availableRarities: [...ADVANCED_RARITIES] },
    ]
  },
  'Main Weapon': {
    enhancement: [
      { id: 'weapon_dmg_enh', name: 'Main Weapon DMG', availableRarities: [...ALL_RARITIES] },
      { id: 'weapon_crit_rate_enh', name: 'Main Weapon CRIT Rate', availableRarities: [...ADVANCED_RARITIES] },
    ],
    ability: [
      { id: 'weapon_dmg_abi', name: 'Main Weapon DMG', availableRarities: [...ALL_RARITIES] },
      { id: 'weapon_crit_dmg_abi', name: 'Main Weapon CRIT DMG', availableRarities: [...ADVANCED_RARITIES] },
    ]
  },
  'Elemental': {
    enhancement: [
      { id: 'elemental_dmg_enh', name: 'Elemental DMG', availableRarities: [...ALL_RARITIES] },
      { id: 'elemental_crit_rate_enh', name: 'Elemental CRIT Rate', availableRarities: [...ADVANCED_RARITIES] },
    ],
    ability: [
      { id: 'elemental_dmg_abi', name: 'Elemental DMG', availableRarities: [...ALL_RARITIES] },
      { id: 'elemental_crit_dmg_abi', name: 'Elemental CRIT DMG', availableRarities: [...ADVANCED_RARITIES] },
    ]
  },
  'Plants': {
    enhancement: [
      { id: 'plants_dmg_enh', name: 'Plant DMG', availableRarities: [...ALL_RARITIES] },
      { id: 'plants_crit_rate_enh', name: 'Plant CRIT Rate', availableRarities: [...ADVANCED_RARITIES] },
    ],
    ability: [
      { id: 'plants_dmg_abi', name: 'Plant DMG', availableRarities: [...ALL_RARITIES] },
      { id: 'plants_crit_dmg_abi', name: 'Plant CRIT DMG', availableRarities: [...ADVANCED_RARITIES] },
    ]
  },
};

export const RUNE_DATABASE: Record<string, Omit<RuneItem, 'rarity'>> = {
  // Enhancement
  'enhancement_sawblade': { 
    id: 'enhancement_sawblade', name: 'Sawblade Circle', category: 'enhancement', gameplayCategory: 'Circles',
    uniqueEnchant: { id: 'saw_unique', name: 'Unique Enchant', availableRarities: [...UNIQUE_RARITIES] }
  },
  'enhancement_spin': { 
    id: 'enhancement_spin', name: 'Spin SPD Up', category: 'enhancement', gameplayCategory: 'Circles',
    uniqueEnchant: { id: 'spin_unique', name: 'Unique Enchant', availableRarities: [...UNIQUE_RARITIES] }
  },
  'enhancement_dragonflight': { 
    id: 'enhancement_dragonflight', name: 'Dragonflight Sword', category: 'enhancement', gameplayCategory: 'Sword Strikes',
    uniqueEnchant: { id: 'dragon_unique', name: 'Unique Enchant', availableRarities: [...UNIQUE_RARITIES] }
  },
  'enhancement_ricochet': { 
    id: 'enhancement_ricochet', name: 'Ricochet Strike', category: 'enhancement', gameplayCategory: 'Sword Strikes',
    uniqueEnchant: { id: 'rico_unique', name: 'Unique Enchant', availableRarities: [...UNIQUE_RARITIES] }
  },
  'enhancement_multishot': { 
    id: 'enhancement_multishot', name: 'Sprite Multishot', category: 'enhancement', gameplayCategory: 'Sprites',
    uniqueEnchant: { id: 'multi_unique', name: 'Unique Enchant', availableRarities: [...UNIQUE_RARITIES] }
  },
  'enhancement_link': { 
    id: 'enhancement_link', name: 'Sprite Link', category: 'enhancement', gameplayCategory: 'Sprites',
    uniqueEnchant: { id: 'link_unique', name: 'Unique Enchant', availableRarities: [...UNIQUE_RARITIES] }
  },
  'enhancement_giant': { 
    id: 'enhancement_giant', name: 'Giant Meteor', category: 'enhancement', gameplayCategory: 'Meteors',
    uniqueEnchant: { id: 'giant_unique', name: 'Unique Enchant', availableRarities: [...UNIQUE_RARITIES] }
  },
  'enhancement_potion': { 
    id: 'enhancement_potion', name: 'Potion Magnet', category: 'enhancement', gameplayCategory: 'Main Weapon',
    uniqueEnchant: { id: 'pot_unique', name: 'Unique Enchant', availableRarities: [...UNIQUE_RARITIES] }
  },
  'enhancement_sharp': { 
    id: 'enhancement_sharp', name: 'Sharp Arrow', category: 'enhancement', gameplayCategory: 'Main Weapon',
    uniqueEnchant: { id: 'sharp_unique', name: 'Unique Enchant', availableRarities: [...UNIQUE_RARITIES] }
  },
  'enhancement_flamenox': { 
    id: 'enhancement_flamenox', name: 'Flamenox Seal', category: 'enhancement', gameplayCategory: 'Elemental',
    uniqueEnchant: { id: 'flame_unique', name: 'Unique Enchant', availableRarities: [...UNIQUE_RARITIES] }
  },
  'enhancement_frostshock': { 
    id: 'enhancement_frostshock', name: 'Frostshock Seal', category: 'enhancement', gameplayCategory: 'Elemental',
    uniqueEnchant: { id: 'frost_unique', name: 'Unique Enchant', availableRarities: [...UNIQUE_RARITIES] }
  },
  'enhancement_rootguard': { 
    id: 'enhancement_rootguard', name: 'Rootguard', category: 'enhancement', gameplayCategory: 'Plants',
    uniqueEnchant: { id: 'root_unique', name: 'Unique Enchant', availableRarities: [...UNIQUE_RARITIES] }
  },
  'enhancement_vine': { 
    id: 'enhancement_vine', name: 'Vine Bind', category: 'enhancement', gameplayCategory: 'Plants',
    uniqueEnchant: { id: 'vine_unique', name: 'Unique Enchant', availableRarities: [...UNIQUE_RARITIES] }
  },

  // Ability
  'ability_circle': { 
    id: 'ability_circle', name: 'Circle', category: 'ability', gameplayCategory: 'Circles',
    uniqueEnchant: { id: 'circle_abi_unique', name: 'Unique Enchant', availableRarities: [...UNIQUE_RARITIES] }
  },
  'ability_ring': { 
    id: 'ability_ring', name: 'Ring of Agony', category: 'ability', gameplayCategory: 'Circles',
    uniqueEnchant: { id: 'ring_abi_unique', name: 'Unique Enchant', availableRarities: [...UNIQUE_RARITIES] }
  },
  'ability_sword_time': { 
    id: 'ability_sword_time', name: 'Sword of Time', category: 'ability', gameplayCategory: 'Sword Strikes',
    uniqueEnchant: { id: 'sword_abi_unique', name: 'Unique Enchant', availableRarities: [...UNIQUE_RARITIES] }
  },
  'ability_strike_potion': { 
    id: 'ability_strike_potion', name: 'Strike Potion', category: 'ability', gameplayCategory: 'Sword Strikes',
    uniqueEnchant: { id: 'strike_abi_unique', name: 'Unique Enchant', availableRarities: [...UNIQUE_RARITIES] }
  },
  'ability_melee': { 
    id: 'ability_melee', name: 'Melee Sprite', category: 'ability', gameplayCategory: 'Sprites',
    uniqueEnchant: { id: 'melee_abi_unique', name: 'Unique Enchant', availableRarities: [...UNIQUE_RARITIES] }
  },
  'ability_healing': { 
    id: 'ability_healing', name: 'Healing Sprite', category: 'ability', gameplayCategory: 'Sprites',
    uniqueEnchant: { id: 'heal_abi_unique', name: 'Unique Enchant', availableRarities: [...UNIQUE_RARITIES] }
  },
  'ability_arrow_rain': { 
    id: 'ability_arrow_rain', name: 'Arrow Rain', category: 'ability', gameplayCategory: 'Main Weapon',
    uniqueEnchant: { id: 'rain_abi_unique', name: 'Unique Enchant', availableRarities: [...UNIQUE_RARITIES] }
  },
  'ability_star_time': { 
    id: 'ability_star_time', name: 'Star of Time', category: 'ability', gameplayCategory: 'Meteors',
    uniqueEnchant: { id: 'star_abi_unique', name: 'Unique Enchant', availableRarities: [...UNIQUE_RARITIES] }
  },
  'ability_star_fury': { 
    id: 'ability_star_fury', name: 'Star of Fury', category: 'ability', gameplayCategory: 'Meteors',
    uniqueEnchant: { id: 'fury_abi_unique', name: 'Unique Enchant', availableRarities: [...UNIQUE_RARITIES] }
  },
  'ability_flamenox': { 
    id: 'ability_flamenox', name: 'Flamenox Touch', category: 'ability', gameplayCategory: 'Elemental',
    uniqueEnchant: { id: 'flame_abi_unique', name: 'Unique Enchant', availableRarities: [...UNIQUE_RARITIES] }
  },
  'ability_frostshock': { 
    id: 'ability_frostshock', name: 'Frostshock Touch', category: 'ability', gameplayCategory: 'Elemental',
    uniqueEnchant: { id: 'frost_abi_unique', name: 'Unique Enchant', availableRarities: [...UNIQUE_RARITIES] }
  },
  'ability_plant_summon': { 
    id: 'ability_plant_summon', name: 'Plant Summon', category: 'ability', gameplayCategory: 'Plants',
    uniqueEnchant: { id: 'plant_abi_unique', name: 'Unique Enchant', availableRarities: [...UNIQUE_RARITIES] }
  },
  'ability_equinox_bloom': { 
    id: 'ability_equinox_bloom', name: 'Equinox Bloom', category: 'ability', gameplayCategory: 'Plants',
    uniqueEnchant: { id: 'bloom_abi_unique', name: 'Unique Enchant', availableRarities: [...UNIQUE_RARITIES] }
  },

  // Blessing
  'blessing_guardian': { 
    id: 'blessing_guardian', name: 'Guardian', category: 'blessing',
    uniqueEnchant: { id: 'guard_unique', name: 'Unique Enchant', availableRarities: [...UNIQUE_RARITIES] }
  },
  'blessing_devil_pact': { 
    id: 'blessing_devil_pact', name: 'Devil Pact', category: 'blessing',
    uniqueEnchant: { id: 'pact_unique', name: 'Unique Enchant', availableRarities: [...UNIQUE_RARITIES] }
  },
  'blessing_rabbit_foot': { 
    id: 'blessing_rabbit_foot', name: 'Rabbits Foot', category: 'blessing',
    uniqueEnchant: { id: 'rabbit_unique', name: 'Unique Enchant', availableRarities: [...UNIQUE_RARITIES] }
  },
  'blessing_resilience': { 
    id: 'blessing_resilience', name: 'Resilience', category: 'blessing',
    uniqueEnchant: { id: 'resil_unique', name: 'Unique Enchant', availableRarities: [...UNIQUE_RARITIES] }
  },
  'blessing_lucky_shadow': { 
    id: 'blessing_lucky_shadow', name: 'Lucky Shadow', category: 'blessing',
    uniqueEnchant: { id: 'lucky_unique', name: 'Unique Enchant', availableRarities: [...UNIQUE_RARITIES] }
  },
  'blessing_revive': { 
    id: 'blessing_revive', name: 'Revive', category: 'blessing',
    uniqueEnchant: { id: 'revive_unique', name: 'Unique Enchant', availableRarities: [...UNIQUE_RARITIES] }
  },
  'blessing_intelligence': { 
    id: 'blessing_intelligence', name: 'Intelligence', category: 'blessing',
    uniqueEnchant: { id: 'intel_unique', name: 'Unique Enchant', availableRarities: [...UNIQUE_RARITIES] }
  },

  // Etched
  'etched_arrow_of_echoes': { id: 'etched_arrow_of_echoes', name: 'Arrow of Echoes', category: 'etched' },
  'etched_pulsing_orb': { id: 'etched_pulsing_orb', name: 'Pulsing Orb', category: 'etched' },
  'etched_elemental_domain': { id: 'etched_elemental_domain', name: 'Elemental Domain', category: 'etched' },
  'etched_sprite_awe': { id: 'etched_sprite_awe', name: 'Sprites Awe', category: 'etched' },
  'etched_sword_strike_split': { id: 'etched_sword_strike_split', name: 'Sword Strike Split', category: 'etched' },
  'etched_meteor_split': { id: 'etched_meteor_split', name: 'Meteor Split', category: 'etched' },
  'etched_swordstrike_aerie': { id: 'etched_swordstrike_aerie', name: 'Swordstrike Aerie', category: 'etched' },
  'etched_sprite_assist': { id: 'etched_sprite_assist', name: 'Sprite Assist', category: 'etched' },
  'etched_potion_spring': { id: 'etched_potion_spring', name: 'Potion Spring', category: 'etched' },
  'etched_elemental_crit': { id: 'etched_elemental_crit', name: 'Elemental Crit', category: 'etched' },
  'etched_life_surge': { id: 'etched_life_surge', name: 'Life Surge', category: 'etched' },
  'etched_orbital_orb': { id: 'etched_orbital_orb', name: 'Orbital Orb', category: 'etched' },
  'etched_echo_scythe': { id: 'etched_echo_scythe', name: 'Echo Scythe', category: 'etched' },
};

export const WEAPON_SKIN_DATABASE: Record<string, WeaponSkin> = {
  'eldritch_tower': { id: 'eldritch_tower', name: 'Eldritch Tower', weaponId: 'oracle_weapon', rarity: 'legendary' },
  'goldwish_cudgel': { id: 'goldwish_cudgel', name: 'Goldwish Cudgel', weaponId: 'oracle_weapon', rarity: 'legendary' },
  'shackling_sunlance': { id: 'shackling_sunlance', name: 'Shackling Sunlance', weaponId: 'oracle_weapon', rarity: 'epic' },
  'star_of_christmas': { id: 'star_of_christmas', name: 'Star of Christmas', weaponId: 'oracle_weapon', rarity: 'legendary' },
  'cosmic_hoop': { id: 'cosmic_hoop', name: 'Cosmic Hoop', weaponId: 'griffin_weapon', rarity: 'legendary' },
  'holly_blitz': { id: 'holly_blitz', name: 'Holly Blitz', weaponId: 'griffin_weapon', rarity: 'legendary' },
  'monarchs_fang': { id: 'monarchs_fang', name: 'Monarchs Fang', weaponId: 'griffin_weapon', rarity: 'legendary' },
  'shadesteal_claw': { id: 'shadesteal_claw', name: 'Shadesteal Claw', weaponId: 'griffin_weapon', rarity: 'epic' },
  'gigawyrms_roar': { id: 'gigawyrms_roar', name: 'Gigawyrms Roar', weaponId: 'dragoon_weapon', rarity: 'legendary' },
  'quetzal_whisper': { id: 'quetzal_whisper', name: 'Quetzal Whisper', weaponId: 'dragoon_weapon', rarity: 'epic' },
  'sleighbound_voyage': { id: 'sleighbound_voyage', name: 'Sleighbound Voyage', weaponId: 'dragoon_weapon', rarity: 'legendary' },
  'sunpiercer_bow': { id: 'sunpiercer_bow', name: 'Sunpiercer Bow', weaponId: 'dragoon_weapon', rarity: 'legendary' },
  'bean_staff': { id: 'bean_staff', name: 'Bean Staff', weaponId: 'echo_weapon', rarity: 'rare' },
  'agile_knuckles_rozen': { id: 'agile_knuckles_rozen', name: 'Agile Knuckles - Rozen', weaponId: 'decisiveness_weapon', rarity: 'rare' },
  'heroic_longbow_twilight': { id: 'heroic_longbow_twilight', name: 'Heroic Longbow - Twilight', weaponId: 'destruction_weapon', rarity: 'rare' },
};

export const SKIN_DATABASE: Record<string, Skin> = {
  'mallex': { id: 'mallex', name: 'Mallex', characterId: 'alex' },
  'nian_slayer_bliss': { id: 'nian_slayer_bliss', name: 'Nian Slayer - Bliss', characterId: 'alex' },
  'nian_slayer_luck': { id: 'nian_slayer_luck', name: 'Nian Slayer - Luck', characterId: 'nyanja' },
  'shinobill': { id: 'shinobill', name: 'Shinobill', characterId: 'nyanja' },
  'harelix': { id: 'harelix', name: 'Harelix', characterId: 'helix' },
  'nian_slayer_joy': { id: 'nian_slayer_joy', name: 'Nian Slayer - Joy', characterId: 'helix' },
  'ducklix': { id: 'ducklix', name: 'Ducklix', characterId: 'helix' },
  'reindeer_plush': { id: 'reindeer_plush', name: 'Reindeer Plush', characterId: 'hela' },
  'life_essence': { id: 'life_essence', name: 'Life_Essence', characterId: 'hela' },
  'empowered_curse': { id: 'empowered_curse', name: 'Empowered Curse', characterId: 'mymu' },
  'verdant_gold_archer': { id: 'verdant_gold_archer', name: 'Verdant Gold Archer', characterId: 'houyi' },
  'seraduckus': { id: 'seraduckus', name: 'Seraduckus', characterId: 'seraph' },
  'golden_velvet_carol': { id: 'golden_velvet_carol', name: 'Golden Velvet Carol', characterId: 'seraph' },
  'nian_slayer_prosperity': { id: 'nian_slayer_prosperity', name: 'Nian Slayer - Prosperity', characterId: 'seraph' },
  'nian_slayer_longevity': { id: 'nian_slayer_longevity', name: 'Nian Slayer - Longevity', characterId: 'dracoola' },
  'duckoola': { id: 'duckoola', name: 'Duckoola', characterId: 'dracoola' },
  'waddla': { id: 'waddla', name: 'Waddla', characterId: 'rolla' },
  'gingerbread_tale': { id: 'gingerbread_tale', name: 'Gingerbread Tale', characterId: 'rolla' },
  'ice_diva': { id: 'ice_diva', name: 'Ice Diva', characterId: 'rolla' },
  'illusion_essence': { id: 'illusion_essence', name: 'Illusion Essence', characterId: 'loki' },
  'scarlet_sandstorm': { id: 'scarlet_sandstorm', name: 'Scarlet Sandstorm', characterId: 'phynx' },
  'urban_edge': { id: 'urban_edge', name: 'Urban Edge', characterId: 'nezha' },
  'violet_lotus_pulse': { id: 'violet_lotus_pulse', name: 'Violet Lotus Pulse', characterId: 'nezha' },
  'nian_slayer_fortune': { id: 'nian_slayer_fortune', name: 'Nian Slayer - Fortune', characterId: 'otta' },
  'quackka': { id: 'quackka', name: 'Quackka', characterId: 'otta' },
  'abyssal_guide': { id: 'abyssal_guide', name: 'Abyssal Guide', characterId: 'atreus' },
  'demon_ducklord': { id: 'demon_ducklord', name: 'Demon Ducklord', characterId: 'atreus' },
  'lightning_essence': { id: 'lightning_essence', name: 'Lightning Essence', characterId: 'thor' },
  'waxwane_judgement': { id: 'waxwane_judgement', name: 'Waxwane Judgement', characterId: 'thor' },
  'fiery_reckoning': { id: 'fiery_reckoning', name: 'Fiery Reckoning', characterId: 'cleo' },
  'eternal_nightglow': { id: 'eternal_nightglow', name: 'Eternal Nightglow', characterId: 'cleo' },
  'conqueror_of_battles': { id: 'conqueror_of_battles', name: 'Conqueror Of Battles', characterId: 'wukong' },
  'awakened_stone_monkey': { id: 'awakened_stone_monkey', name: 'Awakened Stone Monkey', characterId: 'wukong' },
};

export const CHARACTER_DATABASE: Record<string, Character> = {
  'alex': { id: 'alex', name: 'Alex', skins: ['base', 'mallex', 'nian_slayer_bliss'] },
  'nyanja': { id: 'nyanja', name: 'Nyanja', skins: ['base', 'nian_slayer_luck', 'shinobill'] },
  'helix': { id: 'helix', name: 'Helix', skins: ['base', 'harelix', 'nian_slayer_joy', 'ducklix'] },
  'hela': { id: 'hela', name: 'Hela', skins: ['base', 'reindeer_plush', 'life_essence'] },
  'mymu': { id: 'mymu', name: 'Mymu', skins: ['base', 'empowered_curse'] },
  'houyi': { id: 'houyi', name: 'Hou Yi', skins: ['base', 'verdant_gold_archer'] },
  'seraph': { id: 'seraph', name: 'Seraph', skins: ['base', 'seraduckus', 'golden_velvet_carol', 'nian_slayer_prosperity'] },
  'dracoola': { id: 'dracoola', name: 'Dracoola', skins: ['base', 'nian_slayer_longevity', 'duckoola'] },
  'rolla': { id: 'rolla', name: 'Rolla', skins: ['base', 'waddla', 'gingerbread_tale', 'ice_diva'] },
  'loki': { id: 'loki', name: 'Loki', skins: ['base', 'illusion_essence'] },
  'phynx': { id: 'phynx', name: 'Phynx', skins: ['base', 'scarlet_sandstorm'] },
  'nezha': { id: 'nezha', name: 'Nezha', skins: ['base', 'urban_edge', 'violet_lotus_pulse'] },
  'otta': { id: 'otta', name: 'Otta', skins: ['base', 'nian_slayer_fortune', 'quackka'] },
  'atreus': { id: 'atreus', name: 'Demon King Atreus', skins: ['base', 'abyssal_guide', 'demon_ducklord'] },
  'thor': { id: 'thor', name: 'Thor', skins: ['base', 'lightning_essence', 'waxwane_judgement'] },
  'cleo': { id: 'cleo', name: 'Cleo', skins: ['base', 'fiery_reckoning', 'eternal_nightglow'] },
  'wukong': { id: 'wukong', name: 'Wukong', skins: ['base', 'conqueror_of_battles', 'awakened_stone_monkey'] },
};

export interface FeaturedBuild {
  name: string;
  code: string;
}

export const FEATURED_BUILDS: FeaturedBuild[] = [
  {
    name: "Pokoko's Elemental PvE Rune setup",
    code: "N4IgbiBcCMA0IBMqgHZRABQPYGtdYHIBnAAgFEAbAUxIzDJHgGMoBtEAQwBcAnKgVyKMADLFYBdcfB5sU-ChVhyFUkAHNkAX2n9kIKigAWHFEyoBbA1zbsDx0xasB9IsZ4AHRiGpqDCDjwAnozKiqFStkYmZpYoXE4AZjxYRFyuWEw4Xj5+AcFK8mGFEfpRDrHxCRQcsVgAHtlUvij+QSGFBSpipfYxzslYXGr8AUjwVO4AlkxOAEztCp0UkvAcAEaTFJNcwZCs7Oub24FOAckA7k48HJNo8DkteQtFXQcbWztXtxr3TbltSyWUlCQPga2oRCI3xsIHBVEh3yuVDAkzAVEazVa+RB4W6cIRKDUV3WG0qWEGGP+2I64VUVC4TEMVCQe1sDKZCFOPAuTiwCScVEZWHhlMeAJxxW69MZzIF1AqHAoTiYPG2Xgm02eoLZMs5gsMWBcTECXCZXmufC1tM0NqAA"
  },
  {
    name: "Poor man's Dragoon PvE Gear build",
    code: "N4IgbiBcCMA0IBMqgHZRABQPZYE4AIBbAQxQHIBnfAEV2IHMcV8MwBRfAcQFNiCAjAK4BLADZJ4AYygBtEAAtuo4QA8QsAGywZAXR3xcsuQBd5edQAZte7SFxZRo4pes2Q9ZCADuvAA5Y0SDkEOkYAgH0fYn80eEIAT1NhaVgAM2JRCm5tOQBHQW5jAC8MyPlhCl9uQ1gLPX0QYkJBUULZEG5JM3Cmlrb4VvpuFAQ+ePCAZnV0zOzdBtxhFA8gxFCmcMXl9RAEpJSZrNd4RVFCNtWQhg3T8+MdvfKDjKP5+D5Cc1XO7o-zAe4QxGY0m0xeczc-Bwxgo7SuYRQ4ShWBhD0STzBs1cAF8DIJPMN5KRJNxzih7kEUC1RLAqY5adSGY4GsR+GJhMZ4rI6TSeUzedSGvxWhQKEsVjI+TyGoUutwkJTGVLBdjVUA"
  },
  {
    name: "Adrias v2 PvP Build",
    code: "N4IgbiBcCMA0IBMqgHZRAQQQJwJYEMBnAAjACZiAFMS4gIQFdcAbJeAYygG0QB7AF374QsAGywuPAI4N87ANbzhsAAwBdDfGzce-ABa9tsAKwTNPdswCmvEackgAZrivYAngH1sVhbxS4UAHMRdQ01eGDIUAB3K3wABz9uPmw5aw9YhKSOPXwBXE5YfmwGKwkeK1Y8fnY9D35eWKNQ8JB8AFsGa35kwLxHZxQPDq6rHpy8-gKRR3xmQjKuTRA8IN7+wa8A4In8wtn5xeW9Svax5MM0qw8T5jPxkFrJ6dgDhbNW-Gx2wwvUy2uXx+RkeuT2Mzm7yWrQARrwBIR1rgBgEPHCESJQc99pCjmoAL5aBjIEBWFC5FDsKxnFA9SAOMkUqk0-geQi5bDxTHtNz6F4gTKJIYIdqBDyM7m8vTTcIVcn4SnUsmsxzMDpk3gAD0lfMKpOsLLmHnY1S8+H41wl8B5upAstJ8sVLI8jmwvEI-HZvAUOulesqStpRpNuFZqQt4vJvplEgdTMDrMI8QC0b1IdZIp2IBtfrtnxhLFDbh0bQLzCLw2wbuiZpT1ql-NSqPwBY8DH8MisqbtsZbhf4nlV6pQWu78ADhuYHkzwwL3ftffLA5dbo9Xp99dt44NyqNM77897ZYrqyzOcb21nuDbHdK89h1kIhG2JZhj+fQS8VjAuDAXc3uZaFYCAMOw4o7kGzCHjwb5WE+l7MKB8ieOy+AII0Y4rMBoHgQmcz3uONQnEg9IVERwGVtWHi8I44q1LwcFjigXTMLAzHMMw9pjLUFETruU7pkxLFsSxXHkQguGTtOvDtPgdbZg2hTsaxykaPi6lAA"
  }
];
