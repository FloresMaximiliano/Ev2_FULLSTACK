import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import Reportes from './Reportes';

describe('Modulo Reportes - TextilChile', () => {
  it('renderiza correctamente el titulo de reportes', () => {
    render(<Reportes />);
    expect(screen.getByText(/Dashboard de Calidad y Reportes/i)).toBeInTheDocument();
  });

  it('muestra los indicadores KPI de calidad', () => {
    render(<Reportes />);
    expect(screen.getByText('Lotes Conformes')).toBeInTheDocument();
    expect(screen.getByText('Lotes No Conformes')).toBeInTheDocument();
  });
});