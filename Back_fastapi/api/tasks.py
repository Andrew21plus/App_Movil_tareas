from fastapi import APIRouter, Depends, HTTPException
from domain.task import TaskCreate, TaskOut
from services import task_service
from infrastructure.db import get_db
from infrastructure.security import decode_token
from fastapi.security import OAuth2PasswordBearer
from motor.motor_asyncio import AsyncIOMotorDatabase

router = APIRouter(prefix="/tasks", tags=["Tasks"])
oauth2_scheme = OAuth2PasswordBearer(tokenUrl="/api/login")

def get_username_from_token(token: str) -> str:
    payload = decode_token(token)
    return payload.get("sub")

@router.post("/", response_model=TaskOut)
async def create_task(task: TaskCreate, token: str = Depends(oauth2_scheme), db: AsyncIOMotorDatabase = Depends(get_db)):
    username = get_username_from_token(token)
    task_created = await task_service.create_task(db, task, username)
    task_created["id"] = str(task_created["_id"])
    return task_created

@router.get("/", response_model=list[TaskOut])
async def get_tasks(token: str = Depends(oauth2_scheme), db: AsyncIOMotorDatabase = Depends(get_db)):
    username = get_username_from_token(token)
    tasks = await task_service.get_tasks_for_user(db, username)
    for t in tasks:
        t["id"] = str(t["_id"])
    return tasks

@router.put("/{task_id}", response_model=TaskOut)
async def update_task(task_id: str, task: TaskCreate, token: str = Depends(oauth2_scheme), db: AsyncIOMotorDatabase = Depends(get_db)):
    username = get_username_from_token(token)
    updated = await task_service.update_task(db, task_id, task.dict(), username)
    if not updated:
        raise HTTPException(status_code=403, detail="No autorizado o no existe la tarea")
    updated["id"] = str(updated["_id"])
    return updated

@router.delete("/{task_id}")
async def delete_task(task_id: str, token: str = Depends(oauth2_scheme), db: AsyncIOMotorDatabase = Depends(get_db)):
    username = get_username_from_token(token)
    deleted = await task_service.delete_task(db, task_id, username)
    if not deleted:
        raise HTTPException(status_code=403, detail="No autorizado o no existe la tarea")
    return {"message": "Tarea eliminada"}
