"use client";

import { useEffect, useState } from "react";
import { apiClient } from "@/lib/services/apiClient";

type Product = {
  _id: string;
  supplierId: string;
  name: string;
  description: string;
  category: string;
  price: number;
  stock: number;
  isApproved: boolean;
  status: string;
};

export default function PendingProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Modal States
  const [modalOpen, setModalOpen] = useState(false);
  const [modalMessage, setModalMessage] = useState("");
  const [modalType, setModalType] = useState<"success" | "error">("success");

  const token =
    typeof window !== "undefined" ? localStorage.getItem("token") : null;

  // Fetch Pending Products
  useEffect(() => {
    const getProducts = async () => {
      try {
        if (!token) throw new Error("No token found");

        const response = await apiClient<any>("/products/pending", {
          method: "GET",
          token,
        });

        setProducts(response.data ?? response);
      } catch (err: any) {
        setError(err.message || "Failed to load products");
      } finally {
        setLoading(false);
      }
    };

    getProducts();
  }, []);

  // Approve Product
  const handleApprove = async (productId: string) => {
    try {
      if (!token) throw new Error("No token found");

      await apiClient(`/products/${productId}/approve`, {
        method: "PUT",
        token,
      });

      // Remove approved product from UI
      setProducts((prev) =>
        prev.filter((product) => product._id !== productId),
      );

      // SUCCESS POPUP
      setModalType("success");
      setModalMessage("Product approved successfully!");
      setModalOpen(true);

      // Auto close after 2 sec
      setTimeout(() => {
        setModalOpen(false);
      }, 2000);
    } catch (err: any) {
      console.log("ERROR: ", err.message);

      // ERROR POPUP
      setModalType("error");
      setModalMessage(err.message || "Failed to approve product");
      setModalOpen(true);
    }
  };

  if (loading) return <p className="p-6">Loading pending products...</p>;
  if (error) return <p className="p-6 text-red-500">{error}</p>;

  return (
    <div className="p-6">
      <h1 className="text-xl font-bold mb-6">Pending Products</h1>

      {products.length === 0 ? (
        <p>No pending products found.</p>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {products.map((product) => (
            <div
              key={product._id}
              className="border rounded-xl p-5 shadow-md bg-white"
            >
              <h2 className="font-semibold mb-2">
                Product Name: {product.name}
              </h2>

              <p className="text-xs mb-2">
                <strong>Description:</strong> {product.description}
              </p>

              <p className="text-xs">
                <strong>Category:</strong> {product.category}
              </p>

              <p className="text-xs">
                <strong>Price:</strong> ₹{product.price}
              </p>

              <p className="text-xs">
                <strong>Stock:</strong> {product.stock}
              </p>

              <p className="text-xs">
                <strong>Status:</strong>{" "}
                <span
                  className={`bg-amber-300 px-2 py-0.5 rounded-full ${
                    product.isApproved ? "text-green-600" : "text-yellow-800"
                  }`}
                >
                  {product.isApproved ? "Approved" : "Pending"}
                </span>
              </p>

              <hr className="my-3" />

              <p className="text-xs">
                <strong>Supplier ID:</strong> {product.supplierId}
              </p>

              <p className="text-xs">
                <strong>Product ID:</strong> {product._id}
              </p>

              <p className="text-xs">
                <strong>Product Status:</strong> {product.status}
              </p>

              {!product.isApproved && (
                <button
                  onClick={() => handleApprove(product._id)}
                  className="mt-4 w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-md transition"
                >
                  Approve Product
                </button>
              )}
            </div>
          ))}
        </div>
      )}

      {/* MODAL */}
      {modalOpen && (
        <div className="fixed inset-0 flex items-center justify-center backdrop-blur-xs bg-white/10 z-50">
          <div className="bg-white p-6 rounded-lg shadow-xl border w-80 text-center">
            <h2
              className={`text-lg font-semibold mb-4 ${
                modalType === "success" ? "text-green-600" : ""
              }`}
            >
              {modalType === "success" ? "Success" : ""}
            </h2>

            <p className=" text-gray-600 mb-6">{modalMessage}</p>

            {modalType === "error" && (
              <button
                onClick={() => setModalOpen(false)}
                className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded"
              >
                OK
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
