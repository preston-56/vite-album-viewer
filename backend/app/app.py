import os
from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from flask_migrate import Migrate
from dotenv import load_dotenv
from flask_cors import CORS
from app.config import Config


load_dotenv()

db = SQLAlchemy()
migrate = Migrate()

def create_app():    
    app = Flask(__name__) 
    app.config['DEBUG'] = True
    app.config.from_object('app.config.Config')
    CORS(app, resources={r"/api/*": {"origins": Config.CORS_ALLOWED_ORIGINS}})  

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
