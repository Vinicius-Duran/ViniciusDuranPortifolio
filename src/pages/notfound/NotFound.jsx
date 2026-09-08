import React from 'react';
import { Link } from 'react-router-dom';
import './NotFound.css';

const NotFound = () => (
  <section className="notfound">
    <div className="shell">
      <p className="notfound-code">404</p>
      <h1 className="notfound-title display">
        Esta página não <em>existe</em>.
      </h1>
      <p className="lede">
        O endereço pode ter mudado, ou o link que trouxe você até aqui está
        desatualizado. As duas saídas abaixo levam a algum lugar real.
      </p>
      <div className="notfound-actions">
        <Link to="/" className="btn btn-solid">
          Voltar ao início
        </Link>
        <Link to="/#projects" className="btn btn-line">
          Ver o trabalho
        </Link>
      </div>
    </div>
  </section>
);

export default NotFound;
