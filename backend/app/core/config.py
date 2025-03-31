# app/core/config.py
from decouple import config

DATABASE_URL = config("DATABASE_URL", default="mongodb://localhost:27017")
DATABASE_NAME = config("DATABASE_NAME", default="sinwhiljob")
VACANCIES_COLLECTION = config("VACANCIES_COLLECTION", default="vacancies")