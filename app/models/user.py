from .db import db, environment, SCHEMA, add_prefix_for_prod
from .reblog import Reblog
from .follow import Follow
from werkzeug.security import generate_password_hash, check_password_hash
from flask_login import UserMixin
from datetime import datetime


class User(db.Model, UserMixin):
    __tablename__ = 'users'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    blog_name = db.Column(db.String(50), nullable=False, unique=True)
    email = db.Column(db.String(255), nullable=False, unique=True)
    hashed_password = db.Column(db.String(255), nullable=False)
    profile_picture_url = db.Column(db.String(255), nullable=False)
    created_at = db.Column(db.DateTime, default=datetime.now())
    updated_at = db.Column(db.DateTime, default=datetime.now(), onupdate=datetime.now())

    posts = db.relationship("Post", back_populates="creator_user")
    reblogs = db.relationship("Reblog", back_populates="reblog_creator", foreign_keys=[Reblog.user_id])
    all_followers = db.relationship("Follow", foreign_keys=[Follow.follower])
    all_following = db.relationship("Follow", foreign_keys=[Follow.following])
    likes = db.relationship("Like", back_populates='like_creator')

    @property
    def password(self):
        return self.hashed_password

    @password.setter
    def password(self, password):
        self.hashed_password = generate_password_hash(password)

    def check_password(self, password):
        return check_password_hash(self.password, password)

    def to_dict(self):
        following = [follower_row.following for follower_row in self.all_followers]
        liked_posts_by_user = [like.liked_post.to_dict() for like in self.likes]

        return {
            'id': self.id,
            'blogName': self.blog_name,
            'email': self.email,
            'profilePictureUrl': self.profile_picture_url,
            'following': following,
            'likedPostsByUser': liked_posts_by_user
        }

    def to_dict_plus(self):
        posts_by_user = [post.to_dict() for post in self.posts]
        reblogs_by_user = [reblog.to_dict() for reblog in self.reblogs]
        following = [follower_row.following for follower_row in self.all_followers]
        followers = [following_row.follower for following_row in self.all_following]
        liked_posts_by_user = [like.liked_post.to_dict() for like in self.likes]

        return {
            'id': self.id,
            'blogName': self.blog_name,
            'email': self.email,
            'profilePictureUrl': self.profile_picture_url,
            'postsByUser': posts_by_user,
            'reblogsByUser': reblogs_by_user,
            'followers': followers,
            'following': following,
            'likedPostsByUser': liked_posts_by_user
        }
