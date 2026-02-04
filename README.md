# Parables App

A modern web application that serves, manages, and translates parables using FastAPI, a relational database, and a modular service architecture.

The app is designed with scalability in mind and follows clean backend engineering practices including service layers, database modeling, and lifecycle management.

## Features

- Store and manage parables
- Translation service integration
- Database-backed persistence
- FastAPI async lifecycle management
- Modular architecture (services, models, routers)
- Automatic database table creation on startup
- Production-ready structure

## Tech Stack

Backend: FastAPI

Database: PostgreSQL
Server: Uvicorn

Architecture: Service-based modular design

Language: Python 3.10+

## Snippet

<img width="1268" height="590" alt="image" src="https://github.com/user-attachments/assets/02ec9857-6102-4ee5-b1cd-834eee940cd3" />

<img width="1280" height="587" alt="image" src="https://github.com/user-attachments/assets/55bd4a08-70a2-484e-92fc-1101360401a4" />

<img width="1268" height="590" alt="image" src="https://github.com/user-attachments/assets/10ca958e-4182-4e32-a58f-d8ac8935e21b" />

## Usage

- Use a virtual environemnt
- Install all he requirements
    - pip install -r requirements.txt
- To start backend server, run the command from root folder
    - uvicorn backend.main:app --reload --no-use-colors
- To start frontend server, run the command from frontend folder 
    - npm run dev

## Future Improvements 
- JWT Authentication
- Role-based access control
- Cloud deployment (AWS / Azure / GCP)
- Admin dashboard
- AI-based parable generation
