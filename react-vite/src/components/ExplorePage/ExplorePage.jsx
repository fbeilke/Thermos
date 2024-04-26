import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { getAllPostsThunk } from '../../redux/posts';
import PostsFeed from '../PostsFeed/PostsFeed';


export default function ExplorePage() {
    const dispatch = useDispatch()
    const { posts } = useSelector(state => state.posts)
    const [randomPosts, setRandomPosts] = useState([]);


    useEffect(() => {
        dispatch(getAllPostsThunk())
    }, [dispatch])

    useEffect(() => {
        if (posts && Object.values(posts).length) {
            setRandomPosts(Object.values(posts).sort(() => Math.random() - 0.5))
        }
    }, [posts])

    if (!posts) return null;

    return (
        <div className='explore-page'>
            <h2 className='explore-page-label'>Explore posts</h2>
            <PostsFeed posts={randomPosts} />
        </div>
    )
}
