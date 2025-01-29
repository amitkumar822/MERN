import React from "react";
import { motion } from "framer-motion";
import ServicePage from "./ServicePage";
import Portfolio from "./Portfolio";
import ReviewSection from "./ReviewSection";

const Home = () => {
  return (
    <div className="w-full min-h-screen bg-gray-100 text-gray-800 z-10">
      {/* Hero Section */}
      <header className="relative w-full h-[90vh] bg-gradient-to-r from-blue-500 to-indigo-600 text-white">
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
        <div className="container mx-auto px-4 relative z-10 flex flex-col items-center justify-center h-full text-center">
          <motion.h1
            className="text-5xl md:text-7xl font-extrabold mb-4"
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
        </div>
      </header>

      {/* Services Section */}
      <section className="py-16">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-8">Our Services</h2>
          <p className="mb-12 text-gray-600 max-w-3xl mx-auto">
            We offer a wide range of services to cater to your digital needs,
            from web development to mobile applications and UI/UX design.
          </p>
          {/* <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {Data.map((details, index) => (
              <motion.div
                key={index}
                className="p-6 bg-white rounded-lg shadow-lg hover:shadow-xl transition duration-300"
                whileHover={{ scale: 1.05 }}
              >
                <img
                  src={`${details?.image}`}
                  // alt={details}
                  className="w-full h-72 rounded-t-lg mb-4"
                />
                <h3 className="text-xl font-semibold mb-2">
                  {details?.service}
                </h3>
                <p className="text-gray-600">{details?.description}</p>
                <motion.button
                  className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                  whileHover={{ scale: 1.05 }}
                >
                  Learn More
                </motion.button>
              </motion.div>
            ))}
          </div> */}
        </div>
      </section>

      {/* Another All Landing Section */}
      <ServicePage />
      <Portfolio />
      <ReviewSection />
    </div>
  );
};

export default Home;

const Data = [
  {
    id: 1,
    service: "Web Development",
    image:
      "https://img.freepik.com/free-photo/programming-background-collage_23-2149901789.jpg?t=st=1738089534~exp=1738093134~hmac=3c5e45bea4bbeddfeb486b182f324ee6d5d4232170c724dbdc049645eef61ffb&w=996",
    description:
      "Custom web solutions tailored to your needs. We build responsive, high-performing websites using the latest technologies.",
  },
  {
    id: 2,
    service: "Android App Development",
    image:
      "https://img.freepik.com/free-vector/app-development-banner_33099-1720.jpg?t=st=1738088491~exp=1738092091~hmac=e9a6d3d0b2f92671d765af1a7053c497ec8373b2f22407f1b943c1f4ee63c083&w=996",
    description:
      "Engaging Android apps that connect with your audience. We specialize in native development for optimal performance.",
  },
  {
    id: 3,
    service: "UI/UX Design",
    image:
      "https://img.freepik.com/free-vector/gradient-ui-ux-background_23-2149052117.jpg?t=st=1738088540~exp=1738092140~hmac=97a443006deb6473b5facd08ff60c34ca6c803863373df46c93ac1bdeb6d5a4e&w=996",
    description:
      "Intuitive and beautiful interfaces that enhance user experience. We focus on user-centered design for maximum impact.",
  },
  {
    id: 4,
    service: "E-commerce Solutions",
    image:
      "https://img.freepik.com/free-vector/shopping-e-commerce-concept-isometric-poster_1284-15256.jpg?t=st=1738089257~exp=1738092857~hmac=f7fe41fb2cc6a8359bf5c0ce9da786bb773b8b2c645d0399dd180384d38941ad&w=826",
    description:
      "Powerful e-commerce platforms that drive sales. We build online stores and marketplaces tailored to your business.",
  },
  {
    id: 5,
    service: "Cloud Integration",
    image:
      "https://img.freepik.com/premium-photo/cloud-computing-technology-online-data-storage-business-network-concept_31965-13412.jpg?w=1060",
    description:
      "Seamless cloud integration for scalability and performance. We leverage leading cloud platforms for your applications.",
  },
  {
    id: 6,
    service: "SEO Services",
    image:
      "https://img.freepik.com/premium-photo/searching-engine-optimizing-seo-browsing-concept_53876-176961.jpg?w=826",
    description:
      "Boost your online visibility with our SEO expertise. We drive organic traffic to your site through proven strategies.",
  },
];
