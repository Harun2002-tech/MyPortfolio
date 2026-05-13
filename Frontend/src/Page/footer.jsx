import React from "react";
import { ArrowUp } from "lucide-react"; // React icon ለመጠቀም

const Footer = () => {
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <footer className="footer">
      <div className="footer-text">
        <p>
          Copyright &copy; 2026 by <span>Harun Ahmed</span> | All Rights
          Reserved.
        </p>
      </div>

      <div className="footer-iconTop">
        {/* በ React በቀጥታ ወደ ላይ እንዲሄድ onClick መጠቀም ትችላለህ */}
        <button onClick={scrollToTop} className="scroll-btn">
          <ArrowUp size={24} color="#0f0f0f" strokeWidth={3} />
        </button>
      </div>
    </footer>
  );
};

export default Footer;
