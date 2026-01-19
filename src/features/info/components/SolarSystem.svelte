<script lang="ts">
    import { onMount } from 'svelte';
    import { gsap } from '../../../lib/animations/gsap-config';
    import { Settings, Link, Eye, Target, Sparkles, Brain } from 'lucide-svelte';

    let container: HTMLElement;
    let tl: gsap.core.Timeline;

    onMount(() => {
        tl = gsap.timeline({
            scrollTrigger: {
                trigger: container,
                start: 'top 80%',
                toggleActions: 'play none none reverse'
            }
        });

        // Initial set state
        gsap.set('.solar-ring', { rotation: 180, scale: 0.5, opacity: 0 });
        
        // Animation Entrance
        tl.to('.solar-ring', {
            rotation: 0,
            scale: 1,
            opacity: 1,
            duration: 2,
            stagger: 0.2,
            ease: 'power3.out'
        });
        
        // Float animation for stability after entrance
        gsap.to('.planet-icon', {
            y: -5,
            duration: 2,
            yoyo: true,
            repeat: -1,
            ease: "sine.inOut",
            stagger: {
                each: 0.5,
                from: "random"
            }
        });
    });

    function handleMouseEnter() {
        // "Opening the door" effect: Rotate rings differentially to the right
        gsap.to('.ring-1', { rotation: 90, duration: 1.5, ease: 'power2.out' });
        gsap.to('.ring-2', { rotation: 60, duration: 1.5, ease: 'power2.out' });
        gsap.to('.ring-3', { rotation: 30, duration: 1.5, ease: 'power2.out' });
        
        // Optional: Scale up slightly for focus
        gsap.to('.solar-system-wrapper', { scale: 1.02, duration: 0.5, ease: 'power2.out' });
    }

    function handleMouseLeave() {
        // Return to base state (0 degrees is the rested state after entrance)
        gsap.to('.ring-1', { rotation: 0, duration: 1.2, ease: 'power2.inOut' });
        gsap.to('.ring-2', { rotation: 0, duration: 1.2, ease: 'power2.inOut' });
        gsap.to('.ring-3', { rotation: 0, duration: 1.2, ease: 'power2.inOut' });
        
        gsap.to('.solar-system-wrapper', { scale: 1, duration: 0.5, ease: 'power2.inOut' });
    }
</script>

<div class="solar-system-wrapper" bind:this={container} on:mouseenter={handleMouseEnter} on:mouseleave={handleMouseLeave} role="presentation">
    <!-- Center Sun/Core -->
    <div class="core-sun">
        <div class="core-glow"></div>
        <div class="core-content">
            <Brain size={40} color="#ffffff" />
        </div>
    </div>

    <!-- Orbit 1 (Inner) -->
    <div class="ring-container ring-1-container">
        <div class="solar-ring ring-1">
            <div class="orbit-path"></div>
            <div class="planet planet-1">
                <div class="planet-icon">
                    <Settings size={20} />
                </div>
            </div>
        </div>
    </div>

    <!-- Orbit 2 -->
    <div class="ring-container ring-2-container">
        <div class="solar-ring ring-2">
            <div class="orbit-path"></div>
            <div class="planet planet-2">
                <div class="planet-icon">
                    <Link size={24} />
                </div>
            </div>
            <div class="planet planet-2-b">
                <div class="planet-icon">
                    <div class="dot-planet"></div>
                </div>
            </div>
        </div>
    </div>

    <!-- Orbit 3 (Outer) -->
    <div class="ring-container ring-3-container">
        <div class="solar-ring ring-3">
            <div class="orbit-path"></div>
            <div class="planet planet-3">
                <div class="planet-icon">
                    <Eye size={28} />
                </div>
            </div>
            <div class="planet planet-3-b">
                <div class="planet-icon">
                    <Target size={28} />
                </div>
            </div>
        </div>
    </div>
</div>

<style>
    .solar-system-wrapper {
        position: relative;
        width: 100%;
        height: 100%;
        min-height: 400px;
        display: flex;
        align-items: center;
        justify-content: center;
        background: radial-gradient(circle at center, rgba(25,25,25,0.5) 0%, rgba(13,13,13,1) 70%);
        border-radius: var(--border-radius);
        overflow: hidden;
    }

    /* Core */
    .core-sun {
        position: absolute;
        width: 80px;
        height: 80px;
        z-index: 10;
        display: flex;
        align-items: center;
        justify-content: center;
        /* Absolute center */
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
    }

    .core-content {
        position: relative;
        z-index: 2;
        width: 100%;
        height: 100%;
        background: linear-gradient(135deg, #2a2a2a, #1a1a1a);
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        border: 1px solid rgba(255,255,255,0.1);
        box-shadow: 0 0 30px rgba(0,0,0,0.5);
    }

    .core-glow {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        width: 150%;
        height: 150%;
        background: radial-gradient(circle, rgba(242,44,54,0.15) 0%, transparent 70%);
        z-index: 1;
        border-radius: 50%;
    }

    /* Ring Layout Strategy:
       - .ring-container: Absolute positioned, centered using translate(-50%, -50%). 
         This handles the POSITION (x,y).
       - .solar-ring: Full width/height of container. 
         This handles the ROTATION and SCALING via GSAP.
    */
    .ring-container {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        display: flex;
        align-items: center;
        justify-content: center;
        pointer-events: none;
    }

    .solar-ring {
        position: relative;
        width: 100%;
        height: 100%;
        border-radius: 50%;
    }

    .orbit-path {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        border: 1px solid rgba(255,255,255,0.05);
        border-radius: 50%;
        box-shadow: inset 0 0 20px rgba(0,0,0,0.2);
    }

    /* specific sizes applied to the CONTAINER */
    .ring-1-container { width: 180px; height: 180px; z-index: 3; }
    .ring-2-container { width: 320px; height: 320px; z-index: 2; }
    .ring-3-container { width: 480px; height: 480px; z-index: 1; }


    /* Planets */
    .planet {
        position: absolute;
        pointer-events: auto;
        cursor: pointer;
        /* Center the planet div exactly on the coordinate point */
        transform: translate(-50%, -50%);
    }

    .planet-icon {
        width: 50px;
        height: 50px;
        background: rgba(255,255,255,0.03);
        backdrop-filter: blur(10px);
        -webkit-backdrop-filter: blur(10px);
        border: 1px solid rgba(255,255,255,0.1);
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        color: rgba(255,255,255,0.8);
        transition: all 0.3s ease;
        box-shadow: 0 4px 15px rgba(0,0,0,0.2);
    }

    .planet-icon:hover {
        background: rgba(255,255,255,0.1);
        transform: scale(1.1); /* Helper for hover, might conflict with GSAP spread but float uses y */
        border-color: rgba(255,255,255,0.3);
        color: #fff;
        box-shadow: 0 0 20px rgba(255,255,255,0.1);
    }

    .dot-planet {
        width: 8px;
        height: 8px;
        background: rgba(255,255,255,0.5);
        border-radius: 50%;
    }

    /* Planet Positions (Relative to Ring 0,0 top-left) */
    /* Using calculate percentages to place center of planet exactly on the ring circle
       Radius is 50%.
       Formula: 
       left: calc(50% + (50% * cos(angle)))
       top: calc(50% + (50% * sin(angle)))
       
       Diagonals (45deg/135deg etc): 0.707 factor => 50% * 0.707 = 35.35%
       So 50 +/- 35.35% = 14.65% or 85.35%
    */

    /* Ring 1 - Gear: Top Left (-135deg) */
    .planet-1 { 
        left: 14.65%; 
        top: 14.65%; 
    }
    
    /* Ring 2 - Link: Top Right (-45deg) */
    .planet-2 { 
        left: 85.35%; 
        top: 14.65%; 
    }
    /* Ring 2 - Dot: Bottom Left (135deg) */
    .planet-2-b { 
        left: 14.65%; 
        top: 85.35%; 
    }

    /* Ring 3 - Target: Left (180deg) */
    .planet-3 { 
        right: auto; /* reset */
        left: 0%; 
        top: 50%; 
        /* Adjust for icon size if needed, but translate(-50%, -50%) handles it */
    }
    /* Ring 3 - Eye: Bottom Right (45deg) */
    .planet-3-b { 
        left: 85.35%; 
        top: 85.35%; 
    }

    @media (max-width: 600px) {
        .solar-system-wrapper {
            min-height: 300px;
        }
        /* Scale rings down for mobile */
        .ring-1-container { width: 140px; height: 140px; }
        .ring-2-container { width: 240px; height: 240px; }
        .ring-3-container { width: 340px; height: 340px; }
    }
</style>
