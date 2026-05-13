import React from "react";
import {
  FaCode,
  FaPaintBrush,
  FaLayerGroup,
  FaArrowRight,
} from "react-icons/fa";

function Services() {
  const serviceData = [
    {
      id: 1,
      icon: <FaCode />,
      title: "Web Development",
      description:
        "Building modern, fast, and scalable full-stack web applications using the latest technologies.",
    },
    {
      id: 2,
      icon: <FaLayerGroup />,
      title: "Graphic Design",
      description:
        "Creating powerful brand identities, creative visuals, and professional marketing materials.",
    },
    {
      id: 3,
      icon: <FaPaintBrush />,
      title: "UI/UX Design",
      description:
        "Designing clean, user-friendly, and engaging interfaces that improve user experience.",
    },
  ];

  return (
    <section className="services" id="services">
      <div className="services-header">
        <h2 className="heading">
          Our <span>Services</span>
        </h2>
      </div>

      <div className="services-container">
        {serviceData.map((service) => (
          <div className="service-box" key={service.id}>
            <div className="service-icon">{service.icon}</div>

            <h3>{service.title}</h3>

            <p>{service.description}</p>

            <a
              href={`#${service.title.toLowerCase().replace(/\s+/g, "-")}`}
              className="btn"
            >
              Read More <FaArrowRight />
            </a>
          </div>
        ))}
      </div>
    </section>
  );
}

export default Services;
