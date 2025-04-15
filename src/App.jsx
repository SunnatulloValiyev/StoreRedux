import { createBrowserRouter, RouterProvider } from "react-router-dom";
import MainLayout from "./layouts/MainLayout";
import Home from "./pages/Home";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Product from "./pages/Product";
import { loader as HomeLoader } from "./pages/Home";
import { loader as ProductLodaer } from "./pages/Product";


function App() {
  const routes = createBrowserRouter([
    {
      path: "/",
      element: <MainLayout/>,
      children: [
        {
          index: true,
          element: <Home/>,
          loader: HomeLoader, 
        },
        {
          path: "/about",
          element: <About/>
        },
        {
          path: "/contact",
          element: <Contact/>
        },
        {
          path: "/product/:id",
          element: <Product/>,
          loader: ProductLodaer,
        }

      ]
    } 
  ])
  return <RouterProvider router={routes}/>
}

export default App;