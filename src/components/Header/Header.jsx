import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { profile } from '../../data/profile';
import './Header.css';

const NAV = [
  { label: 'Trabalho', to: '/', hash: '#projects' },
  { label: 'Sobre', to: '/', hash: '#about' },
  { label: 'Trajetória', to: '/about' },
  { label: 'Contato', to: '/', hash: '#contact' },
];

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 32);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    if (!isMenuOpen) return undefined;
    const previous = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = previous;
    };
  }, [isMenuOpen]);

  useEffect(() => {
    const onKey = (event) => {
      if (event.key === 'Escape') setIsMenuOpen(false);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  useEffect(() => {
    setIsMenuOpen(false);
  }, [location.pathname]);

  const closeMenu = () => setIsMenuOpen(false);

  const handleNav = (event, item) => {
    if (!item.hash) {
      closeMenu();
      return;
    }
    if (location.pathname === '/') {
      event.preventDefault();
      document.querySelector(item.hash)?.scrollIntoView({ behavior: 'smooth' });
    }
    closeMenu();
  };

  const isCurrent = (item) =>
    !item.hash && location.pathname === item.to ? 'page' : undefined;

  return (
    <header className={`masthead ${scrolled ? 'is-scrolled' : ''}`}>
      <div className="masthead-inner">
        <Link to="/" className="wordmark" onClick={closeMenu}>
          <span className="wordmark-name">{profile.name}</span>
          <span className="wordmark-role">{profile.role}</span>
        </Link>

        <nav
          id="site-nav"
          className={`masthead-nav ${isMenuOpen ? 'is-open' : ''}`}
          aria-label="Navegação principal"
        >
          <ul>
            {NAV.map((item) => (
              <li key={item.label}>
                <Link
                  to={item.hash ? `${item.to}${item.hash}` : item.to}
                  className="masthead-link"
                  aria-current={isCurrent(item)}
                  onClick={(event) => handleNav(event, item)}
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>

          <p className="masthead-nav-foot">{profile.location}</p>
        </nav>

        <p className="masthead-status">
          <span className="masthead-status-dot" aria-hidden="true" />
          Disponível para projetos
        </p>

        <button
          type="button"
          className={`masthead-toggle ${isMenuOpen ? 'is-open' : ''}`}
          onClick={() => setIsMenuOpen((open) => !open)}
          aria-expanded={isMenuOpen}
          aria-controls="site-nav"
        >
          {isMenuOpen ? 'Fechar' : 'Menu'}
        </button>
      </div>
    </header>
  );
};

export default Header;
