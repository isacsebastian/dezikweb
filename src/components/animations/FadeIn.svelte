<script lang="ts">
    import { onMount } from 'svelte';
    import { gsap } from '../../lib/animations/gsap-config';

    interface Props {
        direction?: 'up' | 'down' | 'left' | 'right';
        delay?: number;
        duration?: number;
    }

    let { direction = 'up', delay = 0, duration = 0.8 }: Props = $props();
    
    let element: HTMLElement;

    onMount(() => {
        const animations = {
            up: { y: 50, x: 0 },
            down: { y: -50, x: 0 },
            left: { x: 50, y: 0 },
            right: { x: -50, y: 0 }
        };

        gsap.from(element, {
            opacity: 0,
            ...animations[direction],
            duration,
            delay,
            ease: 'power3.out',
            scrollTrigger: {
                trigger: element,
                start: 'top 85%',
                toggleActions: 'play none none reverse',
            }
        });
    });
</script>

<div bind:this={element} class="fade-in-wrapper">
    <slot />
</div>

<style>
    .fade-in-wrapper {
        display: contents;
    }
</style>
