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
    _password_hash = db.Column(db.String(128), nullable=False)
    role = db.Column(db.String(20), nullable=False)  # 'owner' or 'user'
    # ADDED: Timestamp fields for better tracking
    created_at = db.Column(db.DateTime, default=func.now())
    updated_at = db.Column(db.DateTime, default=func.now(), onupdate=func.now())

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
    
    # IMPROVED: Fixed validation to handle updates properly
    @validates('name')
    def validate_name(self, key, name):
        if self.id:
            existing = User.query.filter_by(name=name).filter(User.id != self.id).first()
        else:
            existing = User.query.filter_by(name=name).first()
        if existing:
            raise ValueError("Username must be unique.")
        return name
    
    @validates('email')
    def validate_email(self, key, email):
        if self.id:
            existing = User.query.filter_by(email=email).filter(User.id != self.id).first()
        else:
            existing = User.query.filter_by(email=email).first()
        if existing:
            raise ValueError("Email must be unique.")
        return email

    # ADDED: Helper method to get user's properties
    def get_properties(self):
        return [up.property for up in self.user_properties]
    
    # ADDED: Helper method to get user's reviews
    def get_reviews(self):
        return [review for up in self.user_properties for review in up.reviews]

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
    # ADDED: Status field to track property availability
    status = db.Column(db.String(20), default='available')  # 'available', 'rented', 'maintenance'

    user_properties = db.relationship('UserProperty', back_populates='property', cascade="all, delete-orphan")
    
    # ADDED: Helper method to get average rating
    def get_average_rating(self):
        reviews = [review for up in self.user_properties for review in up.reviews]
        if not reviews:
            return 0
        return round(sum(review.ratings for review in reviews) / len(reviews), 1)
    
    # ADDED: Helper method to get total reviews count
    def get_reviews_count(self):
        return sum(len(up.reviews) for up in self.user_properties)
    
    # ADDED: Helper method to get features as list
    def get_features_list(self):
        return [feature.strip() for feature in self.features.split(',') if feature.strip()] if self.features else []
    
    # ADDED: Helper method to check if property is available
    def is_available(self):
        return self.status == 'available'
    
    # ADDED: Validation for price
    @validates('price')
    def validate_price(self, key, price):
        if price is not None and price < 0:
            raise ValueError("Price cannot be negative.")
        return price
    
    # ADDED: Validation for bedrooms
    @validates('bedrooms')
    def validate_bedrooms(self, key, bedrooms):
        if bedrooms is not None and bedrooms < 0:
            raise ValueError("Bedrooms cannot be negative.")
        return bedrooms
    
class UserProperty(db.Model, SerializerMixin):
    __tablename__ = 'user_properties'
    
    serialize_rules = ('-user.user_properties', '-property.user_properties', '-reviews.user_property')

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'))
    property_id = db.Column(db.Integer, db.ForeignKey('properties.id'))
    created_at = db.Column(db.DateTime, default=func.now())
    # ADDED: Additional fields for better relationship tracking
    relationship_type = db.Column(db.String(20), default='interested')  # 'interested', 'rented', 'owned'
    start_date = db.Column(db.Date)
    end_date = db.Column(db.Date)
    notes = db.Column(db.Text)  # ADDED: Notes field for additional information

    user = db.relationship('User', back_populates='user_properties')
    property = db.relationship('Property', back_populates='user_properties')
    reviews = db.relationship('Review', back_populates='user_property', cascade="all, delete-orphan")
    
    # ADDED: Validation for relationship type
    @validates('relationship_type')
    def validate_relationship_type(self, key, relationship_type):
        valid_types = ['interested', 'rented', 'owned', 'viewed']
        if relationship_type not in valid_types:
            raise ValueError(f"Relationship type must be one of: {', '.join(valid_types)}")
        return relationship_type
    
class Review(db.Model, SerializerMixin):
    __tablename__ = 'reviews'
    
    serialize_rules = ('-user_property.reviews',)

    id = db.Column(db.Integer, primary_key=True)
    comments = db.Column(db.String)
    ratings = db.Column(db.Integer)
    user_property_id = db.Column(db.Integer, db.ForeignKey('user_properties.id'))
    created_at = db.Column(db.DateTime, default=func.now())
    # ADDED: Updated timestamp for review modifications
    updated_at = db.Column(db.DateTime, default=func.now(), onupdate=func.now())
    
    user_property = db.relationship('UserProperty', back_populates='reviews')

    # ADDED: Validation for ratings
    @validates('ratings')
    def validate_ratings(self, key, rating):
        if rating is not None and (rating < 1 or rating > 5):
            raise ValueError("Rating must be between 1 and 5")
        return rating
    
    # ADDED: Validation for comments
    @validates('comments')
    def validate_comments(self, key, comments):
        if comments and len(comments.strip()) < 5:
            raise ValueError("Comments must be at least 5 characters long")
        return comments
    
    # ADDED: Helper method to get reviewer name
    def get_reviewer_name(self):
        return self.user_property.user.name if self.user_property and self.user_property.user else "Anonymous"
