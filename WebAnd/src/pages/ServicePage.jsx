import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router";

const ServicePage = () => {
  return (
    <div className="bg-gray-50">
      {/* Header Section */}
      {/* <header className="bg-gradient-to-r from-blue-600 to-purple-600 py-16 text-center text-white">
        <h1 className="text-4xl font-bold md:text-6xl">Our Services</h1>
        <p className="mt-4 text-lg md:text-xl">
          Empowering Your Business with Innovative IT Solutions
        </p>
      </header> */}

      <header className="flex flex-col md:flex-row items-center justify-between gap-8 px-6 md:px-16 py-12">
        {/* Left Side - Image */}
        <motion.div
          className="w-full md:w-1/2"
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1 }}
        >
          <img
            src="https://img.freepik.com/free-photo/standard-quality-control-concept-m_23-2150041863.jpg?t=st=1738177588~exp=1738181188~hmac=6155d30a05e74c12ac1ed92ca6156cd655ac6763f29ffc33bfc8b933cf5e916c&w=900"
            alt="IT Services"
            className="w-full h-[25rem] rounded-2xl shadow-lg"
          />
        </motion.div>

        {/* Right Side - Text */}
        <motion.div
          className="w-full md:w-1/2 text-center md:text-left"
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1, delay: 0.3 }}
        >
          <h1 className="text-4xl md:text-6xl font-extrabold text-blue-600">
            Our Services
          </h1>
          <p className="mt-4 text-lg md:text-xl text-gray-700">
            Empowering Your Business with Cutting-Edge IT Solutions. From web
            development to cloud integration, we help you grow with technology.
          </p>
          <motion.button
            className="mt-6 px-6 py-3 text-lg font-semibold bg-blue-600 text-white rounded-lg shadow-md hover:bg-blue-700 transition-all duration-300"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Link to="/portfolio">Explore Services</Link>
          </motion.button>
        </motion.div>
      </header>

      {/* Services Overview Section */}
      <section className="px-4 py-16 md:px-20">
        <h2 className="text-center text-3xl font-bold text-gray-800 md:text-4xl">
          What We Offer
        </h2>
        <p className="mt-4 text-center text-lg text-gray-600 md:text-xl">
          Discover our wide range of IT services designed to help your business
          grow and succeed.
        </p>

        <div className="mt-12 grid gap-8 md:grid-cols-3">
          {Data?.map((service, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              whileHover={{ scale: 1.15 }}
              className="rounded-lg bg-white p-6 shadow-md shadow-gray-500"
            >
              <img
                src={service.image}
                alt={service.title}
                className="h-72 w-full rounded-lg"
              />
              <h3 className="mt-4 text-xl font-bold text-gray-800">
                {service.title}
              </h3>
              <p className="mt-2 text-gray-600">{service.description}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="bg-blue-50 px-4 py-16 md:px-20">
        <h2 className="text-center text-3xl font-bold text-gray-800 md:text-4xl">
          Why Choose WebAnd?
        </h2>
        <div className="mt-12 grid gap-8 md:grid-cols-2">
          {[
            {
              icon: "🌟",
              title: "Expert Team",
              description:
                "Our team consists of highly skilled professionals with years of experience.",
            },
            {
              icon: "🚀",
              title: "Innovative Solutions",
              description:
                "We use cutting-edge technologies to deliver innovative solutions.",
            },
            {
              icon: "💡",
              title: "Customized Services",
              description:
                "We provide tailor-made services to fit your specific business needs.",
            },
            {
              icon: "💼",
              title: "Proven Track Record",
              description:
                "We have a history of delivering successful projects to satisfied clients.",
            },
          ].map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: index * 0.2 }}
              className="flex items-start gap-4 rounded-lg bg-white p-6 shadow-md"
            >
              <span className="text-4xl text-blue-600">{item.icon}</span>
              <div>
                <h3 className="text-xl font-bold text-gray-800">
                  {item.title}
                </h3>
                <p className="mt-2 text-gray-600">{item.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      
    </div>
  );
};

export default ServicePage;

const Data = [
  {
    title: "Web Development",
    description:
      "Build modern, responsive, and high-performing websites tailored to your needs.",
    image:
      "https://img.freepik.com/free-vector/programming-concept-illustration_114360-1351.jpg?t=st=1738089233~exp=1738092833~hmac=5b5a88b88b2c63ea57cdfe6122a9d1e7b467ef85b0ba178c65d6f2cbf974f4e4&w=740",
  },
  {
    title: "Mobile App Development",
    description:
      "Develop feature-rich mobile apps for iOS and Android platforms.",
    image:
      "https://img.freepik.com/premium-vector/color-modern-illustration-app_145666-900.jpg?w=740",
  },
  {
    title: "UI/UX Design",
    description:
      "Design intuitive and visually appealing interfaces for websites and apps.",
    image:
      "https://img.freepik.com/premium-vector/woman-creates-custom-design-mobile-application-ui-ux-design-flat-2d-character-landing-page_130740-5021.jpg?w=900",
  },
  {
    title: "E-Commerce Solutions",
    description:
      "Create seamless online stores to help you sell products effectively.",
    image:
      "https://img.freepik.com/free-vector/team-online-store-working-with-customer_1262-19368.jpg?t=st=1738089959~exp=1738093559~hmac=8a4ccf80187a369247ad81ff23c7b6ca63181da2086aa6f4d4657e8f624833f3&w=900",
  },
  {
    title: "SEO & Digital Marketing",
    description:
      "Enhance your online visibility and drive more traffic to your website.",
    image:
      "https://img.freepik.com/free-vector/seo-concept-illustration_24908-61522.jpg?t=st=1738090001~exp=1738093601~hmac=a7516adee66ea5679fe50f144f4f5e17ba3092d3ad70a045f0aa04032c65330a&w=740",
  },
  {
    title: "Custom Software Development",
    description:
      "Tailored software solutions to address unique business challenges.",
    image:
      "https://img.freepik.com/free-vector/desktop-smartphone-app-development_23-2148683810.jpg?t=st=1738090046~exp=1738093646~hmac=3ffbadaba15071428318f51b09b8d73cb9ebe57bf1c945a35dfb4b544062d54f&w=740",
  },
];
