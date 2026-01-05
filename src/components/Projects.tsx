import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ExternalLink } from 'lucide-react';

const projects = [
  { id: 1, title: "MEDICAL APPOINTMENT SYSTEM", category: "Full-Stack Healthcare Platform", image: "/images/care.PNG", tags: ["PHP", "MySQL", "JavaScript", "Bootstrap", "CRUD"] },
  { id: 2, title: "CALCULATOR APP", category: "JavaScript Application", image: "/images/calculator.PNG", tags: ["JavaScript", "CSS", "DOM Manipulation"] },
  { id: 3, title: "ADMIN DASHBOARD", category: "UI/UX Design", image: "/images/dashboard.PNG", tags: ["HTML", "CSS", "JavaScript", "Charts"] },
  { id: 4, title: "E-COMMERCE WEBSITE", category: "Frontend Development", image: "/images/ecommerce.PNG", tags: ["HTML", "CSS", "JavaScript"] },
  { id: 5, title: "PASSWORD GENERATOR", category: "Utility Tool", image: "/images/passwordgenerator.PNG", tags: ["JavaScript", "CSS", "Security"] },
  { id: 6, title: "TO-DO LIST APP", category: "Productivity Tool", image: "/images/todolist.PNG", tags: ["JavaScript", "Local Storage", "CSS"] },
  { id: 7, title: "UNIVERSITY WEBSITE", category: "Educational Platform", image: "/images/universitywebsite.PNG", tags: ["HTML", "CSS", "JavaScript", "Responsive"] },
  { id: 8, title: "WEATHER APP", category: "API Integration", image: "/images/weather.PNG", tags: ["JavaScript", "API", "CSS", "Async"] }
];

const ProjectCard = ({ project }: any) => {
  const [rotate, setRotate] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = (e.clientY - rect.top) / rect.height - 0.5;
    const y = (e.clientX - rect.left) / rect.width - 0.5;
    setRotate({ x: x * 10, y: -y * 10 });
  };

  const handleMouseLeave = () => {
    setRotate({ x: 0, y: 0 });
    setIsHovered(false);
  };

  return (
    <motion.div
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      style={{
        perspective: 1000,
        rotateX: rotate.x,
        rotateY: rotate.y,
        transition: "all 0.1s ease-out"
      }}
      className="relative group cursor-pointer"
    >
      <div className="relative glass-card rounded-2xl overflow-hidden aspect-square border border-white/10 group-hover:border-white/30 transition-all duration-500">
        <img 
          src={project.image} 
          alt={project.title} 
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 group-hover:blur-[2px]" 
        />

        <div className="absolute inset-0 bg-gradient-to-t from-[#030014]/90 via-[#030014]/40 to-transparent sm:opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex flex-col justify-end p-6">
          <motion.div
             initial={{ y: 20, opacity: 0 }}
             animate={{ y: isHovered ? 0 : 20, opacity: isHovered ? 1 : 0 }}
             className="w-full"
          >
            {/* Title - Left aligned with proper size */}
            <div className="text-left mb-2">
              <h3 className="text-xl font-bold font-space text-white leading-tight">
                {project.title}
              </h3>
            </div>
            
            {/* Category - Left aligned */}
            <p className="text-cyan-400 font-mono text-[9px] mb-4 tracking-[0.2em] uppercase text-left">
              {project.category}
            </p>
            
            {/* Tags - Left aligned */}
            <div className="flex gap-1.5 flex-wrap justify-start">
              {project.tags.map((tag: string) => (
                <span key={tag} className="px-2.5 py-0.5 bg-white/10 text-white/70 text-[8px] font-mono rounded-full backdrop-blur-md border border-white/5">
                  {tag}
                </span>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
};

export const Projects = () => {
  return (
    <section id="work" className="py-24 px-4 md:px-6 relative">
      {/* Background Decorative Element */}
      <div className="absolute top-1/4 -right-24 w-96 h-96 bg-purple-600/5 blur-[120px] rounded-full pointer-events-none" />
      
      <div className="container mx-auto">
        <div className="mb-12 md:mb-20 flex flex-col md:flex-row justify-between items-start md:items-end border-b border-white/10 pb-8 md:pb-10 gap-6">
          <div className="text-left">
            <motion.p 
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              className="text-cyan-400 font-mono text-xs tracking-[0.3em] mb-4 uppercase"
            >
              Portfolio Matrix
            </motion.p>
            <h2 className="text-4xl sm:text-5xl md:text-7xl font-bold font-space tracking-tight leading-none uppercase text-left">
              CRAFTED <br/><span className="bg-clip-text text-transparent bg-gradient-to-r from-white to-white/40 italic">PIXELS</span>
            </h2>
          </div>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="w-full sm:w-auto flex flex-col items-end gap-4"
          >
            <p className="text-gray-500 font-mono text-[10px] hidden md:block tracking-widest">FILTER: ALL_PROJECTS // ACTIVE</p>
            <motion.button 
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="w-full sm:w-auto px-8 py-3 glass-card rounded-full text-white/70 hover:text-white transition-all text-sm font-semibold hover:bg-white/10 border border-white/10 flex items-center justify-center gap-2"
            >
              VIEW REPOSITORY
              <ExternalLink size={14} />
            </motion.button>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
          {projects.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>
        
        {/* Decorative Grid Line */}
        <div className="mt-20 h-px w-full bg-gradient-to-r from-transparent via-white/5 to-transparent" />
      </div>
    </section>
  );
};