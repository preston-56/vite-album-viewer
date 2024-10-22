def test_get_photos(client):
    user_response = client.post('/api/users', json={
        'name': 'John Doe',
        'username': 'johndoe',
        'email': 'john@example.com'
    })
    
    assert user_response.status_code == 201, f"User creation failed: {user_response.data}"
    user_id = user_response.json['id']
    album_response = client.post('/api/albums', json={
        'title': 'Test Album',
        'user_id': user_id  
    })

    assert album_response.status_code == 201, f"Album creation failed: {album_response.data}"
    album_id = album_response.json['album_id']
    photo_response = client.post('/api/photos', json={
        'album_id': album_id, 
        'title': 'test_photo',
        'url': 'https://example.com/test_photo.jpg'
    })

    assert photo_response.status_code == 201, f"Photo creation failed: {photo_response.data}"
    photo_response = client.get('/api/photos')
    assert photo_response.status_code == 200, f'Photos were not retrieved successfully: {photo_response.data}'


def test_get_photos_by_id(client):
    user_response = client.post('/api/users', json={
        'name': 'John Doe',
        'username': 'johndoe',
        'email': 'john@example.com'
    })
    
    assert user_response.status_code == 201, f"User creation failed: {user_response.data}"
    user_id = user_response.json['id']
    album_response = client.post('/api/albums', json={
        'title': 'Test Album',
        'user_id': user_id  
    })

    assert album_response.status_code == 201, f"Album creation failed: {album_response.data}"
    album_id = album_response.json['album_id']
    photo_response = client.post('/api/photos', json={
        'album_id': album_id, 
        'title': 'test_photo',
        'url': 'https://www.example.com',
    })

    assert photo_response.status_code == 201, f"Photo creation failed: {photo_response.data}"
    photo_id = photo_response.json['id']

    photo_response = client.get(f'/api/photos/{photo_id}')
    assert photo_response.status_code == 200, f"Failed to retrieve photo: {photo_response.data}"
    assert photo_response.json['title'] == 'test_photo'

def get_photo_by_album_id(client):
    user_response = client.post('/api/users', json={
        'name': 'John Doe',
        'username': 'johndoe',
        'email': 'john@example.com'
    })
    
    assert user_response.status_code == 201, f"User creation failed: {user_response.data}"
    user_id = user_response.json['id']
    album_response = client.post('/api/albums', json={
        'title': 'Test Album',
        'user_id': user_id  
    })

    assert album_response.status_code == 201, f"Album creation failed: {album_response.data}"
    album_id = album_response.json['album_id']
    photo_response = client.post('/api/photos', json={
        'album_id': album_id, 
        'title': 'test_photo',
        'url': 'https://photos.example.com',
    })
    assert photo_response.status_code == 201, f"Photo creation failed: {photo_response.data}"
    photo_response = client.get(f'/api/photos?album_id={album_id}')
    assert photo_response.status_code == 200, f"Failed to retrieve photos by album: {photo_response.data}"

def test_delete_photo(client):
    user_response = client.post('/api/users', json={
        'name': 'John Doe',
        'username': 'johndoe',
        'email': 'john@example.com'
    })
    
    assert user_response.status_code == 201, f"User creation failed: {user_response.data}"
    user_id = user_response.json['id']
    album_response = client.post('/api/albums', json={
        'title': 'Test Album',
        'user_id': user_id  
    })

    assert album_response.status_code == 201, f"Album creation failed: {album_response.data}"
    album_id = album_response.json['album_id']
    photo_response = client.post('/api/photos', json={
        'album_id': album_id, 
        'title': 'test_photo',
        'url': 'http://example.com',
    })
    assert photo_response.status_code == 201, f"Photo creation failed: {photo_response.data}"
    photo_id = photo_response.json['id']

    photo_response = client.delete(f'/api/photos/{photo_id}')
    assert photo_response.status_code == 204, f"Failed to delete photo: {photo_response.data}"