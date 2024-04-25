"""create_all_tables

Revision ID: ffdc0a98111c
Revises:
Create Date: 2020-11-20 15:06:02.230689

"""
from alembic import op
import sqlalchemy as sa

import os
environment = os.getenv("FLASK_ENV")
SCHEMA = os.environ.get("SCHEMA")


# revision identifiers, used by Alembic.
revision = 'ffdc0a98111c'
down_revision = None
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.create_table('users',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('blog_name', sa.String(length=50), nullable=False),
    sa.Column('email', sa.String(length=255), nullable=False),
    sa.Column('hashed_password', sa.String(length=255), nullable=False),
    sa.Column('profile_picture_url', sa.String(length=255), nullable=False),
    sa.Column('created_at', sa.DateTime(), nullable=True),
    sa.Column('updated_at', sa.DateTime(), nullable=True),
    sa.PrimaryKeyConstraint('id'),
    sa.UniqueConstraint('email'),
    sa.UniqueConstraint('blog_name')
    )

    op.create_table('posts',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('title', sa.String(length=255)),
    sa.Column('content', sa.String(), nullable=False),
    sa.Column('caption', sa.String()),
    sa.Column('user_id', sa.Integer(), nullable=False),
    sa.Column('likes', sa.Integer),
    sa.Column('tags', sa.String(length=1000)),
    sa.Column('post_type', sa.String(length=25), nullable=False),
    sa.Column('created_at', sa.DateTime()),
    sa.Column('updated_at', sa.DateTime()),
    sa.ForeignKeyConstraint(['user_id'], ['users.id']),
    sa.PrimaryKeyConstraint('id')
    )

    if environment == "production":
        op.execute(f"ALTER TABLE users SET SCHEMA {SCHEMA};")
        op.execute(f"ALTER TABLE posts SET SCHEMA {SCHEMA};")
    # ### end Alembic commands ###qqqqqqqqq


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_table('users')
    # op.drop_table('posts')
    # ### end Alembic commands ###
