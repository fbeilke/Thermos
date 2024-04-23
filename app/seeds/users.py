from app.models import db, User, environment, SCHEMA
from sqlalchemy.sql import text


# Adds a demo user, you can add other users here if you want
def seed_users():
    demo = User(
        blog_name='demouser', email='demo@aa.io', password='password', profile_picture_url='https://thermos-project-bucket.s3.us-east-2.amazonaws.com/little-paper-guy.jpg')
    freddy = User(
        blog_name='freddy', email='freddy@fazbear.com', password='freddypassword', profile_picture_url='https://thermos-project-bucket.s3.us-east-2.amazonaws.com/bandw-monster.jpg')
    bonnie = User(
        blog_name='bonnie', email='bonnie@fazbear.com', password='bonniepassword', profile_picture_url='https://thermos-project-bucket.s3.us-east-2.amazonaws.com/surprised-cute.jpg')
    chica = User(
        blog_name='chica', email='chica@fazbear.com', password='chicapassword', profile_picture_url='https://thermos-project-bucket.s3.us-east-2.amazonaws.com/neon-person.jpg')
    foxy = User(
        blog_name='foxy', email='foxy@fazbear.com', password='foxypassword', profile_picture_url='https://thermos-project-bucket.s3.us-east-2.amazonaws.com/cute-weird-dog.jpg')


    db.session.add(demo)
    db.session.add(freddy)
    db.session.add(bonnie)
    db.session.add(chica)
    db.session.add(foxy)
    db.session.commit()


# Uses a raw SQL query to TRUNCATE or DELETE the users table. SQLAlchemy doesn't
# have a built in function to do this. With postgres in production TRUNCATE
# removes all the data from the table, and RESET IDENTITY resets the auto
# incrementing primary key, CASCADE deletes any dependent entities.  With
# sqlite3 in development you need to instead use DELETE to remove all data and
# it will reset the primary keys for you as well.
def undo_users():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.users RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM users"))

    db.session.commit()
