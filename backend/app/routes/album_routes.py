from flask import Blueprint, request, jsonify, abort
from app.models.album import Album
from app import db

album_routes = Blueprint('album_routes', __name__)

@album_routes.route('/api/albums', methods=['GET'])
def get_albums():
    albums = Album.query.all()
    return jsonify([{ 'album_id': album.id, 'user_id': album.user_id, 'title': album.title } for album in albums])

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

@album_routes.route('/api/albums/<int:id>', methods=['GET'])
def get_album(id):
    album = db.session.get(Album, id)
    if album is None:
        abort(404)
    return jsonify({
        'album_id': album.id,
        'user_id': album.user_id,
        'title': album.title
    })
