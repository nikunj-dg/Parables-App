# Import required libraries -------------------------------

from pydantic import BaseModel
from typing import List, Optional
from datetime import datetime



# Define the schemas ---------------------------------------

# Parable schemas

class ParableBase(BaseModel):
    """
    Defines the shared fields across different schemas, used when creating/parsing input data (POST request).
    """
    title: str
    content: str
    author: Optional[str] = None
    tags: Optional[str] = None

class Parable(ParableBase):
    """
    Extends ParableBase and adds read-only fields like: id (auto-generated primary key), created_at (auto-filled timestamp)
    Used when returning a parable back to the client.
    """
    id: int
    created_at: datetime

    class Config:
        # Allows FastAPI/Pydantic to take SQLAlchemy ORM objects and automatically serialize them into JSON responses
        from_attributes = True

class ParableCreate(ParableBase):
    "Addidtional fields that are only for create"
    pass

class ParableUpdate(ParableBase):
    "Addidtional fields that are only for update"
    pass



# User schemas 

class UserBase(BaseModel):
    name: str
    surname: str
    username: str

class User(UserBase):
    id: int
    created_at: datetime

    class Config:
        from_attributes = True

class UserLogin(BaseModel):
    username: str
    password: str

class UserCreate(UserBase):
    password: str

class UserUpdate(UserBase):
    pass


