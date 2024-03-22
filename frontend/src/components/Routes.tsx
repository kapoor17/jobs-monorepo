import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';

export const PrivateRoute: React.FC = () => {
    const isAuthenticated = localStorage.getItem('token');

    return isAuthenticated ? <Outlet/> : <Navigate to={'/login'}/>
};

export const PublicRoute: React.FC = () => {
    const isAuthenticated = localStorage.getItem('token');

    return isAuthenticated ? <Navigate to={'/dashboard'}/> : <Outlet/>
}