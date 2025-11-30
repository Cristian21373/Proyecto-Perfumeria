import React from "react";
import "./Footer.css";

export default function Footer() {
  return (
    <footer className="footer-container">
        <hr className="footer-line-up" />
      <div className="footer-content">

        {/* --- Columna 1 --- */}
        <div className="footer-col">
          <div className="footer-logo-box">
            <div>
              <h3 className="footer-brand">Pétalos</h3>
              <p className="footer-sub">PARFUM</p>
            </div>
          </div>

          <p className="footer-desc">
            Perfumes árabes originales de la más alta calidad. Fragancias que cuentan historias.
          </p>

          <p className="footer-location">
            <span className="footer-icon">📍</span>
            Cr 9 # 10 46, Palermo
          </p>
        </div>

        {/* --- Columna 2 --- */}
        <div className="footer-col">
          <h4 className="footer-title">Enlaces rápidos</h4>
          <ul className="footer-links">
            <li>Inicio</li>
            <li>Catálogo</li>
            <li>Nosotros</li>
            <li>Contacto</li>
          </ul>
        </div>

        {/* --- Columna 3 --- */}
        <div className="footer-col">
          <h4 className="footer-title">Síguenos</h4>

          <div className="footer-social">
            <div className="social-circle">📸</div>
            <div className="social-circle">📘</div>
            <div className="social-circle">💬</div>
          </div>
        </div>
      </div>

      <hr className="footer-line" />

      <p className="footer-copy">
        © 2025 Pétalos Parfum. Todos los derechos reservados.
      </p>
    </footer>
  );
}
