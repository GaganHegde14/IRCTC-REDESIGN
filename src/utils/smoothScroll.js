import Lenis from "locomotive-scroll";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// Register the ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger);

let lenis;

/**
 * Initialize smooth scrolling with Lenis
 * @param {Object} options - Lenis configuration options
 * @returns {Object} - The Lenis instance
 */
export const initSmoothScroll = (options = {}) => {
  if (lenis) return lenis;

  const defaultOptions = {
    smooth: true,
    smoothClass: "has-smooth-scroll",
    lerp: 0.1, // Linear interpolation factor - lower = smoother
    direction: "vertical",
    tablet: {
      smooth: true,
      breakpoint: 1024,
    },
    smartphone: {
      smooth: false,
      breakpoint: 767,
    },
  };

  const config = { ...defaultOptions, ...options };

  // Create Lenis instance
  lenis = new Lenis(config);

  // Connect Lenis to ScrollTrigger
  lenis.on("scroll", ScrollTrigger.update);

  // Set up a RAF loop for Lenis
  const rafInstance = gsap.ticker.add((time) => {
    lenis.raf(time * 1000);
  });

  // Return cleanup function
  const cleanup = () => {
    if (lenis) {
      gsap.ticker.remove(rafInstance);
      lenis.destroy();
      lenis = null;
    }
  };

  // Add methods to the instance
  lenis.cleanup = cleanup;

  return lenis;
};

/**
 * Scroll to a specific element or position
 * @param {string|HTMLElement|number} target - The target to scroll to
 * @param {Object} options - Configuration options
 */
export const scrollTo = (target, options = {}) => {
  if (!lenis) {
    console.warn("Lenis not initialized. Call initSmoothScroll first.");
    return;
  }

  const defaultOptions = {
    offset: 0,
    duration: 1.5,
    easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // Exponential easing
    immediate: false,
    lock: false,
    force: false,
    onComplete: null,
  };

  const config = { ...defaultOptions, ...options };

  lenis.scrollTo(target, config);
};

/**
 * Stop the smooth scrolling
 */
export const stopScroll = () => {
  if (lenis) {
    lenis.stop();
  } else {
    console.warn("Lenis not initialized. Call initSmoothScroll first.");
  }
};

/**
 * Start the smooth scrolling after stopping it
 */
export const startScroll = () => {
  if (lenis) {
    lenis.start();
  } else {
    console.warn("Lenis not initialized. Call initSmoothScroll first.");
  }
};

/**
 * Destroy the Lenis instance and clean up
 */
export const destroySmoothScroll = () => {
  if (lenis) {
    lenis.cleanup();
  }
};

export default {
  initSmoothScroll,
  scrollTo,
  stopScroll,
  startScroll,
  destroySmoothScroll,
};
