import { useSelector } from 'react-redux'
import './CurrentUserLikes.css'
import PostsFeed from '../PostsFeed/PostsFeed'
import { Navigate } from 'react-router-dom'

export default function CurrentUserLikes() {
    const currentUser = useSelector(state => state.session.user)

    if (!currentUser) {
        return <Navigate to='/explore'/>
    }

    let sortedLikes;

    if (currentUser.likedPostsByUser) {
        sortedLikes = currentUser.likedPostsByUser.sort((a,b) => {
            const dateA = new Date(a.createdAt)
            const dateB = new Date(b.createdAt)
            return dateA < dateB ? 1 : -1
        })
    }

    return (
        <div className='current-user-likes'>
            <h1>{currentUser.blogName} likes</h1>
            {!sortedLikes.length ?
                <div className='no-likes-list'>
                    <h2>Sorry, it looks like you have no liked posts...</h2>
                    <p>Click the heart at the bottom of a post to like it.</p>
                </div>
            :
                <PostsFeed posts={sortedLikes} />
            }
        </div>
    )
}
