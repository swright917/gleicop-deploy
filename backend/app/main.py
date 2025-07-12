from fastapi import FastAPI
from app.config import settings

app = FastAPI()

@app.get('/')
def read_root():
    return {
        'db_url': settings.DATABASE_URL,
        'neo4j': settings.NEO4J_URI
    }
