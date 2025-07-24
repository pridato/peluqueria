/**
 * Test DashboardBlock
 * @file Test para el componente DashboardBlock
 * @description Pruebas unitarias para el dashboard bloqueado en la demo, verificando mensajes de acceso limitado.
 */
import { render, screen } from '@testing-library/react';
import DashboardBlock from '../dashboardBlock';
import '@testing-library/jest-dom';

describe('DashboardBlock', () => {
  it('muestra el mensaje de acceso limitado', () => {
    render(<DashboardBlock />);
    expect(screen.getByText(/acceso limitado/i)).toBeInTheDocument();
    expect(screen.getByText(/contenido restringido/i)).toBeInTheDocument();
  });
}); 