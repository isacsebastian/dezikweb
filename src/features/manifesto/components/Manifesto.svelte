<script lang="ts">
    import { onMount, onDestroy } from "svelte";
    import { gsap } from "../../../lib/animations/gsap-config";
    import { ScrollTrigger } from "gsap/ScrollTrigger";

    gsap.registerPlugin(ScrollTrigger);

    let textElement: HTMLElement;
    let spanElement: HTMLElement;
    let ctx: gsap.Context;

    onMount(() => {
        ctx = gsap.context(() => {
            if (
                spanElement &&
                !window.matchMedia("(prefers-reduced-motion: reduce)").matches
            ) {
                gsap.to(spanElement, {
                    backgroundSize: "200% 200%",
                    ease: "none",
                    scrollTrigger: {
                        trigger: textElement,
                        start: "top 80%",
                        end: "bottom 35%",
                        scrub: true,
                    },
                });
            }
        });
    });

    onDestroy(() => {
        ctx && ctx.revert();
    });
</script>

<section class="manifesto">
    <div class="fill-text js-fill" bind:this={textElement}>
        <span bind:this={spanElement}>
            Somos el impulso detrás de las ideas que tu marca necesita. No solo
            ofrecemos asesoría; nos asociamos estratégicamente con cada
            proyecto, brindando respaldo en tecnología, branding y estrategia
            comercial para garantizar su éxito y crecimiento continuo.
        </span>
    </div>
</section>

<style>
    /* Scoped styles for the component */
    .manifesto {
        min-height: 100vh;
        padding: 3vh 6vw 5vh;
        display: flex;
        align-items: center;
        justify-content: center;
        flex-direction: column;
        font-family: "Aeonik", system-ui, sans-serif;
        position: relative;
        background: var(--bg-color, #0b0c0f);
    }

    :global(.manifesto) {
        --fg: #f3f4f6;
        --muted: #3f434a;
    }

    .fill-text {
        margin: 0;
        font-size: clamp(22px, 4vw, 48px);
        font-weight: 600;
        line-height: 1.15;
        letter-spacing: -0.01em;
        text-wrap: pretty;
        font-family: "Aeonik", system-ui, sans-serif;
        text-align: center;
        max-width: 980px;
        color: var(--muted);
    }

    .fill-text > span {
        -webkit-background-clip: text;
        background-clip: text;
        background-color: var(--muted);
        background-image: linear-gradient(
            135deg,
            var(--fg) 50%,
            var(--muted) 60%
        );
        background-position: 0 0;
        background-repeat: no-repeat;
        background-size: 0% 200%;
        color: transparent;
        display: inline;
        will-change: background-size;
    }

    .credit {
        position: absolute;
        bottom: 18px;
        left: 50%;
        transform: translateX(-50%);

        font-size: 12px;
        letter-spacing: 0.08em;
        text-transform: uppercase;
        color: color-mix(in srgb, var(--fg) 70%, transparent);
        text-decoration: none;
        padding: 8px 10px;
        border-radius: 999px;
        background: color-mix(in srgb, var(--bg-color) 70%, transparent);
        backdrop-filter: blur(8px);
        -webkit-backdrop-filter: blur(8px);
    }

    .credit:hover {
        color: var(--fg);
    }

    @media (prefers-reduced-motion: reduce) {
        .fill-text > span {
            background-size: 200% 200%;
        }
    }
</style>
