import React, { useEffect, useRef } from "react";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import {createNoise2D} from "simplex-noise";

const SpaceScene = () => {
  const mountRef = useRef(null);
  let noise = new createNoise2D ();

  useEffect(() => {
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(55, window.innerWidth / window.innerHeight, 0.01, 1000);
    camera.position.set(0, 0, 230);

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(window.devicePixelRatio);
    mountRef.current.appendChild(renderer.domElement);

    const directionalLight = new THREE.DirectionalLight("#fff", 1);
    directionalLight.position.set(0, 50, -20);
    scene.add(directionalLight);

    const ambientLight = new THREE.AmbientLight("#ffffff", 1);
    scene.add(ambientLight);

    const controls = new OrbitControls(camera, renderer.domElement);
    controls.autoRotate = true;
    controls.autoRotateSpeed = 4;
    controls.maxDistance = 350;
    controls.minDistance = 150;
    controls.enablePan = false;

    const loader = new THREE.TextureLoader();
    const textureSphereBg = loader.load("https://i.ibb.co/HC0vxMw/sky2.jpg");
    const texturenucleus = loader.load("https://i.ibb.co/hcN2qXk/star-nc8wkw.jpg");
    const textureStar = loader.load("https://i.ibb.co/ZKsdYSz/p1-g3zb2a.png");

    const nucleusGeometry = new THREE.IcosahedronGeometry(30, 10);
    const nucleusMaterial = new THREE.MeshPhongMaterial({ map: texturenucleus });
    const nucleus = new THREE.Mesh(nucleusGeometry, nucleusMaterial);
    scene.add(nucleus);

    const sphereBgGeometry = new THREE.SphereGeometry(150, 40, 40);
    const sphereBgMaterial = new THREE.MeshBasicMaterial({ side: THREE.BackSide, map: textureSphereBg });
    const sphereBg = new THREE.Mesh(sphereBgGeometry, sphereBgMaterial);
    scene.add(sphereBg);

    const starsGeometry = new THREE.BufferGeometry();
    const starVertices = [];
    for (let i = 0; i < 150; i++) {
      const x = (Math.random() - 0.5) * 300;
      const y = (Math.random() - 0.5) * 300;
      const z = (Math.random() - 0.5) * 300;
      starVertices.push(x, y, z);
    }
    starsGeometry.setAttribute("position", new THREE.Float32BufferAttribute(starVertices, 3));
    const starsMaterial = new THREE.PointsMaterial({ size: 5, map: textureStar, transparent: true, opacity: 0.8 });
    const stars = new THREE.Points(starsGeometry, starsMaterial);
    scene.add(stars);

    const animate = () => {
      requestAnimationFrame(animate);
      nucleus.rotation.y += 0.002;
      sphereBg.rotation.x += 0.002;
      sphereBg.rotation.y += 0.002;
      controls.update();
      renderer.render(scene, camera);
    };
    animate();

    window.addEventListener("resize", () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    });

    return () => mountRef.current.removeChild(renderer.domElement);
  }, []);

  return <div ref={mountRef} className="w-full h-screen" />;
};

export default SpaceScene;
