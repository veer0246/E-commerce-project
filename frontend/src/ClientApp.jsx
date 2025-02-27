import React from 'react'
import ClientNavbar from './client/ClientNavbar'
import { Outlet } from 'react-router-dom'
import UserContextProvider from './context/UserContextProvider2'

export default function ClientApp() {
  return (
    //using context api
    <UserContextProvider> 
      <ClientNavbar/>
      <Outlet/>
      </UserContextProvider>
  )
}