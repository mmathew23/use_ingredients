from fastapi import APIRouter
from pydantic import BaseModel
from app.services.gpt_service import generate_text
from typing import List


class RecipeQuery(BaseModel):
    ingredients: List[str]
    difficulty: str
    cuisine: str
    time: str
    otherText: str


router = APIRouter()


@router.post("/generate")
async def generate_route(query: RecipeQuery):
    response = {"generated_text": generate_text(query)}
    print('response', response)
    return response
