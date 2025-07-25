"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Menu, Scissors } from "lucide-react"
import {useEffect, useState} from "react";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils"
import { Sheet, SheetContent, SheetTrigger, SheetTitle } from "@/components/ui/sheet"

export default function Header() {

    const [scrolled, setScrolled] = useState(false)
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
    const pathname = usePathname()
    const isHomePage = pathname === "/"

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 30)
        }

        window.addEventListener("scroll", handleScroll)
        return () => window.removeEventListener("scroll", handleScroll)
    }, [])

    const isActiveHeader = scrolled || !isHomePage

    /**
     * Links del header
     */
    const navLinks = (
        <>
          <Link
            href="/"
            className={cn(
              "text-base font-medium hover:text-[hsl(166_37%_37%)] transition-colors",
              isActiveHeader ? "text-[hsl(0_0%_17%)]" : "text-[hsl(60_66%_98%)]",
            )}
            onClick={() => setIsMobileMenuOpen(false)}
          >
            Inicio
          </Link>
          <Link
            href="/services"
            className={cn(
              "text-base font-medium hover:text-[hsl(166_37%_37%)] transition-colors",
              isActiveHeader ? "text-[hsl(0_0%_17%)]" : "text-[hsl(60_66%_98%)]",
            )}
            onClick={() => setIsMobileMenuOpen(false)}
          >
            Servicios
          </Link>
          <Link
            href="/book"
            className={cn(
              "text-base font-medium hover:text-[hsl(166_37%_37%)] transition-colors",
              isActiveHeader ? "text-[hsl(0_0%_17%)]" : "text-[hsl(60_66%_98%)]",
            )}
            onClick={() => setIsMobileMenuOpen(false)}
          >
            Reservar
          </Link>
          <Link
            href="/visagismo"
            className={cn(
              "text-base font-medium hover:text-[hsl(166_37%_37%)] transition-colors",
              isActiveHeader ? "text-[hsl(0_0%_17%)]" : "text-[hsl(60_66%_98%)]",
            )}
            onClick={() => setIsMobileMenuOpen(false)}
          >
            Visagismo
          </Link>
          <Link
            href="/admin"
            className={cn(
              "text-base font-medium hover:text-[hsl(166_37%_37%)] transition-colors",
              isActiveHeader ? "text-[hsl(0_0%_17%)]" : "text-[hsl(60_66%_98%)]",
            )}
            onClick={() => setIsMobileMenuOpen(false)}
          >
            Admin
          </Link>
        </>
      )

    return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 h-16 flex items-center justify-between px-4 lg:px-8 transition-all duration-300",
        isActiveHeader
          ? "bg-[hsl(60_66%_98%)] shadow-md opacity-100 pointer-events-auto"
          : "bg-transparent opacity-0 pointer-events-none",
      )}
    >
      <Link href="/" className="flex items-center gap-2">
        <Scissors className={cn("h-7 w-7", isActiveHeader ? "text-[hsl(166_37%_37%)]" : "text-[hsl(166_37%_37%)]")} />
        <span className={cn("text-xl font-bold", isActiveHeader ? "text-[hsl(0_0%_17%)]" : "text-[hsl(60_66%_98%)]")}>
          La Barbería Elegante
        </span>
      </Link>

      {/* Desktop Navigation */}
      <nav className="hidden md:flex gap-8">
        {navLinks}
        <Button
          asChild
          className={cn(
            "text-base px-6 py-3 rounded-full font-semibold",
            isActiveHeader
              ? "bg-[hsl(166_37%_37%)] hover:bg-[hsl(166_37%_37%)]/90 text-[hsl(60_66%_98%)]"
              : "bg-[hsl(166_37%_37%)] hover:bg-[hsl(166_37%_37%)]/90 text-[hsl(60_66%_98%)]",
          )}
        >
          <Link href="/book">Reservar Cita</Link>
        </Button>
      </nav>

      {/* Mobile Menu */}
      <div className="md:hidden flex items-center">
        <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
          <SheetTrigger asChild>
            <Button
              variant="ghost"
              size="icon"
              className={isActiveHeader ? "text-[hsl(0_0%_17%)]" : "text-[hsl(60_66%_98%)]"}
            >
              <Menu className="h-6 w-6" />
              <span className="sr-only">Toggle navigation menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="right" className="w-[250px] sm:w-[300px] bg-[hsl(60_66%_98%)] p-6">
            <SheetTitle className="sr-only">Título accesible</SheetTitle>
            <div className="flex flex-col gap-4 pt-8">
              {/* Mobile Nav Links */}
              <Link
                href="/"
                className="text-lg font-medium text-[hsl(0_0%_17%)] hover:text-[hsl(166_37%_37%)] transition-colors"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Inicio
              </Link>
              <Link
                href="/services"
                className="text-lg font-medium text-[hsl(0_0%_17%)] hover:text-[hsl(166_37%_37%)] transition-colors"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Servicios
              </Link>
              <Link
                href="/book"
                className="text-lg font-medium text-[hsl(0_0%_17%)] hover:text-[hsl(166_37%_37%)] transition-colors"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Reservar
              </Link>
              <Link
                href="/visagismo"
                className="text-lg font-medium text-[hsl(0_0%_17%)] hover:text-[hsl(166_37%_37%)] transition-colors"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Visagismo
              </Link>
              <Link
                href="/admin"
                className="text-lg font-medium text-[hsl(0_0%_17%)] hover:text-[hsl(166_37%_37%)] transition-colors"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Admin
              </Link>
              <Button
                asChild
                className="mt-4 bg-[hsl(166_37%_37%)] hover:bg-[hsl(166_37%_37%)]/90 text-[hsl(60_66%_98%)] text-base py-3 rounded-full"
              >
                <Link href="/book" onClick={() => setIsMobileMenuOpen(false)}>
                  Reservar Cita
                </Link>
              </Button>
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  )
}
