# app/services/auth_service.py
from infrastructure import repository, security
from domain.user import UserCreate, UserInDB
from motor.motor_asyncio import AsyncIOMotorDatabase
from fastapi import HTTPException

async def register_user(db: AsyncIOMotorDatabase, user_data: UserCreate):
    # Verificar si el usuario ya existe
    existing_user = await repository.get_user_by_username(db, user_data.username)
    if existing_user:
        raise HTTPException(status_code=400, detail="El usuario ya existe")

    hashed_pw = security.hash_password(user_data.password)
    user = UserInDB(
        username=user_data.username,
        full_name=user_data.full_name,
        email=user_data.email,
        hashed_password=hashed_pw
    )

    # Manejar error al insertar en la base de datos
    try:
        await repository.create_user(db, user)
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error al crear el usuario: {str(e)}")

    return user

async def authenticate_user(db: AsyncIOMotorDatabase, username: str, password: str):
    user = await repository.get_user_by_username(db, username)
    if not user or not security.verify_password(password, user.hashed_password):
        return None
    return user
