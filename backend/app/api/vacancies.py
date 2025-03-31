from fastapi import APIRouter, HTTPException
from typing import List
from app.models.vacancy import Vacancy
from app.db.database import vacancies_collection

router = APIRouter()



@router.get("/vacancies",  response_model=List[Vacancy], summary="Получить все вакансии")
def get_map_data():
    try:
        vacancies = list(vacancies_collection.find({}).limit(1000))
        for vacancy in vacancies:
            vacancy["_id"] = str(vacancy["_id"])
        return [Vacancy(**vacancy) for vacancy in vacancies]
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Ошибка получения данных: {str(e)}")
