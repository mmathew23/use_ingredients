import os
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from dotenv import load_dotenv
from app.api.routes import router as api_router
import openai


load_dotenv(".env")
openai.api_key = os.getenv("OPENAI_API_KEY")


app = FastAPI()

origins = ["http://localhost:3000"]
app.add_middleware(
        CORSMiddleware,
        allow_origins=origins,
        allow_credentials=True,
        allow_methods=["*"],
        allow_headers=["*"],
        )

app.include_router(api_router)
