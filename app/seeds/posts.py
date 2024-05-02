from app.models import db, User, environment, SCHEMA
from sqlalchemy.sql import text
from app.models.post import Post

def seed_posts():
    post_1 = Post(
        title="A cursed sound",
        content="https://thermos-project-bucket.s3.us-east-2.amazonaws.com/shitbird+-+lofi+limbo.mp3",
        caption="a royalty-free 'lofi' song by an artist named sh**bird",
        user_id=4,
        likes=0,
        tags="music,song,loud",
        post_type="audio",
        previous_post_id=None
        )
    post_2 = Post(
        title="Abstract AI Generated Art",
        content="https://thermos-project-bucket.s3.us-east-2.amazonaws.com/abstract.jpg",
        caption="I don't know what it is, but it speaks to me anyway.",
        user_id=2,
        likes=0,
        tags="art,ai generated,abstract",
        post_type="photo",
        previous_post_id=None
        )
    post_3 = Post(
        title="I never know what to say",
        content="Hello Thermos!",
        caption=None,
        user_id=2,
        likes=0,
        tags="text post,hello",
        post_type="text",
        previous_post_id=None
        )
    post_4 = Post(
        title="Me coming for your girl",
        content="https://thermos-project-bucket.s3.us-east-2.amazonaws.com/monster-running-gif.jpg",
        caption=None,
        user_id=5,
        likes=0,
        tags="gif,monster,joke",
        post_type="photo",
        previous_post_id=None
        )
    post_5 = Post(
        title=None,
        content="I really like to write poetry. It just isn't any good.",
        caption=None,
        user_id=3,
        likes=0,
        tags="text post,poetry",
        post_type="text",
        previous_post_id=None
        )
    post_6 = Post(
        title=None,
        content="In fields of green where wild flowers bloom, Where sunlight dances, chasing away the gloom, Whispers of the wind carry tales untold, Of love, of loss, of dreams that unfold. Beneath the stars, a timeless embrace, Nature's symphony, a never-ending grace.",
        caption=None,
        user_id=5,
        likes=0,
        tags="text post,poetry",
        post_type="text",
        previous_post_id=None
        )
    post_7 = Post(
        title="Bodhi has a weird tongue",
        content="https://thermos-project-bucket.s3.us-east-2.amazonaws.com/20210504_152152_IMG_2029.MOV",
        caption="Why is he doing that? I couldn't say.",
        user_id=3,
        likes=0,
        tags="video,Bodhi,tongue",
        post_type="video",
        previous_post_id=None
        )
    post_8 = Post(
        title=None,
        content="https://thermos-project-bucket.s3.us-east-2.amazonaws.com/rickroll-roll.gif",
        caption=None,
        user_id=2,
        likes=0,
        tags="need I say more?,gif",
        post_type="photo",
        previous_post_id=None
        )
    post_9 = Post(
        title=None,
        content="I'm just a computer program, so I don't have feelings or emotions like humans do",
        caption=None,
        user_id=4,
        likes=0,
        tags="text post,computer",
        post_type="text",
        previous_post_id=None
        )
    post_10 = Post(
        title="I'm learning so much from App Academy",
        content="I really didn't think I'd get this far. When I first started, coding was just something that seemed like I would enjoy. I had dabbled the smallest amount in python on my phone, but never got very far before I was searching for bootcamps. Now it's 5 months later and I'm doing my capstone project! Crazy!",
        caption=None,
        user_id=2,
        likes=0,
        tags="text post,personal",
        post_type="text",
        previous_post_id=None
        )
    post_11 = Post(
        title=None,
        content="Why couldn't the bicycle stand up by itself? Because it was two-tired!",
        caption=None,
        user_id=5,
        likes=0,
        tags="text post,joke",
        post_type="text",
        previous_post_id=None
        )
    post_12 = Post(
        title=None,
        content="Bo Burnham's Inside is a quality piece of media",
        caption=None,
        user_id=2,
        likes=0,
        tags="text post,bo burnham",
        post_type="text",
        previous_post_id=None
        )
    post_13 = Post(
        title="have some real lofi",
        content="https://thermos-project-bucket.s3.us-east-2.amazonaws.com/MichaelSchullerMusic+-+Cloudy+(Cinematic+Lofi+Beat).mp3",
        caption="Cloudy by Michael Schuller Music",
        user_id=5,
        likes=0,
        tags="audio,lofi,michael schuller music,cloudy",
        post_type="audio",
        previous_post_id=None
        )
    post_14 = Post(
        title="Listen for the thunk",
        content="https://thermos-project-bucket.s3.us-east-2.amazonaws.com/20200527_024350_IMG_1247.MOV",
        caption="I love my stupid cat Pants",
        user_id=2,
        likes=0,
        tags="cat,pants,funny",
        post_type="video",
        previous_post_id=None
        )
    post_15 = Post(
        title="The ideal man",
        content="https://thermos-project-bucket.s3.us-east-2.amazonaws.com/body-builder.jpg",
        caption=None,
        user_id=3,
        likes=0,
        tags="body builder,man,joke",
        post_type="photo",
        previous_post_id=None
        )
    post_16 = Post(
        title=None,
        content="https://thermos-project-bucket.s3.us-east-2.amazonaws.com/comic-book-monster.jpg",
        caption="A monster in a comic book artstyle",
        user_id=5,
        likes=0,
        tags="art,comic book,monster",
        post_type="photo",
        previous_post_id=None
        )
    post_17 = Post(
        title=None,
        content="https://thermos-project-bucket.s3.us-east-2.amazonaws.com/Soft+Serve+-+Let's+Go+Dutch.mp3",
        caption="This is my new most favorite song in the world. The recorder really sells it for me.",
        user_id=3,
        likes=0,
        tags="song,joke,soft serve",
        post_type="audio",
        previous_post_id=None
        )
    post_18 = Post(
        title=None,
        content="Taylor Swift's new album is mid.",
        caption=None,
        user_id=4,
        likes=0,
        tags="taylor swift,music,text post",
        post_type="text",
        previous_post_id=None
        )
    post_19 = Post(
        title=None,
        content="https://thermos-project-bucket.s3.us-east-2.amazonaws.com/Vikrant+Chettri+-+lofi+mist+in+the+window.mp3.mp3",
        caption="I love the rain sounds in the background!",
        user_id=2,
        likes=0,
        tags="song,lofi,rain",
        post_type="audio",
        previous_post_id=None
        )
    post_20 = Post(
        title=None,
        content="https://thermos-project-bucket.s3.us-east-2.amazonaws.com/20210531_101137_IMG_2163.MOV",
        caption="Daisy and Bodhi go bounce bounce bounce",
        user_id=2,
        likes=0,
        tags="video,Bodhi,Daisy,dog",
        post_type="video",
        previous_post_id=None
        )
    post_21 = Post(
        title="I love my body",
        content="From my head to my toes.",
        caption=None,
        user_id=4,
        likes=0,
        tags="text post,positivity",
        post_type="text",
        previous_post_id=None
        )
    post_22 = Post(
        title="this tiktok is amazing",
        content="https://thermos-project-bucket.s3.us-east-2.amazonaws.com/20210322_200531_v09044310000c1bs1t8k0ue79kltr6kg.MP4",
        caption=None,
        user_id=5,
        likes=0,
        tags="tiktok,guitar,song",
        post_type="video",
        previous_post_id=None
        )
    post_23 = Post(
        title="Crash Course Computer Science #1",
        content="https://youtu.be/O5nskjZ_GoI?si=2oEUC0Ss3Jm23qqx",
        caption="Learn some stuff about computers, there's a whole playlist on youtube!",
        user_id=4,
        likes=0,
        tags="youtube,video,crash course,computers",
        post_type="video",
        previous_post_id=None
        )
    post_24 = Post(
        title="Cursed lady",
        content="https://thermos-project-bucket.s3.us-east-2.amazonaws.com/cursed-lady.jpg",
        caption=None,
        user_id=4,
        likes=0,
        tags="cursed lady,art,horror,monster",
        post_type="photo",
        previous_post_id=None
        )
    post_25 = Post(
        title=None,
        content="I love hanging out at Freddy Fazbear's Pizzeria",
        caption=None,
        user_id=3,
        likes=0,
        tags="text post,freddy fazbear's pizzeria",
        post_type="text",
        previous_post_id=None
        )
    post_26 = Post(
        title="Why I have a hook",
        content="I lost my hand in a terrible accident. It's rude to ask about it.",
        caption=None,
        user_id=5,
        likes=0,
        tags="text post,hook",
        post_type="text",
        previous_post_id=None
        )
    post_27 = Post(
        title="Five Nights at Freddy's Movie Trailer",
        content="https://youtu.be/f-zqS2CiZqw?si=ocex5TW5q0jyuW9p",
        caption="This movie was a good time to watch",
        user_id=4,
        likes=0,
        tags="five nights at freddy's,freddy fazbear's pizzeria, video",
        post_type="video",
        previous_post_id=None
        )
    post_28 = Post(
        title="AI Generated Fantasy Tunnel",
        content="https://thermos-project-bucket.s3.us-east-2.amazonaws.com/fantasy-tunnel.jpg",
        caption="Follow me into the faerie tunnel, don't worry, everything will be fine.",
        user_id=3,
        likes=0,
        tags='ai generated,art,fantasy,faeries',
        post_type="photo",
        previous_post_id=None
        )
    post_29 = Post(
        title="Some cow jokes",
        content="What do you call a cow with no legs? Ground beef. What do you call a cow with 1 leg? Steak. What do you call a cow with 3 legs? Lean beef. What do you call a cow with 2 legs? Your mom.",
        caption=None,
        user_id=4,
        likes=0,
        tags="joke,funny,cow",
        post_type="text",
        previous_post_id=None
        )
    post_30 = Post(
        title=None,
        content="I'm having such a good day today. Come celebrate life with me!",
        caption=None,
        user_id=3,
        likes=0,
        tags="text post,positivity",
        post_type="text",
        previous_post_id=None
        )
    post_31 = Post(
        title=None,
        content="https://thermos-project-bucket.s3.us-east-2.amazonaws.com/lonely-blurry.jpg",
        caption="I've been feeling so lonely lately...",
        user_id=2,
        likes=0,
        tags="sad,photo,blurry",
        post_type="photo",
        previous_post_id=None
        )
    post_32 = Post(
        title="Pants was a cat with no brain cells",
        content="https://thermos-project-bucket.s3.us-east-2.amazonaws.com/20201114_140933_IMG_1569.MOV",
        caption="I miss him every day. He passed far too soon and was my favorite cat in the world.",
        user_id=5,
        likes=0,
        tags='pants,cat,funny',
        post_type="video",
        previous_post_id=None
        )
    post_33 = Post(
        title="We all get embarrassed sometimes...",
        content="I once accidentally wore mismatched shoes to a job interview and only realized it when the interviewer pointed it out. I tried to play it off as a fashion statement, but we both ended up laughing about it. I still got the job though, so I guess my quirky shoe choice didn't hurt my chances!",
        caption=None,
        user_id=2,
        likes=0,
        tags="funny,embarrassing,",
        post_type="text",
        previous_post_id=None
        )
    post_34 = Post(
        title=None,
        content="You all say the most unhinged things sometimes",
        caption=None,
        user_id=3,
        likes=0,
        tags="text post",
        post_type="text",
        previous_post_id=None
        )
    post_35 = Post(
        title="Checkout this steampunk style dude",
        content="https://thermos-project-bucket.s3.us-east-2.amazonaws.com/steampunk-monster.jpg",
        caption=None,
        user_id=3,
        likes=0,
        tags="art",
        post_type="photo",
        previous_post_id=None
        )
    post_36 = Post(
        title=None,
        content="https://thermos-project-bucket.s3.us-east-2.amazonaws.com/zombie-video-game.jpg",
        caption="Screenshot of a cool zombie apocalypse game I found",
        user_id=5,
        likes=0,
        tags="game,zombies",
        post_type="photo",
        previous_post_id=None
        )
    post_37 = Post(
        title=None,
        content="I dare you to try to scroll all the way to the bottom",
        caption=None,
        user_id=4,
        likes=0,
        tags="text post,dare",
        post_type="text",
        previous_post_id=None
        )
    post_38 = Post(
        title="AI Generated Robot Lady",
        content="https://thermos-project-bucket.s3.us-east-2.amazonaws.com/fantasy-robot-lady.jpg",
        caption=None,
        user_id=4,
        likes=0,
        tags="ai generated,art,robot,lady",
        post_type="photo",
        previous_post_id=None
        )
    post_39 = Post(
        title="Jelle's Marble League 2023 All Events",
        content="https://youtu.be/AQX6UCIessA?si=BhlLDIs_Fuq3my5r",
        caption="this is the only sports I actually watch",
        user_id=3,
        likes=0,
        tags="video,jelle,marbles",
        post_type="video",
        previous_post_id=None
        )
    post_40 = Post(
        title="How would you feel with this thing coming at you?",
        content="https://thermos-project-bucket.s3.us-east-2.amazonaws.com/cyberpunk-monster.jpg",
        caption="I know I'd be running as fast as I could.",
        user_id=5,
        likes=0,
        tags="art,monster",
        post_type="photo",
        previous_post_id=None
        )
    post_41 = Post(
        title=None,
        content="App Academy is the GOAT",
        caption=None,
        user_id=3,
        likes=0,
        tags="app academy,computers",
        post_type="text",
        previous_post_id=10
    )
    post_42 = Post(
        title=None,
        content="Voweer!!",
        caption=None,
        user_id=2,
        likes=0,
        tags=None,
        post_type="text",
        previous_post_id=16
    )
    post_43 = Post(
        title=None,
        content="Ooh, listening with headphones it bounces back and forth between ears",
        caption=None,
        user_id=3,
        likes=0,
        tags=None,
        post_type='text',
        previous_post_id=19
    )
    post_44 = Post(
        title=None,
        content="I don't think I speak whatever language this is.",
        caption=None,
        user_id=4,
        likes=0,
        tags=None,
        post_type='text',
        previous_post_id=2
    )
    post_45 = Post(
        title=None,
        content="Drop the name of the game, bruv",
        caption=None,
        user_id=4,
        likes=0,
        tags=None,
        post_type='text',
        previous_post_id=36
    )
    post_46 = Post(
        title=None,
        content="Thanks for sharing this! I love learning about computers",
        caption=None,
        user_id=2,
        likes=0,
        tags='computers',
        post_type='text',
        previous_post_id=23
    )
    post_47 = Post(
        title=None,
        content="Tongues are always weird, but this makes me extra uncomfortable for some reason.",
        caption=None,
        user_id=2,
        likes=0,
        tags=None,
        post_type='text',
        previous_post_id=7
    )
    post_48 = Post(
        title=None,
        content="Gah! Why would you post this? I will have nightmares now...",
        caption=None,
        user_id=5,
        likes=0,
        tags='if I had to see it,so do you',
        post_type='text',
        previous_post_id=24
    )
    post_49 = Post(
        title=None,
        content=None,
        caption=None,
        user_id=4,
        likes=0,
        tags=None,
        post_type='text',
        previous_post_id=15
    )
    post_50 = Post(
        title=None,
        content=None,
        caption=None,
        user_id=4,
        likes=0,
        tags=None,
        post_type='text',
        previous_post_id=39
    )


    posts_to_seed = [post_1, post_2, post_3, post_4, post_5, post_6, post_7, post_8, post_9, post_10,
        post_11, post_12, post_13, post_14, post_15, post_16, post_17, post_18, post_19, post_20,
        post_21, post_22, post_23, post_24, post_25, post_26, post_27, post_28, post_29, post_30,
        post_31, post_32, post_33, post_34, post_35, post_36, post_37, post_38, post_39, post_40,
        post_41, post_42, post_43, post_44, post_45, post_46, post_47, post_48, post_49, post_50]

    for post in posts_to_seed:
        db.session.add(post)

    db.session.commit()


def undo_posts():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.posts RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM posts"))

    db.session.commit()
