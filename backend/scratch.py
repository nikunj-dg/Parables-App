from sqlalchemy import create_engine, inspect
from sqlalchemy.orm import sessionmaker, declarative_base
from dotenv import load_dotenv
from urllib.parse import quote_plus

import psycopg2
import os 

load_dotenv()

password = quote_plus(os.getenv("DB_PASS"))

try:
    DATABASE_URL = (
        f"postgresql://{os.getenv('DB_USER')}:{password}@{os.getenv('DB_HOST')}:{os.getenv('DB_PORT')}/{os.getenv('DB_NAME')}"
    )

    # Create a connection engine to database 
    engine = create_engine(DATABASE_URL)

    # Create a session factory - a class to call to get new Session objects 
    SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

    connection = engine.connect()

    # Remember to close the connection when done
    connection.close()

    print("✅ Connected successfully!")
except Exception as e:
    print("❌ Connection failed:", e)

# Create an inspector object
inspector = inspect(engine)

# Get list of tables
tables = inspector.get_table_names()
print("Tables in database:", tables)