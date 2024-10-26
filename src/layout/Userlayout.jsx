import React from 'react'
import { Outlet } from 'react-router-dom'
import { Header } from '../components/user/Header'
import { UserHeader } from '../components/user/UserHeader'
import { useSelector } from 'react-redux'
import { SearchProvider } from '../components/user/SearchContext'


export const Userlayout = () => {

  const userAuthorised = useSelector((state) => state.user.userAuthorised)

  return (
    <div>
      {userAuthorised ? <SearchProvider><UserHeader /></SearchProvider> : <Header />}
        <Outlet />
    </div>
  )
}
