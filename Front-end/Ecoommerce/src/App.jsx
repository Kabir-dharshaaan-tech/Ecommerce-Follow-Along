import React from 'react';
import {BrowserRouter,Routes,Route} from "react-router-dom"
  // Import the CSS file
import Home from "./pages/Home"
import Login from "./pages/login"
import Navbar  from './pages/NAvbar';
import Signup from './pages/signup';
function app() {
  return (
     <BrowserRouter>
        <Navbar/>
       <Routes>
            <Route  path="/"  element={<Home/>}/>
            <Route path="/login" element={<Login/>}/>
            <Route path="/signup" element={<Signup/>}/>

       </Routes>
     </BrowserRouter>
  );
}

export default app;