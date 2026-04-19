import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import ModalPopup from '../components/ModalPopup';

describe('ModalPopup', () => {
  it('renders children when open', () => {
    render(
      <ModalPopup isOpen={true} onClose={() => {}} title="Test Title">
        <div>Test Content</div>
      </ModalPopup>
    );
    expect(screen.getByText('Test Content')).toBeInTheDocument();
    expect(screen.getByText('Test Title')).toBeInTheDocument();
  });

  it('does not render when closed', () => {
    render(
      <ModalPopup isOpen={false} onClose={() => {}} title="Test Title">
        <div>Test Content</div>
      </ModalPopup>
    );
    expect(screen.queryByText('Test Content')).not.toBeInTheDocument();
  });

  it('calls onClose when close button is clicked', () => {
    const onClose = vi.fn();
    render(
      <ModalPopup isOpen={true} onClose={onClose} title="Test Title">
        <div>Test Content</div>
      </ModalPopup>
    );
    
    // Btn_Close_Pop.png should have an alt text or be a button
    const closeButton = screen.getByRole('button', { name: /close/i });
    fireEvent.click(closeButton);
    expect(onClose).toHaveBeenCalledTimes(1);
  });
});
