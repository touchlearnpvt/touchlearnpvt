// Vue.js App
const { createApp } = Vue;

createApp({
    data() {
        return {
            isScrolled: false,
            marketNumbers: {
                tam: 0,
                india: 0,
                serviceable: 0
            },
            animationTargets: {
                tam: 50,
                india: 18,
                serviceable: 1.8
            }
        };
    },
    mounted() {
        this.initScrollAnimations();
        this.initSmoothScrolling();
        this.initNavbarScroll();
        this.initMarketCounters();
    },
    methods: {
        // Initialize scroll animations
        initScrollAnimations() {
            const observerOptions = {
                threshold: 0.1,
                rootMargin: '0px 0px -50px 0px'
            };

            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('visible');
                        
                        // Add specific animations based on element position
                        if (entry.target.classList.contains('slide-in-left')) {
                            entry.target.style.animationDelay = '0.2s';
                        } else if (entry.target.classList.contains('slide-in-right')) {
                            entry.target.style.animationDelay = '0.4s';
                        }
                    }
                });
            }, observerOptions);

            // Observe all elements with animation classes
            document.querySelectorAll('.fade-in, .slide-in-left, .slide-in-right').forEach(el => {
                observer.observe(el);
            });
        },

        // Initialize smooth scrolling for navigation links
        initSmoothScrolling() {
            document.querySelectorAll('a[href^="#"]').forEach(anchor => {
                anchor.addEventListener('click', function (e) {
                    e.preventDefault();
                    const target = document.querySelector(this.getAttribute('href'));
                    if (target) {
                        const offsetTop = target.offsetTop - 80; // Account for fixed navbar
                        window.scrollTo({
                            top: offsetTop,
                            behavior: 'smooth'
                        });
                    }
                });
            });
        },

        // Initialize navbar scroll effect
        initNavbarScroll() {
            window.addEventListener('scroll', () => {
                this.isScrolled = window.scrollY > 50;
                
                const navbar = document.querySelector('.navbar');
                if (this.isScrolled) {
                    navbar.style.background = 'rgba(0, 0, 0, 0.98)';
                    navbar.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.5)';
                } else {
                    navbar.style.background = 'rgba(0, 0, 0, 0.95)';
                    navbar.style.boxShadow = 'none';
                }
            });
        },

        // Initialize market number counters
        initMarketCounters() {
            const marketSection = document.querySelector('#market');
            if (!marketSection) return;

            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        this.animateMarketNumbers();
                        observer.unobserve(entry.target);
                    }
                });
            }, { threshold: 0.5 });

            observer.observe(marketSection);
        },

        // Animate market numbers counting up
        animateMarketNumbers() {
            const duration = 2000; // 2 seconds
            const steps = 60;
            const stepDuration = duration / steps;

            let currentStep = 0;
            const timer = setInterval(() => {
                currentStep++;
                const progress = currentStep / steps;

                // Easing function for smooth animation
                const easeOutQuart = 1 - Math.pow(1 - progress, 4);

                this.marketNumbers.tam = Math.round(this.animationTargets.tam * easeOutQuart * 10) / 10;
                this.marketNumbers.india = Math.round(this.animationTargets.india * easeOutQuart * 10) / 10;
                this.marketNumbers.serviceable = Math.round(this.animationTargets.serviceable * easeOutQuart * 10) / 10;

                if (currentStep >= steps) {
                    clearInterval(timer);
                    // Ensure final values are exact
                    this.marketNumbers.tam = this.animationTargets.tam;
                    this.marketNumbers.india = this.animationTargets.india;
                    this.marketNumbers.serviceable = this.animationTargets.serviceable;
                }
            }, stepDuration);
        },

        // Add scroll reveal animations to sections
        addScrollReveal() {
            const sections = document.querySelectorAll('section');
            sections.forEach((section, index) => {
                // Add animation classes based on section position
                if (index % 2 === 0) {
                    section.classList.add('fade-in');
                } else {
                    section.classList.add('slide-in-left');
                }
            });
        },

        // Parallax effect for hero background
        initParallax() {
            window.addEventListener('scroll', () => {
                const scrolled = window.pageYOffset;
                const heroBackground = document.querySelector('.hero-background');
                if (heroBackground) {
                    heroBackground.style.transform = `translateY(${scrolled * 0.5}px)`;
                }
            });
        },

        // Add floating particles effect
        addFloatingParticles() {
            const heroSection = document.querySelector('.hero-section');
            if (!heroSection) return;

            for (let i = 0; i < 20; i++) {
                const particle = document.createElement('div');
                particle.className = 'floating-particle';
                particle.style.cssText = `
                    position: absolute;
                    width: 4px;
                    height: 4px;
                    background: rgba(255, 255, 255, 0.3);
                    border-radius: 50%;
                    left: ${Math.random() * 100}%;
                    top: ${Math.random() * 100}%;
                    animation: floatParticle ${5 + Math.random() * 10}s linear infinite;
                    animation-delay: ${Math.random() * 5}s;
                `;
                heroSection.appendChild(particle);
            }
        }
    }
}).mount('#app');

// Add CSS for floating particles
const style = document.createElement('style');
style.textContent = `
    @keyframes floatParticle {
        0% {
            transform: translateY(0px) rotate(0deg);
            opacity: 0;
        }
        10% {
            opacity: 1;
        }
        90% {
            opacity: 1;
        }
        100% {
            transform: translateY(-100vh) rotate(360deg);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

// Initialize additional features after DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    // Add scroll reveal animations
    const app = document.querySelector('#app');
    if (app && app.__vue_app__) {
        app.__vue_app__.addScrollReveal();
        app.__vue_app__.initParallax();
        app.__vue_app__.addFloatingParticles();
    }

    // Add hover effects to cards
    const cards = document.querySelectorAll('.problem-card, .persona-card, .team-card, .market-card');
    cards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px) scale(1.02)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });

    // Add typing effect to hero title
    const heroTitle = document.querySelector('.hero-title');
    if (heroTitle) {
        const text = heroTitle.textContent;
        heroTitle.textContent = '';
        heroTitle.style.borderRight = '3px solid var(--accent-orange)';
        
        let i = 0;
        const typeWriter = () => {
            if (i < text.length) {
                heroTitle.textContent += text.charAt(i);
                i++;
                setTimeout(typeWriter, 100);
            } else {
                heroTitle.style.borderRight = 'none';
            }
        };
        
        // Start typing effect after a delay
        setTimeout(typeWriter, 1000);
    }

    // Add scroll progress indicator
    const progressBar = document.createElement('div');
    progressBar.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 0%;
        height: 3px;
        background: linear-gradient(90deg, var(--accent-orange), var(--light-blue));
        z-index: 9999;
        transition: width 0.1s ease;
    `;
    document.body.appendChild(progressBar);

    window.addEventListener('scroll', () => {
        const scrolled = (window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100;
        progressBar.style.width = scrolled + '%';
    });

    // Add section highlighting in navigation
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.navbar-nav .nav-link');

    window.addEventListener('scroll', () => {
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (window.scrollY >= sectionTop - 200) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    });

    // Add active state styling for navigation
    const activeStyle = document.createElement('style');
    activeStyle.textContent = `
        .navbar-nav .nav-link.active {
            color: var(--accent-orange) !important;
        }
        .navbar-nav .nav-link.active::after {
            width: 100% !important;
        }
    `;
    document.head.appendChild(activeStyle);
});

// Add loading animation
window.addEventListener('load', function() {
    const loader = document.createElement('div');
    loader.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: var(--dark-blue);
        display: flex;
        justify-content: center;
        align-items: center;
        z-index: 10000;
        transition: opacity 0.5s ease;
    `;
    
    loader.innerHTML = `
        <div style="text-align: center;">
            <div style="font-size: 3rem; color: var(--accent-orange); margin-bottom: 1rem;">
                <i class="fas fa-book-open"></i>
            </div>
            <div style="color: var(--text-white); font-size: 1.5rem; font-weight: 600;">
                Touch Learn
            </div>
            <div style="color: var(--text-light); margin-top: 0.5rem;">
                Loading...
            </div>
        </div>
    `;
    
    document.body.appendChild(loader);
    
    setTimeout(() => {
        loader.style.opacity = '0';
        setTimeout(() => {
            loader.remove();
        }, 500);
    }, 1500);
});
