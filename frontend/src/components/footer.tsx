import Link from "next/link"
import { Scissors } from "lucide-react"

export default function Footer() {
  return (
    <footer className="flex flex-col gap-2 sm:flex-row py-6 w-full shrink-0 items-center px-4 md:px-6 border-t border-[hsl(0_0%_88%)] bg-[hsl(60_66%_98%)]">
      <Link href="/" className="flex items-center gap-2">
        <Scissors className="h-5 w-5 text-[hsl(166_37%_37%)]" />
        <span className="text-sm font-semibold text-[hsl(0_0%_17%)]">La Barbería Elegante</span>
      </Link>
      <p className="text-xs text-[hsl(0_0%_17%)] sm:ml-auto">
        &copy; {new Date().getFullYear()} La Barbería Elegante. Todos los derechos reservados.
      </p>
      <nav className="flex gap-4 sm:gap-6 mt-2 sm:mt-0">
        <Link href="#" className="text-xs hover:underline underline-offset-4 text-[hsl(0_0%_17%)]">
          Términos de Servicio
        </Link>
        <Link href="#" className="text-xs hover:underline underline-offset-4 text-[hsl(0_0%_17%)]">
          Privacidad
        </Link>
      </nav>
    </footer>
  )
}
