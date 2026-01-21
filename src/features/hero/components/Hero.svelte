<script lang="ts">
    import { onMount, onDestroy } from 'svelte';
    import { gsap } from '../../../lib/animations/gsap-config';
    import { ArrowRight } from 'lucide-svelte';
    import logo from '../../../assets/brand/logo.svg?raw';
    import * as THREE from 'three';
    import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
    import { createNoise3D } from 'simplex-noise';

    let heroSection: HTMLElement;
    let canvasContainer: HTMLElement;
    let animationId: number;
    let renderer: THREE.WebGLRenderer;
    let scene: THREE.Scene;
    let camera: THREE.PerspectiveCamera;
    let controls: OrbitControls;
    let mainMesh: THREE.LineSegments;

    // Configuration from the snippet
    const CONFIG = {
        rows: 150,          // Increased as per snippet
        pointsPerRow: 200,  // Increased as per snippet
        width: 100,
        depth: 50,
        amplitude: 2.5,     
        speed: 0.1,          // Slower, more subtle
        color: 0xF22C36,    // Updated to Brand Primary Red
        bgColor: 0x020205, 
        mainOpacity: 0.5,   
        subOpacity: 0.1    
    };

    onMount(() => {
        // --- THREE.JS SETUP ---
        const noise3D = createNoise3D();
        const clock = new THREE.Clock();
        
        // Scene setup
        scene = new THREE.Scene();
        // Fog mimics "fading to black" at distance which hides the hard edges of the mesh
        // We use pure black assuming the underlying body background is dark/black.
        scene.fog = new THREE.Fog(0x000000, 15, 60);


        // Camera setup
        const aspect = window.innerWidth / window.innerHeight;
        camera = new THREE.PerspectiveCamera(55, aspect, 0.1, 1000);
        camera.position.set(0, 120, 10); // Initial "Top Down" view (exaggerated + 20%)

        // Renderer setup
        renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
        renderer.setSize(window.innerWidth, window.innerHeight);
        renderer.setPixelRatio(window.devicePixelRatio);
        renderer.setClearColor(0x000000, 0); // Transparent background
        
        if (canvasContainer) {
           canvasContainer.appendChild(renderer.domElement);
        }

        // Controls
        controls = new OrbitControls(camera, renderer.domElement);
        controls.enableDamping = true;
        controls.dampingFactor = 0.05;
        controls.autoRotate = false; // Stopped 360 rotation
        controls.autoRotateSpeed = 0.2; 
        controls.enableZoom = false;

        // Mesh Generation logic
        let subMesh: THREE.LineSegments;

        const createFabricMesh = () => {
             const numPoints = CONFIG.rows * CONFIG.pointsPerRow;
            const positions = new Float32Array(numPoints * 3);

            for (let r = 0; r < CONFIG.rows; r++) {
                const z = (r / (CONFIG.rows - 1) - 0.5) * CONFIG.depth;
                for (let p = 0; p < CONFIG.pointsPerRow; p++) {
                    const x = (p / (CONFIG.pointsPerRow - 1) - 0.5) * CONFIG.width;
                    const i = (r * CONFIG.pointsPerRow) + p;
                    positions[i * 3] = x;
                    positions[i * 3 + 1] = 0;
                    positions[i * 3 + 2] = z;
                }
            }

            const sharedBuffer = new THREE.BufferAttribute(positions, 3);

            // Main Mesh
            const geoMain = new THREE.BufferGeometry();
            geoMain.setAttribute('position', sharedBuffer);
            const indicesMain = [];
            for (let r = 0; r < CONFIG.rows; r++) {
                for (let p = 0; p < CONFIG.pointsPerRow - 1; p++) {
                    const i = (r * CONFIG.pointsPerRow) + p;
                    indicesMain.push(i, i + 1);
                }
            }
            geoMain.setIndex(indicesMain);
            
            mainMesh = new THREE.LineSegments(geoMain, new THREE.LineBasicMaterial({
                color: CONFIG.color, opacity: CONFIG.mainOpacity, transparent: true
            }));
            scene.add(mainMesh);

            // Sub Mesh
            const geoSub = new THREE.BufferGeometry();
            geoSub.setAttribute('position', sharedBuffer);
            const indicesSub = [];
            for (let r = 0; r < CONFIG.rows - 1; r++) {
                for (let p = 0; p < CONFIG.pointsPerRow; p++) {
                    const i = (r * CONFIG.pointsPerRow) + p;
                    indicesSub.push(i, i + CONFIG.pointsPerRow);
                }
            }
            geoSub.setIndex(indicesSub);
            
            subMesh = new THREE.LineSegments(geoSub, new THREE.LineBasicMaterial({
                color: CONFIG.color, opacity: CONFIG.subOpacity, transparent: true
            }));
            scene.add(subMesh);
        };

        createFabricMesh();

        // Resize Handler
        const onWindowResize = () => {
            if (!camera || !renderer) return;
            const width = window.innerWidth;
            const height = window.innerHeight;
            camera.aspect = width / height;
            camera.updateProjectionMatrix();
            renderer.setSize(width, height);
        };
        window.addEventListener('resize', onWindowResize);

        // Logic Loop
        const animate = () => {
            animationId = requestAnimationFrame(animate);
            const time = clock.getElapsedTime() * CONFIG.speed;

            if (mainMesh) {
                const positions = mainMesh.geometry.attributes.position;
                for (let i = 0; i < positions.count; i++) {
                     const x = positions.getX(i);
                    const z = positions.getZ(i);

                    // Structure (Sine)
                    const structure = Math.sin(x * 0.15 + time * 0.5);
                    // Organic (Noise)
                    const organic = noise3D(x * 0.08, z * 0.05 - time, time * 0.2);
                     // Fusion
                    let y = (structure * 1.5) + (organic * 2.0);

                    // Falloff
                    const dist = Math.sqrt(x*x + z*z);
                    const falloff = Math.max(0, 1 - dist / 40);

                    positions.setY(i, y * falloff * CONFIG.amplitude);
                }
                positions.needsUpdate = true;
            }
            if (controls) controls.update();
            if (renderer && scene && camera) renderer.render(scene, camera);
        };

        animate();

        // --- GSAP ANIMATIONS ---
        const tl = gsap.timeline({ delay: 0.5 });
        tl.to(camera.position, { y: 5, z: 45, duration: 2.5, ease: "power2.out" }, 0) // Camera moves down to an even more frontal view
          .from('.hero-logo', { opacity: 0, scale: 0.8, y: 50, duration: 1.2, ease: 'power4.out' }, 0.5)
          .from('.hero-subtitle', { opacity: 0, y: 30, duration: 0.8 }, '-=0.6')
          .from('.hero-cta', { opacity: 0, y: 20, duration: 0.6 }, '-=0.4');
    });

    onDestroy(() => {
        if (typeof window !== 'undefined') {
             window.removeEventListener('resize', () => {}); 
        }
        if (animationId) cancelAnimationFrame(animationId);
        if (renderer) renderer.dispose();
        if (mainMesh) {
            mainMesh.geometry.dispose();
            (mainMesh.material as THREE.Material).dispose();
        }
    });
</script>

<section id="hero" class="hero" bind:this={heroSection}>
    <div class="three-container" bind:this={canvasContainer}></div>
    


    <div class="hero-content-area">
        <div class="container hero-content">
            <div class="hero-logo">
                {@html logo}
            </div>

            <p class="hero-subtitle">La billetera más poderosa y elegante desarrollada para la adquisición de talento</p>

            <div class="hero-cta">
                <a href="#contact" class="btn-primary liquid-btn">
                    <span>Get Started</span>
                    <ArrowRight size={20} />
                </a>
            </div>
        </div>
    </div>

    <div class="scroll-indicator">
        <span></span>
    </div>
</section>

<style>
    .hero {
        position: relative;
        min-height: 100vh;
        overflow: hidden;
        background: linear-gradient(180deg, #000000 0%, #000000 70%, transparent 100%);
    }

    .three-container {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        z-index: 0;
    }



    /* Hero Content Styles (Preserved) */
    .hero-content-area {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        display: flex;
        align-items: center;
        justify-content: center;
        width: 100%;
        padding: var(--spacing-xl) var(--spacing-lg);
        z-index: 2;
        pointer-events: none; /* Let interaction pass to canvas? Or buttons need events. */
    }
    .hero-content-area * {
        pointer-events: auto;
    }

    .hero-content {
        position: relative;
        text-align: center;
        max-width: 1000px;
        width: 100%;
    }

    .hero-logo {
        width: 100%;
        max-width: 500px;
        margin: 0 auto var(--spacing-lg);
        filter: drop-shadow(0 5px 20px rgba(242, 44, 54, 0.3));
    }

    .hero-logo :global(svg) {
        width: 100%;
        height: auto;
        display: block;
    }

    .hero-subtitle {
        font-size: var(--font-size-lg);
        color: rgba(255, 255, 255, 0.95);
        margin-bottom: var(--spacing-xl);
        font-weight: 300;
        letter-spacing: 0.3px;
        line-height: 1.5;
        max-width: 700px;
        margin-left: auto;
        margin-right: auto;
        text-shadow: 0 2px 10px rgba(0, 0, 0, 0.3);
    }

    .hero-cta {
        display: flex;
        gap: var(--spacing-md);
        justify-content: center;
        flex-wrap: wrap;
    }

    .liquid-btn {
        position: relative;
        display: inline-flex;
        align-items: center;
        gap: 10px;
        padding: 14px 32px;
        font-size: var(--font-size-base);
        font-weight: 500;
        border-radius: 50px;
        text-transform: none;
        letter-spacing: 0.3px;
        background: rgba(0, 0, 0, 0.8);
        border: 1.5px solid rgba(255, 255, 255, 0.3);
        color: #ffffff;
        overflow: hidden;
        transition: all 0.4s cubic-bezier(0.23, 1, 0.32, 1);
        backdrop-filter: blur(10px);
        z-index: 1;
    }

    .liquid-btn::before {
        content: '';
        position: absolute;
        top: 50%;
        left: 50%;
        width: 0;
        height: 0;
        border-radius: 50%;
        background: radial-gradient(circle, rgba(255, 255, 255, 0.15) 0%, transparent 70%);
        transform: translate(-50%, -50%);
        transition: width 0.6s cubic-bezier(0.23, 1, 0.32, 1), height 0.6s cubic-bezier(0.23, 1, 0.32, 1);
        z-index: -1;
    }

    .liquid-btn:hover::before {
        width: 300px;
        height: 300px;
    }

    .liquid-btn:hover {
        border-color: rgba(255, 255, 255, 0.6);
        transform: translateY(-2px);
        box-shadow: 0 10px 30px rgba(0, 0, 0, 0.5),
                    0 0 20px rgba(255, 255, 255, 0.1);
    }

    .liquid-btn:active {
        transform: translateY(0);
    }

    .liquid-btn span {
        position: relative;
        z-index: 1;
    }

    .liquid-btn :global(svg) {
        position: relative;
        z-index: 1;
        transition: transform 0.3s ease;
    }

    .liquid-btn:hover :global(svg) {
        transform: translateX(4px);
    }

    .scroll-indicator {
        position: absolute;
        bottom: 30px;
        left: 50%;
        transform: translateX(-50%);
        width: 30px;
        height: 50px;
        border: 2px solid rgba(255, 255, 255, 0.4);
        border-radius: 20px;
        display: flex;
        justify-content: center;
        padding-top: 8px;
        z-index: 3;
    }

    .scroll-indicator span {
        width: 4px;
        height: 10px;
        background: rgba(255, 255, 255, 0.9);
        border-radius: 2px;
        animation: scroll 2s infinite;
    }

    @keyframes scroll {
        0% {
            transform: translateY(0);
            opacity: 1;
        }
        100% {
            transform: translateY(20px);
            opacity: 0;
        }
    }

    @media (max-width: 768px) {
        .hero-content-area {
            padding: var(--spacing-lg) var(--spacing-md);
        }

        .hero-logo {
            max-width: 350px;
        }

        .hero-subtitle {
            font-size: var(--font-size-base);
            padding: 0 var(--spacing-md);
        }

        .liquid-btn {
            width: 100%;
            max-width: 300px;
            justify-content: center;
        }
    }

    @media (max-width: 480px) {
        .hero-logo {
            max-width: 280px;
        }

        .hero-subtitle {
            font-size: var(--font-size-sm);
        }
    }
</style>
