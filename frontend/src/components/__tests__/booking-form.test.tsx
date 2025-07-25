/**
 * Test BookingForm
 * @file Test para el componente BookingForm
 * @description Pruebas unitarias para el formulario de reservas, validando campos, errores y envío exitoso.
 */
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import BookingForm from '../booking-form';
import '@testing-library/jest-dom';

describe('BookingForm', () => {
  it('muestra errores si los campos están vacíos y no permite enviar', async () => {
    render(<BookingForm services={[]} initialServiceId={undefined} onBookingSuccess={() => {}} />);
    fireEvent.click(screen.getByText(/reservar/i));
    expect(await screen.findAllByText(/obligatorio|requerido/i)).toHaveLength(1);
  });

  it('permite reservar correctamente (mock fetch)', async () => {
    global.fetch = jest.fn(() => Promise.resolve({ ok: true, json: () => Promise.resolve({}) })) as unknown as jest.Mock;
    render(
      <BookingForm
        services={[{ id: '1', name: 'Corte', price: 10, duration: 30, description: 'Corte de pelo' }]}
        initialServiceId={'1'}
        onBookingSuccess={() => {}}
      />
    );
    fireEvent.change(screen.getByLabelText(/nombre/i), { target: { value: 'Juan' } });
    fireEvent.change(screen.getByLabelText(/email/i), { target: { value: 'juan@email.com' } });
    fireEvent.change(screen.getByLabelText(/tel[eé]fono/i), { target: { value: '600123123' } });
    fireEvent.click(screen.getByText(/reservar/i));
    await waitFor(() => expect(screen.getByText(/reserva confirmada/i)).toBeInTheDocument());
  });
}); 