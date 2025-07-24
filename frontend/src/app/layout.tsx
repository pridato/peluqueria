import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import Header from "@/components/header"
import Footer from "@/components/footer"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
    title: "La Barbería Elegante - Tu Estilo, Nuestra Pasión",
    description: "Peluquería y barbería moderna con los mejores servicios y atención personalizada.",
}

export default function RootLayout({
                                       children,
                                   }: Readonly<{
    children: React.ReactNode
}>) {
    return (
        <html lang="es">
        <body className={`${inter.className} flex flex-col min-h-[100dvh]`}>
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
        </body>
        </html>
    )
}
