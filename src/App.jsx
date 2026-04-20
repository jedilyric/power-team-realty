import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import ScrollToTop from './components/ScrollToTop'
import Footer from './components/Footer'
import FloatingActions from './components/FloatingActions'
import Home from './pages/Home'
import About from './pages/About'
import Buy from './pages/Buy'
import Sell from './pages/Sell'
import Listings from './pages/Listings'
import Contact from './pages/Contact'
import HomeValuation from './pages/HomeValuation'

export default function App() {
  return (
    <Router>
      <ScrollToTop />
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/buy" element={<Buy />} />
        <Route path="/sell" element={<Sell />} />
        <Route path="/listings" element={<Listings />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/home-valuation" element={<HomeValuation />} />
      </Routes>
      <Footer />
      <FloatingActions />
    </Router>
  )
}
