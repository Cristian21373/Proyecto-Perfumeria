import React from "react";
import "./HeroSection.css";

export default function HeroSection() {
  return (
    <section className="hero">
      <div className="hero-content">
        <h1 className="hero-spam">EXCLUSIVO Y ORIGINAL</h1>
        <h1 className="hero-title">Pétalos Parfum</h1>
        <p className="hero-subtitle">Descubre la esencia de Oriente con fragancias auténticas que cuentan historias milenarias</p>

        <button className="hero-btn" onClick={() => window.location.href = "/catalogo"}>
          Ver Catálogo
        </button>
      </div>
    </section>
  );
}
