import { useLayoutEffect } from "react";
import { Routes, Route, useLocation } from "react-router-dom";

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

import Home from "./pages/Home";
import Contact from "./pages/Contact";
import Construction from "./pages/Construction";
import Residential from "./pages/Residential";
import PropertyManagement from "./pages/PropertyManagement";
import DataRoom from "./pages/DataRoom";
import WhyMihub from "./pages/WhyMiHub";
import Terms from "./pages/Terms";
import Privacy from "./pages/Privacy";

function App() {
  const location = useLocation();

  useLayoutEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "auto" });
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/construction" element={<Construction />} />
          <Route path="/residential" element={<Residential />} />
          <Route path="/property-management" element={<PropertyManagement />} />
          <Route path="/dataroom" element={<DataRoom />} />
          <Route path="/why-mihub" element={<WhyMihub />} />
          <Route path="/terms" element={<Terms />} />
          <Route path="/privacy" element={<Privacy />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}

export default App;
