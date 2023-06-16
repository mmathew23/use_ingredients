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
    ingredients: List[Dict[str, Union[Union[str, None], List[Dict[str, Union[str, float, int, None]]]]]]
    recipe: List[Dict[str, Union[Union[str, None], List[str]]]]


ChatHistory.update_forward_refs()
RecipeQuery.update_forward_refs()