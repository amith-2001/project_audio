import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import AudioPlayground from "./pages/AudioPlayground";
import Projects from "./pages/Projects";
import About from "./pages/About";
import Contact from "./pages/Contact";
import WaveRoom from "./pages/WaveRoom";
import ChatBot from "./components/ChatBot";
import FrequencyCave from "./pages/FrequencyCave";
import FeatureForge from "./pages/FeatureForge";
import TimeChamber from "./pages/TimeChamber";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/audioplayground" element={<AudioPlayground />} />
        <Route path="/projects" element={<Projects />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />

        {/* Audio Playground Routes */}
        <Route path="/audioplayground" element={<AudioPlayground />} />
        <Route path="/audioplayground/waveroom" element={<WaveRoom />} />

        <Route path="/audioplayground/frequencycave" element={<FrequencyCave />} />
        <Route path="/audioplayground/featureforge" element={<FeatureForge />} />
        <Route path="/audioplayground/timechamber" element={<TimeChamber />} />



      </Routes>
    </BrowserRouter>
  );
}