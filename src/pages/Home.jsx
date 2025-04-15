import { useLoaderData } from "react-router-dom";
import { axiosInstance } from "../utils";
import ProductList from "../components/ProductList";

export const loader = async () => {
  const req = await axiosInstance("/product")
  return req
} 


function Home() {
    const {
      data : {products},
    } = useLoaderData() 
  return (
    <>
    <ProductList/>
    </>
  )
}

export default Home