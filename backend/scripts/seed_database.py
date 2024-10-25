import os
import requests
from dotenv import load_dotenv
from app.app import create_app, db
from app.models import User, Album, Photo

load_dotenv()

JSON_API_URL = os.getenv('JSON_API_URL')

if JSON_API_URL is None:
    raise ValueError("The JSON_API_URL environment variable is not set.")

def seed_database():
    app = create_app()
    with app.app_context():
        # Clear existing data
        db.session.query(Photo).delete()
        db.session.query(Album).delete()
        db.session.query(User).delete()
        db.session.commit()

        # Seed Users
        response = requests.get(f'{JSON_API_URL}/users')
        response.raise_for_status()  
        users = response.json()
        for user in users:
            db.session.add(User(
                id=user['id'],
                name=user['name'],
                username=user['username'],
                email=user['email']
            ))

        db.session.commit()

        # Seed Albums
        response = requests.get(f'{JSON_API_URL}/albums')
        response.raise_for_status()
        albums = response.json()
        for album in albums:
            db.session.add(Album(
                id=album['id'],
                user_id=album['userId'],
                title=album['title']
            ))

        db.session.commit()

        # Seed Photos
        response = requests.get(f'{JSON_API_URL}/photos')
        response.raise_for_status()
        photos = response.json()
        for photo in photos:
            db.session.add(Photo(
                id=photo['id'],
                album_id=photo['albumId'],
                title=photo['title'],
                url=photo['url']
            ))

        db.session.commit()
        print("Database seeded successfully!")

if __name__ == "__main__":
    seed_database()
