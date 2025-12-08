import React from "react";
import "./Valores.css";

import { GiCutDiamond } from "react-icons/gi";
import { FaHandHoldingHeart, FaMedal } from "react-icons/fa";

// Importa tus imágenes
import img1 from "../assets/valor1.jpg";
import img2 from "../assets/valor2.jpg";
import img3 from "../assets/valor3.jpg";

export default function Valores() {
  return (
    <section className="valores-section">
      <h1 className="valores-title">Nuestros Valores</h1>

      <div className="valores-cards">
        <div className="valor-card">
          <div className="valor-icon">
            <GiCutDiamond />
          </div>
          <h3>Autenticidad</h3>
          <p>Trabajamos solo con proveedores certificados de Oriente Medio</p>
        </div>

        <div className="valor-card">
          <div className="valor-icon">
            <FaHandHoldingHeart />
          </div>
          <h3>Pasión</h3>
          <p>Cada fragancia es seleccionada con dedicación y amor por el arte</p>
        </div>

        <div className="valor-card">
          <div className="valor-icon">
            <FaMedal />
          </div>
          <h3>Calidad</h3>
          <p>Garantizamos la máxima calidad en cada uno de nuestros productos</p>
        </div>
      </div>

      <div className="valores-gallery">
        <img src={img1} alt="Valor 1" />
        <img src={img2} alt="Valor 2" />
        <img src={img3} alt="Valor 3" />
      </div>
    </section>
  );
}
