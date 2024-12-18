from flask import Blueprint, request, jsonify, abort, current_app
from app.models.photo import Photo
from app import db

photo_routes = Blueprint('photo_routes', __name__)

@photo_routes.route('/api/photos/<int:id>', methods=['GET'])
def get_photo_by_id(id):
    with current_app.app_context():
        photo = db.session.get(Photo, id)    
        if photo is None:
         abort(404)

    return jsonify({
        'id': photo.id,
        'album_id': photo.album_id,
        'title': photo.title,
        'url': photo.url
    })

@photo_routes.route('/api/photos', methods=['GET'])
def get_photos_by_album_id():
    album_id = request.args.get('album_id')
    if album_id:
        photos = Photo.query.filter_by(album_id=album_id).all()
        if not photos:
            return jsonify({'error': 'No photos found for this album'}), 404
    else:
        photos = Photo.query.all()

    return jsonify([{
        'id': photo.id,
        'album_id': photo.album_id,
        'title': photo.title,
        'url': photo.url
    } for photo in photos])

@photo_routes.route('/api/photos', methods=['POST'])
def create_photo():
    data = request.get_json()
    new_photo = Photo(album_id=data['album_id'], title=data['title'], url=data['url'])
    db.session.add(new_photo)
    db.session.commit()
    return jsonify({
        'id': new_photo.id,
        'album_id': new_photo.album_id,
        'title': new_photo.title,
        'url': new_photo.url
    }), 201

@photo_routes.route('/api/photos/<int:id>', methods=['PUT'])
def update_photo(id):
    data = request.get_json()
    photo = db.session.get(Photo, id)
    if photo is None:
        return jsonify({'error': 'Photo not found'}), 404

    photo.album_id = data.get('album_id', photo.album_id)
    photo.url = data.get('url', photo.url)
    photo.title = data.get('title', photo.title)

    db.session.commit()

    return jsonify({
        'id': photo.id,
        'title': photo.title,
        'album_id': photo.album_id,
        'url': photo.url
    })

@photo_routes.route('/api/photos/<int:id>', methods=['PATCH'])
def patch_photo(id):
    data = request.get_json()
    photo = db.session.get(Photo, id)
    if photo is None:
        return jsonify({'error': 'Photo not found'}), 404
    
    photo.title = data.get('title', photo.title)
    photo.album_id = data.get('album_id', photo.album_id)
    photo.url = data.get('url', photo.url)
    
    db.session.commit()

    return jsonify({
        'id': photo.id,
        'album_id': photo.album_id,
        'title': photo.title,
        'url': photo.url
    })

@photo_routes.route('/api/photos/<int:id>', methods=['DELETE'])
def delete_photo(id):
    photo = db.session.get(Photo, id)
    if photo is None:
        return jsonify({'error': 'Photo not found'}), 404 
    db.session.delete(photo)
    db.session.commit()
    return jsonify({'message': 'Photo deleted'}), 204

@photo_routes.route('/api/photos/<int:id>/title', methods=['GET'])
def get_photo_by_title(id):
    photo = Photo.query.get(id)
    if photo is None:
        abort(404)

    return jsonify({
        'id': photo.id,
        'album_id': photo.album_id,
        'title': photo.title,
        'url': photo.url
    })

@photo_routes.route('/api/photos/<int:id>/title', methods=['PUT'])
def update_photo_by_title(id):
    data = request.get_json()
    photo = Photo.query.get(id)
    if photo is None:
        return jsonify({'error': 'Photo not found'}), 404

    photo.title = data.get('title', photo.title)
    photo.album_id = data.get('album_id', photo.album_id)
    photo.url = data.get('url', photo.url)

    db.session.commit()

    return jsonify({
        'id': photo.id,
        'title': photo.title,
        'album_id': photo.album_id,
        'url': photo.url
    })

@photo_routes.route('/api/photos/<int:id>/title', methods=['PATCH'])
def patch_photo_by_title(id):
    data = request.get_json()
    photo = Photo.query.get(id)
    if photo is None:
        return jsonify({'error': 'Photo not found'}), 404
    
    photo.title = data.get('title', photo.title)
    photo.album_id = data.get('album_id', photo.album_id)
    photo.url = data.get('url', photo.url)
    
    db.session.commit()

    return jsonify({
        'id': photo.id,
        'album_id': photo.album_id,
        'title': photo.title,
        'url': photo.url
    })