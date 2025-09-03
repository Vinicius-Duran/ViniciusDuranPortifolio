import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import './Header.css';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  const isActive = (path) => {
    return location.pathname === path;
  };

  return (
    <header className="header">
      <div className="header-container">
        <div className="header-logo">
          <a href="#" className="logo-link" onClick={(e) => { e.preventDefault(); window.scrollTo({ top: 0, behavior: 'smooth' }); closeMenu(); }}>
            <span className="logo-text">Vinícius Duran</span>
          </a>
        </div>

        <nav className={`header-nav ${isMenuOpen ? 'nav-open' : ''}`}>
          <ul className="nav-list">
            <li className="nav-item">
              <a
                href="#"
                className={`nav-link ${isActive('/') ? 'active' : ''}`}
                onClick={(e) => { e.preventDefault(); window.scrollTo({ top: 0, behavior: 'smooth' }); closeMenu(); }}
              >
                Home
              </a>
            </li>
            <li className="nav-item">
              <a
                href="#about"
                className="nav-link"
                onClick={(e) => { e.preventDefault(); document.querySelector('#about').scrollIntoView({ behavior: 'smooth' }); closeMenu(); }}
              >
                Sobre
              </a>
            </li>
            <li className="nav-item">
              <a
                href="#projects"
                className="nav-link"
                onClick={(e) => { e.preventDefault(); document.querySelector('#projects').scrollIntoView({ behavior: 'smooth' }); closeMenu(); }}
              >
                Projetos
              </a>
            </li>
            <li className="nav-item">
              <a
                href="#contact"
                className="nav-link"
                onClick={(e) => { e.preventDefault(); document.querySelector('#contact').scrollIntoView({ behavior: 'smooth' }); closeMenu(); }}
              >
                Contato
              </a>
            </li>
          </ul>
        </nav>

        <div className="header-actions">
          <button
            className={`mobile-menu-btn ${isMenuOpen ? 'open' : ''}`}
            onClick={toggleMenu}
            aria-label="Toggle menu"
          >
            <span className="hamburger-line"></span>
            <span className="hamburger-line"></span>
            <span className="hamburger-line"></span>
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
