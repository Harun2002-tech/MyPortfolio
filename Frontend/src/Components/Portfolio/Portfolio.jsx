import React from "react";
import { MdOpenInNew, MdPlayCircleOutline } from "react-icons/md";

// Swiper components እና modules ማስገባት
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay } from "swiper/modules";

// Swiper styles ማስገባት
import "swiper/css";
import "swiper/css/pagination";

// Import project images
import Img1 from "../image/1.png";
import Img2 from "../image/2.png";
import Img3 from "../image/3.png";
import Img4 from "../image/4.png";
import Img5 from "../image/5.png";
import Img6 from "../image/6.png";
import Img7 from "../image/7.png";
import Img8 from "../image/8.png";
import Img9 from "../image/9.png";

const projectData = [
  {
    title: "Masjid Management System",
    description:
      "A secure, user-friendly MERN stack platform for mosque administration, featuring automated donation tracking, event scheduling, and real-time community engagement tools.",
    image: Img1, // Img7 ከላይ import መደረጉን እርግጠኛ ሁን
    liveLink: "https://ruhamaislamiccenter.vercel.app/",
  },
  {
    title: "Automotive Service Management",
    description:
      "A comprehensive Full-Stack solution featuring a robust administrative dashboard to automate workflow and inventory for modern repair shops.",
    image: Img2,
    liveLink: "https://autorex-app.vercel.app/",
  },

  {
    title: "Artisan Café Experience (Ours Café)",
    description:
      "A modern, responsive café website showcasing the menu, ambiance, and ordering flow, designed to turn visitors into customers.",
    image: Img3,
    liveLink: "https://ours-cafe.vercel.app",
  },
  {
    title: "Educational Community Hub (Q&A)",
    description:
      "A collaborative technical forum designed for developers to share knowledge, featuring secure login and complex database relationships.",
    image: Img4,
    liveLink: "https://harunqa.vercel.app/",
  },
  {
    title: "Healthcare Management Platform (Bereka Health)",
    description:
      "A clean, patient-focused healthcare web app for presenting services, managing appointments, and giving clients easy access to care information.",
    image: Img5,
    liveLink: "https://bereka-health.vercel.app",
  },

  {
    title: "Consignment Sales System",
    description:
      "A full-featured system for tracking consignment inventory, sales, and payouts, built to give merchants clear, real-time visibility into their business.",
    image: Img6,
    liveLink: "https://consignment-sales-system.vercel.app",
  },
  {
    title: "Tourism & Travel Showcase (Grand Ethiopia)",
    description:
      "An engaging, responsive travel website highlighting Ethiopian destinations and experiences with a polished, visually rich interface.",
    image: Img7,
    liveLink: "https://grandethiopia.vercel.app",
  },

  {
    title: "E-Commerce Ecosystem (Amazon Clone)",
    description:
      "A high-performance shopping platform integrated with secure payment processing, real-time cart functionality, and user authentication.",
    image: Img8,
    liveLink: "https://amazone-clone-eight-nu.vercel.app/",
  },
  {
    title: "Professional Developer Portfolio",
    description:
      "A modern, optimized showcase of engineering expertise and creative design, built with performance and clean code in mind.",
    image: Img9,
    liveLink: "https://harunahmed.vercel.app/",
  },
];

function Portfolio() {
  return (
    <section className="portfolio" id="portfolio">
      <h2 className="heading">
        Featured <span>Projects</span>
      </h2>

      {/* Swiper መጀመርያ */}
      <Swiper
        modules={[Pagination, Autoplay]}
        spaceBetween={30}
        loop={true}
        autoplay={{ delay: 3500, disableOnInteraction: false }}
        pagination={{ clickable: true }}
        breakpoints={{
          320: { slidesPerView: 1 },
          768: { slidesPerView: 2 },
          1024: { slidesPerView: 3 },
        }}
        className="portfolio-container"
      >
        {projectData.map((project, index) => (
          <SwiperSlide key={index}>
            <div className="portfolio-box">
              <img src={project.image} alt={project.title} loading="lazy" />

              <div className="portfolio-layer">
                <h4>{project.title}</h4>
                <p>{project.description}</p>

                <div className="portfolio-links">
                  {project.liveLink && project.liveLink !== "#" && (
                    <a
                      href={project.liveLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`Launch ${project.title} live demo`}
                    >
                      <MdOpenInNew size={28} />
                    </a>
                  )}

                  {project.video && (
                    <a
                      href={project.video}
                      target="_blank"
                      rel="noopener noreferrer"
                      title="Watch technical walkthrough"
                      aria-label={`Watch ${project.title} demo video`}
                    >
                      <MdPlayCircleOutline size={32} />
                    </a>
                  )}
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
}

export default Portfolio;
