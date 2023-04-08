import React from 'react'
import {Route, Routes} from "react-router"
import ResponsiveAppBar from './components/Navbar/Navbar'
import Homepage from './components/Owner/Homepage/Homepage'
import Profile from './components/Owner/Profile/Profile'
import Hostel from './components/Owner/Hostel/Hostel'
import Mealsheet from './components/Owner/Mealsheet/Mealsheet'


function App() {
  return (
    <div>
        
            <ResponsiveAppBar/>
            <Routes>
                <Route path="/" element={<Homepage/>}/>
                <Route path="Profile" element={<Profile/>}/>
                <Route path="Hostel" element={<Hostel/>}/>
                <Route path="Mealsheet" element={<Mealsheet/>}/>
            </Routes>
        
        
    </div>
  )
}

export default App
