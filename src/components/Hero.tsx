import React, { useEffect, useState, useRef } from 'react';
import { motion, AnimatePresence, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { gsap } from 'gsap';
import Spline from '@splinetool/react-spline';
import { ArrowUpRight, Target } from 'lucide-react';

// Advanced Button Component (Extracted)
const AdvancedButton = ({ children, primary = false, icon: Icon, subLabel = "OP_01" }: any) => {
  const btnRef = useRef<HTMLButtonElement>(null);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const x = useSpring(useMotionValue(0), { stiffness: 150, damping: 20 });
  const y = useSpring(useMotionValue(0), { stiffness: 150, damping: 20 });

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!btnRef.current) return;
    const rect = btnRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    x.set((e.clientX - centerX) * 0.2);
    y.set((e.clientY - centerY) * 0.2);
    mouseX.set(e.clientX - rect.left);
    mouseY.set(e.clientY - rect.top);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  const glowBackground = useTransform(
    [mouseX, mouseY],
    ([xVal, yVal]) => `radial-gradient(circle at ${xVal}px ${yVal}px, ${primary ? 'rgba(255,255,255,0.2)' : 'rgba(34,211,238,0.15)'}, transparent 70%)`
  );

  return (
    <motion.button
      ref={btnRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      whileTap={{ scale: 0.96 }}
      style={{ x, y }}
      className={`relative group px-8 py-4 rounded-sm overflow-visible transition-all duration-300 font-bold uppercase tracking-[0.25em] text-[10px] md:text-[12px] flex items-center justify-center gap-3 w-full sm:w-auto ${
        primary 
          ? 'bg-white text-black' 
          : 'bg-transparent text-white border-white/5 glass-card'
      }`}
    >
      {/* HUD Corner Brackets */}
      <div className="absolute -top-1 -left-1 w-2 h-2 border-t border-l border-white/40 group-hover:border-cyan-400 group-hover:-top-2 group-hover:-left-2 transition-all duration-300" />
      <div className="absolute -top-1 -right-1 w-2 h-2 border-t border-r border-white/40 group-hover:border-cyan-400 group-hover:-top-2 group-hover:-right-2 transition-all duration-300" />
      <div className="absolute -bottom-1 -left-1 w-2 h-2 border-b border-l border-white/40 group-hover:border-purple-500 group-hover:-bottom-2 group-hover:-left-2 transition-all duration-300" />
      <div className="absolute -bottom-1 -right-1 w-2 h-2 border-b border-r border-white/40 group-hover:border-purple-500 group-hover:-bottom-2 group-hover:-right-2 transition-all duration-300" />

      {/* Tiny Metadata Label */}
      <div className="absolute -bottom-6 right-0 opacity-0 group-hover:opacity-100 transition-opacity">
        <span className="text-[6px] font-mono text-cyan-400 tracking-[0.5em]">{subLabel}</span>
      </div>

      <motion.div 
        className="absolute inset-0 opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity duration-500"
        style={{ background: glowBackground }}
      />

      <span className="relative z-10 flex items-center gap-2">
        {children}
        {Icon && <Icon className="w-3.5 h-3.5 group-hover:rotate-12 transition-transform" />}
      </span>

      {/* Internal Glint Sweep */}
      <div className="absolute inset-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-[-100%] w-1/2 h-full bg-gradient-to-r from-transparent via-white/10 to-transparent skew-x-[-25deg] group-hover:animate-[sweep_1.5s_infinite]" />
      </div>
    </motion.button>
  );
};

export const Hero = () => {
  const [roleIndex, setRoleIndex] = useState(0);
  const [isModelLoaded, setIsModelLoaded] = useState(false);
  const roles = ["Web Developer", "Aptech Graduate", "Frontend Specialist", "Problem Solver"];

  useEffect(() => {
    const interval = setInterval(() => {
      setRoleIndex((prev) => (prev + 1) % roles.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    gsap.fromTo('.hero-text', 
      { opacity: 0, y: 100, filter: 'blur(20px)' }, 
      { opacity: 1, y: 0, filter: 'blur(0px)', duration: 1.5, stagger: 0.2, ease: "power4.out" }
    );
  }, []);

  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center px-4 md:px-6 overflow-hidden">
      <div className="container mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-center">
          
          {/* LEFT SIDE - TEXT CONTENT */}
          <div>
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1 }}
              className="mb-4 md:mb-6 inline-block py-2 px-3 md:px-4 rounded-full border border-white/10 glass-card text-xs md:text-sm text-cyan-400 font-mono tracking-widest uppercase"
            >
              ASPIRING WEB DEVELOPER | FRESH AND PASSIONATE
            </motion.div>
            
            <h1 className="hero-text text-4xl md:text-6xl lg:text-8xl font-bold font-space leading-[0.9] md:leading-[1] tracking-tighter mb-4 md:mb-6 bg-clip-text text-transparent bg-gradient-to-b from-white to-white/40">
              I'M <span className="text-purple-500">Abdul Ahad</span>. <br />
              CRAFTING <span className="italic font-light">FUTURE</span>.
            </h1>

            <div className="hero-text h-10 md:h-12 overflow-hidden mb-6 md:mb-8">
              <motion.p
                key={roleIndex}
                initial={{ y: 40, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: -40, opacity: 0 }}
                transition={{ duration: 0.5, ease: "circOut" }}
                className="text-lg md:text-2xl lg:text-3xl text-gray-400 font-light"
              >
                {roles[roleIndex]}
              </motion.p>
            </div>

            {/* About Me Lines */}
            <div className="hero-text max-w-xl mb-8 md:mb-12">
              <p className="text-gray-500 text-base md:text-lg leading-relaxed font-light">
                <span className="text-white font-medium">A passionate</span> web development student blending 
                <span className="text-white font-medium"> creativity </span> with <span className="text-white font-medium"> code </span>
                .Learning to build clean, functional websites with <span className="text-white font-medium"> modern tools. </span>
              </p>
            </div>

            {/* BUTTONS SECTION - Updated with Advanced Buttons */}
            <div className="hero-text flex flex-col sm:flex-row gap-4 md:gap-8 justify-start items-center w-full max-w-sm sm:max-w-none">
              <AdvancedButton primary icon={ArrowUpRight} subLabel="VIEW_PROJECTS">
                VIEW PROJECTS
              </AdvancedButton>
              
              <AdvancedButton icon={Target} subLabel="CONTACT_NOW">
                GET IN TOUCH
              </AdvancedButton>
            </div>
          </div>

          {/* RIGHT SIDE - SPLINE 3D MODEL */}
          <div className="h-[300px] md:h-[400px] lg:h-[500px]">
            {!isModelLoaded && (
              <div className="h-full flex items-center justify-center">
                <div className="text-center">
                  <div className="w-12 h-12 md:w-16 md:h-16 mx-auto mb-3 md:mb-4 rounded-full bg-gradient-to-r from-purple-500/20 to-cyan-500/20 flex items-center justify-center animate-pulse">
                    <span className="text-xl md:text-2xl">🎨</span>
                  </div>
                  <p className="text-xs md:text-sm text-gray-400 font-mono">Loading 3D Model</p>
                </div>
              </div>
            )}
            
            <Spline
              scene="https://prod.spline.design/R7Xes53XYu0eN0dT/scene.splinecode"
              onLoad={() => setIsModelLoaded(true)}
              className="w-full h-full"
            />
          </div>

        </div>
      </div>

      {/* Scroll Indicator */}
      <motion.div 
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        className="absolute bottom-6 md:bottom-10 left-1/2 -translate-x-1/2 text-white/30"
      >
        <div className="w-[1px] h-8 md:h-12 bg-gradient-to-b from-transparent via-white/30 to-transparent mx-auto" />
        <p className="text-[9px] md:text-[10px] mt-1.5 md:mt-2 font-mono tracking-widest uppercase">Scroll Down</p>
      </motion.div>

      {/* Add CSS for sweep animation */}
      <style jsx>{`
        @keyframes sweep {
          0% { left: -100%; }
          50% { left: 150%; }
          100% { left: 150%; }
        }
        
        .glass-card {
          backdrop-filter: blur(10px);
          background: rgba(255, 255, 255, 0.05);
        }
      `}</style>
    </section>
  );
};