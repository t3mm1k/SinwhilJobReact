# backend/app/api/health.py

from fastapi import APIRouter

router = APIRouter()

@router.get("/health", summary="Проверка работоспособности API")
def health_check():
    """
    Проверяет, что API работает.
    """
    return {"status": "ok"}