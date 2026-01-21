<script lang="ts">
  import { onMount } from 'svelte';
  import { gsap } from '../../../lib/animations/gsap-config';
  import { ArrowRight } from 'lucide-svelte';
  import AmberGrid from './AmberGrid.svelte';

  onMount(() => {
    gsap.from('.recruiters-anim-item', {
      opacity: 0,
      y: 40,
      duration: 1,
      stagger: 0.2,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: '.recruiters-section',
        start: 'top 70%'
      }
    });
  });
</script>

<section class="recruiters-section">
  <AmberGrid />

  <div class="recruiters-content">
    <h2 class="recruiters-title recruiters-anim-item">Dezik Labs</h2>

    <p class="recruiters-description recruiters-anim-item">
      Revolucionamos la adquisición de talento con inteligencia artificial avanzada.
      Nuestros reclutadores autónomos trabajan 24/7, identificando y conectando con
      los mejores candidatos mientras tú te enfocas en lo que importa.
    </p>

    <div class="recruiters-cta recruiters-anim-item">
      <a href="#contact" class="amber-btn">
        <span>Descubre más</span>
        <ArrowRight size={20} />
      </a>
    </div>
  </div>
</section>

<style>
  .recruiters-section {
    position: relative;
    min-height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
    overflow: hidden;
    background: transparent;
  }

  .recruiters-content {
    position: relative;
    z-index: 2;
    text-align: center;
    max-width: 800px;
    padding: var(--spacing-xl) var(--spacing-lg);
  }

  .recruiters-title {
    font-family: 'Aeonik', sans-serif;
    font-size: clamp(2.5rem, 8vw, 5rem);
    font-weight: 700;
    color: #ffffff;
    margin-bottom: var(--spacing-lg);
    line-height: 1.1;
    text-shadow: 0 0 40px rgba(242, 44, 54, 0.3);
  }

  .recruiters-description {
    font-size: var(--font-size-lg);
    color: rgba(255, 255, 255, 0.85);
    line-height: 1.7;
    margin-bottom: var(--spacing-xl);
    font-weight: 300;
    max-width: 600px;
    margin-left: auto;
    margin-right: auto;
  }

  .recruiters-cta {
    display: flex;
    justify-content: center;
  }

  .amber-btn {
    position: relative;
    display: inline-flex;
    align-items: center;
    gap: 10px;
    padding: 16px 36px;
    font-size: var(--font-size-base);
    font-weight: 500;
    border-radius: 50px;
    background: linear-gradient(135deg, rgba(242, 44, 54, 0.2) 0%, rgba(255, 94, 102, 0.1) 100%);
    border: 1.5px solid rgba(242, 44, 54, 0.5);
    color: #ffffff;
    overflow: hidden;
    transition: all 0.4s cubic-bezier(0.23, 1, 0.32, 1);
    backdrop-filter: blur(10px);
    text-decoration: none;
  }

  .amber-btn::before {
    content: '';
    position: absolute;
    top: 50%;
    left: 50%;
    width: 0;
    height: 0;
    border-radius: 50%;
    background: radial-gradient(circle, rgba(242, 44, 54, 0.3) 0%, transparent 70%);
    transform: translate(-50%, -50%);
    transition: width 0.6s cubic-bezier(0.23, 1, 0.32, 1),
                height 0.6s cubic-bezier(0.23, 1, 0.32, 1);
    z-index: -1;
  }

  .amber-btn:hover::before {
    width: 300px;
    height: 300px;
  }

  .amber-btn:hover {
    border-color: rgba(255, 94, 102, 0.8);
    transform: translateY(-2px);
    box-shadow: 0 10px 40px rgba(242, 44, 54, 0.3),
                0 0 20px rgba(242, 44, 54, 0.2);
  }

  .amber-btn:active {
    transform: translateY(0);
  }

  .amber-btn span {
    position: relative;
    z-index: 1;
  }

  .amber-btn :global(svg) {
    position: relative;
    z-index: 1;
    transition: transform 0.3s ease;
  }

  .amber-btn:hover :global(svg) {
    transform: translateX(4px);
  }

  @media (max-width: 768px) {
    .recruiters-content {
      padding: var(--spacing-lg) var(--spacing-md);
    }

    .recruiters-description {
      font-size: var(--font-size-base);
    }

    .amber-btn {
      width: 100%;
      max-width: 280px;
      justify-content: center;
    }
  }
</style>
