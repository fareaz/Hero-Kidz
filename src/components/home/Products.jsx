import React from "react";
import { getProducts } from "@/actions/server/product";
import ProductCard from "../cards/ProductCard";

const Products = async () => {
  const products = await getProducts();

  return (
    <div className="py-7 max-w-7xl mx-auto ">
      {/* Section Heading */}
      <h2 className="text-center text-3xl sm:text-4xl md:text-5xl font-bold mb-6 md:mb-10">
        Our Products
      </h2>

      {/* Responsive Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 px-3  ">
        {products?.map((product) => (
          <ProductCard key={product._id?.toString()} product={product} />
        ))}
      </div>
    </div>
  );
};

export default Products;
