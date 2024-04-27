from flask_wtf import FlaskForm
from wtforms import StringField
from wtforms.validators import InputRequired, Length, Optional, AnyOf
from flask_wtf.file import FileAllowed, FileField, FileRequired
from app.api.aws import ALLOWED_EXTENSIONS

class PostForm(FlaskForm):
    title = StringField('Title', validators=[Optional(), Length(max=255, message='Max title length is 255 characters')])
    content = StringField('Content', validators=[InputRequired(message='Content is required to make a new post')])
    caption = StringField('Caption', validators=[Optional()])
    tags = StringField('Tags', validators=[Optional(), Length(max=1000, message='Tag can be a maximum of 1000 characters long')])
    post_type = StringField('Post Type', validators=[AnyOf(['text', 'photo', 'video', 'audio'], message='Post must be text, photo, video, or audio')] )


class PostFileForm(FlaskForm):
    file = FileField(validators=[FileRequired(), FileAllowed(list(ALLOWED_EXTENSIONS))])
