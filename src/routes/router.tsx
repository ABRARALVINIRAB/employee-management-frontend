import { createBrowserRouter } from 'react-router-dom';

import Home from '../pages/Home/Home';
import Login from '../pages/Login/Login';
import SignUp from '../pages/SignUp/SignUp';
import App from '../App';
import Dashboard from '../pages/AdminDashboard/AdminDashboard';
import AdminDashboard from '../pages/AdminDashboard/AdminDashboard';
import EmployeeDashboard from '../pages/EmployeeDashboard/EmployeeDashboard';
import ApproveUser from '../pages/AdminDashboard/ApproveUser/ApproveUser';



const routes = createBrowserRouter([
    {
        path: '/',
        element: <App />,
        children: [
            {
                index: true,
                element: <Home />,
            },
            {
                path: '/home',
                element: <Home/>,

            },
            
        



            {
                path: '/login',
                element: <Login />,
            },
            {
                path: '/signup',
                element: <SignUp />,
            },
            // {
            //     path: '/checkout',
            //     element: <PrivateRoute>
            //         <Checkout />
            //     </PrivateRoute>,
            // },
        ],
    },
   

    {
        path: '/admindashboard',
        element: <AdminDashboard/>,
    },
    {
        path: '/approveuser',
        element: <ApproveUser/>,
    },
    {
        path: '/employeedashboard',
        element: <EmployeeDashboard/>,
    },
    // {
    //     path: '/admin-residential-for-Sell',
    //     element: <AdminResidentialForSell />,
    // },
    

    // {
    //     path: '*',
    //     element: <NotFound />,
    // },
]);

export default routes;
