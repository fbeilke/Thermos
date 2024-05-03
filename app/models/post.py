from .db import db, environment, SCHEMA, add_prefix_for_prod
from datetime import datetime

class Post(db.Model):
    __tablename__ = 'posts'

    if environment == 'production':
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(255))
    content = db.Column(db.String)
    caption = db.Column(db.String)
    user_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('users.id')), nullable=False)
    likes = db.Column(db.Integer, default=0)
    tags = db.Column(db.String(1000))
    post_type = db.Column(db.String(25), nullable=False)
    previous_post_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('posts.id'), ondelete='CASCADE'))
    created_at = db.Column(db.DateTime, default=datetime.now())
    updated_at = db.Column(db.DateTime, default=datetime.now(), onupdate=datetime.now())

    creator_user = db.relationship("User", back_populates="posts")
    post_reblogs = db.relationship("Reblog", back_populates="original_post", cascade="all, delete-orphan")
    previous_post = db.relationship("Post", remote_side=[id])

    def to_dict(self):
        return {
            'id': self.id,
            'title': self.title,
            'content': self.content,
            'caption': self.caption,
            'userId': self.user_id,
            'likes': self.likes,
            'tags': self.tags,
            'postType': self.post_type,
            'previousPostId': self.previous_post_id,
            'createdAt': self.created_at,
            'creator': self.creator_user.blog_name,
            'creatorImage': self.creator_user.profile_picture_url
        }
