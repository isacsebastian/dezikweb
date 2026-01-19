<script lang="ts">
    export let title: string = '';
    export let subtitle: string = '';
</script>

<div class="card">
    <div class="card-header">
        {#if title}
            <h3 class="card-title">{title}</h3>
        {/if}
        {#if subtitle}
            <p class="card-subtitle">{subtitle}</p>
        {/if}
    </div>
    <div class="card-content">
        <slot />
    </div>
</div>

<style>
    .card {
        background: rgba(255, 255, 255, 0.01); /* Casi transparente */
        border: 1px solid rgba(255, 255, 255, 0.05); /* Borde sutil */
        border-radius: 24px;
        overflow: hidden;
        position: relative;
        
        /* El truco del Glassmorphism */
        backdrop-filter: blur(12px) saturate(180%);
        -webkit-backdrop-filter: blur(12px) saturate(180%);
        
        box-shadow: 0 8px 32px 0 rgba(0, 0, 0, 0.8);
        transition: all 0.3s ease;
    }
    
    .card:hover {
        border-color: rgba(255, 255, 255, 0.1);
        box-shadow: 0 12px 48px 0 rgba(0, 0, 0, 0.9);
        transform: translateY(-2px);
    }

    .card-header {
        padding: 1.5rem;
        border-bottom: 1px solid rgba(255, 255, 255, 0.05);
    }

    .card-title {
        font-size: 1.25rem;
        font-weight: 600;
        margin: 0;
        color: rgba(255, 255, 255, 0.9);
    }

    .card-subtitle {
        font-size: 0.875rem;
        color: rgba(255, 255, 255, 0.6);
        margin: 0.25rem 0 0 0;
    }

    .card-content {
        padding: 1.5rem;
    }
</style>
