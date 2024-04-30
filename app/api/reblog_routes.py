from flask import Blueprint, request
from flask_login import login_required, current_user
from app.models import db, Reblog
from .aws import s3_remove_file

reblog_routes = Blueprint('reblogs', __name__)

@reblog_routes.route('/')
def get_all_reblogs():
    """
    Query for all reblogs and returns them in a dictionary
    """
    reblogs = Reblog.query.all()
    return {reblog.id: reblog.to_dict() for reblog in reblogs}

@reblog_routes.route('/', methods=["POST"])
@login_required
def reblog_as_is():

    post = request.json

    new_reblog = Reblog(
        user_id=current_user.id,
        post_id=post["id"],
        comment_content=None,
        caption=None,
        tags=None,
        post_type='text',
        reblogged_from_id = post["userId"]
    )

    db.session.add(new_reblog)
    db.session.commit()
    return {"message": "Successfully created"}
