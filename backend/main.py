from fastapi import FastAPI, Request, HTTPException
from fastapi.middleware.cors import CORSMiddleware
import os
import httpx
from dotenv import load_dotenv
from jobs import router  

load_dotenv()

app = FastAPI()
app.include_router(router)

app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:3000",
        "https://swift-hire-delta.vercel.app" 
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

JSEARCH_API_KEY = os.getenv("JSEARCH_API_KEY")
JSEARCH_HOST = "jsearch.p.rapidapi.com"

@app.get("/search")
async def search_jobs(q: str):
    url = f"https://{JSEARCH_HOST}/search"
    headers = {
        "X-RapidAPI-Key": JSEARCH_API_KEY,
        "X-RapidAPI-Host": JSEARCH_HOST,
    }
    params = {"query": q}

    async with httpx.AsyncClient() as client:
        response = await client.get(url, headers=headers, params=params)

    if response.status_code != 200:
        raise HTTPException(status_code=500, detail="Failed to fetch jobs")

    return response.json()
