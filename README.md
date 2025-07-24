# Peluquería Inteligente

Este repositorio contiene el código fuente de una plataforma moderna para una peluquería, compuesta por:

- **Frontend:** Aplicación web desarrollada con Next.js (React), ubicada en la carpeta `frontend/`.
- **Microservicio de Visagismo IA:** Servicio de análisis de imagen y recomendaciones personalizadas usando FastAPI (Python), ubicado en la carpeta `visagismo-ia/`.

---

## Estructura del proyecto

```
/ (raíz del repositorio)
│
├── frontend/         # Aplicación web (Next.js)
│
├── visagismo-ia/     # Microservicio IA (FastAPI)
│
├── .gitignore        # Ignora archivos innecesarios de Node y Python
├── README.md         # Este archivo
└── ...
```

---

## Frontend (Next.js)

- Ubicación: `frontend/`
- Tecnologías: Next.js, React, TypeScript, TailwindCSS, etc.
- Funcionalidad: Permite a los usuarios reservar citas, ver servicios, testimonios y acceder a recomendaciones personalizadas de visagismo.

### Comandos útiles
```bash
cd frontend
npm install
npm run dev
```

La aplicación estará disponible en [http://localhost:3000](http://localhost:3000)

---

## Microservicio de Visagismo IA (FastAPI)

- Ubicación: `visagismo-ia/`
- Tecnologías: Python, FastAPI, Pillow
- Funcionalidad: Recibe imágenes y devuelve recomendaciones de corte/color personalizadas (actualmente ejemplo, preparado para IA real).

### Comandos útiles
```bash
cd visagismo-ia
python3 -m venv venv
source venv/bin/activate
pip3 install -r requirements.txt
uvicorn main:app --reload
```

La API estará disponible en [http://localhost:8000/docs](http://localhost:8000/docs)

---

## Buenas prácticas
- Usa entornos virtuales para Python (`venv`) y no subas la carpeta `venv` al repo.
- Mantén las dependencias actualizadas en ambos proyectos.
- Documenta cualquier endpoint nuevo o funcionalidad relevante.

---

## Licencia
Este proyecto es solo para fines educativos y de demostración. 