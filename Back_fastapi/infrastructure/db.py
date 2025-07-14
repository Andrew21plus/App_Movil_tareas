# app/infrastructure/db.py

from motor.motor_asyncio import AsyncIOMotorClient
from fastapi import Request
import os
from dotenv import load_dotenv

# Cargar variables del archivo .env
load_dotenv()

# URL de conexión a MongoDB Atlas
MONGO_URL = os.getenv("MONGO_URL")

# Crear el cliente Mongo
client = AsyncIOMotorClient(MONGO_URL)

# Seleccionar la base de datos: db_app_movil
db = client["db_app_movil"]

# Para usar como dependencia en FastAPI
async def get_db(request: Request):
    return db
