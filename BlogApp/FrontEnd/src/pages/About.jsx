import React from "react";

const About = () => {
  return (
    <section className="bg-gray-100 py-12">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto">
          {/* About */}
          <h2 className="text-3xl font-bold text-gray-900 mb-4">About</h2>
          <p className="text-gray-700 text-lg mb-6">
            Hi, I'm Amit Kumar, a full-stack developer with a deep understanding
            of both front-end and back-end development. I am passionate about
            solving complex problems and building scalable, user-friendly
            applications.
          </p>

          {/* Technical Expertise */}
          <h3 className="text-2xl font-bold text-blue-600 mb-3">
            Technical Expertise:
          </h3>
          <p className="text-gray-700 mb-6">
            <strong>Front-End:</strong> Proficient in React.js, Tailwind CSS,
            HTML5, and CSS3 for creating intuitive, responsive user interfaces.{" "}
            <br />
            <strong>Back-End:</strong> Skilled in the MERN stack (MongoDB,
            Express.js, React.js, Node.js), with hands-on experience in
            full-stack development, API integration, and database management.{" "}
            <br />
            <strong>Programming:</strong> Completed a comprehensive Java course
            from Coding Ninjas 6 months ago, earning an excellent certificate. I
            have solved 200+ questions on LeetCode and 300+ questions on my
            college portal using Java, focusing on Data Structures and
            Algorithms (DSA). <br />
            <strong>Other Skills:</strong> Experienced in REST API testing,
            cPanel handling, and performance optimization.
          </p>

          {/* Professional Highlights */}
          <h3 className="text-2xl font-bold text-blue-600 mb-3">
            Professional Highlights:
          </h3>
          <p className="text-gray-700 mb-6">
            I have successfully developed and deployed multiple full-stack
            applications using the MERN stack, working efficiently to solve
            real-world problems and meet project deadlines. My continuous
            learning keeps me up-to-date with the latest technologies and trends
            in the industry.
          </p>

          {/* Personal Interests */}
          <h3 className="text-2xl font-bold text-blue-600 mb-3">
            Personal Interests and Inspiration:
          </h3>
          <p className="text-gray-700 mb-6">
            Outside of coding, I enjoy engaging in coding challenges and keeping
            up with the latest developments in technology. I’m also passionate
            about cricket, drawing inspiration from Virat Kohli's leadership and
            determination.
          </p>
        </div>
      </div>
    </section>
  );
};

export default About;
