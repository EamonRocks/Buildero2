import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { GearItem } from './GearItem';
import type { GearItem as GearItemType } from '../types';

describe('GearItem', () => {
  const mockItem: GearItemType = {
    id: 'oracle_weapon',
    name: 'Oracle Sword',
    type: 'weapon',
    set: 'oracle',
    rarity: 'epic',
    isSTier: true,
  };

  it('renders the gear icon and frame', () => {
    render(<GearItem item={mockItem} />);
    
    const gearIcon = screen.getByAltText(/Oracle Sword/i);
    expect(gearIcon).toBeInTheDocument();
    expect(gearIcon).toHaveAttribute('src', '/assets/gear/oracle_weapon.png');

    const frame = screen.getByAltText(/epic/i);
    expect(frame).toBeInTheDocument();
    expect(frame).toHaveAttribute('src', '/assets/frames/gear/frame_epic.png');
  });

  it('renders the S-Tier badge when applicable', () => {
    render(<GearItem item={mockItem} />);
    const sTierBadge = screen.getByAltText(/S-Tier/i);
    expect(sTierBadge).toBeInTheDocument();
  });

  it('does not render the S-Tier badge when not S-Tier', () => {
    const nonSTierItem = { ...mockItem, isSTier: false };
    render(<GearItem item={nonSTierItem} />);
    expect(screen.queryByAltText(/S-Tier/i)).not.toBeInTheDocument();
  });
});
