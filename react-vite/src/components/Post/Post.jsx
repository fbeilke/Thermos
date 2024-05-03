import { Link } from 'react-router-dom';
import ReactPlayer from "react-player";
import './Post.css'

export default function Post({ postId, allPosts, actualPost }) {


    let post;

    if (allPosts && postId) {
        post = allPosts[postId]
    } else if (actualPost) {
        post = actualPost
    } else if ((!allPosts || !postId) && !actualPost) {
        return null
    }



    while (post && post.originalPost) {
        post = post.originalPost
    }




    return (
        <div className='each-post-container'>
            {post.reblogCreator && post.postId ?
                <div className='reblogged-post-container'>
                    <p className='post-creator'><Link className='blog-links' to={`/blogs/${post.originalPost.creator}`}>{post.originalPost.creator}</Link> posted</p>
                    {post.originalPost.title && <h3>{post.originalPost.title}</h3>}
                    <div className='post-content'>
                        {post.originalPost.postType !== 'text' ? null :
                            <div className='text-post-content'>
                                <p>{post.originalPost.content}</p>
                            </div>
                        }
                        {post.originalPost.postType !== 'photo' ? null :
                            <div className='photo-post-content'>
                                <img className='post-photo' src={post.originalPost.content} alt={`${post.originalPost.id} photo`} />
                            </div>
                        }
                        {post.originalPost.postType !== 'audio' ? null :
                            <div className='audio-post-content'>
                                <audio controls={true} src={post.originalPost.content}>Your browser does not support audio player</audio>
                            </div>
                        }
                        {post.originalPost.postType !== 'video' ? null :
                            <div className='video-post-content'>
                                <ReactPlayer url={post.originalPost.content} controls={true} width={500} style={{backgroundColor: 'black'}}/>
                            </div>
                        }
                    </div>
                    <div className='post-caption'>
                        {post.originalPost.caption && <p>{post.originalPost.caption}</p>}
                    </div>
                </div>
            : null}
            {post.reblogCreator && post.reblogId ?
                <div className='reblogged-post-container'>
                    <p className='post-creator'><Link className='blog-links' to={`/blogs/${post.originalPost.creator}`}>{post.originalPost.creator}</Link> posted</p>
                    {post.originalPost.title && <h3>{post.originalPost.title}</h3>}
                    <div className='post-content'>
                        {post.originalPost.postType !== 'text' ? null :
                            <div className='text-post-content'>
                                <p>{post.originalPost.content}</p>
                            </div>
                        }
                        {post.originalPost.postType !== 'photo' ? null :
                            <div className='photo-post-content'>
                                <img className='post-photo' src={post.originalPost.content} alt={`${post.originalPost.id} photo`} />
                            </div>
                        }
                        {post.originalPost.postType !== 'audio' ? null :
                            <div className='audio-post-content'>
                                <audio controls={true} src={post.originalPost.content}>Your browser does not support audio player</audio>
                            </div>
                        }
                        {post.originalPost.postType !== 'video' ? null :
                            <div className='video-post-content'>
                                <ReactPlayer url={post.originalPost.content} controls={true} width={500} style={{backgroundColor: 'black'}}/>
                            </div>
                        }
                    </div>
                    <div className='post-caption'>
                        {post.originalPost.caption && <p>{post.originalPost.caption}</p>}
                    </div>
                </div>
            : null }
            {!post.reblogCreator ?
                <div className='original-post-container'>
                    {!post.content ? null :
                        <p className='post-creator'><Link className='blog-links' to={`/blogs/${post.creator}`}>{post.creator}</Link> posted</p>
                    }
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
            : null }
        </div>
    )

}
