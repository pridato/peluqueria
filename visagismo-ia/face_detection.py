import cv2
import numpy as np
import mediapipe as mp

mp_face_mesh = mp.solutions.face_mesh  # type: ignore


def detect_face_landmarks(image_bytes):
    """
    Detecta los puntos de referencia de la cara en una imagen.

    Args:
        image_bytes: bytes de la imagen a procesar

    Nota:
        Los landmarks son puntos de referencia de la cara. Existen 468 puntos de referencia.

    Returns:
        dict: diccionario con las coordenadas de los puntos de referencia de la cara
        - face_detected: booleano que indica si se ha detectado una cara
        - landmarks: lista de diccionarios con las coordenadas de los puntos de referencia de la cara
        - landmarks[0]: diccionario con las coordenadas de los puntos de referencia de la cara
        - landmarks[0]['x']: coordenada x del punto de referencia de la cara
        - landmarks[0]['y']: coordenada y del punto de referencia de la cara
    """
    # cast de imagen cruda (png) a array de 1D y luego a array de 3D (BGR)
    nparr = np.frombuffer(image_bytes, np.uint8)
    img = cv2.imdecode(nparr, cv2.IMREAD_COLOR)

    # si la imagen es None, devolvemos un diccionario con face_detected a False y landmarks a None
    if img is None:
        return {"face_detected": False, "landmarks": None}

    # creamos una instancia de FaceMesh con static_image_mode a True (imagen estática)
    with mp_face_mesh.FaceMesh(static_image_mode=True) as face_mesh:

        # procesamos la imagen y los guardamos en results con formato RGB
        results = face_mesh.process(cv2.cvtColor(img, cv2.COLOR_BGR2RGB))

        # si no se ha detectado ninguna cara, devolvemos un diccionario con face_detected a False y landmarks a None
        if not results.multi_face_landmarks:
            return {"face_detected": False, "landmarks": None}

        # creamos una lista de diccionarios con las coordenadas de los puntos de referencia de la cara
        landmarks = [
            {"x": lm.x, "y": lm.y, "z": lm.z}
            for lm in results.multi_face_landmarks[0].landmark
        ]

        # devolvemos un diccionario con face_detected a True y landmarks con las coordenadas de los puntos de referencia de la cara
        return {"face_detected": True, "landmarks": landmarks}
