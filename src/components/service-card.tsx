import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import type { Service } from "@/lib/types"
import { Clock, DollarSign } from "lucide-react"

/**
 * ServiceCard Componente que muestra los detalles de un servicio
 * @param service - Objeto que contiene la información del servicio
 */
export default function ServiceCard({ service }: { service: Service }) {
    return (
        <Card className="flex flex-col h-full transition-all duration-300 hover:shadow-xl hover:scale-[1.02]">
            <CardHeader>
                <CardTitle className="text-2xl font-bold text-primary mb-2">{service.name}</CardTitle>
            </CardHeader>
            <CardContent className="flex-1">
                <p className="text-muted-foreground mb-4 text-base">{service.description}</p>
                <div className="flex items-center gap-2 text-gray-800 mb-2">
                    <DollarSign className="h-5 w-5 text-green-600" />
                    <span className="text-xl font-bold">{service.price.toFixed(2)} €</span>
                </div>
                <div className="flex items-center gap-2 text-gray-800">
                    <Clock className="h-5 w-5 text-blue-600" />
                    <span className="text-xl font-semibold">{service.duration} min</span>
                </div>
            </CardContent>
            <CardFooter>
                <Button asChild className="w-full bg-primary hover:bg-primary/90 text-white text-base py-6">
                    <Link href={`/book?serviceId=${service.id}`}>Reservar Ahora</Link>
                </Button>
            </CardFooter>
        </Card>
    )
}
