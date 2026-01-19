import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

if (typeof window !== 'undefined') {
    gsap.registerPlugin(ScrollTrigger);

    gsap.defaults({
        duration: 0.8,
        ease: 'power3.out',
    });

    gsap.config({
        force3D: true,
        nullTargetWarn: false,
    });

    ScrollTrigger.defaults({
        toggleActions: 'play none none reverse',
        markers: false,
    });
}

export { gsap, ScrollTrigger };
