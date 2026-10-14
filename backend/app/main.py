from fastapi import FastAPI

app = FastAPI(title="Ephemeral Chat API")


@app.get("/api/health")
async def health():
    return {"status": "ok"}