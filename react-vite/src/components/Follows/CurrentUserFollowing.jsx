import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { useEffect } from 'react';
import { getAllUsersThunk, getSingleUserThunk } from '../../redux/users';
import './CurrentUserFollowing.css';

export default function CurrentUserFollowing() {
    const dispatch = useDispatch()
    const currentUser = useSelector(state => state.session.user)
    const { singleUser, allUsers } = useSelector(state => state.users)

    useEffect(() => {
        dispatch(getSingleUserThunk(currentUser.blogName))
        dispatch(getAllUsersThunk())
    }, [dispatch, currentUser])

    if (!currentUser || !singleUser || !allUsers) return null

    return (
        <div className='current-user-following-page'>
            <h1>{currentUser.blogName} following</h1>
            <div className='following-list'>
                {!singleUser.following.length ?
                    <div className='list-no-following'>
                        <h2>Sorry, it looks like you aren&apos;t following any blogs...</h2>
                        <p>Check out the Explore page to find posts you may like, then click Follow on the user&apos;s page to add them to your feed!</p>
                    </div>
                :
                    singleUser.following.map(followingId => (
                        <Link to={`/blogs/${allUsers[followingId].blogName}`} key={followingId} className='each-following'>
                            <img src={allUsers[followingId].profilePictureUrl} className='following-profile-picture'/>
                            <p className='following-name'>{allUsers[followingId].blogName}</p>
                        </Link>
                    ))
                }
            </div>
        </div>
    )
}
