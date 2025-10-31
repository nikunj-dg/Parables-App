# Import required libraries -------------------------------

import hashlib

from . import models, schemas, database



# Define the crud functions -------------------------------

# Parable functions 

def get_parables(skip: int = 0, limit: int = 100):
    db = database.SessionLocal()

    try:
        return db.query(models.Parable).offset(skip).limit(limit).all()
    finally:
        db.close()

def get_parable(parable_id: int):
    db = database.SessionLocal()

    try:
        return db.query(models.Parable).filter(models.Parable.id == parable_id).first()
    finally:
        db.close()

def create_parable(parable: schemas.ParableCreate):
    db = database.SessionLocal()

    db_parable = models.Parable(
        title=parable.title,
        content=parable.content,
        author=parable.author,
        tags=parable.tags
    )

    try:
        db.add(db_parable)
        db.commit()
        db.refresh(db_parable)

        return db_parable
    finally:
        db.close()

def update_parable(parable_id: int, parable: schemas.ParableCreate):
    db = database.SessionLocal()

    try:
        db_parable = db.query(models.Parable).filter(models.Parable.id == parable_id).first()
        if db_parable:
            db_parable.title = parable.title
            db_parable.content = parable.content
            db_parable.author = parable.author
            db_parable.tags = parable.tags
            db.commit()
            db.refresh(db_parable)

        return db_parable
    finally:
        db.close()

def delete_parable(parable_id: int):
    db = database.SessionLocal()
    
    try:
        db_parable = db.query(models.Parable).filter(models.Parable.id == parable_id).first()
        if db_parable:
            db.delete(db_parable)
            db.commit()
        
        return db_parable
    finally:
        db.close()
        


# User functions 

def verify_user(user: schemas.UserCreate):
    db = database.SessionLocal()

    hashed_pass = hashlib.sha256(user.password.encode()).hexdigest()
    
    try:
        user_check = (
            db.query(models.User)
            .filter(models.User.username == user.username)
            .filter(models.User.hashed_password == hashed_pass)
            .first()
        )

        return user_check
    finally:
        db.close()

def check_username(username: str):
    db = database.SessionLocal()

    try:
        return db.query(models.User).filter(models.User.username == username).first()
    finally:
        db.close()
    
def create_user(user: schemas.UserCreate):
    db = database.SessionLocal()

    hashed_pass = hashlib.sha256(user.password.encode()).hexdigest()

    db_user = models.User(
        name=user.name,
        surname=user.surname,
        username=user.username,
        hashed_password=hashed_pass
    )

    try:
        db.add(db_user)
        db.commit()
        db.refresh(db_user)

        return db_user
    finally:
        db.close()


