from supabase import create_client, Client
from pydantic import BaseModel
from fastapi import FastAPI, HTTPException, Query, APIRouter
from typing import List
import httpx
import os
from dotenv import load_dotenv
from fastapi.responses import HTMLResponse

load_dotenv()

router = APIRouter()

SUPABASE_URL = os.getenv("SUPABASE_URL")
SUPABASE_KEY = os.getenv("SUPABASE_KEY")
JSEARCH_API_KEY = os.getenv("JSEARCH_API_KEY")

supabase: Client = create_client(SUPABASE_URL, SUPABASE_KEY)

class Job(BaseModel):
    job_title: str
    location: str
    min_salary: float
    max_salary: float
    median_salary: float
    publisher_name: str

@router.get("/", response_class=HTMLResponse)

@router.post("/jobs/salary")
def add_job(job: Job):
    job_data = job.dict()
    job_data.pop("median_salary") 
    response = supabase.table("job_applications").insert(job_data).execute()
    if response["error"]:
        raise HTTPException(status_code=500, detail=str(response["error"]))
    return {"message": "Job added successfully", "data": response["data"]}

@router.get("/jobs")
def get_job():
    try:
        response = supabase.table("job_applications").select("*").execute()
        if getattr(response, "error", None):
            raise HTTPException(status_code=500, detail=str(response.error))
        return getattr(response, "data", [])
    except Exception as e:
        raise HTTPException(status_code=500, detail="Failed to fetch jobs.")

@router.get("/jobs/{title}/{location}")
def get_job_by_title_and_loc(title: str, location: str):
    try:
        result = supabase.table("job_applications").select("*").eq("job_title", title).eq("location", location).execute()
        if getattr(result, "error", None):
            raise HTTPException(status_code=500, detail=str(result.error))
        return getattr(result, "data", [])
    except Exception as e:
        raise HTTPException(status_code=500, detail="Internal server error occurred")

@router.get("/external-jobs")
async def get_jobs_from_jsearch(query: str = Query(...)):
    url = "https://jsearch.p.rapidapi.com/search"
    headers = {
        "X-RapidAPI-Key": JSEARCH_API_KEY,
        "X-RapidAPI-Host": "jsearch.p.rapidapi.com"
    }
    params = {"query": query, "page": "1"}

    try:
        async with httpx.AsyncClient() as client:
            response = await client.get(url, headers=headers, params=params)

        if response.status_code != 200:
            raise HTTPException(status_code=500, detail=f"JSearch API failed: {response.text}")   
        data = response.json()
        extracted_jobs = []
        for job in data.get("data", []):
            min_salary = job.get("job_min_salary", 0)
            max_salary = job.get("job_max_salary", 0)
            extracted_jobs.append({
                "job_title": job.get("job_title"),
                "location": job.get("job_city", "NA"),
                "min_salary": min_salary,
                "max_salary": max_salary,
                "median_salary": (min_salary + max_salary) / 2 if min_salary and max_salary else 0,
                "publisher_name": job.get("employer_name", "Unknown")
            })

        return extracted_jobs

    except httpx.RequestError as e:
        raise HTTPException(status_code=500, detail=f"Request failed: {str(e)}")

    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Unexpected error: {str(e)}")
