<script lang="ts">
    import { onMount } from 'svelte';
    import { gsap } from '../../lib/animations/gsap-config';
    import BorderBeamButton from '../ui/BorderBeamButton.svelte';

    let header: HTMLElement;
    let isMenuOpen = $state(false);
    let isScrolled = $state(false);

    const toggleMenu = () => {
        isMenuOpen = !isMenuOpen;
    };

    onMount(() => {
        const handleScroll = () => {
            isScrolled = window.scrollY > 50;
        };

        window.addEventListener('scroll', handleScroll);

        gsap.from(header, {
            y: -100,
            opacity: 0,
            duration: 0.8,
            ease: 'power3.out',
        });

        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    });
</script>

<header bind:this={header} class="header" class:scrolled={isScrolled}>
    <div class="container header-content">
        <div class="logo">
            <a href="/">
                <img src="/src/assets/brand/logo.svg" alt="Dezik Wallet" />
            </a>
        </div>

        <nav class="desktop-nav">
            <a href="#hero">Inicio</a>
            <a href="#services">Servicios</a>
            <a href="#about">Nosotros</a>
            <a href="#contact">Contacto</a>
        </nav>

        <div class="header-actions">
            <BorderBeamButton>Free Trial</BorderBeamButton>
            <BorderBeamButton>Log In</BorderBeamButton>
        </div>

        <button class="menu-toggle" onclick={toggleMenu} aria-label="Toggle menu">
            <span></span>
            <span></span>
            <span></span>
        </button>
    </div>

    {#if isMenuOpen}
        <div class="mobile-menu">
            <nav>
                <a href="#hero" onclick={toggleMenu}>Inicio</a>
                <a href="#services" onclick={toggleMenu}>Servicios</a>
                <a href="#about" onclick={toggleMenu}>Nosotros</a>
                <a href="#contact" onclick={toggleMenu}>Contacto</a>
            </nav>
        </div>
    {/if}
</header>

<style>
    .header {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        z-index: var(--z-index-sticky);
        padding: var(--spacing-md) 0;
        transition: all var(--transition-base);
        background: rgba(13, 13, 13, 0.95);
        backdrop-filter: blur(10px);
    }

    .header.scrolled {
        background: rgba(13, 13, 13, 0.98);
        backdrop-filter: blur(10px);
        box-shadow: var(--shadow-md);
        padding: var(--spacing-sm) 0;
    }

    .header-content {
        display: flex;
        justify-content: space-between;
        align-items: center;
        gap: var(--spacing-lg);
    }

    .logo a {
        display: block;
        transition: opacity var(--transition-fast);
    }

    .logo a:hover {
        opacity: 0.8;
    }

    .logo img {
        width: 70%;
        height: auto;
        max-height: 45px;
        display: block;
    }

    .desktop-nav {
        display: flex;
        gap: var(--spacing-lg);
        flex: 1;
        justify-content: center;
    }

    .desktop-nav a {
        font-weight: 500;
        position: relative;
        transition: color var(--transition-fast);
    }

    .desktop-nav a::after {
        content: '';
        position: absolute;
        bottom: -5px;
        left: 0;
        width: 0;
        height: 2px;
        background: var(--primary);
        transition: width var(--transition-base);
    }

    .desktop-nav a:hover {
        color: var(--primary);
    }

    .desktop-nav a:hover::after {
        width: 100%;
    }

    .header-actions {
        display: flex;
        gap: var(--spacing-md);
        align-items: center;
    }

    .menu-toggle {
        display: none;
        flex-direction: column;
        gap: 5px;
        background: none;
        border: none;
        cursor: pointer;
        padding: 8px;
    }

    .menu-toggle span {
        width: 25px;
        height: 2px;
        background: var(--text-color);
        transition: all var(--transition-base);
    }

    .mobile-menu {
        position: fixed;
        top: 80px;
        left: 0;
        width: 100%;
        background: rgba(13, 13, 13, 0.98);
        backdrop-filter: blur(10px);
        padding: var(--spacing-xl) 0;
    }

    .mobile-menu nav {
        display: flex;
        flex-direction: column;
        gap: var(--spacing-md);
        align-items: center;
    }

    .mobile-menu a {
        font-size: var(--font-size-lg);
        font-weight: 500;
    }

    @media (max-width: 768px) {
        .desktop-nav,
        .header-actions {
            display: none;
        }

        .menu-toggle {
            display: flex;
        }

        .logo img {
            width: 60%;
            max-height: 35px;
        }
    }
</style>
