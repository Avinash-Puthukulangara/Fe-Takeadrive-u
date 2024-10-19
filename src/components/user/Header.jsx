import React from 'react'
import { DarkMode } from './DarkMode'
import { useNavigate } from 'react-router-dom'


export const Header = () => {

  const navigate = useNavigate();

  const handleClick = () => {
    navigate('/sign-up');
  }

  const handleHome = () => {
    navigate('');
  }


  return (
    <div className='sticky top-0'>
      <div className="navbar bg-lightgray bg-opacity-30 shadow-2xl">
        <div className="flex-1">
           <a className="btn btn-ghost font-serif text-xl font-extrabold" onClick={handleHome}>TakeaDrive</a>
        </div>
      <div className="flex-none items-center">
        <button className="btn btn-ghost btn-sm" onClick={handleHome}>Home</button>
        <button className="btn btn-ghost btn-sm">About Us</button>
        <button className="btn btn-ghost btn-md" onClick={handleClick}>Sign Up</button>
        <div className="flex ">
          <DarkMode />
        </div>
        <div className="flex flex-1 justify-end px-2">
  </div>
      </div>
     </div>
    </div>
  )
}

