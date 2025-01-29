import React, { Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, Sphere } from "@react-three/drei";
import { Link } from "react-router-dom";
import ServicePage from "./ServicePage";
import Portfolio from "./Portfolio";
import ReviewSection from "./ReviewSection";

const Home = () => {
  return (
    <div className="w-full min-h-screen bg-gray-100 text-gray-800 z-10">
      <header className="relative w-full md:h-[90vh] h-[50vh] bg-gradient-to-r from-blue-500 to-indigo-600 text-white flex flex-col items-center justify-center text-center px-6">
        {/* 3D Sphere Animation */}
        <div className="absolute top-0 left-0 w-full h-full opacity-50">
          <Canvas>
            <OrbitControls enableZoom={false} autoRotate autoRotateSpeed={1} />
            <ambientLight intensity={0.1} />
            <directionalLight position={[3, 2, 1]} />
            <Suspense fallback={null}>
              <Sphere args={[1.5, 100, 100]}>
                <meshStandardMaterial color="white" wireframe />
              </Sphere>
            </Suspense>
          </Canvas>
        </div>

        {/* Hero Content */}
        <div className="relative z-10 max-w-3xl">
          <h1 className="text-3xl md:text-7xl font-extrabold mb-4">
            Welcome to <span className="text-yellow-300">Weband</span>
          </h1>
          <p className="text-lg md:text-2xl mb-6">
            Your trusted partner for Web and Android App Development Services.
          </p>
          <div className="flex justify-center gap-4">
            <Link
              to="/service"
              className="px-6 py-3 bg-yellow-300 text-gray-800 font-semibold rounded-lg shadow-lg hover:bg-yellow-400 transition"
            >
              Get Started
            </Link>
            <Link
              to="/about-us"
              className="px-6 py-3 bg-white text-blue-600 font-semibold rounded-lg shadow-lg hover:bg-gray-100 transition"
            >
              Learn More
            </Link>
          </div>
        </div>
      </header>

      {/* Another All Landing Section */}
      <ServicePage />
      <Portfolio />
      <ReviewSection />
    </div>
  );
};

export default Home;
