import { createBrowserRouter } from 'react-router-dom';
import Layout from './Layout';
import UserPage from '../components/UserPage/UserPage'
import ExplorePage from '../components/ExplorePage/ExplorePage'
import HomeFeed from '../components/HomeFeed/HomeFeed';
import AboutPage from '../components/AboutPage/AboutPage';
import CurrentUserFollowers from '../components/Follows/CurrentUserFollowers';


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
        element: <h2>Feature coming soon</h2>
      },
      {
        path: "/following",
        element: <h2>Feature coming soon</h2>
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
