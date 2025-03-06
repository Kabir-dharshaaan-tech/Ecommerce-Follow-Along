



import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./components/Signup"; 
import Navbar from "./pages/Navbar";
import CreateProduct from "./components/CreateProduct";
import SellerProductPage from "./pages/SellerProduct";

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        
        
        <Route path="/create" element={<CreateProduct />} />
        
        <Route path="/seller-products" element={<SellerProductPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
