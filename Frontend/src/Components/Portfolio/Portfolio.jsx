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

const projectData = [
  {
    title: "Automotive Service Management",
    description:
      "A comprehensive Full-Stack solution featuring a robust administrative dashboard to automate workflow and inventory for modern repair shops.",
    image: Img1,
    liveLink: "#",
    video: "https://youtu.be/tiSi6g-QcR4",
  },
  {
    title: "Masjid Management System",
    description:
      "A secure, user-friendly MERN stack platform for mosque administration, featuring automated donation tracking, event scheduling, and real-time community engagement tools.",
    image: Img7, // Img7 ከላይ import መደረጉን እርግጠኛ ሁን
    liveLink: "https://ruhamaislamiccenter.vercel.app/",
    video: null, // ቪዲዮ ካለህ ሊንኩን እዚህ ማስገባት ትችላለህ
  },
  {
    title: "E-Commerce Ecosystem (Amazon Clone)",
    description:
      "A high-performance shopping platform integrated with secure payment processing, real-time cart functionality, and user authentication.",
    image: Img2,
    liveLink: "#",
    video: "https://youtu.be/1D9Zxxs0Av0",
  },
  {
    title: "Cinematic Streaming Platform (Netflix Clone)",
    description:
      "A dynamic media application leveraging TMDB API to deliver high-quality content previews with a fully responsive and interactive UI.",
    image: Img3,
    liveLink: "#",
    video: "https://youtu.be/DZK6cfgz8f0",
  },
  {
    title: "Educational Community Hub (Evangadi Q&A)",
    description:
      "A collaborative technical forum designed for developers to share knowledge, featuring secure login and complex database relationships.",
    image: Img4,
    liveLink: "#",
    video: "https://youtu.be/icI2i_YeTqI",
  },
  {
    title: "Premium Tech Retail UI (Apple Clone)",
    description:
      "A pixel-perfect, design-focused storefront replica emphasizing smooth animations and high-fidelity aesthetic consistency.",
    image: Img5,
    liveLink: "#",
    video: "https://youtu.be/04N4NuHrpG0",
  },
  {
    title: "Professional Developer Portfolio",
    description:
      "A modern, optimized showcase of engineering expertise and creative design, built with performance and clean code in mind.",
    image: Img6,
    liveLink: "#",
    video: null,
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
