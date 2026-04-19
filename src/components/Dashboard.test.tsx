import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { Dashboard } from './Dashboard';
import { LoadoutProvider } from '../state/LoadoutContext';

describe('Dashboard', () => {
  it('switches tabs correctly', () => {
    render(
      <LoadoutProvider>
        <Dashboard />
      </LoadoutProvider>
    );

    // Initial tab should be gear
    expect(screen.getByText('Gear').closest('button')).toHaveClass('scale-y-110');
    
    // Switch to Runes
    fireEvent.click(screen.getByText('Runes'));
    expect(screen.getByText('Runes').closest('button')).toHaveClass('scale-y-110');
    expect(screen.getByAltText('Rune Background')).toBeInTheDocument();
  });

  it('opens character selection modal', () => {
    render(
      <LoadoutProvider>
        <Dashboard />
      </LoadoutProvider>
    );

    // Click on the character (Atreus is default)
    const atreusImg = screen.getByAltText('atreus');
    fireEvent.click(atreusImg.closest('button')!);

    // Selection Modal should be open
    expect(screen.getByText(/Select Character/i)).toBeInTheDocument();
  });

  it('renders all gear slots', () => {
    render(
      <LoadoutProvider>
        <Dashboard />
      </LoadoutProvider>
    );

    expect(screen.getByAltText('Weapon')).toBeInTheDocument();
    expect(screen.getByAltText('Amulet')).toBeInTheDocument();
    expect(screen.getByAltText('Ring')).toBeInTheDocument();
    expect(screen.getByAltText('Helmet')).toBeInTheDocument();
    expect(screen.getByAltText('Armor')).toBeInTheDocument();
    expect(screen.getByAltText('Boots')).toBeInTheDocument();
  });
});
