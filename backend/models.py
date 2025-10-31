# Import required libraries -------------------------------

from sqlalchemy import Column, Integer, String, Text, DateTime, func, ARRAY

from .database import Base



# Define the data models ---------------------------------

class Parable(Base):
    __tablename__ = "parables"

    id = Column(Integer, primary_key=True, index=True)
    title = Column(String(255), nullable=False)
    content = Column(Text, nullable=False)
    author = Column(String(100))
    tags = Column(String)
    created_at = Column(DateTime(timezone=True), server_default=func.now())

class User(Base):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String(127), nullable=False)
    surname = Column(String(127), nullable=False)
    username = Column(String(255), unique=True, nullable=False)
    hashed_password = Column(String, nullable=False)
    created_at = Column(DateTime(timezone=True), server_default=func.now())


