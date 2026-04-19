import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { CharacterItem } from './CharacterItem';
import type { CharacterState } from '../types';

describe('CharacterItem', () => {
  const mockCharacter: CharacterState = {
    id: 'alex',
    stars: 3,
    activeSkins: [{ id: 'base', stars: 0 }]
  };

  it('renders character image when provided', () => {
    render(<CharacterItem character={mockCharacter} />);
    expect(screen.getByAltText('alex')).toBeInTheDocument();
  });

  it('renders stars correctly', () => {
    render(<CharacterItem character={mockCharacter} />);
    // There are 8 stars total
    const starImages = screen.getAllByRole('presentation', { hidden: true });
    expect(starImages.length).toBe(8);
  });

  it('calls onMainClick when clicked', () => {
    const handleClick = vi.fn();
    render(<CharacterItem character={mockCharacter} onMainClick={handleClick} />);
    fireEvent.click(screen.getByAltText('alex').closest('button')!);
    expect(handleClick).toHaveBeenCalled();
  });

  it('renders locked state', () => {
    render(<CharacterItem isLocked={true} />);
    // Lock icon is an SVG
    expect(document.querySelector('svg')).toBeInTheDocument();
  });

  it('renders empty state with plus button', () => {
    const handleMainClick = vi.fn();
    render(<CharacterItem onMainClick={handleMainClick} />);
    const plusButton = screen.getByRole('button');
    expect(plusButton).toHaveTextContent('+');
    fireEvent.click(plusButton);
    expect(handleMainClick).toHaveBeenCalled();
  });
});
