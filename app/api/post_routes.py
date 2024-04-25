from flask import Blueprint
from flask_login import login_required
from app.models import Post

post_routes = Blueprint('posts', __name__)


@post_routes.route('/')
def get_all_posts():
    """
    Query for all posts and returns them in a dictionary
    """
    posts = Post.query.all()
    return {post.id: post.to_dict() for post in posts}
