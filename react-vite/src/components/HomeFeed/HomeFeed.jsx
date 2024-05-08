import { useSelector, useDispatch } from 'react-redux';
import { Navigate } from 'react-router-dom';
import { useEffect } from 'react'
import PostsFeed from '../PostsFeed/PostsFeed'
import './HomeFeed.css';
import { getAllPostsThunk } from '../../redux/posts';


export default function HomeFeed() {
    const dispatch = useDispatch();
    const currentUser = useSelector(state => state.session.user);
    const { posts } = useSelector(state => state.posts);

    useEffect(() => {
        dispatch(getAllPostsThunk())
    }, [dispatch])


    if (!currentUser) {
        return <Navigate to='/explore' replace={true}/>
    }
    const following = currentUser.following;

    if (!posts) return null;
    const followingPosts = Object.values(posts).filter(post => following.includes(post.userId))

    const sortedPosts = followingPosts.sort((a, b) => {
        const dateA = new Date(a.createdAt)
        const dateB = new Date(b.createdAt)
        return dateA < dateB ? 1 : -1
    })

    return (
        <div className='home-feed'>
            <h1 className='home-feed-title'>Home Feed</h1>
            {!following.length ?
                <div className='home-feed-no-following'>
                    <h2>Sorry, it looks like you aren&apos;t following any blogs...</h2>
                    <p>Check out the Explore page to find posts you may like, then click Follow on the user&apos;s page to add them to your feed!</p>
                </div>
            :
            <PostsFeed posts={sortedPosts}/>
            }
        </div>
    )
}
