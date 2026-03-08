import { motion } from "framer-motion";

export default function Privacy() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#e9f6ff] to-white px-6 pt-32 pb-24 text-gray-800">

      {/* HEADER */}
      <motion.h1
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        className="text-4xl md:text-5xl font-extrabold text-[#2385BE] mb-6 text-center"
      >
        Privacy Policy
      </motion.h1>

      {/* Underline */}
      <motion.div
        initial={{ width: 0, opacity: 0 }}
        animate={{ width: "180px", opacity: 1 }}
        transition={{ duration: 0.7 }}
        className="h-[4px] bg-[#2385BE] mx-auto rounded-full mb-12"
      />

      <div className="max-w-4xl mx-auto leading-relaxed space-y-8 text-[17px]">

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
        >
          We are committed to protecting your privacy. We will only use the information that we collect about you lawfully, in accordance with the <strong>GDPR</strong> and the <strong>Data Protection Act 2018</strong>. We collect information about you to provide you with the best possible service.
        </motion.p>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          We will <strong>not</strong> give your information to any third party or outside company at any point.
        </motion.p>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.15 }}
        >
          We may use your information for research purposes, unless you email us requesting that your information not be used.
        </motion.p>

        {/* WHAT WE COLLECT */}
        <div>
          <h2 className="text-2xl font-bold text-[#2385BE] mt-10">Information We Collect</h2>

          <ul className="list-disc ml-6 space-y-3 mt-4">
            <li>Your name</li>
            <li>Company name</li>
            <li>Email address</li>
            <li>Telephone number</li>
          </ul>
        </div>

        {/* SECURITY SECTION */}
        <div>
          <h2 className="text-2xl font-bold text-[#2385BE] mt-10">Data Accuracy & Security</h2>

          <p className="mt-4">
            We will never collect sensitive information about you without your explicit consent. The information we hold will be accurate and up to date. You can request a copy of the information we hold by contacting us, and we will correct or delete inaccuracies promptly.
          </p>

          <p className="mt-4">
            Personal information is stored securely in accordance with our internal security policies and applicable law.
          </p>
        </div>

        {/* INTERNATIONAL TRANSFER */}
        <div>
          <h2 className="text-2xl font-bold text-[#2385BE] mt-10">Transfers Outside the EEA</h2>

          <p className="mt-4">
            If we intend to transfer your information outside the EEA (European Economic Area), we will always obtain your consent first.
          </p>
        </div>

        {/* COOKIES SECTION */}
        <div>
          <h2 className="text-2xl font-bold text-[#2385BE] mt-10">Cookies & Tracking</h2>

          <p className="mt-4">
            We may use technology to track visitor behaviour on our site. This can include the use of cookies stored in your browser. You may modify your browser settings to prevent this.
          </p>

          <p className="mt-4">
            Information collected via cookies may be used to identify you unless you change your browser settings.
          </p>
        </div>

        {/* CONTACT SECTION */}
        <div>
          <h2 className="text-2xl font-bold text-[#2385BE] mt-10">Questions or Concerns?</h2>

          <p className="mt-4">
            If you have any questions or comments regarding this policy, please contact us at:
          </p>

          <div className="bg-white p-6 rounded-xl shadow-md border border-gray-100 text-[16px] mt-4 space-y-1">
            <p>MiHub c/o Virtual Viewing Limited</p>
            <p>Seebeck House, 1 Seebeck Place</p>
            <p>Knowlhill, Milton Keynes</p>
            <p>Buckinghamshire, United Kingdom</p>
            <p className="font-medium">MK5 8FR</p>
            <p className="mt-2 font-semibold">info@mihub.ai</p>
          </div>
        </div>

        {/* LINK TO TERMS */}
        <p className="mt-12 text-[#2385BE] font-semibold">
          View our <a href="/terms" className="underline hover:text-[#1b6f9f]">Terms and Conditions</a>.
        </p>

      </div>
    </div>
  );
}
