import { useEffect } from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { SelectionModal } from './SelectionModal';
import { LoadoutProvider, useLoadout } from '../state/LoadoutContext';

describe('SelectionModal', () => {
  it('renders nothing when closed', () => {
    const { container } = render(
      <LoadoutProvider>
        <SelectionModal isOpen={false} type="character" targetId="character" onClose={() => {}} onSelect={() => {}} />
      </LoadoutProvider>
    );
    expect(container.firstChild).toBeNull();
  });

  it('renders correctly when open', () => {
    render(
      <LoadoutProvider>
        <SelectionModal isOpen={true} type="character" targetId="character" onClose={() => {}} onSelect={() => {}} />
      </LoadoutProvider>
    );
    expect(screen.getByText(/Select Character/i)).toBeInTheDocument();
  });

  it('calls onClose when close button clicked', () => {
    const handleClose = vi.fn();
    render(
      <LoadoutProvider>
        <SelectionModal isOpen={true} type="character" targetId="character" onClose={handleClose} onSelect={() => {}} />
      </LoadoutProvider>
    );
    
    // The close button has the aria-label "Close"
    const closeBtn = screen.getByLabelText('Close');
    fireEvent.click(closeBtn);
    expect(handleClose).toHaveBeenCalled();
  });

  it('pre-selects the second enchantment when enchantSlotIndex is 1', () => {
    const TestComponent = () => {
      const { state, dispatch } = useLoadout();
      useEffect(() => {
        dispatch({
          type: 'SET_RUNE',
          payload: {
            category: 'enhancement',
            index: 0,
            item: {
              id: 'twin_enhancement_sawblade_spin',
              sid: '40',
              name: 'Sawblade Circle & Spin SPD Up',
              category: 'enhancement',
              gameplayCategory: 'Circles',
              isTwin: true,
              twinSource1: 'enhancement_sawblade',
              twinSource2: 'enhancement_spin',
              rarity: 'legendary_2'
            }
          }
        });
        dispatch({
          type: 'SET_RUNE_ENCHANT',
          payload: {
            category: 'enhancement',
            index: 0,
            enchantId: 'saw_unique',
            rarity: 'legendary',
            slotIndex: 0
          }
        });
        dispatch({
          type: 'SET_RUNE_ENCHANT',
          payload: {
            category: 'enhancement',
            index: 0,
            enchantId: 'spin_unique',
            rarity: 'mythic',
            slotIndex: 1
          }
        });
      }, []);

      const hasRune = !!state.runes.enhancement[0]?.item;
      if (!hasRune) return null;

      return (
        <SelectionModal
          isOpen={true}
          type="enchant"
          targetId="enhancement"
          runeCategory="enhancement"
          runeIndex={0}
          enchantPool={[
            { id: 'saw_unique', sid: '19', name: 'Saw Unique', availableRarities: ['legendary', 'mythic'] },
            { id: 'spin_unique', sid: '1b', name: 'Spin Unique', availableRarities: ['legendary', 'mythic'] }
          ]}
          enchantSlotIndex={1}
          onClose={() => {}}
          onSelect={() => {}}
        />
      );
    };

    render(
      <LoadoutProvider>
        <TestComponent />
      </LoadoutProvider>
    );

    // Verify that "Spin Unique" is selected/highlighted
    const option = screen.getByText('Spin Unique').closest('button');
    expect(option).toHaveClass('border-[#4a3424]');
  });
});
