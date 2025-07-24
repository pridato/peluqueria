from fastapi import FastAPI, File, UploadFile
from fastapi.responses import JSONResponse

app = FastAPI()


@app.post("/analyze")
async def analyze_image(file: UploadFile = File(...)):
    """
    Analiza una imagen enviada por el usuario para realizar recomendaciones de visagismo.

    Parámetros:
    -----------
    file : UploadFile
        Imagen 
    Retorna:
    --------
    JSONResponse
        Respuesta en formato JSON que indica el estado de la operación, un mensaje de confirmación
        y una recomendación de corte y color de cabello basada en el análisis (actualmente ejemplo).

    Notas:
    ------
    - En esta versión, la función solo devuelve una respuesta de ejemplo.
    - En el futuro, aquí se implementará el procesamiento real de la imagen y el análisis de visagismo.
    """
    return JSONResponse({
        "status": "ok",
        "message": "Imagen recibida correctamente",
        "recomendacion": "Corte recomendado: Bob, Color: Rubio cálido"
    })
