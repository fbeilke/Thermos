import { useParams } from "react-router-dom";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getSingleUserThunk } from "../../redux/users";
import PostsFeed from "../PostsFeed/PostsFeed";
import './UserPage.css';

export default function UserPage() {
    const dispatch = useDispatch()
    const { blogName } = useParams();
    const { singleUser } = useSelector(state => state.users)
    const { posts } = useSelector(state => state.posts)

    useEffect(() => {
        dispatch(getSingleUserThunk(blogName))
    }, [dispatch, blogName, posts])

    if (!singleUser) return null;

    const allPosts = [...singleUser.postsByUser, ...singleUser.reblogsByUser]


    const sortedPosts = allPosts.sort((a, b) => {
        const dateA = new Date(a.createdAt)
        const dateB = new Date(b.createdAt)
        return dateA < dateB ? 1 : -1
    })


    return (
        <div className='user-page-outer'>
            <div className='user-page-container'>
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
