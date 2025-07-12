from pydantic_settings import BaseSettings

class Settings(BaseSettings):
    DB_HOST: str = "localhost"
    DB_PORT: int = 5432
    DB_NAME: str = "gleicop_db"
    DB_USER: str = "gleicop_user"
    DB_PASSWORD: str = "YourSecurePassword"

    class Config:
        env_file = ".env"

settings = Settings()

