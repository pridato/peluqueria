"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { format } from "date-fns"
import { CalendarIcon, CheckCircle2, XCircle } from "lucide-react"
import type { Service, Booking } from "@/lib/types"
import { bookings } from "@/lib/data" // Import the mutable bookings array
import { cn } from "@/lib/utils" // Asegúrate de que esta importación exista

interface BookingFormProps {
    services: Service[]
    initialServiceId?: string
    onBookingSuccess: (booking: Booking) => void
}

export default function BookingForm({ services, initialServiceId, onBookingSuccess }: BookingFormProps) {
    const [customerName, setCustomerName] = useState("")
    const [customerEmail, setCustomerEmail] = useState("")
    const [customerPhone, setCustomerPhone] = useState("")
    const [selectedServiceId, setSelectedServiceId] = useState<string>(initialServiceId || "")
    const [selectedDate, setSelectedDate] = useState<Date | undefined>(undefined)
    const [selectedTime, setSelectedTime] = useState("")
    const [formError, setFormError] = useState<string | null>(null)
    const [bookingSuccess, setBookingSuccess] = useState(false)

    // Validation states
    const [nameTouched, setNameTouched] = useState(false)
    const [emailTouched, setEmailTouched] = useState(false)
    const [phoneTouched, setPhoneTouched] = useState(false)
    const [serviceTouched, setServiceTouched] = useState(false)
    const [dateTouched, setDateTouched] = useState(false)
    const [timeTouched, setTimeTouched] = useState(false)

    const isValidEmail = (email: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
    const isValidPhone = (phone: string) => /^\d{9,15}$/.test(phone.replace(/[\s-()]/g, "")) // Simple digit check

    useEffect(() => {
        if (initialServiceId) {
            setSelectedServiceId(initialServiceId)
            setServiceTouched(true)
        }
    }, [initialServiceId])

    const availableTimes = [
        "09:00",
        "09:30",
        "10:00",
        "10:30",
        "11:00",
        "11:30",
        "12:00",
        "12:30",
        "13:00",
        "13:30",
        "14:00",
        "14:30",
        "15:00",
        "15:30",
        "16:00",
        "16:30",
        "17:00",
        "17:30",
    ]

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        setFormError(null)
        setBookingSuccess(false)

        // Trigger all touched states on submit attempt
        setNameTouched(true)
        setEmailTouched(true)
        setPhoneTouched(true)
        setServiceTouched(true)
        setDateTouched(true)
        setTimeTouched(true)

        if (
            !customerName ||
            !customerEmail ||
            !customerPhone ||
            !selectedServiceId ||
            !selectedDate ||
            !selectedTime ||
            !isValidEmail(customerEmail) ||
            !isValidPhone(customerPhone)
        ) {
            setFormError("Por favor, completa todos los campos correctamente.")
            return
        }

        const selectedService = services.find((s) => s.id === selectedServiceId)
        if (!selectedService) {
            setFormError("Servicio seleccionado no válido.")
            return
        }

        const newBooking: Booking = {
            id: `booking-${Date.now()}`,
            customerName,
            customerEmail,
            customerPhone,
            serviceId: selectedService.id,
            serviceName: selectedService.name,
            date: format(selectedDate, "yyyy-MM-dd"),
            time: selectedTime,
            status: "pending", // Default status
        }

        // Simulate saving to "backend" (in-memory array)
        bookings.push(newBooking)
        onBookingSuccess(newBooking) // Notify parent component
        setBookingSuccess(true)

        // Reset form
        setCustomerName("")
        setCustomerEmail("")
        setCustomerPhone("")
        setSelectedServiceId("")
        setSelectedDate(undefined)
        setSelectedTime("")
    }

    return (
        <form onSubmit={handleSubmit} className="space-y-6 p-8 border border-gray-200 rounded-xl shadow-lg bg-white">
            <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">Reservar Tu Cita</h2>

            {bookingSuccess && (
                <div className="flex items-center gap-3 p-4 bg-green-50 text-green-700 rounded-lg border border-green-200">
                    <CheckCircle2 className="h-6 w-6" />
                    <span className="font-medium">¡Tu cita ha sido reservada con éxito! Te esperamos.</span>
                </div>
            )}

            {formError && (
                <div className="flex items-center gap-3 p-4 bg-red-50 text-red-700 rounded-lg border border-red-200">
                    <XCircle className="h-6 w-6" />
                    <span className="font-medium">{formError}</span>
                </div>
            )}

            <div>
                <Label htmlFor="name" className="mb-2 block text-gray-700 font-medium">
                    Nombre Completo
                </Label>
                <Input
                    id="name"
                    type="text"
                    placeholder="Tu nombre"
                    value={customerName}
                    onChange={(e) => {
                        setCustomerName(e.target.value)
                        setNameTouched(true)
                    }}
                    onBlur={() => setNameTouched(true)}
                    className={cn(
                        "border-gray-300 focus:border-primary focus:ring-primary rounded-lg px-4 py-2.5",
                        nameTouched && !customerName && "border-red-500 focus:border-red-500 focus:ring-red-500",
                    )}
                    required
                />
                {nameTouched && !customerName && <p className="text-red-500 text-sm mt-1">El nombre es obligatorio.</p>}
            </div>

            <div>
                <Label htmlFor="email" className="mb-2 block text-gray-700 font-medium">
                    Email
                </Label>
                <Input
                    id="email"
                    type="email"
                    placeholder="tu@ejemplo.com"
                    value={customerEmail}
                    onChange={(e) => {
                        setCustomerEmail(e.target.value)
                        setEmailTouched(true)
                    }}
                    onBlur={() => setEmailTouched(true)}
                    className={cn(
                        "border-gray-300 focus:border-primary focus:ring-primary rounded-lg px-4 py-2.5",
                        emailTouched &&
                        (!customerEmail || !isValidEmail(customerEmail)) &&
                        "border-red-500 focus:border-red-500 focus:ring-red-500",
                    )}
                    required
                />
                {emailTouched && !customerEmail && <p className="text-red-500 text-sm mt-1">El email es obligatorio.</p>}
                {emailTouched && customerEmail && !isValidEmail(customerEmail) && (
                    <p className="text-red-500 text-sm mt-1">Formato de email inválido.</p>
                )}
            </div>

            <div>
                <Label htmlFor="phone" className="mb-2 block text-gray-700 font-medium">
                    Teléfono
                </Label>
                <Input
                    id="phone"
                    type="tel"
                    placeholder="123-456-7890"
                    value={customerPhone}
                    onChange={(e) => {
                        setCustomerPhone(e.target.value)
                        setPhoneTouched(true)
                    }}
                    onBlur={() => setPhoneTouched(true)}
                    className={cn(
                        "border-gray-300 focus:border-primary focus:ring-primary rounded-lg px-4 py-2.5",
                        phoneTouched &&
                        (!customerPhone || !isValidPhone(customerPhone)) &&
                        "border-red-500 focus:border-red-500 focus:ring-red-500",
                    )}
                    required
                />
                {phoneTouched && !customerPhone && <p className="text-red-500 text-sm mt-1">El teléfono es obligatorio.</p>}
                {phoneTouched && customerPhone && !isValidPhone(customerPhone) && (
                    <p className="text-red-500 text-sm mt-1">Formato de teléfono inválido (solo números, min 9).</p>
                )}
            </div>

            <div>
                <Label htmlFor="service" className="mb-2 block text-gray-700 font-medium">
                    Servicio
                </Label>
                <Select
                    value={selectedServiceId}
                    onValueChange={(value) => {
                        setSelectedServiceId(value)
                        setServiceTouched(true)
                    }}
                    required
                >
                    <SelectTrigger
                        id="service"
                        className={cn(
                            "border-gray-300 focus:border-primary focus:ring-primary rounded-lg px-4 py-2.5",
                            serviceTouched && !selectedServiceId && "border-red-500 focus:border-red-500 focus:ring-red-500",
                        )}
                    >
                        <SelectValue placeholder="Selecciona un servicio" />
                    </SelectTrigger>
                    <SelectContent>
                        {services.map((service) => (
                            <SelectItem key={service.id} value={service.id}>
                                {service.name} (${service.price.toFixed(2)})
                            </SelectItem>
                        ))}
                    </SelectContent>
                </Select>
                {serviceTouched && !selectedServiceId && (
                    <p className="text-red-500 text-sm mt-1">El servicio es obligatorio.</p>
                )}
            </div>

            <div>
                <Label htmlFor="date" className="mb-2 block text-gray-700 font-medium">
                    Fecha
                </Label>
                <Popover>
                    <PopoverTrigger asChild>
                        <Button
                            variant={"outline"}
                            className={cn(
                                `w-full justify-start text-left font-normal rounded-lg px-4 py-2.5 border-gray-300 focus:border-primary focus:ring-primary`,
                                !selectedDate && "text-muted-foreground",
                                dateTouched && !selectedDate && "border-red-500 focus:border-red-500 focus:ring-red-500",
                            )}
                            onClick={() => setDateTouched(true)}
                        >
                            <CalendarIcon className="mr-2 h-4 w-4" />
                            {selectedDate ? format(selectedDate, "PPP") : <span>Selecciona una fecha</span>}
                        </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0">
                        <Calendar
                            mode="single"
                            selected={selectedDate}
                            onSelect={(date) => {
                                setSelectedDate(date)
                                setDateTouched(true)
                            }}
                            initialFocus
                            disabled={(date) => date < new Date() || date.getDay() === 0} // Disable past dates and Sundays
                        />
                    </PopoverContent>
                </Popover>
                {dateTouched && !selectedDate && <p className="text-red-500 text-sm mt-1">La fecha es obligatoria.</p>}
            </div>

            <div>
                <Label htmlFor="time" className="mb-2 block text-gray-700 font-medium">
                    Hora
                </Label>
                <Select
                    value={selectedTime}
                    onValueChange={(value) => {
                        setSelectedTime(value)
                        setTimeTouched(true)
                    }}
                    required
                >
                    <SelectTrigger
                        id="time"
                        className={cn(
                            "border-gray-300 focus:border-primary focus:ring-primary rounded-lg px-4 py-2.5",
                            timeTouched && !selectedTime && "border-red-500 focus:border-red-500 focus:ring-red-500",
                        )}
                    >
                        <SelectValue placeholder="Selecciona una hora" />
                    </SelectTrigger>
                    <SelectContent>
                        {availableTimes.map((time) => (
                            <SelectItem key={time} value={time}>
                                {time}
                            </SelectItem>
                        ))}
                    </SelectContent>
                </Select>
                {timeTouched && !selectedTime && <p className="text-red-500 text-sm mt-1">La hora es obligatoria.</p>}
            </div>

            <Button
                type="submit"
                className="w-full bg-primary hover:bg-primary/90 text-white text-lg py-3 rounded-lg shadow-md"
            >
                Confirmar Reserva
            </Button>
        </form>
    )
}