# app/api/auth.py
from fastapi import APIRouter, Depends, HTTPException, status
from fastapi.security import OAuth2PasswordRequestForm, OAuth2PasswordBearer
from domain.user import UserCreate, UserOut
from services.auth_service import register_user, authenticate_user
from infrastructure.db import get_db
from infrastructure.security import create_access_token, decode_token
from motor.motor_asyncio import AsyncIOMotorDatabase

router = APIRouter()
oauth2_scheme = OAuth2PasswordBearer(tokenUrl="/api/auth/login")

@router.post("/register", response_model=UserOut)
async def register(user: UserCreate, db: AsyncIOMotorDatabase = Depends(get_db)):
    return await register_user(db, user)

@router.post("/login")
async def login(form: OAuth2PasswordRequestForm = Depends(), db: AsyncIOMotorDatabase = Depends(get_db)):
    user = await authenticate_user(db, form.username, form.password)
    if not user:
        raise HTTPException(status_code=400, detail="Credenciales inválidas")
    token = create_access_token({"sub": user.username})
    return {"access_token": token, "token_type": "bearer"}

@router.get("/dashboard")
async def dashboard(token: str = Depends(oauth2_scheme), db: AsyncIOMotorDatabase = Depends(get_db)):
    from infrastructure.repository import get_user_by_username
    from fastapi import HTTPException

    try:
        payload = decode_token(token)
        username = payload.get("sub")
        user = await get_user_by_username(db, username)
        if user is None or user.disabled:
            raise HTTPException(status_code=401, detail="Token inválido")
    except Exception:
        raise HTTPException(status_code=401, detail="Token inválido")
    
    return {"message": f"Bienvenido, {user.full_name}!", "usuario": user.username}
