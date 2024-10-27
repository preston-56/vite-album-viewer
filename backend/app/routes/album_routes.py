from flask import Blueprint, request, jsonify, abort, current_app
from app.models.album import Album
from app.models.user import User
from app.models.photo import Photo

from app import db

album_routes = Blueprint('album_routes', __name__)

@album_routes.route('/api/albums', methods=['GET'])
def get_albums():
    user_id = request.args.get('user_id', type=int)
    
    albums_query = Album.query
    if user_id is not None:
        # Validate if the user exists
        user = User.query.get(user_id)
        if user is None:
            abort(404, description="User not found.")
        
        albums_query = albums_query.filter_by(user_id=user_id)

    albums = albums_query.all()

    return jsonify([{
        'album_id': album.id,
        'user_id': album.user_id,
        'title': album.title
    } for album in albums])

@album_routes.route('/api/albums/<int:id>', methods=['GET'])
def get_album(id):
    if not id:
        return jsonify({'error': 'Album ID is undefined'}), 400
    
    with current_app.app_context():
        album = db.session.get(Album, id)    
        if album is None:
         abort(404, description="Album not found.")
    
    return jsonify({
        'album_id': album.id,
        'user_id': album.user_id,
        'title': album.title
    })

@album_routes.route('/api/albums/<int:album_id>/photos', methods=['GET'])
def get_photos_by_album(album_id):    
    photos = Photo.query.filter_by(album_id=album_id).all()
    
    if not photos:
        abort(404, description="No photos found for this album.")
    
    return jsonify([{
        'id': photo.id,
        'title': photo.title,
        'url': photo.url,
        'album_id': photo.album_id
    } for photo in photos])

@album_routes.route('/api/albums', methods=['POST'])
def create_album():
    data = request.get_json()
    if 'title' not in data or 'user_id' not in data:
        return jsonify({'error': 'Missing required fields'}), 400
    new_album = Album(user_id=data['user_id'], title=data['title'])
    db.session.add(new_album)
    db.session.commit()
    return jsonify({ 'album_id': new_album.id, 'user_id': new_album.user_id, 'title': new_album.title }), 201

@album_routes.route('/api/albums/<int:id>', methods=['PUT'])
def update_album(id):
    data = request.get_json()
    album = db.session.get(Album, id)  
    if album is None:
        abort(404)  
    album.user_id = data['user_id']
    album.title = data['title']
    db.session.commit()
    return jsonify({ 'album_id': album.id, 'user_id': album.user_id, 'title': album.title })

@album_routes.route('/api/albums/<int:id>', methods=['DELETE'])
def delete_album(id):
    album = db.session.get(Album, id) 
    if album:
        db.session.delete(album)
        db.session.commit()
        return '', 204

    return {'error': 'Album not found'}, 404

