import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { describe, it, expect } from 'vitest';
import Navbar from './Navbar';

describe('Componente Navbar', () => {
  it('Renders el nombre de la empresa y los 4 enlaces de navegación', () => {
    render(
      <MemoryRouter>
        <Navbar />
      </MemoryRouter>
    );

    expect(screen.getByText('TextilChile')).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /Inicio/i })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /Técnico/i })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /Supervisor/i })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /Ayuda/i })).toBeInTheDocument();
  });
});