<script lang="ts">
    import { onMount, onDestroy } from "svelte";

    // Client logos from public/clients
    const clients = [
        "/clients/La-Barbiere.svg",
        "/clients/Solare.svg",
        "/clients/logodezik.svg",
        "/clients/pura-vida.svg",
    ];

    // Duplicate items to ensure smooth infinite scrolling
    // We need enough items to fill the viewport + buffer
    const sliderItems = [...clients, ...clients, ...clients, ...clients];

    let currentOffset = $state(0);
    let interval: number;

    const cardsToShow = 4;
    const cardsToMove = 1;
    const autoMoveDelay = 3000;

    const maxOffset = sliderItems.length - cardsToShow;

    onMount(() => {
        interval = setInterval(() => {
            currentOffset = (currentOffset + cardsToMove) % (maxOffset + 1);
        }, autoMoveDelay);
    });

    onDestroy(() => {
        if (interval) clearInterval(interval);
    });
</script>

<section class="slider-section">
    <h2 class="section-title">Confían en nosotros</h2>

    <div
        class="slider-container"
        style="--width: 280px; --height: 160px; --gap: 32px;"
    >
        <div class="slider-viewport">
            <div
                class="slider-track"
                style="transform: translateX(calc(-1 * {currentOffset} * (var(--width) + var(--gap))))"
            >
                {#each sliderItems as client, i}
                    <div class="item">
                        <div class="card">
                            <img
                                src={client}
                                alt="Client Logo {i}"
                                class="client-logo"
                            />
                        </div>
                    </div>
                {/each}
            </div>
        </div>
    </div>
</section>

<style>
    * {
        margin: 0;
        padding: 0;
        box-sizing: border-box;
    }

    .slider-section {
        padding: var(--spacing-3xl) 0;
        overflow: hidden;
        width: 100%;
    }

    .section-title {
        text-align: center;
        color: #fff;
        font-size: var(--font-size-4xl);
        margin-bottom: var(--spacing-2xl);
    }

    .slider-container {
        width: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
    }

    .slider-viewport {
        width: 100%;
        max-width: 1400px;
        overflow: hidden;
        position: relative;
        mask-image: linear-gradient(
            to right,
            transparent,
            black 10%,
            black 90%,
            transparent
        );
        -webkit-mask-image: linear-gradient(
            to right,
            transparent,
            black 10%,
            black 90%,
            transparent
        );
    }

    .slider-track {
        display: flex;
        gap: var(--gap);
        transition: transform 0.8s cubic-bezier(0.4, 0, 0.2, 1);
        padding: 0 var(--gap);
    }

    .item {
        width: var(--width);
        height: var(--height);
        flex-shrink: 0;
        display: flex;
        align-items: center;
        justify-content: center;
    }

    .card {
        width: 100%;
        height: 100%;
        /* Glassmorphism style */
        background: rgba(255, 255, 255, 0.03);
        border: 1px solid rgba(255, 255, 255, 0.1);
        border-radius: 16px;
        padding: 24px;
        display: flex;
        align-items: center;
        justify-content: center;
        transition: all 0.3s ease;
    }

    .client-logo {
        width: 100%;
        height: 100%;
        object-fit: contain;
        filter: grayscale(1) brightness(1.2);
        transition: all 0.3s ease;
        opacity: 0.7;
    }

    .card:hover {
        background: rgba(255, 255, 255, 0.08);
        border-color: rgba(255, 255, 255, 0.2);
        transform: translateY(-5px);
        box-shadow: 0 10px 20px rgba(0, 0, 0, 0.2);
    }

    .card:hover .client-logo {
        filter: grayscale(0) brightness(1);
        opacity: 1;
        transform: scale(1.05);
    }

    @media (max-width: 768px) {
        .slider-section {
            padding: var(--spacing-xl) 0;
        }

        .slider-container {
            --width: 160px !important;
            --height: 100px !important;
            --gap: 16px !important;
        }

        .section-title {
            font-size: var(--font-size-2xl);
            margin-bottom: var(--spacing-xl);
        }
    }
</style>
