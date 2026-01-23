<script lang="ts">
    import { onMount, onDestroy } from "svelte";
    import { gsap } from "../../lib/animations/gsap-config";
    import NavLink from "../ui/NavLink.svelte";

    let header: HTMLElement;
    let isMenuOpen = $state(false);
    let activeSection = $state("#hero");
    let clickedMobileLink = $state("");
    let scrollProgress = $state(0);
    let observer: IntersectionObserver;

    const navItems = [
        { name: "Inicio", href: "#hero" },
        { name: "Servicios", href: "#services" },
        { name: "Nosotros", href: "#about" },
        { name: "Contacto", href: "#contact" },
    ];

    // Valores interpolados basados en scrollProgress (0 a 1)
    let paddingHorizontal = $derived(24 + scrollProgress * 30); // 24px → 54px
    let gap = $derived(24 - scrollProgress * 24); // 24px → 0px
    let navOpacity = $derived(1 - scrollProgress); // 1 → 0
    let navMaxWidth = $derived(400 - scrollProgress * 400); // 400px → 0px

    const toggleMenu = () => {
        isMenuOpen = !isMenuOpen;
    };

    const handleMobileClick = (href: string) => {
        clickedMobileLink = href;
        setTimeout(() => {
            clickedMobileLink = "";
            toggleMenu();
        }, 800);
    };

    const scrollToSection = (event: MouseEvent, href: string) => {
        event.preventDefault();
        const element = document.querySelector(href);
        if (element) {
            const headerOffset = 100;
            const elementPosition = element.getBoundingClientRect().top;
            const offsetPosition =
                elementPosition + window.pageYOffset - headerOffset;

            window.scrollTo({
                top: offsetPosition,
                behavior: "smooth",
            });
        }
    };

    onMount(() => {
        const handleScroll = () => {
            const scrollY = window.scrollY;
            const maxScroll = 100;
            scrollProgress = Math.min(scrollY / maxScroll, 1);
        };

        window.addEventListener("scroll", handleScroll, { passive: true });

        // Intersection Observer para tracking de sección activa
        observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        const id = `#${entry.target.id}`;
                        const matchedItem = navItems.find(
                            (item) => item.href === id,
                        );
                        if (matchedItem) {
                            activeSection = matchedItem.href;
                        }
                    }
                });
            },
            { threshold: 0.2 },
        );

        // Observar todas las secciones
        navItems.forEach((item) => {
            const element = document.querySelector(item.href);
            if (element) {
                observer.observe(element);
            }
        });

        gsap.from(header, {
            y: -100,
            opacity: 0,
            duration: 0.8,
            ease: "power3.out",
        });

        return () => {
            window.removeEventListener("scroll", handleScroll);
        };
    });

    onDestroy(() => {
        if (observer) {
            observer.disconnect();
        }
    });
</script>

<header bind:this={header} class="header">
    <div class="header-wrapper">
        <!-- Desktop Navigation - Pill Style -->
        <div
            class="desktop-nav"
            style="padding: 8px {paddingHorizontal}px; gap: {gap}px;"
        >
            <span class="nav-border-beam"></span>
            <ul
                class="nav-list nav-list-left"
                style="opacity: {navOpacity}; max-width: {navMaxWidth}px;"
            >
                {#each navItems.slice(0, 2) as item}
                    <li>
                        <NavLink
                            href={item.href}
                            active={activeSection === item.href}
                            onclick={(e) => scrollToSection(e, item.href)}
                        >
                            {item.name}
                        </NavLink>
                    </li>
                {/each}
            </ul>

            <a href="/" class="logo">
                <img src="/logodezik.svg" alt="Dezik Wallet" />
            </a>

            <ul
                class="nav-list nav-list-right"
                style="opacity: {navOpacity}; max-width: {navMaxWidth}px;"
            >
                {#each navItems.slice(2) as item}
                    <li>
                        <NavLink
                            href={item.href}
                            active={activeSection === item.href}
                            onclick={(e) => scrollToSection(e, item.href)}
                        >
                            {item.name}
                        </NavLink>
                    </li>
                {/each}
            </ul>
        </div>

        <!-- Mobile Menu Toggle -->
        <div class="mobile-header">
            <a href="/" class="mobile-logo">
                <img src="/logodezik.svg" alt="Dezik Wallet" />
            </a>

            <div class="menu-toggle-wrapper">
                <span class="border-beam"></span>
                <button
                    class="menu-toggle"
                    onclick={toggleMenu}
                    aria-label="Toggle menu"
                >
                    <span class:open={isMenuOpen}></span>
                    <span class:open={isMenuOpen}></span>
                    <span class:open={isMenuOpen}></span>
                </button>
            </div>
        </div>
    </div>

    {#if isMenuOpen}
        <!-- Overlay -->
        <div
            class="mobile-overlay"
            role="button"
            tabindex="0"
            onclick={toggleMenu}
            onkeydown={(e) => e.key === "Enter" && toggleMenu()}
        ></div>

        <!-- Sheet -->
        <div class="mobile-sheet">
            <div class="sheet-header">
                <button
                    class="close-btn"
                    onclick={toggleMenu}
                    aria-label="Cerrar menú"
                >
                    <svg
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        stroke-width="2"
                    >
                        <line x1="18" y1="6" x2="6" y2="18"></line>
                        <line x1="6" y1="6" x2="18" y2="18"></line>
                    </svg>
                </button>
            </div>
            <nav class="mobile-nav">
                {#each navItems as item}
                    <NavLink
                        href={item.href}
                        active={clickedMobileLink === item.href}
                        onclick={() => handleMobileClick(item.href)}
                        class="mobile-link"
                    >
                        {item.name}
                    </NavLink>
                {/each}
            </nav>
        </div>
    {/if}
</header>

<style>
    .header {
        position: fixed;
        top: 16px;
        left: 0;
        right: 0;
        z-index: 99;
        display: flex;
        justify-content: center;
        padding: 0 16px;
        pointer-events: none;
    }

    .header-wrapper {
        width: auto;
        max-width: 1280px;
        display: flex;
        justify-content: center;
        pointer-events: auto;
    }

    /* Desktop Navigation - Pill Style */
    .desktop-nav {
        position: relative;
        display: grid;
        grid-template-columns: 1fr auto 1fr;
        align-items: center;
        background: #000000;
        backdrop-filter: blur(12px);
        border-radius: 50px;
        box-shadow: 0 4px 24px rgba(0, 0, 0, 0.3);
        transition:
            padding 0.8s cubic-bezier(0.4, 0, 0.2, 1),
            gap 0.5s cubic-bezier(0.4, 0, 0.2, 1);
        width: 100%;
        overflow: hidden;
        isolation: isolate;
    }

    .nav-border-beam {
        position: absolute;
        inset: 0;
        border-radius: 50px;
        border: 1px solid rgba(255, 255, 255, 0.1);
        pointer-events: none;
    }

    .desktop-nav:hover {
        padding: 8px 24px !important;
        gap: 24px !important;
    }

    .desktop-nav:hover .nav-list {
        opacity: 1 !important;
        max-width: 400px !important;
    }

    .logo {
        display: flex;
        align-items: center;
        justify-content: center;
        text-decoration: none;
        grid-column: 2;
    }

    .logo img {
        height: 32px;
        width: auto;
    }

    .nav-list {
        display: flex;
        gap: 8px;
        list-style: none;
        margin: 0;
        padding: 0;
        align-items: center;
        overflow: hidden;
        transition:
            opacity 0.5s cubic-bezier(0.4, 0, 0.2, 1),
            max-width 0.5s cubic-bezier(0.4, 0, 0.2, 1);
    }

    .nav-list-left {
        justify-content: flex-end;
    }

    .nav-list-right {
        justify-content: flex-start;
    }

    /* Mobile header */
    .mobile-header {
        display: none;
        align-items: center;
        justify-content: space-between;
        width: 100%;
        padding: 8px 16px;
        background: rgba(13, 13, 13, 0.8);
        backdrop-filter: blur(12px);
        border-radius: 50px;
        border: 1px solid rgba(255, 255, 255, 0.1);
        box-shadow: 0 4px 24px rgba(0, 0, 0, 0.3);
    }

    .mobile-logo {
        display: flex;
        align-items: center;
        text-decoration: none;
    }

    .mobile-logo img {
        height: 24px;
        width: auto;
    }

    /* Hamburger menu wrapper with border-beam */
    .menu-toggle-wrapper {
        position: relative;
        border-radius: 10px;
        overflow: hidden;
        isolation: isolate;
    }

    .menu-toggle-wrapper .border-beam {
        position: absolute;
        inset: 0;
        border-radius: 10px;
        padding: 1.5px;
        background: conic-gradient(
            from var(--angle),
            transparent 0%,
            transparent 60%,
            rgba(255, 255, 255, 0.1) 70%,
            rgba(255, 255, 255, 0.4) 75%,
            rgba(255, 255, 255, 0.9) 80%,
            rgba(255, 255, 255, 1) 82.5%,
            rgba(255, 255, 255, 0.9) 85%,
            rgba(255, 255, 255, 0.4) 90%,
            rgba(255, 255, 255, 0.1) 95%,
            transparent 100%
        );
        -webkit-mask:
            linear-gradient(#fff 0 0) content-box,
            linear-gradient(#fff 0 0);
        -webkit-mask-composite: xor;
        mask:
            linear-gradient(#fff 0 0) content-box,
            linear-gradient(#fff 0 0);
        mask-composite: exclude;
        animation: border-beam-spin 3s linear infinite;
        filter: blur(0.3px);
        pointer-events: none;
    }

    .menu-toggle {
        display: flex;
        position: relative;
        flex-direction: column;
        gap: 4px;
        background: rgba(13, 13, 13, 0.9);
        border: none;
        cursor: pointer;
        padding: 10px;
        border-radius: 10px;
        z-index: 1;
    }

    .menu-toggle span {
        width: 20px;
        height: 2px;
        background: var(--text-color);
        transition: all 0.3s ease;
    }

    /* Hamburger animation to X */
    .menu-toggle span.open:nth-child(1) {
        transform: rotate(45deg) translateY(6px);
    }

    .menu-toggle span.open:nth-child(2) {
        opacity: 0;
    }

    .menu-toggle span.open:nth-child(3) {
        transform: rotate(-45deg) translateY(-6px);
    }

    /* Mobile overlay */
    .mobile-overlay {
        position: fixed;
        inset: 0;
        background: rgba(0, 0, 0, 0.6);
        backdrop-filter: blur(4px);
        z-index: 999;
        animation: fade-in 0.3s ease;
    }

    /* Mobile Sheet (slides from right) */
    .mobile-sheet {
        position: fixed;
        top: 0;
        right: 0;
        height: 100vh;
        width: 320px;
        max-width: 85vw;
        background: rgba(13, 13, 13, 0.98);
        backdrop-filter: blur(20px);
        border-left: 1px solid rgba(255, 255, 255, 0.1);
        box-shadow: -4px 0 24px rgba(0, 0, 0, 0.5);
        z-index: 1000;
        display: flex;
        flex-direction: column;
        animation: slide-in 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    }

    .sheet-header {
        display: flex;
        justify-content: flex-end;
        align-items: center;
        padding: var(--spacing-xl) var(--spacing-lg);
        border-bottom: 1px solid rgba(255, 255, 255, 0.1);
    }

    .close-btn {
        background: transparent;
        border: none;
        color: rgba(255, 255, 255, 0.7);
        cursor: pointer;
        padding: 8px;
        border-radius: 8px;
        transition: all 0.2s ease;
        display: flex;
        align-items: center;
        justify-content: center;
    }

    .close-btn:hover {
        background: rgba(255, 255, 255, 0.1);
        color: #ffffff;
        transform: rotate(90deg);
    }

    .mobile-nav {
        display: flex;
        flex-direction: column;
        gap: var(--spacing-sm);
        padding: var(--spacing-lg);
        flex: 1;
    }

    .mobile-nav :global(.mobile-link) {
        width: 100%;
        text-align: center;
        padding: 14px 20px;
        font-size: 1.1rem;
    }

    @keyframes border-beam-spin {
        0% {
            --angle: 0deg;
        }
        100% {
            --angle: 360deg;
        }
    }

    @keyframes fade-in {
        from {
            opacity: 0;
        }
        to {
            opacity: 1;
        }
    }

    @keyframes slide-in {
        from {
            transform: translateX(100%);
        }
        to {
            transform: translateX(0);
        }
    }

    @property --angle {
        syntax: "<angle>";
        initial-value: 0deg;
        inherits: false;
    }

    @media (max-width: 1023px) {
        .header-wrapper {
            width: 100%;
        }

        .desktop-nav {
            display: none;
        }

        .mobile-header {
            display: flex;
        }
    }
</style>
