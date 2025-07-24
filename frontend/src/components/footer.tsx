import Link from "next/link"
import { Scissors } from "lucide-react"

export default function Footer() {
    return (
        <footer className="flex flex-col gap-2 sm:flex-row py-6 w-full shrink-0 items-center px-4 md:px-6 border-t bg-gray-50">
            <Link href="/" className="flex items-center gap-2">
                <Scissors className="h-5 w-5 text-primary" />
                <span className="text-sm font-semibold text-gray-700">La Barbería Elegante</span>
            </Link>
            <p className="text-xs text-muted-foreground sm:ml-auto">
                &copy; {new Date().getFullYear()} La Barbería Elegante. Todos los derechos reservados.
            </p>
            <nav className="flex gap-4 sm:gap-6 mt-2 sm:mt-0">
                <Link href="#" className="text-xs hover:underline underline-offset-4 text-gray-600">
                    Términos de Servicio
                </Link>
                <Link href="#" className="text-xs hover:underline underline-offset-4 text-gray-600">
                    Privacidad
                </Link>
            </nav>
        </footer>
    )
}