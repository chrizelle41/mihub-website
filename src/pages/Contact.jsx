import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { Mail, MapPin } from "lucide-react";

export default function Contact() {
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    subject: "",
    message: "",
  });

  const mapRef = useRef(null);

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  /* ----------------------------------------------------------
     DARK MODE MAP STYLE JSON
  ---------------------------------------------------------- */
  const darkMapStyle = [
    { elementType: "geometry", stylers: [{ color: "#1d1d1d" }] },
    { elementType: "labels.text.stroke", stylers: [{ color: "#1a1a1a" }] },
    { elementType: "labels.text.fill", stylers: [{ color: "#e0e0e0" }] },
    {
      featureType: "administrative",
      elementType: "geometry",
      stylers: [{ color: "#3a3a3a" }],
    },
    {
      featureType: "poi",
      elementType: "geometry",
      stylers: [{ color: "#2a2a2a" }],
    },
    {
      featureType: "poi",
      elementType: "labels.text.fill",
      stylers: [{ color: "#cfcfcf" }],
    },
    {
      featureType: "poi.park",
      elementType: "geometry",
      stylers: [{ color: "#263238" }],
    },
    {
      featureType: "road",
      elementType: "geometry",
      stylers: [{ color: "#2c2c2c" }],
    },
    {
      featureType: "road",
      elementType: "labels.text.fill",
      stylers: [{ color: "#8a8a8a" }],
    },
    {
      featureType: "road.highway",
      elementType: "geometry",
      stylers: [{ color: "#3c3c3c" }],
    },
    {
      featureType: "water",
      elementType: "geometry",
      stylers: [{ color: "#11191f" }],
    },
  ];

  /* ----------------------------------------------------------
     LOAD GOOGLE MAPS
  ---------------------------------------------------------- */
  useEffect(() => {
    async function loadMap() {
      try {
        const apiKey = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;

        await new Promise((resolve, reject) => {
          const script = document.createElement("script");
          script.src = `https://maps.googleapis.com/maps/api/js?key=${apiKey}&libraries=maps,marker`;
          script.async = true;
          script.defer = true;
          script.onload = resolve;
          script.onerror = reject;
          document.body.appendChild(script);
        });

        const { Map } = await google.maps.importLibrary("maps");

        const location = { lat: 52.0247, lng: -0.778 };

        const map = new Map(mapRef.current, {
          center: location,
          zoom: 14,
          styles: darkMapStyle,
          disableDefaultUI: false,
        });

        /* Custom Neon Blue Marker */
        new google.maps.Marker({
          map,
          position: location,
          icon: {
            path: google.maps.SymbolPath.CIRCLE,
            scale: 10,
            fillColor: "#38BDF8",
            fillOpacity: 1,
            strokeColor: "#60A5FA",
            strokeWeight: 4,
          },
        });
      } catch (err) {
        console.error("Google Maps failed to load:", err);
      }
    }

    loadMap();
  }, []);

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-[#05070A] via-[#0A0F18] to-[#05070A] pt-40 pb-24 flex justify-center relative overflow-hidden text-white">
      {/* Background blobs */}
      <div className="absolute -top-32 -left-32 w-96 h-96 bg-[#2385BE]/20 rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 right-0 w-[420px] h-[420px] bg-[#3EBBFF]/20 rounded-full blur-3xl"></div>

      {/* MAIN GRID */}
      <div className="relative z-10 w-full max-w-7xl px-6 grid md:grid-cols-2 gap-16 items-stretch">
        {/* LEFT SIDE */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className="flex flex-col gap-10"
        >
          {/* CONTACT TEXT */}
          <div className="space-y-8">
            <h1
              className="text-4xl md:text-5xl font-extrabold 
              bg-gradient-to-r from-[#1A8CFF] via-[#38BDF8] to-[#6FD2FF] 
              bg-clip-text text-transparent 
              drop-shadow-[0_0_25px_rgba(56,189,248,0.35)]"
            >
              Let’s Get In Touch
            </h1>

            <p className="text-white/70 text-lg leading-relaxed max-w-md">
              We’re here to answer your questions. Contact us anytime and we’ll
              reply within 24 hours.
            </p>

            {/* EMAIL */}
            <div className="flex items-center gap-4">
              <Mail size={30} className="text-[#38BDF8]" />
              <div>
                <p className="font-semibold text-lg text-white">Email</p>
                <p className="text-white/70">info@mihub.ai</p>
              </div>
            </div>

            {/* ADDRESS */}
            <div className="flex items-center gap-4">
              <MapPin size={30} className="text-[#38BDF8]" />
              <div>
                <p className="font-semibold text-lg text-white">Address</p>
                <p className="text-white/70 leading-relaxed">
                  Seebeck House, 1 Seebeck Place Davy Avenue, Knowlhill <br />
                  Milton Keynes, MK5 8FR
                </p>
              </div>
            </div>
          </div>

          {/* MAP */}
          <div
            ref={mapRef}
            className="
              w-full 
              h-64 
              rounded-2xl 
              border border-white/10 
              shadow-[0_0_25px_rgba(56,189,248,0.15)]
              overflow-hidden
            "
          />
        </motion.div>

        {/* RIGHT SIDE (FORM) */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className="h-full flex"
        >
          <div className="p-[2px] rounded-3xl bg-gradient-to-br from-[#2385BE] to-[#3EBBFF] shadow-xl w-full flex">
            <div className="bg-[#0C1118] rounded-3xl p-10 w-full border border-white/10 backdrop-blur-xl">
              {/* FORM */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <label className="font-medium text-sm text-white/80">
                    First Name
                  </label>
                  <input
                    name="firstName"
                    value={form.firstName}
                    onChange={handleChange}
                    className="mt-1 w-full p-3 bg-[#05070A] text-white border border-white/20 rounded-xl placeholder-white/40 outline-none focus:ring-2 ring-[#38BDF8]"
                    placeholder="Enter first name"
                    required
                  />
                </div>

                <div>
                  <label className="font-medium text-sm text-white/80">
                    Last Name
                  </label>
                  <input
                    name="lastName"
                    value={form.lastName}
                    onChange={handleChange}
                    className="mt-1 w-full p-3 bg-[#05070A] text-white border border-white/20 rounded-xl placeholder-white/40 outline-none focus:ring-2 ring-[#38BDF8]"
                    placeholder="Enter last name"
                    required
                  />
                </div>
              </div>

              {/* SUBJECT */}
              <div className="mt-5">
                <label className="font-medium text-sm text-white/80">
                  Subject
                </label>
                <input
                  type="text"
                  name="subject"
                  value={form.subject}
                  onChange={handleChange}
                  className="mt-1 w-full p-3 bg-[#05070A] text-white border border-white/20 rounded-xl placeholder-white/40 outline-none focus:ring-2 ring-[#38BDF8]"
                  placeholder="Enter your subject"
                  required
                />
              </div>

              {/* EMAIL */}
              <div className="mt-5">
                <label className="font-medium text-sm text-white/80">
                  Email Address
                </label>
                <input
                  type="email"
                  name="email"
                  value={form.email}
                  onChange={handleChange}
                  className="mt-1 w-full p-3 bg-[#05070A] text-white border border-white/20 rounded-xl placeholder-white/40 outline-none focus:ring-2 ring-[#38BDF8]"
                  placeholder="Enter your email"
                  required
                />
              </div>

              {/* MESSAGE */}
              <div className="mt-5">
                <label className="font-medium text-sm text-white/80">
                  Message
                </label>
                <textarea
                  name="message"
                  value={form.message}
                  onChange={handleChange}
                  rows="4"
                  className="mt-1 w-full p-3 bg-[#05070A] text-white border border-white/20 rounded-xl placeholder-white/40 outline-none focus:ring-2 ring-[#38BDF8]"
                  placeholder="Write your message..."
                  required
                />
              </div>

              {/* SUBMIT */}
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.97 }}
                className="mt-8 w-full md:w-auto bg-[#2385BE] text-white px-10 py-3 rounded-full font-semibold shadow-md hover:bg-[#1b6f9f] transition"
              >
                Submit
              </motion.button>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
