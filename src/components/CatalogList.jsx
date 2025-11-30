import React from "react";
import "../components/CatalogList.css";
import { ShoppingCart, Info } from "lucide-react";
import imageDefault from "../assets/image.png"; 

export default function CatalogoList() {
  const productos = [
    {
      id: 1,
      nombre: "Oud Royale",
      descripcion:
        "Fragancia intensa con notas de oud y ámbar. Una experiencia única y duradera.",
      precio: 200000,
      imagen: imageDefault,  
    },
    {
      id: 2,
      nombre: "Musk Al Haramain",
      descripcion:
        "Almizcle suave con toques florales. Perfecto para el día a día.",
      precio: 200000,
      imagen: imageDefault,
    },
    {
      id: 3,
      nombre: "Amber Gold",
      descripcion:
        "Ámbar puro con esencias doradas. Elegancia oriental en estado puro.",
      precio: 200000,
      imagen: imageDefault,
    },
    {
      id: 4,
      nombre: "Rose de Taif",
      descripcion:
        "Rosa de Taif auténtica. Delicada y sofisticada fragancia floral.",
      precio: 200000,
      imagen: imageDefault,
    },
    {
      id: 5,
      nombre: "Rose de Taif",
      descripcion:
        "Rosa de Taif auténtica. Delicada y sofisticada fragancia floral.",
      precio: 200000,
      imagen: imageDefault,
    },
  ];


  return (
    <section className="catalog-section">
      <div className="catalog-header">
        <h1>Nuestro Catálogo</h1>
        <p>Explora nuestra colección exclusiva de perfumes árabes auténticos</p>
        <div className="header-line"></div>
      </div>

      <div className="catalog-grid">
        {productos.map((p) => (
          <div key={p.id} className="catalog-card">
            <img src={p.imagen} alt={p.nombre} className="product-img" />

            <div className="card-content">
              <h3>{p.nombre}</h3>
              <p className="description">{p.descripcion}</p>

              <p className="price">${p.precio.toLocaleString()}</p>

              <button className="btn-add">
                <ShoppingCart size={18} />
                Agregar
              </button>

              <button className="btn-desc">
                <Info size={18} />
                Descripción
              </button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
