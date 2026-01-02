
import React, { useState, useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Loader3D } from './components/Loader3D';
import { Hero } from './components/Hero';
import { About } from './components/About';
import { Skills } from './components/Skills';
import { Education } from './components/Education';
import { Projects } from './components/Projects';
import { Testimonials } from './components/Testimonials';
import { Resume } from './components/Resume';
import { Contact } from './components/Contact';
import { CustomCursor } from './components/CustomCursor';
import { Experience } from './components/Experience';
import { Navbar } from './components/Navbar';

const App: React.FC = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [isExiting, setIsExiting] = useState(false);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(timer);
          setIsExiting(true); // Trigger the loader's "flourish" animation
          setTimeout(() => setIsLoading(false), 1200); // Wait for flourish to complete
          return 100;
        }
        return prev + 1.5; 
      });
    }, 20);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="relative min-h-screen bg-[#030014] overflow-hidden">
      <AnimatePresence mode="wait">
        {isLoading ? (
          <motion.div
            key="loader"
            initial={{ opacity: 1 }}
            exit={{ 
              opacity: 0, 
              scale: 1.5, 
              filter: 'blur(20px)',
              transition: { duration: 1, ease: [0.76, 0, 0.24, 1] } 
            }}
            className="fixed inset-0 z-[100] bg-[#030014]"
          >
            <Loader3D progress={progress} isExiting={isExiting} />
          </motion.div>
        ) : (
          <motion.div
            key="content"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1.5, ease: "easeOut" }}
          >
            <CustomCursor />
            <Navbar />
            
            {/* Ambient Background Experience */}
            <div className="fixed inset-0 z-0">
              <Experience isIntro={true} />
            </div>

            <main className="relative z-10">
              <Hero />
              <About />
              <Skills />
              <Education />
              <Projects />
              <Testimonials />
              <Resume />
              <Contact />
            </main>
            
            <footer className="relative z-10 py-10 text-center text-gray-500 text-sm glass-card border-t border-white/5">
              <p>© 2024 Nova Portfolio. Crafted for the future.</p>
            </footer>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default App;



<div className="hero-text max-w-xl mb-8 md:mb-12">
              <p className="text-gray-500 text-base md:text-lg leading-relaxed font-light">
                A <span className="text-white font-medium">passionate</span> web development graduate from 
                <span className="text-white font-medium"> Aptech Learning</span> with hands-on training in 
                <span className="text-white font-medium"> full-stack development</span>. Currently pursuing 
                <span className="text-white font-medium"> Computer Science</span> at 
                <span className="text-white font-medium"> Lions Academy</span>. Skilled in 
                <span className="text-white font-medium"> HTML, CSS, JavaScript, PHP, MySQL</span> and 
                <span className="text-white font-medium"> modern web technologies</span>. Eager to apply my 
                knowledge to build <span className="text-white font-medium">clean, functional websites</span> 
                and contribute to real-world projects.
              </p>
            </div>

             