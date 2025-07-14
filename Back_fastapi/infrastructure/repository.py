# app/infrastructure/repository.py
from domain.user import UserInDB
from motor.motor_asyncio import AsyncIOMotorDatabase
from fastapi import HTTPException

async def get_user_by_username(db: AsyncIOMotorDatabase, username: str):
    user = await db["users"].find_one({"username": username})
    return UserInDB(**user) if user else None

async def create_user(db: AsyncIOMotorDatabase, user: UserInDB):
    try:
        await db["users"].insert_one(user.dict())
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"No se pudo insertar el usuario: {str(e)}")
