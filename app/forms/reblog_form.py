from flask_wtf import FlaskForm
from wtforms import StringField
from wtforms.validators import Length, Optional, AnyOf

class ReblogForm(FlaskForm):
    comment_content = StringField('Comment Content', validators=[Optional()])
    caption = StringField('Caption', validators=[Optional()])
    tags = StringField('Tags', validators=[Optional(), Length(max=1000, message='Tag can be a maximum of 1000 characters long')])
    post_type = StringField('Post Type', validators=[AnyOf(['text', 'photo', 'video', 'audio'], message='Post must be text, photo, video, or audio')] )
