import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import Supervisor from './Supervisor';

describe('Componente Supervisor', () => {
  it('Muestra un error si el código del lote no inicia con LOT-', () => {
    render(<Supervisor />);

    const inputLote = screen.getByLabelText(/Código del lote:/i);
    const botonBuscar = screen.getByRole('button', { name: /Buscar lote/i });

    
    fireEvent.change(inputLote, { target: { value: '12345' } });
    fireEvent.click(botonBuscar);

    
    expect(screen.getByText('El código debe comenzar con LOT-')).toBeInTheDocument();
  });

  it('Muestra los resultados del lote cuando el formulario es válido', () => {
    render(<Supervisor />);

    const inputLote = screen.getByLabelText(/Código del lote:/i);
    const selectLinea = screen.getByLabelText(/Línea de producción:/i);
    const botonBuscar = screen.getByRole('button', { name: /Buscar lote/i });

    
    fireEvent.change(inputLote, { target: { value: 'LOT-001' } });
    fireEvent.change(selectLinea, { target: { value: 'linea1' } });
    fireEvent.click(botonBuscar);

    
    expect(screen.getByText('Resultado del lote')).toBeInTheDocument();
    expect(screen.getByText('LOT-001')).toBeInTheDocument();
  });
});