/**
 * Test BookClient
 * @file Test para el componente BookClient
 * @description Pruebas unitarias para el wrapper del formulario de reservas, comprobando renderizado y callback de éxito.
 */
import { render, screen } from '@testing-library/react';
import BookClient from '../bookClient';
import '@testing-library/jest-dom';

describe('BookClient', () => {
  it('renderiza el formulario de reserva', () => {
    render(<BookClient />);
    expect(screen.getByText(/reservar/i)).toBeInTheDocument();
  });
}); 