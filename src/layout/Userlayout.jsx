
import React from 'react'
import { Header } from '../components/user/Header'
import { Outlet } from 'react-router-dom'

export const Userlayout = () => {
  return (
    <div>
        <Header />
        <Outlet />
    </div>
  )
}
