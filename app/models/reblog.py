from .db import db, environment, SCHEMA, add_prefix_for_prod
from datetime import datetime

class Reblog(db.Model):
    __tablename__ = 'reblogs'

    if environment == 'production':
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('users.id')), nullable=False)
    post_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('posts.id'), ondelete='CASCADE'))
    reblog_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('reblogs.id'), ondelete='CASCADE'))
    comment_content = db.Column(db.String)
    caption = db.Column(db.String)
    tags = db.Column(db.String(1000))
    post_type = db.Column(db.String(25), nullable=False)
    reblogged_from_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('users.id')), nullable=False)
    created_at = db.Column(db.DateTime, default=datetime.now())
    updated_at = db.Column(db.DateTime, default=datetime.now(), onupdate=datetime.now())

    reblog_of_reblog = db.relationship("Reblog", remote_side=[id])
    reblog_creator = db.relationship("User", back_populates='reblogs', foreign_keys=[user_id])
    original_post = db.relationship("Post", back_populates='post_reblogs')
    reblogged_from = db.relationship("User", foreign_keys=[reblogged_from_id])

    def to_dict(self):
        reblog = {
            'id': self.id,
            'userId': self.user_id,
            'postId': self.post_id,
            'commentContent': self.comment_content,
            'caption': self.caption,
            'tags': self.tags,
            'postType': self.post_type,
            'rebloggedFrom': self.reblogged_from.blog_name,
            'createdAt': self.created_at,
            'reblogCreator': self.reblog_creator.blog_name,
        }

        if (self.post_id):
            reblog['originalPost'] = self.original_post.to_dict()

        if (self.reblog_id):
            reblog['originalPost'] = self.reblog_of_reblog.to_dict()

        return reblog
