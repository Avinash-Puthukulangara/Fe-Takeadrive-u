
import React from 'react'
import { Outlet } from 'react-router-dom'
import { Header } from '../components/user/Header'
import { WorkFlow } from '../components/user/WorkFlow'

export const Userlayout = () => {
  return (
    <div>
        <Header />
        <Outlet />
    </div>
  )
}
