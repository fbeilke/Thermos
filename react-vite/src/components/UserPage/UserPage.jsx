import { useParams } from "react-router-dom";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getSingleUserThunk, clearSingleUser } from "../../redux/users";
import { followBlogThunk, unfollowBlogThunk } from "../../redux/session";
import PostsFeed from "../PostsFeed/PostsFeed";
import './UserPage.css';

export default function UserPage() {
    const dispatch = useDispatch()
    const { blogName } = useParams();
    const { singleUser } = useSelector(state => state.users)
    const { posts } = useSelector(state => state.posts)
    const { reblogs } = useSelector(state => state.reblogs)
    const currentUser = useSelector(state => state.session.user)

    useEffect(() => {
        dispatch(getSingleUserThunk(blogName))

    }, [dispatch, blogName, posts, reblogs])

    useEffect(() => () => {
        dispatch(clearSingleUser())
    }, [dispatch])

    if (!singleUser) return null;




    function unfollow() {
        dispatch(unfollowBlogThunk(singleUser.id))
    }

    function addFollow() {
        dispatch(followBlogThunk(singleUser.id))
    }


    let following;

    if (singleUser && currentUser) {
        following = currentUser.following.includes(singleUser.id)
    }

    const allPosts = [...singleUser.postsByUser, ...singleUser.reblogsByUser]


    const sortedPosts = allPosts.sort((a, b) => {
        const dateA = new Date(a.createdAt)
        const dateB = new Date(b.createdAt)
        return dateA < dateB ? 1 : -1
    })


    return (
        <div className='user-page-outer'>
            <div className='user-page-container'>
                <div className='follow-unfollow-buttons'>
                    {currentUser && following ?
                        <button className='unfollow-user-button' onClick={unfollow}>Unfollow</button>
                    : null }
                    {currentUser && !following ?
                        <button className='follow-user-button' onClick={addFollow}>Follow</button>
                    : null }
                </div>
                <img className='user-page-profile-picture' src={singleUser.profilePictureUrl} alt={`${singleUser.blogName} profile picture`} />
                <div className='user-page-info'>
                    <h2>{singleUser.blogName}</h2>
                </div>
            </div>
            <div className='user-page-feed'>
                {/* sends an array of posts through props */}
                <PostsFeed posts={sortedPosts} blogName={blogName}/>
            </div>
        </div>
    )
}
