import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import Loginpage from './pages/login.jsx'
import App from './App.jsx'
import Navbar from './pages/Navbar.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
    
  </StrictMode>,
)