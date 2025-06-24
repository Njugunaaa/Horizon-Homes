#!/usr/bin/env python3

from flask import request, session
from flask_restful import Resource
from sqlalchemy.exc import IntegrityError

from config import app, db, api
from models import User, Listing, Feature, Bookmark

# ---------------------- User Authentication ---------------------- #

class Signup(Resource):
    def post(self):
        pass

class Login(Resource):
    def post(self):
        pass

class SessionCheck(Resource):
    def get(self):
        pass

class Logout(Resource):
    def delete(self):
        pass


# ---------------------- LISTING RESOURCES ---------------------- #

class Listings(Resource):
    def get(self):
        pass
    
    def post(self):
        pass
    
class ListingById(Resource):
    def get(self, id):
        pass

    def patch(self, id):
        pass
    
    def delete(self, id):
       pass
   
# ---------------------- FEATURE RESOURCES ---------------------- #

class Features(Resource):
    def post(self, listing_id):
        pass


# ---------------------- BOOKMARK RESOURCES ---------------------- #

class Bookmarks(Resource):
    def get(self):
       pass

    def post(self):
        pass
    
class BookmarkById(Resource):
    def delete(self, id):
        pass


# ---------------------- ROUTE REGISTRATION ---------------------- #

api.add_resource(Signup, '/signup')
api.add_resource(Login, '/login')
api.add_resource(SessionCheck, '/check_session')
api.add_resource(Logout, '/logout')

api.add_resource(Listings, '/listings')
api.add_resource(ListingById, '/listings/<int:id>')

api.add_resource(Features, '/listings/<int:listing_id>/features')

api.add_resource(Bookmarks, '/bookmarks')
api.add_resource(BookmarkById, '/bookmarks/<int:id>')



if __name__ == '__main__':
    app.run(port=5555, debug=True)