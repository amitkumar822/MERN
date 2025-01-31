import React, { Suspense } from "react";
import { motion } from "framer-motion";
import ServicePage from "./ServicePage";
import Portfolio from "./Portfolio";
import ReviewSection from "./ReviewSection";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, Sphere } from "@react-three/drei";
import { Link } from "react-router";
import AboutUs from "./AboutUs";

const Home = () => {
  return (
    <div className="w-full min-h-screen bg-gray-100 text-gray-800 z-10">
      {/* Hero Section */}
      <header className="relative w-full h-[90vh] bg-gradient-to-r from-blue-500 to-indigo-600 text-white">
        <div className="absolute top-0 left-0 w-full h-full opacity-50">
          <Canvas>
            <OrbitControls enableZoom={false} autoRotate autoRotateSpeed={1} />
            <ambientLight intensity={0.5} />
            <directionalLight position={[3, 2, 1]} />
            <Suspense fallback={null}>
              <Sphere args={[1.5, 100, 100]}>
                <meshStandardMaterial color="#212121" wireframe />
              </Sphere>
            </Suspense>
          </Canvas>
        </div>

        <div className="absolute inset-0 overflow-hidden">
          <motion.img
            src="https://cdn.wallpapersafari.com/86/65/nqENxl.jpg"
            alt="weband"
            className="w-full h-full object-cover opacity-40"
            initial={{ scale: 1.1 }}
            animate={{ scale: 1 }}
            transition={{
              duration: 8,
              repeat: Infinity,
              repeatType: "reverse",
            }}
          />
        </div>

        {/* <div className="container mx-auto px-4 relative z-10 flex flex-col items-center justify-center h-full text-center">
          <motion.h1
            className="text-3xl md:text-7xl font-extrabold mb-4"
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            Welcome to <span className="text-yellow-300">Weband</span>
          </motion.h1>
          <motion.p
            className="text-lg md:text-2xl mb-6 max-w-3xl mx-auto"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            Your trusted partner for Web and Android App Development Services.
          </motion.p>
          <motion.div
            className="flex justify-center gap-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <motion.button
              className="px-6 py-3 bg-yellow-300 text-gray-800 font-semibold rounded-lg shadow-lg hover:bg-yellow-400"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Get Started
            </motion.button>
            <motion.button
              className="px-6 py-3 bg-white text-blue-600 font-semibold rounded-lg shadow-lg hover:bg-gray-100"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Learn More
            </motion.button>
          </motion.div>
        </div> */}

        <div className="container mx-auto px-4 relative z-10 flex flex-col items-center justify-center h-screen text-center space-y-10">
          {/* 3D Flip Animation */}
          <motion.h1
            className="text-3xl md:text-7xl font-extrabold text-white flex flex-wrap justify-center"
            initial="hidden"
            animate="visible"
          >
            {Data.map((char, index) => (
              <motion.span
                key={`flip-${index}`}
                className="inline-block"
                initial={{ opacity: 0, y: 30, scale: 0.5, rotateX: 90 }}
                animate={{ opacity: 1, y: 0, scale: 1, rotateX: 0 }}
                transition={{
                  duration: 0.6,
                  delay: index * 0.1,
                  ease: "easeOut",
                }}
                whileHover={{
                  scale: 1.3,
                  rotateY: 20,
                  textShadow: "0px 0px 10px rgba(255,255,100,0.9)",
                }}
              >
                {char === " " ? "\u00A0" : char}
              </motion.span>
            ))}
          </motion.h1>

          {/* 3D Animated Subtitle */}
          <motion.p
            className="text-lg md:text-2xl mb-6 max-w-3xl mx-auto text-gray-200"
            initial={{ opacity: 0, y: 50, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.8, delay: 1, ease: "easeOut" }}
            whileHover={{ textShadow: "0px 0px 15px rgba(200,200,255,0.7)" }}
          >
            Your trusted partner for{" "}
            <span className="text-pink-400 font-bold">Web</span> and{" "}
            <span className="text-green-400 font-bold">
              Android App Development
            </span>{" "}
            Services.
          </motion.p>

          {/* Buttons with Floating Effect */}
          <motion.div
            className="flex justify-center gap-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 1.2 }}
          >
            <Link to="/portfolio">
              <motion.button
                className="px-6 py-3 bg-yellow-300 text-gray-900 font-semibold rounded-lg shadow-lg hover:bg-yellow-400"
                whileHover={{
                  scale: 1.1,
                  y: -3,
                  boxShadow: "0px 4px 10px rgba(255, 255, 100, 0.8)",
                }}
                whileTap={{ scale: 0.95 }}
              >
                Get Started
              </motion.button>
            </Link>
            <Link to="/learn-more">
              <motion.button
                className="px-6 py-3 bg-white text-blue-600 font-semibold rounded-lg shadow-lg hover:bg-gray-100"
                whileHover={{
                  scale: 1.1,
                  y: -3,
                  boxShadow: "0px 4px 10px rgba(200, 200, 255, 0.8)",
                }}
                whileTap={{ scale: 0.95 }}
              >
                Learn More
              </motion.button>
            </Link>
          </motion.div>
        </div>
      </header>

      {/* Another All Landing Section */}
      <ServicePage />
      <Portfolio />
      <ReviewSection />
      <AboutUs />
    </div>
  );
};

export default Home;

const Data = [
  "W",
  "e",
  "l",
  "c",
  "o",
  "m",
  "e",
  " ",
  "t",
  "o",
  " ",
  "W",
  "e",
  "b",
  "a",
  "n",
  "d",
];
