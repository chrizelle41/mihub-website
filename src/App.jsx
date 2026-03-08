import { Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

import Home from "./pages/Home";
import Contact from "./pages/Contact";
import Construction from "./pages/Construction";
import Residential from "./pages/Residential";
import PropertyManagement from "./pages/PropertyManagement";
import DataRoom from "./pages/DataRoom";
import WhyMihub from "./pages/WhyMihub";

function App() {
  return (
    <>
      <Navbar />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/Shared/Internal/MiHub" element={<Home />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/construction" element={<Construction />} />
        <Route path="/residential" element={<Residential />} />
        <Route path="/property-management" element={<PropertyManagement />} />
        <Route path="/dataroom" element={<DataRoom />} />
        <Route path="/why-mihub" element={<WhyMihub />} />
      </Routes>

      <Footer />
    </>
  );
}

export default App;
