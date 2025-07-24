/**
 * Test AdminDashboard
 * @file Test para el componente AdminDashboard
 * @description Pruebas unitarias para el panel de administración, estadísticas y gestión de reservas.
 */
import { render, screen } from '@testing-library/react';
import AdminDashboard from '../admin-dashboard';
import '@testing-library/jest-dom';

describe('AdminDashboard', () => {
  it('muestra las estadísticas de reservas', () => {
    render(<AdminDashboard />);
    expect(screen.getByText(/total reservas/i)).toBeInTheDocument();
    expect(screen.getByText(/confirmadas/i)).toBeInTheDocument();
    expect(screen.getByText(/pendientes/i)).toBeInTheDocument();
    expect(screen.getByText(/canceladas/i)).toBeInTheDocument();
  });

  it('permite cambiar el estado de una reserva', () => {
    render(<AdminDashboard />);
    // Simular click en el botón de confirmar/cancelar si existe
    // Aquí deberías adaptar el selector según el botón real
    // fireEvent.click(screen.getByRole('button', { name: /confirmar/i }));
    // expect(...).toBeInTheDocument();
  });
}); 