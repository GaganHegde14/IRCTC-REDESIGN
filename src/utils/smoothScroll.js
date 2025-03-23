import Lenis from "@studio-freight/lenis";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

let lenis;

export const initSmoothScroll = (options = {}) => {
  if (lenis) return lenis;

  const defaultOptions = {
    duration: 1.5, // Increase duration for smoother feel
    easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    direction: "vertical",
    smoothWheel: true, // Enable smooth mouse wheel scrolling
    smoothTouch: true, // Enable smooth touch scrolling
    wheelMultiplier: 1, // Adjust scroll speed
    touchMultiplier: 2, // Adjust touch scroll speed
  };

  const config = { ...defaultOptions, ...options };

  lenis = new Lenis(config);

  // Sync Lenis with ScrollTrigger
  lenis.on("scroll", ScrollTrigger.update);

  // Use GSAP ticker for RAF loop
  const raf = (time) => {
    lenis.raf(time);
    ScrollTrigger.update();
  };
  gsap.ticker.add(raf);
  gsap.ticker.lagSmoothing(0); // Prevent GSAP lag during rapid scrolling

  // Cleanup function
  const cleanup = () => {
    if (lenis) {
      gsap.ticker.remove(raf);
      lenis.destroy();
      lenis = null;
    }
  };

  lenis.cleanup = cleanup;

  return lenis;
};

export const scrollTo = (target, options = {}) => {
  if (!lenis) {
    console.warn("Lenis not initialized. Call initSmoothScroll first.");
    return;
  }
  lenis.scrollTo(target, options);
};

export const stopScroll = () => {
  if (lenis) lenis.stop();
};

export const startScroll = () => {
  if (lenis) lenis.start();
};

export const destroySmoothScroll = () => {
  if (lenis) lenis.cleanup();
};

export default {
  initSmoothScroll,
  scrollTo,
  stopScroll,
  startScroll,
  destroySmoothScroll,
};
