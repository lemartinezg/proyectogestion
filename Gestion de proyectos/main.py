import os
import json
from datetime import datetime
from typing import Dict, Optional
from fastapi import FastAPI, Body
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel, Field

app = FastAPI(title="EmoFinance Backend", version="0.1.0")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

EMOTIONS = ["confianza", "miedo", "culpa", "optimismo", "ansiedad", "cautela", "frustracion"]

class AnalyzeRequest(BaseModel):
    text: str
    context: Optional[Dict[str, str]] = None

@app.get("/health")
def health():
    return {"ok": True, "mode": "MOCK"}

@app.post("/analyze")
def analyze(data: AnalyzeRequest = Body(...)):
    text = data.text.lower()
    scores = {e: 0.0 for e in EMOTIONS}
    if "miedo" in text or "temor" in text: scores["miedo"] += 1
    if "culpa" in text: scores["culpa"] += 1
    if "ansiedad" in text or "estres" in text: scores["ansiedad"] += 1
    if "confianza" in text or "seguro" in text: scores["confianza"] += 1
    if "optimismo" in text or "positivo" in text: scores["optimismo"] += 1
    if "ahorro" in text or "plan" in text: scores["cautela"] += 1
    if sum(scores.values()) == 0: scores["cautela"] = 1
    total = sum(scores.values())
    for k in scores: scores[k] = round(scores[k]/total*100, 1)
    return {"input": data.text, "emotions": scores, "mode": "MOCK", "ts": datetime.utcnow().isoformat()}
