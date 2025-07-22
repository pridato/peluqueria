"use client"

import { services } from "@/lib/data"
import ServiceCard from "@/components/service-card"
import { motion } from "framer-motion"

/**
 * Página de servicios que muestra una lista de servicios disponibles
 * @constructor
 */
export default function ServicesPage() {
    return (
        <section className="py-16 md:py-24 bg-white">
            <div className="px-4 md:px-6 text-center">
                <h1 className="text-4xl md:text-5xl font-bold mb-4 text-gray-800">Nuestros Servicios</h1>
                <p className="text-lg text-muted-foreground max-w-3xl mx-auto mb-12">
                    Descubre la gama completa de tratamientos y cortes que ofrecemos para realzar tu estilo.
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                    {services.map((service, index) => (
                        <motion.div
                            key={service.id}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                        >
                            <ServiceCard service={service} />
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    )
}
