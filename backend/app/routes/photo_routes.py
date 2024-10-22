from flask import Blueprint, request, jsonify
from app.models.photo import Photo
from app import db

photo_routes = Blueprint('photo_routes', __name__)

@photo_routes.route('/api/photos', methods=['GET'])
def get_photos():
    photos = Photo.query.all()
    return jsonify([{ 'id': photo.id, 'album_id': photo.album_id, 'title': photo.title, 'url': photo.url } for photo in photos])

@photo_routes.route('/api/photos', methods=['POST'])
def create_photo():
    data = request.get_json()
    new_photo = Photo(album_id=data['album_id'], title=data['title'], url=data['url'])
    db.session.add(new_photo)
    db.session.commit()
    return jsonify({ 'id': new_photo.id, 'album_id': new_photo.album_id, 'title': new_photo.title, 'url': new_photo.url }), 201

@photo_routes.route('/api/photos/<int:id>', methods=['PUT'])
def update_photo(id):
    data = request.get_json()
    photo = Photo.query.get_or_404(id)
    photo.album_id = data['album_id']
    photo.title = data['title']
    photo.url = data['url']
    db.session.commit()
    return jsonify({ 'id': photo.id, 'album_id': photo.album_id, 'title': photo.title, 'url': photo.url })

@photo_routes.route('/api/photos/<int:id>', methods=['DELETE'])
def delete_photo(id):
    photo = Photo.query.get_or_404(id)
    db.session.delete(photo)
    db.session.commit()
    return jsonify({ 'message': 'Photo deleted' }), 204
