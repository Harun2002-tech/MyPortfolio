import React from "react";
import AboutImage from "../Components/image/about.jpg";
function About() {
  return (
    <section className="about" id="about">
      <div className="about-img">
        {/* Added loading="lazy" for better performance */}
        <img
          src={AboutImage}
          alt="Kedir Ahmed - Full Stack Developer"
          loading="lazy"
        />
      </div>

      <div className="about-content">
        <h2 className="heading">
          About <span>Me</span>
        </h2>
        <h3>Full-Stack Developer</h3>
        <p>
          I’m a passionate Frontend and Backend Developer with a knack for
          crafting seamless, user-friendly web experiences. I specialize in
          building robust applications that combine clean code with intuitive
          design to solve real-world problems.
        </p>

        {/* Updated link behavior */}
        <a href="#more-info" className="btn">
          Read More
        </a>
      </div>
    </section>
  );
}

export default About;
