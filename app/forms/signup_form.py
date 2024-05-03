from flask_wtf import FlaskForm
from wtforms import StringField, FileField
from wtforms.validators import DataRequired, Email, ValidationError, Length
from flask_wtf.file import FileAllowed
from app.models import User
from app.api.aws import ALLOWED_EXTENSIONS


def user_exists(form, field):
    # Checking if user exists
    email = field.data
    user = User.query.filter(User.email == email).first()
    if user:
        raise ValidationError('Email address is already in use.')


def blog_name_exists(form, field):
    # Checking if username is already in use
    blog_name = field.data
    user = User.query.filter(User.blog_name == blog_name).first()
    if user:
        raise ValidationError('Blog name is already in use.')


class SignUpForm(FlaskForm):
    blog_name = StringField(
        'blog name', validators=[DataRequired(), blog_name_exists])
    email = StringField('email', validators=[DataRequired(), user_exists])
    password = StringField('password', validators=[DataRequired(), Length(min=8, max=255, message="Password must be minimum 8 characters")])
    profile_picture_url = FileField('profile picture url', validators=[FileAllowed(list(ALLOWED_EXTENSIONS), "Must be an image file with an allowed extension")] )
