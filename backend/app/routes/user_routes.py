from flask import Blueprint, request, jsonify, abort
from app.models.user import User
from app.models.album import Album
from app import db

user_routes = Blueprint('user_routes', __name__)


@user_routes.route('/api/users', methods=['GET'])
def get_users():
    users = User.query.all()
    return jsonify([{
        'id': user.id,
        'name': user.name,
        'username': user.username,
        'email': user.email
    } for user in users])

@user_routes.route('/api/users/<int:id>', methods=['GET'])
def get_user(id):
    user = User.query.get(id)  
    if user is None:
        abort(404) 
    
    return jsonify({
        'id': user.id,
        'name': user.name,
        'username': user.username,
        'email': user.email
    })

@user_routes.route('/api/users/<int:id>/albums', methods=['GET'])
def get_user_albums(id):
    user = User.query.get(id)  
    if user is None:
        abort(404) 

    albums = Album.query.filter_by(user_id=id).all() 
    return jsonify([{
        'album_id': album.id,
        'title': album.title
    } for album in albums])
@user_routes.route('/api/users', methods=['POST'])
def create_user():
    data = request.get_json()
    if not all(key in data for key in ('name', 'username', 'email')):
        return jsonify({'error': 'Missing required fields'}), 400

    existing_user = User.query.filter((User.username == data['username']) | (User.email == data['email'])).first()
    if existing_user:
        return jsonify({'error': 'Username or email already exists'}), 409

    new_user = User(name=data['name'], username=data['username'], email=data['email'])
    db.session.add(new_user)
    db.session.commit()
    return jsonify({ 'id': new_user.id, 'name': new_user.name, 'username': new_user.username, 'email': new_user.email }), 201

@user_routes.route('/api/users/<int:id>', methods=['PUT'])
def update_user(id):
    data = request.get_json()
    user = db.session.get(User, id) 
    if user is None:
        return jsonify({'error': 'User not found'}), 404 
    user.name = data['name']
    user.username = data['username']
    user.email = data['email']
    db.session.commit()
    return jsonify({ 'id': user.id, 'name': user.name, 'username': user.username, 'email': user.email })

@user_routes.route('/api/users/<int:id>', methods=['DELETE'])
def delete_user(id):
    user = db.session.get(User, id)  
    if user is None:
        return jsonify({'error': 'User not found'}), 404  
    db.session.delete(user)
    db.session.commit()
    return jsonify({ 'message': 'User deleted' }), 204
