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
    ]
  }
])



ReactDOM.createRoot(document.getElementById('root')).render(
  <RouterProvider router={router} />
)