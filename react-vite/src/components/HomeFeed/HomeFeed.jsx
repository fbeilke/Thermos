import { Navigate } from 'react-router-dom'
import './HomeFeed.css'


export default function HomeFeed() {
    return <Navigate to='/explore' replace={true}/>
}
