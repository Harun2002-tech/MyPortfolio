import React from "react";
import "./index.css";
import Header from "./Page/header.jsx";
import Home from "./Page/home.jsx";
import About from "./Page/About.jsx";
import Services from "./Page/services.jsx";
import Portfolio from "./Components/Portfolio/Portfolio.jsx";
import Contact from "./Page/contact.jsx";
import Footer from "./Page/footer.jsx";

function App() {
  return (
    <div className="app-container">
      {" "}
      {/* ለጠቅላላው ሳይት መጠቅለያ (Wrapper) ቢኖረው ይመረጣል */}
      <Header />
      <main>
        {" "}
        {/* ለ SEO እና ለተደራሽነት ዋናውን ይዘት በ <main> ውስጥ መክተት ጥሩ ነው */}
        <Home />
        <About />
        <Services />
        <Portfolio />
        <Contact />
        <Footer />
      </main>
      {/* <Footer /> ካለህ እዚህ ጋር ጨምረው */}
    </div>
  );
}

export default App;
