import React, { useEffect, useRef, useState } from "react";
import Zdog from "zdog";

const ThreeDExperience = () => {
  const canvasRef = useRef(null);
  const [isSpinning, setIsSpinning] = useState(true);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    if (!canvasRef.current) return;

    // Detect Mobile Device
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);

    const TAU = Zdog.TAU;
    const dotCount = 96;
    const loopCount = 3;
    const alpha = 0.7;
    const stroke = 10;

    let illo = new Zdog.Illustration({
      element: canvasRef.current,
      zoom: isMobile ? 5 : 7, // Smaller zoom on mobile
      dragRotate: true,
      onDragStart: () => setIsSpinning(false),
    });

    function getFoilPoint(i) {
      let theta = (i / dotCount) * TAU;
      let x1 = Math.cos(theta) * (1 - alpha);
      let y1 = Math.sin(theta) * (1 - alpha);
      let x2 = Math.sin(theta * (loopCount - 1)) * alpha;
      let y2 = Math.cos(theta * (loopCount - 1)) * alpha;
      let z = Math.cos(theta * loopCount);
      let x = (x1 + x2) * 20;
      let y = (y1 + y2) * 20;
      z *= 7;
      return { x, y, z };
    }

    for (let i = 0; i < dotCount; i++) {
      let point0 = getFoilPoint(i);
      let point1 = getFoilPoint(i + 1);
      let hue = Math.round(Math.cos((i / dotCount) * TAU) * 60) + 330;

      new Zdog.Shape({
        path: [point0, point1],
        addTo: illo,
        stroke,
        color: `hsl(${hue}, 80%, 50%)`,
      });
    }

    let t = 0;
    const animate = () => {
      if (isSpinning) {
        t += 1 / 240;
        illo.rotate.y = Zdog.easeInOut(t % 1) * TAU * 2;
      }
      illo.updateRenderGraph();
      requestAnimationFrame(animate);
    };

    animate();

    return () => window.removeEventListener("resize", checkMobile);
  }, [isSpinning]);

  return (
    <div
      className="flex flex-col items-center justify-center min-h-screen bg-black text-white px-4 text-center"
      onClick={() => setIsSpinning(!isSpinning)}
    >
      {/* Engaging Message */}
      <h1 className="text-2xl md:text-4xl font-bold mb-4">
        **Welcome to the Future of Motion! 🌌**
      </h1>
      <p className="text-lg md:text-xl mb-6 max-w-2xl">
        Explore the **harmony of motion and design.**  
        **Tap anywhere** to start/stop the animation.  
        A mesmerizing **3D experience**, built for all screens.  
      </p>

      {/* 3D Canvas */}
      <canvas
        ref={canvasRef}
        width={isMobile ? "300" : "500"}
        height={isMobile ? "300" : "500"}
        className="illo cursor-pointer"
      ></canvas>
    </div>
  );
};

export default ThreeDExperience;
