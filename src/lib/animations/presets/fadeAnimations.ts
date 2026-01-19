import { gsap } from '../gsap-config';

export const fadeIn = (target: gsap.TweenTarget, duration = 0.8) => {
    return gsap.from(target, {
        opacity: 0,
        duration,
        ease: 'power3.out',
    });
};

export const fadeInUp = (target: gsap.TweenTarget, distance = 50, duration = 0.8) => {
    return gsap.from(target, {
        opacity: 0,
        y: distance,
        duration,
        ease: 'power3.out',
    });
};

export const fadeInDown = (target: gsap.TweenTarget, distance = 50, duration = 0.8) => {
    return gsap.from(target, {
        opacity: 0,
        y: -distance,
        duration,
        ease: 'power3.out',
    });
};

export const fadeOut = (target: gsap.TweenTarget, duration = 0.6) => {
    return gsap.to(target, {
        opacity: 0,
        duration,
        ease: 'power3.in',
    });
};

export const staggerFadeInUp = (
    targets: gsap.TweenTarget,
    staggerTime = 0.15,
    distance = 30
) => {
    return gsap.from(targets, {
        opacity: 0,
        y: distance,
        duration: 0.8,
        stagger: staggerTime,
        ease: 'power3.out',
    });
};
