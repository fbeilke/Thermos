from app.models import db, Reblog, environment, SCHEMA
from sqlalchemy.sql import text

def seed_reblogs():
    reblog_1 = Reblog(
        user_id=3,
        post_id=10,
        comment_content="App Academy is the GOAT",
        caption=None,
        tags="app academy,computers",
        post_type="text",
        reblogged_from_id=2
    )
    reblog_2 = Reblog(
        user_id=2,
        post_id=16,
        comment_content="Voweer!!",
        caption=None,
        tags=None,
        post_type="text",
        reblogged_from_id=5
    )
    reblog_3 = Reblog(
        user_id=3,
        post_id=19,
        comment_content="Ooh, listening with headphones it bounces back and forth between ears",
        caption=None,
        tags=None,
        post_type="text",
        reblogged_from_id=2
    )
    reblog_4 = Reblog(
        user_id=4,
        post_id=2,
        comment_content="I don't think I speak whatever language this is.",
        caption=None,
        tags=None,
        post_type="text",
        reblogged_from_id=2
    )
    reblog_5 = Reblog(
        user_id=4,
        post_id=36,
        comment_content="Drop the name of the game, bruv",
        caption=None,
        tags=None,
        post_type="text",
        reblogged_from_id=5
    )
    reblog_6 = Reblog(
        user_id=2,
        post_id=23,
        comment_content="Thanks for sharing this! I love learning about computers",
        caption=None,
        tags="computers",
        post_type="text",
        reblogged_from_id=4
    )
    reblog_7 = Reblog(
        user_id=4,
        post_id=15,
        comment_content=None,
        caption=None,
        tags=None,
        post_type="text",
        reblogged_from_id=3
    )
    reblog_8 = Reblog(
        user_id=2,
        post_id=7,
        comment_content="Tongues are always weird, but this makes me extra uncomfortable for some reason.",
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
    reblog_10 = Reblog(
        user_id=5,
        post_id=24,
        comment_content="Gah! Why would you post this? I will have nightmares now...",
        caption=None,
        tags='if I had to see it,so do you',
        post_type="text",
        reblogged_from_id=4
    )

    db.session.add(reblog_1)
    db.session.add(reblog_2)
    db.session.add(reblog_3)
    db.session.add(reblog_4)
    db.session.add(reblog_5)
    db.session.add(reblog_6)
    db.session.add(reblog_7)
    db.session.add(reblog_8)
    db.session.add(reblog_9)
    db.session.add(reblog_10)

    db.session.commit()


def undo_reblogs():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.reblogs RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM reblogs"))

    db.session.commit()
