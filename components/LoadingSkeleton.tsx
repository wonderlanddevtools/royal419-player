'use client';

import { motion } from 'framer-motion';

export function LoadingSkeleton() {
  return (
    <motion.div
      className="absolute inset-0 flex items-center justify-center bg-black/50 backdrop-blur-sm rounded-3xl z-50"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <div className="flex flex-col items-center gap-4">
        {/* Spinning CD loader */}
        <motion.div
          className="w-20 h-20 rounded-full border-4 border-white/20"
          style={{
            borderTopColor: '#FFD700',
            borderRightColor: '#FF69B4',
          }}
          animate={{
            rotate: 360,
          }}
          transition={{
            duration: 1,
            repeat: Infinity,
            ease: 'linear',
          }}
        />
        
        {/* Loading text */}
        <motion.p
          className="text-white/70 font-inter text-sm"
          animate={{
            opacity: [0.5, 1, 0.5],
          }}
          transition={{
            duration: 1.5,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        >
          Loading...
        </motion.p>
      </div>
    </motion.div>
  );
}

