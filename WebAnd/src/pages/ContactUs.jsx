import React, { useState } from "react";
import { motion } from "framer-motion";
import emailjs from "@emailjs/browser";
import { toast } from "react-toastify";
import { FaCircleNotch } from "react-icons/fa6";

const ContactUs = () => {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const templateParams = {
    from_name: name,
    from_email: email,
    from_phone: phone,
    message,
  };

  // emailjs
  const serviceId = "service_m3faqlq";
  const templateId = "template_k0wxqw9";
  const publicKey = "DBlBJsXgbAJBTchjJ";

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      await emailjs.send(serviceId, templateId, templateParams, publicKey);
      toast.success("Message sent successfully! 🎉");

      setName("");
      setPhone("");
      setEmail("");
      setMessage("");
    } catch (error) {
      console.error("FAILED...", error);
      toast.error("Failed to send message. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full min-h-screen bg-gray-100 text-gray-800">
      <section className="py-16">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold mb-8">Contact Us</h2>
          <p className="text-lg text-gray-600 mb-6">
            Have questions or need assistance? We’re here to help. Reach out to
            us anytime!
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-6 bg-white rounded-lg shadow-lg">
              <h3 className="text-xl font-semibold mb-2">Email Us</h3>
              <a
                href="mailto:tech.weband@gmail.com"
                className="text-blue-600 hover:text-blue-800 duration-200"
              >
                tech.weband@gmail.com
              </a>
            </div>
            <div className="p-6 bg-white rounded-lg shadow-lg">
              <h3 className="text-xl font-semibold mb-2">Call Us</h3>
              <a
                href="tel: +91 79799 50560"
                className="text-blue-600 hover:text-blue-800 duration-200"
              >
                +91 79799 50560
              </a>
            </div>
            <div className="p-6 bg-white rounded-lg shadow-lg">
              <h3 className="text-xl font-semibold mb-2">Visit Us</h3>
              <p className="text-gray-600">
                NH-727 , Fatehpur chauk,West-champran Bihar(845452)
              </p>
            </div>
          </div>

          {/* Form section */}
          <form onSubmit={handleSubmit} className="mt-8 max-w-xl mx-auto">
            <input
              type="text"
              name="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Your Name"
              className="w-full p-3 mb-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <input
              type="text"
              placeholder="Your Phone"
              name="phone"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="w-full p-3 mb-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <input
              type="email"
              placeholder="Your Email"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-3 mb-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <textarea
              placeholder="Your Message"
              name="message"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              rows="4"
              className="w-full p-3 mb-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            ></textarea>
            <motion.button
              type="submit"
              disabled={loading}
              className={`px-6 py-3  text-white font-semibold rounded-lg shadow ${
                loading
                  ? "bg-gray-200 text-gray-950"
                  : "bg-blue-600 hover:bg-blue-700"
              } `}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {loading ? (
                <span className="flex gap-2 justify-center items-center">
                  <FaCircleNotch className="animate-spin" /> Please wait..
                </span>
              ) : (
                "Send Message"
              )}
            </motion.button>
          </form>
        </div>
      </section>
    </div>
  );
};

export default ContactUs;
