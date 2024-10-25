import React, { useEffect } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { saveUser, clearUser } from '../redux/features/userSlice'; 
import { axiosInstance } from '../config/axiosInstance';

export const ProtectedRoute = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const userAuthorised = useSelector((state) => state.user.userAuthorised);  

  useEffect(() => {
    const checkUser = async () => {
      try {
        const response = await axiosInstance.get('/user/checkuser', { withCredentials: true });
        
        if (response.data.success) {
          dispatch(saveUser(response.data.data));  
        } else {
          dispatch(clearUser()); 
          navigate('/login');
        }
      } catch (error) {
        console.error('Error occurred while checking user:', error);
        dispatch(clearUser());  
        navigate('/login');
      }
    };

    if (!userAuthorised) {
      checkUser();  
    }
  }, [userAuthorised, navigate, dispatch]);


  return userAuthorised ? <Outlet /> : null; 
};
