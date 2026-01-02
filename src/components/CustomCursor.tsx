
import React, { useEffect, useState, useRef } from 'react';
import { motion, useSpring, useMotionValue, useVelocity, useTransform, AnimatePresence } from 'framer-motion';

export const CustomCursor = () => {
  const [isHovered, setIsHovered] = useState(false);
  const [hoverType, setHoverType] = useState<'default' | 'link' | 'text' | 'drag'>('default');
  const [isVisible, setIsVisible] = useState(false);
  const [isClicked, setIsClicked] = useState(false);
  const [coords, setCoords] = useState({ x: 0, y: 0 });

  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);

  // Velocity for stretching effect
  const xVelocity = useVelocity(cursorX);
  const yVelocity = useVelocity(cursorY);

  // Different spring levels for multi-stage trail
  const springFast = { damping: 25, stiffness: 400, mass: 0.5 };
  const springMid = { damping: 35, stiffness: 250, mass: 0.8 };
  const springSlow = { damping: 45, stiffness: 150, mass: 1.2 };

  const cursorXFast = useSpring(cursorX, springFast);
  const cursorYFast = useSpring(cursorY, springFast);
  const cursorXMid = useSpring(cursorX, springMid);
  const cursorYMid = useSpring(cursorY, springMid);
  const cursorXSlow = useSpring(cursorX, springSlow);
  const cursorYSlow = useSpring(cursorY, springSlow);

  // Rotation and Scale based on movement
  const angle = useTransform([xVelocity, yVelocity], ([vx, vy]: any) => {
    return Math.atan2(vy, vx) * (180 / Math.PI);
  });

  const speed = useTransform([xVelocity, yVelocity], ([vx, vy]: any) => {
    return Math.sqrt(vx * vx + vy * vy);
  });

  const stretchX = useTransform(speed, [0, 2000], [1, 1.8]);
  const stretchY = useTransform(speed, [0, 2000], [1, 0.6]);

  useEffect(() => {
    document.body.style.cursor = 'none';

    const moveCursor = (e: MouseEvent) => {
      if (!isVisible) setIsVisible(true);
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
      setCoords({ x: e.clientX, y: e.clientY });
    };

    const handleHover = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const hoverable = target.closest('button, a, .cursor-pointer');
      const textable = target.closest('input, textarea, p, h1, h2, h3, span');
      const draggable = target.closest('.cursor-grab');

      if (draggable) {
        setHoverType('drag');
        setIsHovered(true);
      } else if (hoverable) {
        setHoverType('link');
        setIsHovered(true);
      } else if (textable && !target.closest('button, a')) {
        setHoverType('text');
        setIsHovered(true);
      } else {
        setHoverType('default');
        setIsHovered(false);
      }
    };

    const handleMouseDown = () => setIsClicked(true);
    const handleMouseUp = () => setIsClicked(false);
    
    window.addEventListener('mousemove', moveCursor);
    window.addEventListener('mouseover', handleHover);
    window.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mouseup', handleMouseUp);
    
    return () => {
      document.body.style.cursor = 'auto';
      window.removeEventListener('mousemove', moveCursor);
      window.removeEventListener('mouseover', handleHover);
      window.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mouseup', handleMouseUp);
    };
  }, [cursorX, cursorY, isVisible]);

  if (typeof navigator !== 'undefined' && /Mobi|Android/i.test(navigator.userAgent)) {
    return null;
  }

  return (
    <div className="fixed inset-0 pointer-events-none z-[99999] overflow-hidden">
      <AnimatePresence>
        {isVisible && (
          <>
            {/* 1. Multi-Stage Velocity Trail (Echoes) */}
            <motion.div
              className="absolute w-4 h-4 rounded-full border border-purple-500/10"
              style={{ x: cursorXSlow, y: cursorYSlow, translateX: '-50%', translateY: '-50%', scale: 3 }}
            />
            <motion.div
              className="absolute w-3 h-3 rounded-full border border-cyan-500/20"
              style={{ x: cursorXMid, y: cursorYMid, translateX: '-50%', translateY: '-50%', scale: 2 }}
            />

            {/* 2. Tactical Metadata (Coordinates) */}
            <motion.div
              className="absolute flex flex-col gap-0.5"
              style={{ x: cursorXFast, y: cursorYFast, translateX: 25, translateY: -25 }}
            >
              <div className="flex items-center gap-1.5">
                <span className="text-[7px] font-mono text-cyan-400/60 uppercase tracking-widest">
                  {isHovered ? 'Status: LOCKED' : `X:${Math.round(coords.x)} Y:${Math.round(coords.y)}`}
                </span>
                <div className={`w-1 h-1 rounded-full ${isHovered ? 'bg-red-500' : 'bg-cyan-500/40'} animate-pulse`} />
              </div>
              <div className="h-[1px] w-12 bg-gradient-to-r from-cyan-500/40 to-transparent" />
              <span className="text-[6px] font-mono text-gray-500 uppercase tracking-[0.3em]">
                {isHovered ? (hoverType === 'link' ? 'DEPLOY_MODULE' : 'SCANNING_DATA') : 'TRACKING_ACTIVE'}
              </span>
            </motion.div>

            {/* 3. Segmented Orbital Ring */}
            <motion.div
              className="absolute flex items-center justify-center"
              style={{
                x: cursorXFast,
                y: cursorYFast,
                translateX: '-50%',
                translateY: '-50%',
                rotate: angle,
                scaleX: isHovered ? 1.5 : stretchX,
                scaleY: isHovered ? 1.5 : stretchY,
              }}
            >
              <div className={`
                w-12 h-12 rounded-full border-dashed border-2 transition-all duration-500
                ${isHovered ? 'border-cyan-400 border-solid rotate-45 scale-110' : 'border-white/10 rotate-0'}
              `} 
              // Fix: Cast style object to any because borderDasharray is not a standard React CSS property for div
              style={{ 
                animation: !isHovered ? 'spin 8s linear infinite' : 'none',
                borderDasharray: !isHovered ? '4 4' : 'none'
              } as any} />
              
              {/* Center Crosshair Lines */}
              {!isHovered && (
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-8 h-[0.5px] bg-white/5" />
                  <div className="h-8 w-[0.5px] bg-white/5 absolute" />
                  {/* Small corners */}
                  <div className="absolute top-0 left-0 w-1 h-1 border-t border-l border-white/20" />
                  <div className="absolute top-0 right-0 w-1 h-1 border-t border-r border-white/20" />
                  <div className="absolute bottom-0 left-0 w-1 h-1 border-b border-l border-white/20" />
                  <div className="absolute bottom-0 right-0 w-1 h-1 border-b border-r border-white/20" />
                </div>
              )}
            </motion.div>

            {/* 4. Core Selection Point */}
            <motion.div
              className={`absolute flex items-center justify-center transition-colors duration-300`}
              style={{
                x: cursorX,
                y: cursorY,
                translateX: '-50%',
                translateY: '-50%',
              }}
            >
              <motion.div 
                animate={{ 
                  scale: isClicked ? 0.8 : 1,
                  backgroundColor: isHovered ? '#22d3ee' : '#ffffff' 
                }}
                className="w-1.5 h-1.5 rounded-full shadow-[0_0_15px_rgba(34,211,238,0.8)]" 
              />
              
              {/* Pulse effect on hover */}
              {isHovered && (
                <motion.div
                  initial={{ scale: 1, opacity: 0.5 }}
                  animate={{ scale: 3, opacity: 0 }}
                  transition={{ duration: 1, repeat: Infinity }}
                  className="absolute w-2 h-2 rounded-full bg-cyan-400/50"
                />
              )}
            </motion.div>
          </>
        )}
      </AnimatePresence>

      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
      `}} />
    </div>
  );
};
