import React from 'react';
import Link from 'next/link';

const Navbar = () => {
  return (
    <nav className="navbar navbar-expand-lg navbar-custom position-relative">
      <div className="container-fluid px-0">
        {/* LINKS A LA IZQUIERDA */}
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav me-auto ps-3">
            {['Inicio', 'Makeup', 'Perfumes', 'Wishlist', 'Looks'].map((tab) => {
              const path = tab === 'Inicio' ? '/' : `/${tab.toLowerCase()}`;
              return (
                <li className="nav-item" key={tab}>
                  <Link href={path} legacyBehavior>
                    <a className="nav-link">{tab}</a>
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>

        {/* TÍTULO CENTRADO */}
        <div className="position-absolute start-50 translate-middle-x">
          <Link href="/" legacyBehavior>
            <a className="navbar-brand m-0 fw-bold">Look Tracker</a>
          </Link>
        </div>

        {/* BOTÓN HAMBURGUESA PARA MÓVIL */}
        <button
          className="navbar-toggler ms-auto me-3"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon" />
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
