import type { GearItem, RuneItem, Character, RuneCategory, Enchantment, GameplayCategory, Skin, WeaponSkin } from '../types';

export const GEAR_DATABASE: Record<string, Omit<GearItem, 'rarity'>> = {
  // S-Tier Sets (Oracle, Griffin, Dragoon)
  'oracle_weapon': { id: 'oracle_weapon', sid: '00', name: 'Oracle Spear', type: 'weapon', set: 'oracle', isSTier: true, skins: ['eldritch_tower', 'goldwish_cudgel', 'shackling_sunlance', 'star_of_christmas'] },
  'oracle_amulet': { id: 'oracle_amulet', sid: '01', name: 'Oracle Amulet', type: 'amulet', set: 'oracle', isSTier: true },
  'oracle_ring': { id: 'oracle_ring', sid: '02', name: 'Oracle Ring', type: 'ring', set: 'oracle', isSTier: true },
  'oracle_helmet': { id: 'oracle_helmet', sid: '03', name: 'Oracle Helmet', type: 'helmet', set: 'oracle', isSTier: true },
  'oracle_armor': { id: 'oracle_armor', sid: '04', name: 'Oracle Armor', type: 'armor', set: 'oracle', isSTier: true },
  'oracle_boots': { id: 'oracle_boots', sid: '05', name: 'Oracle Boots', type: 'boots', set: 'oracle', isSTier: true },

  'griffin_weapon': { id: 'griffin_weapon', sid: '06', name: 'Griffin Claw', type: 'weapon', set: 'griffin', isSTier: true, skins: ['cosmic_hoop', 'holly_blitz', 'monarchs_fang', 'shadesteal_claw'] },
  'griffin_amulet': { id: 'griffin_amulet', sid: '07', name: 'Griffin Amulet', type: 'amulet', set: 'griffin', isSTier: true },
  'griffin_ring': { id: 'griffin_ring', sid: '08', name: 'Griffin Ring', type: 'ring', set: 'griffin', isSTier: true },
  'griffin_helmet': { id: 'griffin_helmet', sid: '09', name: 'Griffin Helmet', type: 'helmet', set: 'griffin', isSTier: true },
  'griffin_armor': { id: 'griffin_armor', sid: '0a', name: 'Griffin Armor', type: 'armor', set: 'griffin', isSTier: true },
  'griffin_boots': { id: 'griffin_boots', sid: '0b', name: 'Griffin Boots', type: 'boots', set: 'griffin', isSTier: true },

  'dragoon_weapon': { id: 'dragoon_weapon', sid: '0c', name: 'Dragoon Crossbow', type: 'weapon', set: 'dragoon', isSTier: true, skins: ['gigawyrms_roar', 'quetzal_whisper', 'sleighbound_voyage', 'sunpiercer_bow'] },
  'dragoon_amulet': { id: 'dragoon_amulet', sid: '0d', name: 'Dragoon Amulet', type: 'amulet', set: 'dragoon', isSTier: true },
  'dragoon_ring': { id: 'dragoon_ring', sid: '0e', name: 'Dragoon Ring', type: 'ring', set: 'dragoon', isSTier: true },
  'dragoon_helmet': { id: 'dragoon_helmet', sid: '0f', name: 'Dragoon Helmet', type: 'helmet', set: 'dragoon', isSTier: true },
  'dragoon_armor': { id: 'dragoon_armor', sid: '0g', name: 'Dragoon Armor', type: 'armor', set: 'dragoon', isSTier: true },
  'dragoon_boots': { id: 'dragoon_boots', sid: '0h', name: 'Dragoon Boots', type: 'boots', set: 'dragoon', isSTier: true },

  // Non S-Tier Sets (Echo, Decisiveness, Destruction)
  'echo_weapon': { id: 'echo_weapon', sid: '0i', name: 'Beam Staff', type: 'weapon', set: 'echo', isSTier: false, skins: ['bean_staff'] },
  'echo_amulet': { id: 'echo_amulet', sid: '0j', name: 'Echo Amulet', type: 'amulet', set: 'echo', isSTier: false },
  'echo_ring': { id: 'echo_ring', sid: '0k', name: 'Echo Ring', type: 'ring', set: 'echo', isSTier: false },
  'echo_helmet': { id: 'echo_helmet', sid: '0l', name: 'Echo Helmet', type: 'helmet', set: 'echo', isSTier: false },
  'echo_armor': { id: 'echo_armor', sid: '0m', name: 'Echo Armor', type: 'armor', set: 'echo', isSTier: false },
  'echo_boots': { id: 'echo_boots', sid: '0n', name: 'Echo Boots', type: 'boots', set: 'echo', isSTier: false },

  'decisiveness_weapon': { id: 'decisiveness_weapon', sid: '0o', name: 'Agile Knuckles', type: 'weapon', set: 'decisiveness', isSTier: false, skins: ['agile_knuckles_rozen'] },
  'decisiveness_amulet': { id: 'decisiveness_amulet', sid: '0p', name: 'Amulet of Decisiveness', type: 'amulet', set: 'decisiveness', isSTier: false },
  'decisiveness_ring': { id: 'decisiveness_ring', sid: '0q', name: 'Ring of Decisiveness', type: 'ring', set: 'decisiveness', isSTier: false },
  'decisiveness_helmet': { id: 'decisiveness_helmet', sid: '0r', name: 'Helmet of Decisiveness', type: 'helmet', set: 'decisiveness', isSTier: false },
  'decisiveness_armor': { id: 'decisiveness_armor', sid: '0s', name: 'Armor of Decisiveness', type: 'armor', set: 'decisiveness', isSTier: false },
  'decisiveness_boots': { id: 'decisiveness_boots', sid: '0t', name: 'Boots of Decisiveness', type: 'boots', set: 'decisiveness', isSTier: false },

  'destruction_weapon': { id: 'destruction_weapon', sid: '0u', name: 'Heroic Longbow', type: 'weapon', set: 'destruction', isSTier: false, skins: ['heroic_longbow_twilight'] },
  'destruction_amulet': { id: 'destruction_amulet', sid: '0v', name: 'Amulet of Destruction', type: 'amulet', set: 'destruction', isSTier: false },
  'destruction_ring': { id: 'destruction_ring', sid: '0w', name: 'Ring of Destruction', type: 'ring', set: 'destruction', isSTier: false },
  'destruction_helmet': { id: 'destruction_helmet', sid: '0x', name: 'Helmet of Destruction', type: 'helmet', set: 'destruction', isSTier: false },
  'destruction_armor': { id: 'destruction_armor', sid: '0y', name: 'Armor of Destruction', type: 'armor', set: 'destruction', isSTier: false },
  'destruction_boots': { id: 'destruction_boots', sid: '0z', name: 'Boots of Destruction', type: 'boots', set: 'destruction', isSTier: false },
};

// ENCHANTMENT POOLS
const ATK_MAXHP_RARITIES = ['common', 'fine', 'rare', 'epic'] as const;
const ALL_RARITIES = ['common', 'fine', 'rare', 'epic', 'legendary', 'mythic'] as const;
const ADVANCED_RARITIES = ['rare', 'epic', 'legendary', 'mythic'] as const;
const GLOBALCRIT_RARITIES = ['epic', 'legendary', 'mythic'] as const;
const BOSSMINION_RARITIES = ['fine', 'rare', 'epic', 'legendary', 'mythic'] as const;
const UNIQUE_RARITIES = ['legendary', 'mythic'] as const;

const createUnique = (id: string, sid: string): Enchantment => ({
  id, sid, name: 'Unique Enchant', availableRarities: [...UNIQUE_RARITIES]
});

export const COMMON_ENCHANTS: Record<RuneCategory, Enchantment[]> = {
  enhancement: [
    { id: 'atk_pwr', sid: '00', name: 'ATK PWR', availableRarities: [...ATK_MAXHP_RARITIES] },
    { id: 'boss_dmg', sid: '01', name: 'Boss DMG', availableRarities: [...BOSSMINION_RARITIES] },
    { id: 'minion_dmg', sid: '02', name: 'More damage vs minions', availableRarities: [...BOSSMINION_RARITIES] },
    { id: 'crit_dmg', sid: '03', name: 'CRIT DMG', availableRarities: [...GLOBALCRIT_RARITIES] },
  ],
  ability: [
    { id: 'max_hp', sid: '04', name: 'Max HP', availableRarities: [...ATK_MAXHP_RARITIES] },
    { id: 'boss_dmg_reduc', sid: '05', name: 'Boss DMG REDUC', availableRarities: [...BOSSMINION_RARITIES] },
    { id: 'minion_dmg_reduc', sid: '06', name: 'Minion DMG REDUC', availableRarities: [...BOSSMINION_RARITIES] },
    { id: 'crit_dmg_reduc', sid: '07', name: 'CRIT DMG REDUC', availableRarities: [...GLOBALCRIT_RARITIES] },
  ],
  blessing: [
    { id: 'atk_pwr_bless', sid: '08', name: 'ATK PWR', availableRarities: [...ATK_MAXHP_RARITIES] },
    { id: 'max_hp_bless', sid: '09', name: 'Max HP', availableRarities: [...ATK_MAXHP_RARITIES] },
    { id: 'reduc_circle', sid: '0a', name: 'Reduced Circle DMG taken', availableRarities: [...BOSSMINION_RARITIES] },
    { id: 'reduc_sword', sid: '0b', name: 'Reduced Strike DMG taken', availableRarities: [...BOSSMINION_RARITIES] },
    { id: 'reduc_sprite', sid: '0c', name: 'Reduced Sprite DMG taken', availableRarities: [...BOSSMINION_RARITIES] },
    { id: 'reduc_weapon', sid: '0d', name: 'Reduced Main Weapon DMG taken', availableRarities: [...BOSSMINION_RARITIES] },
    { id: 'reduc_meteor', sid: '0e', name: 'Reduced Meteor DMG taken', availableRarities: [...BOSSMINION_RARITIES] },
    { id: 'reduc_elemental', sid: '0f', name: 'Reduced Elemental DMG taken', availableRarities: [...BOSSMINION_RARITIES] },
  ],
  etched: [],
};

export const CATEGORY_ENCHANTS: Record<GameplayCategory, Record<'enhancement' | 'ability', Enchantment[]>> = {
  'Circles': {
    enhancement: [
      { id: 'circle_dmg_enh', sid: '0g', name: 'Circle DMG', availableRarities: [...ALL_RARITIES] },
      { id: 'circles_crit_rate_enh', sid: '0h', name: 'Circle CRIT Rate', availableRarities: [...ADVANCED_RARITIES] },
    ],
    ability: [
      { id: 'circles_dmg_abi', sid: '0i', name: 'Circle DMG', availableRarities: [...ALL_RARITIES] },
      { id: 'circles_crit_dmg_abi', sid: '0j', name: 'Circle CRIT DMG', availableRarities: [...ADVANCED_RARITIES] },
    ]
  },
  'Sword Strikes': {
    enhancement: [
      { id: 'sword_dmg_enh', sid: '0k', name: 'Strike DMG', availableRarities: [...ALL_RARITIES] },
      { id: 'sword_crit_rate_enh', sid: '0l', name: 'Strike CRIT Rate', availableRarities: [...ADVANCED_RARITIES] },
    ],
    ability: [
      { id: 'sword_dmg_abi', sid: '0m', name: 'Strike DMG', availableRarities: [...ALL_RARITIES] },
      { id: 'sword_crit_dmg_abi', sid: '0n', name: 'Strike CRIT DMG', availableRarities: [...ADVANCED_RARITIES] },
    ]
  },
  'Sprites': {
    enhancement: [
      { id: 'sprites_dmg_enh', sid: '0o', name: 'Sprite DMG', availableRarities: [...ALL_RARITIES] },
      { id: 'sprites_crit_rate_enh', sid: '0p', name: 'Sprite CRIT Rate', availableRarities: [...ADVANCED_RARITIES] },
    ],
    ability: [
      { id: 'sprites_dmg_abi', sid: '0q', name: 'Sprite DMG', availableRarities: [...ALL_RARITIES] },
      { id: 'sprites_crit_dmg_abi', sid: '0r', name: 'Sprite CRIT DMG', availableRarities: [...ADVANCED_RARITIES] },
    ]
  },
  'Meteors': {
    enhancement: [
      { id: 'meteors_dmg_enh', sid: '0s', name: 'Meteor DMG', availableRarities: [...ALL_RARITIES] },
      { id: 'meteors_crit_rate_enh', sid: '0t', name: 'Meteor CRIT Rate', availableRarities: [...ADVANCED_RARITIES] },
    ],
    ability: [
      { id: 'meteors_dmg_abi', sid: '0u', name: 'Meteor DMG', availableRarities: [...ALL_RARITIES] },
      { id: 'meteors_crit_dmg_abi', sid: '0v', name: 'Meteor CRIT DMG', availableRarities: [...ADVANCED_RARITIES] },
    ]
  },
  'Main Weapon': {
    enhancement: [
      { id: 'weapon_dmg_enh', sid: '0w', name: 'Main Weapon DMG', availableRarities: [...ALL_RARITIES] },
      { id: 'weapon_crit_rate_enh', sid: '0x', name: 'Main Weapon CRIT Rate', availableRarities: [...ADVANCED_RARITIES] },
    ],
    ability: [
      { id: 'weapon_dmg_abi', sid: '0y', name: 'Main Weapon DMG', availableRarities: [...ALL_RARITIES] },
      { id: 'weapon_crit_dmg_abi', sid: '0z', name: 'Main Weapon CRIT DMG', availableRarities: [...ADVANCED_RARITIES] },
    ]
  },
  'Elemental': {
    enhancement: [
      { id: 'elemental_dmg_enh', sid: '10', name: 'Elemental DMG', availableRarities: [...ALL_RARITIES] },
      { id: 'elemental_crit_rate_enh', sid: '11', name: 'Elemental CRIT Rate', availableRarities: [...ADVANCED_RARITIES] },
    ],
    ability: [
      { id: 'elemental_dmg_abi', sid: '12', name: 'Elemental DMG', availableRarities: [...ALL_RARITIES] },
      { id: 'elemental_crit_dmg_abi', sid: '13', name: 'Elemental CRIT DMG', availableRarities: [...ADVANCED_RARITIES] },
    ]
  },
  'Plants': {
    enhancement: [
      { id: 'plants_dmg_enh', sid: '14', name: 'Plant DMG', availableRarities: [...ALL_RARITIES] },
      { id: 'plants_crit_rate_enh', sid: '15', name: 'Plant CRIT Rate', availableRarities: [...ADVANCED_RARITIES] },
    ],
    ability: [
      { id: 'plants_dmg_abi', sid: '16', name: 'Plant DMG', availableRarities: [...ALL_RARITIES] },
      { id: 'plants_crit_dmg_abi', sid: '17', name: 'Plant CRIT DMG', availableRarities: [...ADVANCED_RARITIES] },
    ]
  },
};

export const RUNE_DATABASE: Record<string, Omit<RuneItem, 'rarity'>> = {
  // Enhancement
  'enhancement_sawblade': { 
    id: 'enhancement_sawblade', sid: '18', name: 'Sawblade Circle', category: 'enhancement', gameplayCategory: 'Circles',
    uniqueEnchant: createUnique('saw_unique', '19')
  },
  'enhancement_spin': { 
    id: 'enhancement_spin', sid: '1a', name: 'Spin SPD Up', category: 'enhancement', gameplayCategory: 'Circles',
    uniqueEnchant: createUnique('spin_unique', '1b')
  },
  'enhancement_dragonflight': { 
    id: 'enhancement_dragonflight', sid: '1c', name: 'Dragonflight Sword', category: 'enhancement', gameplayCategory: 'Sword Strikes',
    uniqueEnchant: createUnique('dragon_unique', '1d')
  },
  'enhancement_ricochet': { 
    id: 'enhancement_ricochet', sid: '1e', name: 'Ricochet Strike', category: 'enhancement', gameplayCategory: 'Sword Strikes',
    uniqueEnchant: createUnique('rico_unique', '1f')
  },
  'enhancement_multishot': { 
    id: 'enhancement_multishot', sid: '1g', name: 'Sprite Multishot', category: 'enhancement', gameplayCategory: 'Sprites',
    uniqueEnchant: createUnique('multi_unique', '1h')
  },
  'enhancement_link': { 
    id: 'enhancement_link', sid: '1i', name: 'Sprite Link', category: 'enhancement', gameplayCategory: 'Sprites',
    uniqueEnchant: createUnique('link_unique', '1j')
  },
  'enhancement_giant': { 
    id: 'enhancement_giant', sid: '1k', name: 'Giant Meteor', category: 'enhancement', gameplayCategory: 'Meteors',
    uniqueEnchant: createUnique('giant_unique', '1l')
  },
  'enhancement_potion': { 
    id: 'enhancement_potion', sid: '1m', name: 'Potion Magnet', category: 'enhancement', gameplayCategory: 'Meteors',
    uniqueEnchant: createUnique('pot_unique', '1n')
  },
  'enhancement_sharp': { 
    id: 'enhancement_sharp', sid: '1o', name: 'Sharp Arrow', category: 'enhancement', gameplayCategory: 'Main Weapon',
    uniqueEnchant: createUnique('sharp_unique', '1p')
  },
  'enhancement_flamenox': { 
    id: 'enhancement_flamenox', sid: '1q', name: 'Flamenox Seal', category: 'enhancement', gameplayCategory: 'Elemental',
    uniqueEnchant: createUnique('flame_unique', '1r')
  },
  'enhancement_frostshock': { 
    id: 'enhancement_frostshock', sid: '1s', name: 'Frostshock Seal', category: 'enhancement', gameplayCategory: 'Elemental',
    uniqueEnchant: createUnique('frost_unique', '1t')
  },
  'enhancement_rootguard': { 
    id: 'enhancement_rootguard', sid: '1u', name: 'Rootguard', category: 'enhancement', gameplayCategory: 'Plants',
    uniqueEnchant: createUnique('root_unique', '1v')
  },
  'enhancement_vine': { 
    id: 'enhancement_vine', sid: '1w', name: 'Vine Bind', category: 'enhancement', gameplayCategory: 'Plants',
    uniqueEnchant: createUnique('vine_unique', '1x')
  },

  // Ability
  'ability_circle': { 
    id: 'ability_circle', sid: '1y', name: 'Circle', category: 'ability', gameplayCategory: 'Circles',
    uniqueEnchant: createUnique('circle_abi_unique', '1z')
  },
  'ability_ring': { 
    id: 'ability_ring', sid: '20', name: 'Ring of Agony', category: 'ability', gameplayCategory: 'Circles',
    uniqueEnchant: createUnique('ring_abi_unique', '21')
  },
  'ability_sword_time': { 
    id: 'ability_sword_time', sid: '22', name: 'Sword of Time', category: 'ability', gameplayCategory: 'Sword Strikes',
    uniqueEnchant: createUnique('sword_abi_unique', '23')
  },
  'ability_strike_potion': { 
    id: 'ability_strike_potion', sid: '24', name: 'Strike Potion', category: 'ability', gameplayCategory: 'Sword Strikes',
    uniqueEnchant: createUnique('strike_abi_unique', '25')
  },
  'ability_melee': { 
    id: 'ability_melee', sid: '26', name: 'Melee Sprite', category: 'ability', gameplayCategory: 'Sprites',
    uniqueEnchant: createUnique('melee_abi_unique', '27')
  },
  'ability_healing': { 
    id: 'ability_healing', sid: '28', name: 'Healing Sprite', category: 'ability', gameplayCategory: 'Sprites',
    uniqueEnchant: createUnique('heal_abi_unique', '29')
  },
  'ability_arrow_rain': { 
    id: 'ability_arrow_rain', sid: '2a', name: 'Arrow Rain', category: 'ability', gameplayCategory: 'Main Weapon',
    uniqueEnchant: createUnique('rain_abi_unique', '2b')
  },
  'ability_star_time': { 
    id: 'ability_star_time', sid: '2c', name: 'Star of Time', category: 'ability', gameplayCategory: 'Meteors',
    uniqueEnchant: createUnique('star_abi_unique', '2d')
  },
  'ability_star_fury': { 
    id: 'ability_star_fury', sid: '2e', name: 'Star of Fury', category: 'ability', gameplayCategory: 'Meteors',
    uniqueEnchant: createUnique('fury_abi_unique', '2f')
  },
  'ability_flamenox': { 
    id: 'ability_flamenox', sid: '2g', name: 'Flamenox Touch', category: 'ability', gameplayCategory: 'Elemental',
    uniqueEnchant: createUnique('flame_abi_unique', '2h')
  },
  'ability_frostshock': { 
    id: 'ability_frostshock', sid: '2i', name: 'Frostshock Touch', category: 'ability', gameplayCategory: 'Elemental',
    uniqueEnchant: createUnique('frost_abi_unique', '2j')
  },
  'ability_plant_summon': { 
    id: 'ability_plant_summon', sid: '2k', name: 'Plant Summon', category: 'ability', gameplayCategory: 'Plants',
    uniqueEnchant: createUnique('plant_abi_unique', '2l')
  },
  'ability_equinox_bloom': { 
    id: 'ability_equinox_bloom', sid: '2m', name: 'Equinox Bloom', category: 'ability', gameplayCategory: 'Plants',
    uniqueEnchant: createUnique('bloom_abi_unique', '2n')
  },

  // Blessing
  'blessing_guardian': { 
    id: 'blessing_guardian', sid: '2o', name: 'Guardian', category: 'blessing',
    uniqueEnchant: createUnique('guard_unique', '2p')
  },
  'blessing_devil_pact': { 
    id: 'blessing_devil_pact', sid: '2q', name: 'Devil Pact', category: 'blessing',
    uniqueEnchant: createUnique('pact_unique', '2r')
  },
  'blessing_rabbit_foot': { 
    id: 'blessing_rabbit_foot', sid: '2s', name: 'Rabbits Foot', category: 'blessing',
    uniqueEnchant: createUnique('rabbit_unique', '2t')
  },
  'blessing_resilience': { 
    id: 'blessing_resilience', sid: '2u', name: 'Resilience', category: 'blessing',
    uniqueEnchant: createUnique('resil_unique', '2v')
  },
  'blessing_lucky_shadow': { 
    id: 'blessing_lucky_shadow', sid: '2w', name: 'Lucky Shadow', category: 'blessing',
    uniqueEnchant: createUnique('lucky_unique', '2x')
  },
  'blessing_revive': { 
    id: 'blessing_revive', sid: '2y', name: 'Revive', category: 'blessing',
    uniqueEnchant: createUnique('revive_unique', '2z')
  },
  'blessing_intelligence': { 
    id: 'blessing_intelligence', sid: '30', name: 'Intelligence', category: 'blessing',
    uniqueEnchant: createUnique('intel_unique', '31')
  },

  // Etched
  'etched_arrow_of_echoes': { id: 'etched_arrow_of_echoes', sid: '32', name: 'Arrow of Echoes', category: 'etched', gameplayCategory: 'Main Weapon' },
  'etched_pulsing_orb': { id: 'etched_pulsing_orb', sid: '33', name: 'Pulsing Orb', category: 'etched', gameplayCategory: 'Circles' },
  'etched_elemental_domain': { id: 'etched_elemental_domain', sid: '34', name: 'Elemental Domain', category: 'etched', gameplayCategory: 'Elemental' },
  'etched_sprite_awe': { id: 'etched_sprite_awe', sid: '35', name: 'Sprites Awe', category: 'etched', gameplayCategory: 'Sprites' },
  'etched_sword_strike_split': { id: 'etched_sword_strike_split', sid: '36', name: 'Sword Strike Split', category: 'etched', gameplayCategory: 'Sword Strikes' },
  'etched_meteor_split': { id: 'etched_meteor_split', sid: '37', name: 'Meteor Split', category: 'etched', gameplayCategory: 'Meteors' },
  'etched_swordstrike_aerie': { id: 'etched_swordstrike_aerie', sid: '38', name: 'Swordstrike Aerie', category: 'etched', gameplayCategory: 'Sword Strikes' },
  'etched_sprite_assist': { id: 'etched_sprite_assist', sid: '39', name: 'Sprite Assist', category: 'etched', gameplayCategory: 'Sprites' },
  'etched_potion_spring': { id: 'etched_potion_spring', sid: '3a', name: 'Potion Spring', category: 'etched', gameplayCategory: 'Meteors' },
  'etched_elemental_crit': { id: 'etched_elemental_crit', sid: '3b', name: 'Elemental Crit', category: 'etched', gameplayCategory: 'Elemental' },
  'etched_life_surge': { id: 'etched_life_surge', sid: '3c', name: 'Life Surge', category: 'etched', gameplayCategory: 'Plants' },
  'etched_orbital_orb': { id: 'etched_orbital_orb', sid: '3d', name: 'Orbital Orb', category: 'etched', gameplayCategory: 'Circles' },
  'etched_echo_scythe': { id: 'etched_echo_scythe', sid: '3e', name: 'Echo Scythe', category: 'etched', gameplayCategory: 'Main Weapon' },
  'etched_plant_crit': { id: 'etched_plant_crit', sid: '3f', name: 'Plant Crit', category: 'etched', gameplayCategory: 'Plants' },

  // ANY Runes
  'any_enhancement': { id: 'any_enhancement', sid: 'za', name: 'ANY Rune', category: 'enhancement' },
  'any_ability': { id: 'any_ability', sid: 'zb', name: 'ANY Rune', category: 'ability' },
  'any_blessing': { id: 'any_blessing', sid: 'zc', name: 'ANY Rune', category: 'blessing' },
  'any_etched': { id: 'any_etched', sid: 'zd', name: 'ANY Rune', category: 'etched' },

  // Twin Enhancement Runes
  'twin_enhancement_sawblade_spin': { 
    id: 'twin_enhancement_sawblade_spin', sid: '40', name: 'Sawblade Circle & Spin SPD Up', category: 'enhancement', gameplayCategory: 'Circles', isTwin: true, twinSource1: 'enhancement_sawblade', twinSource2: 'enhancement_spin',
    uniqueEnchants: [createUnique('saw_unique', '19'), createUnique('spin_unique', '1b')]
  },
  'twin_enhancement_dragonflight_ricochet': { 
    id: 'twin_enhancement_dragonflight_ricochet', sid: '41', name: 'Dragonflight Sword & Ricochet Strike', category: 'enhancement', gameplayCategory: 'Sword Strikes', isTwin: true, twinSource1: 'enhancement_dragonflight', twinSource2: 'enhancement_ricochet',
    uniqueEnchants: [createUnique('dragon_unique', '1d'), createUnique('rico_unique', '1f')]
  },
  'twin_enhancement_multishot_link': { 
    id: 'twin_enhancement_multishot_link', sid: '42', name: 'Sprite Multishot & Sprite Link', category: 'enhancement', gameplayCategory: 'Sprites', isTwin: true, twinSource1: 'enhancement_multishot', twinSource2: 'enhancement_link',
    uniqueEnchants: [createUnique('multi_unique', '1h'), createUnique('link_unique', '1j')]
  },
  'twin_enhancement_giant_potion': { 
    id: 'twin_enhancement_giant_potion', sid: '43', name: 'Giant Meteor & Potion Magnet', category: 'enhancement', gameplayCategory: 'Meteors', isTwin: true, twinSource1: 'enhancement_giant', twinSource2: 'enhancement_potion',
    uniqueEnchants: [createUnique('giant_unique', '1l'), createUnique('pot_unique', '1n')]
  },
  'twin_enhancement_flamenox_frostshock': { 
    id: 'twin_enhancement_flamenox_frostshock', sid: '44', name: 'Flamenox Seal & Frostshock Seal', category: 'enhancement', gameplayCategory: 'Elemental', isTwin: true, twinSource1: 'enhancement_flamenox', twinSource2: 'enhancement_frostshock',
    uniqueEnchants: [createUnique('flame_unique', '1r'), createUnique('frost_unique', '1t')]
  },
  'twin_enhancement_rootguard_vine': { 
    id: 'twin_enhancement_rootguard_vine', sid: '45', name: 'Rootguard & Vine Bind', category: 'enhancement', gameplayCategory: 'Plants', isTwin: true, twinSource1: 'enhancement_rootguard', twinSource2: 'enhancement_vine',
    uniqueEnchants: [createUnique('root_unique', '1v'), createUnique('vine_unique', '1x')]
  },
  'twin_ability_circle_ring': { 
    id: 'twin_ability_circle_ring', sid: '46', name: 'Circle & Ring of Agony', category: 'ability', gameplayCategory: 'Circles', isTwin: true, twinSource1: 'ability_circle', twinSource2: 'ability_ring',
    uniqueEnchants: [createUnique('circle_abi_unique', '1z'), createUnique('ring_abi_unique', '21')]
  },
  'twin_ability_sword_strike': { 
    id: 'twin_ability_sword_strike', sid: '47', name: 'Sword of Time & Strike Potion', category: 'ability', gameplayCategory: 'Sword Strikes', isTwin: true, twinSource1: 'ability_sword_time', twinSource2: 'ability_strike_potion',
    uniqueEnchants: [createUnique('sword_abi_unique', '23'), createUnique('strike_abi_unique', '25')]
  },
  'twin_ability_melee_healing': { 
    id: 'twin_ability_melee_healing', sid: '48', name: 'Melee Sprite & Healing Sprite', category: 'ability', gameplayCategory: 'Sprites', isTwin: true, twinSource1: 'ability_melee', twinSource2: 'ability_healing',
    uniqueEnchants: [createUnique('melee_abi_unique', '27'), createUnique('heal_abi_unique', '29')]
  },
  'twin_ability_star': { 
    id: 'twin_ability_star', sid: '49', name: 'Star of Time & Star of Fury', category: 'ability', gameplayCategory: 'Meteors', isTwin: true, twinSource1: 'ability_star_time', twinSource2: 'ability_star_fury',
    uniqueEnchants: [createUnique('star_abi_unique', '2d'), createUnique('fury_abi_unique', '2f')]
  },
  'twin_ability_elemental': { 
    id: 'twin_ability_elemental', sid: '4a', name: 'Flamenox Touch & Frostshock Touch', category: 'ability', gameplayCategory: 'Elemental', isTwin: true, twinSource1: 'ability_flamenox', twinSource2: 'ability_frostshock',
    uniqueEnchants: [createUnique('flame_abi_unique', '2h'), createUnique('frost_abi_unique', '2j')]
  },
  'twin_ability_plants': { 
    id: 'twin_ability_plants', sid: '4b', name: 'Plant Summon & Equinox Bloom', category: 'ability', gameplayCategory: 'Plants', isTwin: true, twinSource1: 'ability_plant_summon', twinSource2: 'ability_equinox_bloom',
    uniqueEnchants: [createUnique('plant_abi_unique', '2l'), createUnique('bloom_abi_unique', '2n')]
  }
};

  /* Twin Etched Runes (Disabled)
  RUNE_DATABASE['twin_etched_arrow_echo'] = { id: 'twin_etched_arrow_echo', sid: '4c', name: 'Arrow of Echoes & Echo Scythe', category: 'etched', gameplayCategory: 'Main Weapon', isTwin: true, twinSource1: 'etched_arrow_of_echoes', twinSource2: 'etched_echo_scythe' };
  RUNE_DATABASE['twin_etched_orb'] = { id: 'twin_etched_orb', sid: '4d', name: 'Pulsing Orb & Orbital Orb', category: 'etched', gameplayCategory: 'Circles', isTwin: true, twinSource1: 'etched_pulsing_orb', twinSource2: 'etched_orbital_orb' };
  RUNE_DATABASE['twin_etched_elemental'] = { id: 'twin_etched_elemental', sid: '4e', name: 'Elemental Domain & Elemental Crit', category: 'etched', gameplayCategory: 'Elemental', isTwin: true, twinSource1: 'etched_elemental_domain', twinSource2: 'etched_elemental_crit' };
  RUNE_DATABASE['twin_etched_sprite'] = { id: 'twin_etched_sprite', sid: '4f', name: 'Sprites Awe & Sprite Assist', category: 'etched', gameplayCategory: 'Sprites', isTwin: true, twinSource1: 'etched_sprite_awe', twinSource2: 'etched_sprite_assist' };
  RUNE_DATABASE['twin_etched_sword'] = { id: 'twin_etched_sword', sid: '4g', name: 'Sword Strike Split & Swordstrike Aerie', category: 'etched', gameplayCategory: 'Sword Strikes', isTwin: true, twinSource1: 'etched_sword_strike_split', twinSource2: 'etched_swordstrike_aerie' };
  RUNE_DATABASE['twin_etched_meteor'] = { id: 'twin_etched_meteor', sid: '4h', name: 'Meteor Split & Potion Spring', category: 'etched', gameplayCategory: 'Meteors', isTwin: true, twinSource1: 'etched_meteor_split', twinSource2: 'etched_potion_spring' };
  */


export const WEAPON_SKIN_DATABASE: Record<string, WeaponSkin> = {
  'eldritch_tower': { id: 'eldritch_tower', sid: '3f', name: 'Eldritch Tower', weaponId: 'oracle_weapon', rarity: 'legendary' },
  'goldwish_cudgel': { id: 'goldwish_cudgel', sid: '3g', name: 'Goldwish Cudgel', weaponId: 'oracle_weapon', rarity: 'legendary' },
  'shackling_sunlance': { id: 'shackling_sunlance', sid: '3h', name: 'Shackling Sunlance', weaponId: 'oracle_weapon', rarity: 'epic' },
  'star_of_christmas': { id: 'star_of_christmas', sid: '3i', name: 'Star of Christmas', weaponId: 'oracle_weapon', rarity: 'legendary' },
  'cosmic_hoop': { id: 'cosmic_hoop', sid: '3j', name: 'Cosmic Hoop', weaponId: 'griffin_weapon', rarity: 'legendary' },
  'holly_blitz': { id: 'holly_blitz', sid: '3k', name: 'Holly Blitz', weaponId: 'griffin_weapon', rarity: 'legendary' },
  'monarchs_fang': { id: 'monarchs_fang', sid: '3l', name: 'Monarchs Fang', weaponId: 'griffin_weapon', rarity: 'legendary' },
  'shadesteal_claw': { id: 'shadesteal_claw', sid: '3m', name: 'Shadesteal Claw', weaponId: 'griffin_weapon', rarity: 'epic' },
  'gigawyrms_roar': { id: 'gigawyrms_roar', sid: '3n', name: 'Gigawyrms Roar', weaponId: 'dragoon_weapon', rarity: 'legendary' },
  'quetzal_whisper': { id: 'quetzal_whisper', sid: '3o', name: 'Quetzal Whisper', weaponId: 'dragoon_weapon', rarity: 'epic' },
  'sleighbound_voyage': { id: 'sleighbound_voyage', sid: '3p', name: 'Sleighbound Voyage', weaponId: 'dragoon_weapon', rarity: 'legendary' },
  'sunpiercer_bow': { id: 'sunpiercer_bow', sid: '3q', name: 'Sunpiercer Bow', weaponId: 'dragoon_weapon', rarity: 'legendary' },
  'bean_staff': { id: 'bean_staff', sid: '3r', name: 'Bean Staff', weaponId: 'echo_weapon', rarity: 'rare' },
  'agile_knuckles_rozen': { id: 'agile_knuckles_rozen', sid: '3s', name: 'Agile Knuckles - Rozen', weaponId: 'decisiveness_weapon', rarity: 'rare' },
  'heroic_longbow_twilight': { id: 'heroic_longbow_twilight', sid: '3t', name: 'Heroic Longbow - Twilight', weaponId: 'destruction_weapon', rarity: 'rare' },
};

export const SKIN_DATABASE: Record<string, Skin> = {
  'mallex': { id: 'mallex', sid: '11', name: 'Mallex', characterId: 'alex' },
  'nian_slayer_bliss': { id: 'nian_slayer_bliss', sid: '12', name: 'Nian Slayer - Bliss', characterId: 'alex' },
  'nian_slayer_luck': { id: 'nian_slayer_luck', sid: '13', name: 'Nian Slayer - Luck', characterId: 'nyanja' },
  'shinobill': { id: 'shinobill', sid: '14', name: 'Shinobill', characterId: 'nyanja' },
  'harelix': { id: 'harelix', sid: '15', name: 'Harelix', characterId: 'helix' },
  'nian_slayer_joy': { id: 'nian_slayer_joy', sid: '16', name: 'Nian Slayer - Joy', characterId: 'helix' },
  'ducklix': { id: 'ducklix', sid: '17', name: 'Ducklix', characterId: 'helix' },
  'reindeer_plush': { id: 'reindeer_plush', sid: '18', name: 'Reindeer Plush', characterId: 'hela' },
  'life_essence': { id: 'life_essence', sid: '19', name: 'Life_Essence', characterId: 'hela' },
  'empowered_curse': { id: 'empowered_curse', sid: '1a', name: 'Empowered Curse', characterId: 'mymu' },
  'verdant_gold_archer': { id: 'verdant_gold_archer', sid: '1b', name: 'Verdant Gold Archer', characterId: 'houyi' },
  'seraduckus': { id: 'seraduckus', sid: '1c', name: 'Seraduckus', characterId: 'seraph' },
  'golden_velvet_carol': { id: 'golden_velvet_carol', sid: '1d', name: 'Golden Velvet Carol', characterId: 'seraph' },
  'nian_slayer_prosperity': { id: 'nian_slayer_prosperity', sid: '1e', name: 'Nian Slayer - Prosperity', characterId: 'seraph' },
  'nian_slayer_longevity': { id: 'nian_slayer_longevity', sid: '1f', name: 'Nian Slayer - Longevity', characterId: 'dracoola' },
  'duckoola': { id: 'duckoola', sid: '1g', name: 'Duckoola', characterId: 'dracoola' },
  'waddla': { id: 'waddla', sid: '1h', name: 'Waddla', characterId: 'rolla' },
  'gingerbread_tale': { id: 'gingerbread_tale', sid: '1i', name: 'Gingerbread Tale', characterId: 'rolla' },
  'ice_diva': { id: 'ice_diva', sid: '1j', name: 'Ice Diva', characterId: 'rolla' },
  'illusion_essence': { id: 'illusion_essence', sid: '1k', name: 'Illusion Essence', characterId: 'loki' },
  'scarlet_sandstorm': { id: 'scarlet_sandstorm', sid: '1l', name: 'Scarlet Sandstorm', characterId: 'phynx' },
  'urban_edge': { id: 'urban_edge', sid: '1m', name: 'Urban Edge', characterId: 'nezha' },
  'violet_lotus_pulse': { id: 'violet_lotus_pulse', sid: '1n', name: 'Violet Lotus Pulse', characterId: 'nezha' },
  'nian_slayer_fortune': { id: 'nian_slayer_fortune', sid: '1o', name: 'Nian Slayer - Fortune', characterId: 'otta' },
  'quackka': { id: 'quackka', sid: '1p', name: 'Quackka', characterId: 'otta' },
  'abyssal_guide': { id: 'abyssal_guide', sid: '1q', name: 'Abyssal Guide', characterId: 'atreus' },
  'demon_ducklord': { id: 'demon_ducklord', sid: '1r', name: 'Demon Ducklord', characterId: 'atreus' },
  'lightning_essence': { id: 'lightning_essence', sid: '1s', name: 'Lightning Essence', characterId: 'thor' },
  'waxwane_judgement': { id: 'waxwane_judgement', sid: '1t', name: 'Waxwane Judgement', characterId: 'thor' },
  'fiery_reckoning': { id: 'fiery_reckoning', sid: '1u', name: 'Fiery Reckoning', characterId: 'cleo' },
  'eternal_nightglow': { id: 'eternal_nightglow', sid: '1v', name: 'Eternal Nightglow', characterId: 'cleo' },
  'conqueror_of_battles': { id: 'conqueror_of_battles', sid: '1w', name: 'Conqueror Of Battles', characterId: 'wukong' },
  'awakened_stone_monkey': { id: 'awakened_stone_monkey', sid: '1x', name: 'Awakened Stone Monkey', characterId: 'wukong' },
  'wrath_of_the_earth': { id: 'wrath_of_the_earth', sid: '1y', name: 'Wrath of the Earth', characterId: 'demeter' },
  'eclipse_hunt_order': { id: 'eclipse_hunt_order', sid: '1z', name: 'Eclipse Hunt Order', characterId: 'artemis' },
};

export const CHARACTER_DATABASE: Record<string, Character> = {
  'alex': { id: 'alex', sid: '00', name: 'Alex', skins: ['base', 'mallex', 'nian_slayer_bliss'] },
  'nyanja': { id: 'nyanja', sid: '01', name: 'Nyanja', skins: ['base', 'nian_slayer_luck', 'shinobill'] },
  'helix': { id: 'helix', sid: '02', name: 'Helix', skins: ['base', 'harelix', 'nian_slayer_joy', 'ducklix'] },
  'hela': { id: 'hela', sid: '03', name: 'Hela', skins: ['base', 'reindeer_plush', 'life_essence'] },
  'mymu': { id: 'mymu', sid: '04', name: 'Mymu', skins: ['base', 'empowered_curse'] },
  'houyi': { id: 'houyi', sid: '05', name: 'Hou Yi', skins: ['base', 'verdant_gold_archer'] },
  'seraph': { id: 'seraph', sid: '06', name: 'Seraph', skins: ['base', 'seraduckus', 'golden_velvet_carol', 'nian_slayer_prosperity'] },
  'dracoola': { id: 'dracoola', sid: '07', name: 'Dracoola', skins: ['base', 'nian_slayer_longevity', 'duckoola'] },
  'rolla': { id: 'rolla', sid: '08', name: 'Rolla', skins: ['base', 'waddla', 'gingerbread_tale', 'ice_diva'] },
  'loki': { id: 'loki', sid: '09', name: 'Loki', skins: ['base', 'illusion_essence'] },
  'phynx': { id: 'phynx', sid: '0a', name: 'Phynx', skins: ['base', 'scarlet_sandstorm'] },
  'nezha': { id: 'nezha', sid: '0b', name: 'Nezha', skins: ['base', 'urban_edge', 'violet_lotus_pulse'] },
  'otta': { id: 'otta', sid: '0c', name: 'Otta', skins: ['base', 'nian_slayer_fortune', 'quackka'] },
  'atreus': { id: 'atreus', sid: '0d', name: 'Demon King Atreus', skins: ['base', 'abyssal_guide', 'demon_ducklord'] },
  'thor': { id: 'thor', sid: '0e', name: 'Thor', skins: ['base', 'lightning_essence', 'waxwane_judgement'] },
  'cleo': { id: 'cleo', sid: '0f', name: 'Cleo', skins: ['base', 'fiery_reckoning', 'eternal_nightglow'] },
  'wukong': { id: 'wukong', sid: '10', name: 'Wukong', skins: ['base', 'conqueror_of_battles', 'awakened_stone_monkey'] },
  'demeter': { id: 'demeter', sid: '11', name: 'Demeter', skins: ['base', 'wrath_of_the_earth'] },
  'artemis': { id: 'artemis', sid: '12', name: 'Artemis', skins: ['base', 'eclipse_hunt_order'] },
};

export interface FeaturedBuild {
  name: string;
  code: string;
}

export const FEATURED_BUILDS: FeaturedBuild[] = [
  {
    name: "Pokoko's Elemental PvE Rune setup",
    code: "B2~BNElemental%20PvE%20Rune%20Setup~BAPokoko~MC0000~E01o6~E11s6~E21q6~E31u5~A02a6~A1206~L02y6~L12s6~T0326~T13b3~T23e2~CS10rk"
  },
  {
    name: "Basic Dragoon",
    code: "B2~BNBasic%20Dragoon~BAWelpy13~MC0261170~R10f011u0~R20c211o0~GW0cf40~GA0df4~GR0ef4~GH0ff4~GM0gf4~GB0hf4~E01q611a~E11s611a~E21k61la~E31m60ta~A02g612a~A12i612a~A22e62fa~A32c60ua~L02y60fa~L12w60fa~T0376~T13b6~T23a6~CS1bui"
  },
  {
    name: "Griffin + Oracle Elemental Build",
    code: "B2~BNGriffin%20%2B%20Oracle%20Elemental%20Build~BAWelpy13~MC0a811l0~R10f511u0~R20e50~GW00f50~GA07f4~GR08f4~GH03f4~GM04f4~GB0bf4~E01q611a~E11s611a~E21g6~E31o60xa~A020621a~A12g612a~A22i612a~A3286~L02y60fa~L12w60fa~T0326~T13b6~T2356~CS1328"
  },
  {
    name: "Adrias' v2 PvP Build",
    code: "B2~BNAdrias%20V2%20PvP%20Build~BAAdrias~MC0c611p0~R10e50~R20f511u0~GW00f513f0~GA07f4~GR08f4~GH03f4~GM04f4~GB0bf4~E01oa0wa~E11qa11a~E21sa11a~E3zaa03a~A02aa2ba~A12ga12a~A22ia12a~A320a21a~L02ya0fa~L12wa0fa~T032a~T13ba~T234a~CSqdd"
  }
];
