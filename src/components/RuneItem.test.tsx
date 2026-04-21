import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { RuneItem } from './RuneItem';
import type { RuneItem as RuneItemType } from '../types';

describe('RuneItem', () => {
  const mockRune: RuneItemType = {
    id: 'enhancement_dragonflight',
    sid: '1c',
    name: 'Dragonflight',
    category: 'enhancement',
    rarity: 'rare'
  };

  it('renders rune image and frame', () => {
    render(<RuneItem item={mockRune} />);
    expect(screen.getByAltText('Dragonflight')).toBeInTheDocument();
    // Frame should be there (can check by src or just that it exists)
    const images = screen.getAllByRole('img');
    expect(images.some(img => (img as HTMLImageElement).src.includes('frame_rare'))).toBe(true);
  });

  it('renders enchantment indicator when present', () => {
    render(<RuneItem item={mockRune} enchantId="crit_rate" enchantRarity="epic" />);
    // Enchantment indicator is a div with background color class
    const enchantIndicator = document.querySelector('.bg-purple-500');
    expect(enchantIndicator).toBeInTheDocument();
  });
});
