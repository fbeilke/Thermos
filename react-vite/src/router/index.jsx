import { createBrowserRouter } from 'react-router-dom';
import Layout from './Layout';
import UserPage from '../components/UserPage/UserPage'


export const router = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      {
        path: "/",
        element: <h2>Welcome!</h2>,
      },
      {
        path: "/blogs/:blogName",
        element: <UserPage />
      }
    ],
  },
]);
