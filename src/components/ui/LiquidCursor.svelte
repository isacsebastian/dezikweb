<script>
  let x = 0;
  let y = 0;

  function handleMouseMove(event) {
    x = event.clientX;
    y = event.clientY;
  }
</script>

<svelte:window on:mousemove={handleMouseMove} />

<!-- La luz blanca sutil que sigue al cursor -->
<div
  class="liquid-light"
  style="transform: translate3d({x - 250}px, {y - 250}px, 0);"
></div>

<style>
  /* La luz blanca sutil */
  .liquid-light {
    position: fixed;
    top: 0;
    left: 0;
    width: 500px;
    height: 500px;
    background: radial-gradient(
      circle,
      rgba(255, 255, 255, 0.08) 0%,
      rgba(255, 255, 255, 0.03) 30%,
      transparent 70%
    );
    border-radius: 50%;
    pointer-events: none;
    z-index: 9999;
    mix-blend-mode: screen;
    will-change: transform;
  }
</style>
