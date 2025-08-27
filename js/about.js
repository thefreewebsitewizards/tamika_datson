// About Page Specific JavaScript - The Nourished Bite
// Animations, interactions, and dynamic content for the About page

document.addEventListener('DOMContentLoaded', function() {
    initializeStatsAnimation();
    initializeStoryAnimations();
    initializePhilosophyCards();
    initializeCredentialsAnimation();
    initializePersonalSection();
    initializeImageGallery();
    initializeFunFacts();
    initializeScrollEffects();
});

// Stats Counter Animation
function initializeStatsAnimation() {
    const statNumbers = document.querySelectorAll('.stat-number');
    let hasAnimated = false;
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting && !hasAnimated) {
                hasAnimated = true;
                animateStats();
                observer.disconnect();
            }
        });
    }, { threshold: 0.5 });
    
    if (statNumbers.length > 0) {
        observer.observe(statNumbers[0].closest('.hero-stats'));
    }
}

function animateStats() {
    const stats = [
        { element: document.querySelector('.stat-number'), target: 500, suffix: '+' },
        { element: document.querySelectorAll('.stat-number')[1], target: 50, suffix: 'K+' },
        { element: document.querySelectorAll('.stat-number')[2], target: 5, suffix: '' }
    ];
    
    stats.forEach((stat, index) => {
        if (stat.element) {
            setTimeout(() => {
                animateCounter(stat.element, stat.target, stat.suffix);
            }, index * 200);
        }
    });
}

function animateCounter(element, target, suffix) {
    const duration = 2000;
    const increment = target / (duration / 16);
    let current = 0;
    
    const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
            current = target;
            clearInterval(timer);
        }
        
        element.textContent = Math.floor(current) + suffix;
    }, 16);
}

// Story Section Animations
function initializeStoryAnimations() {
    const storyBlocks = document.querySelectorAll('.story-block');
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.classList.add('animate-in');
                }, index * 200);
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.3 });
    
    storyBlocks.forEach(block => {
        observer.observe(block);
    });
    
    // Add reading progress indicator
    addReadingProgress();
}

function addReadingProgress() {
    const storySection = document.querySelector('.story-section');
    if (!storySection) return;
    
    const progressBar = document.createElement('div');
    progressBar.className = 'reading-progress';
    progressBar.innerHTML = '<div class="progress-fill"></div>';
    storySection.appendChild(progressBar);
    
    const progressFill = progressBar.querySelector('.progress-fill');
    
    window.addEventListener('scroll', window.NourishedBite.throttle(function() {
        const sectionTop = storySection.offsetTop;
        const sectionHeight = storySection.offsetHeight;
        const scrollTop = window.pageYOffset;
        const windowHeight = window.innerHeight;
        
        const start = sectionTop - windowHeight;
        const end = sectionTop + sectionHeight;
        
        if (scrollTop >= start && scrollTop <= end) {
            const progress = (scrollTop - start) / (end - start);
            progressFill.style.width = Math.min(progress * 100, 100) + '%';
        }
    }, 16));
}

// Philosophy Cards Interaction
function initializePhilosophyCards() {
    const cards = document.querySelectorAll('.philosophy-card');
    
    cards.forEach((card, index) => {
        // Stagger animation on scroll
        const observer = new IntersectionObserver(function(entries) {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    setTimeout(() => {
                        entry.target.classList.add('slide-up');
                    }, index * 100);
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.2 });
        
        observer.observe(card);
        
        // Add hover sound effect simulation
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px) scale(1.02)';
            
            // Add subtle glow effect
            this.style.boxShadow = '0 20px 50px rgba(193, 154, 107, 0.3)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(-10px)';
            this.style.boxShadow = '0 20px 50px rgba(0, 0, 0, 0.15)';
        });
        
        // Add click tracking
        card.addEventListener('click', function() {
            const cardTitle = this.querySelector('.card-title').textContent;
            if (window.NourishedBite && window.NourishedBite.trackEvent) {
                window.NourishedBite.trackEvent('philosophy_card_click', {
                    philosophy: cardTitle
                });
            }
            
            // Add ripple effect
            createRippleEffect(this, event);
        });
    });
}

// Credentials Animation
function initializeCredentialsAnimation() {
    const credentialItems = document.querySelectorAll('.credential-item');
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.classList.add('slide-in-left');
                }, index * 150);
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.3 });
    
    credentialItems.forEach(item => {
        observer.observe(item);
        
        // Add hover effect
        item.addEventListener('mouseenter', function() {
            const icon = this.querySelector('.credential-icon');
            if (icon) {
                icon.style.transform = 'scale(1.1) rotate(5deg)';
            }
        });
        
        item.addEventListener('mouseleave', function() {
            const icon = this.querySelector('.credential-icon');
            if (icon) {
                icon.style.transform = 'scale(1) rotate(0deg)';
            }
        });
    });
}

// Personal Section Interactions
function initializePersonalSection() {
    const personalCards = document.querySelectorAll('.personal-card');
    
    personalCards.forEach((card, index) => {
        // Stagger animation
        const observer = new IntersectionObserver(function(entries) {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    setTimeout(() => {
                        entry.target.classList.add('fade-in-up');
                    }, index * 200);
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.2 });
        
        observer.observe(card);
        
        // Add parallax effect to images
        const cardImage = card.querySelector('.card-image img');
        if (cardImage) {
            window.addEventListener('scroll', window.NourishedBite.throttle(function() {
                const rect = card.getBoundingClientRect();
                const scrolled = window.pageYOffset;
                const rate = scrolled * -0.1;
                
                if (rect.top < window.innerHeight && rect.bottom > 0) {
                    cardImage.style.transform = `translateY(${rate}px) scale(1.1)`;
                }
            }, 16));
        }
    });
}

// Image Gallery Lightbox
function initializeImageGallery() {
    const galleryImages = document.querySelectorAll('.grid-item img, .credentials-image img, .personal-card img');
    
    galleryImages.forEach(img => {
        img.addEventListener('click', function() {
            openLightbox(this);
        });
        
        // Add keyboard support
        img.setAttribute('tabindex', '0');
        img.addEventListener('keydown', function(e) {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                openLightbox(this);
            }
        });
    });
}

function openLightbox(img) {
    const lightbox = document.createElement('div');
    lightbox.className = 'lightbox';
    lightbox.innerHTML = `
        <div class="lightbox-content">
            <img src="${img.src}" alt="${img.alt}" class="lightbox-image">
            <button class="lightbox-close" aria-label="Close lightbox">
                <i class="fas fa-times"></i>
            </button>
        </div>
    `;
    
    document.body.appendChild(lightbox);
    document.body.style.overflow = 'hidden';
    
    // Animate in
    setTimeout(() => {
        lightbox.classList.add('active');
    }, 10);
    
    // Close handlers
    const closeBtn = lightbox.querySelector('.lightbox-close');
    closeBtn.addEventListener('click', closeLightbox);
    
    lightbox.addEventListener('click', function(e) {
        if (e.target === lightbox) {
            closeLightbox();
        }
    });
    
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            closeLightbox();
        }
    });
    
    function closeLightbox() {
        lightbox.classList.remove('active');
        setTimeout(() => {
            document.body.removeChild(lightbox);
            document.body.style.overflow = '';
        }, 300);
    }
}

// Fun Facts Animation
function initializeFunFacts() {
    const factsList = document.querySelector('.facts-list');
    if (!factsList) return;
    
    const facts = factsList.querySelectorAll('li');
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                facts.forEach((fact, index) => {
                    setTimeout(() => {
                        fact.classList.add('bounce-in');
                    }, index * 100);
                });
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.3 });
    
    observer.observe(factsList);
    
    // Add click interaction to facts
    facts.forEach(fact => {
        fact.addEventListener('click', function() {
            this.style.transform = 'scale(1.05)';
            setTimeout(() => {
                this.style.transform = 'translateX(5px)';
            }, 150);
            
            // Track fact interaction
            if (window.NourishedBite && window.NourishedBite.trackEvent) {
                window.NourishedBite.trackEvent('fun_fact_click', {
                    fact: this.textContent.trim()
                });
            }
        });
    });
}

// Scroll Effects
function initializeScrollEffects() {
    // Parallax effect for hero section
    const hero = document.querySelector('.about-hero');
    const heroContent = document.querySelector('.about-hero .hero-content');
    
    if (hero && heroContent) {
        window.addEventListener('scroll', window.NourishedBite.throttle(function() {
            const scrolled = window.pageYOffset;
            const rate = scrolled * -0.3;
            
            if (scrolled < window.innerHeight) {
                heroContent.style.transform = `translateY(${rate}px)`;
            }
        }, 16));
    }
    
    // Section reveal animations
    const sections = document.querySelectorAll('.section');
    const sectionObserver = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('section-visible');
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
    });
    
    sections.forEach(section => {
        sectionObserver.observe(section);
    });
}

// Ripple Effect
function createRippleEffect(element, event) {
    const ripple = document.createElement('span');
    const rect = element.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);
    const x = event.clientX - rect.left - size / 2;
    const y = event.clientY - rect.top - size / 2;
    
    ripple.style.cssText = `
        position: absolute;
        width: ${size}px;
        height: ${size}px;
        left: ${x}px;
        top: ${y}px;
        background: rgba(193, 154, 107, 0.3);
        border-radius: 50%;
        transform: scale(0);
        animation: ripple 0.6s linear;
        pointer-events: none;
        z-index: 1;
    `;
    
    element.style.position = 'relative';
    element.style.overflow = 'hidden';
    element.appendChild(ripple);
    
    setTimeout(() => {
        ripple.remove();
    }, 600);
}

// Social Media Tracking
function initializeSocialTracking() {
    const socialLinks = document.querySelectorAll('.social-link');
    
    socialLinks.forEach(link => {
        link.addEventListener('click', function() {
            const platform = this.href.includes('instagram') ? 'instagram' : 
                           this.href.includes('youtube') ? 'youtube' : 
                           this.href.includes('pinterest') ? 'pinterest' : 'other';
            
            if (window.NourishedBite && window.NourishedBite.trackEvent) {
                window.NourishedBite.trackEvent('about_social_click', {
                    platform: platform,
                    location: 'about_page'
                });
            }
        });
    });
}

// CTA Button Tracking
function initializeCTATracking() {
    const ctaButtons = document.querySelectorAll('.cta-buttons .btn');
    
    ctaButtons.forEach(button => {
        button.addEventListener('click', function() {
            const buttonText = this.textContent.trim();
            if (window.NourishedBite && window.NourishedBite.trackEvent) {
                window.NourishedBite.trackEvent('about_cta_click', {
                    button: buttonText,
                    location: 'about_page'
                });
            }
        });
    });
}

// Performance Monitoring
function monitorScrollPerformance() {
    let scrollCount = 0;
    let lastScrollTime = performance.now();
    
    window.addEventListener('scroll', function() {
        scrollCount++;
        const currentTime = performance.now();
        
        if (currentTime - lastScrollTime >= 1000) {
            const scrollsPerSecond = scrollCount;
            scrollCount = 0;
            lastScrollTime = currentTime;
            
            // If too many scroll events, reduce animations
            if (scrollsPerSecond > 60) {
                document.body.classList.add('reduce-scroll-animations');
            }
        }
    });
}

// Add CSS for animations
const style = document.createElement('style');
style.textContent = `
    .animate-in {
        animation: animateIn 0.8s ease-out forwards;
    }
    
    .slide-up {
        animation: slideUp 0.6s ease-out forwards;
    }
    
    .slide-in-left {
        animation: slideInLeft 0.6s ease-out forwards;
    }
    
    .fade-in-up {
        animation: fadeInUp 0.8s ease-out forwards;
    }
    
    .bounce-in {
        animation: bounceIn 0.6s ease-out forwards;
    }
    
    .section-visible {
        animation: sectionReveal 1s ease-out forwards;
    }
    
    @keyframes animateIn {
        from {
            opacity: 0;
            transform: translateY(30px) scale(0.95);
        }
        to {
            opacity: 1;
            transform: translateY(0) scale(1);
        }
    }
    
    @keyframes slideUp {
        from {
            opacity: 0;
            transform: translateY(50px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
    
    @keyframes slideInLeft {
        from {
            opacity: 0;
            transform: translateX(-50px);
        }
        to {
            opacity: 1;
            transform: translateX(0);
        }
    }
    
    @keyframes fadeInUp {
        from {
            opacity: 0;
            transform: translateY(40px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
    
    @keyframes bounceIn {
        0% {
            opacity: 0;
            transform: scale(0.3) translateY(20px);
        }
        50% {
            opacity: 1;
            transform: scale(1.05) translateY(-5px);
        }
        70% {
            transform: scale(0.9) translateY(2px);
        }
        100% {
            opacity: 1;
            transform: scale(1) translateY(0);
        }
    }
    
    @keyframes sectionReveal {
        from {
            opacity: 0;
            transform: translateY(50px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
    
    @keyframes ripple {
        to {
            transform: scale(4);
            opacity: 0;
        }
    }
    
    .lightbox {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, 0.9);
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 10000;
        opacity: 0;
        transition: opacity 0.3s ease;
    }
    
    .lightbox.active {
        opacity: 1;
    }
    
    .lightbox-content {
        position: relative;
        max-width: 90vw;
        max-height: 90vh;
    }
    
    .lightbox-image {
        max-width: 100%;
        max-height: 100%;
        object-fit: contain;
        border-radius: 8px;
    }
    
    .lightbox-close {
        position: absolute;
        top: -40px;
        right: 0;
        background: none;
        border: none;
        color: white;
        font-size: 1.5rem;
        cursor: pointer;
        padding: 8px;
        border-radius: 50%;
        transition: background 0.3s ease;
    }
    
    .lightbox-close:hover {
        background: rgba(255, 255, 255, 0.2);
    }
    
    .reading-progress {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 4px;
        background: rgba(193, 154, 107, 0.2);
        z-index: 1000;
    }
    
    .progress-fill {
        height: 100%;
        background: var(--terracotta);
        width: 0%;
        transition: width 0.1s ease;
    }
    
    .reduce-scroll-animations * {
        animation-duration: 0.1s !important;
        transition-duration: 0.1s !important;
    }
`;
document.head.appendChild(style);

// Initialize additional features
document.addEventListener('DOMContentLoaded', function() {
    initializeSocialTracking();
    initializeCTATracking();
    monitorScrollPerformance();
});

// Export functions for testing
window.AboutPageFunctions = {
    animateCounter,
    createRippleEffect,
    openLightbox,
    initializeStatsAnimation,
    initializePhilosophyCards
};