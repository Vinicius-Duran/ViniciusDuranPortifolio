import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Header from './components/Header/Header';
import Ambience from './components/Ambience/Ambience';
import ScrollProgress from './components/ScrollProgress/ScrollProgress';
import BuildHud from './components/BuildHud/BuildHud';
import Home from './pages/home/Home';
import About from './pages/about/About';
import Project from './pages/project/Project';
import NotFound from './pages/notfound/NotFound';
import './App.css';

function ScrollToTop() {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    if (hash) {
      const node = document.querySelector(hash);
      if (node) {
        node.scrollIntoView({ behavior: 'smooth' });
        return;
      }
    }
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, [pathname, hash]);

  return null;
}

function App() {
  return (
    <Router>
      <ScrollToTop />
      <a className="skip-link" href="#content">
        Ir direto ao conteúdo
      </a>
      <Ambience />
      <ScrollProgress />
      <Header />
      <main id="content">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/projects/:slug" element={<Project />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
      {/* Depois de <main>: os efeitos de irmãos rodam em ordem de árvore, e
          ele precisa das seções já montadas para lê-las. */}
      <BuildHud />
    </Router>
  );
}

export default App;
