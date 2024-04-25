from .db import db, environment, SCHEMA, add_prefix_for_prod
from datetime import datetime

class Post(db.Model):
    __tablename__ = 'posts'

    if environment == 'production':
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(255))
    content = db.Column(db.String, nullable=False)
    caption = db.Column(db.String)
    user_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('users.id')), nullable=False)
    likes = db.Column(db.Integer, default=0)
    tags = db.Column(db.String(1000))
    post_type = db.Column(db.String(25), nullable=False)
    created_at = db.Column(db.DateTime, default=datetime.now())
    updated_at = db.Column(db.DateTime, default=datetime.now(), onupdate=datetime.now())

    creator_user = db.relationship("User", back_populates="posts")

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
            'createdAt': self.created_at,
            'creator': self.creator_user
        }