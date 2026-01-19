<script lang="ts">
    import { onMount } from 'svelte';
    import { gsap } from '../../../lib/animations/gsap-config';

    let formData = $state({
        name: '',
        email: '',
        message: ''
    });

    let isSubmitting = $state(false);
    let submitStatus = $state<'idle' | 'success' | 'error'>('idle');

    const handleSubmit = async (e: Event) => {
        e.preventDefault();
        isSubmitting = true;

        await new Promise(resolve => setTimeout(resolve, 1500));

        submitStatus = 'success';
        isSubmitting = false;

        formData = { name: '', email: '', message: '' };

        setTimeout(() => {
            submitStatus = 'idle';
        }, 3000);
    };

    onMount(() => {
        gsap.from('.contact-form', {
            opacity: 0,
            y: 50,
            duration: 0.8,
            scrollTrigger: {
                trigger: '.contact-form',
                start: 'top 80%',
            }
        });
    });
</script>

<section id="contact" class="contact">
    <div class="container">
        <h2 class="section-title">Contacto</h2>
        <p class="contact-intro">¿Tienes un proyecto en mente? Hablemos</p>

        <div class="contact-content">
            <form class="contact-form" onsubmit={handleSubmit}>
                <div class="form-group">
                    <label for="name">Nombre</label>
                    <input 
                        type="text" 
                        id="name" 
                        bind:value={formData.name}
                        required
                        placeholder="Tu nombre"
                    />
                </div>

                <div class="form-group">
                    <label for="email">Email</label>
                    <input 
                        type="email" 
                        id="email" 
                        bind:value={formData.email}
                        required
                        placeholder="tu@email.com"
                    />
                </div>

                <div class="form-group">
                    <label for="message">Mensaje</label>
                    <textarea 
                        id="message" 
                        bind:value={formData.message}
                        required
                        rows="5"
                        placeholder="Cuéntanos sobre tu proyecto"
                    ></textarea>
                </div>

                <button type="submit" class="btn-primary" disabled={isSubmitting}>
                    {isSubmitting ? 'Enviando...' : 'Enviar Mensaje'}
                </button>

                {#if submitStatus === 'success'}
                    <p class="success-message">¡Mensaje enviado exitosamente!</p>
                {/if}

                {#if submitStatus === 'error'}
                    <p class="error-message">Error al enviar. Inténtalo nuevamente.</p>
                {/if}
            </form>

            <div class="contact-info">
                <div class="info-item">
                    <h3>Email</h3>
                    <p>info@dezik.com</p>
                </div>

                <div class="info-item">
                    <h3>Teléfono</h3>
                    <p>+1 (555) 123-4567</p>
                </div>

                <div class="info-item">
                    <h3>Ubicación</h3>
                    <p>Ciudad, País</p>
                </div>
            </div>
        </div>
    </div>
</section>

<style>
    .contact {
        padding: var(--spacing-3xl) 0;
    }

    .contact-intro {
        text-align: center;
        font-size: var(--font-size-lg);
        opacity: 0.8;
        margin-bottom: var(--spacing-2xl);
    }

    .contact-content {
        display: grid;
        grid-template-columns: 1.5fr 1fr;
        gap: var(--spacing-2xl);
        max-width: 1000px;
        margin: 0 auto;
    }

    .contact-form {
        background: rgba(255, 255, 255, 0.02);
        border: 1px solid rgba(255, 255, 255, 0.1);
        border-radius: var(--border-radius);
        padding: var(--spacing-xl);
    }

    .form-group {
        margin-bottom: var(--spacing-md);
    }

    .form-group label {
        display: block;
        margin-bottom: var(--spacing-xs);
        font-weight: 600;
    }

    .form-group input,
    .form-group textarea {
        width: 100%;
        padding: 12px 16px;
        background: rgba(255, 255, 255, 0.05);
        border: 1px solid rgba(255, 255, 255, 0.2);
        border-radius: var(--border-radius-sm);
        color: var(--text-color);
        font-family: inherit;
        font-size: var(--font-size-base);
        transition: all var(--transition-base);
    }

    .form-group input:focus,
    .form-group textarea:focus {
        outline: none;
        border-color: var(--primary);
        background: rgba(255, 255, 255, 0.08);
    }

    .form-group textarea {
        resize: vertical;
    }

    .contact-info {
        display: flex;
        flex-direction: column;
        gap: var(--spacing-lg);
    }

    .info-item {
        background: rgba(255, 255, 255, 0.02);
        border: 1px solid rgba(255, 255, 255, 0.1);
        border-radius: var(--border-radius);
        padding: var(--spacing-lg);
        transition: all var(--transition-base);
    }

    .info-item:hover {
        border-color: var(--primary);
        transform: translateX(5px);
    }

    .info-item h3 {
        font-size: var(--font-size-lg);
        margin-bottom: var(--spacing-xs);
    }

    .info-item p {
        opacity: 0.8;
    }

    .success-message {
        color: #4ade80;
        margin-top: var(--spacing-md);
        font-weight: 600;
    }

    .error-message {
        color: #ef4444;
        margin-top: var(--spacing-md);
        font-weight: 600;
    }

    @media (max-width: 768px) {
        .contact-content {
            grid-template-columns: 1fr;
        }
    }
</style>
