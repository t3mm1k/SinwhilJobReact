# backend/app/api/__init__.py

"""
Этот пакет содержит все API endpoints (маршруты) FastAPI приложения.
"""

from fastapi import APIRouter

router = APIRouter()

# Импортируйте маршруты из других файлов api, чтобы добавить их к главному роутеру
from . import vacancies, health  # Импортируйте модули, содержащие ваши маршруты

router.include_router(vacancies.router)
router.include_router(health.router)