"use client"

import Link from "next/link"
import type React from "react"
import { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Loader2, XCircle } from "lucide-react"
import Image from "next/image"
import { motion } from "framer-motion"
import { API_URL } from "@/lib/consts"

export default function VisagismoPage() {

  // Estados de la aplicación
  const [selectedFile, setSelectedFile] = useState<File | null>(null)
  const [previewUrl, setPreviewUrl] = useState<string | null>(null)
  const [processing, setProcessing] = useState(false)
  const [resultImage, setResultImage] = useState<string | null>(null)
  const [faceShape, setFaceShape] = useState<string | null>(null)
  const [recommendedCut, setRecommendedCut] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [landmarks, setLandmarks] = useState<{ x: number; y: number; z: number }[] | null>(null)
  const [description, setDescription] = useState<string | null>(null)
  const [finalImageUrl, setFinalImageUrl] = useState<string | null>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  
  /**
   * Maneja el cambio de archivo seleccionado
   * @param event Evento de cambio de archivo
   */
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      const file = event.target.files[0]
      setSelectedFile(file)
      setPreviewUrl(URL.createObjectURL(file))
      setResultImage(null)
      setFaceShape(null)
      setRecommendedCut(null)
      setError(null)
      setLandmarks(null)
    } else {
      setSelectedFile(null)
      setPreviewUrl(null)
    }
  }

  /**
   * Maneja el envío de la imagen al backend
   * @returns void
   */
  const handleUpload = async () => {
    // Verifica si se ha seleccionado un archivo
    if (!selectedFile) {
      setError("Por favor, selecciona una imagen para analizar.")
      return
    }

    // Establece el estado de procesamiento y limpia los estados anteriores
    setProcessing(true)
    setError(null)
    setResultImage(null)
    setFaceShape(null)
    setRecommendedCut(null)
    setLandmarks(null)
    setFinalImageUrl(null)

    // Crea un objeto FormData para enviar la imagen al backend
    const formData = new FormData()
    formData.append("file", selectedFile)

    // Intenta enviar la imagen al backend
    try {
      const response = await fetch(`${API_URL}/analyze`, {
        method: "POST",
        body: formData,
      })

      // Si la respuesta no es exitosa, lanza un error
      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.error || "Error al procesar la imagen.")
      }

      // Si la respuesta es exitosa, procesa los datos
      const data = await response.json()
      
      setResultImage(previewUrl)
      setFaceShape(data.face_shape)
      setRecommendedCut(data.recommendations[0])
      setLandmarks(data.landmarks)
      setDescription(data.description)

    } catch (err: unknown) {
      // Manejo de errores: se asume que err es de tipo unknown
      if (err instanceof Error) {
        setError(err.message || "Ocurrió un error inesperado durante el análisis.")
      } else {
        setError("Ocurrió un error inesperado durante el análisis.")
      }
      console.error("Visagismo API error:", err)
    } finally {
      setProcessing(false)
      // Limpia el campo de entrada de archivo después de procesar
      if (fileInputRef.current) {
        fileInputRef.current.value = ""
      }

      // Limpia los estados de la aplicación
      setSelectedFile(null)
      setPreviewUrl(null)
    }
  }


  return (
    <section className="py-16 md:py-24 bg-[hsl(60_66%_98%)] flex items-center justify-center min-h-[calc(100vh-128px)]">
      <div className="container px-4 md:px-6 text-center max-w-4xl">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
          <h1 className="text-4xl md:text-5xl font-bold mb-4 text-[hsl(0_0%_17%)]">Visagismo Digital</h1>
          <p className="text-lg text-[hsl(0_0%_17%)] max-w-2xl mx-auto mb-12">
            Descubre la forma de tu rostro y el corte de pelo ideal para ti con nuestra herramienta de análisis facial.
          </p>
        </motion.div>

        <Card className="p-6 md:p-8 bg-[hsl(60_66%_98%)] shadow-lg border-[hsl(0_0%_88%)]">
          <CardHeader className="pb-4">
            <CardTitle className="text-2xl font-bold text-[hsl(0_0%_17%)]">Sube tu Foto</CardTitle>
            <CardDescription className="text-[hsl(0_0%_17%)]">
              Asegúrate de que sea una foto de frente, con buena iluminación y sin obstáculos en el rostro.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid w-full max-w-sm items-center gap-1.5 mx-auto">
              <Label htmlFor="picture" className="text-[hsl(0_0%_17%)] font-medium">
                Imagen de Perfil
              </Label>
              <Input
                id="picture"
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                ref={fileInputRef}
                className="file:text-[hsl(166_37%_37%)] file:bg-[hsl(166_37%_37%)]/10 file:border-[hsl(166_37%_37%)] file:hover:bg-[hsl(166_37%_37%)]/20 file:transition-colors"
              />
            </div>

            {previewUrl && (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
                className="mt-6 flex flex-col items-center"
              >
                <h3 className="text-xl font-semibold text-[hsl(0_0%_17%)] mb-4">Vista Previa:</h3>
                <div className="relative w-64 h-64 md:w-80 md:h-80 rounded-lg overflow-hidden border-2 border-[hsl(166_37%_37%)] shadow-md">
                  <Image
                    src={previewUrl || "/placeholder.svg"}
                    alt="Vista previa de la imagen"
                    layout="fill"
                    objectFit="cover"
                  />
                </div>
              </motion.div>
            )}

            {error && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="flex items-center gap-3 p-4 bg-[hsl(0_84.2%_60.2%)]/10 text-[hsl(0_84.2%_60.2%)] rounded-lg border border-[hsl(0_84.2%_60.2%)] mt-6"
              >
                <XCircle className="h-6 w-6" />
                <span className="font-medium">{error}</span>
              </motion.div>
            )}

            <Button
              onClick={handleUpload}
              disabled={!selectedFile || processing}
              className="w-full max-w-xs bg-[hsl(166_37%_37%)] hover:bg-[hsl(166_37%_37%)]/90 text-[hsl(60_66%_98%)] text-lg py-3 rounded-lg shadow-md flex items-center justify-center gap-2 mt-6 mx-auto"
            >
              {processing && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              {processing ? "Analizando..." : "Analizar Rostro"}
            </Button>

            {resultImage && faceShape && recommendedCut && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.2 }}
                className="mt-12 p-6 bg-[hsl(60_66%_98%)] rounded-xl border border-[hsl(0_0%_88%)] text-left space-y-6"
              >
                <h3 className="text-2xl font-bold text-[hsl(0_0%_17%)] text-center mb-4">Tu Análisis de Visagismo</h3>
                <div className="flex flex-col md:flex-row items-center md:items-start gap-8">
                  <div className="relative w-64 h-64 md:w-72 md:h-72 flex-shrink-0 rounded-lg overflow-hidden border-2 border-[hsl(166_37%_37%)] shadow-lg">
                    <Image
                      src={resultImage || "/placeholder.svg"}
                      alt="Resultado del análisis"
                      layout="fill"
                      objectFit="cover"
                    />
                  </div>
                  <div className="space-y-4 text-center md:text-left">
                    <p className="text-lg text-[hsl(0_0%_17%)]">
                      <span className="font-semibold text-[hsl(166_37%_37%)]">Forma de tu Rostro:</span> {faceShape}
                    </p>
                    <p className="text-lg text-[hsl(0_0%_17%)]">
                      <span className="font-semibold text-[hsl(166_37%_37%)]">Corte Recomendado:</span> {recommendedCut}
                    </p>
                    <Button
                      asChild
                      className="mt-4 bg-[hsl(166_37%_37%)] hover:bg-[hsl(166_37%_37%)]/90 text-[hsl(60_66%_98%)]"
                    >
                      <Link href="/book">Reservar Cita para tu Nuevo Look</Link>
                    </Button>
                  </div>
                </div>
              </motion.div>
            )}
          </CardContent>
        </Card>
      </div>
    </section>
  )
}