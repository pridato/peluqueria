from fastapi import FastAPI, File, UploadFile
from fastapi.responses import JSONResponse
from face_detection import detect_face_landmarks
from visagismo import analyze_face_shape

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
        - face_shape: forma del rostro
        - description: descripción de la forma del rostro
    """
    # leemos la imagen y la convertimos a bytes
    image_bytes = await file.read()

    # detectamos la cara y obtenemos sus puntos de referencia
    result = detect_face_landmarks(image_bytes)

    # si no se detecta una cara, devolvemos un error
    if not result["face_detected"]:
        return JSONResponse({"status": "error", "message": "No se detectó una cara en la imagen."}, status_code=400)

    # analizamos la forma del rostro
    analysis = analyze_face_shape(result["landmarks"])

    # devolvemos un diccionario con los resultados
    return JSONResponse({
        "status": "ok",
        "message": "Cara detectada correctamente.",
        "landmarks": result["landmarks"],
        "face_shape": analysis["shape"],
        "description": analysis["description"]
    })
