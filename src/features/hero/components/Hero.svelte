<script lang="ts">
    import { onMount } from 'svelte';
    import { gsap } from '../../../lib/animations/gsap-config';
    import { ArrowRight } from 'lucide-svelte';
    import logo from '../../../assets/brand/logo.svg?raw';

    let heroSection: HTMLElement;

    onMount(() => {
        const tl = gsap.timeline({ delay: 0.5 });

        tl.from('.hero-logo', {
            opacity: 0,
            scale: 0.8,
            y: 50,
            duration: 1.2,
            ease: 'power4.out',
        })
        .from('.hero-subtitle', {
            opacity: 0,
            y: 30,
            duration: 0.8,
        }, '-=0.6')
        .from('.hero-cta', {
            opacity: 0,
            y: 20,
            duration: 0.6,
        }, '-=0.4');
    });
</script>

<section id="hero" class="hero" bind:this={heroSection}>
    <div class="hero-content-area">
        <div class="container hero-content">
            <div class="hero-logo">
                {@html logo}
            </div>

            <p class="hero-subtitle">La billetera más poderosa y elegante desarrollada para la adquisición de talento</p>

            <div class="hero-cta">
                <a href="#contact" class="btn-primary liquid-btn">
                    <span>Get Started</span>
                    <ArrowRight size={20} />
                </a>
            </div>
        </div>
    </div>

    <div class="hero-video-container">
        <video class="hero-video" autoplay loop muted playsinline>
            <source src="https://eubzkoywhckxuyrjsrje.supabase.co/storage/v1/object/public/website/line-waves.webm?t=2024-03-19T22%3A09%3A07.266Z" type="video/webm">
        </video>
        <div class="hero-video-overlay"></div>
    </div>

    <div class="scroll-indicator">
        <span></span>
    </div>
</section>

<style>
    .hero {
        position: relative;
        min-height: 100vh;
        overflow: hidden;
    }

    .hero-video-container {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        z-index: 0;
    }

    .hero-video {
        width: 100%;
        height: 100%;
        object-fit: cover;
    }

    .hero-video-overlay {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, 0.15);
        pointer-events: none;
    }

    .hero-content-area {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        display: flex;
        align-items: center;
        justify-content: center;
        width: 100%;
        padding: var(--spacing-xl) var(--spacing-lg);
        z-index: 2;
    }

    .hero-content {
        position: relative;
        text-align: center;
        max-width: 1000px;
        width: 100%;
    }

    .hero-logo {
        width: 100%;
        max-width: 500px;
        margin: 0 auto var(--spacing-lg);
        filter: drop-shadow(0 5px 20px rgba(242, 44, 54, 0.3));
    }

    .hero-logo :global(svg) {
        width: 100%;
        height: auto;
        display: block;
    }

    .hero-subtitle {
        font-size: var(--font-size-lg);
        color: rgba(255, 255, 255, 0.95);
        margin-bottom: var(--spacing-xl);
        font-weight: 300;
        letter-spacing: 0.3px;
        line-height: 1.5;
        max-width: 700px;
        margin-left: auto;
        margin-right: auto;
        text-shadow: 0 2px 10px rgba(0, 0, 0, 0.3);
    }

    .hero-cta {
        display: flex;
        gap: var(--spacing-md);
        justify-content: center;
        flex-wrap: wrap;
    }

    .liquid-btn {
        position: relative;
        display: inline-flex;
        align-items: center;
        gap: 10px;
        padding: 14px 32px;
        font-size: var(--font-size-base);
        font-weight: 500;
        border-radius: 50px;
        text-transform: none;
        letter-spacing: 0.3px;
        background: rgba(0, 0, 0, 0.8);
        border: 1.5px solid rgba(255, 255, 255, 0.3);
        color: #ffffff;
        overflow: hidden;
        transition: all 0.4s cubic-bezier(0.23, 1, 0.32, 1);
        backdrop-filter: blur(10px);
        z-index: 1;
    }

    .liquid-btn::before {
        content: '';
        position: absolute;
        top: 50%;
        left: 50%;
        width: 0;
        height: 0;
        border-radius: 50%;
        background: radial-gradient(circle, rgba(255, 255, 255, 0.15) 0%, transparent 70%);
        transform: translate(-50%, -50%);
        transition: width 0.6s cubic-bezier(0.23, 1, 0.32, 1), height 0.6s cubic-bezier(0.23, 1, 0.32, 1);
        z-index: -1;
    }

    .liquid-btn:hover::before {
        width: 300px;
        height: 300px;
    }

    .liquid-btn:hover {
        border-color: rgba(255, 255, 255, 0.6);
        transform: translateY(-2px);
        box-shadow: 0 10px 30px rgba(0, 0, 0, 0.5),
                    0 0 20px rgba(255, 255, 255, 0.1);
    }

    .liquid-btn:active {
        transform: translateY(0);
    }

    .liquid-btn span {
        position: relative;
        z-index: 1;
    }

    .liquid-btn :global(svg) {
        position: relative;
        z-index: 1;
        transition: transform 0.3s ease;
    }

    .liquid-btn:hover :global(svg) {
        transform: translateX(4px);
    }

    .scroll-indicator {
        position: absolute;
        bottom: 30px;
        left: 50%;
        transform: translateX(-50%);
        width: 30px;
        height: 50px;
        border: 2px solid rgba(255, 255, 255, 0.4);
        border-radius: 20px;
        display: flex;
        justify-content: center;
        padding-top: 8px;
        z-index: 3;
    }

    .scroll-indicator span {
        width: 4px;
        height: 10px;
        background: rgba(255, 255, 255, 0.9);
        border-radius: 2px;
        animation: scroll 2s infinite;
    }

    @keyframes scroll {
        0% {
            transform: translateY(0);
            opacity: 1;
        }
        100% {
            transform: translateY(20px);
            opacity: 0;
        }
    }

    @media (max-width: 768px) {
        .hero-content-area {
            padding: var(--spacing-lg) var(--spacing-md);
        }

        .hero-logo {
            max-width: 350px;
        }

        .hero-subtitle {
            font-size: var(--font-size-base);
            padding: 0 var(--spacing-md);
        }

        .liquid-btn {
            width: 100%;
            max-width: 300px;
            justify-content: center;
        }
    }

    @media (max-width: 480px) {
        .hero-logo {
            max-width: 280px;
        }

        .hero-subtitle {
            font-size: var(--font-size-sm);
        }
    }
</style>
