import { useState } from 'react'
import { AnimatePresence } from "framer-motion";
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Signup from "../src/pages_components/Signup"
import { Routes, Route } from 'react-router'
import { Homepage } from './pages_components/Homepage'
import { About } from './pages_components/About'
import { Navbar } from './pages_components/Navbar'
import { Login } from './pages_components/Login'
import { Toaster } from 'react-hot-toast'
import { AuthProvider } from './pages_components/Context'
import { Add_post } from './pages_components/Add_post'
import { Profile } from './pages_components/Profile'
import { Settings } from './pages_components/Settings'
import FullPost from './pages_components/Full_post'
import { Add_comment } from './pages_components/Add_Comment';
import { Liked_posts } from './pages_components/Liked_posts';

function App() {
  const [count, setCount] = useState(0)

  return (
    <div className=''>
      <AuthProvider>
        <div className='w-screen'>
          <Navbar />
          <hr />
          <Toaster />
          <AnimatePresence mode="wait">
          <Routes>
            <Route path='/' element={<Homepage className="mt-4 flex fixed"/>}/>
            <Route path='/user/liked' element={<Liked_posts className="mt-4 flex fixed"/>}/>
            <Route path='/post/:id' element={<FullPost className="mt-4 flex fixed h-screen"/>}/>
            <Route path="/login" element={<Login className="flex fixed"/>}/>
            <Route path="/signup" element={<Signup className="flex fixed"/>}/>
            <Route path="/add_post" element={<Add_post className="flex fixed"/>}/>
            <Route path="/add_comment/:id" element={<Add_comment className="flex fixed"/>}/>
            <Route path="/about" element={<About/>}/>
            <Route path="/profile/:username" element={<Profile/>}/>
            <Route path="/settings" element={<Settings/>}/>
          </Routes>
          </AnimatePresence>
        </div>
      </AuthProvider>
      
    </div>
  )
}

export default App
