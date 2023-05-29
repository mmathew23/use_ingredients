from fastapi import APIRouter
from pydantic import BaseModel
from app.services.gpt_service import generate_text
from typing import List, Optional


class RecipeQuery(BaseModel):
    ingredients: List[str]
    difficulty: Optional[str]
    cuisine: Optional[str]
    time: Optional[str]
    otherText: Optional[str]


router = APIRouter()


@router.post("/generate")
async def generate_route(query: RecipeQuery):
    response = {"generated_text": generate_text(query)}
    return response
