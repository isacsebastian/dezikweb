<script lang="ts">
    import { onMount } from "svelte";
    import { gsap } from "../../../lib/animations/gsap-config";

    let formData = $state({
        name: "",
        email: "",
        message: "",
    });

    let isSubmitting = $state(false);
    let submitStatus = $state<"idle" | "success" | "error">("idle");

    // FAQ data
    const faqs = [
        {
            question: "How do I start a project with you ?",
            answer: "Simply reach out through our contact form or email. We'll schedule a consultation to discuss your project requirements and goals.",
        },
        {
            question: "What is the cost of your services ?",
            answer: "Project costs vary depending on scope, complexity, and timeline. Contact us for a personalized quote tailored to your needs.",
        },
        {
            question: "How much time is typically needed to finish a project ?",
            answer: "Project timelines vary based on scope and complexity. Small projects may take 2-4 weeks, while larger ones can take 2-3 months. We'll provide a detailed timeline during consultation.",
        },
        {
            question: "What sets you apart from your competitors?",
            answer: "We focus on delivering high-quality, scalable solutions with personalized attention and ongoing support throughout the entire project lifecycle.",
        },
        {
            question: "How can I contact you to initiate a project ?",
            answer: "You can reach us via email, phone, or by filling out the contact form on this page. We typically respond within 24 hours.",
        },
        {
            question: "Do you provide free consultations ?",
            answer: "Yes! We offer a free initial consultation to discuss your project ideas, requirements, and how we can help bring your vision to life.",
        },
    ];

    let openFaqIndex = $state<number | null>(null);

    const toggleFaq = (index: number) => {
        openFaqIndex = openFaqIndex === index ? null : index;
    };

    const handleSubmit = async (e: Event) => {
        e.preventDefault();
        isSubmitting = true;

        await new Promise((resolve) => setTimeout(resolve, 1500));

        submitStatus = "success";
        isSubmitting = false;

        formData = { name: "", email: "", message: "" };

        setTimeout(() => {
            submitStatus = "idle";
        }, 3000);
    };

    onMount(() => {
        // Section 1: Hero title animation
        gsap.from(".hero-title", {
            opacity: 0,
            y: -30,
            duration: 1,
            ease: "power2.out",
            scrollTrigger: {
                trigger: ".hero-title",
                start: "top 80%",
            },
        });

        // Section 2: Form and contact info stagger
        gsap.from(".contact-section", {
            opacity: 0,
            y: 50,
            duration: 0.8,
            stagger: 0.2,
            ease: "power2.out",
            scrollTrigger: {
                trigger: ".section-two",
                start: "top 70%",
            },
        });

        // Section 3: FAQ items stagger
        gsap.from(".faq-item", {
            opacity: 0,
            y: 40,
            duration: 0.6,
            stagger: 0.1,
            ease: "power2.out",
            scrollTrigger: {
                trigger: ".faq-section",
                start: "top 70%",
            },
        });
    });
</script>

<section id="contact" class="contact">
    <div class="container">
        <!-- Section 1: Hero Title -->
        <div class="section-one">
            <h1 class="hero-title">HABLEMOS SOBRE<br />TU PROYECTO</h1>
        </div>

        <!-- Section 2: Contact Info & Form -->
        <div class="section-two">
            <div class="contact-left contact-section">
                <h2 class="section-label">● CONTACT</h2>
                <h3 class="section-heading">GET IN TOUCH</h3>

                <div class="contact-links">
                    <a href="mailto:john.carter@gmail.com" class="contact-link">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="20"
                            height="20"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            stroke-width="2"
                        >
                            <rect width="20" height="16" x="2" y="4" rx="2" />
                            <path
                                d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"
                            />
                        </svg>
                        developer@deziklabs.com
                    </a>
                    <a href="tel:+15555551234" class="contact-link">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="20"
                            height="20"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            stroke-width="2"
                        >
                            <path
                                d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"
                            />
                        </svg>
                        +1 (555) 555-1234
                    </a>
                    <a
                        href="https://maps.google.com"
                        target="_blank"
                        class="contact-link"
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="20"
                            height="20"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            stroke-width="2"
                        >
                            <path
                                d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"
                            />
                            <circle cx="12" cy="10" r="3" />
                        </svg>
                        Santiago Carrasco y Cornelio Merchán, Cuenca
                    </a>
                    <div class="contact-link">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="20"
                            height="20"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            stroke-width="2"
                        >
                            <circle cx="12" cy="12" r="10" />
                            <polyline points="12 6 12 12 16 14" />
                        </svg>
                        8 AM - 6 PM, Lunes a Viernes
                    </div>

                    <div class="social-links-inline">
                        <a
                            href="https://facebook.com/deziklabs"
                            target="_blank"
                            rel="noopener noreferrer"
                            class="social-icon"
                            aria-label="Facebook"
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="24"
                                height="24"
                                viewBox="0 0 24 24"
                                fill="currentColor"
                            >
                                <path
                                    d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"
                                />
                            </svg>
                        </a>
                        <a
                            href="https://instagram.com/deziklabs"
                            target="_blank"
                            rel="noopener noreferrer"
                            class="social-icon"
                            aria-label="Instagram"
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="24"
                                height="24"
                                viewBox="0 0 24 24"
                                fill="currentColor"
                            >
                                <path
                                    d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"
                                />
                            </svg>
                        </a>
                    </div>
                </div>
            </div>

            <div class="contact-right contact-section">
                <h3 class="form-heading">Enviar Mensaje</h3>
                <form class="contact-form" onsubmit={handleSubmit}>
                    <div class="form-row">
                        <div class="form-group">
                            <label for="name">Nombre</label>
                            <input
                                type="text"
                                id="name"
                                bind:value={formData.name}
                                required
                                placeholder="Tu Nombre"
                            />
                        </div>
                    </div>

                    <div class="form-row">
                        <div class="form-group">
                            <label for="email">Email</label>
                            <input
                                type="email"
                                id="email"
                                bind:value={formData.email}
                                required
                                placeholder="name@email.com"
                            />
                        </div>
                    </div>

                    <div class="form-row">
                        <div class="form-group">
                            <label for="message">Message</label>
                            <textarea
                                id="message"
                                bind:value={formData.message}
                                required
                                rows="5"
                                placeholder="Escribe tu mensaje"
                            ></textarea>
                        </div>
                    </div>

                    <button
                        type="submit"
                        class="btn-submit"
                        disabled={isSubmitting}
                    >
                        {isSubmitting ? "Sending..." : "Send Message"}
                    </button>

                    {#if submitStatus === "success"}
                        <p class="success-message">
                            Message sent successfully!
                        </p>
                    {/if}

                    {#if submitStatus === "error"}
                        <p class="error-message">
                            Error sending message. Please try again.
                        </p>
                    {/if}
                </form>
            </div>
        </div>

        <!-- Section 3: FAQ -->
        <div class="section-three faq-section">
            <h2 class="faq-label">● PREGUNTAS FRECUENTES</h2>
            <h3 class="faq-heading">RESPUESTAS RÁPIDAS</h3>

            <div class="faq-grid">
                {#each faqs as faq, index}
                    <button
                        class="faq-item"
                        class:active={openFaqIndex === index}
                        onclick={() => toggleFaq(index)}
                    >
                        <div class="faq-question">
                            <span>{faq.question}</span>
                            <span class="faq-icon"
                                >{openFaqIndex === index ? "−" : "+"}</span
                            >
                        </div>
                        {#if openFaqIndex === index}
                            <div class="faq-answer">{faq.answer}</div>
                        {/if}
                    </button>
                {/each}
            </div>
        </div>
    </div>
</section>

<style>
    .contact {
        padding: var(--spacing-3xl) 0;
        background: #000;
        color: #fff;
    }

    .container {
        max-width: 1200px;
        margin: 0 auto;
        padding: 0 var(--spacing-lg);
    }

    /* Section 1: Hero Title */
    .section-one {
        margin-bottom: 80px;
        border-bottom: 1px solid rgba(255, 255, 255, 0.2);
        padding-bottom: 40px;
    }

    .hero-title {
        font-size: clamp(2.5rem, 5vw, 4rem);
        font-weight: 700;
        line-height: 1.2;
        letter-spacing: -0.02em;
        margin: 0;
        text-transform: uppercase;
    }

    /* Section 2: Contact Grid */
    .section-two {
        display: grid;
        grid-template-columns: 1fr 1fr;
        gap: var(--spacing-2xl);
        margin-bottom: 100px;
        padding: 60px 0;
    }

    .section-label {
        font-size: 0.875rem;
        font-weight: 500;
        letter-spacing: 0.1em;
        margin-bottom: var(--spacing-xs);
        opacity: 0.7;
    }

    .section-heading {
        font-size: 2.5rem;
        font-weight: 700;
        margin-bottom: var(--spacing-md);
        letter-spacing: -0.02em;
    }

    .contact-links {
        display: flex;
        flex-direction: column;
        gap: var(--spacing-md);
    }

    .contact-link {
        display: flex;
        align-items: center;
        gap: 12px;
        color: #fff;
        text-decoration: none;
        padding: var(--spacing-sm) 0;
        border-bottom: 1px solid rgba(255, 255, 255, 0.1);
        transition: all 0.3s ease;
    }

    .contact-link:hover {
        color: var(--primary, #f22c36);
        transform: translateX(5px);
    }

    .contact-link svg {
        flex-shrink: 0;
    }

    .social-links-inline {
        display: flex;
        gap: var(--spacing-sm);
        padding-top: var(--spacing-sm);
    }

    .social-icon {
        display: flex;
        align-items: center;
        justify-content: center;
        width: 40px;
        height: 40px;
        border-radius: 50%;
        background: rgba(255, 255, 255, 0.05);
        color: #fff;
        transition: all 0.3s ease;
        text-decoration: none;
    }

    .social-icon:hover {
        background: var(--primary, #f22c36);
        transform: translateY(-3px);
    }

    /* Form Styling */
    .form-heading {
        font-size: 1.25rem;
        font-weight: 600;
        margin-bottom: var(--spacing-md);
    }

    .contact-form {
        display: flex;
        flex-direction: column;
        gap: var(--spacing-md);
    }

    .form-row {
        display: flex;
        gap: var(--spacing-md);
    }

    .form-group {
        flex: 1;
        display: flex;
        flex-direction: column;
    }

    .form-group label {
        font-size: 0.875rem;
        margin-bottom: 8px;
        font-weight: 500;
    }

    .form-group input,
    .form-group textarea {
        width: 100%;
        padding: 12px 16px;
        background: rgba(255, 255, 255, 0.05);
        border: 1px solid rgba(255, 255, 255, 0.2);
        border-radius: 8px;
        color: #fff;
        font-family: inherit;
        font-size: 0.95rem;
        transition: all 0.3s ease;
    }

    .form-group input::placeholder,
    .form-group textarea::placeholder {
        color: rgba(255, 255, 255, 0.4);
    }

    .form-group input:focus,
    .form-group textarea:focus {
        outline: none;
        border-color: var(--primary, #f22c36);
        background: rgba(255, 255, 255, 0.08);
    }

    .form-group textarea {
        resize: vertical;
        min-height: 120px;
    }

    .btn-submit {
        align-self: flex-end;
        padding: 12px 40px;
        background: #fff;
        color: #000;
        border: none;
        border-radius: 8px;
        font-weight: 600;
        font-size: 0.95rem;
        cursor: pointer;
        transition: all 0.3s ease;
    }

    .btn-submit:hover:not(:disabled) {
        background: var(--primary, #f22c36);
        color: #fff;
        transform: translateY(-2px);
    }

    .btn-submit:disabled {
        opacity: 0.5;
        cursor: not-allowed;
    }

    .success-message {
        color: #4ade80;
        font-size: 0.875rem;
        margin-top: 8px;
    }

    .error-message {
        color: #ef4444;
        font-size: 0.875rem;
        margin-top: 8px;
    }

    /* Section 3: FAQ */
    .section-three {
        padding: 60px 0;
    }

    .faq-label {
        font-size: 0.875rem;
        font-weight: 500;
        letter-spacing: 0.1em;
        margin-bottom: var(--spacing-md);
        opacity: 0.7;
    }

    .faq-heading {
        font-size: 2.5rem;
        font-weight: 700;
        margin-bottom: var(--spacing-2xl);
        letter-spacing: -0.02em;
    }

    .faq-grid {
        display: grid;
        grid-template-columns: repeat(2, 1fr);
        gap: 1px;
        background: rgba(255, 255, 255, 0.1);
        border: 1px solid rgba(255, 255, 255, 0.1);
    }

    .faq-item {
        background: #000;
        padding: var(--spacing-lg);
        border: none;
        text-align: left;
        cursor: pointer;
        transition: background 0.3s ease;
        color: #fff;
        font-family: inherit;
    }

    .faq-item:hover {
        background: rgba(255, 255, 255, 0.02);
    }

    .faq-question {
        display: flex;
        justify-content: space-between;
        align-items: flex-start;
        gap: var(--spacing-md);
        font-size: 1rem;
        font-weight: 500;
    }

    .faq-icon {
        font-size: 1.5rem;
        font-weight: 300;
        flex-shrink: 0;
        transition: transform 0.3s ease;
    }

    .faq-item.active .faq-icon {
        transform: rotate(180deg);
    }

    .faq-answer {
        margin-top: var(--spacing-md);
        padding-top: var(--spacing-md);
        border-top: 1px solid rgba(255, 255, 255, 0.1);
        font-size: 0.95rem;
        line-height: 1.6;
        opacity: 0.8;
        animation: fadeIn 0.3s ease;
    }

    @keyframes fadeIn {
        from {
            opacity: 0;
            transform: translateY(-10px);
        }
        to {
            opacity: 0.8;
            transform: translateY(0);
        }
    }

    /* Responsive */
    @media (max-width: 768px) {
        .section-two {
            grid-template-columns: 1fr;
            gap: var(--spacing-xl);
        }

        .faq-grid {
            grid-template-columns: 1fr;
        }

        .hero-title {
            font-size: 2rem;
        }

        .section-heading,
        .faq-heading {
            font-size: 1.75rem;
        }
    }
</style>
