"use client"

import { useSearchParams } from "next/navigation"
import { services } from "@/lib/data"
import BookingForm from "@/components/booking-form"
import { useState } from "react"
import type { Booking } from "@/lib/types"

/**
 * Página de reservas que permite a los usuarios reservar servicios
 */
export default function BookPage() {
    const searchParams = useSearchParams()
    const initialServiceId = searchParams.get("serviceId") || undefined
    const [latestBooking, setLatestBooking] = useState<Booking | null>(null)

    /**
     * Maneja el éxito de una reserva.
     * @param booking
     */
    const handleBookingSuccess = (booking: Booking) => {
        setLatestBooking(booking)
    }

    return (
        <section className="py-16 md:py-24 bg-muted">
            <div className="container px-4 md:px-6 flex justify-center">
                <div className="w-full max-w-md">
                    <BookingForm
                        services={services}
                        initialServiceId={initialServiceId}
                        onBookingSuccess={handleBookingSuccess}
                    />
                </div>
            </div>
        </section>
    )
}