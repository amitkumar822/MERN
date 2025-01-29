import React from "react";
import { motion } from "framer-motion";
import { FaStar } from "react-icons/fa";

const reviews = [
  {
    name: "John Doe",
    position: "CEO, Tech Innovators",
    review:
      "Weband transformed our business with a sleek and high-performing website. Their expertise in modern web technologies is top-notch!",
    image: "https://randomuser.me/api/portraits/men/32.jpg",
    rating: 5,
  },
  {
    name: "Sarah Johnson",
    position: "Founder, Startup X",
    review:
      "The team at Weband delivered an incredible mobile app that exceeded our expectations. Their UI/UX design skills are phenomenal!",
    image: "https://randomuser.me/api/portraits/women/45.jpg",
    rating: 5,
  },
  {
    name: "Michael Lee",
    position: "Manager, CloudSync",
    review:
      "We needed a robust e-commerce platform, and Weband built a scalable solution with seamless integration. Highly recommend!",
    image: "https://randomuser.me/api/portraits/men/50.jpg",
    rating: 5,
  },
  {
    name: "Jessica Brown",
    position: "CTO, FinTech Hub",
    review:
      "Their SEO services boosted our website traffic by 200%! Weband is a game-changer in the digital space.",
    image: "https://randomuser.me/api/portraits/women/60.jpg",
    rating: 5,
  },
  {
    name: "Michael Lee",
    position: "Manager, CloudSync",
    review:
      "We needed a robust e-commerce platform, and Weband built a scalable solution with seamless integration. Highly recommend!",
    image: "https://randomuser.me/api/portraits/men/50.jpg",
    rating: 5,
  },
  {
    name: "Sarah Johnson",
    position: "Founder, Startup X",
    review:
      "The team at Weband delivered an incredible mobile app that exceeded our expectations. Their UI/UX design skills are phenomenal!",
    image: "https://randomuser.me/api/portraits/women/45.jpg",
    rating: 5,
  },
  
];

const ReviewSection = () => {
  return (
    <section className="py-16 bg-gray-100">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-10 text-blue-600">
          What Our Clients Say
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {reviews.map((review, index) => (
            <motion.div
              key={index}
              className="bg-white shadow-lg rounded-xl p-6 flex flex-col items-center text-center transition-transform transform hover:scale-105"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.2 }}
              viewport={{ once: true }}
            >
              <img
                src={review.image}
                alt={review.name}
                className="w-20 h-20 rounded-full border-4 border-blue-500 mb-4"
              />
              <h3 className="text-lg font-semibold">{review.name}</h3>
              <p className="text-sm text-gray-500">{review.position}</p>
              <p className="text-gray-700 mt-4">{review.review}</p>
              <div className="flex mt-4">
                {Array.from({ length: review.rating }).map((_, i) => (
                  <FaStar key={i} className="text-yellow-400" />
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ReviewSection;
