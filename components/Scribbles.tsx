'use client';

import { motion } from 'framer-motion';

export const ScribbleCircle = ({ color = '#ccff00', className = '' }) => (
  <svg
    viewBox="0 0 120 60"
    className={`absolute pointer-events-none ${className}`}
    style={{ zIndex: -1 }}
  >
    <motion.path
      d="M15,30 C15,10 40,5 60,5 C90,5 110,15 110,30 C110,50 80,55 60,55 C30,55 10,45 15,30"
      fill="none"
      stroke={color}
      strokeWidth="3"
      strokeLinecap="round"
      strokeDasharray="5 2"
      initial={{ pathLength: 0, opacity: 0 }}
      animate={{ pathLength: 1, opacity: 0.8 }}
      transition={{ duration: 0.6, ease: "easeInOut" }}
    />
  </svg>
);

export const ScribbleUnderline = ({ color = '#ccff00', className = '' }) => (
  <svg
    viewBox="0 0 200 20"
    className={`absolute pointer-events-none ${className}`}
    style={{ zIndex: -1 }}
  >
     <motion.path
      d="M5,10 Q50,15 100,5 Q150,0 195,10"
      fill="none"
      stroke={color}
      strokeWidth="3"
      strokeLinecap="round"
      initial={{ pathLength: 0, opacity: 0 }}
      animate={{ pathLength: 1, opacity: 1 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
    />
  </svg>
);

export const ScribbleArrow = ({ color = '#ff0099', className = '' }) => (
  <svg
    viewBox="0 0 50 50"
    className={`absolute pointer-events-none ${className}`}
  >
    <motion.path
      d="M5,25 L35,25 M35,25 L25,15 M35,25 L25,35"
      fill="none"
      stroke={color}
      strokeWidth="3"
      strokeLinecap="round"
      initial={{ pathLength: 0, opacity: 0 }}
      animate={{ pathLength: 1, opacity: 1 }}
      transition={{ duration: 0.3, ease: "easeOut", delay: 0.1 }}
    />
  </svg>
);

export const ScribbleStar = ({ color = '#00b8c2', className = '' }) => (
   <svg
    viewBox="0 0 40 40"
    className={`absolute pointer-events-none ${className}`}
  >
    <motion.path
      d="M20,2 L24,14 L38,14 L26,22 L30,36 L20,28 L10,36 L14,22 L2,14 L16,14 Z"
      fill="none"
      stroke={color}
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      initial={{ pathLength: 0, scale: 0, rotate: -45 }}
      animate={{ pathLength: 1, scale: 1, rotate: 0 }}
      transition={{ duration: 0.4, type: "spring" }}
    />
  </svg>
);

