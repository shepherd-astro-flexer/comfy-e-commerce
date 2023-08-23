import React, { Children } from 'react'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import { HomeLayout, About, AuthWrapper, Cart, Checkout, Error, Home, PrivateRoute, Products, SingleProduct } from './pages'

const router = createBrowserRouter([
  {
    path: "/",
    element: <HomeLayout/>,
    children: [
      {
        index: true,
        element: <Home/>,
      },
      {
        path: "about",
        element: <About/>
      },
      {
        path: "products",
        element: <Products/>
      },
      {
        path: "products/:id",
        element: <SingleProduct/>
      },
      {
        path: "cart",
        element: <Cart/>
      },
      {
        path: "*",
        element: <Error/>,
      }
    ]
  }
])

function App() {
  return <RouterProvider router={router}/>
}

export default App
