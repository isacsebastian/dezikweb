export const breakpoints = {
    mobile: 768,
    tablet: 1024,
    desktop: 1440,
};

export const isMobile = (): boolean => {
    if (typeof window === 'undefined') return false;
    return window.innerWidth < breakpoints.mobile;
};

export const isTablet = (): boolean => {
    if (typeof window === 'undefined') return false;
    return window.innerWidth >= breakpoints.mobile && window.innerWidth < breakpoints.tablet;
};

export const isDesktop = (): boolean => {
    if (typeof window === 'undefined') return false;
    return window.innerWidth >= breakpoints.tablet;
};
