## Photo Album API Documentation

### Overview

This application is a Flask-based web service that interacts with a JSON API to manage users, albums, and photos. 

It uses SQLAlchemy for ORM and Flask-Migrate for database migrations. 

The application is structured into models, routes, and a seeding mechanism to populate the database with data from an external API.

## Tools 
- **Flask:** Web framework for building the API.
  
- **Flask-SQLAlchemy:** ORM for managing database interactions
  
- **Flask-Migrate:** Handles database migrations.
  
- **requests:** Library for making HTTP requests.
  
- **dotenv:** For loading environment variables from a .env file.
- **Firebase:** For enabling Google Sign-In authentication and managing web application configurations, including environment settings for user authentication.
- **Google Cloud Console:** For managing cloud resources and permissions, allowing the application to interact with Firebase configurations when hosted on Netlify.
  
## Setup Instructions

1. Clone the repository:
   ```bash
   git clone git@github.com:preston-56/vite-album-viewer.git
   cd vite-album-viewer/backend
   ```

2. Create a virtual environment:
   ```bash
   python3 -m venv venv
    source venv/bin/activate  # On Windows use `venv\Scripts\activate`
   ```

3. Install the required packages:
   ```bash
   pip install -r requirements.txt
   ```

4. Set up the database:
   - Ensure you have PostgreSQL or your chosen database server running.
  
   - Update the `.env` file with your database connection string.

## Environment Variables
The application requires several environment variables to run correctly. Create a `.env` file in the root of the project and add the following:

```plaintext
DATABASE_URL=your_database_url
JSON_API_URL=https://jsonplaceholder.typicode.com
SECRET_KEY=your_secret_key
```

## Database Models

        User:
        id: Integer, primary key
        name: String, not null
        username: String, unique, not null
        email: String, unique, not null
        
        Album:
        id: Integer, primary key
        user_id: Integer, foreign key referencing User, not null
        title: String, not null

        Photo:
        id: Integer, primary key
        album_id: Integer, foreign key referencing Album, not null
        title: String, not null
        url: String, not null

## Routes 

Users:
- `GET /api/users`: Retrieve a list of all users.
- `POST /api/users`: Create a new user.

Albums:
- `GET /api/albums`: Retrieve a list of all albums.
- `POST /api/albums`: Create a new album.

Photos:
- `GET /api/photos`: Retrieve a list of all photos.
- `POST /api/photos`: Create a new photo.
  
## Seeding the Database
To populate the database with initial data from the JSON API, run the following command:

```bash
flask shell

```
Once in the Flask shell, execute the following commands:

```bash
from scripts.seed_database import seed_database
seed_database()
```
This command will clear existing data in the users, albums, and photos tables and repopulate them with fresh data from the API.

## Running the Appliction
To run the application, use the following command:

```bash
flask run
```
NB: Make sure the application context is set up correctly, and the environment variables are loaded.

## Testing
The application includes a set of tests for the API routes located in the `backend/tests` directory. 

To run these tests using `pytest`, follow these steps:

1. Install test dependencies:
   ```bash
   pip install -r requirements.txt
   ```
2. Run tests:
   ```bash
   pytest 
   ```
These tests focus on ensuring the proper functionality of the API routes for users, albums, and photos.