import React, { useContext } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { ContextBill } from '../ContextProvider/ContextProvider';

const PrivetRoute = ({ children }) => {
    const { user, loading } = useContext(ContextBill);
    const location = useLocation();

    if (loading || !user) {
        return <p className='text-2xl text-center font-bold'>Loading...</p>
    }

    if (user) {
        return children
    }

    return <Navigate to='/' state={{ from: location }} replace></Navigate>
};

export default PrivetRoute;