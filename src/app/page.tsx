"use client"

import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { testimonials, services } from "@/lib/data"
import TestimonialCard from "@/components/testimonial-card"
import ServiceCard from "@/components/service-card"
import { motion } from "framer-motion"
import { useRef, useEffect, useState } from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"

export default function HomePage() {
  const testimonialsRef = useRef<HTMLDivElement>(null)
  const [scrollInterval, setScrollInterval] = useState<NodeJS.Timeout | null>(null)

  const scrollTestimonials = (direction: "left" | "right") => {
    if (testimonialsRef.current) {
      const firstChild = testimonialsRef.current.children[0] as HTMLElement
      if (!firstChild) return

      // Calculate item width including gap (gap-x-4 = 16px)
      const itemWidth = firstChild.offsetWidth + 16
      testimonialsRef.current.scrollBy({
        left: direction === "right" ? itemWidth : -itemWidth,
        behavior: "smooth",
      })
    }
  }

  const startAutoScroll = () => {
    if (scrollInterval) clearInterval(scrollInterval)
    const interval = setInterval(() => {
      if (testimonialsRef.current) {
        const { scrollWidth, clientWidth, scrollLeft } = testimonialsRef.current
        const firstChild = testimonialsRef.current.children[0] as HTMLElement
        if (!firstChild) return

        const itemWidth = firstChild.offsetWidth + 16 // item width + gap-x-4 (16px)

        // Check if we are at the end of the scrollable area (with a small tolerance)
        if (scrollLeft + clientWidth >= scrollWidth - 5) {
          testimonialsRef.current.scrollTo({ left: 0, behavior: "smooth" }) // Loop back to start
        } else {
          testimonialsRef.current.scrollBy({ left: itemWidth, behavior: "smooth" })
        }
      }
    }, 3000) // Scroll every 3 seconds
    setScrollInterval(interval)
  }

  const stopAutoScroll = () => {
    if (scrollInterval) {
      clearInterval(scrollInterval)
      setScrollInterval(null)
    }
  }

  useEffect(() => {
    startAutoScroll() // Start auto-scroll on mount
    return () => stopAutoScroll() // Clean up on unmount
  }, [])

  // Pause/resume on hover
  const handleMouseEnter = () => {
    stopAutoScroll()
  }

  const handleMouseLeave = () => {
    startAutoScroll()
  }

  return (
      <>
        {/* Hero Section */}
        <section className="relative w-full min-h-screen overflow-hidden flex items-center justify-center">
          <Image
              src="/placeholder.svg?height=800&width=1600&text=Peluqueria Elegante"
              alt="Fondo de Peluquería Elegante"
              layout="fill"
              objectFit="cover"
              quality={90}
              className="z-0 blur-sm scale-105" // Imagen desenfocada y ligeramente escalada
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent z-10" /> {/* Degradado suave */}
          <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="relative z-20 flex flex-col items-center justify-center h-full text-center text-white px-4 max-w-4xl"
          >
            <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight mb-6 drop-shadow-lg leading-tight">
              Transforma tu Estilo en <span className="text-primary-foreground">La Barbería Elegante</span>
            </h1>
            <p className="text-xl md:text-2xl max-w-3xl mb-10 drop-shadow-md font-light">
              Donde la tradición se encuentra con la modernidad. Expertos en cortes, coloración y cuidado de barba para un
              look impecable.
            </p>
            <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: 0.6, ease: "easeOut" }}
            >
              <Button
                  asChild
                  size="lg"
                  className="bg-primary hover:bg-primary/90 text-white text-xl px-10 py-7 rounded-full shadow-xl transition-transform transform hover:scale-105 focus:ring-4 focus:ring-primary/50"
              >
                <Link href="/book">Reservar Cita Ahora</Link>
              </Button>
            </motion.div>
          </motion.div>
        </section>

        {/* Services Section - Carrusel Horizontal */}
        <section className="py-16 md:py-24 bg-white">
          <div className="md:px-6 items-center text-center">
            <h2 className="text-4xl md:text-5xl font-bold mb-6 text-gray-800">Nuestros Servicios</h2>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto mb-12">
              Descubre la gama completa de tratamientos y cortes que ofrecemos para realzar tu estilo.
            </p>
            <div className="flex overflow-x-auto pb-6 snap-x snap-mandatory scroll-smooth no-scrollbar gap-x-4 px-4">
              {services.map((service, index) => (
                    <motion.div
                        key={service.id}
                        initial={{ opacity: 0, x: 50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true, amount: 0.3 }}
                        transition={{ duration: 0.6, delay: index * 0.1 }}
                        className="flex-shrink-0 snap-center w-full md:w-[calc(50%-8px)] lg:w-[calc(33.333%-10.666px)] xl:w-[calc(25%-12px)]"
                    >
                      <ServiceCard service={service} />
                    </motion.div>
                ))}
            </div>
            <Button
                asChild
                variant="outline"
                className="mt-12 text-lg px-8 py-6 bg-transparent border-gray-300 hover:bg-gray-50"
            >
              <Link href="/services">Ver Todos los Servicios</Link>
            </Button>
          </div>
        </section>

        {/* Testimonials Section - Carrusel Automático con Navegación */}
        <section className="py-16 md:py-24 bg-gray-50 relative">
          <div className="px-4 md:px-6 text-center">
            <h2 className="text-4xl md:text-5xl font-bold mb-6 text-gray-800">Lo que Dicen Nuestros Clientes</h2>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto mb-12">
              La satisfacción de nuestros clientes es nuestra mayor recompensa.
            </p>
            <div
                ref={testimonialsRef}
                className="flex overflow-x-auto pb-6 snap-x snap-mandatory scroll-smooth no-scrollbar gap-x-4 relative px-4 md:px-0" // Added px-4 for mobile padding
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
            >
              {testimonials.map((testimonial, index) => (
                  <motion.div
                      key={testimonial.id}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true, amount: 0.3 }}
                      transition={{ duration: 0.6, delay: index * 0.1 }}
                      className="flex-shrink-0 snap-center w-full md:w-[calc(50%-8px)] lg:w-[calc(33.333%-10.666px)] xl:w-[calc(25%-12px)]" // Responsive widths
                  >
                    <TestimonialCard testimonial={testimonial} />
                  </motion.div>
              ))}
            </div>
            {/* Navigation Buttons */}
            <Button
                variant="outline"
                size="icon"
                className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white z-30 rounded-full shadow-md hidden md:flex"
                onClick={() => scrollTestimonials("left")}
                aria-label="Scroll left"
            >
              <ChevronLeft className="h-6 w-6" />
            </Button>
            <Button
                variant="outline"
                size="icon"
                className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white z-30 rounded-full shadow-md hidden md:flex"
                onClick={() => scrollTestimonials("right")}
                aria-label="Scroll right"
            >
              <ChevronRight className="h-6 w-6" />
            </Button>
          </div>
        </section>
      </>
  )
}