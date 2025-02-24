

import React from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Navbar from './pages/Navbar';
import Signup from './components/Signup';
import CreateProduct from "./components/CreateProduct"


function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/create" element={<CreateProduct/>}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
