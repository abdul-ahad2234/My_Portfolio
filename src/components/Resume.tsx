import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Download, Eye, FileText, X, Sparkles } from 'lucide-react';

export const Resume = () => {
  const [showModal, setShowModal] = useState(false);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const [magnetic, setMagnetic] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!buttonRef.current) return;
    const rect = buttonRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    const distanceX = e.clientX - centerX;
    const distanceY = e.clientY - centerY;
    
    setMagnetic({ x: distanceX * 0.3, y: distanceY * 0.3 });
  };

  const handleMouseLeave = () => {
    setMagnetic({ x: 0, y: 0 });
  };

  return (
    <section id="resume" className="py-24 px-6">
      <div className="container mx-auto">
        <div className="glass-card p-12 md:p-24 rounded-[60px] relative overflow-hidden flex flex-col items-center text-center">
          <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-purple-600/5 to-cyan-500/5 pointer-events-none" />
          
          <motion.div 
            initial={{ scale: 0 }}
            whileInView={{ scale: 1 }}
            className="w-20 h-20 bg-white/5 rounded-3xl flex items-center justify-center mb-10 border border-white/10"
          >
            <FileText className="text-cyan-400 w-10 h-10" />
          </motion.div>

          <h2 className="text-4xl md:text-7xl font-bold font-space tracking-tighter mb-6">READY TO <br />COLLABORATE?</h2>
          <p className="text-xl text-gray-400 max-w-2xl mb-12">
            BEGINNING MY JOURNEY – OPEN TO INTERNSHIPS & LEARNING OPPORTUNITIES
          </p>

          <div className="flex flex-col md:flex-row gap-6">
            <motion.button
              ref={buttonRef}
              onMouseMove={handleMouseMove}
              onMouseLeave={handleMouseLeave}
              animate={{ x: magnetic.x, y: magnetic.y }}
              transition={{ type: "spring", stiffness: 150, damping: 15 }}
              className="relative group px-12 py-5 bg-white text-black font-bold rounded-full overflow-hidden transition-all flex items-center gap-3 shadow-[0_0_30px_rgba(255,255,255,0.2)]"
            >
              <span className="relative z-10 flex items-center gap-2">
                DOWNLOAD CV
                <Download size={20} />
              </span>
              <div className="absolute inset-0 bg-gradient-to-r from-purple-500 to-cyan-400 opacity-0 group-hover:opacity-100 transition-opacity" />
            </motion.button>

            <button 
              onClick={() => setShowModal(true)}
              className="px-12 py-5 border border-white/20 hover:border-white rounded-full transition-all glass-card font-semibold flex items-center gap-3"
            >
              PREVIEW
              <Eye size={20} />
            </button>
          </div>
        </div>
      </div>

      {/* Preview Modal */}
      <AnimatePresence>
        {showModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[1000] flex items-center justify-center p-6 bg-black/90 backdrop-blur-xl"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0, y: 50 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 50 }}
              className="relative w-full max-w-4xl h-[85vh] glass-card rounded-[40px] overflow-hidden border border-white/10 flex flex-col shadow-2xl"
            >
              <div className="p-6 border-b border-white/10 flex justify-between items-center bg-white/5">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-purple-600 flex items-center justify-center">
                    <Sparkles size={16} className="text-white" />
                  </div>
                  <span className="font-space font-bold text-lg tracking-tight">ABDUL AHAD - RESUME</span>
                </div>
                <button 
                  onClick={() => setShowModal(false)}
                  className="w-10 h-10 rounded-full hover:bg-white/10 flex items-center justify-center transition-colors"
                >
                  <X size={24} />
                </button>
              </div>

              <div className="flex-1 overflow-y-auto p-10 bg-white/[0.02]">
                <div className="space-y-12 max-w-2xl mx-auto">
                  {/* Header Section */}
                  <div className="flex flex-col md:flex-row justify-between items-start border-b border-white/10 pb-8">
                    <div>
                      <h3 className="text-4xl font-bold font-space">ABDUL AHAD</h3>
                      <p className="text-cyan-400 font-mono text-sm tracking-widest mt-2 uppercase">ASPIRING FULL-STACK DEVELOPER</p>
                      <p className="text-gray-400 text-sm mt-4">Passionate web development graduate with full-stack training from Aptech Learning</p>
                    </div>
                    <div className="text-right text-sm text-gray-500 space-y-1 mt-4 md:mt-0">
                      <p>Karachi, Pakistan</p>
                      <p>abdulahad22431@gmail.com</p>
                      <p>+92 336 5470130</p>
                    </div>
                  </div>

                  {/* Summary Section */}
                  <div className="space-y-4">
                    <h4 className="text-lg font-bold font-space border-l-4 border-purple-500 pl-4 uppercase tracking-widest">Summary</h4>
                    <p className="text-gray-400 leading-relaxed">
                      Aspiring web developer with comprehensive training in full-stack development from Aptech Learning. 
                      Proficient in HTML, CSS, JavaScript, PHP, MySQL, and modern web technologies. 
                      Passionate about creating clean, functional websites and eager to contribute to real-world projects. 
                      Seeking internship opportunities to apply skills and grow as a professional developer.
                    </p>
                  </div>

                  {/* Education Section */}
                  <div className="space-y-6">
                    <h4 className="text-lg font-bold font-space border-l-4 border-cyan-500 pl-4 uppercase tracking-widest">Education</h4>
                    <div className="space-y-6">
                      <div className="bg-white/5 p-6 rounded-2xl border border-white/10">
                        <div className="flex justify-between items-start">
                          <div>
                            <h5 className="font-bold text-white text-lg">Web Development Diploma (Full-Stack)</h5>
                            <p className="text-gray-400 text-sm mt-1">Aptech Learning</p>
                          </div>
                          <span className="text-xs font-mono text-cyan-400 px-3 py-1 bg-cyan-400/10 rounded-full">2024 - 2025</span>
                        </div>
                        <ul className="mt-4 text-sm text-gray-400 space-y-2">
                          <li className="flex items-start gap-2">
                            <span className="text-purple-400 mt-1">•</span>
                            Comprehensive training in HTML5, CSS3, JavaScript (ES6+)
                          </li>
                          <li className="flex items-start gap-2">
                            <span className="text-purple-400 mt-1">•</span>
                            Backend development with PHP & MySQL database integration
                          </li>
                          <li className="flex items-start gap-2">
                            <span className="text-purple-400 mt-1">•</span>
                            Responsive design with Bootstrap framework
                          </li>
                          <li className="flex items-start gap-2">
                            <span className="text-purple-400 mt-1">•</span>
                            Version control with Git & GitHub
                          </li>
                        </ul>
                      </div>

                      <div className="bg-white/5 p-6 rounded-2xl border border-white/10">
                        <div className="flex justify-between items-start">
                          <div>
                            <h5 className="font-bold text-white text-lg">Higher Secondary - Computer Science</h5>
                            <p className="text-gray-400 text-sm mt-1">Lions Academy</p>
                          </div>
                          <span className="text-xs font-mono text-cyan-400 px-3 py-1 bg-cyan-400/10 rounded-full">2022 - Present</span>
                        </div>
                        <ul className="mt-4 text-sm text-gray-400 space-y-2">
                          <li className="flex items-start gap-2">
                            <span className="text-purple-400 mt-1">•</span>
                            Programming Logic & Pseudocode development
                          </li>
                          <li className="flex items-start gap-2">
                            <span className="text-purple-400 mt-1">•</span>
                            Computer Hardware & Software Systems
                          </li>
                          <li className="flex items-start gap-2">
                            <span className="text-purple-400 mt-1">•</span>
                            Digital Mathematics & Database Basics
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>

                  {/* Technical Skills */}
                  <div className="space-y-6">
                    <h4 className="text-lg font-bold font-space border-l-4 border-green-500 pl-4 uppercase tracking-widest">Technical Skills</h4>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                      {[
                        { name: "HTML5", level: "Advanced" },
                        { name: "CSS3", level: "Advanced" },
                        { name: "JavaScript", level: "Intermediate" },
                        { name: "PHP", level: "Intermediate" },
                        { name: "MySQL", level: "Intermediate" },
                        { name: "Bootstrap", level: "Advanced" },
                        { name: "Git/GitHub", level: "Intermediate" },
                        { name: "Responsive Design", level: "Advanced" },
                        { name: "UI/UX Principles", level: "Intermediate" }
                      ].map((skill, index) => (
                        <div key={index} className="bg-white/5 p-4 rounded-xl border border-white/10">
                          <div className="flex justify-between items-center">
                            <span className="text-white font-medium">{skill.name}</span>
                            <span className="text-xs px-2 py-1 rounded-full bg-purple-400/20 text-purple-300">
                              {skill.level}
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Projects Section */}
                  <div className="space-y-6">
                    <h4 className="text-lg font-bold font-space border-l-4 border-yellow-500 pl-4 uppercase tracking-widest">Projects</h4>
                    <div className="space-y-6">
                      {/* Medical Appointment System */}
                      <div className="bg-white/5 p-6 rounded-2xl border border-white/10">
                        <div className="flex justify-between items-start">
                          <h5 className="font-bold text-white text-lg">MEDICAL APPOINTMENT SYSTEM</h5>
                          <span className="text-xs font-mono text-cyan-400 px-3 py-1 bg-cyan-400/10 rounded-full">Full-Stack</span>
                        </div>
                        <ul className="mt-4 text-sm text-gray-400 space-y-2">
                          <li className="flex items-start gap-2">
                            <span className="text-green-400 mt-1">•</span>
                            Multi-specialty doctor appointment booking platform
                          </li>
                          <li className="flex items-start gap-2">
                            <span className="text-green-400 mt-1">•</span>
                            PHP/MySQL backend with CRUD operations
                          </li>
                          <li className="flex items-start gap-2">
                            <span className="text-green-400 mt-1">•</span>
                            Responsive Bootstrap frontend with patient/doctor dashboards
                          </li>
                        </ul>
                      </div>

                      {/* E-commerce Template */}
                      <div className="bg-white/5 p-6 rounded-2xl border border-white/10">
                        <div className="flex justify-between items-start">
                          <h5 className="font-bold text-white text-lg">E-COMMERCE WEBSITE TEMPLATE</h5>
                          <span className="text-xs font-mono text-purple-400 px-3 py-1 bg-purple-400/10 rounded-full">Frontend</span>
                        </div>
                        <ul className="mt-4 text-sm text-gray-400 space-y-2">
                          <li className="flex items-start gap-2">
                            <span className="text-green-400 mt-1">•</span>
                            Product catalog with shopping cart functionality
                          </li>
                          <li className="flex items-start gap-2">
                            <span className="text-green-400 mt-1">•</span>
                            Responsive design using Bootstrap framework
                          </li>
                          <li className="flex items-start gap-2">
                            <span className="text-green-400 mt-1">•</span>
                            JavaScript for dynamic content and user interactions
                          </li>
                        </ul>
                      </div>

                      {/* Student Management System */}
                      <div className="bg-white/5 p-6 rounded-2xl border border-white/10">
                        <div className="flex justify-between items-start">
                          <h5 className="font-bold text-white text-lg">STUDENT MANAGEMENT SYSTEM</h5>
                          <span className="text-xs font-mono text-cyan-400 px-3 py-1 bg-cyan-400/10 rounded-full">PHP/MySQL</span>
                        </div>
                        <ul className="mt-4 text-sm text-gray-400 space-y-2">
                          <li className="flex items-start gap-2">
                            <span className="text-green-400 mt-1">•</span>
                            CRUD operations for student records management
                          </li>
                          <li className="flex items-start gap-2">
                            <span className="text-green-400 mt-1">•</span>
                            Form validation and session handling
                          </li>
                          <li className="flex items-start gap-2">
                            <span className="text-green-400 mt-1">•</span>
                            Database integration with MySQL
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>

                  {/* Availability */}
                  <div className="bg-gradient-to-r from-purple-500/10 to-cyan-500/10 p-6 rounded-2xl border border-white/10">
                    <h4 className="text-lg font-bold font-space text-white mb-3">Availability</h4>
                    <p className="text-gray-300">
                      Open to internships, junior developer roles, and freelance opportunities. Ready to contribute, learn, 
                      and grow within a professional team environment. Available for immediate start.
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};