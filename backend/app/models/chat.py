from pydantic import BaseModel
from typing import List, Dict, Optional, Union


class ChatHistory(BaseModel):
    messages: List[Union["RecipeQuery", "RecipeResponse"]]


class RecipeQuery(BaseModel):
    ingredients: List[str]
    difficulty: Optional[str]
    cuisine: Optional[str]
    time: Optional[str]
    otherText: Optional[str]
    history: Optional["ChatHistory"]


class RecipeResponse(BaseModel):
    title: str
    ingredients: Dict[str, List[str]]
    ingredients_key_order: List[str]
    recipe: Dict[str, List[str]]
    recipe_key_order: List[str]


ChatHistory.update_forward_refs()
RecipeQuery.update_forward_refs()