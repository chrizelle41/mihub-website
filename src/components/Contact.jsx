import { useState } from "react";
import emailjs from "emailjs-com";
import { motion } from "framer-motion";

export default function Contact() {
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    message: "",
  });

  const [status, setStatus] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const sendEmail = (e) => {
    e.preventDefault();
    setStatus("sending");

    const templateParams = {
      from_name: `${form.firstName} ${form.lastName}`,
      reply_to: form.email,
      message: form.message,
    };

    emailjs
      .send(
        "YOUR_SERVICE_ID",
        "YOUR_TEMPLATE_ID",
        templateParams,
        "YOUR_PUBLIC_KEY"
      )
      .then(
        () => {
          setStatus("success");
          setForm({ firstName: "", lastName: "", email: "", message: "" });
        },
        () => setStatus("error")
      );
  };

  return (
    <div className="min-h-screen bg-white pt-32 pb-20 text-gray-700">
      <div className="max-w-6xl mx-auto px-6 grid md:grid-cols-2 gap-16">

        {/* LEFT SIDE */}
        <div className="space-y-6">
          <h1 className="text-4xl md:text-5xl font-extrabold text-[#2385BE]">
            Have a question?
          </h1>
          <p className="text-lg text-gray-600">
            Get in touch and we’ll reply within 24 hours.
          </p>

          <div className="mt-10 space-y-2">
            <h2 className="font-semibold text-[#2385BE]">Email</h2>
            <p className="text-gray-700">info@mihub.ai</p>

            <h2 className="font-semibold text-[#2385BE] mt-6">Address</h2>
            <p className="text-gray-700 leading-relaxed">
              Seebeck House, 1 Seebeck Place <br />
              Davy Avenue, Knowlhill <br />
              Milton Keynes <br />
              MK5 8FR
            </p>
          </div>
        </div>

        {/* RIGHT SIDE FORM */}
        <motion.form
          onSubmit={sendEmail}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="bg-white p-8 rounded-2xl shadow-xl border border-gray-100"
        >
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-sm font-medium">First Name *</label>
              <input
                type="text"
                name="firstName"
                value={form.firstName}
                onChange={handleChange}
                required
                className="mt-1 w-full p-3 border rounded-lg focus:ring-2 ring-[#2385BE] outline-none"
              />
            </div>

            <div>
              <label className="text-sm font-medium">Last Name *</label>
              <input
                type="text"
                name="lastName"
                value={form.lastName}
                onChange={handleChange}
                required
                className="mt-1 w-full p-3 border rounded-lg focus:ring-2 ring-[#2385BE] outline-none"
              />
            </div>
          </div>

          <div className="mt-4">
            <label className="text-sm font-medium">Email *</label>
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              required
              className="mt-1 w-full p-3 border rounded-lg focus:ring-2 ring-[#2385BE] outline-none"
            />
          </div>

          <div className="mt-4">
            <label className="text-sm font-medium">Message *</label>
            <textarea
              name="message"
              value={form.message}
              onChange={handleChange}
              required
              rows="5"
              className="mt-1 w-full p-3 border rounded-lg focus:ring-2 ring-[#2385BE] outline-none"
            />
          </div>

          <motion.button
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            type="submit"
            className="mt-6 w-full bg-[#2385BE] text-white py-3 rounded-full font-semibold shadow-md hover:bg-[#1b6f9f] transition"
          >
            Submit
          </motion.button>

          {/* STATUS MESSAGE */}
          {status === "sending" && (
            <p className="text-blue-600 mt-3 text-center">Sending…</p>
          )}
          {status === "success" && (
            <p className="text-green-600 mt-3 text-center">
              Message sent successfully!
            </p>
          )}
          {status === "error" && (
            <p className="text-red-600 mt-3 text-center">
              Something went wrong. Try again.
            </p>
          )}
        </motion.form>
      </div>
    </div>
  );
}
