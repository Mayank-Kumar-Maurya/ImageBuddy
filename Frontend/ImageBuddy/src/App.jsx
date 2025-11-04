import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import './App.css'
import Home from './Component/Home'
import Layout from './Component/Layout'
import ServerProvider from './Context/ServerProvider'
import SignUp from './Component/SignUp'
import AuthSuccess from './Component/AuthSuccess'
import SignIn from './Component/SignIn'

function App() {

  const router = createBrowserRouter([
    {
      path: "/",
      element: 
        <ServerProvider>
          <Layout />
        </ServerProvider>,
      children:[
        {
          path: "/",
          element: <Home/>
        },
        {
          path: "/SignUp",
          element: <SignUp />
        },
        {
          path: "/SignIn",
          element: <SignIn />
        },
        {
          path: "/signUp/success/:token",
          element: <AuthSuccess />
        }
      ]
    }
  ])

  return (
   <>
   <RouterProvider router={router}></RouterProvider>
   </>
  )
}

export default App
