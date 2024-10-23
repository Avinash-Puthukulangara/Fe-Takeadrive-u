import React, { useEffect, useState } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import { axiosInstance } from '../config/axiosInstance';

export const ProtectedRoute = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(null); 
  const navigate = useNavigate();

  useEffect(() => {
    const checkUser = async () => {
      try {
        const response = await axiosInstance.get('/user/checkuser', { withCredentials: true });
        if (response.data.success) {
          setIsAuthenticated(true);
        } else {
          setIsAuthenticated(false);
          navigate('/login');
        }
      } catch (error) {
        console.error('Error occurred while checking user:', error);
        setIsAuthenticated(false);
        navigate('/login');
      }
    };

    checkUser();
  }, [navigate]);

  if (isAuthenticated === null) {
    return <div>Loading...</div>; 
  }

  return isAuthenticated ? <Outlet /> : null; 
};
