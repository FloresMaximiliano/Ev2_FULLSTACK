import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import Footer from './Footer';

describe('Componente Footer', () => {
  it('Muestra el encabezado sobre nosotros y el copyright', () => {
    render(<Footer />);

    expect(screen.getByRole('heading', { level: 2, name: /Sobre Nosotros/i })).toBeInTheDocument();
    expect(screen.getByText(/© 2026 TextilChile/i)).toBeInTheDocument();
  });
});