# backend/app/models/vacancy.py

from typing import List, Optional
from pydantic import BaseModel

class Address(BaseModel):
    latitude: float
    longitude: float
    city: str

class Vacancy(BaseModel):
    _id: str
    vacancy_type: str
    photo: List[str]
    address: Address
    marketplace: str
    position: str
    salary: str
    schedule: Optional[str] = ""
    dates: Optional[List[str]] = []
    payment: str
    experience: str
    extras: Optional[str] = None
    scope: Optional[str] = None
    additionalInfo: Optional[str] = None
    employer_id: int
    phone_number: str
    is_active: bool