from flask import Blueprint
from flask_login import login_required, current_user
from app.models import db, Follow

follow_routes = Blueprint('follows', __name__)

@follow_routes.route('/<int:id>', methods=["POST"])
@login_required
def add_follow(id):

    new_follow = Follow(follower=current_user.id, following=id)
    db.session.add(new_follow)
    db.session.commit()
    return {"message": "Follow successful"}


@follow_routes.route('/<int:id>', methods=["DELETE"])
@login_required
def unfollow(id):
    follow_to_delete = Follow.query.filter(Follow.follower == current_user.id and Follow.following == id).first()

    if not follow_to_delete:
        return {"message": "Follow was not found"}, 404
    else:
        db.session.delete(follow_to_delete)
        db.session.commit()
        return {"message": "Successfully deleted"}
