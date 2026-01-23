<script lang="ts">
    import { onMount } from "svelte";
    import { gsap } from "../../../lib/animations/gsap-config";
    import { CheckCircle } from "lucide-svelte";
    import SolarSystemVisual from "./SolarSystem.svelte";

    // Placeholder data
    const features = [
        {
            title: "Understanding",
            description: "Deep comprehension of your needs and goals.",
        },
        {
            title: "Sourcing",
            description: "Finding the best talent efficiently.",
        },
        {
            title: "Vetting",
            description: "Rigorous screening for quality assurance.",
        },
        {
            title: "Onboarding",
            description: "Seamless integration into your team.",
        },
    ];

    onMount(() => {
        // Simple entry animation
        gsap.from(".info-anim-item", {
            opacity: 0,
            y: 30,
            duration: 0.8,
            stagger: 0.2,
            scrollTrigger: {
                trigger: ".info-section",
                start: "top 80%",
            },
        });
    });
</script>

<section class="info-section">
    <div class="info-container">
        <header class="info-header info-anim-item">
            <h2 class="section-title">Dezik labs...</h2>
            <p class="section-subtitle">
                Your strategic partner in talent acquisition.
            </p>
        </header>

        <div class="info-body">
            <div class="info-media info-anim-item">
                <div class="image-wrapper">
                    <SolarSystemVisual />
                </div>
            </div>

            <div class="info-features info-anim-item">
                <ul class="feature-list">
                    {#each features as feature}
                        <li class="feature-item">
                            <div class="icon-wrapper">
                                <CheckCircle size={24} color="var(--primary)" />
                            </div>
                            <div class="feature-content">
                                <h3 class="feature-title">{feature.title}</h3>
                                <p class="feature-desc">
                                    {feature.description}
                                </p>
                            </div>
                        </li>
                    {/each}
                </ul>
            </div>
        </div>
    </div>
</section>

<style>
    .info-section {
        width: 100%;
        /*background-color: var(--bg-color); */
        padding: var(--spacing-xl) 0;
        color: var(--text-color);
        overflow: hidden;
    }

    .info-container {
        width: 90%;
        max-width: var(--max-width);
        margin: 0 auto;
        display: flex;
        flex-direction: column;
        gap: var(--spacing-lg);
    }

    .info-header {
        text-align: center;
        max-width: 800px;
        margin: 0 auto;
    }

    .section-title {
        font-family: "Aeonik", sans-serif;
        font-size: var(--font-size-4xl);
        font-weight: 700;
        margin-bottom: var(--spacing-sm);
    }

    .section-subtitle {
        font-size: var(--font-size-lg);
        color: rgba(255, 255, 255, 0.7);
        font-weight: 300;
    }

    .info-body {
        display: flex;
        flex-direction: column;
        gap: var(--spacing-sm);
    }

    /* Media Column */
    .info-media {
        width: 100%;
    }

    .image-wrapper {
        width: 100%;
        min-height: 45vh;
        border-radius: var(--border-radius);
        overflow: hidden;
        display: flex;
        align-items: center;
        justify-content: center;
        background-color: transparent;
    }

    .placeholder-image {
        width: 100%;
        height: 100%;
        background: linear-gradient(45deg, #1a1a1a, #2a2a2a);
        display: flex;
        align-items: center;
        justify-content: center;
        color: rgba(255, 255, 255, 0.3);
        font-size: var(--font-size-xl);
    }

    /* Features Column */
    .info-features {
        width: 100%;
    }

    .feature-list {
        list-style: none;
        padding: 0;
        margin: 0;
        display: flex;
        flex-direction: column;
        gap: var(--spacing-sm);
    }

    .feature-item {
        display: flex;
        gap: var(--spacing-xs);
        align-items: flex-start;
        padding: var(--spacing-xs);
        border-radius: var(--border-radius-sm);
        transition: var(--transition-base);
    }

    .feature-item:hover {
        transform: translateX(10px);
    }

    .icon-wrapper {
        flex-shrink: 0;
        display: flex;
        align-items: center;
        justify-content: center;
        width: 40px;
        height: 40px;
        background: rgba(242, 44, 54, 0.1);
        border-radius: 50%;
    }

    .feature-title {
        font-size: var(--font-size-lg);
        font-weight: 700;
        margin-bottom: 0.25rem;
        color: var(--text-color);
    }

    .feature-desc {
        font-size: var(--font-size-base);
        color: rgba(255, 255, 255, 0.6);
        line-height: 1.5;
    }

    /* Desktop Layout */
    @media (min-width: 960px) {
        .info-body {
            flex-direction: row;
            align-items: center;
        }

        .info-media,
        .info-features {
            width: 50%;
        }

        .info-media {
            padding-right: var(--spacing-xl);
        }

        .info-features {
            padding-left: var(--spacing-xl);
        }
    }
</style>
