'use client';
import React, { useEffect, useState } from 'react';
import { client } from "@/sanity/lib/client";
import Image from "next/image";
import Link from "next/link";
import WishlistButton from "../components/WishlistButton";
import { Loader } from "lucide-react";

interface Product {
  _id: string;
  name: string;
  imageUrl: string;
  price: number;
  slug: string;
}

const ProductsPage = () => {
  const [data, setData] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 4; // Display 4 products per page

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      const query = `*[_type == "product" && image.asset != null]{
        _id,
        name,
        "slug": slug.current,
        "imageUrl": image.asset->url,
        price
      }`;
      const result = await client.fetch(query);
      setData(result || []);
      setLoading(false);
    };

    fetchData();
  }, []);

  // Pagination logic
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentProducts = data.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(data.length / itemsPerPage);

  return (
    <section className="px-2 sm:px-4 md:px-8 py-6 sm:py-8 text-[#2A254B] mt-4 sm:mt-12">
      <h1 className="text-lg sm:text-xl md:text-2xl font-semibold text-center">Products</h1>

      {/* Product Grid */}
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 sm:gap-4 mt-4 sm:mt-6">
        {loading ? (
          <div className="col-span-2 sm:col-span-4 flex justify-center items-center">
            <Loader className="w-8 h-8 sm:w-10 sm:h-10 animate-spin text-[#2A254B]" />
          </div>
        ) : currentProducts.length > 0 ? (
          currentProducts.map((product) => (
            <div className="w-full h-auto" key={product._id}>
              <Link href={`/products/${product.slug}`}>
                <Image
                  src={product.imageUrl}
                  height={700}
                  width={700}
                  alt={product.name}
                  className="w-full h-[120px] sm:h-[150px] md:h-[200px] lg:h-[250px] object-cover rounded-md"
                />
              </Link>
              <div className="mt-2 text-[#2A254B]">
                <p className="text-xs sm:text-sm py-1 truncate">{product.name}</p>
                <p className="text-sm sm:text-base font-semibold">${product.price}</p>
                <WishlistButton product={product} />
              </div>
            </div>
          ))
        ) : (
          <p className="text-center text-gray-500 col-span-2 sm:col-span-4">No products found</p>
        )}
      </div>

      {/* Pagination Controls */}
      <div className="flex justify-center mt-6 sm:mt-8 space-x-1 sm:space-x-2">
        <button
          className={`px-2 py-1 sm:px-3 sm:py-2 border rounded-md text-xs sm:text-sm ${currentPage === 1 ? "opacity-50 cursor-not-allowed" : "hover:bg-gray-200"}`}
          onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
          disabled={currentPage === 1}
        >
          Previous
        </button>

        {/* Page Numbers */}
        <div className="flex space-x-1 sm:space-x-2">
          {Array.from({ length: totalPages }, (_, index) => (
            <button
              key={index}
              className={`px-2 py-1 sm:px-3 sm:py-2 border rounded-md text-xs sm:text-sm ${currentPage === index + 1 ? "bg-[#2A254B] text-white" : "hover:bg-gray-200"}`}
              onClick={() => setCurrentPage(index + 1)}
            >
              {index + 1}
            </button>
          ))}
        </div>

        <button
          className={`px-2 py-1 sm:px-3 sm:py-2 border rounded-md text-xs sm:text-sm ${currentPage === totalPages ? "opacity-50 cursor-not-allowed" : "hover:bg-gray-200"}`}
          onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
          disabled={currentPage === totalPages}
        >
          Next
        </button>
      </div>
    </section>
  );
};

export default ProductsPage;
