import os
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker

class Config:
    """Base configuration."""
    SECRET_KEY = os.getenv('SECRET_KEY', 'your_secret_key')
    SQLALCHEMY_DATABASE_URI = os.environ.get('DATABASE_URL', 'sqlite:///:memory:')
    SQLALCHEMY_TRACK_MODIFICATIONS = False
    CORS_ALLOWED_ORIGINS = [
        "*"  
    ]

class DevelopmentConfig(Config):
    DEBUG = True

class ProductionConfig(Config):
    DEBUG = False

engine = create_engine(Config.SQLALCHEMY_DATABASE_URI)
# configured session class
Session = sessionmaker(bind=engine)
# session instance
session = Session()

config = {
    'development': DevelopmentConfig,
    'production': ProductionConfig
}
