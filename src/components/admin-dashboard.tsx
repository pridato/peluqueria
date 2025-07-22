"use client"

import {useState} from "react"
import {bookings as initialBookings} from "@/lib/data"
import type {Booking, BookingStatus} from "@/lib/types"
import {Card, CardContent, CardHeader, CardTitle} from "@/components/ui/card"
import {Table, TableBody, TableCell, TableHead, TableHeader, TableRow} from "@/components/ui/table"
import {Button} from "@/components/ui/button"
import {Badge} from "@/components/ui/badge"
import {Check, X, BarChart2, Clock} from "lucide-react"

/**
 * Componente AdminDashboard
 * @constructor AdminDashboard
 * @description Componente que muestra un panel de administración para gestionar reservas de servicios de peluquería.
 * Incluye estadísticas de reservas, lista de reservas con opciones para confirmar o cancelar, y un resumen de reservas por servicio.
 */
export default function AdminDashboard() {

    // estado para manejar las reservas
    const [currentBookings, setCurrentBookings] = useState<Booking[]>(initialBookings)

    // función para actualizar el estado de una reserva
    const updateBookingStatus = (id: string, newStatus: BookingStatus) => {
        setCurrentBookings((prevBookings) =>
            prevBookings.map((booking) => (booking.id === id ? {...booking, status: newStatus} : booking)),
        )
        // Actualizar el estado de la reserva en el array mutable inicial
        const bookingIndex = initialBookings.findIndex((b) => b.id === id)
        if (bookingIndex !== -1) {
            initialBookings[bookingIndex].status = newStatus
        }
    }

    // Función para calcular las estadísticas de las reservas
    const totalBookings = currentBookings.length
    const confirmedBookings = currentBookings.filter((b) => b.status === "confirmed").length
    const pendingBookings = currentBookings.filter((b) => b.status === "pending").length
    const cancelledBookings = currentBookings.filter((b) => b.status === "cancelled").length

    // Agrupar reservas por servicio, se recorre el array de reservas y se crea un objeto donde la clave es el nombre del servicio y el valor es el número de reservas para ese servicio
    const bookingsByService: { [key: string]: number } = {}

    currentBookings.forEach((booking) => {
        bookingsByService[booking.serviceName] = (bookingsByService[booking.serviceName] || 0) + 1
    })

    return (
        <div className="space-y-8">
            <h2 className="text-3xl font-bold text-gray-800">Panel de Administración</h2>

            {/* Statistics Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Total Reservas</CardTitle>
                        <BarChart2 className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{totalBookings}</div>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Confirmadas</CardTitle>
                        <Check className="h-4 w-4 text-green-500" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{confirmedBookings}</div>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Pendientes</CardTitle>
                        <Clock className="h-4 w-4 text-orange-500" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{pendingBookings}</div>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Canceladas</CardTitle>
                        <X className="h-4 w-4 text-red-500" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{cancelledBookings}</div>
                    </CardContent>
                </Card>
            </div>

            {/* Bookings List */}
            <Card>
                <CardHeader>
                    <CardTitle className="text-xl font-bold">Lista de Reservas</CardTitle>
                </CardHeader>
                <CardContent>
                    {currentBookings.length === 0 ? (
                        <p className="text-muted-foreground">No hay reservas para mostrar.</p>
                    ) : (
                        <div className="overflow-x-auto">
                            <Table>
                                <TableHeader>
                                    <TableRow>
                                        <TableHead>ID</TableHead>
                                        <TableHead>Cliente</TableHead>
                                        <TableHead>Servicio</TableHead>
                                        <TableHead>Fecha</TableHead>
                                        <TableHead>Hora</TableHead>
                                        <TableHead>Estado</TableHead>
                                        <TableHead className="text-right">Acciones</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {currentBookings.map((booking) => (
                                        <TableRow key={booking.id}>
                                            <TableCell className="font-medium">{booking.id.substring(0, 8)}...</TableCell>
                                            <TableCell>{booking.customerName}</TableCell>
                                            <TableCell>{booking.serviceName}</TableCell>
                                            <TableCell>{booking.date}</TableCell>
                                            <TableCell>{booking.time}</TableCell>
                                            <TableCell>
                                                <Badge
                                                    variant={
                                                        booking.status === "confirmed"
                                                            ? "default"
                                                            : booking.status === "pending"
                                                                ? "secondary"
                                                                : "destructive"
                                                    }
                                                >
                                                    {booking.status === "pending" && "Pendiente"}
                                                    {booking.status === "confirmed" && "Confirmada"}
                                                    {booking.status === "cancelled" && "Cancelada"}
                                                </Badge>
                                            </TableCell>
                                            <TableCell className="text-right">
                                                {booking.status === "pending" && (
                                                    <div className="flex gap-2 justify-end">
                                                        <Button
                                                            variant="outline"
                                                            size="sm"
                                                            onClick={() => updateBookingStatus(booking.id, "confirmed")}
                                                        >
                                                            <Check className="h-4 w-4 mr-1" /> Confirmar
                                                        </Button>
                                                        <Button
                                                            variant="destructive"
                                                            size="sm"
                                                            onClick={() => updateBookingStatus(booking.id, "cancelled")}
                                                        >
                                                            <X className="h-4 w-4 mr-1" /> Cancelar
                                                        </Button>
                                                    </div>
                                                )}
                                                {booking.status !== "pending" && (
                                                    <span className="text-muted-foreground text-sm">Acciones completadas</span>
                                                )}
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </div>
                    )}
                </CardContent>
            </Card>

            {/* Bookings by Service Chart (simple text representation) */}
            <Card>
                <CardHeader>
                    <CardTitle className="text-xl font-bold">Reservas por Servicio</CardTitle>
                </CardHeader>
                <CardContent>
                    {Object.keys(bookingsByService).length === 0 ? (
                        <p className="text-muted-foreground">No hay datos de reservas por servicio.</p>
                    ) : (
                        <ul className="list-disc pl-5 space-y-2">
                            {Object.entries(bookingsByService).map(([serviceName, count]) => (
                                <li key={serviceName} className="text-gray-700">
                                    {serviceName}: <span className="font-semibold">{count}</span> reservas
                                </li>
                            ))}
                        </ul>
                    )}
                </CardContent>
            </Card>
        </div>
    )
}