'use client';

import { useEffect, useState, useRef } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

export function CustomCursor() {
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);
  
  // Smooth spring animation for the main cursor
  const springConfig = { damping: 25, stiffness: 700 };
  const cursorXSpring = useSpring(cursorX, springConfig);
  const cursorYSpring = useSpring(cursorY, springConfig);

  const [isHovering, setIsHovering] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  // Reduced trail state for better performance
  const [trail, setTrail] = useState<{x: number, y: number, id: number}[]>([]);
  const trailIdRef = useRef(0);
  const lastTrailTimeRef = useRef(0);
  const lastCursorUpdateRef = useRef(0);

  useEffect(() => {
    const moveCursor = (e: MouseEvent) => {
      // Throttle cursor position updates to ~60fps max
      const now = performance.now();
      if (now - lastCursorUpdateRef.current < 16) return;
      lastCursorUpdateRef.current = now;
      
      cursorX.set(e.clientX - 16);
      cursorY.set(e.clientY - 16);
      
      // More aggressive trail throttling - 200ms and higher random threshold
      if (now - lastTrailTimeRef.current > 200 && Math.random() > 0.85) {
        lastTrailTimeRef.current = now;
        setTrail(prev => [
            ...prev.slice(-8), // Keep only last 8 for better performance
            { x: e.clientX, y: e.clientY, id: trailIdRef.current++ }
        ]);
      }
    };

    const handleMouseDown = () => setIsHovering(true);
    const handleMouseUp = () => setIsHovering(false);
    const handleMouseLeave = () => setIsVisible(false);
    const handleMouseEnter = () => setIsVisible(true);

    // Set visible immediately
    setIsVisible(true);

    // Use passive listeners for better scrolling performance
    window.addEventListener('mousemove', moveCursor, { passive: true });
    window.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mouseup', handleMouseUp);
    document.addEventListener('mouseleave', handleMouseLeave);
    document.addEventListener('mouseenter', handleMouseEnter);

    return () => {
      window.removeEventListener('mousemove', moveCursor);
      window.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mouseup', handleMouseUp);
      document.removeEventListener('mouseleave', handleMouseLeave);
      document.removeEventListener('mouseenter', handleMouseEnter);
    };
  }, [cursorX, cursorY]);

  if (!isVisible) return null;

  return (
    <>
      {/* Simplified Stardust Trail */}
      {trail.map((t) => (
        <motion.div
            key={t.id}
            initial={{ opacity: 0.6, scale: 0.3 }}
            animate={{ opacity: 0, scale: 0 }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
            className="fixed w-2 h-2 bg-star-glow rounded-full pointer-events-none z-40"
            style={{ left: t.x, top: t.y, willChange: 'opacity, transform' }}
        />
      ))}

      {/* Main Cursor */}
      <motion.div
        className="fixed top-0 left-0 w-8 h-8 pointer-events-none z-50 hidden md:block mix-blend-difference"
        style={{
          x: cursorXSpring,
          y: cursorYSpring,
          willChange: 'transform',
        }}
      >
         <motion.div 
            className={`w-full h-full rounded-full border-2 border-marker-lime flex items-center justify-center`}
            animate={{
                scale: isHovering ? 0.8 : 1,
                backgroundColor: isHovering ? 'rgba(204, 255, 0, 0.2)' : 'rgba(0, 0, 0, 0)',
            }}
            transition={{ duration: 0.15, ease: 'easeOut' }}
         >
            <div className="w-1 h-1 bg-marker-lime rounded-full" />
         </motion.div>
      </motion.div>
    </>
  );
}

