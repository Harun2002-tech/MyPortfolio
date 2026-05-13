import React, { useState } from "react";
import { HiMenu } from "react-icons/hi";
import { IoClose } from "react-icons/io5"; // ሜኑው ሲከፈት እንዲታይ (አማራጭ)

function Header() {
  const [isActive, setIsActive] = useState(false);

  const toggleMenu = () => {
    setIsActive(!isActive);
  };

  return (
    <header className="header">
      <a href="#Home" className="logo">
        Portfolio
      </a>

      {/* የአይኮን ለውጥ፡ ሲከፈት 'X' ምልክት እንዲሆን */}
      <div className="menu-icon" id="menu-icon" onClick={toggleMenu}>
        {isActive ? (
          <IoClose size={35} color="white" />
        ) : (
          <HiMenu size={35} color="white" />
        )}
      </div>

      <nav className={`navbar ${isActive ? "active" : ""}`}>
        {/* href="#..." መሆናቸውን እና ID ስሞቹ ከኮምፖነንቶቹ ጋር መመሳሰላቸውን እርግጠኛ ሁን */}
        <a href="#Home" className="active" onClick={() => setIsActive(false)}>
          Home
        </a>
        <a href="#about" onClick={() => setIsActive(false)}>
          About
        </a>
        <a href="#services" onClick={() => setIsActive(false)}>
          Services
        </a>
        <a href="#portfolio" onClick={() => setIsActive(false)}>
          Portfolio
        </a>
        <a href="#contact" onClick={() => setIsActive(false)}>
          Contact
        </a>
      </nav>
    </header>
  );
}

export default Header;
