import { createBrowserRouter } from 'react-router-dom';
import Layout from './Layout';
import UserPage from '../components/UserPage/UserPage'
import ExplorePage from '../components/ExplorePage/ExplorePage'
import HomeFeed from '../components/HomeFeed/HomeFeed';
import AboutPage from '../components/AboutPage/AboutPage';
import CurrentUserFollowers from '../components/Follows/CurrentUserFollowers';
import CurrentUserFollowing from '../components/Follows/CurrentUserFollowing';
import CurrentUserLikes from '../components/LIkes/CurrentUserLikes';


export const router = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      {
        path: "/",
        element: <HomeFeed />,
      },
      {
        path: "/blogs/:blogName",
        element: <UserPage />
      },
      {
        path: "/likes",
        element: <CurrentUserLikes />
      },
      {
        path: "/following",
        element: <CurrentUserFollowing />
      },
      {
        path: "/followers",
        element: <CurrentUserFollowers />
      },
      {
        path: "/explore",
        element: <ExplorePage />
      },
      {
        path: "/about",
        element: <AboutPage />
      }
    ],
  },
]);
