import os
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles

from routers.cardiology import router as cardiology_router

app = FastAPI(
    title="Nuvica Cardiology & Vascular Health AI Platform",
    description="High-precision automated cardiovascular screening engine with Pan-Tompkins ECG analysis, Cardiopulmonary CXR segmentation, and Grad-CAM explainability.",
    version="2.4.0"
)

# CORS setup for Next.js frontend
allowed_origins_env = os.environ.get("ALLOWED_ORIGINS", "")
if allowed_origins_env:
    allowed_origins = [o.strip() for o in allowed_origins_env.split(",") if o.strip()]
else:
    allowed_origins = ["http://localhost:3000", "http://127.0.0.1:3000", "*"]

app.add_middleware(
    CORSMiddleware,
    allow_origins=allowed_origins if allowed_origins else ["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Mount uploads directory for preview and heatmap images
UPLOAD_DIR = os.path.join(os.path.dirname(__file__), "uploads")
os.makedirs(UPLOAD_DIR, exist_ok=True)
app.mount("/uploads", StaticFiles(directory=UPLOAD_DIR), name="uploads")

# Include cardiology router
app.include_router(cardiology_router)

@app.get("/")
def root():
    return {
        "message": "Nuvica Cardiology & Vascular AI API is running.",
        "docs_url": "/docs",
        "health": "/api/cardiology/health"
    }

if __name__ == "__main__":
    import uvicorn
    port = int(os.environ.get("PORT", 8000))
    host = os.environ.get("HOST", "0.0.0.0")
    uvicorn.run("main:app", host=host, port=port, reload=False)
