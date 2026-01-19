<script lang="ts">
    import { onMount, onDestroy } from 'svelte';

    // Array de items para el slider (tarjetas)
    const sliderItems = [
        { id: 1, etiqueta: 'Web Development', titulo: 'Proyecto Alpha', descripcion: 'Desarrollo de aplicación web' },
        { id: 2, etiqueta: 'Mobile App', titulo: 'Proyecto Beta', descripcion: 'App móvil multiplataforma' },
        { id: 3, etiqueta: 'E-commerce', titulo: 'Proyecto Gamma', descripcion: 'Tienda online avanzada' },
        { id: 4, etiqueta: 'Design System', titulo: 'Proyecto Delta', descripcion: 'Sistema de diseño completo' },
        { id: 5, etiqueta: 'Backend API', titulo: 'Proyecto Epsilon', descripcion: 'API REST escalable' },
        { id: 6, etiqueta: 'Cloud Services', titulo: 'Proyecto Zeta', descripcion: 'Infraestructura cloud' },
        { id: 7, etiqueta: 'Database', titulo: 'Proyecto Eta', descripcion: 'Gestión de datos' },
        { id: 8, etiqueta: 'DevOps', titulo: 'Proyecto Theta', descripcion: 'CI/CD automatizado' },
        { id: 9, etiqueta: 'Security', titulo: 'Proyecto Iota', descripcion: 'Auditoría de seguridad' },
        { id: 10, etiqueta: 'Analytics', titulo: 'Proyecto Kappa', descripcion: 'Dashboard de métricas' },
    ];

    let currentOffset = $state(0);
    let interval: number;

    const cardsToShow = 4; // Mostrar 4 tarjetas a la vez
    const cardsToMove = 2; // Mover 2 tarjetas cada vez
    const autoMoveDelay = 3000; // 3 segundos

    const maxOffset = Math.max(0, sliderItems.length - cardsToShow);

    onMount(() => {
        // Auto-avanzar cada 3 segundos
        interval = setInterval(() => {
            currentOffset = (currentOffset + cardsToMove) % (maxOffset + 1);
        }, autoMoveDelay);
    });

    onDestroy(() => {
        if (interval) clearInterval(interval);
    });
</script>



<section class="slider-section">
    <h2 class="section-title">Tecnologías que dominamos</h2>
    
    <!-- Slider: Auto move 2 cards every 3 seconds -->
    <div 
        class="slider-container"
        style="--width: 400px; --height: 180px; --gap: 24px;"
    >
        <div class="slider-viewport">
            <div 
                class="slider-track"
                style="transform: translateX(calc(-1 * {currentOffset} * (var(--width) + var(--gap))))"
            >
                {#each sliderItems as item}
                    <div class="item">
                        <div class="card">
                            <div class="logo">LOGO</div>
                            <div class="content">
                                <div class="etiqueta">{item.etiqueta}</div>
                                <div class="titulo">{item.titulo}</div>
                                <div class="descripcion">{item.descripcion}</div>
                            </div>
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
    }

    .section-title {
        text-align: center;
        color: #fff;
        font-size: var(--font-size-4xl);
        margin-bottom: var(--spacing-2xl);
        -webkit-background-clip: text;
        -webkit-text-fill-color: #fff;
        background-clip: text;
    }

    .slider-container {
        width: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
    }

    .slider-viewport {
        width: 85%;
        max-width: calc(4 * (var(--width) + var(--gap)) - var(--gap));
        overflow: hidden;
        position: relative;
    }

    .slider-track {
        display: flex;
        gap: var(--gap);
        transition: transform 0.8s cubic-bezier(0.4, 0, 0.2, 1);
    }

    .item {
        width: var(--width);
        height: var(--height);
        flex-shrink: 0;
    }

    .card {
        width: 100%;
        height: 100%;
        background: transparent;
        border: 2px solid rgba(255, 255, 255, 0.3);
        border-radius: 16px;
        padding: 16px;
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 16px;
        transition: all 0.3s ease;
    }

    .logo {
        width: 120px;
        height: 120px;
        background: transparent;
        border: 2px solid rgba(255, 255, 255, 0.3);
        border-radius: 12px;
        display: flex;
        align-items: center;
        justify-content: center;
        font-weight: bold;
        flex-shrink: 0;
        color: #fff;
    }

    .content {
        flex: 1;
        display: flex;
        flex-direction: column;
        justify-content: center;
        gap: 8px;
    }

    .etiqueta {
        background: transparent;
        border: 1px solid rgba(255, 255, 255, 0.3);
        border-radius: 8px;
        padding: 4px 12px;
        font-size: 12px;
        width: fit-content;
        color: #fff;
    }

    .titulo {
        font-size: 18px;
        font-weight: bold;
        color: #fff;
    }

    .descripcion {
        font-size: 14px;
        color: rgba(255, 255, 255, 0.7);
    }

    .card:hover {
        transform: scale(1.02);
        box-shadow: 0 8px 16px rgba(255, 255, 255, 0.1);
        border-color: rgba(255, 255, 255, 0.5);
    }

    @media (max-width: 768px) {
        .slider {
            --width: 100px !important;
            --height: 35px !important;
        }

        .section-title {
            font-size: var(--font-size-2xl);
        }
    }
</style>
