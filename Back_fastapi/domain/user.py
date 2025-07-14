# app/domain/user.py
from pydantic import BaseModel, EmailStr, Field
from typing import Optional

class UserInDB(BaseModel):
    username: str
    full_name: str
    email: EmailStr
    hashed_password: str
    disabled: Optional[bool] = False

class UserCreate(BaseModel):
    username: str
    full_name: str
    email: EmailStr
    password: str

class UserOut(BaseModel):
    username: str
    full_name: str
    email: EmailStr
    disabled: Optional[bool] = False
