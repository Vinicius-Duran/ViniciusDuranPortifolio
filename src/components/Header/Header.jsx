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
          <Link to="/" className="logo-link" onClick={closeMenu}>
            <span className="logo-text">Vinícius Duran</span>
          </Link>
        </div>

        <nav className={`header-nav ${isMenuOpen ? 'nav-open' : ''}`}>
          <ul className="nav-list">
            <li className="nav-item">
              <Link
                to="/"
                className={`nav-link ${isActive('/') ? 'active' : ''}`}
                onClick={closeMenu}
              >
                Home
              </Link>
            </li>
            <li className="nav-item">
              <Link
                to="/about"
                className={`nav-link ${isActive('/about') ? 'active' : ''}`}
                onClick={closeMenu}
              >
                Sobre
              </Link>
            </li>
            <li className="nav-item">
              <a
                href="#projects"
                className="nav-link"
                onClick={(e) => { 
                  e.preventDefault(); 
                  if (location.pathname === '/') {
                    document.querySelector('#projects').scrollIntoView({ behavior: 'smooth' });
                  } else {
                    window.location.href = '/#projects';
                  }
                  closeMenu(); 
                }}
              >
                Projetos
              </a>
            </li>
            <li className="nav-item">
              <a
                href="#contact"
                className="nav-link"
                onClick={(e) => { 
                  e.preventDefault(); 
                  if (location.pathname === '/') {
                    document.querySelector('#contact').scrollIntoView({ behavior: 'smooth' });
                  } else {
                    window.location.href = '/#contact';
                  }
                  closeMenu(); 
                }}
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
