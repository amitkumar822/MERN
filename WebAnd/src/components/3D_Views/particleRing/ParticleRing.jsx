import React, { useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, Sphere } from "@react-three/drei";
import { pointsOuter, pointsInner } from "./utils";

const ParticleRing = () => {
  return (
    <div className="relative w-full h-[40vh] md:h-[60vh] bg-slate-900">
      <Canvas
        camera={{
          position: [10, -7.5, -5],
        }}
        className="w-full h-full"
      >
        <OrbitControls maxDistance={20} minDistance={10} />
        <directionalLight />
        <pointLight position={[-30, 0, -30]} power={10.0} />
        <PointCircle />
      </Canvas>

      <div className="absolute top-[50%] md:left-[50%] md:-translate-x-[50%] md:-translate-y-[50%] left-[10%] right-[10%] text-slate-200 pointer-events-none">
        {/* Drag & Zoom */}
        <div className="w-full text-slate-200 font-semibold text-sm md:text-3xl leading-tight flex flex-col justify-center items-center">
          <span>✨ **Experience Weband in 3D** ✨</span>
          <span>A new dimension of creativity & innovation.</span>
        </div>
      </div>
    </div>
  );
};

const PointCircle = () => {
  const ref = useRef(null);

  useFrame(({ clock }) => {
    if (ref.current?.rotation) {
      ref.current.rotation.z = clock.getElapsedTime() * 0.05;
    }
  });

  return (
    <group ref={ref}>
      {pointsInner.map((point) => (
        <Point key={point.idx} position={point.position} color={point.color} />
      ))}
      {pointsOuter.map((point) => (
        <Point key={point.idx} position={point.position} color={point.color} />
      ))}
    </group>
  );
};

const Point = ({ position, color }) => {
  return (
    <Sphere position={position} args={[0.1, 10, 10]}>
      <meshStandardMaterial
        emissive={color}
        emissiveIntensity={0.5}
        roughness={0.5}
        color={color}
      />
    </Sphere>
  );
};

export default ParticleRing;

// import React, { useRef } from "react";
// import { Canvas, useFrame } from "@react-three/fiber";
// import { OrbitControls, Sphere } from "@react-three/drei";
// import { pointsOuter, pointsInner } from "./utils";

// const ParticleRing = () => {
//   return (
//     <div className="relative">
//       <Canvas
//         camera={{
//           position: [10, -7.5, -5],
//         }}
//         style={{ height: "60vh" }}
//         className="bg-slate-900"
//       >
//         <OrbitControls maxDistance={20} minDistance={10} />
//         <directionalLight />
//         <pointLight position={[-30, 0, -30]} power={10.0} />
//         <PointCircle />
//       </Canvas>

//       <h1 className="absolute top-[50%] left-[50%] -translate-x-[50%] -translate-y-[50%] text-slate-200 font-medium text-2xl md:text-5xl pointer-events-none">
//         Drag & Zoom
//       </h1>
//     </div>
//   );
// };

// const PointCircle = () => {
//   const ref = useRef(null);

//   useFrame(({ clock }) => {
//     if (ref.current?.rotation) {
//       ref.current.rotation.z = clock.getElapsedTime() * 0.05;
//     }
//   });

//   return (
//     <group ref={ref}>
//       {pointsInner.map((point) => (
//         <Point key={point.idx} position={point.position} color={point.color} />
//       ))}
//       {pointsOuter.map((point) => (
//         <Point key={point.idx} position={point.position} color={point.color} />
//       ))}
//     </group>
//   );
// };

// const Point = ({ position, color }) => {
//   return (
//     <Sphere position={position} args={[0.1, 10, 10]}>
//       <meshStandardMaterial
//         emissive={color}
//         emissiveIntensity={0.5}
//         roughness={0.5}
//         color={color}
//       />
//     </Sphere>
//   );
// };

// export default ParticleRing;
