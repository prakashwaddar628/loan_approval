'use client';

import Navbar from '@/components/Navbar';
import { motion, useScroll, useTransform } from 'framer-motion';
import Image from 'next/image';
import { useEffect, useRef } from 'react';

const developersData = [
  {
    name: 'Melsita Mendonca',
    role: 'Team Leader | Backend Developer',
    moto: 'Unlocking potential through intelligent technology.',
    imageUrl: '/images/melsita.jpg',
  },
  {
    name: 'Prakash Waddar',
    role: 'Full Stack Developer',
    moto: 'Building intelligent systems that learn and predict.',
    imageUrl: '/images/prakash.jpg',
  },
  {
    name: 'Raksha P',
    role: 'Frontend Lead',
    moto: 'Building foundation for data driven innovation.',
    imageUrl: '/images/raksha.jpg',
  },
];

const developerVariants = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.5, delay: 0.2, ease: "easeInOut" } },
};

const titleVariants = {
  initial: { opacity: 0, y: -30 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.7, ease: "easeOut" } },
};

const sectionVariants = {
  initial: { opacity: 0 },
  animate: { opacity: 1, transition: { duration: 0.8, delay: 0.2, ease: "easeOut" } },
};

const footerVariants = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.6, delay: 0.4, ease: "easeInOut" } },
};

export default function About() {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const titleParallax = useTransform(scrollYProgress, [0, 1], [-20, 20]);
  const teamParallax = useTransform(scrollYProgress, [0.2, 0.8], [30, -30]);
  const footerParallax = useTransform(scrollYProgress, [0.5, 1], [-10, 10]);

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-100 to-gray-200" ref={containerRef}>
      <Navbar />
      <div className="max-w-5xl mx-auto px-6 py-16">
        <motion.h1
          style={{ y: titleParallax }}
          variants={titleVariants}
          initial="initial"
          animate="animate"
          className="text-4xl font-bold mb-10 text-center text-blue-700 animate-pulse"
        >
          About Our Innovative Project
        </motion.h1>
        <motion.section
          variants={sectionVariants}
          initial="initial"
          animate="animate"
          className="mb-16 text-lg text-gray-700 space-y-8"
        >
          <p className="leading-relaxed">
            Our project represents a significant leap forward in <strong className="text-blue-600">AI-powered Loan Approval Prediction Technology</strong>.
            We leverage cutting-edge machine learning algorithms to provide financial institutions with a more accurate and efficient way to assess loan applications, ultimately leading to faster decisions and reduced risk.
          </p>
          <p className="leading-relaxed">
            The core of our system lies in its ability to seamlessly integrate sophisticated backend analytics with an intuitive and user-friendly frontend interface. This synergy ensures transparency and empowers users with real-time predictive insights. Our scalable architecture is designed to adapt to evolving data landscapes and future advancements in artificial intelligence.
          </p>
          <p className="leading-relaxed">
            Driven by a shared vision to revolutionize the finance industry, this project is the result of a dedicated collaboration among three passionate developers. We are committed to building solutions that not only enhance efficiency but also promote fairness and accessibility in financial services.
          </p>
        </motion.section>
        <section className="mb-16">
          <motion.h2
            style={{ y: teamParallax }}
            className="text-3xl font-semibold mb-8 text-gray-800"
          >
            Meet the Visionaries Behind the Code
          </motion.h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            {developersData.map((developer, index) => (
              <motion.div
                key={index}
                variants={developerVariants}
                initial="initial"
                animate="animate"
                transition={{ delay: 0.4 + index * 0.2, ease: "easeInOut" }}
                className="bg-white p-8 rounded-xl shadow-md text-center hover:shadow-lg transition-shadow duration-300"
              >
                <div className="w-24 h-24 mx-auto rounded-full mb-6 overflow-hidden relative group">
                  <Image src={developer.imageUrl} alt={developer.name} layout="fill" objectFit="cover" className="rounded-full transition-transform duration-300 group-hover:scale-105" />
                  <div className="absolute inset-0 rounded-full border-4 border-blue-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300 animate-pulse"></div>
                </div>
                <h3 className="text-xl font-bold text-gray-800">{developer.name}</h3>
                <p className="text-sm text-blue-600 font-semibold mb-2">{developer.role}</p>
                <p className="text-xs italic text-gray-500 leading-relaxed">
                  "{developer.moto}"
                </p>
              </motion.div>
            ))}
          </div>
        </section>
        
      </div>
    </div>
  );
}