import { describe, it, expect } from 'vitest';
import { loadoutReducer, LoadoutAction, initialState } from './loadoutReducer';
import type { GearItem, RuneItem } from '../types';

describe('loadoutReducer', () => {
  it('should set character id', () => {
    const action: LoadoutAction = { type: 'SET_CHARACTER', payload: 'phoren' };
    const state = loadoutReducer(initialState, action);
    expect(state.character.id).toBe('phoren');
    expect(state.character.activeSkins).toEqual([]);
  });

  it('should set gear in a valid slot', () => {
    const gear: GearItem = { id: 'oracle_weapon', name: 'Oracle Spear', type: 'weapon', set: 'oracle', rarity: 'epic', isSTier: true };
    const action: LoadoutAction = { 
      type: 'SET_GEAR', 
      payload: { slot: 'weapon', item: gear } 
    };
    const state = loadoutReducer(initialState, action);
    expect(state.gear.weapon).toEqual(gear);
  });

  it('should set a rune at a specific index', () => {
    const rune: RuneItem = { id: 'enhancement_dragonflight', name: 'Dragonflight', category: 'enhancement', rarity: 'rare' };
    const action: LoadoutAction = { 
      type: 'SET_RUNE', 
      payload: { category: 'enhancement', index: 2, item: rune } 
    };
    const state = loadoutReducer(initialState, action);
    expect(state.runes.enhancement[2].item).toEqual(rune);
    expect(state.runes.enhancement[0].item).toBeUndefined();
  });
});
