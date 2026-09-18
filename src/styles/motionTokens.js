/**
 * MOHAMMED SHAHZAN ARMAR — GLOBAL MOTION DESIGN SYSTEM
 * Centralized easing curves, spring physics, and duration tokens
 */

export const easings = {
  // Editorial smooth deceleration (primary curve for cards, sections, and reveals)
  editorial: [0.22, 1, 0.36, 1],
  // Snappy curve for responsive micro-interactions, tabs, and buttons
  snappy: [0.16, 1, 0.3, 1],
  // Smooth subtle ease
  smooth: [0.25, 1, 0.5, 1],
  // Linear ease for scrubbed states
  linear: [0, 0, 1, 1]
};

export const springs = {
  // Snappy spring for tabs, switches, and active indicators
  snappy: { type: 'spring', stiffness: 450, damping: 32 },
  // Tactile spring for cards, buttons, and hover shifts
  tactile: { type: 'spring', stiffness: 380, damping: 28 },
  // Gentle spring for floating elements and ghost previews
  gentle: { type: 'spring', stiffness: 260, damping: 24 }
};

export const durations = {
  micro: 0.16,
  fast: 0.26,
  medium: 0.45,
  entrance: 0.65,
  scene: 0.95
};

export const variants = {
  fadeInUp: {
    hidden: { opacity: 0, y: 24 },
    visible: (custom = 0) => ({
      opacity: 1,
      y: 0,
      transition: {
        duration: durations.entrance,
        ease: easings.editorial,
        delay: custom * 0.08
      }
    })
  },
  staggerContainer: {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.08,
        delayChildren: 0.12
      }
    }
  },
  staggerItem: {
    hidden: { opacity: 0, y: 16 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: durations.medium,
        ease: easings.editorial
      }
    }
  }
};
