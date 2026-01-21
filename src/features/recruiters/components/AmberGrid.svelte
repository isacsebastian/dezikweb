<script lang="ts">
  import { onMount, onDestroy } from 'svelte';
  import * as THREE from 'three';
  import { gsap } from '../../../lib/animations/gsap-config';

  let container: HTMLElement;
  let renderer: THREE.WebGLRenderer;
  let scene: THREE.Scene;
  let camera: THREE.PerspectiveCamera;
  let frameId: number;

  const CONFIG = {
    gridColor: new THREE.Color(0xF22C36),
    glowColor: new THREE.Color(0xff5e66),
    speed: 0.05
  };

  onMount(() => {
    scene = new THREE.Scene();

    camera = new THREE.PerspectiveCamera(55, window.innerWidth / window.innerHeight, 0.1, 1000);
    // Posición inicial: vista desde arriba (picada)
    camera.position.set(0, 120, 10);
    camera.lookAt(0, 2, 0);

    renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setClearColor(0x000000, 0);
    container.appendChild(renderer.domElement);

    // Grid with custom shader
    const gridGeometry = new THREE.PlaneGeometry(200, 200, 1, 1);
    const gridMaterial = new THREE.ShaderMaterial({
      transparent: true,
      uniforms: {
        uTime: { value: 0 },
        uColor: { value: CONFIG.gridColor },
        uFadeDistance: { value: 120.0 }
      },
      vertexShader: `
        varying vec2 vUv;
        varying vec3 vWorldPosition;
        void main() {
          vUv = uv;
          vec4 worldPosition = modelMatrix * vec4(position, 1.0);
          vWorldPosition = worldPosition.xyz;
          gl_Position = projectionMatrix * viewMatrix * worldPosition;
        }
      `,
      fragmentShader: `
        varying vec2 vUv;
        varying vec3 vWorldPosition;
        uniform vec3 uColor;
        uniform float uTime;
        uniform float uFadeDistance;

        void main() {
          vec2 grid = abs(fract(vUv * 40.0 - 0.5) - 0.5) / fwidth(vUv * 40.0);
          float line = min(grid.x, grid.y);
          float alpha = 1.0 - smoothstep(0.0, 1.0, line);

          float dist = distance(vWorldPosition, cameraPosition);
          float depthFade = 1.0 - clamp(dist / uFadeDistance, 0.0, 1.0);

          float glow = 1.0 - smoothstep(0.0, 40.0, length(vWorldPosition.xz));

          gl_FragColor = vec4(uColor, alpha * depthFade * (0.2 + glow * 0.8));
        }
      `
    });

    const grid = new THREE.Mesh(gridGeometry, gridMaterial);
    grid.rotation.x = -Math.PI / 2;
    scene.add(grid);

    // Radial glow
    const glowGeo = new THREE.PlaneGeometry(100, 60);
    const glowMat = new THREE.MeshBasicMaterial({
      map: createGlowTexture(),
      transparent: true,
      blending: THREE.AdditiveBlending,
      opacity: 0.6,
      depthWrite: false
    });
    const glowPlane = new THREE.Mesh(glowGeo, glowMat);
    glowPlane.rotation.x = -Math.PI / 2;
    glowPlane.position.y = 0.1;
    scene.add(glowPlane);

    // Stars/particles
    const starsGeo = new THREE.BufferGeometry();
    const starCoords: number[] = [];
    for (let i = 0; i < 600; i++) {
      starCoords.push(
        (Math.random() - 0.5) * 200,
        Math.random() * 100,
        (Math.random() - 0.5) * 200
      );
    }
    starsGeo.setAttribute('position', new THREE.Float32BufferAttribute(starCoords, 3));
    const starsMat = new THREE.PointsMaterial({
      size: 0.15,
      color: 0xffffff,
      transparent: true,
      opacity: 0.4
    });
    scene.add(new THREE.Points(starsGeo, starsMat));

    const animate = () => {
      frameId = requestAnimationFrame(animate);
      const time = performance.now() * 0.001;
      starsMat.opacity = 0.3 + Math.sin(time) * 0.1;
      camera.lookAt(0, 2, 0);
      renderer.render(scene, camera);
    };
    animate();

    // Animación de cámara con ScrollTrigger - la rejilla "sube" al hacer scroll
    gsap.to(camera.position, {
      y: 5,
      z: 45,
      duration: 2.5,
      ease: 'power2.out',
      scrollTrigger: {
        trigger: container,
        start: 'top 80%',
        end: 'center center',
        scrub: 1
      }
    });

    const handleResize = () => {
      if (!camera || !renderer) return;
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };
    window.addEventListener('resize', handleResize);
  });

  function createGlowTexture(): THREE.CanvasTexture {
    const canvas = document.createElement('canvas');
    canvas.width = 512;
    canvas.height = 512;
    const ctx = canvas.getContext('2d')!;
    const grad = ctx.createRadialGradient(256, 256, 0, 256, 256, 256);
    grad.addColorStop(0, 'rgba(242, 44, 54, 0.5)');
    grad.addColorStop(0.4, 'rgba(255, 94, 102, 0.2)');
    grad.addColorStop(1, 'rgba(0, 0, 0, 0)');
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, 512, 512);
    return new THREE.CanvasTexture(canvas);
  }

  onDestroy(() => {
    if (typeof window !== 'undefined') {
      window.removeEventListener('resize', () => {});
    }
    if (frameId) cancelAnimationFrame(frameId);
    renderer?.dispose();
  });
</script>

<div class="amber-grid-container" bind:this={container}>
  <div class="vignette"></div>
</div>

<style>
  .amber-grid-container {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: 0;
    background: transparent;
    overflow: hidden;
  }

  .vignette {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: radial-gradient(
      circle at 50% 80%,
      transparent 0%,
      transparent 100%
    );
    pointer-events: none;
  }
</style>
