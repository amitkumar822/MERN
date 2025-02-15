import React from "react";
import ParticleRing from "../components/3D_Views/particleRing/ParticleRing";
import ThreeDExperience from "../components/3D_Views/ThreeDExperience";
import SpaceScene from "../components/3D_Views/SpaceScene";

const ThreeD = () => {
  return (
    <div>
      <div className="w-full bg-blue-900 text-white flex flex-col justify-center items-center py-4">
        {/* Title Section */}
        <h1 className="text-2xl md:text-4xl font-bold text-center mb-4">
          🚀 Step into the Future of Weband! 🌐
        </h1>
        <p className="text-lg md:text-xl text-center max-w-2xl px-4 mb-6">
          Welcome to our **3D Experience Page**! Explore a world of immersive
          design and cutting-edge technology and
          enjoy the magic! ✨
        </p>
      </div>
      <div>
        <ParticleRing />
        {/* <ThreeDExperience /> */}
        <SpaceScene />
      </div>
    </div>
  );
};

export default ThreeD;
