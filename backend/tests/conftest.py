import warnings
import pytest
from sqlalchemy import text
from app import create_app, db
from app.models.album import Album
from app.models.photo import Photo
from app.models.user import User
@pytest.fixture
def client():
    warnings.filterwarnings("ignore", category=UserWarning, module="flask_sqlalchemy.query")
    app = create_app()
    app.config['TESTING'] = True
    app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///:memory:'

    with app.test_client() as client:
        with app.app_context():
            db.create_all()
            db.session.execute(text("ALTER SEQUENCE users_id_seq RESTART WITH 1"))
            db.session.commit()
        yield client
        with app.app_context():
            db.session.remove()
            db.drop_all()
