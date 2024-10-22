import os
from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from flask_migrate import Migrate
from dotenv import load_dotenv
from app.routes import user_routes, album_routes, photo_routes

load_dotenv()

db = SQLAlchemy()
migrate = Migrate()

def create_app():    
    app = Flask(__name__)        
    
    app.config.from_mapping(
        SECRET_KEY=os.getenv('SECRET_KEY', 'My_Secret_Key'),  # Use an environment variable for the secret key
        SQLALCHEMY_DATABASE_URI=os.getenv('DATABASE_URL'),
        SQLALCHEMY_TRACK_MODIFICATIONS=False
    )     
    

    db.init_app(app)
    migrate.init_app(app, db)

    # Register blueprints
    app.register_blueprint(user_routes)
    app.register_blueprint(album_routes)
    app.register_blueprint(photo_routes)

    return app
