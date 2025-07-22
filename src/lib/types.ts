/**
 * @module types
 * @description Este módulo define los tipos utilizados en la aplicación de gestión de citas.
 * Incluye tipos para servicios, testimonios y reservas.
 * Service: Representa un servicio ofrecido por el negocio.
 * Testimonial: Representa un testimonio de un cliente.
 * Booking: Representa una reserva realizada por un cliente.
 */
export interface Service {
    id: string
    name: string
    description: string
    price: number
    duration: number // in minutes
}

export interface Testimonial {
    id: string
    name: string
    text: string
    rating: number // 1-5
    avatar?: string // Nuevo campo para el avatar
}

export type BookingStatus = "pending" | "confirmed" | "cancelled"

export interface Booking {
    id: string
    customerName: string
    customerEmail: string
    customerPhone: string
    serviceId: string
    serviceName: string
    date: string // YYYY-MM-DD
    time: string // HH:MM
    status: BookingStatus
}

export interface BookingFormProps {
    services: Service[]
    initialServiceId?: string
    onBookingSuccess: (booking: Booking) => void
}