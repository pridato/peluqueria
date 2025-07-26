"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import TestimonialCard from "@/components/testimonial-card"
import ServiceCard from "@/components/service-card"
import { motion } from "framer-motion"
import { useRef, useEffect, useState } from "react"
import { Camera, ChevronLeft, ChevronRight, Sparkles, Users } from "lucide-react"
import { testimonials, services, teamMembers } from "@/lib/data"
import { Lora } from 'next/font/google'

const lora = Lora({
  subsets: ['latin'],
  weight: ['700'],
  variable: '--font-lora',
})

export default function HomePage() {
  const testimonialsRef = useRef<HTMLDivElement>(null)
  const [scrollInterval, setScrollInterval] = useState<NodeJS.Timeout | null>(null)

  /**
   * Al hacer click en el botón de scroll, se desplaza el carrusel de testimonios
   * @param direction - "left" o "right"
   */
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

  /**
   * Inicia el auto-scroll del carrusel de testimonios
   */
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

  /**
   * Detiene el auto-scroll del carrusel de testimonios
   */
  const stopAutoScroll = () => {
    if (scrollInterval) {
      clearInterval(scrollInterval)
      setScrollInterval(null)
    }
  }

  /**
   * Inicia el auto-scroll del carrusel de testimonios al montar el componente
   */
  useEffect(() => {
    startAutoScroll() // Start auto-scroll on mount
    return () => stopAutoScroll() // Clean up on unmount
  }, [])

  /**
   * Pausa el auto-scroll del carrusel de testimonios al pasar el mouse sobre el carrusel
   */
  const handleMouseEnter = () => {
    stopAutoScroll()
  }

  /**
   * Reanuda el auto-scroll del carrusel de testimonios al salir del mouse del carrusel
   */
  const handleMouseLeave = () => {
    startAutoScroll()
  }

  return (
      <>
        {/* Hero Section */}
        <section className="relative w-full h-[600px] md:h-[700px] lg:h-[900px] overflow-hidden flex items-center justify-center bg-[hsl(60_66%_98%)]">
        <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="relative z-20 flex flex-col items-center justify-center h-full text-center max-w-4xl"
          >
            <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight mb-6 drop-shadow-lg leading-tight text-center">
              Transforma tu Estilo en <br />
              <span className={`text-[#3b7c71] ${lora.className}`}>
                La Barbería Elegante
              </span>
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
                  className="bg-[#4ea69a] hover:bg-[#3b7c71] text-white text-xl px-10 py-7 rounded-full shadow-xl transition-transform transform hover:scale-105 focus:ring-4 focus:ring-primary/50"
              >
                <Link href="/book" className="text-white">Reservar Cita Ahora</Link>
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

        {/* Visagismo Section */}
        <section className="py-16 md:py-24 bg-[hsl(60_66%_98%)]">
          <div className="px-4 md:px-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center max-w-6xl mx-auto">
              {/* Content Side */}
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.8 }}
                className="space-y-6"
              >
                <div className="flex items-center gap-3 mb-4">
                  <Sparkles className="h-8 w-8 text-[hsl(166_37%_37%)]" />
                  <h2 className="text-4xl md:text-5xl font-bold text-[hsl(0_0%_17%)]">Visagismo Digital</h2>
                </div>
                <p className="text-xl text-[hsl(0_0%_17%)] leading-relaxed">
                  Descubre el corte perfecto para tu rostro con nuestra tecnología de análisis facial avanzada.
                </p>
                <div className="space-y-4">
                  <div className="flex items-start gap-4">
                    <Camera className="h-6 w-6 text-[hsl(166_37%_37%)] mt-1 flex-shrink-0" />
                    <div>
                      <h3 className="font-semibold text-[hsl(0_0%_17%)] text-lg">Análisis Facial Inteligente</h3>
                      <p className="text-[hsl(0_0%_17%)]">
                        Sube tu foto y nuestro sistema analizará la forma de tu rostro para recomendarte el corte ideal.
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <Users className="h-6 w-6 text-[hsl(166_37%_37%)] mt-1 flex-shrink-0" />
                    <div>
                      <h3 className="font-semibold text-[hsl(0_0%_17%)] text-lg">Recomendaciones Personalizadas</h3>
                      <p className="text-[hsl(0_0%_17%)]">
                        Recibe sugerencias específicas basadas en tu tipo de rostro y preferencias de estilo.
                      </p>
                    </div>
                  </div>
                </div>
                <div className="flex flex-col sm:flex-row gap-4 pt-4">
                  <Button
                    asChild
                    className="bg-[hsl(166_37%_37%)] hover:bg-[hsl(166_37%_37%)]/90 text-[hsl(60_66%_98%)] text-lg px-8 py-6 rounded-full shadow-lg"
                  >
                    <Link href="/visagismo">Probar Visagismo</Link>
                  </Button>
                  <Button
                    asChild
                    variant="outline"
                    className="border-[hsl(166_37%_37%)] text-[hsl(166_37%_37%)] hover:bg-[hsl(166_37%_37%)] hover:text-[hsl(60_66%_98%)] text-lg px-8 py-6 rounded-full bg-transparent"
                  >
                    <Link href="/book">Reservar Consulta</Link>
                  </Button>
                </div>
              </motion.div>

              {/* Visual Side */}
              <motion.div
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="relative"
              >
                <div className="relative bg-gradient-to-br from-[hsl(166_37%_37%)] to-[hsl(166_37%_30%)] rounded-2xl p-8 shadow-2xl">
                  <div className="grid grid-cols-2 gap-4 mb-6">
                    <div className="bg-[hsl(60_66%_98%)] rounded-lg p-4 text-center shadow-md">
                      <div className="w-16 h-16 bg-[hsl(166_37%_37%)] rounded-full mx-auto mb-2 flex items-center justify-center">
                        <span className="text-[hsl(60_66%_98%)] font-bold text-lg">1</span>
                      </div>
                      <p className="text-[hsl(0_0%_17%)] font-medium text-sm">Sube tu Foto</p>
                    </div>
                    <div className="bg-[hsl(60_66%_98%)] rounded-lg p-4 text-center shadow-md">
                      <div className="w-16 h-16 bg-[hsl(166_37%_37%)] rounded-full mx-auto mb-2 flex items-center justify-center">
                        <span className="text-[hsl(60_66%_98%)] font-bold text-lg">2</span>
                      </div>
                      <p className="text-[hsl(0_0%_17%)] font-medium text-sm">Análisis IA</p>
                    </div>
                    <div className="bg-[hsl(60_66%_98%)] rounded-lg p-4 text-center shadow-md">
                      <div className="w-16 h-16 bg-[hsl(166_37%_37%)] rounded-full mx-auto mb-2 flex items-center justify-center">
                        <span className="text-[hsl(60_66%_98%)] font-bold text-lg">3</span>
                      </div>
                      <p className="text-[hsl(0_0%_17%)] font-medium text-sm">Recomendación</p>
                    </div>
                    <div className="bg-[hsl(60_66%_98%)] rounded-lg p-4 text-center shadow-md">
                      <div className="w-16 h-16 bg-[hsl(166_37%_37%)] rounded-full mx-auto mb-2 flex items-center justify-center">
                        <span className="text-[hsl(60_66%_98%)] font-bold text-lg">4</span>
                      </div>
                      <p className="text-[hsl(0_0%_17%)] font-medium text-sm">¡Nuevo Look!</p>
                    </div>
                  </div>
                  <div className="text-center">
                    <div className="inline-block bg-[hsl(60_66%_98%)] rounded-full p-6 shadow-lg">
                      <Camera className="h-12 w-12 text-[hsl(166_37%_37%)]" />
                    </div>
                    <p className="text-[hsl(60_66%_98%)] font-semibold mt-4 text-lg">Tecnología de Análisis Facial</p>
                  </div>
                </div>
                {/* Decorative elements */}
                <div className="absolute -top-4 -right-4 w-8 h-8 bg-[hsl(166_37%_37%)] rounded-full opacity-60"></div>
                <div className="absolute -bottom-4 -left-4 w-6 h-6 bg-[hsl(166_37%_37%)] rounded-full opacity-40"></div>
                <div className="absolute top-1/2 -left-6 w-4 h-4 bg-[hsl(166_37%_37%)] rounded-full opacity-30"></div>
              </motion.div>
            </div>
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

        {/* Team Section */}
        <section className="py-16 md:py-24 bg-white">
          <div className="px-4 md:px-6 text-center">
            <h2 className="text-4xl md:text-5xl font-bold mb-6 text-[hsl(0_0%_17%)]">Conoce a Nuestro Equipo</h2>
            <p className="text-lg text-text-[hsl(0_0%_17%)] max-w-3xl mx-auto mb-12">
              Nuestros expertos barberos y estilistas están listos para darte el mejor servicio.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
              {teamMembers.map((member, index) => (
                  <motion.div
                      key={member.id}
                      initial={{ opacity: 0, y: 50 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true, amount: 0.3 }}
                      transition={{ duration: 0.6, delay: index * 0.1 }}
                      className="flex flex-col items-center text-center p-4 bg-[hsl(60_66%_98%)] rounded-lg shadow-sm"
                  >
                    <div className="w-30 h-30 mb-4 flex items-center justify-center rounded-full bg-[hsl(166_37%_37%)] text-white text-5xl font-bold">
                      {member.name.charAt(0).toUpperCase()}
                    </div>

                    <h3 className="text-xl font-semibold text-gray-800 mb-1">{member.name}</h3>
                    <p className="text-[#4ea69a] font-medium">{member.role}</p>
                  </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Map Section */}
        <section className="py-16 md:py-24 bg-muted">
          <div className="px-4 md:px-6 text-center">
            <h2 className="text-4xl md:text-5xl font-bold mb-6 text-gray-800">Encuéntranos</h2>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto mb-12">
              Visítanos en nuestra ubicación. ¡Te esperamos!
            </p>
            <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.7 }}
                className="w-full max-w-4xl mx-auto rounded-xl overflow-hidden shadow-lg border border-gray-200"
            >
              <iframe
                  src="https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d6068.273006234794!2d-3.3523155468515804!3d40.49436445552421!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e0!3m2!1ses!2ses!4v1753263824103!5m2!1ses!2ses"
                  width="100%"
                  height="450"
                  style={{ border: 0 }}
                  allowFullScreen={true}
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Ubicación de La Barbería Elegante"
              ></iframe>
            </motion.div>
          </div>
        </section>
      </>
  )
}