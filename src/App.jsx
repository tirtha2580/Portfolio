import React, { useState } from "react";
import Navbar from "./components/Navbar";
import About from "./components/About";
import Projects from "./components/Projects";
import Experience from "./components/Experience";
import Skills from "./components/Skills";
import Education from "./components/Education";
import Contact from "./components/Contact";
import Hero from './components/Hero';
import Preloader from './components/Preloader'; // <-- NEW

function App() {
  const [loading, setLoading] = useState(true);

  return (
    <>
      {loading && <Preloader onFinish={() => setLoading(false)} />}
      {!loading && (
        <>
          <Navbar />
          <Hero />
          <About />
          <Skills />
          <Experience />
          <Projects />
          <Education />
          <Contact />
        </>
      )}
    </>
  );
}

export default App;
