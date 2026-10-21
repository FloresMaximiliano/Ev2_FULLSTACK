import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import Ayuda from './Ayuda';

describe('Componente Ayuda', () => {
  it('Muestra las secciones de preguntas frecuentes y el contacto de soporte', () => {
    render(<Ayuda />);

    expect(screen.getByText(/Centro de Ayuda y Preguntas Frecuentes/i)).toBeInTheDocument();
    expect(screen.getByText(/1. ¿Cómo realizar una inspección?/i)).toBeInTheDocument();
    expect(screen.getByText('soporte@textilchile.cl')).toBeInTheDocument();
  });
});