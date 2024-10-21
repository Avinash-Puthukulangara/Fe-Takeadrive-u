import React, { useEffect } from 'react'
import { Outlet, useNavigate } from 'react-router-dom';

export const Protectedroute = () => {

    const userAuthorised = false;
    const navigate = useNavigate()

    useEffect(()=> {
        if(!userAuthorised) {
            navigate('/login')
        }
    }, [])

  return userAuthorised && <Outlet />;
}
