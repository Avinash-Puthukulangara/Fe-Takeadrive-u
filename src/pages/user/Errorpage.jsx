import { Button } from '@chakra-ui/react'
import React from 'react'
import { useNavigate } from 'react-router-dom'

export const Errorpage = () => {

  const navigate = useNavigate()

  const handleClick = ()=> {
    navigate('/home')
  }

  return (
    <div className='flex flex-col items-center justify-center h-screen'>
      <h1 className='text-pink-700 text-5xl font-semibold font-serif'>Oops!</h1>
      <p className='text-slate-900 text-md font-bold'>Page Not Found.</p>
      <Button colorScheme='orange' variant='solid' size='sm' onClick={(handleClick)}>Go to Home</Button>
    </div>
  )
}
