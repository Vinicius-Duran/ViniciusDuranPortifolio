import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import './Header.css';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [time, setTime] = useState('');
  const location = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    const tick = () => {
      const now = new Date();
      const formatted = now.toLocaleTimeString('pt-BR', {
        hour: '2-digit',
        minute: '2-digit',
        timeZone: 'America/Sao_Paulo',
      });
      setTime(`${formatted} BRT`);
    };
    tick();
    const id = setInterval(tick, 30000);
    return () => clearInterval(id);
  }, []);

  useEffect(() => {
    if (!isMenuOpen) return undefined;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [isMenuOpen]);

  useEffect(() => {
    setIsMenuOpen(false);
  }, [location.pathname]);

  const toggleMenu = () => setIsMenuOpen((prev) => !prev);
  const closeMenu = () => setIsMenuOpen(false);

  const isActive = (path) => location.pathname === path;

  const handleAnchor = (e, target) => {
    e.preventDefault();
    if (location.pathname === '/') {
      const node = document.querySelector(target);
      if (node) node.scrollIntoView({ behavior: 'smooth' });
    } else {
      window.location.href = `/${target.startsWith('#') ? target : `#${target}`}`;
    }
    closeMenu();
  };

  return (
    <header
      className={`site-header ${scrolled ? 'is-scrolled' : ''} ${isMenuOpen ? 'is-menu-open' : ''}`}
    >
      <div className="site-header-inner">
        <Link to="/" className="brand magnetic" onClick={closeMenu}>
          <span className="brand-mark" aria-hidden="true">
            <span className="brand-dot" />
          </span>
          <span className="brand-text">
            <span className="brand-name">Vinícius Duran</span>
            <span className="brand-role">Developer · Portfolio · 2026</span>
          </span>
        </Link>

        <nav
          id="site-nav"
          className={`site-nav ${isMenuOpen ? 'is-open' : ''}`}
          aria-label="Principal"
        >
          <ul className="nav-list">
            <li>
              <Link
                to="/"
                className={`nav-link ${isActive('/') ? 'is-active' : ''}`}
                onClick={closeMenu}
              >
                <span className="nav-link-index">01</span>
                <span className="nav-link-label">Home</span>
              </Link>
            </li>
            <li>
              <a
                href="#about"
                className="nav-link"
                onClick={(e) => handleAnchor(e, '#about')}
              >
                <span className="nav-link-index">02</span>
                <span className="nav-link-label">Sobre</span>
              </a>
            </li>
            <li>
              <a
                href="#projects"
                className="nav-link"
                onClick={(e) => handleAnchor(e, '#projects')}
              >
                <span className="nav-link-index">03</span>
                <span className="nav-link-label">Projetos</span>
              </a>
            </li>
            <li>
              <Link
                to="/about"
                className={`nav-link ${isActive('/about') ? 'is-active' : ''}`}
                onClick={closeMenu}
              >
                <span className="nav-link-index">04</span>
                <span className="nav-link-label">Trajetória</span>
              </Link>
            </li>
            <li>
              <a
                href="#contact"
                className="nav-link"
                onClick={(e) => handleAnchor(e, '#contact')}
              >
                <span className="nav-link-index">05</span>
                <span className="nav-link-label">Contato</span>
              </a>
            </li>
          </ul>
        </nav>

        <div className="header-meta">
          <span className="meta-dot" aria-hidden="true" />
          <span className="meta-status">Disponível</span>
          <span className="meta-sep" aria-hidden="true">/</span>
          <span className="meta-time">{time}</span>
        </div>

        <button
          type="button"
          className={`menu-toggle ${isMenuOpen ? 'is-open' : ''}`}
          onClick={toggleMenu}
          aria-label={isMenuOpen ? 'Fechar menu' : 'Abrir menu'}
          aria-expanded={isMenuOpen}
          aria-controls="site-nav"
        >
          <span />
          <span />
        </button>
      </div>
    </header>
  );
};

export default Header;
