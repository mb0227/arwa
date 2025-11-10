import { Routes, Route } from 'react-router-dom'
import Header from './components/Header'
import Footer from './components/Footer'
import HomePage from './pages/HomePage'
import BookACall from './pages/BookACall'
import PortfolioGallery from './pages/Portfolio'
import AboutUs from './pages/AboutUs'
import Services from './pages/Services'
import './App.css'

function App() {
  return (
    <div className="App">
      <Header />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/book-a-call" element={<BookACall />} />
        <Route path="/portfolio" element={<PortfolioGallery />} />
        <Route path="/about-us" element={<AboutUs />} />
        <Route path="/services" element={<Services />} />
      </Routes>
      <Footer />
    </div>
  )
}

export default App

