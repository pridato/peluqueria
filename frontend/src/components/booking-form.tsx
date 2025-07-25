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
import { CalendarIcon, CheckCircle2, XCircle, PhoneIcon as Whatsapp } from "lucide-react"
import type { Booking, BookingFormProps } from "@/lib/types"
import { bookings } from "@/lib/data"
import { cn } from "@/lib/utils"
import {availableTimes} from "@/lib/consts";
import { es } from "date-fns/locale"

export default function BookingForm({ services, initialServiceId, onBookingSuccess }: BookingFormProps) {

    // estado para los campos del formulario
    const [customerName, setCustomerName] = useState("")
    const [customerEmail, setCustomerEmail] = useState("")
    const [customerPhone, setCustomerPhone] = useState("")
    const [selectedServiceId, setSelectedServiceId] = useState<string>(initialServiceId || "")
    const [selectedDate, setSelectedDate] = useState<Date | undefined>(undefined)
    const [selectedTime, setSelectedTime] = useState("")
    const [formError, setFormError] = useState<string | null>(null)
    const [bookingSuccess, setBookingSuccess] = useState(false)

    // estados para manejar el estado de los campos tocados
    const [nameTouched, setNameTouched] = useState(false)
    const [emailTouched, setEmailTouched] = useState(false)
    const [phoneTouched, setPhoneTouched] = useState(false)
    const [serviceTouched, setServiceTouched] = useState(false)
    const [dateTouched, setDateTouched] = useState(false)
    const [timeTouched, setTimeTouched] = useState(false)

    // Validaciones simples para email y teléfono
    const isValidEmail = (email: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
    const isValidPhone = (phone: string) => /^\d{9,15}$/.test(phone.replace(/[\s-()]/g, "")) // Simple digit check

    useEffect(() => {
        if (initialServiceId) { // Si se proporciona un ID de servicio inicial, seleccionarlo
            setSelectedServiceId(initialServiceId)
            setServiceTouched(true)
        }
    }, [initialServiceId])

    const [datePopoverOpen, setDatePopoverOpen] = useState(false)


    /**
     * Resetea los campos del formulario a sus valores iniciales.
     */
    function resetForm() {
        setCustomerName("")
        setCustomerEmail("")
        setCustomerPhone("")
        setSelectedServiceId("")
        setSelectedDate(undefined)
        setSelectedTime("")

        setNameTouched(false)
        setEmailTouched(false)
        setPhoneTouched(false)
        setServiceTouched(false)
        setDateTouched(false)
        setTimeTouched(false)
        setFormError(null)
    }

    /**
     * Verifica si la hora seleccionada es una hora pasada en relación con la fecha seleccionada.
     * @param time - Hora en formato "HH:mm".
     * @param selectedDate - Fecha seleccionada para la reserva.
     */
    function isPastTime(time: string, selectedDate?: Date): boolean {

        if (!selectedDate) return false // si no hay fecha, no marcamos ninguna como pasada

        const [hours, minutes] = time.split(":").map(Number)

        const now = new Date()
        const dateToCompare = new Date(selectedDate)
        dateToCompare.setHours(hours)
        dateToCompare.setMinutes(minutes)
        dateToCompare.setSeconds(0)
        dateToCompare.setMilliseconds(0)

        return dateToCompare < now
    }

    /**
     * Envía un correo de confirmación al cliente con los detalles de la reserva.
     * @param newBooking - Objeto de reserva que contiene los detalles del cliente y la cita.
     */
    async function sendEmail(newBooking: Booking) {
        await fetch("/api/booking/confirm", {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify(newBooking),
        })
    }

    /**
     * Maneja el envío del formulario de reserva.
     * @param e Evento de envío del formulario.
     */
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setFormError(null)
        setBookingSuccess(false)

        // Marcar todos los campos como tocados para mostrar errores si es necesario
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

        // verificamos que el servicio seleccionado sea válido
        const selectedService = services.find((s) => s.id === selectedServiceId)
        if (!selectedService) {
            setFormError("Servicio seleccionado no válido.")
            return
        }

        // creamos la nueva reserva, por defecto "pending"
        const newBooking: Booking = {
            id: `booking-${Date.now()}`,
            customerName,
            customerEmail,
            customerPhone,
            serviceId: selectedService.id,
            serviceName: selectedService.name,
            date: format(selectedDate, "yyyy-MM-dd"),
            time: selectedTime,
            status: "pending",
        }

        // por el momento lo guardamos en el array de reservas, pendiente de integración con backend
        bookings.push(newBooking)
        onBookingSuccess(newBooking) // notificamos al componente padre del éxito de la reserva
        setBookingSuccess(true)

        await sendEmail(newBooking);


        resetForm();
    }

    /**
     * Maneja la reserva a través de WhatsApp.
     */
    const handleWhatsappBooking = () => {
        const serviceName = services.find((s) => s.id === selectedServiceId)?.name || "un servicio"
        const date = selectedDate ? format(selectedDate, "dd/MM/yyyy") : "una fecha"
        const time = selectedTime || "una hora"

        const message = encodeURIComponent(
            `Hola, me gustaría reservar una cita para ${serviceName} el ${date} a las ${time}. Mi nombre es ${customerName}. Mi email es ${customerEmail} y mi teléfono es ${customerPhone}.`,
        )
        // Replace with your actual WhatsApp number
        const whatsappNumber = "34600123456" // Example: +34 600 123 456
        window.open(`https://wa.me/${whatsappNumber}?text=${message}`, "_blank")
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
                <Popover open={datePopoverOpen} onOpenChange={setDatePopoverOpen}>
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
                            {selectedDate ? format(selectedDate, "PPP", { locale: es }) : <span>Selecciona una fecha</span>}
                        </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0">
                        <Calendar
                            mode="single"
                            selected={selectedDate}
                            onSelect={(date) => {
                                if (date) {
                                    setSelectedDate(date)
                                    setDateTouched(true)
                                    setDatePopoverOpen(false)
                                }
                            }}
                            disabled={(date) => {
                                const today = new Date()
                                today.setHours(0, 0, 0, 0) // eliminamos la hora
                                return date < today || date.getDay() === 0
                            }}

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
                        {availableTimes.map((time) => {
                            const disabled = isPastTime(time, selectedDate)

                            return (
                                <SelectItem
                                    key={time}
                                    value={time}
                                    disabled={disabled}
                                    className={cn(disabled && "text-gray-400 cursor-not-allowed")}
                                >
                                    {time}
                                </SelectItem>
                            )
                        })}
                    </SelectContent>
                </Select>
                {timeTouched && !selectedTime && <p className="text-red-500 text-sm mt-1">La hora es obligatoria.</p>}
            </div>

            <Button
                type="submit"
                className="w-full bg-[hsl(166_37%_37%)] hover:bg-[hsl(166_37%_37%)]/90 text-[hsl(60_66%_98%)] text-lg py-3 rounded-lg shadow-md"
            >
                Confirmar Reserva
            </Button>

            <div className="relative flex py-5 items-center">
                <div className="flex-grow border-t border-gray-300"></div>
                <span className="flex-shrink mx-4 text-gray-500">O</span>
                <div className="flex-grow border-t border-gray-300"></div>
            </div>

            <Button
                type="button"
                onClick={handleWhatsappBooking}
                className="w-full bg-green-500 hover:cursor-pointer hover:bg-green-600 text-white text-lg py-3 rounded-lg shadow-md flex items-center justify-center gap-2"
            >
                <Whatsapp className="h-6 w-6" />
                Reservar por WhatsApp
            </Button>
        </form>
    )
}