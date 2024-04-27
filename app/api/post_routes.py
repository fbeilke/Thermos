from flask import Blueprint, request
from flask_login import login_required, current_user
from app.models import db, Post
from app.forms import PostForm, PostFileForm
from .aws import s3_remove_file, s3_upload_file, unique_filename

post_routes = Blueprint('posts', __name__)


@post_routes.route('/')
def get_all_posts():
    """
    Query for all posts and returns them in a dictionary
    """
    posts = Post.query.all()
    return {post.id: post.to_dict() for post in posts}

@post_routes.route('/', methods=["POST"])
@login_required
def create_post():
    """
    Create post, validate using post form, commit to database
    """
    form = PostForm()
    form['csrf_token'].data = request.cookies['csrf_token']

    if form.validate_on_submit():
        post = Post(
            title=form.data['title'],
            content=form.data['content'],
            caption=form.data['caption'],
            user_id=current_user.id,
            tags=form.data['tags'],
            post_type=form.data['post_type']
            )

        db.session.add(post)
        db.session.commit()
        return post.to_dict()
    return form.errors, 400

@post_routes.route('/file', methods=["POST"])
@login_required
def submit_file():
    """
    Submit file to put on new post, return url
    """

    form = PostFileForm()
    form['csrf_token'].data = request.cookies['csrf_token']

    if form.validate_on_submit():
        file = form.data["file"]

        file.filename = unique_filename(file.filename)
        upload = s3_upload_file(file)

        if "url" not in upload:
            return {errors: upload}, 400

        url = upload["url"]

        return {"url": url}
    return form.errors, 400


@post_routes.route('/file/remove', methods=["POST"])
@login_required
def remove_file():
    """
    Remove file without it being attached to a post, delete from s3 bucket
    """

    url_string = str(request.data).replace("b'", "")

    removed = s3_remove_file(url_string)

    if removed != True:
        return {"error": "File was not able to be removed"}, 500

    return {"message": "Successfully removed file"}


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
