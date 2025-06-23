import React from "react";
import Navbar from "./components/Navbar";
import About from "./components/About";
import Projects from "./components/Projects";
import Experience from "./components/Experience";
import Skills from "./components/Skills";
import Education from "./components/Education";
import Contact from "./components/Contact";
import ThreeCanvas from "./components/ThreeCanvas";
import Hero from './components/Hero';

function App() {
  return (
    <>
      <Navbar />
      <Hero />
      <About />
      <Skills />
      <Experience/>
      <Projects />
      <Education />
      <Contact />
       
    </>
  );
}

export default App;
