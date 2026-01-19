import { gsap, ScrollTrigger } from './gsap-config';

export const scrollFadeIn = (target: gsap.TweenTarget, triggerElement?: string) => {
    return gsap.from(target, {
        opacity: 0,
        y: 50,
        duration: 1,
        scrollTrigger: {
            trigger: triggerElement || target,
            start: 'top 80%',
            end: 'bottom 20%',
            toggleActions: 'play none none reverse',
        },
    });
};

export const parallaxEffect = (
    target: gsap.TweenTarget,
    speed = 0.5,
    triggerElement?: string
) => {
    return gsap.to(target, {
        y: () => -(window.innerHeight * speed),
        ease: 'none',
        scrollTrigger: {
            trigger: triggerElement || target,
            start: 'top bottom',
            end: 'bottom top',
            scrub: true,
        },
    });
};

export const revealOnScroll = (target: gsap.TweenTarget, direction: 'left' | 'right' = 'left') => {
    const xValue = direction === 'left' ? -100 : 100;

    return gsap.from(target, {
        x: xValue,
        opacity: 0,
        duration: 1,
        scrollTrigger: {
            trigger: target,
            start: 'top 85%',
            toggleActions: 'play none none reverse',
        },
    });
};

export const staggerScrollReveal = (targets: gsap.TweenTarget, staggerTime = 0.2) => {
    return gsap.from(targets, {
        opacity: 0,
        y: 50,
        duration: 0.8,
        stagger: staggerTime,
        scrollTrigger: {
            trigger: targets,
            start: 'top 80%',
            toggleActions: 'play none none reverse',
        },
    });
};

export const pinSection = (target: string, endTrigger?: string) => {
    return ScrollTrigger.create({
        trigger: target,
        start: 'top top',
        end: endTrigger || 'bottom bottom',
        pin: true,
        pinSpacing: false,
    });
};
