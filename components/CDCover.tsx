'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface CDCoverProps {
  isOpen: boolean;
  onToggle: () => void;
}

export function CDCover({ isOpen, onToggle }: CDCoverProps) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div className="relative w-full max-w-md mx-auto mb-12">
      <AnimatePresence mode="wait">
        {!isOpen ? (
          // Closed State - Front Cover
          <motion.div
            key="closed"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8, rotateY: -90 }}
            transition={{
              duration: 0.6,
              type: 'spring',
              stiffness: 100,
              damping: 15,
            }}
            className="relative"
          >
            <motion.button
              onClick={onToggle}
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}
              whileHover={{
                scale: 1.02,
                rotateY: isHovered ? 5 : 0,
                rotateX: isHovered ? -5 : 0,
              }}
              whileTap={{ scale: 0.98 }}
              className="relative w-full aspect-square rounded-2xl overflow-hidden cd-shadow cursor-pointer group"
              style={{
                transformStyle: 'preserve-3d',
                perspective: '1000px',
              }}
            >
              {/* Album Cover - Purple Starry Background with ROYAL 419 */}
              <div className="absolute inset-0 bg-gradient-to-br from-purple-primary via-purple-dark to-purple-darker">
                {/* Stars on cover */}
                <div className="absolute inset-0">
                  {[...Array(50)].map((_, i) => (
                    <div
                      key={i}
                      className="absolute w-1 h-1 bg-white rounded-full animate-twinkle"
                      style={{
                        left: `${Math.random() * 100}%`,
                        top: `${Math.random() * 100}%`,
                        animationDelay: `${Math.random() * 3}s`,
                      }}
                    />
                  ))}
                </div>

                {/* Royal 419 Text */}
                <div className="absolute inset-0 flex items-center justify-center p-8">
                  <div className="text-center">
                    <h1 className="text-6xl md:text-7xl font-bold mb-4" style={{
                      background: 'linear-gradient(135deg, #f9ed32 0%, #fff176 50%, #f9ed32 100%)',
                      WebkitBackgroundClip: 'text',
                      WebkitTextFillColor: 'transparent',
                      backgroundClip: 'text',
                      textShadow: '0 0 40px rgba(249, 237, 50, 0.3)',
                      fontFamily: 'Impact, "Arial Black", sans-serif',
                      letterSpacing: '0.05em',
                    }}>
                      ROYAL
                    </h1>
                    <h2 className="text-8xl md:text-9xl font-bold" style={{
                      background: 'linear-gradient(135deg, #f9ed32 0%, #fff176 50%, #f9ed32 100%)',
                      WebkitBackgroundClip: 'text',
                      WebkitTextFillColor: 'transparent',
                      backgroundClip: 'text',
                      textShadow: '0 0 40px rgba(249, 237, 50, 0.3)',
                      fontFamily: 'Impact, "Arial Black", sans-serif',
                      letterSpacing: '0.05em',
                    }}>
                      419
                    </h2>
                  </div>
                </div>

                {/* Corner Accents */}
                <div className="absolute top-4 right-4 text-yellow-accent text-sm font-bold">
                  ORDER NOW!
                </div>
              </div>

              {/* Hover Overlay */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: isHovered ? 1 : 0 }}
                className="absolute inset-0 bg-gradient-to-t from-purple-darker/80 via-transparent to-transparent flex items-end justify-center pb-8"
              >
                <p className="text-yellow-accent font-bold text-lg">
                  Click to Open
                </p>
              </motion.div>
            </motion.button>
          </motion.div>
        ) : (
          // Open State - Reveal Player
          <motion.div
            key="open"
            initial={{ opacity: 0, rotateY: 90 }}
            animate={{ opacity: 1, rotateY: 0 }}
            exit={{ opacity: 0, rotateY: 90 }}
            transition={{
              duration: 0.6,
              type: 'spring',
              stiffness: 100,
              damping: 15,
            }}
            className="relative"
          >
            <motion.div
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.5 }}
              className="bg-purple-dark/30 backdrop-blur-sm rounded-2xl p-8 cd-shadow"
            >
              {/* Close Button */}
              <button
                onClick={onToggle}
                className="absolute top-4 right-4 w-8 h-8 rounded-full bg-yellow-accent/20 hover:bg-yellow-accent/40 text-yellow-accent flex items-center justify-center transition-colors"
                aria-label="Close player"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>

              {/* Disc Illustration */}
              <div className="w-32 h-32 mx-auto mb-6 relative">
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{
                    duration: 10,
                    repeat: Infinity,
                    ease: 'linear',
                  }}
                  className="absolute inset-0 rounded-full bg-gradient-to-br from-purple-primary via-purple-dark to-purple-darker border-4 border-yellow-accent/30"
                >
                  {/* Disc center hole */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-8 h-8 rounded-full bg-purple-darker border-2 border-yellow-accent/50" />
                  </div>
                  {/* Disc grooves effect */}
                  {[...Array(6)].map((_, i) => (
                    <div
                      key={i}
                      className="absolute inset-0 rounded-full border border-white/5"
                      style={{
                        margin: `${(i + 1) * 8}px`,
                      }}
                    />
                  ))}
                </motion.div>
              </div>

              <h2 className="text-2xl font-bold text-yellow-accent text-center mb-2">
                Royal 419
              </h2>
              <p className="text-white/60 text-center text-sm mb-6">
                The Prince of Nigeria
              </p>

              <div className="text-center text-white/40 text-xs">
                Select a track below to start playing
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

