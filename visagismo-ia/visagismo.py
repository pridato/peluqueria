import numpy as np
from consts import LANDMARKS, FACE_SHAPES, RECOMMENDATIONS


def euclidean_distance(p1, p2):
    """
    Calcula la distancia euclidiana entre dos puntos.

    Args:
        p1: diccionario con las coordenadas del punto 1
        p2: diccionario con las coordenadas del punto 2

    Returns:
        float: distancia euclidiana entre los dos puntos
    """
    return np.sqrt((p1['x'] - p2['x'])**2 + (p1['y'] - p2['y'])**2)


def analyze_face_shape(landmarks):
    """
    Analiza la forma del rostro en función de los puntos de referencia de la cara.

    Args:
        landmarks: lista de diccionarios con las coordenadas de los puntos de referencia de la cara

    Returns:
        dict: diccionario con la forma del rostro y su descripción
        - shape: forma del rostro
        - description: descripción de la forma del rostro
    """
    # Extrae los puntos clave de la cara
    chin = landmarks[LANDMARKS["chin"]]
    forehead = landmarks[LANDMARKS["forehead"]]
    left_cheek = landmarks[LANDMARKS["left_cheek"]]
    right_cheek = landmarks[LANDMARKS["right_cheek"]]
    left_jaw = landmarks[LANDMARKS["left_jaw"]]
    right_jaw = landmarks[LANDMARKS["right_jaw"]]
    left_temple = landmarks[LANDMARKS["left_temple"]]
    right_temple = landmarks[LANDMARKS["right_temple"]]

    # Calcula distancias principales (longitud, anchura, anchura de la barbilla, anchura de los pómulos)
    face_length = euclidean_distance(chin, forehead)
    face_width = euclidean_distance(left_cheek, right_cheek)
    jaw_width = euclidean_distance(left_jaw, right_jaw)
    temple_width = euclidean_distance(left_temple, right_temple)

    # calculamos el ratio de la longitud de la cara con respecto a su anchura
    ratio = face_length / face_width

    if ratio > 1.5:
        shape = "alargado"
    elif abs(face_length - face_width) < 0.1 * face_length:
        shape = "redondo"
    elif jaw_width > temple_width:
        shape = "triangular"
    elif temple_width > jaw_width:
        shape = "corazón"
    else:
        shape = "ovalado"

    # devolvemos un diccionario con la forma del rostro y su descripción
    return {
        "shape": shape,
        "description": FACE_SHAPES[shape],
        "recommendations": RECOMMENDATIONS[shape]
    }
