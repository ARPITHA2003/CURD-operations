import React from 'react'
import Navigation from './navbar/Navigation'
import { Outlet } from 'react-router-dom'

function RootLayout() {
  return (
    <div>
        <Navigation/>
        <Outlet/>
    </div>
  )
}

export default RootLayout