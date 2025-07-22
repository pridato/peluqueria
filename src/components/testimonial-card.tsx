import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Star } from "lucide-react"
import type { Testimonial } from "@/lib/types"
import Image from "next/image" // Importar Image

/**
 * TestimonialCard Componente que muestra un testimonio de cliente
 * @param testimonial - Objeto que contiene la información del testimonio
 */
export default function TestimonialCard({ testimonial }: { testimonial: Testimonial }) {
    return (
        <Card className="flex flex-col h-full p-6 bg-white rounded-xl shadow-md transition-all duration-300 hover:shadow-lg hover:scale-[1.02]">
            <CardHeader className="pb-4">
                <div className="flex items-center gap-3 mb-3">
                    <Image
                        src={testimonial.avatar || "/placeholder.svg?height=48&width=48&text=Avatar"} // Usar avatar o placeholder
                        alt={`Avatar de ${testimonial.name}`}
                        width={48}
                        height={48}
                        className="rounded-full object-cover border-2 border-primary"
                    />
                    <div>
                        <p className="font-semibold text-lg text-gray-800">{testimonial.name}</p>
                        <CardTitle className="flex items-center gap-0.5 text-base">
                            {Array.from({ length: testimonial.rating }).map((_, i) => (
                                <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                            ))}
                            {Array.from({ length: 5 - testimonial.rating }).map((_, i) => (
                                <Star key={i} className="h-4 w-4 text-gray-300" />
                            ))}
                        </CardTitle>
                    </div>
                </div>
            </CardHeader>
            <CardContent className="flex-1">
                <p className="text-gray-700 italic leading-relaxed">{testimonial.text}</p>
            </CardContent>
        </Card>
    )
}
