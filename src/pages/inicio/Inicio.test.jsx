import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import Inicio from './Inicio';

describe('Componente Inicio', () => {
  it('Renders correctamente el título de bienvenida', () => {
    render(<Inicio />);

    expect(screen.getByRole('heading', { level: 1, name: /Bienvenido a TextilChile/i })).toBeInTheDocument();
    expect(screen.getByText(/Sistema integral de control de calidad/i)).toBeInTheDocument();
  });
});