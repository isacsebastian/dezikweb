<script lang="ts">
    import { onMount } from 'svelte';
    import { gsap } from '../../../lib/animations/gsap-config';
    import ScrollTrigger from 'gsap/ScrollTrigger';
    import Dashboard from './Dashboard.svelte';

    // Empty structure - 4 containers
    let items = [1, 2, 3, 4];

    onMount(() => {
        if (typeof window === 'undefined') return;

        gsap.registerPlugin(ScrollTrigger);

        // Animate wrapper width from 85% to 100%
        const wrapper = document.querySelector('.services-wrapper');
        if (wrapper) {
            gsap.fromTo(wrapper,
                { width: '85%' },
                {
                    width: '100%',
                    ease: 'power2.out',
                    scrollTrigger: {
                        trigger: wrapper,
                        start: 'top 80%',
                        end: 'top 30%',
                        scrub: 1.5
                    }
                }
            );
        }

        // Animate each service item with depth effect
        gsap.utils.toArray('.service-item').forEach((item: any) => {
            gsap.fromTo(item,
                {
                    scale: 0.9,
                    opacity: 0,
                    y: 40,
                    filter: 'blur(2px)'
                },
                {
                    scale: 1,
                    opacity: 1,
                    y: 0,
                    filter: 'blur(0px)',
                    duration: 1.2,
                    ease: 'power2.out',
                    scrollTrigger: {
                        trigger: item,
                        start: 'top 85%',
                        end: 'top 50%',
                        scrub: 1.5,
                        toggleActions: 'play none none reverse'
                    }
                }
            );
        });

        // Animate inner divs with depth effect
        gsap.utils.toArray('.animated-content').forEach((content: any) => {
            gsap.fromTo(content,
                {
                    scale: 0.9,
                    opacity: 0,
                    filter: 'blur(2px)'
                },
                {
                    scale: 1,
                    opacity: 1,
                    filter: 'blur(0px)',
                    duration: 1.2,
                    ease: 'power2.out',
                    scrollTrigger: {
                        trigger: content,
                        start: 'top 75%',
                        end: 'top 35%',
                        scrub: 1.5,
                        toggleActions: 'play none none reverse'
                    }
                }
            );
        });
    });
</script>

<section id="services" class="services">
    <div class="container">
        <div class="services-wrapper">
            {#each items as item, index}
                <div class="service-item">
                    <div class="service-column service-column-left">
                        {#if index === 0 || index === 2}
                            <div class="animated-content">
                                {#if index === 0}
                                    <Dashboard />
                                {:else}
                                    <!-- Animated left content for item 3 -->
                                {/if}
                            </div>
                        {:else}
                            <!-- Static left content for items 2 & 4 -->
                        {/if}
                    </div>
                    <div class="service-column service-column-right">
                        {#if index === 1 || index === 3}
                            <div class="animated-content">
                                <!-- Animated right content for items 2 & 4 -->
                            </div>
                        {:else}
                            <!-- Static right content for items 1 & 3 -->
                        {/if}
                    </div>
                </div>
            {/each}
        </div>
    </div>
</section>

<style>
    .services {
        width: 100%;
        padding: var(--spacing-3xl) 0;
        background: linear-gradient(180deg, transparent 0%, rgba(0, 0, 0, 0.03) 100%);
    }

    .container {
        width: 100%;
        margin: 0 auto;
    }

    .services-wrapper {
        width: 85%;
        margin: 0 auto;
        display: flex;
        flex-direction: column;
        gap: var(--spacing-lg);
    }

    .service-item {
        width: 100%;
        height: 60vh;
        background: rgba(128, 128, 128, 0.2);
        border-radius: 15px;
        padding: var(--spacing-xl);
        display: grid;
        grid-template-columns: 1fr 1fr;
        gap: var(--spacing-lg);
        transition: all var(--transition-base);
    }

    .service-column {
        display: flex;
        flex-direction: column;
        justify-content: center;
    }

    .service-column-left {
        align-items: flex-start;
    }

    .service-column-right {
        align-items: flex-start;
    }

    .animated-content {
        width: 100%;
        height: 100%;
        background: rgba(255, 255, 255, 0.05);
        border-radius: 10px;
        padding: var(--spacing-lg);
        display: flex;
        align-items: center;
        justify-content: center;
    }

    .service-icon {
        font-size: 3rem;
        margin-bottom: var(--spacing-md);
    }

    .service-item h3 {
        font-size: var(--font-size-2xl);
        margin: 0;
    }

    .service-item p {
        opacity: 0.8;
        margin: 0;
        font-size: var(--font-size-lg);
    }

    @media (max-width: 768px) {
        .container {
            width: 90%;
        }

        .service-item {
            grid-template-columns: 1fr;
        }
    }
</style>
