import React from "react";
import { motion } from "framer-motion";
import { FaGithub, FaExternalLinkAlt } from "react-icons/fa";

const Portfolio = () => {
  return (
    <div className="bg-gray-50 text-gray-800">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-purple-500 to-blue-500 text-white py-20">
        <motion.div 
          initial={{ opacity: 0, y: -50 }} 
          animate={{ opacity: 1, y: 0 }} 
          transition={{ duration: 1 }} 
          className="container mx-auto text-center"
        >
          <h1 className="text-4xl md:text-6xl font-extrabold mb-4">Our Portfolio</h1>
          <p className="text-lg md:text-xl">Showcasing Our Expertise and Creativity</p>
        </motion.div>
      </section>

      {/* Featured Projects */}
      <section className="py-16">
        <motion.div 
          initial={{ opacity: 0 }} 
          animate={{ opacity: 1 }} 
          transition={{ duration: 1.5 }} 
          className="container mx-auto"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">Our services.</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {Data.map((project) => (
              <motion.div 
                key={project.id} 
                whileHover={{ scale: 1.05 }} 
                className="bg-white shadow-md rounded-lg overflow-hidden"
              >
                <img
                  src={project?.image}
                  // alt={`Project ${project}`}
                  className="w-full h-72"
                />
                <div className="p-6">
                  <h3 className="text-2xl font-semibold mb-3">{project?.title}</h3>
                  <p className="text-gray-600 mb-4">
                    {project?.description}
                  </p>
                  <div className="flex items-center space-x-4">
                    {/* <a
                      href="#"
                      className="text-blue-600 flex items-center hover:underline"
                    >
                      <FaGithub className="mr-2" /> View Code
                    </a> */}
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
            ))}
          </div>
        </motion.div>
      </section>

      {/* Our Services */}
      <section className="relative bg-gray-100 py-16">
        <motion.div 
          initial={{ opacity: 0, y: 50 }} 
          animate={{ opacity: 1, y: 0 }} 
          transition={{ duration: 1 }} 
          className="container mx-auto"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">Our Services</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {["Web Development", "Mobile App Development", "UI/UX Design"].map((service, index) => (
              <motion.div 
                key={index} 
                whileHover={{ scale: 1.05 }} 
                className="bg-white shadow-md rounded-lg p-6 text-center"
              >
                <h3 className="text-xl font-semibold mb-3">{service}</h3>
                <p className="text-gray-600">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce vel sapien elit.
                </p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </section>

      {/* Testimonials */}
      <section className="py-16">
        <motion.div 
          initial={{ opacity: 0, x: -50 }} 
          animate={{ opacity: 1, x: 0 }} 
          transition={{ duration: 1 }} 
          className="container mx-auto text-center"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-12">What Our Clients Say</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[1, 2, 3].map((testimonial) => (
              <motion.div 
                key={testimonial} 
                whileHover={{ scale: 1.05 }} 
                className="bg-white shadow-md rounded-lg p-6"
              >
                <p className="text-gray-600 italic mb-4">
                  "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse quis."
                </p>
                <h4 className="font-bold">Client Name {testimonial}</h4>
                <p className="text-sm text-gray-500">Position, Company</p>
              </motion.div>
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
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Let’s Build Something Great Together</h2>
          <p className="mb-8 text-lg">
            Ready to start your project? Contact us today and turn your ideas into reality!
          </p>
          <a
            href="#contact"
            className="bg-white text-blue-600 font-bold py-3 px-6 rounded-lg shadow-md hover:bg-blue-100"
          >
            Get in Touch
          </a>
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
    image: "https://img.freepik.com/free-photo/showing-cart-trolley-shopping-online-sign-graphic_53876-133967.jpg?t=st=1738090284~exp=1738093884~hmac=bf8b07a762d8a45ed3d3a7c8610fab0b97668245b534d476ee0f03b6ebeaf96e&w=996", // Replace with actual image URL
    description: "E-commerce platform with product browsing, secure checkout, order tracking, and user management.",
    url: ""
  },
  {
    id: 2,
    title: "ChatApp",
    image: "https://img.freepik.com/free-vector/texting-concept-illustration_114360-2744.jpg?t=st=1738090560~exp=1738094160~hmac=af991cf4be477bcfbc03a0b70e14ef80e559f194195c3feb72a5cd760a0bfde3&w=996", // Replace with actual image URL
    description: "Real-time chat application enabling instant communication through private and group chats.",
    url: "https://amitchatapp.onrender.com/"
  },
  {
    id: 3,
    title: "School Management System",
    image: "https://img.freepik.com/free-vector/online-education-isometric-concept-with-pupils-using-electronic-devices-studying-home-3d-vector-illustration_1284-29986.jpg?t=st=1738090590~exp=1738094190~hmac=d0088e4f480b662c82a05a51115eb45d5ff1618a8f510040d051ec047a79e597&w=740", // Replace with actual image URL
    description: "System designed to streamline school administration, managing student records, attendance, and grades.",
    url: "https://ssvmjogapatti.knjk.in/"
  },
  {
    id: 4,
    title: "Logistics",
    image: "https://img.freepik.com/free-vector/international-logistic-company-worldwide-operations_1284-10250.jpg?t=st=1738136461~exp=1738140061~hmac=77d8731396711b08088a0e65f0e4b8bd3e39852ec62cf115d33f524b948bab73&w=1060",
    description: "Efficiently manage your supply chain with our tailored logistics solutions. We handle transportation, warehousing, and distribution, providing real-time tracking and optimized operations for cost-effectiveness.",
    url: "https://www.ankusamlogistics.com"
  },
  {
    id: 5,
    title: "Quotation",
    image: "https://img.freepik.com/free-psd/flat-design-business-invoice-template_23-2149619388.jpg?t=st=1738136867~exp=1738140467~hmac=8392938d1331f0c2487ca6fa5e7d6728a262fef3451e3641e569616cc5a01787&w=740",
    description: "Quickly get accurate quotes for your logistics needs. Our online tool offers transparent pricing and customized solutions based on your specific requirements.",
    url: "https://quotation.ankusamlogistics.com"
  },
  {
    id: 6,
    title: "Purchase Order",
    image: "https://img.freepik.com/free-vector/receipt-concept-illustration_114360-4945.jpg?t=st=1738136778~exp=1738140378~hmac=88d95335b6a0234e290006f22608b4986c1eb32a25624cfe9ffdb98d2e842c3b&w=740",
    description: "Simplify purchasing with our easy-to-use system.  Create, track, and manage purchase orders efficiently, ensuring seamless supplier communication and accurate records.",
    url: "https://purchase.ankusamenggservices.com"
  }
];