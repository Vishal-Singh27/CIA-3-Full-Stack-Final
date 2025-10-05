import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter } from 'react-router'
import { Navbar } from './pages_components/Navbar.jsx'
import { Toaster } from 'react-hot-toast'
import { AuthContext } from './pages_components/Context.jsx'

createRoot(document.getElementById('root')).render(
    <StrictMode>
      <div data-theme="synthwave">
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </div>
    </StrictMode>
)
