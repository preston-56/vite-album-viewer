import os
from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from flask_migrate import Migrate
from dotenv import load_dotenv

load_dotenv()

db = SQLAlchemy()
migrate = Migrate()

def create_app():    
    app = Flask(__name__)        
    
    app.config.from_mapping(
        SECRET_KEY=os.getenv('SECRET_KEY', 'My_Secret_Key'),
        SQLALCHEMY_DATABASE_URI=os.getenv('DATABASE_URL'),
        SQLALCHEMY_TRACK_MODIFICATIONS=False
    )     

    db.init_app(app)
    migrate.init_app(app, db)

    from app.routes import user_routes, album_routes, photo_routes

    app.register_blueprint(user_routes)
    app.register_blueprint(album_routes)
    app.register_blueprint(photo_routes)

    return app

if __name__ == "__main__":
    app = create_app()
    app.run(host='0.0.0.0', port=int(os.environ.get("PORT", 5000)))

