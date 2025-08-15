# -*- coding: utf-8 -*-
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.api.chat import router as chat_router
from app.api.macro_indicators import router as macro_indicators_router
from app.api.endpoints.ask import router as ask_router  # Add dashboard if needed

app = FastAPI(title="ThinkWise AI Advanced Backend", version="1.0.0")

# CORS configuration for frontend communication
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# API router registration
app.include_router(chat_router, prefix="/api")
app.include_router(macro_indicators_router, prefix="/api")
app.include_router(ask_router, prefix="/api/ask", tags=["ask"])

@app.get("/")
def root():
    return {"status": "ok"}

@app.get("/health")
def health_check():
    return {"status": "healthy", "service": "ThinkWise AI Advanced Backend"}

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
