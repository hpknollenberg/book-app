import React, { useEffect } from 'react'
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
import Protected from './protectedroute.jsx'
import Header from './Header.jsx'

import { AuthContext } from './authContext.js'
import { useState } from 'react'


function Layout() {
  return (
    <>
      <Header />
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
        path: '/login',
        element: <Login />
      },
      {
        element: <Protected />,
        children: [
          {
            path: '/',
            element: <App />
          },
        ]
      }  
    ]
  }
])


const AuthContextProvider = ({ children }) => {
  let tempToken = JSON.parse(localStorage.getItem('token'))

  const [accessToken, setAccessToken] = useState(tempToken ? tempToken : [])


  useEffect(() => {
    localStorage.setItem("token", JSON.stringify(accessToken))
  }, [accessToken])

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