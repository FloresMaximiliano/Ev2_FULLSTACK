import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import App from './App';

describe('Integración de Enrutamiento en App', () => {
  it('Navega correctamente entre las diferentes páginas al hacer clic en el Navbar', () => {
    render(<App />);

    // Verificar que inicia en la página de inicio
    expect(screen.getByRole('heading', { level: 1, name: /Bienvenido a TextilChile/i })).toBeInTheDocument();

    // Navegar a Técnico
    fireEvent.click(screen.getByRole('link', { name: /Técnico/i }));
    expect(screen.getByRole('heading', { name: /Inspección de Producto/i })).toBeInTheDocument();

    // Navegar a Ayuda
    fireEvent.click(screen.getByRole('link', { name: /Ayuda/i }));
    expect(screen.getByText(/Centro de Ayuda y Preguntas Frecuentes/i)).toBeInTheDocument();
  });
});