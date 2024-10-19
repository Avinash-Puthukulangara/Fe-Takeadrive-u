
import React from 'react'
import { useNavigate } from 'react-router-dom'

export const Errorpage = () => {

  const navigate = useNavigate()

  const handleClick = ()=> {
    navigate('')
  }

  return (
    <div className='flex flex-col items-center justify-center h-screen'>
      <h1 className='text-pink-700 text-5xl font-semibold font-serif'>Oops!</h1>
      <p className='text-slate-900 text-md font-bold'>Page Not Found.</p>
      <button className="btn btn-active btn-neutral btn-sm" onClick={handleClick} >Go to Home</button>
    </div>
  )
}
