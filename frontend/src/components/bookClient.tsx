"use client"

import { useSearchParams } from "next/navigation"
import { services } from "@/lib/data"
import BookingForm from "@/components/booking-form"
import { useState } from "react"
import type { Booking } from "@/lib/types"

export default function BookClient() {
    const searchParams = useSearchParams()
    const initialServiceId = searchParams.get("serviceId") || undefined
    const [latestBooking, setLatestBooking] = useState<Booking | null>(null)

    const handleBookingSuccess = (booking: Booking) => {
        setLatestBooking(booking)
    }

    return (
        <div className="w-full max-w-md">
            <BookingForm
                services={services}
                initialServiceId={initialServiceId}
                onBookingSuccess={handleBookingSuccess}
            />
        </div>
    )
}
