import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import ModalSubsection from '../components/ModalSubsection';

describe('ModalSubsection', () => {
  it('renders children', () => {
    render(
      <ModalSubsection>
        <div>Subsection Content</div>
      </ModalSubsection>
    );
    expect(screen.getByText('Subsection Content')).toBeInTheDocument();
  });
});
