# EmoFinance Backend

Backend básico con FastAPI para el análisis emocional financiero.

## Ejecución local
```bash
pip install -r requirements.txt
uvicorn main:app --reload --port 8000
```
Prueba:
```bash
curl -X POST http://localhost:8000/analyze -H "Content-Type: application/json" -d '{"text":"Me preocupa mi deuda pero estoy ahorrando"}'
```
