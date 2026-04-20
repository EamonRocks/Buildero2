import { describe, it, expect } from 'vitest';
import { exportLoadout, importLoadout } from './serialization';
import { initialState } from './loadoutReducer';
import type { Loadout } from '../types';

describe('Loadout Serialization', () => {
  const mockLoadout: Loadout = {
    ...initialState,
    character: {
      id: 'helix',
      stars: 4,
      activeSkins: [{ id: 'ducklix', stars: 2 }]
    },
    resonances: [
      { id: 'alex', stars: 3, activeSkins: [{ id: 'mallex', stars: 1 }] },
      undefined
    ],
    gear: {
      weapon: { id: 'oracle_weapon', name: 'Oracle Spear', type: 'weapon', set: 'oracle', rarity: 'mythic', isSTier: true, godforgeLevel: 5, activeSkins: [{ id: 'goldwish_cudgel', stars: 1 }] },
      armor: { id: 'oracle_armor', name: 'Oracle Armor', type: 'armor', set: 'oracle', rarity: 'legendary', isSTier: true }
    },
    runes: {
      ...initialState.runes,
      enhancement: [
        { item: { id: 'enhancement_dragonflight', name: 'Dragonflight', category: 'enhancement', rarity: 'mythic' }, enchantId: 'crit_rate', enchantRarity: 'mythic' },
        {}, {}, {}
      ]
    }
  };

  it('should export a non-empty string', () => {
    const code = exportLoadout(mockLoadout);
    expect(typeof code).toBe('string');
    expect(code.length).toBeGreaterThan(0);
  });

  it('should maintain state integrity through export/import cycle', () => {
    const code = exportLoadout(mockLoadout);
    const imported = importLoadout(code);
    
    // Check core fields
    expect(imported.character.id).toBe(mockLoadout.character.id);
    expect(imported.character.stars).toBe(mockLoadout.character.stars);
    expect(imported.character.activeSkins).toEqual(mockLoadout.character.activeSkins);
    
    // Check Resonances (including skins)
    expect(imported.resonances[0]?.id).toBe(mockLoadout.resonances[0]?.id);
    expect(imported.resonances[0]?.stars).toBe(mockLoadout.resonances[0]?.stars);
    expect(imported.resonances[0]?.activeSkins).toEqual(mockLoadout.resonances[0]?.activeSkins);
    
    expect(imported.gear.weapon?.id).toBe(mockLoadout.gear.weapon?.id);
    expect(imported.gear.weapon?.rarity).toBe(mockLoadout.gear.weapon?.rarity);
    expect(imported.gear.weapon?.godforgeLevel).toBe(5);
    expect(imported.gear.weapon?.activeSkins).toEqual(mockLoadout.gear.weapon?.activeSkins);
    
    expect(imported.runes.enhancement[0].item?.id).toBe(mockLoadout.runes.enhancement[0].item?.id);
    expect(imported.runes.enhancement[0].enchantId).toBe(mockLoadout.runes.enhancement[0].enchantId);
  });

  it('should handle legacy versions or invalid codes gracefully', () => {
    // Empty string should return initial state
    expect(importLoadout('')).toEqual(initialState);
    
    // Garbage string should return initial state
    expect(importLoadout('invalid-code')).toEqual(initialState);
  });
});
