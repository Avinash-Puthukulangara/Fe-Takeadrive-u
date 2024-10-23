import React, { useEffect } from 'react'
import { Outlet, useLocation, useNavigate } from 'react-router-dom'
import { Header } from '../components/user/Header'
import { axiosInstance } from '../config/axiosInstance'

export const Userlayout = () => {

  const location = useLocation()

  const checkUser = async() => {
    try {
      const response = await axiosInstance({method: "GET", url: "/user/checkuser",withCredentials: true})
    } catch (error) {
      console.log(error)
    }
  }
  useEffect(() =>{ 
    checkUser()
  },[location.pathname])

  return (
    <div>
        <Header />
        <Outlet />
    </div>
  )
}
