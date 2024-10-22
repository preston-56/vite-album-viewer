from app import db

class Album(db.Model):
    __tablename__ = 'albums'

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)
    title = db.Column(db.String(100), nullable=False)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'))

    photos = db.relationship('Photo', backref='album', lazy=True)
    user = db.relationship('User', backref='albums')

    def __repr__(self):
        return f"<Album {self.title}>"
