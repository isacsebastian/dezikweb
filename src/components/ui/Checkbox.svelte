<script lang="ts">
    export let checked: boolean = false;
    export let label: string = '';
</script>

<label class="checkbox-wrapper">
    <input type="checkbox" bind:checked class="checkbox" />
    {#if label}
        <span class="checkbox-label">{label}</span>
    {/if}
    <slot />
</label>

<style>
    .checkbox-wrapper {
        display: flex;
        align-items: center;
        gap: 0.75rem;
        cursor: pointer;
    }

    .checkbox {
        width: 1.25rem;
        height: 1.25rem;
        border-radius: 4px;
        border: 2px solid rgba(255, 255, 255, 0.3);
        background: transparent;
        cursor: pointer;
        appearance: none;
        transition: all 0.2s;
    }

    .checkbox:checked {
        background: rgba(255, 255, 255, 0.2);
        border-color: rgba(255, 255, 255, 0.6);
    }

    .checkbox-label {
        color: rgba(255, 255, 255, 0.8);
        font-size: 0.95rem;
    }
</style>
