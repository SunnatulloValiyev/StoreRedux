import React from 'react'
import { useLoaderData } from 'react-router-dom'
import Product from './Product';



function ProductList() {
    const {
        data: {products}
    } = useLoaderData()
    
  return (
    <div className="m-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {products.map((product) =>{
            return <Product product={product} key={product.id}/>
        })}
    </div>
  )
}

export default ProductList