def test_create_user_and_album(client):
    user_response = client.post('/api/users', json={
        'name': 'John Doe',
        'username': 'johndoe',
        'email': 'john@example.com'
    })
    
    assert user_response.status_code == 201, f"User creation failed: {user_response.data}"
    
    user_id = user_response.json['id'] 

    album_response = client.post('/api/albums', json={
        'title': 'galleria',
        'user_id': user_id  
    })
    
    assert album_response.status_code == 201, f"Album creation failed: {album_response.data}"

    albums_response = client.get('/api/albums')
    assert albums_response.status_code == 200, f"Failed to retrieve albums: {albums_response.data}"
    assert len(albums_response.json) == 1  
    assert albums_response.json[0]['title'] == 'galleria'


def test_update_album(client):
    # Create a user
    user_response = client.post('/api/users', json={
        'name': 'John Doe',
        'username': 'johndoe',
        'email': 'john@example.com'
    })
    
    assert user_response.status_code == 201, f"User creation failed: {user_response.data}"
    
    user_id = user_response.json['id']

    # Create an album
    album_response = client.post('/api/albums', json={
        'title': 'galleria',
        'user_id': user_id  
    })
    
    assert album_response.status_code == 201, f"Album creation failed: {album_response.data}"

    updated_album_response = client.put('/api/albums/1', json={
        'title': 'updated galleria',
        'user_id': user_id
    })
    
    assert updated_album_response.status_code == 200
    assert updated_album_response.json['title'] == 'updated galleria'


def test_delete_album(client):
    user_response = client.post('/api/users', json={
        'name': 'John Doe',
        'username': 'johndoe',
        'email': 'john@example.com'
    })
    
    assert user_response.status_code == 201, f"User creation failed: {user_response.data}"
    
    user_id = user_response.json['id']

    album_response = client.post('/api/albums', json={
        'title': 'galleria',
        'user_id': user_id
    })
    
    assert album_response.status_code == 201, f"Album creation failed: {album_response.data}"

    album_id = album_response.json['album_id']
    response = client.delete(f'/api/albums/{album_id}')
    assert response.status_code == 204

    # Verify the album is deleted
    response = client.get('/api/albums')
    assert len(response.json) == 0


def test_get_album_by_id(client):
    # Create a user
    user_response = client.post('/api/users', json={
        'name': 'John Doe',
        'username': 'johndoe',
        'email': 'john@example.com'
    })
    
    assert user_response.status_code == 201, f"User creation failed: {user_response.data}"

    user_id = user_response.json['id']

    album_response = client.post('/api/albums', json={
        'title': 'galleria',
        'user_id': user_id
    })
    
    assert album_response.status_code == 201, f"Album creation failed: {album_response.data}"

    album_id = album_response.json['album_id']
    response = client.get(f'/api/albums/{album_id}')
    assert response.status_code == 200
    assert response.json['title'] == 'galleria'
