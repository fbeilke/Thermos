import { useSelector, useDispatch } from 'react-redux';
import { Link, Navigate } from 'react-router-dom';
import { useEffect } from 'react';
import { getAllUsersThunk, getSingleUserThunk } from '../../redux/users';
import './CurrentUserFollowers.css';

export default function CurrentUserFollowers() {
    const dispatch = useDispatch();
    const currentUser = useSelector(state => state.session.user)
    const { singleUser, allUsers } = useSelector(state => state.users)

    useEffect(() => {
        dispatch(getSingleUserThunk(currentUser.blogName))
        dispatch(getAllUsersThunk())
    }, [dispatch, currentUser])

    if (!currentUser) {
        return <Navigate to='/explore'/>
    }
    if (!singleUser || !allUsers) return null

    return (
        <div className='current-user-followers-page'>
            <h1>Followers of {singleUser.blogName}</h1>
            <div className='followers-list'>
                {!singleUser.followers.length ?
                    <div className='list-no-followers'>
                        <h2>Sorry, it looks like you have no followers...</h2>
                        <p>Interact with posts to connect with other users.</p>
                    </div>
                :
                singleUser.followers.map(followerId => (
                    <Link to={`/blogs/${allUsers[followerId].blogName}`} key={followerId} className='each-follower'>
                        <img src={allUsers[followerId].profilePictureUrl} className='follower-profile-picture'/>
                        <p className='follower-name'>{allUsers[followerId].blogName}</p>
                    </Link>
                ))
                }
            </div>
        </div>
    )
}
