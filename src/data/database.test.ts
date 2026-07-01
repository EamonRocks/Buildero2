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

  it('should have unique SIDs for each Character database (Chars, Skins, Weapon Skins individually)', () => {
    const charSids = Object.values(CHARACTER_DATABASE).map(i => i.sid);
    const skinSids = Object.values(SKIN_DATABASE).map(i => i.sid);
    const weaponSkinSids = Object.values(WEAPON_SKIN_DATABASE).map(i => i.sid);
    
    expect(new Set(charSids).size).toBe(charSids.length);
    expect(new Set(skinSids).size).toBe(skinSids.length);
    expect(new Set(weaponSkinSids).size).toBe(weaponSkinSids.length);
  });

  it('should have unique SIDs for all Rune related items (Runes + Enchants + Twin Uniques)', () => {
    const runeSids = Object.values(RUNE_DATABASE).map(i => i.sid);
    
    const allEnchants: Enchantment[] = [
      ...Object.values(COMMON_ENCHANTS).flat(),
      ...Object.values(CATEGORY_ENCHANTS).flatMap(c => [...c.enhancement, ...c.ability]),
      ...(Object.values(RUNE_DATABASE).map(r => r.uniqueEnchant).filter(Boolean) as Enchantment[]),
      ...(Object.values(RUNE_DATABASE).flatMap(r => r.uniqueEnchants || []))
    ];
    
    // De-duplicate enchants by ID
    const uniqueEnchantsMap = new Map<string, Enchantment>();
    allEnchants.forEach(e => uniqueEnchantsMap.set(e.id, e));
    const distinctEnchants = Array.from(uniqueEnchantsMap.values());
    
    const enchantSids = distinctEnchants.map(e => e.sid);
    
    const allSids = [...runeSids, ...enchantSids];
    const uniqueSids = new Set(allSids);
    
    expect(uniqueSids.size).toBe(allSids.length);
  });
});
