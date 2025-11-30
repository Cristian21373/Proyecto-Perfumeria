import React, { useState } from "react";
import "./Navbar.css";
import { FiShoppingCart, FiMenu, FiX } from "react-icons/fi";
import { Link, useLocation, useNavigate } from "react-router-dom";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const location = useLocation(); 
  const navigate = useNavigate(); 
  const current = location.pathname;

  const toggleMenu = () => setIsOpen(!isOpen);

  const goTo = (route) => {
    navigate(route, { replace: true });
    setIsOpen(false);
  };

  return (
    <nav className="navbar">
      <div className="navbar-left">
        <img src="../src/assets/logo.png" alt="Logo" className="navbar-logo" />
        <div className="navbar-title">
          <span className="title-main">Pétalos</span>
          <span className="title-sub">Parfum</span>
        </div>
      </div>

      <div className="navbar-center">
        <ul className="navbar-menu">

          <li>
            <Link
              to="/"
              className={current === "/" ? "active" : ""}
              onClick={(e) => {
                e.preventDefault(); 
                goTo("/");
              }}
            >
              Inicio
            </Link>
          </li>

          <li>
            <Link
              to="/catalogo"
              className={current === "/catalogo" ? "active" : ""}
              onClick={(e) => {
                e.preventDefault();
                goTo("/catalogo");
              }}
            >
              Catálogo
            </Link>
          </li>

          <li>
            <Link
              to="/nosotros"
              className={current === "/nosotros" ? "active" : ""}
              onClick={(e) => {
                e.preventDefault();
                goTo("/nosotros");
              }}
            >
              Nosotros
            </Link>
          </li>

          <li>
            <Link
              to="/contacto"
              className={current === "/contacto" ? "active" : ""}
              onClick={(e) => {
                e.preventDefault();
                goTo("/contacto");
              }}
            >
              Contacto
            </Link>
          </li>

        </ul>
      </div>

      <div className="navbar-right">
        <FiShoppingCart className="cart-icon" />
        <button className="hamburger-btn" onClick={toggleMenu}>
          {isOpen ? <FiX /> : <FiMenu />}
        </button>
      </div>

      {/* Menú móvil */}
      <div className={`mobile-menu ${isOpen ? "open" : ""}`}>
        <button onClick={() => goTo("/")} className="mobile-link">Inicio</button>
        <button onClick={() => goTo("/catalogo")} className="mobile-link">Catálogo</button>
        <button onClick={() => goTo("/nosotros")} className="mobile-link">Nosotros</button>
        <button onClick={() => goTo("/contacto")} className="mobile-link">Contacto</button>
      </div>
    </nav>
  );
}
