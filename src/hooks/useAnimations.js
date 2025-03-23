import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";

// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);

/**
 * Custom hook for animations using GSAP
 */
export const useAnimations = () => {
  // Initialize a context that will be used for all animations
  const context = useRef(gsap.context(() => {}));

  // Clean up animations when component unmounts
  useEffect(() => {
    return () => context.current.revert();
  }, []);

  // Fade in animation from bottom
  const fadeInUp = (element, options = {}) => {
    const defaults = {
      y: 50,
      opacity: 0,
      duration: 0.8,
      delay: 0.2,
      ease: "power2.out",
      stagger: 0.1,
      scrollTrigger: false,
    };

    const config = { ...defaults, ...options };

    if (config.scrollTrigger && typeof config.scrollTrigger === "string") {
      config.scrollTrigger = {
        trigger: config.scrollTrigger,
        start: "top 80%",
      };
    }

    return context.current.add(() => {
      return gsap.from(element, config);
    });
  };

  // Fade in animation from left
  const fadeInLeft = (element, options = {}) => {
    const defaults = {
      x: -50,
      opacity: 0,
      duration: 0.8,
      delay: 0.2,
      ease: "power2.out",
      stagger: 0.1,
      scrollTrigger: false,
    };

    const config = { ...defaults, ...options };

    if (config.scrollTrigger && typeof config.scrollTrigger === "string") {
      config.scrollTrigger = {
        trigger: config.scrollTrigger,
        start: "top 80%",
      };
    }

    return context.current.add(() => {
      return gsap.from(element, config);
    });
  };

  // Fade in animation from right
  const fadeInRight = (element, options = {}) => {
    const defaults = {
      x: 50,
      opacity: 0,
      duration: 0.8,
      delay: 0.2,
      ease: "power2.out",
      stagger: 0.1,
      scrollTrigger: false,
    };

    const config = { ...defaults, ...options };

    if (config.scrollTrigger && typeof config.scrollTrigger === "string") {
      config.scrollTrigger = {
        trigger: config.scrollTrigger,
        start: "top 80%",
      };
    }

    return context.current.add(() => {
      return gsap.from(element, config);
    });
  };

  // Scale in animation
  const scaleIn = (element, options = {}) => {
    const defaults = {
      scale: 0.8,
      opacity: 0,
      duration: 0.8,
      delay: 0.2,
      ease: "back.out(1.7)",
      stagger: 0.1,
      scrollTrigger: false,
    };

    const config = { ...defaults, ...options };

    if (config.scrollTrigger && typeof config.scrollTrigger === "string") {
      config.scrollTrigger = {
        trigger: config.scrollTrigger,
        start: "top 80%",
      };
    }

    return context.current.add(() => {
      return gsap.from(element, config);
    });
  };

  // Staggered animation for multiple elements
  const staggerElements = (elements, animation = "fadeInUp", options = {}) => {
    const animationFn =
      {
        fadeInUp,
        fadeInLeft,
        fadeInRight,
        scaleIn,
      }[animation] || fadeInUp;

    return animationFn(elements, options);
  };

  // Animated counter
  const animateCounter = (element, endValue, options = {}) => {
    const defaults = {
      duration: 2,
      delay: 0,
      ease: "power1.inOut",
      scrollTrigger: false,
      onUpdate: null,
    };

    const config = { ...defaults, ...options };

    if (config.scrollTrigger && typeof config.scrollTrigger === "string") {
      config.scrollTrigger = {
        trigger: config.scrollTrigger,
        start: "top 80%",
      };
    }

    const counter = { value: 0 };

    return context.current.add(() => {
      return gsap.to(counter, {
        value: endValue,
        duration: config.duration,
        delay: config.delay,
        ease: config.ease,
        scrollTrigger: config.scrollTrigger,
        onUpdate: () => {
          if (element && element.current) {
            const value = Math.round(counter.value);
            element.current.innerHTML = value;
            if (config.onUpdate) config.onUpdate(value);
          }
        },
      });
    });
  };

  // Typewriter effect
  const typewriter = (element, text, options = {}) => {
    const defaults = {
      duration: 0.05,
      delay: 0,
      stagger: 0.05,
      ease: "none",
      scrollTrigger: false,
    };

    const config = { ...defaults, ...options };

    if (config.scrollTrigger && typeof config.scrollTrigger === "string") {
      config.scrollTrigger = {
        trigger: config.scrollTrigger,
        start: "top 80%",
      };
    }

    // Split text into characters
    const chars = text.split("");

    if (element && element.current) {
      element.current.innerHTML = "";
      chars.forEach(() => {
        const span = document.createElement("span");
        span.innerHTML = "&nbsp;";
        span.style.visibility = "hidden";
        element.current.appendChild(span);
      });
    }

    return context.current.add(() => {
      return gsap.to(element.current.children, {
        duration: config.duration,
        delay: config.delay,
        stagger: config.stagger,
        ease: config.ease,
        scrollTrigger: config.scrollTrigger,
        onStart: (i) => {
          if (i.targets && i.targets.length > 0) {
            const index = Array.from(element.current.children).indexOf(
              i.targets[0]
            );
            if (index >= 0 && index < chars.length) {
              i.targets[0].innerHTML = chars[index];
              i.targets[0].style.visibility = "visible";
            }
          }
        },
        onComplete: () => {
          if (element && element.current) {
            element.current.innerHTML = text;
          }
        },
      });
    });
  };

  // Marquee effect for horizontal scrolling
  const marquee = (element, options = {}) => {
    const defaults = {
      repeat: -1,
      ease: "none",
      duration: 20,
      x: "-100%",
    };

    const config = { ...defaults, ...options };

    return context.current.add(() => {
      return gsap.to(element, config);
    });
  };

  // Smooth scroll to an element
  const scrollTo = (target, options = {}) => {
    const defaults = {
      duration: 1,
      ease: "power2.inOut",
      offset: 0,
    };

    const config = { ...defaults, ...options };

    return context.current.add(() => {
      return gsap.to(window, {
        duration: config.duration,
        ease: config.ease,
        scrollTo: {
          y: target,
          offsetY: config.offset,
        },
      });
    });
  };

  // Parallax scrolling effect
  const parallax = (element, options = {}) => {
    const defaults = {
      y: -100,
      ease: "none",
      scrollTrigger: {
        start: "top bottom",
        end: "bottom top",
        scrub: true,
      },
    };

    const config = { ...defaults, ...options };

    if (config.scrollTrigger && typeof config.scrollTrigger === "string") {
      config.scrollTrigger = {
        ...defaults.scrollTrigger,
        trigger: config.scrollTrigger,
      };
    }

    return context.current.add(() => {
      return gsap.to(element, {
        y: config.y,
        ease: config.ease,
        scrollTrigger: config.scrollTrigger,
      });
    });
  };

  // Set context for all animations
  const setContext = (scope) => {
    context.current = gsap.context(() => {}, scope);
    return context.current;
  };

  return {
    fadeInUp,
    fadeInLeft,
    fadeInRight,
    scaleIn,
    staggerElements,
    animateCounter,
    typewriter,
    marquee,
    scrollTo,
    parallax,
    setContext,
  };
};

export default useAnimations;
