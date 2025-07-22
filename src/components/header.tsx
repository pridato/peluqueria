"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Scissors } from "lucide-react"
import { useState, useEffect } from "react"
import { cn } from "@/lib/utils"

export default function Header() {
    // Estado para manejar el cambio de estilo del header al hacer scroll
    const [scrolled, setScrolled] = useState(false)

    // Efecto para agregar un listener al scroll y cambiar el estado del header
    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 50) // Cambia a sólido después de 50px de scroll
        }

        window.addEventListener("scroll", handleScroll)
        return () => window.removeEventListener("scroll", handleScroll)
    }, [])

    return (
        <header
            className={cn(
                "fixed top-0 left-0 right-0 z-50 h-16 flex items-center justify-between px-4 lg:px-8 transition-all duration-300",
                scrolled ? "bg-white shadow-md" : "bg-transparent text-white",
            )}
        >
            <Link href="/" className="flex items-center gap-2">
                <Scissors className={cn("h-7 w-7", scrolled ? "text-primary" : "text-white")} />
                <span className={cn("text-xl font-bold", scrolled ? "text-gray-800" : "text-white")}>La Barbería Elegante</span>
            </Link>
            <nav className="hidden md:flex gap-8">
                <Link
                    href="/"
                    className={cn(
                        "text-base font-medium hover:text-primary transition-colors",
                        scrolled ? "text-gray-700" : "text-white",
                    )}
                >
                    Inicio
                </Link>
                <Link
                    href="/services"
                    className={cn(
                        "text-base font-medium hover:text-primary transition-colors",
                        scrolled ? "text-gray-700" : "text-white",
                    )}
                >
                    Servicios
                </Link>
                <Link
                    href="/book"
                    className={cn(
                        "text-base font-medium hover:text-primary transition-colors",
                        scrolled ? "text-gray-700" : "text-white",
                    )}
                >
                    Reservar
                </Link>
                <Link
                    href="/admin"
                    className={cn(
                        "text-base font-medium hover:text-primary transition-colors",
                        scrolled ? "text-gray-700" : "text-white",
                    )}
                >
                    Admin
                </Link>
            </nav>
            <Button
                asChild
                className={cn(
                    "hidden md:inline-flex text-base px-6 py-3 rounded-full font-semibold",
                    scrolled ? "bg-primary hover:bg-primary/90 text-white" : "bg-white hover:bg-gray-100 text-primary",
                )}
            >
                <Link href="/book">Reservar Cita</Link>
            </Button>
            {/* Mobile menu toggle would go here */}
        </header>
    )
}