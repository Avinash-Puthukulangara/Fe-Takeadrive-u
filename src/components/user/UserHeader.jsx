import React, { useEffect, useRef, useState } from 'react';
import { DarkMode } from './DarkMode';
import { useNavigate } from 'react-router-dom';

export const UserHeader = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);

  const navigate = useNavigate();
  const menuRef = useRef(null);

  const handleHome = () => {
    navigate('/');
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const toggleProfile = () => {
    setIsProfileOpen(!isProfileOpen);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setIsMenuOpen(false);
      }};
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  useEffect(() => {
    const handleClickOut = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setIsProfileOpen(false);
      }};
    document.addEventListener('mousedown', handleClickOut);
    return () => {
      document.removeEventListener('mousedown', handleClickOut);
    };
  }, []);

  return (
    <div className='sticky top-0 z-50'>
      <div className="navbar bg-lightgray bg-opacity-30 shadow-2xl flex justify-between items-center">
        <button className="btn btn-ghost btn-circle" onClick={toggleMenu}>
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7" />
          </svg>
        </button>
        <a className="btn btn-ghost font-serif text-xl font-extrabold mx-auto" onClick={handleHome}>TakeaDrive</a>
        <div className='flex items-center'>
          <button className="btn btn-ghost btn-circle avatar" onClick={toggleProfile}>
            <div className="ring-primary ring-offset-base-100 w-8 rounded-full ring ring-offset-1">
              <img src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp" alt="Avatar" />
            </div>
          </button>
        </div>
      </div>

      {isMenuOpen && (
        <div ref={menuRef} className="shadow-md absolute left-0">
          <ul className="menu bg-slate-900 bg-opacity-30 rounded-b-2xl p-4 items-center border-l-2 border-b-2 border-r-2 border-gray-400">
            <li><button className="btn btn-ghost w-full" onClick={handleHome}>Home</button></li>
            <li><button className="btn btn-ghost w-full">About Us</button></li>
            <li><DarkMode /></li>
          </ul>
        </div>
      )}
      {isProfileOpen && (
        <div ref={menuRef} className="shadow-md absolute right-0">
          <ul className="menu bg-slate-900 bg-opacity-30 rounded-b-xl p-4 items-center border-l-2 border-b-2 border-r-2 border-gray-400">
            <li><button className="btn btn-ghost w-full" >My Profile</button></li>
            <li><button className="btn btn-ghost w-full">My Bookings</button></li>
            <li><button className="btn btn-ghost w-full">Log Out</button></li>
          </ul>
        </div>
      )}
    </div>
  );
};
