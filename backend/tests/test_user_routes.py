def test_create_user(client):
    response = client.post('/api/users', json={
        'name': 'John Doe',
        'username': 'johndoe',
        'email': 'john@example.com'
    })
    assert response.status_code == 201
    assert 'id' in response.get_json()

def test_create_user_missing_fields(client):
    response = client.post('/api/users', json={
        'name': 'John Doe',
        'username': 'johndoe'  
    })
    assert response.status_code == 400
    assert response.get_json()['error'] == 'Missing required fields'

def test_create_user_duplicate(client):
    client.post('/api/users', json={
        'name': 'John Doe',
        'username': 'johndoe',
        'email': 'john@example.com'
    })
    response = client.post('/api/users', json={
        'name': 'Jane Doe',
        'username': 'johndoe',  # Duplicate username
        'email': 'jane@example.com'
    })
    assert response.status_code == 409
    assert response.get_json()['error'] == 'Username or email already exists'

def test_get_users(client):
    client.post('/api/users', json={
        'name': 'John Doe',
        'username': 'johndoe',
        'email': 'john@example.com'
    })
    response = client.get('/api/users')
    assert response.status_code == 200
    users = response.get_json()
    assert len(users) == 1
    assert users[0]['username'] == 'johndoe'

def test_update_user(client):
    response = client.post('/api/users', json={
        'name': 'John Doe',
        'username': 'johndoe',
        'email': 'john@example.com'
    })
    user_id = response.get_json()['id']

    response = client.put(f'/api/users/{user_id}', json={
        'name': 'John Smith',
        'username': 'johnsmith',
        'email': 'johnsmith@example.com'
    })
    assert response.status_code == 200
    assert response.get_json()['name'] == 'John Smith'

def test_delete_user(client):
    response = client.post('/api/users', json={
        'name': 'John Doe',
        'username': 'johndoe',
        'email': 'john@example.com'
    })
    user_id = response.get_json()['id']

    response = client.delete(f'/api/users/{user_id}')
    assert response.status_code == 204

    # Verify the user is deleted
    response = client.get('/api/users')
    assert len(response.get_json()) == 0
