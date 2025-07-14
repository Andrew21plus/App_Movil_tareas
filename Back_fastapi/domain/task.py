from pydantic import BaseModel, Field
from typing import Optional
from datetime import datetime

class TaskCreate(BaseModel):
    title: str
    description: Optional[str] = ""
    status: str = "pending"  # pending, in_progress, done

class TaskOut(TaskCreate):
    id: str
    owner: str  # username
    created_at: datetime
