<script lang="ts">
    export let src: string = '';
    export let alt: string = '';
    export let size: 'sm' | 'md' | 'lg' = 'md';
</script>

<div class="avatar avatar-{size}">
    {#if src}
        <img {src} {alt} class="avatar-image" />
    {:else}
        <div class="avatar-fallback">
            <slot />
        </div>
    {/if}
</div>

<style>
    .avatar {
        border-radius: 50%;
        overflow: hidden;
        display: flex;
        align-items: center;
        justify-content: center;
        background: rgba(255, 255, 255, 0.1);
    }

    .avatar-sm {
        width: 2rem;
        height: 2rem;
    }

    .avatar-md {
        width: 3rem;
        height: 3rem;
    }

    .avatar-lg {
        width: 4rem;
        height: 4rem;
    }

    .avatar-image {
        width: 100%;
        height: 100%;
        object-fit: cover;
    }

    .avatar-fallback {
        width: 100%;
        height: 100%;
        display: flex;
        align-items: center;
        justify-content: center;
        font-weight: 600;
        color: rgba(255, 255, 255, 0.8);
    }
</style>
