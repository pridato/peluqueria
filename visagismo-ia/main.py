from fastapi import FastAPI, File, UploadFile
from fastapi.responses import JSONResponse
from face_detection import detect_face_landmarks

app = FastAPI()


@app.post("/analyze")
async def analyze_image(file: UploadFile = File(...)):
    """
    Analiza una imagen enviada por el usuario para detectar si hay una cara y obtener sus puntos de referencia.

    Args:
        file: UploadFile
        Imagen

    Returns:
        JSONResponse
        - status: "ok" si se detecta una cara y se obtienen sus puntos de referencia
        - status: "error" si no se detecta una cara
        - message: mensaje de confirmación o error
        - landmarks: lista de diccionarios con las coordenadas de los puntos de referencia de la cara
    """
    image_bytes = await file.read()
    result = detect_face_landmarks(image_bytes)
    if not result["face_detected"]:
        return JSONResponse({"status": "error", "message": "No se detectó una cara en la imagen."}, status_code=400)
    return JSONResponse({
        "status": "ok",
        "message": "Cara detectada correctamente.",
        "landmarks": result["landmarks"]
    })
