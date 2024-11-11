import React, { useEffect, useRef, useState, useContext } from 'react';
import { DarkMode } from './DarkMode';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { axiosInstance } from '../../config/axiosInstance';

export const UserHeader = () => {
  const [isProfileOpen, setIsProfileOpen] = useState(false);

  const navigate = useNavigate();
  const menuRef = useRef(null);

  const handleHome = () => {
    navigate('/');
  };

  const handleProfile = () => {
    navigate('/user/myprofile');
  };

  const handleBookings = () => {
    navigate('/user/mybookings');
  };

  const toggleProfile = () => {
    setIsProfileOpen(!isProfileOpen);
  };

  const user = {
    logout_route: '/user/logout',
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setIsProfileOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const onLogout = async () => {
    try {
      await axiosInstance({
        method: 'POST',
        url: user.logout_route,
        withCredentials: true,
      });
      toast.success("Logged out successfully");
      navigate('/');
    } catch (error) {
      toast.error("Failed to Logout");
      console.log(error);
    }
  };

  return (
    <div className="sticky top-0 z-50">
      <div className="navbar bg-lightgray bg-opacity-30 shadow-2xl flex justify-between items-center">
        <a className="btn btn-ghost font-serif text-xl font-extrabold ml-4" onClick={handleHome}>
          TakeaDrive
        </a>

        <div className="flex items-center">
          <button className="btn btn-ghost btn-circle avatar" onClick={toggleProfile}>
            <div className="ring-primary ring-offset-base-100 w-8 rounded-full ring ring-offset-1">
              <img src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp" alt="Avatar" />
            </div>
          </button>
        </div>
      </div>

      {isProfileOpen && (
        <div ref={menuRef} className="shadow-md absolute right-0">
          <ul className="menu bg-slate-900 bg-opacity-30 rounded-b-xl p-4 items-center border-l-2 border-b-2 border-r-2 border-gray-400">
            <li>
              <button className="btn btn-ghost w-full" onClick={handleHome}>
                Home
              </button>
            </li>
            <li>
              <DarkMode />
            </li>
            <li>
              <button className="btn btn-ghost w-full" onClick={handleProfile}>
                My Profile
              </button>
            </li>
            <li>
              <button className="btn btn-ghost w-full" onClick={handleBookings}>
                My Bookings
              </button>
            </li>
            <li>
              <button className="btn btn-ghost w-full" onClick={onLogout}>
                Log Out
              </button>
            </li>
          </ul>
        </div>
      )}
    </div>
  );
};
