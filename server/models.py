from sqlalchemy.orm import validates
from sqlalchemy.ext.hybrid import hybrid_property
from sqlalchemy_serializer import SerializerMixin
from sqlalchemy.sql import func


from config import db, bcrypt

class User(db.Model, SerializerMixin):
    __tablename__ = 'users'

    id = db.Column(db.Integer, primary_key=True)
    email = db.Column(db.String(120), unique=True, nullable=False)
    password_hash = db.Column(db.String(128), nullable=False)
    role = db.Column(db.String(20), nullable=False)  # 'owner' or 'user'

    listings = db.relationship('Listing', back_populates='owner', cascade='all, delete', lazy=True)
    bookmarks = db.relationship('Bookmark', back_populates='user', cascade='all, delete', lazy=True)

 # Password setter and getter
    @hybrid_property
    def password_hash(self):
        raise AttributeError("Password hashes may not be viewed.")

    @password_hash.setter
    def password_hash(self, password):
        hashed_password = bcrypt.generate_password_hash(password.encode('utf-8')).decode('utf-8')
        self._password_hash = hashed_password

    def authenticate(self, password):
        return bcrypt.check_password_hash(self._password_hash, password.encode('utf-8'))

class Listing(db.Model, SerializerMixin):
    __tablename__ = 'listings'

    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(120), nullable=False)
    location = db.Column(db.String(100), nullable=False)
    image_url = db.Column(db.String)
    bedrooms = db.Column(db.Integer)
    size = db.Column(db.String(50))
    distance = db.Column(db.String(50))
    price = db.Column(db.Float)
    type = db.Column(db.String(50))
    description = db.Column(db.Text)
    date_posted = db.Column(db.DateTime, default=func.now())

    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)

    owner = db.relationship('User', back_populates='listings' )
    features = db.relationship('Feature', back_populates='listing', cascade='all, delete-orphan', lazy=True)
    bookmarks = db.relationship('Bookmark', back_populates='listing', cascade='all, delete', lazy=True)

class Feature(db.Model, SerializerMixin):
    __tablename__ = 'features'

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), nullable=False)

    listing_id = db.Column(db.Integer, db.ForeignKey('listings.id'), nullable=False)

    listing = db.relationship('Listing', back_populates='features' )


class Bookmark(db.Model, SerializerMixin):
    __tablename__ = 'bookmarks'

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    listing_id = db.Column(db.Integer, db.ForeignKey('listings.id'), nullable=False)
    created_at = db.Column(db.DateTime, default=func.now())

    user = db.relationship( 'User', back_populates='bookmarks')
    listing = db.relationship( 'Listing', back_populates='bookmarks')
