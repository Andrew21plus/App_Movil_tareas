from motor.motor_asyncio import AsyncIOMotorDatabase
from domain.task import TaskCreate
from datetime import datetime
from bson import ObjectId

async def create_task(db: AsyncIOMotorDatabase, data: TaskCreate, username: str):
    task_dict = data.dict()
    task_dict.update({
        "owner": username,
        "created_at": datetime.utcnow()
    })
    await db["tasks"].insert_one(task_dict)
    return task_dict

async def get_tasks_for_user(db: AsyncIOMotorDatabase, username: str):
    cursor = db["tasks"].find({
        "$or": [
            {"status": "done"},
            {"owner": username}
        ]
    })
    return await cursor.to_list(100)

async def get_task_by_id(db: AsyncIOMotorDatabase, task_id: str):
    return await db["tasks"].find_one({"_id": ObjectId(task_id)})

async def update_task(db: AsyncIOMotorDatabase, task_id: str, data: dict, username: str):
    task = await get_task_by_id(db, task_id)
    if not task or task["owner"] != username:
        return None
    await db["tasks"].update_one({"_id": ObjectId(task_id)}, {"$set": data})
    return await get_task_by_id(db, task_id)

async def delete_task(db: AsyncIOMotorDatabase, task_id: str, username: str):
    task = await get_task_by_id(db, task_id)
    if not task or task["owner"] != username:
        return False
    await db["tasks"].delete_one({"_id": ObjectId(task_id)})
    return True
