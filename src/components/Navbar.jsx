import React, { useState } from "react";
import "./Navbar.css";
import { FiShoppingCart } from "react-icons/fi";
import { FiMenu, FiX } from "react-icons/fi"; // íconos hamburguesa

export default function Navbar() {
  const [active, setActive] = useState("inicio");
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => setIsOpen(!isOpen);

  const selectOption = (option) => {
    setActive(option);
    setIsOpen(false); // cerrar menú al seleccionar
  };

  return (
    <nav className="navbar">
      {/* Logo + nombre */}
      <div className="navbar-left">
        <img src="../src/assets/logo.png" alt="Logo" className="navbar-logo" />
        <div className="navbar-title">
          <span className="title-main">Pétalos</span>
          <span className="title-sub">Parfum</span>
        </div>
      </div>

      {/* Menú normal (PC) */}
      <div className="navbar-center">
        <ul className="navbar-menu">

          <li>
            <a
              href="./pages/Inicio.jsx"
              className={active === "inicio" ? "active" : ""}
              onClick={() => selectOption("inicio")}
            >
              Inicio
            </a>
          </li>

          <li>
            <a
              href="#catalogo"
              className={active === "catalogo" ? "active" : ""}
              onClick={() => selectOption("catalogo")}
            >
              Catálogo
            </a>
          </li>

          <li>
            <a
              href="#nosotros"
              className={active === "nosotros" ? "active" : ""}
              onClick={() => selectOption("nosotros")}
            >
              Nosotros
            </a>
          </li>

          <li>
            <a
              href="#contacto"
              className={active === "contacto" ? "active" : ""}
              onClick={() => selectOption("contacto")}
            >
              Contacto
            </a>
          </li>

        </ul>
      </div>

      {/* Derecha: carrito + menú hamburguesa */}
      <div className="navbar-right">
        <FiShoppingCart className="cart-icon" />
        <button className="hamburger-btn" onClick={toggleMenu}>
          {isOpen ? <FiX /> : <FiMenu />}
        </button>
      </div>

      {/* Menú móvil */}
      <div className={`mobile-menu ${isOpen ? "open" : ""}`}>
        <a onClick={() => selectOption("inicio")} href="#inicio">Inicio</a>
        <a onClick={() => selectOption("catalogo")} href="#catalogo">Catálogo</a>
        <a onClick={() => selectOption("nosotros")} href="#nosotros">Nosotros</a>
        <a onClick={() => selectOption("contacto")} href="#contacto">Contacto</a>
      </div>
    </nav>
  );
}
