



// import { useEffect, useState } from "react";
// import axios from "axios";
// import ProductCard from "../components/ProductCard";

// const baseUrl = "http://localhost:8080"; // Ensure this URL is correct

// export default function SellerProductPage() {
//   const [data, setData] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [editProduct, setEditProduct] = useState(null); // Holds product data for editing

//   useEffect(() => {
//     fetchProducts();
//   }, []);

//   const fetchProducts = async () => {
//     try {
//       const response = await axios.get(`${baseUrl}/product/allproduct`);
//       if (response.status === 200) {
//         setData(response.data.message || []);
//       } else {
//         throw new Error("Failed to fetch products");
//       }
//     } catch (error) {
//       console.error("Error fetching products:", error);
//       setError("Failed to load products.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleDelete = async (productId) => {
//     if (!window.confirm("Are you sure you want to delete this product?")) return;

//     try {
//       await axios.delete(`${baseUrl}/product/delete/${productId}`);
//       setData(data.filter((product) => product._id !== productId));
//       alert("Product deleted successfully.");
//     } catch (error) {
//       console.error("Error deleting product:", error);
//       alert("Failed to delete product.");
//     }
//   };

//   const handleEditClick = (product) => {
//     setEditProduct({
//       ...product,
//       tags: Array.isArray(product.tags) ? product.tags.join(", ") : product.tags, // ✅ Convert tags array to string
//     });
//   };

//   const handleEditChange = (e) => {
//     setEditProduct({ ...editProduct, [e.target.name]: e.target.value });
//   };

//   const handleEditSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       await axios.put(`${baseUrl}/product/update/${editProduct._id}`, {
//         ...editProduct,
//         tags: editProduct.tags ? editProduct.tags.split(",").map(tag => tag.trim()) : [], // ✅ Convert tags back to array
//       });

//       alert("Product updated successfully.");
//       setEditProduct(null);
//       fetchProducts(); // Refresh product list
//     } catch (error) {
//       console.error("Error updating product:", error);
//       alert("Failed to update product.");
//     }
//   };

//   return (
//     <div className="w-full min-h-screen bg-neutral-800 p-4">
//       {loading ? (
//         <p className="text-white text-center">Loading products...</p>
//       ) : error ? (
//         <p className="text-red-500 text-center">{error}</p>
//       ) : data.length === 0 ? (
//         <p className="text-white text-center">No products available.</p>
//       ) : (
//         <div className="grid grid-cols-5 gap-4">
//           {data.map((product) => (
//             <div key={product._id} className="relative">
//               <ProductCard {...product} />
//               <div className="flex justify-center mt-2">
//                 <button
//                   onClick={() => handleEditClick(product)}
//                   className="mr-2 px-4 py-2 bg-blue-500 text-white rounded"
//                 >
//                   Edit
//                 </button>
//                 <button
//                   onClick={() => handleDelete(product._id)}
//                   className="px-4 py-2 bg-red-500 text-white rounded"
//                 >
//                   Delete
//                 </button>
//               </div>
//             </div>
//           ))}
//         </div>
//       )}

//       {/* Edit Product Form (Shows when a product is selected for editing) */}
//       {editProduct && (
//         <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
//           <div className="bg-white p-6 rounded-lg shadow-lg w-96">
//             <h2 className="text-xl font-bold mb-4">Edit Product</h2>
//             <form onSubmit={handleEditSubmit} className="space-y-4">
//               <input type="text" name="name" value={editProduct.name} onChange={handleEditChange} placeholder="Product Name" className="w-full p-2 border rounded" required />
//               <textarea name="description" value={editProduct.description} onChange={handleEditChange} placeholder="Description" className="w-full p-2 border rounded" required></textarea>
//               <input type="text" name="category" value={editProduct.category} onChange={handleEditChange} placeholder="Category" className="w-full p-2 border rounded" required />
//               <input type="text" name="tags" value={editProduct.tags} onChange={handleEditChange} placeholder="Tags (comma-separated)" className="w-full p-2 border rounded" required />
//               <input type="number" name="price" value={editProduct.price} onChange={handleEditChange} placeholder="Price" className="w-full p-2 border rounded" required />
//               <input type="number" name="stock" value={editProduct.stock} onChange={handleEditChange} placeholder="Stock" className="w-full p-2 border rounded" required />
//               <div className="flex justify-between">
//                 <button type="submit" className="bg-green-500 text-white px-4 py-2 rounded">Save Changes</button>
//                 <button type="button" onClick={() => setEditProduct(null)} className="bg-gray-500 text-white px-4 py-2 rounded">Cancel</button>
//               </div>
//             </form>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }









import { useEffect, useState } from "react";
import axios from "axios";
import ProductCard from "../components/ProductCard";

const baseUrl = "http://localhost:8080"; // Make sure this is the correct backend URL

export default function SellerProductPage() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [editProduct, setEditProduct] = useState(null);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await axios.get(`${baseUrl}/product/allproduct`);
      if (response.status === 200) {
        setData(response.data.message || []);
      } else {
        throw new Error("Failed to fetch products");
      }
    } catch (error) {
      console.error("Error fetching products:", error);
      setError("Failed to load products.");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (productId) => {
    if (!window.confirm("Are you sure you want to delete this product?")) return;

    try {
      const response = await axios.delete(`${baseUrl}/product/delete/${productId}`);

      if (response.status === 200) {
        setData(data.filter((product) => product._id !== productId));
        alert("Product deleted successfully.");
      } else {
        alert("Failed to delete product.");
      }
    } catch (error) {
      console.error("Error deleting product:", error);
      alert("Failed to delete product.");
    }
  };

  const handleEditClick = (product) => {
    setEditProduct({
      ...product,
      tags: Array.isArray(product.tags) ? product.tags.join(", ") : product.tags,
    });
  };

  const handleEditChange = (e) => {
    setEditProduct({ ...editProduct, [e.target.name]: e.target.value });
  };

  const handleEditSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.put(`${baseUrl}/product/update/${editProduct._id}`, {
        ...editProduct,
        tags: editProduct.tags ? editProduct.tags.split(",").map(tag => tag.trim()) : [],
      });

      if (response.status === 200) {
        alert("Product updated successfully.");
        setEditProduct(null);
        fetchProducts();
      } else {
        alert("Failed to update product.");
      }
    } catch (error) {
      console.error("Error updating product:", error);
      alert("Failed to update product.");
    }
  };

  return (
    <div className="w-full min-h-screen bg-neutral-800 p-4">
      {loading ? (
        <p className="text-white text-center">Loading products...</p>
      ) : error ? (
        <p className="text-red-500 text-center">{error}</p>
      ) : data.length === 0 ? (
        <p className="text-white text-center">No products available.</p>
      ) : (
        <div className="grid grid-cols-5 gap-4">
          {data.map((product) => (
            <div key={product._id} className="relative">
              <ProductCard {...product} />
              <div className="flex justify-center mt-2">
                <button
                  onClick={() => handleEditClick(product)}
                  className="mr-2 px-4 py-2 bg-blue-500 text-white rounded"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(product._id)}
                  className="px-4 py-2 bg-red-500 text-white rounded"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {editProduct && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-6 rounded-lg shadow-lg w-96">
            <h2 className="text-xl font-bold mb-4">Edit Product</h2>
            <form onSubmit={handleEditSubmit} className="space-y-4">
              <input type="text" name="name" value={editProduct.name} onChange={handleEditChange} placeholder="Product Name" className="w-full p-2 border rounded" required />
              <textarea name="description" value={editProduct.description} onChange={handleEditChange} placeholder="Description" className="w-full p-2 border rounded" required></textarea>
              <input type="text" name="category" value={editProduct.category} onChange={handleEditChange} placeholder="Category" className="w-full p-2 border rounded" required />
              <input type="text" name="tags" value={editProduct.tags} onChange={handleEditChange} placeholder="Tags (comma-separated)" className="w-full p-2 border rounded" required />
              <input type="number" name="price" value={editProduct.price} onChange={handleEditChange} placeholder="Price" className="w-full p-2 border rounded" required />
              <input type="number" name="stock" value={editProduct.stock} onChange={handleEditChange} placeholder="Stock" className="w-full p-2 border rounded" required />
              <div className="flex justify-between">
                <button type="submit" className="bg-green-500 text-white px-4 py-2 rounded">Save Changes</button>
                <button type="button" onClick={() => setEditProduct(null)} className="bg-gray-500 text-white px-4 py-2 rounded">Cancel</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
