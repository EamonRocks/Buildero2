import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { SelectionModal } from './SelectionModal';
import { LoadoutProvider } from '../state/LoadoutContext';

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
});
