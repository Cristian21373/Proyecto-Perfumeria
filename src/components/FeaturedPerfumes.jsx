import React from "react";
import "./FeaturedPerfumes.css";

export default function FeaturedPerfumes() {
  const perfumes = [
    {
      id: 1,
      tag: "Popular",
      title: "Oud Royale",
      desc: "Fragancia intensa con notas de oud y ámbar. Una experiencia única.",
      price: "$200.000",
      img: "https://images.unsplash.com/photo-1610109790326-9a21dfe969b7?w=800",
    },
    {
      id: 2,
      tag: "Popular",
      title: "Musk Al Haramain",
      desc: "Almizcle suave con toques florales. Perfecto para el día a día.",
      price: "$200.000",
      img: "https://images.unsplash.com/photo-1610109790326-9a21dfe969b7?w=800",
    },
    {
      id: 3,
      tag: "Popular",
      title: "Amber Gold",
      desc: "Ámbar puro con esencias doradas. Elegancia oriental en estado puro.",
      price: "$200.000",
      img: "https://images.unsplash.com/photo-1610109790326-9a21dfe969b7?w=800",
    },
  ];

  return (
    <section className="featured-container">
      <h2 className="featured-title">Nuestros Perfumes Destacados</h2>
      <div className="featured-line"></div>

      <div className="featured-grid">
        {perfumes.map((item) => (
          <div className="perfume-card" key={item.id}>
            <span className="tag">{item.tag}</span>

            <img src={item.img} alt={item.title} className="perfume-img" />

            <div className="perfume-info">
              <h3>{item.title}</h3>
              <p>{item.desc}</p>

              <div className="info-bottom">
                <span className="price">{item.price}</span>
                <button className="add-btn">Agregar</button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
