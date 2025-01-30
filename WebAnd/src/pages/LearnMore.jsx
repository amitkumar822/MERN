import React from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, Stars } from "@react-three/drei";
import { motion } from "framer-motion";

const LearnMore = () => {
  return (
    <div className="w-full min-h-screen bg-gray-100 text-gray-800">
      {/* Hero Section */}
      <header className="relative w-full h-screen bg-gradient-to-r from-blue-500 to-indigo-600 text-white flex flex-col items-center justify-center text-center p-6 overflow-hidden">
        {/* 3D Background Animation */}

        <Canvas className="absolute top-0 left-0 w-full h-full z-0">
          {/* Add Ambient Light for general illumination */}
          <ambientLight intensity={0.5} />

          {/* Add Directional Light for focused light */}
          <directionalLight position={[5, 5, 5]} intensity={4} />

          {/* Add Stars for background effects */}
          <Stars
            radius={100}
            depth={50}
            count={15000}
            factor={6}
            saturation={0}
            fade
          />

          {/* OrbitControls for user interaction */}
          <OrbitControls enableZoom={false} autoRotate autoRotateSpeed={0.5} />

          {/* Mesh with orange color */}
          <mesh>
            <sphereGeometry args={[1.5, 32, 32]} />
            <meshStandardMaterial color="orange" />
          </mesh>
          <mesh>
            <torusKnotGeometry args={[1.5, 0.4, 128, 64]} />
            <meshStandardMaterial color="red" />
          </mesh>
        </Canvas>

        {/* Hero Content */}
        <motion.div
          className="relative z-10"
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h1 className="text-4xl md:text-6xl font-extrabold mb-4">
            Discover <span className="text-yellow-300">Weband</span>
          </h1>
          <motion.p
            className="text-lg md:text-2xl max-w-3xl mx-auto mb-6"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            Where innovation meets technology. Explore our journey and expertise
            in creating digital solutions that matter.
          </motion.p>
        </motion.div>
      </header>

      {/* Our Vision Section */}
      <section className="container mx-auto px-4 py-16">
        <motion.div
          className="text-center"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Our Vision</h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            At Weband, we envision a future where technology empowers businesses
            to achieve their full potential. Our mission is to deliver
            innovative, scalable, and user-centric solutions that drive growth
            and transformation.
          </p>
        </motion.div>
      </section>

      {/* Interactive 3D Experience Section */}
      <section className="relative w-full h-[500px] bg-gray-900 flex items-center justify-center">
        <Canvas>
          <ambientLight intensity={4} />
          <pointLight position={[10, 10, 10]} />
          <Stars
            radius={100}
            depth={50}
            count={9000}
            factor={8}
            saturation={0}
            fade
          />
          <mesh>
            <torusGeometry args={[2, 0.5, 16, 100]} />
            <meshStandardMaterial color="orange" />
          </mesh>
          <OrbitControls enableZoom={false} autoRotate autoRotateSpeed={1} />
        </Canvas>

        <motion.div
          className="absolute text-white text-center"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 1 }}
        >
          <h3 className="text-3xl font-bold mb-4">Interactive 3D Experience</h3>
          <p className="text-lg max-w-2xl mx-auto">
            Explore our innovative approach through this interactive 3D
            visualization. Drag to rotate and experience the future of digital
            solutions.
          </p>
        </motion.div>
      </section>

      {/* Our Expertise Section */}
      <section className="container mx-auto px-4 py-16">
        <motion.h2
          className="text-3xl md:text-4xl font-bold text-center mb-12"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          Our Expertise
        </motion.h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {expertise.map((item, index) => (
            <motion.div
              key={index}
              className="bg-white p-6 rounded-lg shadow-md text-center"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: index * 0.2 }}
            >
              <div className="text-4xl mb-4">{item.icon}</div>
              <h3 className="text-xl font-bold mb-2">{item.title}</h3>
              <p className="text-gray-600">{item.description}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Call-to-Action Section */}
      <section className="bg-gradient-to-r from-blue-500 to-indigo-600 py-16 text-white text-center">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Ready to Transform Your Business?
          </h2>
          <p className="text-lg mb-6">
            Let’s build something amazing together. Get in touch with us today!
          </p>
          <button className="bg-yellow-300 text-gray-800 py-3 px-6 rounded-lg font-bold hover:bg-yellow-400 transition-colors">
            Contact Us
          </button>
        </motion.div>
      </section>
    </div>
  );
};

// Data for Expertise
const expertise = [
  {
    icon: "🌐",
    title: "Web Development",
    description:
      "Building responsive, scalable, and user-friendly websites tailored to your needs.",
  },
  {
    icon: "📱",
    title: "Mobile App Development",
    description:
      "Creating intuitive and high-performance mobile applications for iOS and Android.",
  },
  {
    icon: "🎨",
    title: "UI/UX Design",
    description:
      "Designing visually stunning and user-centric interfaces for seamless experiences.",
  },
];

export default LearnMore;
