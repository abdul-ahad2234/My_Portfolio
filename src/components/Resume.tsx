import React, { useState, useRef, useCallback, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Download, Eye, FileText, X, Sparkles, ChevronUp, ChevronDown } from 'lucide-react';

export const Resume = () => {
  const [showModal, setShowModal] = useState(false);
  const [scrollTop, setScrollTop] = useState(0);
  const modalContentRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const [magnetic, setMagnetic] = useState({ x: 0, y: 0 });
  const scrollTimeoutRef = useRef<NodeJS.Timeout>();

  // Simple scroll handler
  const handleScroll = useCallback(() => {
    if (!modalContentRef.current) return;
    setScrollTop(modalContentRef.current.scrollTop);
  }, []);

  useEffect(() => {
    const container = modalContentRef.current;
    if (container && showModal) {
      container.addEventListener('scroll', handleScroll, { passive: true });
      return () => container.removeEventListener('scroll', handleScroll);
    }
  }, [showModal, handleScroll]);

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

  // Scroll helper functions
  const scrollToTop = () => {
    if (modalContentRef.current) {
      modalContentRef.current.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const scrollToBottom = () => {
    if (modalContentRef.current) {
      modalContentRef.current.scrollTo({ 
        top: modalContentRef.current.scrollHeight, 
        behavior: 'smooth' 
      });
    }
  };

  // Cleanup
  useEffect(() => {
    return () => {
      if (scrollTimeoutRef.current) {
        clearTimeout(scrollTimeoutRef.current);
      }
    };
  }, []);

  return (
    <section id="resume" className="py-16 md:py-24 px-4 md:px-6">
      <div className="container mx-auto">
        <div className="glass-card p-8 md:p-12 lg:p-24 rounded-3xl md:rounded-[60px] relative overflow-hidden flex flex-col items-center text-center">
          <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-purple-600/5 to-cyan-500/5 pointer-events-none" />
          
          <motion.div 
            initial={{ scale: 0 }}
            whileInView={{ scale: 1 }}
            className="w-16 h-16 md:w-20 md:h-20 bg-white/5 rounded-2xl md:rounded-3xl flex items-center justify-center mb-6 md:mb-10 border border-white/10"
          >
            <FileText className="text-cyan-400 w-8 h-8 md:w-10 md:h-10" />
          </motion.div>

          <h2 className="text-3xl md:text-5xl lg:text-7xl font-bold font-space tracking-tighter mb-4 md:mb-6 leading-tight">
            READY TO <br />COLLABORATE?
          </h2>
          <p className="text-lg md:text-xl text-gray-400 max-w-2xl mb-8 md:mb-12 px-4">
            BEGINNING MY JOURNEY – OPEN TO INTERNSHIPS & LEARNING OPPORTUNITIES
          </p>

          <div className="flex flex-col sm:flex-row gap-4 md:gap-6 w-full max-w-md">
            <motion.button
              ref={buttonRef}
              onMouseMove={handleMouseMove}
              onMouseLeave={handleMouseLeave}
              animate={{ x: magnetic.x, y: magnetic.y }}
              transition={{ type: "spring", stiffness: 150, damping: 15 }}
              className="relative group px-8 md:px-12 py-4 md:py-5 bg-white text-black font-bold rounded-full overflow-hidden transition-all flex items-center justify-center gap-2 md:gap-3 shadow-[0_0_30px_rgba(255,255,255,0.2)] hover:shadow-[0_0_40px_rgba(255,255,255,0.3)]"
            >
              <span className="relative z-10 flex items-center gap-2">
                DOWNLOAD CV
                <Download size={18} />
              </span>
              <div className="absolute inset-0 bg-gradient-to-r from-purple-500 to-cyan-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </motion.button>

            <button 
              onClick={() => setShowModal(true)}
              className="px-8 md:px-12 py-4 md:py-5 border border-white/20 hover:border-white/40 rounded-full transition-all glass-card font-semibold flex items-center justify-center gap-2 md:gap-3 hover:bg-white/5"
            >
              PREVIEW
              <Eye size={18} />
            </button>
          </div>
        </div>
      </div>

      {/* SIMPLE MODAL without complex animations */}
      <AnimatePresence>
        {showModal && (
          <div 
            className="fixed inset-0 z-[1000] bg-black/90 backdrop-blur-xl flex items-center justify-center p-4 md:p-6"
            onClick={(e) => {
              if (e.target === e.currentTarget) setShowModal(false);
            }}
          >
            <div className="relative w-full max-w-4xl h-[90vh] md:h-[85vh] bg-[#0a0a1a] rounded-3xl md:rounded-[40px] overflow-hidden border border-white/10 flex flex-col">
              {/* Header */}
              <div className="p-4 md:p-6 border-b border-white/10 flex justify-between items-center bg-[#0a0a1a] sticky top-0 z-10">
                <div className="flex items-center gap-2 md:gap-3">
                  <div className="w-6 h-6 md:w-8 md:h-8 rounded-lg bg-purple-600 flex items-center justify-center">
                    <Sparkles size={14} className="text-white" />
                  </div>
                  <span className="font-space font-bold text-base md:text-lg tracking-tight text-white">
                    ABDUL AHAD - RESUME
                  </span>
                </div>
                <button 
                  onClick={() => setShowModal(false)}
                  className="w-8 h-8 md:w-10 md:h-10 rounded-full hover:bg-white/10 flex items-center justify-center transition-colors"
                  aria-label="Close modal"
                >
                  <X size={20} className="text-white" />
                </button>
              </div>

              {/* Simple Content Container with optimized scrolling */}
              <div 
                ref={modalContentRef}
                className="flex-1 overflow-y-auto p-4 md:p-6 lg:p-10 bg-[#0a0a1a]"
                style={{
                  scrollBehavior: 'smooth',
                  WebkitOverflowScrolling: 'touch',
                }}
              >
                <div className="max-w-2xl mx-auto space-y-8">
                  {/* Header Section */}
                  <div className="flex flex-col md:flex-row justify-between items-start border-b border-white/10 pb-6">
                    <div>
                      <h3 className="text-3xl md:text-4xl font-bold text-white">ABDUL AHAD</h3>
                      <p className="text-cyan-400 font-mono text-sm tracking-widest mt-2 uppercase">
                        ASPIRING FULL-STACK DEVELOPER
                      </p>
                      <p className="text-gray-400 text-sm mt-3">
                        Passionate web development graduate with full-stack training from Aptech Learning
                      </p>
                    </div>
                    <div className="text-right text-sm text-gray-500 space-y-1 mt-4 md:mt-0">
                      <p>Karachi, Pakistan</p>
                      <p>abdulahad22431@gmail.com</p>
                      <p>+92 336 5470130</p>
                    </div>
                  </div>

                  {/* Summary Section */}
                  <div className="space-y-3">
                    <h4 className="text-lg font-bold text-white border-l-4 border-purple-500 pl-4 uppercase tracking-widest">
                      Summary
                    </h4>
                    <p className="text-gray-400 leading-relaxed">
                      Aspiring web developer with comprehensive training in full-stack development from Aptech Learning. 
                      Proficient in HTML, CSS, JavaScript, PHP, MySQL, and modern web technologies. 
                      Seeking internship opportunities to apply skills and grow as a professional developer.
                    </p>
                  </div>

                  {/* Education Section - Simplified */}
                  <div className="space-y-4">
                    <h4 className="text-lg font-bold text-white border-l-4 border-cyan-500 pl-4 uppercase tracking-widest">
                      Education
                    </h4>
                    <div className="space-y-4">
                      <div className="bg-white/5 p-4 rounded-xl border border-white/10">
                        <div className="flex justify-between items-start">
                          <div>
                            <h5 className="font-bold text-white">Web Development Diploma (Full-Stack)</h5>
                            <p className="text-gray-400 text-sm mt-1">Aptech Learning • 2024 - 2025</p>
                          </div>
                        </div>
                        <p className="text-gray-400 text-sm mt-3">
                          HTML5, CSS3, JavaScript, PHP, MySQL, Bootstrap, Git/GitHub
                        </p>
                      </div>

                      <div className="bg-white/5 p-4 rounded-xl border border-white/10">
                        <div className="flex justify-between items-start">
                          <div>
                            <h5 className="font-bold text-white">Higher Secondary - Computer Science</h5>
                            <p className="text-gray-400 text-sm mt-1">Lions Academy • 2022 - Present</p>
                          </div>
                        </div>
                        <p className="text-gray-400 text-sm mt-3">
                          Programming Logic, Computer Systems, Database Basics
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Technical Skills - Simplified */}
                  <div className="space-y-4">
                    <h4 className="text-lg font-bold text-white border-l-4 border-green-500 pl-4 uppercase tracking-widest">
                      Technical Skills
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {["HTML5", "CSS3", "JavaScript", "PHP", "MySQL", "Bootstrap", "Git/GitHub", "Responsive Design"].map((skill) => (
                        <span key={skill} className="px-3 py-1 bg-purple-500/10 text-purple-300 rounded-full text-sm">
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Projects - Simplified */}
                  <div className="space-y-4">
                    <h4 className="text-lg font-bold text-white border-l-4 border-yellow-500 pl-4 uppercase tracking-widest">
                      Projects
                    </h4>
                    <div className="space-y-4">
                      <div className="bg-white/5 p-4 rounded-xl border border-white/10">
                        <h5 className="font-bold text-white">Medical Appointment System</h5>
                        <p className="text-gray-400 text-sm mt-2">
                          Full-stack PHP/MySQL platform for doctor appointments
                        </p>
                      </div>
                      
                      <div className="bg-white/5 p-4 rounded-xl border border-white/10">
                        <h5 className="font-bold text-white">E-commerce Website Template</h5>
                        <p className="text-gray-400 text-sm mt-2">
                          Frontend template with product catalog and shopping cart
                        </p>
                      </div>
                      
                      <div className="bg-white/5 p-4 rounded-xl border border-white/10">
                        <h5 className="font-bold text-white">Student Management System</h5>
                        <p className="text-gray-400 text-sm mt-2">
                          PHP/MySQL system for student records management
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Availability */}
                  <div className="bg-gradient-to-r from-purple-500/10 to-cyan-500/10 p-5 rounded-2xl border border-white/10">
                    <h4 className="text-lg font-bold text-white mb-3">Availability</h4>
                    <p className="text-gray-300">
                      Open to internships, junior developer roles, and freelance opportunities. 
                      Available for immediate start.
                    </p>
                  </div>
                </div>
              </div>

              {/* Simple Scroll Progress */}
              <div className="sticky bottom-0 left-0 right-0 h-1 bg-white/10">
                <div 
                  className="h-full bg-gradient-to-r from-purple-500 to-cyan-400"
                  style={{ 
                    width: modalContentRef.current ? 
                      `${(modalContentRef.current.scrollTop / (modalContentRef.current.scrollHeight - modalContentRef.current.clientHeight)) * 100}%` : '0%' 
                  }}
                />
              </div>

              {/* Scroll Buttons */}
              <div className="absolute right-4 bottom-20 flex flex-col gap-2">
                <button
                  onClick={scrollToTop}
                  className="w-10 h-10 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 flex items-center justify-center hover:bg-white/20 transition-colors"
                  aria-label="Scroll to top"
                >
                  <ChevronUp size={20} className="text-white" />
                </button>
                <button
                  onClick={scrollToBottom}
                  className="w-10 h-10 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 flex items-center justify-center hover:bg-white/20 transition-colors"
                  aria-label="Scroll to bottom"
                >
                  <ChevronDown size={20} className="text-white" />
                </button>
              </div>
            </div>
          </div>
        )}
      </AnimatePresence>

      {/* Optimized CSS */}
      <style jsx global>{`
        /* Optimize scrolling performance */
        .optimized-scroll {
          scroll-behavior: smooth;
          -webkit-overflow-scrolling: touch;
          transform: translateZ(0);
          backface-visibility: hidden;
          perspective: 1000px;
        }
        
        /* Simplify on mobile */
        @media (max-width: 768px) {
          .glass-card {
            backdrop-filter: none;
            background: rgba(10, 10, 26, 0.95) !important;
          }
        }
      `}</style>
    </section>
  );
};