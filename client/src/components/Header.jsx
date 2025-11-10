import { useState } from 'react'
import { Link } from 'react-router-dom'
import './Header.css'

function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
  }

  const closeMenu = () => {
    setIsMenuOpen(false)
  }

  return (
    <header className="navbar">
      <div className="navbar-container">
        <Link to="/" className="logo" onClick={closeMenu}>
          <img src="/arwa-logo.svg" alt="ARWA Logo" />
        </Link>
        <button 
          className="menu-toggle"
          onClick={toggleMenu}
          aria-label="Toggle menu"
        >
          <span className={isMenuOpen ? 'hamburger open' : 'hamburger'}>
            <span></span>
            <span></span>
            <span></span>
          </span>
        </button>
        <nav className={`nav ${isMenuOpen ? 'nav-open' : ''}`}>
          <a href="/services" onClick={closeMenu}>Services</a>
          <Link to="/about-us" onClick={closeMenu}>About Us</Link>
          <Link to="/portfolio" onClick={closeMenu}>Portfolio</Link>
          <Link to="/book-a-call" onClick={closeMenu}>Enquiry</Link>
          <Link to="/book-a-call" className="book-call-btn-mobile" onClick={closeMenu}>Book a Call</Link>
        </nav>
        <Link to="/book-a-call" className="book-call-btn">Book a Call</Link>
      </div>
    </header>
  )
}

export default Header

