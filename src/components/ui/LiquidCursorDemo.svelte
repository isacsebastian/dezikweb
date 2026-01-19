<script>
  import Card from '../ui/Card.svelte';
</script>

<section class="demo-section">
  <div class="demo-container">
    <h1 class="demo-title">JUST WIN</h1>
    <p class="demo-subtitle">Sistema de subastas en tiempo real.</p>
    
    <div class="cards-grid">
      <Card title="Efecto Líquido" subtitle="Mueve el cursor">
        <p>La luz blanca sigue tu cursor con un movimiento suave y líquido gracias a Svelte Spring.</p>
      </Card>
      
      <Card title="Glassmorphism" subtitle="Vidrio esmerilado">
        <p>El efecto de backdrop-filter crea una apariencia de vidrio que difumina la luz detrás.</p>
      </Card>
      
      <Card title="Profundidad" subtitle="Capas visuales">
        <p>La luz pasa por detrás de las tarjetas creando un efecto de profundidad tridimensional.</p>
      </Card>
    </div>
    
    <div class="divider"></div>
    <small class="demo-note">La luz pasa por detrás creando un efecto de profundidad.</small>
  </div>
</section>

<style>
  .demo-section {
    min-height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 2rem;
    position: relative;
  }

  .demo-container {
    max-width: 1200px;
    width: 100%;
    text-align: center;
    position: relative;
    z-index: 2;
  }

  .demo-title {
    margin: 0 0 1rem 0;
    letter-spacing: 2px;
    font-weight: 700;
    font-size: 3rem;
    color: white;
  }

  .demo-subtitle {
    opacity: 0.7;
    font-size: 1.25rem;
    margin-bottom: 3rem;
    color: white;
  }

  .cards-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    gap: 2rem;
    margin-bottom: 2rem;
  }

  .divider {
    height: 1px;
    background: linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent);
    margin: 20px auto;
    max-width: 600px;
  }

  .demo-note {
    opacity: 0.5;
    color: white;
    display: block;
    margin-top: 1rem;
  }

  @media (max-width: 768px) {
    .demo-title {
      font-size: 2rem;
    }
    
    .cards-grid {
      grid-template-columns: 1fr;
    }
  }
</style>
