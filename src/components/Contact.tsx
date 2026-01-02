
import React, { useState, useRef } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { Send, MapPin, Mail, Github, Instagram, Linkedin, Facebook, Loader2 } from 'lucide-react';

export const Contact = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  
  const btnRef = useRef<HTMLButtonElement>(null);
  const x = useSpring(useMotionValue(0), { stiffness: 150, damping: 15 });
  const y = useSpring(useMotionValue(0), { stiffness: 150, damping: 15 });

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!btnRef.current) return;
    const rect = btnRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    x.set((e.clientX - centerX) * 0.2);
    y.set((e.clientY - centerY) * 0.2);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitted(true);
    }, 2000);
  };

  return (
    <section id="contact" className="py-24 px-6 relative overflow-hidden">
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-purple-600/10 blur-[150px] pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-cyan-600/10 blur-[150px] pointer-events-none" />

      <div className="container mx-auto max-w-6xl">
        <div className="grid lg:grid-cols-2 gap-20">
          <div>
            <h2 className="text-5xl md:text-7xl font-bold font-space mb-8">LET'S <br /><span className="text-cyan-400">CONNECT.</span></h2>
            <p className="text-gray-400 text-xl mb-12 max-w-md">
              Have a visionary project in mind? Let's turn your digital dreams into reality.
            </p>

            <div className="space-y-8 mb-16">
              <div className="flex items-center gap-6 group">
                <div className="w-14 h-14 rounded-2xl glass-card flex items-center justify-center group-hover:scale-110 transition-transform">
                  <Mail className="text-purple-500" />
                </div>
                <div>
                  <p className="text-gray-500 text-xs font-mono mb-1 uppercase tracking-widest">Email</p>
                  <p className="text-white font-medium">abdulahad22431@gmail.com</p>
                </div>
              </div>
              <div className="flex items-center gap-6 group">
                <div className="w-14 h-14 rounded-2xl glass-card flex items-center justify-center group-hover:scale-110 transition-transform">
                  <MapPin className="text-cyan-500" />
                </div>
                <div>
                  <p className="text-gray-500 text-xs font-mono mb-1 uppercase tracking-widest">Location</p>
                  <p className="text-white font-medium">Karachi, Pakistan</p>
                </div>
              </div>
            </div>

            <div className="flex gap-4">
              {[Github, Instagram, Facebook, Linkedin].map((Icon, i) => (
                <motion.a 
                  key={i}
                  whileHover={{ scale: 1.1, y: -5 }}
                  href="#" 
                  className="w-12 h-12 rounded-full glass-card flex items-center justify-center hover:bg-white/10 transition-all border border-white/5"
                >
                  <Icon className="w-5 h-5" />
                </motion.a>
              ))}
            </div>
          </div>

          <div className="relative">
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="glass-card p-10 rounded-[40px] border border-white/10 relative overflow-hidden"
            >
              {submitted ? (
                <div className="text-center py-20">
                  <motion.div 
                    initial={{ scale: 0 }} 
                    animate={{ scale: 1 }} 
                    className="w-20 h-20 bg-cyan-500 rounded-full flex items-center justify-center mx-auto mb-6 shadow-[0_0_30px_rgba(6,182,212,0.4)]"
                  >
                    <Send className="text-white w-10 h-10" />
                  </motion.div>
                  <h3 className="text-3xl font-bold font-space mb-2">MESSAGE SENT!</h3>
                  <p className="text-gray-400">I'll get back to you within 24 hours.</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-gray-400 text-xs font-mono uppercase tracking-widest mb-2 ml-1">Name</label>
                      <input 
                        required
                        className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 text-white focus:outline-none focus:border-cyan-500/50 transition-colors focus:bg-white/10" 
                        placeholder="Elon Musk"
                      />
                    </div>
                    <div>
                      <label className="block text-gray-400 text-xs font-mono uppercase tracking-widest mb-2 ml-1">Email</label>
                      <input 
                        required
                        type="email"
                        className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 text-white focus:outline-none focus:border-cyan-500/50 transition-colors focus:bg-white/10" 
                        placeholder="elon@mars.com"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-gray-400 text-xs font-mono uppercase tracking-widest mb-2 ml-1">Subject</label>
                    <input 
                      required
                      className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 text-white focus:outline-none focus:border-cyan-500/50 transition-colors focus:bg-white/10" 
                      placeholder="Project Inquiry"
                    />
                  </div>
                  <div>
                    <label className="block text-gray-400 text-xs font-mono uppercase tracking-widest mb-2 ml-1">Message</label>
                    <textarea 
                      required
                      rows={4}
                      className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 text-white focus:outline-none focus:border-cyan-500/50 transition-colors focus:bg-white/10 resize-none" 
                      placeholder="Tell me about your vision..."
                    />
                  </div>
                  <motion.button 
                    ref={btnRef}
                    onMouseMove={handleMouseMove}
                    onMouseLeave={() => { x.set(0); y.set(0); }}
                    style={{ x, y }}
                    disabled={isSubmitting}
                    className="w-full group relative px-8 py-5 bg-white text-black font-bold rounded-2xl transition-all overflow-hidden disabled:opacity-50 shadow-[0_0_20px_rgba(255,255,255,0.05)] active:scale-95"
                  >
                    <div className="absolute inset-0 bg-gradient-to-r from-purple-500 to-cyan-400 opacity-0 group-hover:opacity-100 transition-opacity" />
                    
                    {/* Scanning Bar Animation */}
                    <motion.div 
                      animate={{ x: ["-100%", "200%"] }}
                      transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                      className="absolute inset-y-0 w-1/3 bg-white/30 skew-x-12 blur-md opacity-0 group-hover:opacity-100"
                    />

                    <span className="relative z-10 flex items-center justify-center gap-2 uppercase tracking-[0.2em] text-xs">
                      {isSubmitting ? (
                        <>
                          <Loader2 className="w-5 h-5 animate-spin" />
                          Transmitting...
                        </>
                      ) : (
                        <>
                          Send Message
                          <Send className="w-4 h-4 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                        </>
                      )}
                    </span>
                  </motion.button>
                </form>
              )}
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};
