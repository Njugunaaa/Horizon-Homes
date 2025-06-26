#!/usr/bin/env python3

from flask import request, session
from flask_restful import Resource
from sqlalchemy.exc import IntegrityError

from config import app, db, api
from models import User, Property, UserProperty, Review


# ------------------------- Authentication -------------------------
class Signup(Resource):
    def post(self):
        data = request.get_json()
        name = data.get('name')
        email = data.get('email')
        password = data.get('password')
        role=""  # role chosen later

        if not name or not email or not password :
            return {'message': 'Email, password are required.'}, 400

        try:
            new_user = User(name=name, email=email, role=role)
            new_user.password_hash = password  

            db.session.add(new_user)
            db.session.commit()
            session['user_id'] = new_user.id  

            return {'message': 'User created successfully.',
            'user':{
                'id': new_user.id,
                'email': new_user.email,
                'role': new_user.role }
            }, 201

        except IntegrityError:
            return {'error': 'User with this email already exists.'}, 409


class Login(Resource):
    def post(self):
        data = request.get_json()
        email = data.get('email')
        password = data.get('password')
        role = data.get('role') 

        if not email or not password:
            return {'message': 'Email and password are required.'}, 400

        user = User.query.filter_by(email=email).first()

        if user and user.authenticate(password):
            session['user_id'] = user.id  
            return {'message': 'Login successful.',
                    'user': {
                        'id': user.id,
                        'email': user.email,
                        'role': user.role
                    }}, 200
        else:
            return {'error': 'Invalid email or password.'}, 401


class Logout(Resource):
    def delete(self):
        session.clear()
        return {}, 204


class SessionCheck(Resource):
    def get(self):
        user_id = session.get('user_id')
        if user_id:
            user = User.query.get(user_id)
            return user.to_dict(rules=('-user_properties',)), 200
        return {}, 401



# ------------------------- Role Setting -------------------------
class SetRole(Resource):
    def patch(self, user_id):
        data = request.get_json()
        user = User.query.get(user_id)
        if user:
            user.role = data.get("role")
            db.session.commit()
            return user.to_dict(rules=('-user_properties',)), 200
        return {"error": "User not found"}, 404


# ------------------------- Properties -------------------------
class PropertyList(Resource):
    def get(self):
        pass

    def post(self):
        pass


class PropertyByID(Resource):
    def patch(self, property_id):
        pass

    def delete(self, property_id):
        pass


class OwnerProperties(Resource):
    def get(self, user_id):
        pass



# ------------------------- Reviews -------------------------
class Reviews(Resource):
    def post(self):
       pass


class PropertyReviews(Resource):
    def get(self, property_id):
        pass


# ------------------------- Registerd Resources -------------------------
api.add_resource(Signup, '/signup')
api.add_resource(Login, '/login')
api.add_resource(Logout, '/logout')
api.add_resource(SessionCheck, '/check_session')
api.add_resource(SetRole, '/set_role/<int:user_id>')

api.add_resource(PropertyList, '/properties')
api.add_resource(PropertyByID, '/properties/<int:property_id>')
api.add_resource(OwnerProperties, '/owner/<int:user_id>/properties')

api.add_resource(Reviews, '/reviews')
api.add_resource(PropertyReviews, '/properties/<int:property_id>/reviews')



if __name__ == '__main__':
    app.run(port=5555, debug=True)