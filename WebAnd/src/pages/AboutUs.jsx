import React from "react";
import { motion } from "framer-motion";
import { FaGithub, FaExternalLinkAlt, FaMapMarkerAlt, FaEnvelope, FaPhoneAlt } from "react-icons/fa";

const AboutUs = () => {
  return (
    <div className="w-full min-h-screen bg-gray-100 text-gray-800">
      {/* About Us Section */}
      <section className="py-16">
        <div className="container mx-auto px-4 grid md:grid-cols-2 gap-8 items-center">
          <div>
            <h2 className="text-4xl font-bold mb-6">About Us</h2>
            <p className="text-lg text-gray-700 mb-4">
              Welcome to <span className="text-blue-600 font-bold">Weband</span>, where we transform ideas into reality. Our team of experts specializes in delivering top-notch web and mobile app development services tailored to your unique needs.
            </p>
            <p className="text-lg text-gray-700 mb-4">
              With years of experience and a passion for innovation, we ensure every project is a success story. Let us help you build your future, one line of code at a time.
            </p>
          </div>
          <motion.img
            src="https://img.freepik.com/free-vector/people-holding-world-wide-web-icons_53876-66126.jpg?t=st=1738090183~exp=1738093783~hmac=71b08a44c4a0c6820d5a3c4ea2c28fd36970b88accaf46aaeb28965b7a7fe56c&w=826"
            alt="About Weband"
            className="rounded-lg shadow-lg"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
          />
        </div>
      </section>

      {/* Mission Statement Section */}
      <section className="py-16 bg-blue-50">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">Our Mission</h2>
          <p className="text-lg text-gray-700">
            At <span className="text-blue-600 font-bold">Weband</span>, our mission is to empower businesses with cutting-edge technology solutions, enabling them to achieve their goals efficiently and effectively.
          </p>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-6 text-center">Our Services</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white shadow-md p-6 rounded-lg">
              <h3 className="text-xl font-bold mb-2">Web Development</h3>
              <p className="text-gray-700">Responsive and dynamic websites to establish your online presence.</p>
            </div>
            <div className="bg-white shadow-md p-6 rounded-lg">
              <h3 className="text-xl font-bold mb-2">Mobile App Development</h3>
              <p className="text-gray-700">Custom mobile applications for iOS and Android platforms.</p>
            </div>
            <div className="bg-white shadow-md p-6 rounded-lg">
              <h3 className="text-xl font-bold mb-2">E-Commerce Solutions</h3>
              <p className="text-gray-700">Feature-rich and scalable online stores tailored to your business.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Information Section */}
      <section className="py-16 bg-gray-200">
        <div className="container mx-auto px-4 grid md:grid-cols-2 gap-8 items-center">
          <div>
            <h2 className="text-3xl font-bold mb-6">Contact Us</h2>
            <p className="text-lg text-gray-700 mb-4">
              We'd love to hear from you! Reach out to us for any inquiries or collaborations.
            </p>
            <ul className="space-y-4">
              <li className="flex items-center space-x-4">
                <FaMapMarkerAlt className="text-blue-600 text-2xl" />
                <span>123 Tech Street, Innovation City, Techland</span>
              </li>
              <li className="flex items-center space-x-4">
                <FaPhoneAlt className="text-blue-600 text-2xl" />
                <span>+91-1234567890</span>
              </li>
              <li className="flex items-center space-x-4">
                <FaEnvelope className="text-blue-600 text-2xl" />
                <span>info@weband.com</span>
              </li>
            </ul>
          </div>
          <motion.div
            className="rounded-lg overflow-hidden shadow-lg"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3153.0137495248744!2d-122.08424968468135!3d37.4220659798246!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x808fb5a0af14c8e7%3A0x72697f7e626a1dd2!2sGoogleplex!5e0!3m2!1sen!2sin!4v1634128248361!5m2!1sen!2sin"
              width="100%"
              height="300"
              style={{ border: 0 }}
              allowFullScreen=""
              loading="lazy"
              title="Location Map"
            ></iframe>
          </motion.div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-16">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-6">Meet Our Team</h2>
          <p className="text-lg text-gray-700 mb-8">
            Our dedicated team of professionals is here to provide you with the best service possible.
          </p>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white shadow-md p-6 rounded-lg">
              <h3 className="text-xl font-bold mb-2">Khushjeet Kumar</h3>
              <p className="text-gray-700">CEO & Founder</p>
              <a href="tel:+91 79799 50560" className="text-blue-700 hover:text-blue-800">+91 79799 50560</a>
            </div>
            <div className="bg-white shadow-md p-6 rounded-lg">
              <h3 className="text-xl font-bold mb-2">Rohit Kumar</h3>
              <p className="text-gray-700">UI/UX Designer</p>
              <a href="tel:+91 72580 01494" className="text-blue-700 hover:text-blue-800">+91 72580 01494</a>
            </div>
            <div className="bg-white shadow-md p-6 rounded-lg">
              <h3 className="text-xl font-bold mb-2">Amit Kumar</h3>
              <p className="text-gray-700">Lead Developer</p>
              <a href="tel:+91 82288 43870" className="text-blue-700 hover:text-blue-800">+91 82288 43870</a>
            </div>

          </div>
        </div>
      </section>
    </div>
  );
};

export default AboutUs;