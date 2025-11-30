import React from "react";
import { Clock, ShieldCheck, Truck } from "lucide-react";
import "./ServicesSection.css";

export default function ServicesSection() {
  const services = [
    {
      id: 1,
      title: "Fragancias duraderas",
      desc: "Perfumes de larga duración que permanecen todo el día",
      icon: <Clock size={32} />,
    },
    {
      id: 2,
      title: "100% originales",
      desc: "Garantía de autenticidad en cada producto",
      icon: <ShieldCheck size={32} />,
    },
    {
      id: 3,
      title: "Envíos a todo el Huila",
      desc: "Entregas rápidas y seguras a cualquier destino",
      icon: <Truck size={32} />,
    },
  ];

  return (
    <section className="services-container">
      <div className="services-grid">
        {services.map((item) => (
          <div className="service-card" key={item.id}>
            <div className="service-icon">{item.icon}</div>
            <h3 className="service-title">{item.title}</h3>
            <p className="service-desc">{item.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
