import { useParams } from "react-router-dom";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getSingleUserThunk } from "../../redux/users";
import './UserPage.css';

export default function UserPage() {
    const dispatch = useDispatch()
    const { blogName } = useParams();
    const { singleUser } = useSelector(state => state.users)

    useEffect(() => {
        dispatch(getSingleUserThunk(blogName))
    }, [dispatch, blogName])

    if (!singleUser) return null;

    return (
        <div className='user-page-container'>
            <img className='user-page-profile-picture' src={singleUser.profilePictureUrl} alt={`${singleUser.blogName} profile picture`} />
            <div className='user-page-info'>
                <h2>{singleUser.blogName}</h2>
            </div>
        </div>
    )
}
