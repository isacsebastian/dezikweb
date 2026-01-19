<script lang="ts">
    interface Props {
        children?: any;
        onclick?: () => void;
        class?: string;
    }

    let { children, onclick, class: className = '' }: Props = $props();
</script>

<button class="border-beam-btn {className}" {onclick}>
    <span class="border-beam"></span>
    <span class="btn-content">{@render children?.()}</span>
</button>

<style>
    .border-beam-btn {
        position: relative;
        padding: 12px 28px;
        background: #0a0a0a;
        border: none;
        border-radius: 30px;
        color: #ffffff;
        font-weight: 500;
        font-size: 14px;
        cursor: pointer;
        overflow: hidden;
        transition: all 0.3s ease;
        isolation: isolate;
    }

    .border-beam-btn::before {
        content: '';
        position: absolute;
        inset: 0;
        border-radius: 30px;
        padding: 1.5px;
        background: linear-gradient(
            90deg,
            rgba(100, 100, 100, 0.3) 0%,
            rgba(150, 150, 150, 0.5) 50%,
            rgba(100, 100, 100, 0.3) 100%
        );
        -webkit-mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
        -webkit-mask-composite: xor;
        mask-composite: exclude;
        pointer-events: none;
    }

    .border-beam {
        position: absolute;
        inset: 0;
        border-radius: 30px;
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
        -webkit-mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
        -webkit-mask-composite: xor;
        mask-composite: exclude;
        animation: border-beam-spin 3s linear infinite;
        filter: blur(0.5px);
    }

    .border-beam::after {
        content: '';
        position: absolute;
        inset: -10px;
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
        filter: blur(15px);
        opacity: 0.8;
        z-index: -1;
    }

    .btn-content {
        position: relative;
        z-index: 1;
        white-space: nowrap;
    }

    .border-beam-btn:hover {
        background: #121212;
        transform: translateY(-2px);
    }

    .border-beam-btn:hover .border-beam {
        animation-duration: 2s;
    }

    .border-beam-btn:active {
        transform: translateY(0);
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
        syntax: '<angle>';
        initial-value: 0deg;
        inherits: false;
    }
</style>
