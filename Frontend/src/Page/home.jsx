import React, { useEffect, useRef } from "react";
import { SiTiktok, SiTelegram, SiInstagram, SiYoutube } from "react-icons/si";
import Typed from "typed.js";
import HomePortrait from "../Components/image/Home.jpg";
import CvFile from "../Components/image/kedir_cv.png";

const Home = () => {
  const typedRef = useRef(null);

  useEffect(() => {
    const typed = new Typed(typedRef.current, {
      strings: [
        "Full-stack Developer",
        "Frontend Developer",
        "Backend Developer",
        "Graphic Designer",
        "UI/UX Designer",
      ],
      typeSpeed: 100,
      backSpeed: 50,
      backDelay: 1000,
      loop: true,
    });

    return () => typed.destroy();
  }, []);

  return (
    <section className="Home" id="Home">
      <div className="home-content">
        <h3>Hello, It's Me</h3>
        <h1>Harun Ahmed Mohammed</h1> {/* በህጋዊ ስምህ ተስተካክሏል */}
        <h3>
          And I'm a <span className="multiple-text" ref={typedRef}></span>
        </h3>
        <p>
          Dedicated Full-Stack Developer trained at{" "}
          <strong>Evangadi Tech</strong> and <strong>Udacity</strong>. I
          specialize in building real-world, scalable applications using
          <strong> PHP, JavaScript, MySQL, MongoDB, and Node.js</strong>.
        </p>
        <div className="social-media">
          <a
            href="https://www.tiktok.com/@harunahmed.official"
            style={{ "--i": 7 }}
            aria-label="TikTok"
            target="_blank"
            rel="noopener noreferrer"
          >
            <SiTiktok />
          </a>
          <a
            href="https://t.me/harunteck"
            style={{ "--i": 8 }}
            aria-label="Telegram"
            target="_blank"
            rel="noopener noreferrer"
          >
            <SiTelegram />
          </a>
          <a
            href="https://www.instagram.com/harunahmed.official/"
            style={{ "--i": 9 }}
            aria-label="Instagram"
            target="_blank"
            rel="noopener noreferrer"
          >
            <SiInstagram />
          </a>
          <a
            href="http://www.youtube.com/@Harunteck"
            style={{ "--i": 10 }}
            aria-label="YouTube"
            target="_blank"
            rel="noopener noreferrer"
          >
            <SiYoutube />
          </a>
        </div>
        <div className="cv">
          <a href={CvFile} className="btn" download="Harun_Ahmed_CV.png">
            Download CV
          </a>
        </div>
      </div>

      <div className="home-img">
        <img src={HomePortrait} alt="Harun Ahmed Portrait" />
      </div>
    </section>
  );
};

export default Home;
