import warnings
import pytest
from app import create_app, db

@pytest.fixture
def client():
    warnings.filterwarnings("ignore", category=UserWarning, module="flask_sqlalchemy.query")

    app = create_app()
    app.config['TESTING'] = True
    app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///:memory:'  

    with app.app_context():
        db.create_all()  
        db.session.commit()  

    with app.test_client() as client:
        yield client

    with app.app_context():
        db.session.remove()
        db.drop_all()  
