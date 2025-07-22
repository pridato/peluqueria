"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Scissors } from "lucide-react"

export default function Header() {
    return (
        <header className="fixed top-0 left-0 right-0 z-50 h-16 flex items-center justify-between px-4 lg:px-8 bg-white shadow-md text-gray-800">
            <Link href="/" className="flex items-center gap-2">
                <Scissors className="h-7 w-7 text-primary" />
                <span className="text-xl font-bold">La Barbería Elegante</span>
            </Link>

            <nav className="hidden md:flex gap-8">
                <Link href="/" className="text-base font-medium hover:text-primary transition-colors">
                    Inicio
                </Link>
                <Link href="/services" className="text-base font-medium hover:text-primary transition-colors">
                    Servicios
                </Link>
                <Link href="/book" className="text-base font-medium hover:text-primary transition-colors">
                    Reservar
                </Link>
                <Link href="/admin" className="text-base font-medium hover:text-primary transition-colors">
                    Admin
                </Link>
            </nav>

            <Button
                asChild
                className="hidden md:inline-flex text-base px-6 py-3 rounded-full font-semibold bg-primary hover:bg-primary/90 text-white"
            >
                <Link href="/book">Reservar Cita</Link>
            </Button>
        </header>
    )
}
