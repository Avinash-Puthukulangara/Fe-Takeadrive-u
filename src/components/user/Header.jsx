import React, { useEffect, useRef, useState } from 'react';
import { DarkMode } from './DarkMode';
import { useNavigate } from 'react-router-dom';

export const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false); 
  const navigate = useNavigate();
  const menuRef = useRef(null);
  const aboutUsRef = useRef(null);

  const handleClick = () => {
    navigate('/signup');
  }

  const handleHome = () => {
    navigate('/');
  }

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  }

  const handleAboutUs = () => {
    if (aboutUsRef.current) {
      aboutUsRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setIsMenuOpen(false); 
      }
    };
    document.addEventListener('mousedown', handleClickOutside); 

    return () => {
      document.removeEventListener('mousedown', handleClickOutside); 
    };
  },[]);

  return (
    <div className='sticky top-0 z-50'>
      <div className="navbar bg-lightgray bg-opacity-30 shadow-2xl">
        <div className="flex-1">
          <a className="btn btn-ghost font-serif text-xl font-extrabold" onClick={handleHome}>TakeaDrive</a>
        </div>

        <div className="hidden md:flex flex-none items-center">
          <button className="btn btn-ghost btn-sm" onClick={handleHome}>Home</button>
          <button className="btn btn-ghost btn-sm" onClick={handleAboutUs}>About Us</button>
          <button className="btn btn-ghost btn-md" onClick={handleClick}>Sign Up</button>
          <div className="flex">
            <DarkMode />
          </div>
        </div>

        <div className="md:hidden flex items-center">
          <button className="btn btn-ghost btn-circle" onClick={toggleMenu}>
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7" />
            </svg>
          </button>
        </div>
      </div>

      {isMenuOpen && (
        <div ref={menuRef} className="md:hidden shadow-md w-62 h-0 absolute right-0">
          <ul className="menu bg-slate-100 bg-opacity-30 rounded-b-2xl p-4 items-center">
            <li><button className="btn btn-ghost w-full" onClick={handleHome}>Home</button></li>
            <li><button className="btn btn-ghost w-full">About Us</button></li>
            <li><button className="btn btn-ghost w-full" onClick={handleClick}>Sign Up</button></li>
            <li><DarkMode /></li>
          </ul>
        </div>
      )}
    </div>
  );
}


