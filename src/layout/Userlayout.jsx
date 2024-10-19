
import React from 'react'
import { Outlet } from 'react-router-dom'
import { Header } from '../components/user/Header'

export const Userlayout = () => {
  return (
    <div>
        <Header />
        <Outlet />
    </div>
  )
}
