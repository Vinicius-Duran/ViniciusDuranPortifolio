import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Header from './components/Header/Header';
import Background from './components/Background/Background';
import MouseFollower from './components/MouseFollower/MouseFollower';
import ScrollProgress from './components/ScrollProgress/ScrollProgress';
import Home from './pages/home/Home';
import About from './pages/about/About';
import Project from './pages/project/Project';
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
      <div className="App">
        <Background />
        <ScrollProgress />
        <MouseFollower />
        <div className="page-shell">
          <Header />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/projects/:slug" element={<Project />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
