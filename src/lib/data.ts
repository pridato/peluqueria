import type { Service, Testimonial, Booking } from "./types"

export const services: Service[] = [
    {
        id: "corte-caballero",
        name: "Corte de Caballero",
        description: "Corte de pelo clásico o moderno, incluye lavado y peinado.",
        price: 25,
        duration: 30,
    },
    {
        id: "corte-dama",
        name: "Corte de Dama",
        description: "Corte de pelo personalizado, incluye lavado, tratamiento y peinado.",
        price: 40,
        duration: 60,
    },
    {
        id: "coloracion",
        name: "Coloración Completa",
        description: "Aplicación de color en todo el cabello, incluye lavado y secado.",
        price: 70,
        duration: 120,
    },
    {
        id: "mechas",
        name: "Mechas / Reflejos",
        description: "Técnica de mechas para iluminar o dar profundidad al cabello.",
        price: 90,
        duration: 150,
    },
    {
        id: "arreglo-barba",
        name: "Arreglo de Barba",
        description: "Recorte y perfilado de barba, incluye toalla caliente y bálsamo.",
        price: 20,
        duration: 20,
    },
    {
        id: "lavado-peinado",
        name: "Lavado y Peinado",
        description: "Lavado profesional y peinado para cualquier ocasión.",
        price: 20,
        duration: 30,
    },
]

export const testimonials: Testimonial[] = [
    {
        id: "1",
        name: "Ana García",
        text: "¡Excelente servicio! Siempre salgo feliz con mi corte y color. El personal es muy amable y profesional.",
        rating: 5,
        avatar: "",
    },
    {
        id: "2",
        name: "Juan Pérez",
        text: "El mejor lugar para un buen corte de barba. Ambiente agradable y atención impecable.",
        rating: 5,
        avatar: "",
    },
    {
        id: "3",
        name: "María López",
        text: "Me encanta cómo me dejan el cabello. Son muy detallistas y siempre aciertan con lo que quiero.",
        rating: 4,
        avatar: "",
    },
    {
        id: "4",
        name: "Carlos Ruiz",
        text: "Rápido, eficiente y con un resultado perfecto. Muy recomendable para cualquier caballero.",
        rating: 5,
        avatar: "",
    },
    {
        id: "5",
        name: "Sofía Hernández",
        text: "Un ambiente muy relajante y un resultado espectacular. ¡Volveré sin duda!",
        rating: 5,
        avatar: "",
    },
    {
        id: "6",
        name: "Pedro Gómez",
        text: "Profesionales de verdad. Mi barba nunca había lucido tan bien. ¡Gracias!",
        rating: 5,
        avatar: "",
    },
]

// por el momento, las reservas son un array mutable que se puede modificar en la sesión
// en un futuro se podría implementar una base de datos o almacenamiento persistente
export const bookings: Booking[] = []