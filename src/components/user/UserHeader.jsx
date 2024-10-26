import React, { useEffect, useRef, useState, useContext } from 'react';
import { DarkMode } from './DarkMode';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { axiosInstance } from '../../config/axiosInstance';
import { SearchContext } from './SearchContext';  

export const UserHeader = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);

  const [name, setName] = useState('');
  const [model, setModel] = useState('');
  const [seatCapacity, setSeatCapacity] = useState('');
  const [transmissionType, setTransmissionType] = useState('');
  const [fuelType, setFuelType] = useState('');
  const [range, setRange] = useState([0, 10000]);

  const { setCars } = useContext(SearchContext)

  const navigate = useNavigate();
  const menuRef = useRef(null);

  const handleHome = () => {
    navigate('/');
  };

  const handleProfile = () => {
    navigate('/user/myprofile');
  }

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const toggleProfile = () => {
    setIsProfileOpen(!isProfileOpen);
  };

  const user = {
    logout_route: '/user/logout',
  }

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
  }, []);

  useEffect(() => {
    const handleClickOut = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setIsProfileOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOut);
    return () => {
      document.removeEventListener('mousedown', handleClickOut);
    };
  }, []);

  const onLogout = async () => {
    try {
      await axiosInstance({
        method: 'POST',
        url: user.logout_route,
        withCredentials: true
    });
      toast.success("Logged out successfully");
      navigate('/');
    } catch (error) {
      toast.error("Failed to Logout");
      console.log(error);
    }
  };

  const handleFilterSubmit = async () => {
    try {
      const response = await axiosInstance('/car/filtercars', {
        name,
        model,
        seatCapacity,
        transmissionType,
        fuelType,
        range,
      });
      setCars(response.data.filteredCars); 
    } catch (error) {
      toast.error("Failed to filter cars");
      console.log(error);
    }
  };

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
        <div ref={menuRef} className="absolute left-0 mt-2">
          <div className="fixed inset-y-0 left-0 z-30 w-64 bg-gray-800 text-white transform transition-transform duration-200 ease-in-out">
            <div className="flex items-center justify-between p-4">
              <h1 className="text-2xl font-semibold">MyApp</h1>
            </div>

            <form className='card-body' onSubmit={(e) => { e.preventDefault(); handleFilterSubmit(); }}>

              <div className="search">
                <input
                  className="input input-bordered -ml-4 text-gray-500"
                  placeholder="Search Car by Name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
              

              <div>
                <select
                  className="input input-bordered -ml-4 text-gray-500 w-full"
                  value={model}
                  onChange={(e) => setModel(e.target.value)}
                >
                  <option value="">Select Model</option>
                  <option value="SUV">SUV</option>
                  <option value="MPV">MPV</option>
                  <option value="Hatchback">Hatchback</option>
                  <option value="Sedan">Sedan</option>
                </select>
              </div>
              
              <div>
                <select
                  className="input input-bordered -ml-4 text-gray-500 w-full"
                  value={seatCapacity}
                  onChange={(e) => setSeatCapacity(e.target.value)}
                >
                  <option value="">Seat Capacity</option>
                  <option value="5">5</option>
                  <option value="6">6</option>
                  <option value="7">7</option>
                </select>
              </div>
              
              <div>
                <select
                  className="input input-bordered -ml-4 text-gray-500 w-full"
                  value={transmissionType}
                  onChange={(e) => setTransmissionType(e.target.value)}
                >
                  <option value="">Transmission Type</option>
                  <option value="Automatic">Automatic</option>
                  <option value="Manual">Manual</option>
                </select>
              </div>
              

              <div>
                <select
                  className="input input-bordered -ml-4 text-gray-500 w-full"
                  value={fuelType}
                  onChange={(e) => setFuelType(e.target.value)}
                >
                  <option value="">Fuel Type</option>
                  <option value="Diesel">Diesel</option>
                  <option value="Petrol">Petrol</option>
                </select>
              </div>
              

              <div>
                <input
                  type="number"
                  className="input input-bordered -ml-4 text-gray-500 w-full"
                  placeholder="Max Price Range"
                  value={range[1]}
                  onChange={(e) => setRange([0, Number(e.target.value)])}
                />
              </div>
              
              <button className="btn btn-square bg-slate-600 bg-opacity-50 w-full text-white mt-2">
                Filter Car
              </button>
            </form>
          </div>
        </div>
      )}

      {isProfileOpen && (
        <div ref={menuRef} className="shadow-md absolute right-0">
          <ul className="menu bg-slate-900 bg-opacity-30 rounded-b-xl p-4 items-center border-l-2 border-b-2 border-r-2 border-gray-400">
            <li><button className="btn btn-ghost w-full" onClick={handleHome}>Home</button></li>
            <li><DarkMode /></li>
            <li><button className="btn btn-ghost w-full" onClick={handleProfile}>My Profile</button></li>
            <li><button className="btn btn-ghost w-full">My Bookings</button></li>
            <li><button className="btn btn-ghost w-full" onClick={onLogout}>Log Out</button></li>
          </ul>
        </div>
      )}
    </div>
  );
};
