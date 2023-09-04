import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth0 } from '@auth0/auth0-react';
// will remove later

import { Loading } from '../components';

const PrivateRoute = ({children}) => {
  const {user, isLoading} = useAuth0()

  if (isLoading) {
    return <Loading/>
  }

  return user ? children : <Navigate to="/" />;
};
export default PrivateRoute;
