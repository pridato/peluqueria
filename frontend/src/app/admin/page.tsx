"use client"

import type React from "react"

import { useState } from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { LogIn } from "lucide-react"
import DashboardBlock from "@/components/dashboardBlock";

/**
 * Página de administración que permite a los usuarios iniciar sesión
 * @constructor
 */
export default function AdminPage() {

    // estados para manejar el login
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const [loggedIn, setLoggedIn] = useState(false)
    const [error, setError] = useState("")

    /**
     * Maneja el evento de inicio de sesión.
     * @param e Evento de formulario.
     */
    const handleLogin = (e: React.FormEvent) => {
        e.preventDefault()
        setError("")

        // hace una verificación simple de usuario y contraseña
        if (username === "admin" && password === "admin123") {
            setLoggedIn(true)
        } else {
            setError("Usuario o contraseña incorrectos.")
        }
    }

    // Si el usuario está logueado, muestra el dashboard de administración
    if (loggedIn) {
        return (
            <section className="py-16 md:py-24 bg-muted">
                <div className="container px-4 md:px-6">
                    <DashboardBlock />
                </div>
            </section>
        )
    }

    return (
        <DashboardBlock/>
    )

    /**
    // Si no está logueado, muestra el formulario de inicio de sesión
    return (
        <section className="py-16 md:py-24 bg-muted flex items-center justify-center">
            <div className="w-full max-w-sm p-6 border rounded-lg shadow-lg bg-white space-y-6">
                <h2 className="text-2xl font-bold text-center text-gray-800 flex items-center justify-center gap-2">
                    <LogIn className="h-6 w-6" /> Acceso al Panel de Administración
                </h2>
                <form onSubmit={handleLogin} className="space-y-4">
                    <div>
                        <Label htmlFor="username">Usuario</Label>
                        <Input
                            id="username"
                            type="text"
                            placeholder="admin"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            required
                        />
                    </div>
                    <div>
                        <Label htmlFor="password">Contraseña</Label>
                        <Input
                            id="password"
                            type="password"
                            placeholder="admin123"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>
                    {error && <p className="text-red-500 text-sm text-center">{error}</p>}
                    <Button type="submit" className="w-full">
                        Iniciar Sesión
                    </Button>
                </form>
                <p className="text-sm text-muted-foreground text-center">
                    Usa &#34;admin&#34; como usuario y &#34;admin123&#34; como contraseña para acceder.
                </p>
            </div>
        </section>
    )

     */
}