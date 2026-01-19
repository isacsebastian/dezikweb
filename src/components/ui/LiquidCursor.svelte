<script>
  import { spring } from 'svelte/motion';

  // Usamos spring para que el movimiento sea "líquido" y suave
  let coords = spring({ x: 0, y: 0 }, {
    stiffness: 0.15,
    damping: 0.25
  });

  function handleMouseMove(event) {
    coords.set({ x: event.clientX, y: event.clientY });
  }
</script>

<svelte:window on:mousemove={handleMouseMove} />

<!-- La luz blanca sutil que sigue al cursor -->
<div 
  class="liquid-light" 
  style:left="{$coords.x}px" 
  style:top="{$coords.y}px"
></div>

<style>
  /* La luz blanca sutil */
  .liquid-light {
    position: fixed;
    width: 500px;
    height: 500px;
    background: radial-gradient(
      circle, 
      rgba(255, 255, 255, 0.08) 0%,   /* Blanco muy suave */
      rgba(255, 255, 255, 0.03) 30%, 
      transparent 70%
    );
    border-radius: 50%;
    pointer-events: none;
    transform: translate(-50%, -50%);
    z-index: 9999; /* Muy alto para estar sobre todo */
    mix-blend-mode: screen; /* Hace que la luz se mezcle mejor con el fondo */
  }
</style>
