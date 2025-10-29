# Import required libraries -------------------------------

from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker, declarative_base
from dotenv import load_dotenv
from urllib.parse import quote_plus

import os 



# Initial setup -------------------------------------------

load_dotenv("config.env")

password = quote_plus(os.getenv("DB_PASS"))

DATABASE_URL = (
    f"postgresql://{os.getenv('DB_USER')}:{password}@{os.getenv('DB_HOST')}:{os.getenv('DB_PORT')}/{os.getenv('DB_NAME')}"
)

# Create a connection engine to database 
engine = create_engine(DATABASE_URL)

# Create a session factory - a class to call to get new Session objects 
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

# Base class for all SQLAlchemy ORM models
Base = declarative_base()


