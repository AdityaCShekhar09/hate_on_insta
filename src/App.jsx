import './App.css'
import TopNav from './Components/TopNav/TopNav'
import Home from './pages/Home'
import Features from './pages/Features'
import Detect from './pages/Detect'
import How_it_Works from './pages/How_it_Works'
import Contact from './pages/Contact'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

function App() {

  return (
   
  <div className="bg-gradient-to-r from-lime-200 via-lime-300 to-teal-200 h-screen w-screen "> 
     <Router>
      <TopNav />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/audio" element={<Features />} />
        <Route path="/how-it-works" element={<How_it_Works/>} />
        <Route path="/detect" element={<Detect />} />
       <Route path="/contact" element={<Contact />} /> 
      </Routes>
    </Router>
  </div>
  )
}

export default App
