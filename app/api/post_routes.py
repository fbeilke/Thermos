from flask import Blueprint, request
from flask_login import login_required, current_user
from app.models import db, Post
from app.forms import PostForm
from .aws import s3_remove_file, s3_upload_file

post_routes = Blueprint('posts', __name__)


@post_routes.route('/')
def get_all_posts():
    """
    Query for all posts and returns them in a dictionary
    """
    posts = Post.query.all()
    return {post.id: post.to_dict() for post in posts}

@post_routes.route('/text', methods=["POST"])
@login_required
def create_text_post():
    """
    Create text post, validate using post form, commit to database
    """
    form = PostForm()
    form['csrf_token'].data = request.cookies['csrf_token']

    if form.validate_on_submit():
        post = Post(
            title=form.data['title'],
            content=form.data['content'],
            caption=None,
            user_id=current_user.id,
            tags=form.data['tags'],
            post_type=form.data['post_type']
            )

        db.session.add(post)
        db.session.commit()
        return post.to_dict()
    return form.errors, 400

@post_routes.route('/<int:id>', methods=["DELETE"])
@login_required
def delete_post(id):
    post_to_delete = Post.query.filter(Post.id == id).first()

    if not post_to_delete:
        return {"message": "Post was not found"}, 404
    else:
        if post_to_delete.post_type != 'text':
            file = post_to_delete.content
            s3_remove_file(file)

        db.session.delete(post_to_delete)
        db.session.commit()
        return {"message": "Successfully deleted"}
