# backend/app/main.py

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.api import vacancies, health



app = FastAPI(
    title="SinwhilJob API",
    description="API for managing vacancies.",
    version="0.1.0",
)

app.include_router(vacancies.router, prefix="/api")
app.include_router(health.router, prefix="/api")


origins = [
    "http://localhost:3000",
    "http://localhost",
    "https://your-frontend-domain.com",
    "*",
]


app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],  # Разрешить все методы (GET, POST, PUT, DELETE и т. д.)
    allow_headers=["*"],  # Разрешить все заголовки
)


# Example of running database test function (optional)
from app.db.database import test_database_connection
@app.on_event("startup")
async def startup_event():
    test_database_connection()

@app.get("/")
async def read_root():
    return {"message": "Welcome to the Vacancy API!"}

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=5000, reload=True)