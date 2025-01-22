'use client'; // This is an interactive component

import { useWishlist } from "../../context/WishlistContext";
import Image from "next/image";
import Link from "next/link";

export default function WishlistPage() {
  const { wishlist, removeFromWishlist } = useWishlist();

  return (
    <section className="px-6 sm:px-8 py-12 bg-gradient-to-r from-blue-50 to-indigo-100 min-h-screen">
      <div className="max-w-screen-lg mx-auto">
        <h1 className="text-3xl sm:text-4xl font-semibold text-gray-800 text-center mb-8">My Wishlist</h1>

        {wishlist.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {wishlist.map((product) => (
              <div className="bg-white p-4 rounded-lg shadow-lg hover:shadow-xl transition-transform transform hover:scale-105" key={product._id}>
                {/* Product Image */}
                <Link href={`/products/${product.slug}`}>
                  <p>
                    <Image
                      src={product.imageUrl}
                      height={400}
                      width={400}
                      alt={product.name}
                      className="w-full h-48 object-cover rounded-lg"
                    />
                  </p>
                </Link>
                
                {/* Product Details */}
                <div className="mt-4 text-gray-800">
                  <p className="font-semibold text-base sm:text-lg">{product.name}</p>
                  <p className="text-gray-500 text-sm sm:text-base">${product.price}</p>
                </div>

                {/* Remove Button */}
                <button
                  className="w-full bg-red-500 text-white py-2 rounded-lg mt-4 hover:bg-red-600 transition"
                  onClick={() => removeFromWishlist(product._id)}
                >
                  Remove from Wishlist
                </button>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center text-gray-600 mt-12">
            <p className="text-xl sm:text-2xl font-medium">Oops, your wishlist is currently empty!</p>
            <p className="mt-4 text-lg">Start adding items to your wishlist to keep track of your favorite products!</p>
            <Link href="/products">
              <p className="mt-6 inline-block bg-indigo-600 text-white py-2 px-6 rounded-lg hover:bg-indigo-700 transition">
                Browse Products
              </p>
            </Link>
          </div>
        )}
      </div>
    </section>
  );
}
