import { Link } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import { getAllPostsThunk } from "../../redux/posts";
import { useEffect } from "react";
import SinglePost from "../SinglePostAllReblogs/SinglePostAllReblogs";
import './PostsFeed.css';

export default function PostsFeed({ posts, blogName }) {
    const dispatch = useDispatch();
    const allPosts = useSelector(state => state.posts.posts)
    const { user } = useSelector(state => state.session);

    useEffect(() => {
        dispatch(getAllPostsThunk())
    }, [dispatch])

    if (!posts.length) return null


    return (
        <div className='posts-feed-container'>
            {posts.map(post => (
                <div className='each-post' key={post.id}>
                    <div className='original-post'>
                        {blogName && blogName === post.creator ? null :
                            <Link to={`/blogs/${post.creator}`} className='post-profile-picture-container'>
                                <img className='post-profile-picture' src={post.creatorImage} alt={post.creator} />
                            </Link>
                        }
                      <SinglePost postId={post.id} allPosts={allPosts} user={user}/>
                    </div>
                </div>
            ))}
        </div>
    )
}
