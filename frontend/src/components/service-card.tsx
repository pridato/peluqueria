import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import type { Service } from "@/lib/types"
import {Clock, HandCoins} from "lucide-react"

/**
 * ServiceCard Componente que muestra los detalles de un servicio
 * @param service - Objeto que contiene la información del servicio
 */
export default function ServiceCard({ service }: { service: Service }) {
    return (
        <Card className="flex flex-col h-full transition-all duration-300 hover:scale-[1.01] bg-[hsl(60_66%_98%)] border-[hsl(0_0%_88%)]">
            <CardHeader>
                <CardTitle className="text-2xl font-bold text-[hsl(166_37%_37%)] mb-2">{service.name}</CardTitle>
            </CardHeader>
            <CardContent className="flex-1">
                <p className="text-[hsl(0_0%_17%)] mb-4 text-base">{service.description}</p>
                <div className="flex items-center gap-2 text-[hsl(0_0%_17%)] mb-2">
                    <HandCoins className="h-5 w-5 text-[hsl(166_37%_37%)]" />
                    <span className="text-xl font-bold">{service.price.toFixed(2)} €</span>
                </div>
                <div className="flex items-center gap-2 text-[hsl(0_0%_17%)]">
                    <Clock className="h-5 w-5 text-[hsl(166_37%_37%)]" />
                    <span className="text-xl font-semibold">{service.duration} min</span>
                </div>
            </CardContent>
            <CardFooter>
                <Button asChild className="w-full bg-[#f7ecd7] hover:bg-[#e9dcc2] text-[#3b7c71] text-lg py-6">
                    <Link href={`/book?serviceId=${service.id}`}>Reservar Ahora</Link>
                </Button>
            </CardFooter>
        </Card>
    )
}
