
import React, { useState } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { GraduationCap, Calendar, Award } from 'lucide-react';

const educationData = [
  {
    degree: "Higher Secondary Education — Computer Science",
    school: "Lions Academy",
    years: "2022 - Present",
    description: `Pseudocode & Logic Building
    Hardware Fundamentals
    Software Systems
    Digital Mathematics 
    Database Basics`,
    icon: GraduationCap
  },
  {
    degree: "Diploma in Web Development (Completed - Certificate Pending)",
    school: "Aptech Learning",
    years: "2024 - Present",
    description: `Completed comprehensive web development program. 
    Skills Gained: HTML, CSS, JavaScript, PHP, MySQL, Bootstrap, UI/UX, Git`,
    icon: Award
  },
  {
    degree: "Full-Stack Web Development Diploma",
    school: "Aptech Learning",
    years: "2024 - 2025",
    description: "Hands-on training in both frontend (HTML, CSS, JavaScript, Bootstrap) and backend (PHP, MySQL) technologies with project-based learning approach.",
    icon: Calendar
  }
];

const EducationCard = ({ item, index }: { item: typeof educationData[0], index: number }) => {
  const [isHovered, setIsHovered] = useState(false);
  
  // Spotlight effect logic
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  function handleMouseMove({ currentTarget, clientX, clientY }: React.MouseEvent) {
    const { left, top } = currentTarget.getBoundingClientRect();
    mouseX.set(clientX - left);
    mouseY.set(clientY - top);
  }

  const isEven = index % 2 === 0;

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.8, delay: index * 0.2, ease: [0.21, 1.11, 0.81, 0.99] }}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={`relative flex flex-col md:flex-row items-center w-full mb-16 ${
        isEven ? 'md:flex-row-reverse' : ''
      }`}
    >
      {/* Timeline Dot with Glow Effect */}
      <div className="absolute left-0 md:left-1/2 w-4 h-4 transform -translate-x-1/2 z-10 hidden md:block">
        <motion.div 
          animate={{ 
            scale: isHovered ? 1.5 : 1,
            backgroundColor: isHovered ? "#22d3ee" : "#06b6d4",
            boxShadow: isHovered ? "0 0 20px #22d3ee" : "0 0 0px transparent"
          }}
          className="w-full h-full rounded-full border-4 border-[#030014]"
        />
      </div>

      <div className="w-full md:w-1/2 px-4 md:px-12">
        <motion.div
          whileHover={{ scale: 1.02, y: -5 }}
          transition={{ type: "spring", stiffness: 400, damping: 25 }}
          className="relative glass-card p-8 rounded-[32px] border border-white/5 overflow-hidden group"
        >
          {/* Spotlight Background */}
          <motion.div
            className="pointer-events-none absolute -inset-px rounded-[32px] opacity-0 group-hover:opacity-100 transition duration-300"
            style={{
              background: useTransform(
                [mouseX, mouseY],
                ([x, y]) => `radial-gradient(600px circle at ${x}px ${y}px, rgba(139, 92, 246, 0.15), transparent 40%)`
              ),
            }}
          />

          <div className="relative z-10">
            <div className="flex items-center gap-4 mb-6">
              <motion.div 
                animate={{ rotate: isHovered ? [0, -10, 10, 0] : 0 }}
                transition={{ duration: 0.5 }}
                className="p-3 bg-white/5 rounded-2xl border border-white/10"
              >
                <item.icon className="w-6 h-6 text-purple-400" />
              </motion.div>
              <div className="flex flex-col">
                <span className="text-cyan-400 font-mono text-[10px] tracking-[0.2em] uppercase">{item.years}</span>
                <motion.div 
                  initial={{ width: 0 }}
                  whileInView={{ width: "100%" }}
                  className="h-[1px] bg-gradient-to-r from-cyan-500 to-transparent mt-1" 
                />
              </div>
            </div>

            <h3 className="text-2xl font-bold font-space mb-2 text-white group-hover:text-cyan-400 transition-colors duration-300">
              {item.degree}
            </h3>
            <p className="text-gray-400 font-medium mb-4 text-sm tracking-wide">{item.school}</p>
            
            <motion.p 
              initial={{ opacity: 0.6 }}
              animate={{ opacity: isHovered ? 1 : 0.6 }}
              className="text-gray-500 text-sm leading-relaxed"
            >
              {item.description}
            </motion.p>
          </div>

          {/* Decorative Corner Glow */}
          <div className="absolute -bottom-10 -right-10 w-32 h-32 bg-purple-600/10 blur-3xl rounded-full group-hover:bg-purple-600/20 transition-all duration-500" />
        </motion.div>
      </div>

      {/* Spacer for the other side of the timeline */}
      <div className="hidden md:block md:w-1/2" />
    </motion.div>
  );
};

export const Education = () => {
  return (
    <section id="education" className="py-32 px-6 relative bg-gradient-to-b from-transparent via-purple-900/5 to-transparent">
      <div className="container mx-auto max-w-5xl">
        <div className="mb-24 text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="inline-block"
          >
            <p className="text-cyan-400 font-mono text-xs tracking-[0.4em] uppercase mb-4 px-4 py-1 border border-cyan-500/20 rounded-full bg-cyan-500/5">
              Intellectual Path
            </p>
          </motion.div>
          <h2 className="text-5xl md:text-7xl font-bold font-space tracking-tighter mt-4">
            ACADEMIC <span className="text-purple-500">VOYAGE</span>
          </h2>
        </div>

        <div className="relative">
          {/* Animated Timeline Line */}
          <div className="absolute left-0 md:left-1/2 top-0 bottom-0 w-[1px] transform -translate-x-1/2 hidden md:block overflow-hidden">
            <motion.div 
              initial={{ height: 0 }}
              whileInView={{ height: "100%" }}
              viewport={{ once: true }}
              transition={{ duration: 1.5, ease: "easeInOut" }}
              className="w-full bg-gradient-to-b from-purple-500 via-cyan-500 to-transparent shadow-[0_0_15px_rgba(34,211,238,0.3)]"
            />
          </div>

          <div className="space-y-4">
            {educationData.map((item, index) => (
              <EducationCard key={index} item={item} index={index} />
            ))}
          </div>
        </div>
        
        {/* Bottom Callout */}
        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          className="mt-20 text-center"
        >
          <p className="text-gray-500 font-mono text-[10px] tracking-[0.2em] uppercase">
            Continuous Learning & Adaptation
          </p>
        </motion.div>
      </div>
    </section>
  );
};
