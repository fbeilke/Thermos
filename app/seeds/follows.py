from app.models import db, Follow, environment, SCHEMA
from sqlalchemy.sql import text

def seed_follows():
    follow_1 = Follow(follower=2, following=3)
    follow_2 = Follow(follower=2, following=4)
    follow_3 = Follow(follower=2, following=5)
    follow_4 = Follow(follower=3, following=2)
    follow_5 = Follow(follower=3, following=4)
    follow_6 = Follow(follower=3, following=5)
    follow_7 = Follow(follower=4, following=2)
    follow_8 = Follow(follower=4, following=3)
    follow_9 = Follow(follower=4, following=5)
    follow_10 = Follow(follower=5, following=2)
    follow_11 = Follow(follower=5, following=3)
    follow_12 = Follow(follower=5, following=4)
    follow_13 = Follow(follower=2, following=1)
    follow_14 = Follow(follower=3, following=1)
    follow_15 = Follow(follower=4, following=1)
    follow_16 = Follow(follower=5, following=1)

    follows_to_seed = [follow_1, follow_2, follow_3, follow_4, follow_5, follow_6,
        follow_7, follow_8, follow_9, follow_10, follow_11, follow_12,
        follow_13, follow_14, follow_15, follow_16]

    for follow in follows_to_seed:
        db.session.add(follow)

    db.session.commit()

def undo_follows():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.follows RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM follows"))

    db.session.commit()
