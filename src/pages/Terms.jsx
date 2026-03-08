import { motion } from "framer-motion";

export default function Terms() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#e9f6ff] to-white px-6 pt-32 pb-24 text-gray-800">
      
      {/* PAGE TITLE */}
      <motion.h1
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        className="text-4xl md:text-5xl font-extrabold text-[#2385BE] mb-6 text-center"
      >
        Terms and Conditions
      </motion.h1>

      {/* UNDERLINE */}
      <motion.div
        initial={{ width: 0, opacity: 0 }}
        animate={{ width: "160px", opacity: 1 }}
        transition={{ duration: 0.7 }}
        className="h-[4px] bg-[#2385BE] mx-auto rounded-full mb-14"
      />

      <div className="max-w-4xl mx-auto leading-relaxed space-y-8 text-[17px]">

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
        >
          Welcome to our website. If you continue to browse and use this website, you are agreeing to comply with and be bound by the following terms and conditions of use, which together with our privacy policy govern MiHub's relationship with you in relation to this website. If you disagree with any part of these terms and conditions, please do not use our website.
        </motion.p>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          The term <strong>“MiHub”</strong> or <strong>“us”</strong> or <strong>“we”</strong> refers to the owner of the website whose registered office is:
        </motion.p>

        {/* ADDRESS CARD */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.15 }}
          className="bg-white p-6 rounded-xl shadow-md border border-gray-100 text-[16px]"
        >
          <p>MiHub c/o Virtual Viewing Limited</p>
          <p>Seebeck House, 1 Seebeck Place</p>
          <p>Knowlhill, Milton Keynes</p>
          <p>Buckinghamshire, United Kingdom</p>
          <p className="font-medium mt-1">MK5 8FR</p>
          <p className="mt-2">Company Registration Number: <strong>5033662</strong> (England & Wales)</p>
        </motion.div>

        <p>The term <strong>“you”</strong> refers to the user or viewer of our website.</p>


        {/* SECTION TITLE */}
        <h2 className="text-2xl font-bold text-[#2385BE] mt-10">Website Usage Terms</h2>

        <ul className="list-disc ml-6 space-y-3">
          <li>
            The content of the pages of this website is for your general information and use only. It is subject to change without notice.
          </li>
          <li>
            This website uses cookies to monitor browsing preferences. If you allow cookies to be used, no personal information is stored.
          </li>
          <li>
            Neither we nor any third parties provide any guarantee as to the accuracy, timeliness, performance, completeness, or suitability of the information and materials found on this website.
          </li>
          <li>
            Your use of any information or materials on this website is entirely at your own risk. It is your responsibility to ensure that any products, services, or information meets your specific requirements.
          </li>
          <li>
            This website contains material owned or licensed to us, including design, layout, appearance, and graphics. Reproduction is prohibited other than in accordance with copyright law.
          </li>
          <li>
            All trademarks reproduced on this website that are not the property of, or licensed to, MiHub are acknowledged on the website.
          </li>
          <li>
            Unauthorised use of this website may give rise to a claim for damages and/or be a criminal offence.
          </li>
          <li>
            At times, this website may include links to external sites. These links are provided for convenience and do not signify endorsement. We are not responsible for third-party content.
          </li>
          <li>
            Your use of this website and any dispute arising out of such use is subject to the laws of England, Northern Ireland, Scotland, and Wales.
          </li>
        </ul>


        {/* CONTACT SECTION */}
        <h2 className="text-2xl font-bold text-[#2385BE] mt-14">Contact Us</h2>

        <p>
          If you need to resolve a complaint regarding this website or require more information, please contact us at:
        </p>

        <div className="bg-white p-6 rounded-xl shadow-md border border-gray-100 text-[16px] space-y-1">
          <p>MiHub c/o Virtual Viewing Limited</p>
          <p>Seebeck House, 1 Seebeck Place</p>
          <p>Knowlhill, Milton Keynes</p>
          <p>Buckinghamshire, United Kingdom</p>
          <p className="font-medium">MK5 8FR</p>
          <p className="mt-2 font-semibold">info@mihub.ai</p>
        </div>

        <p className="mt-8 text-gray-500 text-sm">
          <strong>Last updated:</strong> 15/01/2025
        </p>
      </div>
    </div>
  );
}
