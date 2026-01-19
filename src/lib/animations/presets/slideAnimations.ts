import { gsap } from '../gsap-config';

export const slideInLeft = (target: gsap.TweenTarget, distance = 100, duration = 0.8) => {
    return gsap.from(target, {
        x: -distance,
        opacity: 0,
        duration,
        ease: 'power3.out',
    });
};

export const slideInRight = (target: gsap.TweenTarget, distance = 100, duration = 0.8) => {
    return gsap.from(target, {
        x: distance,
        opacity: 0,
        duration,
        ease: 'power3.out',
    });
};

export const slideOutLeft = (target: gsap.TweenTarget, distance = 100, duration = 0.6) => {
    return gsap.to(target, {
        x: -distance,
        opacity: 0,
        duration,
        ease: 'power3.in',
    });
};

export const slideOutRight = (target: gsap.TweenTarget, distance = 100, duration = 0.6) => {
    return gsap.to(target, {
        x: distance,
        opacity: 0,
        duration,
        ease: 'power3.in',
    });
};
