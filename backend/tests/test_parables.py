from fastapi.testclient import TestClient
from backend.main import app

client = TestClient(app)

def test_read_parables():
    response = client.get("/parables")
    assert response.status_code == 200
    assert isinstance(response.json(), list)

# def test_create_parable():
#     data = {"title": "The Good Samaritan", "text": "Be kind to others"}
#     response = client.post("/parables", json=data)
#     assert response.status_code == 201
#     assert response.json()["title"] == "The Good Samaritan"
