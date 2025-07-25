"use client"

import {Suspense} from "react";
import BookClient from "@/components/bookClient";

/**
 * Componente de página para la reserva de citas.
 * @constructor
 */
export default function BookPage() {
    return (
        <section className="py-16 md:py-24 bg-[hsl(60_66%_98%)]">
            <div className="px-4 md:px-6 flex justify-center">
                <Suspense fallback={<p>Cargando formulario de reserva...</p>}>
                    <BookClient />
                </Suspense>
            </div>
        </section>
    )
}