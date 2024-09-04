import React from 'react'
import ReactDOM from 'react-dom/client'
import {
  createBrowserRouter,
  RouterProvider,
  Outlet,
} from 'react-router-dom'

//project styles
import 'bootstrap/dist/css/bootstrap.min.css'

import App from './App.jsx'
import Login from './Login.jsx'

import { AuthContext } from './authContext.js'
import { useState } from 'react'


function Layout() {
  return (
    <>
        <div id='page-content'>
          <Outlet />
        </div>
    </>
  )
}


const router = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      {
        path: '/',
        element: <App />
      },
      {
        path: '/login',
        element: <Login />
      }
    ]
  }
])


const AuthContextProvider = ({ children }) => {
  const [accessToken, setAccessToken] = useState(undefined)

  const auth = {
    accessToken,
    setAccessToken,
  }

  return(
    <AuthContext.Provider value={{ auth: auth }} >
      {children}
    </AuthContext.Provider>
  )
}


ReactDOM.createRoot(document.getElementById('root')).render(
  <AuthContextProvider>
    <RouterProvider router={router} />
  </AuthContextProvider>
)