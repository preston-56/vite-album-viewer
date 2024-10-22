from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from flask_migrate import Migrate
import os
from dotenv import load_dotenv

load_dotenv()

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = os.getenv('DATABASE_URL')
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

db = SQLAlchemy(app)
migrate = Migrate(app, db)

from app.models import User, Album, Photo

# Import routes after initializing the app and db
from app.routes import user_routes, album_routes, photo_routes

# Register blueprints
app.register_blueprint(user_routes)
app.register_blueprint(album_routes)
app.register_blueprint(photo_routes)

