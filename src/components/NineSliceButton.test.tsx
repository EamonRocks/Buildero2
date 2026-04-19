import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { NineSliceButton } from './NineSliceButton';

describe('NineSliceButton', () => {
  it('renders children correctly', () => {
    render(<NineSliceButton imageSrc="test.png">Click Me</NineSliceButton>);
    expect(screen.getByText('Click Me')).toBeInTheDocument();
  });

  it('calls onClick when clicked', () => {
    const handleClick = vi.fn();
    render(<NineSliceButton imageSrc="test.png" onClick={handleClick}>Click Me</NineSliceButton>);
    fireEvent.click(screen.getByRole('button'));
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it('applies custom className', () => {
    render(<NineSliceButton imageSrc="test.png" className="custom-class">Click Me</NineSliceButton>);
    expect(screen.getByRole('button')).toHaveClass('custom-class');
  });

  it('sets border-image styles correctly', () => {
    render(<NineSliceButton imageSrc="test.png">Click Me</NineSliceButton>);
    const button = screen.getByRole('button');
    expect(button.style.borderImageSource).toContain('test.png');
  });
});
