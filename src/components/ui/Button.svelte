<script lang="ts">
    interface Props {
        variant?: 'primary' | 'secondary';
        href?: string;
        type?: 'button' | 'submit';
    }

    let { variant = 'primary', href, type = 'button' }: Props = $props();
</script>

{#if href}
    <a {href} class="btn btn-{variant}">
        <slot />
    </a>
{:else}
    <button {type} class="btn btn-{variant}">
        <slot />
    </button>
{/if}

<style>
    .btn {
        padding: 14px 32px;
        border-radius: var(--border-radius);
        font-family: 'Aeonik', sans-serif;
        font-weight: 700;
        font-size: var(--font-size-base);
        cursor: pointer;
        text-decoration: none;
        display: inline-block;
        transition: all var(--transition-base);
        border: none;
    }

    .btn-primary {
        background-color: var(--primary);
        color: white;
    }

    .btn-primary:hover {
        background: var(--gradient-hover);
        transform: translateY(-2px);
        box-shadow: var(--shadow-glow);
    }

    .btn-secondary {
        background-color: transparent;
        color: var(--text-color);
        border: 2px solid var(--text-color);
        padding: 12px 30px;
    }

    .btn-secondary:hover {
        background-color: var(--text-color);
        color: var(--bg-color);
        transform: translateY(-2px);
    }
</style>
