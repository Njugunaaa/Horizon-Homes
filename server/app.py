#!/usr/bin/env python3

from flask import request, session
from flask_restful import Resource
from sqlalchemy.exc import IntegrityError

from config import app, db, api
from models import User, Property, UserProperty, Review


# ------------------------- Authentication -------------------------
class Signup(Resource):
    def post(self):
       pass


class Login(Resource):
    def post(self):
        pass


class Logout(Resource):
    def delete(self):
        pass


class SessionCheck(Resource):
    def get(self):
        pass


# ------------------------- Role Setting -------------------------
class SetRole(Resource):
    def patch(self, user_id):
        pass


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