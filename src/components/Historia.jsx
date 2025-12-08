import React from "react";
import "./Historia.css";
import historiaImg from "../assets/image.png"; // 👈 aquí la importas

export default function Historia() {
  return (
    <section className="historia-section">
      <div className="historia-header">
        <h1>Nuestra Historia</h1>
        <div className="header-line"></div>
      </div>

      <div className="historia-content">
        <div className="historia-img">
          <img src={historiaImg} alt="Historia" /> {/* 👈 aquí la usas */}
        </div>

        <div className="historia-text">
          <h2>Una pasión por las fragancias orientales</h2>

          <p>
            Pétalos Parfum nació del amor por las fragancias auténticas de
            Oriente Medio. Nuestra misión es traer a tu hogar la esencia pura de
            los perfumes árabes, conocidos mundialmente por su intensidad,
            calidad y duración excepcional.
          </p>

          <p>
            Cada perfume en nuestra colección ha sido cuidadosamente
            seleccionado, garantizando su autenticidad y origen. Trabajamos
            directamente con maestros perfumistas que preservan las tradiciones
            milenarias de la creación de fragancias.
          </p>

          <p>
            Ubicados en Cr 9 # 10 46, Palermo, te invitamos a descubrir un mundo
            de aromas exquisitos. Creemos que un perfume es más que una
            fragancia: es una experiencia, un recuerdo, una historia que merece
            ser contada.
          </p>
        </div>
      </div>
    </section>
  );
}
