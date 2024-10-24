import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { LOGIN } from './routes';



const PrivateRoute = (props) => {
    const { children, layout: Layout } = props;
    const { pathname } = useLocation();

    const isAuthenticated = true;

    return isAuthenticated ? (
        <Layout>{children}</Layout>
    ) : (
        <Navigate
            to={{
                pathname: LOGIN,
                search:
                    pathname && pathname !== '/' ? `?redirect=${pathname}` : undefined,
            }}
        />
    );
};

export { PrivateRoute };