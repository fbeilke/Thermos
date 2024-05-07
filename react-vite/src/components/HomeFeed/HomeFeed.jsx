import { useSelector, useDispatch } from 'react-redux';
import { Navigate } from 'react-router-dom';
import './HomeFeed.css';


export default function HomeFeed() {
    const dispatch = useDispatch();
    const currentUser = useSelector(state => state.session.user);

    if (!currentUser) {
        return <Navigate to='/explore' replace={true}/>
    }

    return (
        <h1>Feature coming soon!</h1>
    )
}
