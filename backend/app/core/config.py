# app/core/config.py
from decouple import config

DATABASE_URL = config("DATABASE_URL", default="mongodb+srv://t3mm1k:qSLHLtKR891VTLMX@cluster0.lx2scee.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0")
DATABASE_NAME = config("DATABASE_NAME", default="sinwhiljob")
VACANCIES_COLLECTION = config("VACANCIES_COLLECTION", default="vacancies")

print(DATABASE_URL, DATABASE_NAME, VACANCIES_COLLECTION)