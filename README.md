# Peluquería Inteligente

Plataforma moderna para gestión de una peluquería, compuesta por:

- **Frontend:** Aplicación web desarrollada con Next.js (React), ubicada en la carpeta `frontend/`.
- **Microservicio de Visagismo IA:** Servicio de análisis de imagen y recomendaciones personalizadas usando FastAPI (Python), ubicado en la carpeta `visagismo-ia/`.

---

## Estructura del proyecto

```
/
├── frontend/         # Aplicación web (Next.js)
├── visagismo-ia/     # Microservicio IA (FastAPI)
├── README.md         # Este archivo
└── ...
```

---

## Frontend (Next.js)

- **Ubicación:** `frontend/`
- **Tecnologías:** Next.js, React, TypeScript, TailwindCSS
- **Funcionalidad:** Permite a los usuarios reservar citas, ver servicios, testimonios y acceder a recomendaciones personalizadas de visagismo.

### Instalación y ejecución

```bash
cd frontend
npm install
npm run dev
```

La aplicación estará disponible en [http://localhost:3000](http://localhost:3000)

---

## Microservicio de Visagismo IA (FastAPI)

- **Ubicación:** `visagismo-ia/`
- **Tecnologías:** Python, FastAPI, Pillow, OpenCV, MediaPipe
- **Funcionalidad:** Recibe imágenes y devuelve recomendaciones de corte/color personalizadas según la forma del rostro detectada.

### Instalación y ejecución

```bash
cd visagismo-ia
python3 -m venv venv
source venv/bin/activate
pip3 install -r requirements.txt
uvicorn main:app --reload
```

La API estará disponible en [http://localhost:8000/docs](http://localhost:8000/docs)

#### Dependencias principales
- fastapi
- uvicorn
- pillow
- mediapipe
- opencv-python
- numpy
- python-multipart

### Endpoints principales

- `GET /` — Mensaje de bienvenida.
- `POST /analyze` — Recibe una imagen (formato `multipart/form-data`), detecta la cara y devuelve:
  - Forma del rostro
  - Descripción
  - Recomendaciones personalizadas

#### Ejemplo de request con `curl`:

```bash
curl -X POST "http://localhost:8000/analyze" -F "file=@ruta/a/tu/imagen.jpg"
```

#### Ejemplo de respuesta exitosa:
```json
{
  "status": "ok",
  "message": "Cara detectada correctamente.",
  "landmarks": [ {"x": 0.5, "y": 0.4, "z": 0.01}, ... ],
  "face_shape": "ovalado",
  "description": "Rostro equilibrado, frente y mandíbula similares, pómulos marcados.",
  "recommendations": [
    "Casi cualquier corte te favorece. Prueba con capas largas, flequillo lateral o bob.",
    "Evita cortes que tapen demasiado el rostro."
  ]
}
```

---

## Buenas prácticas
- Usa entornos virtuales para Python (`venv`) y no subas la carpeta `venv` al repo.
- Mantén las dependencias actualizadas en ambos proyectos.
- Documenta cualquier endpoint nuevo o funcionalidad relevante.

---

## Licencia
Este proyecto es solo para fines educativos y de demostración. 