from sqlalchemy.orm import validates
from sqlalchemy.ext.hybrid import hybrid_property
from sqlalchemy_serializer import SerializerMixin
from sqlalchemy.sql import func

from config import db, bcrypt

class User(db.Model, SerializerMixin):
    __tablename__ = 'users'
    
    serialize_rules = ('-user_properties.user', '-_password_hash',)

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(120), unique=True, nullable=False)
    email = db.Column(db.String(120), unique=True, nullable=False)
    password_hash = db.Column(db.String(128), nullable=False)
    role = db.Column(db.String(20), nullable=False)  # 'owner' or 'user'

    user_properties = db.relationship('UserProperty', back_populates='user', cascade="all, delete-orphan")

    # Password protection
    @hybrid_property
    def password_hash(self):
        raise AttributeError("Password hashes may not be viewed.")

    @password_hash.setter
    def password_hash(self, password):
        hashed_password = bcrypt.generate_password_hash(password.encode('utf-8')).decode('utf-8')
        self._password_hash = hashed_password

    def authenticate(self, password):
        return bcrypt.check_password_hash(self._password_hash, password.encode('utf-8'))
    
    @validates('name')
    def validate_name(self, key, name):
        if len(name) < 5:
            raise ValueError("Username must be at least 5 characters long.")
        existing = User.query.filter_by(name=name).first()
        if existing:
            raise ValueError("Username must be unique.")
        return name
    
    @validates('email')
    def validate_email(self, key, email):
        if '@' not in email or '.' not in email:
            raise ValueError("Email must contain '@' and '.' to be valid.")
        
        existing = User.query.filter_by(email=email).first()
        if existing:
            raise ValueError("Email must be unique.")
        return email



class Property(db.Model, SerializerMixin):
    __tablename__ = 'properties'
    
    serialize_rules = ('-user_properties.property',)

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
    features = db.Column(db.String, default="")
    date_posted = db.Column(db.DateTime, default=func.now())

    user_properties = db.relationship('UserProperty', back_populates='property', cascade="all, delete-orphan")
    
class UserProperty(db.Model, SerializerMixin):
    __tablename__ = 'user_properties'
    
    serialize_rules = ('-user.user_properties', '-property.user_properties', '-reviews.user_property')

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'))
    property_id = db.Column(db.Integer, db.ForeignKey('properties.id'))
    created_at = db.Column(db.DateTime, default=func.now())

    user = db.relationship('User', back_populates='user_properties')
    property = db.relationship('Property', back_populates='user_properties')
    reviews = db.relationship('Review', back_populates='user_property', cascade="all, delete-orphan")
    
class Review(db.Model, SerializerMixin):
    __tablename__ = 'reviews'
    
    serialize_rules = ('-user_property.reviews',)

    id = db.Column(db.Integer, primary_key=True)
    comments = db.Column(db.String)
    ratings = db.Column(db.Integer)
    user_property_id = db.Column(db.Integer, db.ForeignKey('user_properties.id'))
    created_at = db.Column(db.DateTime, default=func.now())
    
    user_property = db.relationship('UserProperty', back_populates='reviews')


    






