
import React from 'react';
import { motion } from 'framer-motion';
import logo from '../logo.png';  

export const About = () => {
  return (
    <section id="about" className="py-24 px-6 overflow-hidden">
      <div className="container mx-auto grid md:grid-cols-2 gap-16 items-center">
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-4xl md:text-6xl font-bold font-space mb-8 bg-clip-text text-transparent bg-gradient-to-r from-purple-500 to-cyan-400">
            Designing Experiences,<br /> Not Just Interfaces.
          </h2>
          <p className="text-xl text-gray-400 leading-relaxed mb-6">
            Currently honing my skills in web development through hands-on learning at Aptech. Passionate about creating clean, functional websites and eager to apply my knowledge in real-world projects.
          </p>
          <div className="grid grid-cols-2 gap-8 mt-12">
            <div>
              <h3 className="text-3xl font-bold font-space text-white">5+</h3>
              <p className="text-gray-500 text-sm">Academic & Practice Projects</p>
            </div>
            <div>
              <h3 className="text-3xl font-bold font-space text-white">0 Design Awards</h3>
              <p className="text-gray-500 text-sm">Currently Learning & Building</p>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
          className="relative group"
        >
          <div className="absolute -inset-4 bg-gradient-to-r from-purple-600 to-cyan-600 rounded-3xl blur-2xl opacity-20 group-hover:opacity-40 transition-opacity" />
          <div className="relative glass-card p-2 rounded-3xl overflow-hidden aspect-square flex items-center justify-center">
            <img 
              src={logo}
              alt="Profile" 
              className="w-full h-full object-cover rounded-2xl grayscale group-hover:grayscale-0 transition-all duration-700 hover:scale-105" 
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#030014] to-transparent opacity-60" />
            <div className="absolute bottom-8 left-8">
              <span className="text-white text-2xl font-bold font-space">AA</span>
              <p className="text-gray-400 text-sm">Web Developer</p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
    
  );
};
