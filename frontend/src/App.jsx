import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import AudioPlayground from "./pages/AudioPlayground";
import Projects from "./pages/Projects";
import About from "./pages/About";
import Contact from "./pages/Contact";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/audioplayground" element={<AudioPlayground />} />
        <Route path="/projects" element={<Projects />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
      </Routes>
    </BrowserRouter>
  );
}