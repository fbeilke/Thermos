from app.models import db, Reblog, environment, SCHEMA
from sqlalchemy.sql import text

def seed_reblogs():
    reblog_7 = Reblog(
        user_id=4,
        post_id=15,
        comment_content=None,
        caption=None,
        tags=None,
        post_type="text",
        reblogged_from_id=3
    )
    reblog_9 = Reblog(
        user_id=4,
        post_id=39,
        comment_content=None,
        caption=None,
        tags=None,
        post_type="text",
        reblogged_from_id=3
    )

    db.session.add(reblog_7)
    db.session.add(reblog_9)


    db.session.commit()


def undo_reblogs():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.reblogs RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM reblogs"))

    db.session.commit()
