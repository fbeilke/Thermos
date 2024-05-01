import { createBrowserRouter } from 'react-router-dom';
import Layout from './Layout';
import UserPage from '../components/UserPage/UserPage'
import ExplorePage from '../components/ExplorePage/ExplorePage'
import HomeFeed from '../components/HomeFeed/HomeFeed';


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
        element: <h2>Feature coming soon</h2>
      },
      {
        path: "/explore",
        element: <ExplorePage />
      }
    ],
  },
]);
