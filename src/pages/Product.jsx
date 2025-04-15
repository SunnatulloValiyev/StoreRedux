import { axiosInstance } from '../utils';
import { useLoaderData } from 'react-router-dom';

export const loader = async ({ params }) => {
  const req = await axiosInstance(`/product/${params.id}`);
  return req.data;
};

function Product() {
  const product = useLoaderData();

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">{product.title}</h1>

      <div className="flex flex-col md:flex-row gap-6">
        <img
          src={product.thumbnail}
          alt={product.title}
          className="w-full md:w-1/2 h-auto rounded-xl shadow-lg object-cover"
        />

        <div className="space-y-4">
          <p className="text-gray-600">{product.description}</p>

          <div className="text-lg text-green-600 font-semibold">
            Price: ${product.price}
          </div>

          <div className="text-sm text-gray-500">
            In stock: {product.stock}
          </div>

          <div className="text-yellow-500 text-sm">
            Rating: {[...Array(5)].map((_, i) => (
              <span key={i}>
                {i < Math.floor(product.rating) ? "⭐" : "☆"}
              </span>
            ))} ({product.rating})
          </div>
        </div>
      </div>
    </div>
  );
}

export default Product;
