from fastapi import APIRouter
from app.services.gpt_service import generate_text
from app.models.chat import RecipeQuery



router = APIRouter()


@router.post("/generate")
async def generate_route(query: RecipeQuery):
    response = {"generated_text": generate_text(query)}
    return response
