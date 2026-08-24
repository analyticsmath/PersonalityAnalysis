/**
 * Personality Assessor - Public Route Stage
 * Transition-aware stage component rendering public route content with Framer Motion AnimatePresence.
 * Ensures outgoing route DOM remains visible while destination chunk resolves, preventing blank suspense flashes.
 */

import React from 'react';
import { useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';

const pageVariants = {
  initial: {
    opacity: 0,
  },
  animate: {
    opacity: 1,
    transition: {
      duration: 0.35,
      ease: [0.25, 1, 0.5, 1],
    },
  },
  exit: {
    opacity: 0,
    transition: {
      duration: 0.25,
      ease: [0.25, 1, 0.5, 1],
    },
  },
};

export const PublicRouteStage = ({ children }) => {
  const location = useLocation();

  return (
    <div className="pa-px-route-stage" style={{ position: 'relative', width: '100%', minHeight: '100vh' }}>
      <AnimatePresence mode="wait" initial={false}>
        <motion.div
          key={location.pathname}
          variants={pageVariants}
          initial="initial"
          animate="animate"
          exit="exit"
          style={{ width: '100%', minHeight: '100vh' }}
        >
          {children}
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

export default PublicRouteStage;
