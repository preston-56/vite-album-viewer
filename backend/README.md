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

## Running the Appliction with Flask
To run the application, use the following command:

```bash
flask run
```
NB: Make sure the application context is set up correctly, and the environment variables are loaded.

---
## Running the Application with Docker

To build and run the application using Docker, follow these steps:

  1. **Remove existing migrations**: To ensure a clean setup, delete any previous migrations by running:
      ```bash
      rm -rf migrations
      ```
  2. Build and run the Docker containers:
     ```bash
     docker-compose up --build
     ```
      This command will:
      - Build the application's docker image.
      - Start the application and the postgres database.

  3. **Runnig in Detached Mode**: To run the application in detached mode, use the `-d` flag:
     ```bash
     docker-compose up -d
     ```
  4. **Stopping the Containers**: To stop and remove the containers and associated volumes, run:
     ```bash
     docker-compose down -v
     ```
### Environment Variables
Ensure the following environment variables are set in your `.env` file:
   ```plaintext
   DATABASE_URL=your_database_url
   JSON_API_URL=https://jsonplaceholder.typicode.com
   SECRET_KEY=your_secret_key
   POSTGRES_USER=your_postgres_user
   POSTGRES_PASSWORD=your_postgres_password
   POSTGRES_DB=your_postgres_db
   ```

### Setting up and migrating the database
Once the containers are up, follow these steps to set up and migrate the database:
  1. Initialize the database for migration:
     ```bash
     docker-compose exec flask flask db init
     ```
  2. Create a migration:
     ```bash
     docker-compose exec flask flask db migrate -m "Initial migration"
     ```
  3. Apply the migration:
     ```bash
     docker-compose exec flask flask db upgrade
     ```
  4. **Rollback to the initial state:** To rollback the the database to the initial state, run:
     ```bash
     docker-compose exec flask flask db downgrade base
     ```
  5. **Populate the database with seed data:** To populate the database with seed data, enter the flask shell and run:
     
     ```bash
     docker-compose exec flask flask shell
     ```
     Run the seeding command in the flask shell:
     ```python
     from scripts.seed_database import seed_database
     seed_database()
     ```
     ---

## Testing
The application includes a set of tests for the API routes located in the `backend/tests` directory. 

To run these tests using `pytest`, follow these steps:

1. Install test dependencies:
   ```bash
   pip install -r requirements.txt
   ```
2. Run tests:
   ```bash
   pytest tests/
   ```
These tests focus on ensuring the proper functionality of the API routes for users, albums, and photos.