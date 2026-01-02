
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';

export const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { label: 'HOME', href: '#home' },
    { label: 'ABOUT', href: '#about' },
    { label: 'EDU', href: '#education' },
    { label: 'WORK', href: '#work' },
    { label: 'CLIENTS', href: '#testimonials' },
    { label: 'CONTACT', href: '#contact' },
  ];

  return (
    <nav className={`fixed top-0 left-0 w-full z-[100] transition-all duration-500 ${scrolled ? 'py-3 md:py-4' : 'py-6 md:py-8'}`}>
      <div className="container mx-auto px-4 md:px-6 flex justify-between items-center">
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="text-xl md:text-2xl font-bold font-space tracking-tighter z-[110]"
        >
          Abdul<span className="text-purple-500"> Ahad</span>.
        </motion.div>

        {/* Desktop Navigation */}
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className={`hidden lg:flex gap-6 xl:gap-10 items-center px-8 py-3 rounded-full transition-all border ${scrolled ? 'glass-card border-white/10 bg-black/40 shadow-2xl scale-95' : 'border-transparent'}`}
        >
          {navItems.map((item) => (
            <a 
              key={item.label} 
              href={item.href} 
              className="text-[10px] font-mono tracking-[0.2em] text-gray-400 hover:text-white transition-colors"
            >
              {item.label}
            </a>
          ))}
        </motion.div>

        <div className="flex items-center gap-4">
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="hidden sm:block"
          >
            <a href="#resume" className="px-5 md:px-6 py-2 bg-white text-black text-[10px] md:text-xs font-bold rounded-full transition-transform hover:scale-105 active:scale-95 inline-block">
              RESUME
            </a>
          </motion.div>

          {/* Mobile Menu Toggle */}
          <button 
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden w-10 h-10 flex items-center justify-center rounded-full glass-card border border-white/10 z-[110]"
          >
            {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed inset-0 z-[105] bg-[#030014]/95 backdrop-blur-2xl lg:hidden flex flex-col items-center justify-center pt-20"
          >
            <div className="flex flex-col items-center gap-8">
              {navItems.map((item, idx) => (
                <motion.a
                  key={item.label}
                  href={item.href}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.05 }}
                  onClick={() => setMobileMenuOpen(false)}
                  className="text-2xl font-bold font-space tracking-tighter text-white hover:text-purple-500 transition-colors"
                >
                  {item.label}
                </motion.a>
              ))}
              <motion.a
                href="#resume"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                onClick={() => setMobileMenuOpen(false)}
                className="mt-4 px-10 py-4 bg-white text-black font-bold rounded-full"
              >
                DOWNLOAD RESUME
              </motion.a>
            </div>
            
            <div className="absolute bottom-10 flex gap-6">
               <span className="text-[10px] font-mono text-gray-500 tracking-[0.4em]">SYSTEM v4.2 ONLINE</span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};
