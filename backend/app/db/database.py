import os

from pymongo import MongoClient
from app.core.config import DATABASE_URL, DATABASE_NAME, VACANCIES_COLLECTION



client = MongoClient(DATABASE_URL)
database = client[DATABASE_NAME]
vacancies_collection = database[VACANCIES_COLLECTION]



def test_database_connection():
    """Tests the database connection."""
    try:
        client.admin.command('ping')  # Simple ping command
        print("Database connection successful!")
        return True
    except Exception as e:
        print(f"Database connection failed: {e}")
        return False