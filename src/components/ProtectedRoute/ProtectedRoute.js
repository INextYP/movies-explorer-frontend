import React from 'react';
import { Redirect, Route } from 'react-router-dom';

const ProtectedRoute = ({ loggedIn, children, ...props }) => (
    <Route {...props}>{loggedIn ? children : <Redirect to="/"/>}</Route>
);

export default ProtectedRoute;
