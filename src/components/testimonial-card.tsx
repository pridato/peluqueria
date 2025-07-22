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
                    {testimonial.avatar ? (
                        <Image
                            src={testimonial.avatar}
                            alt={`Avatar de ${testimonial.name}`}
                            width={48}
                            height={48}
                            className="rounded-full object-cover border-2 border-primary"
                        />
                    ) : (
                        <div className="w-12 h-12 flex items-center justify-center rounded-full border-2 border-primary bg-gray-100 text-primary">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                strokeWidth={1.5}
                                stroke="currentColor"
                                className="w-6 h-6"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M17.982 18.725A7.488 7.488 0 0 0 12 15.75a7.488 7.488 0 0 0-5.982 2.975m11.963 0a9 9 0 1 0-11.963 0m11.963 0A8.966 8.966 0 0 1 12 21a8.966 8.966 0 0 1-5.982-2.275M15 9.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
                                />
                            </svg>
                        </div>
                    )}

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
