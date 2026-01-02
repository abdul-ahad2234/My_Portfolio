
import React, { useRef, useState } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { 
  Code2, 
  Palette, 
  Zap, 
  Server, 
  Database, 
  Layout, 
  Layers, 
  FileCode, 
  Braces, 
  GitBranch 
} from 'lucide-react';

const SkillCard = ({ icon: Icon, title, progress, color }: any) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);

  // 3D Tilt Values
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseXSpring = useSpring(x);
  const mouseYSpring = useSpring(y);

  // Parallax transformations
  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["15deg", "-15deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-15deg", "15deg"]);
  
  // Icon Parallax (floats higher)
  const iconX = useTransform(mouseXSpring, [-0.5, 0.5], ["-10px", "10px"]);
  const iconY = useTransform(mouseYSpring, [-0.5, 0.5], ["-10px", "10px"]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;

    const xPct = mouseX / width - 0.5;
    const yPct = mouseY / height - 0.5;

    x.set(xPct);
    y.set(yPct);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
    setIsHovered(false);
  };

  return (
    <motion.div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
      initial={{ opacity: 0, rotateX: 45, y: 50 }}
      whileInView={{ opacity: 1, rotateX: 0, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      style={{
        perspective: 1000,
      }}
      className="relative"
    >
      <motion.div
        style={{
          rotateX,
          rotateY,
          transformStyle: "preserve-3d",
        }}
        className="glass-card p-10 rounded-[32px] relative group overflow-hidden border border-white/5 hover:border-white/20 transition-colors duration-500"
      >
        {/* Dynamic Sheen / Lighting Effect */}
        <motion.div
          className="pointer-events-none absolute -inset-px opacity-0 group-hover:opacity-100 transition-opacity duration-500"
          style={{
            background: useTransform(
              [x, y],
              ([xVal, yVal]) => {
                const xPos = (xVal as number + 0.5) * 100;
                const yPos = (yVal as number + 0.5) * 100;
                return `radial-gradient(circle at ${xPos}% ${yPos}%, rgba(255,255,255,0.1), transparent 60%)`;
              }
            ),
          }}
        />

        {/* Floating Background Glow */}
        <div 
          className="absolute -right-8 -top-8 w-32 h-32 blur-[60px] opacity-10 group-hover:opacity-40 transition-opacity duration-700" 
          style={{ backgroundColor: color }} 
        />

        {/* Content with Depth */}
        <div style={{ transform: "translateZ(50px)", transformStyle: "preserve-3d" }}>
          <motion.div 
            style={{ x: iconX, y: iconY }}
            className="inline-block relative mb-8"
          >
            <div 
              className="absolute inset-0 blur-xl opacity-20 group-hover:opacity-50 transition-opacity" 
              style={{ backgroundColor: color }} 
            />
            <Icon className="w-14 h-14 relative z-10" style={{ color }} />
          </motion.div>

          <h3 className="text-2xl font-bold mb-6 font-space tracking-tight text-white group-hover:text-cyan-400 transition-colors">
            {title}
          </h3>
          
          <div className="space-y-3">
            <div className="flex justify-between items-end">
              <span className="text-[10px] text-gray-500 font-mono tracking-[0.2em] uppercase">Status: Optimal</span>
              <span className="text-lg font-bold font-mono" style={{ color }}>{progress}%</span>
            </div>
            
            <div className="w-full h-2 bg-white/5 rounded-full overflow-hidden relative border border-white/5">
              <motion.div 
                initial={{ width: 0 }}
                whileInView={{ width: `${progress}%` }}
                viewport={{ once: true }}
                transition={{ duration: 2, ease: "circOut" }}
                className="h-full rounded-full relative"
                style={{ backgroundColor: color }}
              >
                {/* Holographic Scanning Effect */}
                <motion.div
                  animate={{ x: ["-100%", "200%"] }}
                  transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                  className="absolute inset-y-0 w-20 bg-gradient-to-r from-transparent via-white/40 to-transparent skew-x-12"
                />
              </motion.div>
            </div>
          </div>
        </div>

        {/* Decorative Grid Pattern Overlay */}
        <div className="absolute inset-0 opacity-[0.03] pointer-events-none group-hover:opacity-[0.05] transition-opacity" 
          style={{ backgroundImage: `radial-gradient(${color} 0.5px, transparent 0.5px)`, backgroundSize: '10px 10px' }} 
        />
      </motion.div>
    </motion.div>
  );
};

export const Skills = () => {
  const skills = [
    { icon: Code2, title: "HTML", progress: 90, color: "#E34F26" },
    { icon: Palette, title: "CSS", progress: 85, color: "#1572B6" },
    { icon: Zap, title: "JavaScript", progress: 70, color: "#F7DF1E" },
    { icon: Server, title: "PHP", progress: 60, color: "#777BB4" },
    { icon: Database, title: "MySQL", progress: 65, color: "#4479A1" },
    { icon: Layout, title: "Bootstrap", progress: 80, color: "#7952B3" },
    { icon: Layers, title: "UI UX Design", progress: 75, color: "#FF61F6" },
    { icon: FileCode, title: "XML", progress: 75, color: "#FF9800" },
    { icon: Braces, title: "JSON", progress: 80, color: "#E0E0E0" },
    { icon: GitBranch, title: "Git/GitHub", progress: 70, color: "#F05032" },
  ];

  return (
    <section id="skills" className="py-32 px-6 relative overflow-hidden">
      {/* Background Decorative Element */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-purple-600/5 blur-[120px] rounded-full pointer-events-none" />
      
      <div className="container mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-end mb-24 gap-8">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="max-w-2xl"
          >
            <p className="text-cyan-400 font-mono text-xs tracking-[0.4em] uppercase mb-4">Competency Matrix</p>
            <h2 className="text-6xl md:text-8xl font-bold font-space tracking-tighter leading-none">
              TECHNICAL <br />
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-500 to-cyan-400">
                CORE
              </span>
            </h2>
          </motion.div>
          <motion.p 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            className="text-gray-500 max-w-xs text-sm leading-relaxed border-l border-white/10 pl-6 hidden md:block"
          >
            CORE TECHNOLOGIES
            HTML5, CSS3, JavaScript ES6

            BACKEND SKILLS
            PHP, MySQL, Basic APIs

            FRAMEWORKS & TOOLS
            Bootstrap, Git, VS Code

            DEVELOPMENT PRINCIPLES
            Mobile-First, Clean Code, SEO Basics
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {skills.map((skill, idx) => (
            <SkillCard key={idx} {...skill} />
          ))}
        </div>

        {/* Bottom Decorative Line */}
        <motion.div 
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.5, delay: 0.5 }}
          className="h-[1px] w-full bg-gradient-to-r from-transparent via-white/10 to-transparent mt-32" 
        />
      </div>
    </section>
  );
};
