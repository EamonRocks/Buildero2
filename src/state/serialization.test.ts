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
      weapon: { id: 'oracle_weapon', sid: '00', name: 'Oracle Spear', type: 'weapon', set: 'oracle', rarity: 'mythic', isSTier: true, godforgeLevel: 5, activeSkins: [{ id: 'goldwish_cudgel', stars: 1 }] },
      armor: { id: 'oracle_armor', sid: '04', name: 'Oracle Armor', type: 'armor', set: 'oracle', rarity: 'legendary', isSTier: true }
    },
    runes: {
      ...initialState.runes,
      enhancement: [
        { item: { id: 'enhancement_dragonflight', sid: '1c', name: 'Dragonflight', category: 'enhancement', rarity: 'mythic' }, enchantId: 'sword_crit_rate_enh', enchantRarity: 'mythic' },
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

  it('should support backwards compatibility for V1 codes', () => {
    const v1Code = "N4IgbiBcCMA0IBMqgHZRABQPYGtdYHIBnAAgFEAbAUxIzDJHgGMoBtEAQwBcAnKgVyKMADLFYBdcfB5sU-ChVhyFUkAHNkAX2n9kIKigAWHFEyoBbA1zbsDx0xasB9IsZ4AHRiGpqDCDjwAnozKiqFStkYmZpYoXE4AZjxYRFyuWEw4Xj5+AcFK8mGFEfpRDrHxCRQcsVgAHtlUvij+QSGFBSpipfYxzslYXGr8AUjwVO4AlkxOAEztCp0UkvAcAEaTFJNcwZCs7Oub24FOAckA7k48HJNo8DkteQtFXQcbWztXtxr3TbltSyWUlCQPga2oRCI3xsIHBVEh3yuVDAkzAVEazVa+RB4W6cIRKDUV3WG0qWEGGP+2I64VUVC4TEMVCQe1sDKZCFOPAuTiwCScVEZWHhlMeAJxxW69MZzIF1AqHAoTiYPG2Xgm02eoLZMs5gsMWBcTECXCZXmufC1tM0NqAA";
    const imported = importLoadout(v1Code);
    
    expect(imported.name).toBe("Pokoko's Ele PvE");
    expect(imported.character.id).toBe('atreus');
    expect(imported.runes.ability[0].item?.id).toBe('ability_arrow_rain');
  });

  it('should support backwards compatibility for Dragoon build', () => {
    const dragoonCode = "N4IgbiBcCMA0IBMqgHZRABQPZYE4AIBbAQxQHIBnfAEV2IHMcV8MwBRfAcQFNiCAjAK4BLADZJ4AYygBtEAAtuo4QA8QsAGywZAXR3xcsuQBd5edQAZte7SFxZRo4pes2Q9ZCADuvAA5Y0SDkEOkYAgH0fYn80eEIAT1NhaVgAM2JRCm5tOQBHQW5jAC8MyPlhCl9uQ1gLPX0QYkJBUULZEG5JM3Cmlrb4VvpuFAQ+ePCAZnV0zOzdBtxhFA8gxFCmcMXl9RAEpJSZrNd4RVFCNtWQhg3T8+MdvfKDjKP5+D5Cc1XO7o-zAe4QxGY0m0xeczc-Bwxgo7SuYRQ4ShWBhD0STzBs1cAF8DIJPMN5KRJNxzih7kEUC1RLAqY5adSGY4GsR+GJhMZ4rI6TSeUzedSGvxWhQKEsVjI+TyGoUutwkJTGVLBdjVUA";
    const imported = importLoadout(dragoonCode);
    
    expect(imported.name).toBe("Poor man's Dragoon PvE Gear build");
    expect(imported.gear.weapon?.id).toBe('dragoon_weapon');
    expect(imported.gear.weapon?.rarity).toBe('mythic');
  });
});
