import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import Tecnico from './Tecnico';

describe('Componente Tecnico', () => {
  it('Carga dinámicamente los parámetros al seleccionar un producto', () => {
    render(<Tecnico />);

    // Usamos la cadena exacta 'Producto:' para que no coincida con 'Estado del producto:'
    const selectProducto = screen.getByLabelText('Producto:');

    // Seleccionar el producto PR001
    fireEvent.change(selectProducto, { target: { value: 'PR001' } });

    // Verificar que los campos específicos de PR001 aparecen
    expect(screen.getByText(/Gramaje/i)).toBeInTheDocument();
    expect(screen.getByText(/Resistencia al Rasgado/i)).toBeInTheDocument();
  });
});