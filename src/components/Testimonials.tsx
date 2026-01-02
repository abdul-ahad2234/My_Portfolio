
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Quote, ChevronLeft, ChevronRight } from 'lucide-react';

const testimonials = [
  {
    name: "Ali Raza",
    role: "Senior Instructor, Aptech Learning",
    text: "Abdul Ahad showed exceptional dedication during our web development program. His final project demonstrated strong understanding of both frontend and backend concepts. He's a quick learner with a keen eye for detail and clean code practices.",
    avatar: "https://i.pravatar.cc/150?img=1", // Male
    rating: 5,
    gender: "male"
  },
  {
    name: "Sara Khan",
    role: "Fellow Student & Project Collaborator",
    text: "Worked with Abdul Ahad on multiple academic projects. His problem-solving skills and attention to code structure are impressive. He consistently delivers on time and maintains excellent communication throughout the development process.",
    avatar: "https://i.pravatar.cc/150?img=5", // Female
    rating: 5,
    gender: "female"
  },
  {
    name: "Prof. Ahmed Malik",
    role: "Director, Lions Academy",
    text: "Abdul Ahad developed a student management system for our institution. The application was efficient, user-friendly, and exceeded our expectations. His professionalism and technical skills are commendable for a fresh graduate.",
    avatar: "https://i.pravatar.cc/150?img=8", // Male
    rating: 4,
    gender: "male"
  },
  {
    name: "Bilal Shah",
    role: "Senior Developer, TechSolutions Inc.",
    text: "Reviewed Abdul Ahad's portfolio projects and was impressed by his understanding of modern web technologies. His code shows good practices in JavaScript and PHP. With some guidance, he has great potential to grow as a full-stack developer.",
    avatar: "https://i.pravatar.cc/150?img=11", // Male
    rating: 4,
    gender: "male"
  },
  {
    name: "Fatima Noor",
    role: "Business Owner, Bloom Boutique",
    text: "Hired Abdul Ahad for our e-commerce website. He created a responsive, visually appealing design that perfectly represented our brand. His communication was excellent, and he delivered the project ahead of schedule.",
    avatar: "https://i.pravatar.cc/150?img=32", // Female
    rating: 5,
    gender: "female"
  },
  {
    name: "Nadia Aslam",
    role: "Career Counselor & Mentor",
    text: "Abdul Ahad's eagerness to learn and adapt is remarkable. He actively seeks feedback and implements suggestions effectively. His positive attitude and strong work ethic make him a valuable team member in any development environment.",
    avatar: "https://i.pravatar.cc/150?img=44", // Female
    rating: 5,
    gender: "female"
  }
];

const TestimonialCard = ({ item }: { item: typeof testimonials[0] }) => {
  const [rotate, setRotate] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = (e.clientY - rect.top) / rect.height - 0.5;
    const y = (e.clientX - rect.left) / rect.width - 0.5;
    setRotate({ x: x * 10, y: -y * 10 });
  };

  return (
    <motion.div
      onMouseMove={handleMouseMove}
      onMouseLeave={() => setRotate({ x: 0, y: 0 })}
      style={{
        perspective: 1000,
        rotateX: rotate.x,
        rotateY: rotate.y,
        transition: "all 0.1s ease-out"
      }}
      className="glass-card p-10 rounded-[40px] border border-white/5 relative group cursor-grab active:cursor-grabbing"
    >
      <div className="absolute top-8 right-10 text-white/5 group-hover:text-purple-500/20 transition-colors">
        <Quote size={80} strokeWidth={1} />
      </div>
      
      <div className="relative z-10">
        <p className="text-xl md:text-2xl text-gray-300 leading-relaxed mb-10 italic">
          "{item.text}"
        </p>
        
        <div className="flex items-center gap-5">
          <div className="w-16 h-16 rounded-2xl overflow-hidden border-2 border-purple-500/20">
            <img src={item.avatar} alt={item.name} className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500" />
          </div>
          <div>
            <h4 className="text-lg font-bold font-space text-white">{item.name}</h4>
            <p className="text-cyan-400 text-sm font-mono uppercase tracking-widest">{item.role}</p>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export const Testimonials = () => {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % testimonials.length);
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  const next = () => setIndex((index + 1) % testimonials.length);
  const prev = () => setIndex((index - 1 + testimonials.length) % testimonials.length);

  return (
    <section id="testimonials" className="py-24 px-6 overflow-hidden">
      <div className="container mx-auto">
        <div className="text-center mb-20">
          <motion.p 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            className="text-purple-500 font-mono text-xs tracking-[0.3em] uppercase mb-4"
          >
            Kind Words
          </motion.p>
          <h2 className="text-5xl md:text-7xl font-bold font-space tracking-tight">CLIENT ECHOES</h2>
        </div>

        <div className="max-w-4xl mx-auto relative px-10">
          <AnimatePresence mode="wait">
            <motion.div
              key={index}
              initial={{ opacity: 0, x: 50, filter: 'blur(10px)' }}
              animate={{ opacity: 1, x: 0, filter: 'blur(0px)' }}
              exit={{ opacity: 0, x: -50, filter: 'blur(10px)' }}
              transition={{ duration: 0.6, ease: "circOut" }}
            >
              <TestimonialCard item={testimonials[index]} />
            </motion.div>
          </AnimatePresence>

          <button 
            onClick={prev}
            className="absolute left-0 top-1/2 -translate-y-1/2 w-14 h-14 glass-card rounded-full flex items-center justify-center hover:bg-white/10 transition-all group z-20"
          >
            <ChevronLeft className="text-gray-400 group-hover:text-white" />
          </button>
          <button 
            onClick={next}
            className="absolute right-0 top-1/2 -translate-y-1/2 w-14 h-14 glass-card rounded-full flex items-center justify-center hover:bg-white/10 transition-all group z-20"
          >
            <ChevronRight className="text-gray-400 group-hover:text-white" />
          </button>
        </div>

        <div className="flex justify-center gap-3 mt-12">
          {testimonials.map((_, i) => (
            <button
              key={i}
              onClick={() => setIndex(i)}
              className={`h-1 transition-all rounded-full ${i === index ? 'w-10 bg-cyan-400' : 'w-2 bg-white/20'}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
};
