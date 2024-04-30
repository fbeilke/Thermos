import ReactPlayer from "react-player";
import './Post.css'

export default function Post({ postId, allPosts }) {

    if (!allPosts || !postId) return null;

    const post = allPosts[postId]







    return (
        <div className='each-post-container'>
            <p className='post-creator'>{post.creator} posted</p>
            {post.title && <h3>{post.title}</h3>}
            <div className='post-content'>
                {post.postType !== 'text' ? null :
                    <div className='text-post-content'>
                        <p>{post.content}</p>
                    </div>
                }
                {post.postType !== 'photo' ? null :
                    <div className='photo-post-content'>
                        <img className='post-photo' src={post.content} alt={`${post.id} photo`} />
                    </div>
                }
                {post.postType !== 'audio' ? null :
                    <div className='audio-post-content'>
                        <audio controls={true} src={post.content}>Your browser does not support audio player</audio>
                    </div>
                }
                {post.postType !== 'video' ? null :
                    <div className='video-post-content'>
                        <ReactPlayer url={post.content} controls={true} width={500} style={{backgroundColor: 'black'}}/>
                    </div>
                }
            </div>
            <div className='post-caption'>
                {post.caption && <p>{post.caption}</p>}
            </div>
        </div>
    )

}
