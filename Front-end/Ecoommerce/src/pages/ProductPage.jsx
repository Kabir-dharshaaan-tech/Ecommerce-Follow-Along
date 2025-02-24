import React, { useState, useEffect } from "react";
import ProductCard from "../components/ProductCard";
import productsData from "../data.json";
import axios from "axios"
function ProductPage() {
  const [products, setProducts] = useState([]);



  useEffect(() => {

    const fetchData = async () => {
      try {
          let response = await axios.get("http://localhost:8080/product/allproduct");
          
          if (response.status === 200) {  
             
            setProducts(response.data.message);
          }
      } catch (error) {
          console.error("Error fetching products:", error);
      }
  };

  fetchData(); 
    
  }, []);

  return (
    <div className="container mx-auto p-8">
      <h1 className="text-4xl font-bold text-center mb-8">Products</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {products.map((product, index) => (
          <ProductCard
            key={index}
            name={product.name}
            image={product.images}
            description={product.description}
            price={product.price}
          />
        ))}
      </div>
    </div>
  );
}

export default ProductPage;
