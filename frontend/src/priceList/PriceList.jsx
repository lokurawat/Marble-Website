import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const PriceList = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  const { category } = useParams();

  const categoryNames = {
    indianmarble: "Indian Marble",
    italianmarble: "Italian Marble",
    granite: "Granite",
    sandstone: "Sandstone",
    onyxstone: "Onyx Stone",
    marbletiles: "Marble Tiles",
  };

  useEffect(() => {
    const getProducts = async () => {
      try {
        setLoading(true);

       const response = await fetch(`/api/products/category/${category}`);

        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.message || "Failed to fetch products");
        }

        setProducts(data);
      } catch (error) {
        console.log(error.message);
      } finally {
        setLoading(false);
      }
    };

    getProducts();
  }, [category]);

  if (loading) {
    return (
      <div className="w-full py-20 text-center">
        <p className="text-lg text-gray-600">
          Loading prices...
        </p>
      </div>
    );
  }

  return (
    <section className="w-full bg-gray-50 py-16 px-5">

      {/* Heading */}
      <div className="max-w-6xl mx-auto text-center mb-10">

        <h2 className="text-3xl md:text-4xl font-bold text-gray-800">
          {categoryNames[category] || category} Price List
        </h2>

        <p className="mt-3 text-gray-600">
          Explore our range of premium{" "}
          {categoryNames[category] || category}.
        </p>

      </div>

      {/* Price Table */}
      <div className="max-w-6xl mx-auto overflow-x-auto bg-white rounded-xl shadow-md">

        <table className="w-full min-w-[700px] text-left">

          {/* Table Header */}
          <thead className="bg-[#8B5E3C] text-white">

            <tr>

              <th className="px-6 py-4">
                Product
              </th>

              <th className="px-6 py-4">
                Origin
              </th>

              <th className="px-6 py-4">
                Price / Sq. Ft.
              </th>

              <th className="px-6 py-4">
                Finish
              </th>

              <th className="px-6 py-4">
                Action
              </th>

            </tr>

          </thead>

          {/* Products */}
          <tbody>

            {products.length > 0 ? (

              products.map((product) => (

                <tr
                  key={product._id}
                  className="border-b hover:bg-gray-50 transition"
                >

                  {/* Product Name */}
                  <td className="px-6 py-5 font-semibold text-gray-800">
                    {product.name}
                  </td>

                  {/* Origin */}
                  <td className="px-6 py-5 text-gray-600">
                    {product.origin}
                  </td>

                  {/* Price */}
                  <td className="px-6 py-5 font-semibold text-[#8B5E3C]">
                    ₹{product.price}
                  </td>

                  {/* Finish */}
                  <td className="px-6 py-5 text-gray-600">
                    {product.finish}
                  </td>

                  {/* Action */}
                  <td className="px-6 py-5">

                    <button
                      className="
                        bg-[#8B5E3C]
                        text-white
                        px-4
                        py-2
                        rounded-lg
                        hover:bg-[#70482f]
                        transition
                      "
                    >
                      Enquire
                    </button>

                  </td>

                </tr>

              ))

            ) : (

              <tr>

                <td
                  colSpan="5"
                  className="text-center py-10 text-gray-500"
                >
                  No products found.
                </td>

              </tr>

            )}

          </tbody>

        </table>

      </div>

      {/* Note */}
      <p className="max-w-6xl mx-auto mt-5 text-sm text-gray-500">
        * Prices may vary depending on quality, thickness, finish,
        size, and quantity.
      </p>

    </section>
  );
};

export default PriceList;