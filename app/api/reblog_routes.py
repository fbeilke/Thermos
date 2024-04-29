from flask import Blueprint, request
from flask_login import login_required, current_user
from app.models import db, Reblog
from app.forms import ReblogForm
from .aws import s3_remove_file

reblog_routes = Blueprint('reblogs', __name__)

@reblog_routes.route('/')
def get_all_reblogs():
    """
    Query for all reblogs and returns them in a dictionary
    """
    reblogs = Reblog.query.all()
    return {reblog.id: reblog.to_dict() for reblog in reblogs}
