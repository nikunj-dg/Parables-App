# Import required libraries -------------------------------

from fastapi import FastAPI, HTTPException, status, Request
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse
from contextlib import asynccontextmanager
from dotenv import load_dotenv

from . import schemas, crud, database

import jwt, datetime
import os



# Support Functions ---------------------------------------

load_dotenv()

def create_token(username: str):
    exp = datetime.datetime.utcnow() + datetime.timedelta(hours=1)

    return jwt.encode({
        "sub": username,
        "exp": exp},
        os.getenv("SECRET_KEY"),
        algorithm=os.getenv("ALGORITHM")
    )

def verify_token(token: str):
    try:
        payload = jwt.decode(token, os.getenv("SECRET_KEY"), algorithms=[os.getenv("ALGORITHM")])

        return {"username": payload["sub"]}
    except:
        return None



# App Setup -----------------------------------------------

@asynccontextmanager
async def lifespan(app: FastAPI):
    # --- Startup logic ---
    print("Starting the app -------------------------------")

    # with open("log.txt", mode="a") as log:
    #     log.write("Application Started") 
    # print("Logging set up -------------------------------")

    database.Base.metadata.create_all(bind=database.engine)
    print("Creating missing database tables -------------------------------")
    
    # yield control to the app runtime
    yield
    
    # with open("log.txt", mode="a") as log:
    #     log.write("Application shutdown")

    # --- Shutdown logic ---
    print("Shutting the app -------------------------------")

# Create app and attach lifespan handler
app = FastAPI(lifespan=lifespan)

# Allow requests from React frontend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # change to ["http://localhost:5173"] in production
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Registers a global middleware for JWT verification that runs before and after every request
@app.middleware("http")
async def verify_token_middleware(request: Request, call_next):
    skip_routes = [
        ("GET", "/parables"),  # Only skip GET /parables
        ("GET", "/parables/{parable_id}"),
        ("POST", "/login"),
        ("POST", "/user"),
    ]

    # Skip exact method-path matches
    if (request.method, request.url.path) in skip_routes:
        return await call_next(request)
    
    # Allow preflight OPTIONS requests to pass
    """
    Browser says:“Hey, this request is going to a different origin. Before I send the actual request, I need to check if the backend allows it.”This “check” is called a preflight request.
    A preflight request is an automatic HTTP request the browser sends before your actual one.
    It’s usually an OPTIONS request — meaning it doesn’t carry data, it just asks:“Server, can I send a real request with these headers and methods?”
    If your backend responds correctly (with proper CORS headers), the browser proceeds to make the real request (GET/POST/etc).
    """
    if request.method == "OPTIONS":
        return await call_next(request)

    token = request.headers.get("Authorization")
    if not token or not token.startswith("Bearer "):
        return JSONResponse(
            status_code=status.HTTP_401_UNAUTHORIZED,
            content={"detail": "Missing or invalid token"},
        )

    token_value = token.split(" ")[1]
    user_data = verify_token(token_value)

    if not user_data:
        return JSONResponse(
            status_code=status.HTTP_401_UNAUTHORIZED,
            content={"detail": "Token invalid or expired"},
        )
    
    request.state.user = user_data
    
    return await call_next(request)



# Define the Routes ---------------------------------------

# Parable Routes 

# GET List of parables
@app.get("/parables", response_model=list[schemas.Parable])
async def list_parables():
    return crud.get_parables()

@app.get("/parables/{parable_id}", response_model=schemas.Parable)
async def get_parable(parable_id: int):
    parable = crud.get_parable(parable_id)
    if not parable:
        raise HTTPException(status_code=404, detail="Parable not found")
    return parable

# POST New parable
@app.post("/parables", response_model=schemas.Parable)
async def create_parable(parable: schemas.ParableCreate):
    """
    parable is the function argument that represents the request body coming from the client.
    """
    return crud.create_parable(parable)

@app.put("/parables/{parable_id}", response_model=schemas.Parable)
async def update_parable(parable_id: int, parable: schemas.ParableCreate):
    parable = crud.update_parable(parable_id, parable)
    if not parable:
        raise HTTPException(status_code=404, detail="Parable not found")
    return parable

@app.delete("/parables/{parable_id}")
async def delete_parable(parable_id: int):
    parable = crud.delete_parable(parable_id)
    if not parable:
        raise HTTPException(status_code=404, detail="Parable not found")
    return parable



# Login/Signup Routes 

@app.post("/login")
async def verify_user(user: schemas.UserLogin):
    user_check = crud.verify_user(user)

    if not user_check:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid username or password",
            headers={"WWW-Authenticate": "Bearer"},
        )
    
    token = create_token(user.username)

    return{"user_token": token, "token_type": "bearer"}

# POST Create user
@app.post("/user", response_model=schemas.User)
async def create_user(user: schemas.UserCreate):
    existing_user = crud.check_username(user.username)

    if existing_user:
        return HTTPException(status_code=400, detail="Username already exists")
    
    return crud.create_user(user)

# GET Route to get user info
@app.get("/users/me")
async def get_my_profile(request: Request):
    user = request.state.user
    return {"message": f"Welcome, {user['username']}!"}

@app.post("/logout")
async def logout():
    return {"message": "User logged out"}


