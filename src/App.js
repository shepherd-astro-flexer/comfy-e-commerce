import React, { Children } from "react";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import {
  HomeLayout,
  About,
  AuthWrapper,
  Cart,
  Checkout,
  Error,
  Home,
  PrivateRoute,
  Products,
  SingleProduct,
} from "./pages";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { FilterProvider } from "./context/filter_context";
import { ProductsProvider } from "./context/products_context";
import { loader as singleProductLoader } from "./pages/SingleProductPage";
// * we passed in an optional object that will determine how much time do we want the data to stay on the cache
// * the value of stale time should be in milliseconds. We can do the calculations that will provide us the desired value
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5,
    },
  },
});

const router = createBrowserRouter([
  {
    path: "/",
    element: <HomeLayout />,

    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "about",
        element: <About />,
      },
      {
        path: "products",
        element: <Products />,
      },
      {
        path: "products/:id",
        element: <SingleProduct />,
        loader: singleProductLoader(queryClient),
        errorElement: <Error />,
      },
      {
        path: "cart",
        element: <Cart />,
      },
      {
        path: "*",
        element: <Error />,
      },
    ],
  },
]);

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ProductsProvider>
        <FilterProvider>
          <RouterProvider router={router} />
          <ReactQueryDevtools />
        </FilterProvider>
      </ProductsProvider>
    </QueryClientProvider>
  );
}

export default App;
