from flask import Blueprint, jsonify
from flask_login import login_required
from app.models import User

user_routes = Blueprint('users', __name__)


@user_routes.route('/')
def users():
    """
    Query for all users and returns them in a list of user dictionaries
    """
    users = User.query.all()
    return {user.id: user.to_dict() for user in users}


@user_routes.route('/<string:blog_name>')
def user(blog_name):
    """
    Query for a user by id and returns that user in a dictionary
    """

    user = User.query.filter(User.blog_name == blog_name).first()
    if user:
        return user.to_dict()
    else:
        return {"error": "User was not found"}, 404
