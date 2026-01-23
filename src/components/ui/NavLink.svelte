<script lang="ts">
    interface Props {
        href: string;
        active?: boolean;
        children?: any;
        onclick?: () => void;
        class?: string;
    }

    let {
        href,
        active = false,
        children,
        onclick,
        class: className = "",
    }: Props = $props();
</script>

<a {href} class="nav-link {className}" class:active {onclick}>
    <span class="border-beam"></span>
    <span class="link-content">{@render children?.()}</span>
</a>

<style>
    .nav-link {
        position: relative;
        display: inline-block;
        padding: 10px 20px;
        color: rgba(255, 255, 255, 0.7);
        text-decoration: none;
        font-weight: 500;
        border-radius: 25px;
        transition: color 0.3s ease;
        overflow: hidden;
        isolation: isolate;
    }

    /* Borde base sutil */
    .nav-link::before {
        content: "";
        position: absolute;
        inset: 0;
        border-radius: 25px;
        padding: 1px;
        background: rgba(100, 100, 100, 0.2);
        -webkit-mask:
            linear-gradient(#fff 0 0) content-box,
            linear-gradient(#fff 0 0);
        -webkit-mask-composite: xor;
        mask:
            linear-gradient(#fff 0 0) content-box,
            linear-gradient(#fff 0 0);
        mask-composite: exclude;
        pointer-events: none;
        opacity: 0;
        transition: opacity 0.3s ease;
    }

    .nav-link:hover::before {
        opacity: 1;
    }

    /* Border beam animado - SOLO en hover */
    .border-beam {
        position: absolute;
        inset: 0;
        border-radius: 25px;
        padding: 1.5px;
        background: conic-gradient(
            from var(--angle),
            transparent 0%,
            transparent 60%,
            rgba(255, 255, 255, 0.1) 70%,
            rgba(255, 255, 255, 0.4) 75%,
            rgba(255, 255, 255, 0.9) 80%,
            rgba(255, 255, 255, 1) 82.5%,
            rgba(255, 255, 255, 0.9) 85%,
            rgba(255, 255, 255, 0.4) 90%,
            rgba(255, 255, 255, 0.1) 95%,
            transparent 100%
        );
        -webkit-mask:
            linear-gradient(#fff 0 0) content-box,
            linear-gradient(#fff 0 0);
        -webkit-mask-composite: xor;
        mask:
            linear-gradient(#fff 0 0) content-box,
            linear-gradient(#fff 0 0);
        mask-composite: exclude;
        filter: blur(0.5px);
        opacity: 0;
        transition: opacity 0.3s ease;
        pointer-events: none;
    }

    /* Border beam SOLO en hover, NO en active */
    .nav-link:hover .border-beam {
        opacity: 1;
        animation: border-beam-spin 3s linear infinite;
    }

    /* Glow effect */
    .border-beam::after {
        content: "";
        position: absolute;
        inset: -8px;
        background: conic-gradient(
            from var(--angle),
            transparent 0%,
            transparent 70%,
            rgba(255, 255, 255, 0.05) 75%,
            rgba(255, 255, 255, 0.2) 80%,
            rgba(255, 255, 255, 0.3) 82.5%,
            rgba(255, 255, 255, 0.2) 85%,
            rgba(255, 255, 255, 0.05) 90%,
            transparent 100%
        );
        filter: blur(12px);
        opacity: 0.6;
        z-index: -1;
    }

    .link-content {
        position: relative;
        z-index: 1;
    }

    .nav-link:hover {
        color: #ffffff;
    }

    .nav-link.active {
        color: #f22c36;
    }

    .nav-link:hover .border-beam {
        animation-duration: 2s;
    }

    @keyframes border-beam-spin {
        0% {
            --angle: 0deg;
        }
        100% {
            --angle: 360deg;
        }
    }

    @property --angle {
        syntax: "<angle>";
        initial-value: 0deg;
        inherits: false;
    }
</style>
