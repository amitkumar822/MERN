import React, { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { FaExternalLinkAlt } from "react-icons/fa";
import { Link } from "react-router-dom";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, useTexture } from "@react-three/drei";
import Typed from "typed.js";
import webimage from "../data/photo/web.png";
import ecommerceimage from "../data/photo/ecommerce.png";

// 3D Rotating Cube Component
const Cube = () => {
  const texture = useTexture(webimage);
  const cubeRef = useRef();

  return (
    <mesh ref={cubeRef} rotation={[0.5, 0.5, 0]}>
      <boxGeometry args={[2, 2, 2]} />
      <meshStandardMaterial map={texture || undefined} />
    </mesh>
  );
};
const Cube2 = () => {
  const texture = useTexture(ecommerceimage);
  const cubeRef = useRef();

  return (
    <mesh ref={cubeRef} rotation={[0.5, 0.5, 0]}>
      <boxGeometry args={[2, 2, 2]} />
      <meshStandardMaterial map={texture} />
    </mesh>
  );
};

const Portfolio = () => {
  const typedRef = useRef(null);

  useEffect(() => {
    const options = {
      strings: [
        "Showcasing Our Expertise and Creativity",
        "Transforming Ideas into Reality",
        "Innovative Solutions for Your Business",
        "Crafting Digital Experiences with Precision",
        "Where Technology Meets Excellence",
        "Your Vision, Our Execution",
        "Pioneering the Future of Web and App Development",
        "Delivering Perfection, One Project at a Time",
        "Design. Develop. Inspire.",
      ],
      typeSpeed: 50,
      backSpeed: 50,
      loop: true,
    };
    const typed = new Typed(typedRef.current, options);

    return () => {
      typed.destroy();
    };
  }, []);

  return (
    <div className="bg-gray-50 text-gray-800">
      {/* Hero Section with 3D Cube */}
      <section className="relative flex flex-col items-center justify-center h-[15rem] text-white bg-gradient-to-r from-purple-600 to-blue-600">
        {/* 3D Cube Left Section */}
        <div>
          <div className="absolute left-10 top-1/2 -translate-y-1/2 w-72 h-72 hidden md:block">
            <Canvas>
              <ambientLight intensity={2} />
              <directionalLight position={[2, 2, 5]} />
              <Cube />
              <OrbitControls
                autoRotate
                autoRotateSpeed={1.5}
                enableZoom={false}
              />
            </Canvas>
          </div>
          <div className="absolute left-28 top-1/2 -translate-y-1/2 w-72 h-72 hidden md:block">
            <Canvas>
              <ambientLight intensity={2} />
              <directionalLight position={[2, 2, 5]} />
              <Cube2 />
              <OrbitControls
                autoRotate
                autoRotateSpeed={1.5}
                enableZoom={false}
              />
            </Canvas>
          </div>
        </div>

        {/* Wave Effect Animation */}

        <motion.div
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="text-center z-10"
        >
          {/* <h1 className="text-4xl md:text-6xl font-extrabold mb-4">
            Our Portfolio
          </h1> */}
          <motion.h1
            className="text-3xl md:text-7xl font-extrabold text-white flex flex-wrap justify-center"
            initial="hidden"
            animate="visible"
          >
            {[
              "O",
              "u",
              "r",
              " ",
              "P",
              "o",
              "r",
              "t",
              "f",
              "o",
              "l",
              "i",
              "o",
            ].map((char, index) => (
              <motion.span
                key={`wave-${index}`}
                className="inline-block"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: [0, -10, 0] }}
                transition={{
                  duration: 0.2,
                  delay: index * 0.1,
                  repeat: Infinity,
                  repeatType: "reverse",
                }}
                whileHover={{
                  scale: 1.1,
                  textShadow: "0px 0px 12px rgba(100,255,255,1)",
                }}
              >
                {char === " " ? "\u00A0" : char}
              </motion.span>
            ))}
          </motion.h1>
          <p className="text-lg md:text-xl bg-gradient-to-r from-purple-500 to-yellow-500 shadow-md shadow-yellow-400">
            <span ref={typedRef}></span>
          </p>
        </motion.div>

        {/* 3D Cube Right Side */}
        <div>
          <div className="absolute top-1/2 -translate-y-1/2 right-10 w-72 h-72 hidden md:block">
            <Canvas>
              <ambientLight intensity={2} />
              <directionalLight position={[2, 2, 5]} />
              <Cube />
              <OrbitControls
                autoRotate
                autoRotateSpeed={1.5}
                enableZoom={false}
              />
            </Canvas>
          </div>
          <div className="absolute top-1/2 -translate-y-1/2 right-28 w-72 h-72 hidden md:block">
            <Canvas>
              <ambientLight intensity={2} />
              <directionalLight position={[2, 2, 5]} />
              <Cube2 />
              <OrbitControls
                autoRotate
                autoRotateSpeed={1.5}
                enableZoom={false}
              />
            </Canvas>
          </div>
        </div>
      </section>

      {/* Featured Projects */}
      <section className="py-16">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.5 }}
          className="container mx-auto"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
            Our Services
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {Data.map((project) => (
              <a href={project?.url} target="_blank" key={project.id}>
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  className="bg-white shadow-md rounded-lg overflow-hidden transition-transform duration-300 hover:shadow-xl"
                >
                  <img
                    src={project?.image}
                    alt={project?.title}
                    className="w-full h-72 object-cover"
                  />
                  <div className="p-6">
                    <h3 className="text-2xl font-semibold mb-3">
                      {project?.title}
                    </h3>
                    <p className="text-gray-600 mb-4 line-clamp-3">
                      {project?.description}
                    </p>
                    <div className="flex items-center space-x-4">
                      <a
                        href={project?.url}
                        target="_blank"
                        className="text-blue-600 flex items-center hover:underline"
                      >
                        <FaExternalLinkAlt className="mr-2" /> Visit Site
                      </a>
                    </div>
                  </div>
                </motion.div>
              </a>
            ))}
          </div>
        </motion.div>
      </section>

      {/* Call to Action */}
      <section className="relative bg-gradient-to-r from-blue-500 to-green-500 text-white py-16">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1 }}
          className="container mx-auto text-center"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Let’s Build Something Great Together
          </h2>
          <p className="mb-8 text-lg">
            Ready to start your project? Contact us today and turn your ideas
            into reality!
          </p>
          <Link
            to="/contact-us"
            className="bg-white text-blue-600 font-bold py-3 px-6 rounded-lg shadow-md hover:bg-blue-100 transition"
          >
            Get in Touch
          </Link>
        </motion.div>
      </section>
    </div>
  );
};

export default Portfolio;

const Data = [
  {
    id: 1,
    title: "AmiShop",
    image:
      "https://img.freepik.com/free-photo/showing-cart-trolley-shopping-online-sign-graphic_53876-133967.jpg?t=st=1738090284~exp=1738093884~hmac=bf8b07a762d8a45ed3d3a7c8610fab0b97668245b534d476ee0f03b6ebeaf96e&w=996", // Replace with actual image URL
    description:
      "E-commerce platform with product browsing, secure checkout, order tracking, and user management.",
    url: "",
  },
  {
    id: 2,
    title: "ChatApp",
    image:
      "https://img.freepik.com/free-vector/texting-concept-illustration_114360-2744.jpg?t=st=1738090560~exp=1738094160~hmac=af991cf4be477bcfbc03a0b70e14ef80e559f194195c3feb72a5cd760a0bfde3&w=996", // Replace with actual image URL
    description:
      "Real-time chat application enabling instant communication through private and group chats.",
    url: "https://amitchatapp.onrender.com/",
  },
  {
    id: 3,
    title: "School Management System",
    image:
      "https://img.freepik.com/free-vector/online-education-isometric-concept-with-pupils-using-electronic-devices-studying-home-3d-vector-illustration_1284-29986.jpg?t=st=1738090590~exp=1738094190~hmac=d0088e4f480b662c82a05a51115eb45d5ff1618a8f510040d051ec047a79e597&w=740", // Replace with actual image URL
    description:
      "System designed to streamline school administration, managing student records, attendance, and grades.",
    url: "https://ssvmjogapatti.knjk.in/",
  },
  {
    id: 4,
    title: "Logistics",
    image:
      "https://img.freepik.com/free-vector/international-logistic-company-worldwide-operations_1284-10250.jpg?t=st=1738136461~exp=1738140061~hmac=77d8731396711b08088a0e65f0e4b8bd3e39852ec62cf115d33f524b948bab73&w=1060",
    description:
      "Efficiently manage your supply chain with our tailored logistics solutions. We handle transportation, warehousing, and distribution, providing real-time tracking and optimized operations for cost-effectiveness.",
    url: "https://www.ankusamlogistics.com",
  },
  {
    id: 5,
    title: "Quotation",
    image:
      "https://img.freepik.com/free-psd/flat-design-business-invoice-template_23-2149619388.jpg?t=st=1738136867~exp=1738140467~hmac=8392938d1331f0c2487ca6fa5e7d6728a262fef3451e3641e569616cc5a01787&w=740",
    description:
      "Quickly get accurate quotes for your logistics needs. Our online tool offers transparent pricing and customized solutions based on your specific requirements.",
    url: "https://quotation.ankusamlogistics.com",
  },
  {
    id: 6,
    title: "Purchase Order",
    image:
      "https://img.freepik.com/free-vector/receipt-concept-illustration_114360-4945.jpg?t=st=1738136778~exp=1738140378~hmac=88d95335b6a0234e290006f22608b4986c1eb32a25624cfe9ffdb98d2e842c3b&w=740",
    description:
      "Simplify purchasing with our easy-to-use system.  Create, track, and manage purchase orders efficiently, ensuring seamless supplier communication and accurate records.",
    url: "https://purchase.ankusamenggservices.com",
  },
  {
    id: 7,
    title: "E-Learning",
    image:
      "https://img.freepik.com/free-vector/online-tutorials-concept_52683-37480.jpg?t=st=1738171823~exp=1738175423~hmac=ffbe03870f8bfe36037d64a721dd0527f27872b709ce0d705d77e81662537590&w=996",
    description:
      "Engage in interactive online learning experiences. Access a wide range of courses and educational resources from anywhere, anytime.  Our e-learning platform offers flexible learning options to suit your individual needs and pace. Explore new subjects, enhance your skills, and achieve your learning goals through engaging multimedia content and expert instruction.",
    url: "https://coaching.knjk.in",
  },
  {
    id: 8,
    title: "ERP System",
    image:
      "https://img.freepik.com/free-vector/hand-drawn-flat-design-erp-illustration_23-2149365029.jpg?t=st=1738172082~exp=1738175682~hmac=e0d59c0c9315e9d66b9f70336ebad99e8bacadc7955c9d186d5d97de27af1ea7&w=740",
    description:
      "Streamline your business operations with our comprehensive ERP system.  Manage all your core business processes, including finance, manufacturing, sales, and human resources, in one integrated platform.  Improve efficiency, reduce costs, and gain valuable insights with real-time data and analytics.  Our ERP solution empowers you to make informed decisions and drive business growth.",
    url: "https://coaching.knjk.in",
  },
  {
    id: 9,
    title: "Logistics APP",
    image:
      "https://img.freepik.com/free-vector/purchase-online-onboarding-app_23-2148403328.jpg?t=st=1738172294~exp=1738175894~hmac=3c47e51d6b810bc549f9a8a55cfe5a3fbba8391c52b12972c6f36b948a8bbe4f&w=996",
    description:
      "Optimize your logistics and supply chain with our powerful mobile app. Track shipments in real-time, manage inventory efficiently, and streamline delivery processes.  Our logistics app provides you with the tools you need to improve visibility, reduce costs, and enhance customer satisfaction.  Simplify complex logistics operations and gain a competitive edge in today's fast-paced market.",
    url: "",
  },
];
