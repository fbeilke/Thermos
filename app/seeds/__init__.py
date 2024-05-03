from flask.cli import AppGroup
from .users import seed_users, undo_users
from .posts import seed_posts, undo_posts
<<<<<<< HEAD
from .reblogs import seed_reblogs, undo_reblogs
# from .follows import seed_follows, undo_follows
=======
>>>>>>> e5fef0f9e251cd53757e14c5ff1a00dfbcbc4ae8

from app.models.db import db, environment, SCHEMA

# Creates a seed group to hold our commands
# So we can type `flask seed --help`
seed_commands = AppGroup('seed')


# Creates the `flask seed all` command
@seed_commands.command('all')
def seed():
    if environment == 'production':
        # Before seeding in production, you want to run the seed undo
        # command, which will  truncate all tables prefixed with
        # the schema name (see comment in users.py undo_users function).
        # Make sure to add all your other model's undo functions below
        undo_users()
        undo_posts()
<<<<<<< HEAD
        undo_reblogs()
        # undo_follows()
    seed_users()
    seed_posts()
    seed_reblogs()
    # seed_follows()
=======
    seed_users()
    seed_posts()
>>>>>>> e5fef0f9e251cd53757e14c5ff1a00dfbcbc4ae8
    # Add other seed functions here


# Creates the `flask seed undo` command
@seed_commands.command('undo')
def undo():
    undo_users()
    undo_posts()
<<<<<<< HEAD
    undo_reblogs()
    # undo_follows()
=======
>>>>>>> e5fef0f9e251cd53757e14c5ff1a00dfbcbc4ae8
    # Add other undo functions here
