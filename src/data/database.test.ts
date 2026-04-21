import { describe, it, expect } from 'vitest';
import { 
  GEAR_DATABASE, 
  RUNE_DATABASE, 
  CHARACTER_DATABASE, 
  SKIN_DATABASE, 
  WEAPON_SKIN_DATABASE,
  COMMON_ENCHANTS,
  CATEGORY_ENCHANTS
} from './database';
import type { Enchantment } from '../types';

describe('Database SID Integrity', () => {
  it('should have unique SIDs for all Gear items', () => {
    const sids = Object.values(GEAR_DATABASE).map(i => i.sid);
    const uniqueSids = new Set(sids);
    expect(uniqueSids.size).toBe(sids.length);
  });

  it('should have unique SIDs for all Character related items (Chars + Skins + Weapon Skins)', () => {
    const charSids = Object.values(CHARACTER_DATABASE).map(i => i.sid);
    const skinSids = Object.values(SKIN_DATABASE).map(i => i.sid);
    const weaponSkinSids = Object.values(WEAPON_SKIN_DATABASE).map(i => i.sid);
    
    const allSids = [...charSids, ...skinSids, ...weaponSkinSids];
    const uniqueSids = new Set(allSids);
    
    expect(uniqueSids.size).toBe(allSids.length);
  });

  it('should have unique SIDs for all Rune related items (Runes + Enchants)', () => {
    const runeSids = Object.values(RUNE_DATABASE).map(i => i.sid);
    
    const allEnchants: Enchantment[] = [
      ...Object.values(COMMON_ENCHANTS).flat(),
      ...Object.values(CATEGORY_ENCHANTS).flatMap(c => [...c.enhancement, ...c.ability]),
      ...(Object.values(RUNE_DATABASE).map(r => r.uniqueEnchant).filter(Boolean) as Enchantment[])
    ];
    const enchantSids = allEnchants.map(e => e.sid);
    
    const allSids = [...runeSids, ...enchantSids];
    const uniqueSids = new Set(allSids);
    
    expect(uniqueSids.size).toBe(allSids.length);
  });
});
