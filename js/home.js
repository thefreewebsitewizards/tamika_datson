// Home Page Specific JavaScript - The Nourished Bite
// Carousel functionality, hero animations, and home page interactions

document.addEventListener('DOMContentLoaded', function() {
    initializeCarousel();
    initializeHeroAnimations();
    initializeStatsCounter();
    initializeInstagramFeed();
    initializeScrollAnimations();
});

// Featured Recipes Carousel
function initializeCarousel() {
    const carousel = document.querySelector('.recipe-carousel');
    const prevBtn = document.querySelector('.prev-btn');
    const nextBtn = document.querySelector('.next-btn');
    const indicators = document.querySelectorAll('.indicator');
    const cards = document.querySelectorAll('.recipe-card.featured');
    
    if (!carousel || !cards.length) return;
    
    let currentSlide = 0;
    const totalSlides = cards.length;
    let autoPlayInterval;
    
    // Update carousel position
    function updateCarousel() {
        const translateX = -currentSlide * 100;
        carousel.style.transform = `translateX(${translateX}%)`;
        
        // Update indicators
        indicators.forEach((indicator, index) => {
            indicator.classList.toggle('active', index === currentSlide);
        });
        
        // Update button states
        if (prevBtn && nextBtn) {
            prevBtn.style.opacity = currentSlide === 0 ? '0.5' : '1';
            nextBtn.style.opacity = currentSlide === totalSlides - 1 ? '0.5' : '1';
        }
    }
    
    // Go to specific slide
    function goToSlide(slideIndex) {
        currentSlide = Math.max(0, Math.min(slideIndex, totalSlides - 1));
        updateCarousel();
        resetAutoPlay();
    }
    
    // Next slide
    function nextSlide() {
        currentSlide = (currentSlide + 1) % totalSlides;
        updateCarousel();
        resetAutoPlay();
    }
    
    // Previous slide
    function prevSlide() {
        currentSlide = currentSlide === 0 ? totalSlides - 1 : currentSlide - 1;
        updateCarousel();
        resetAutoPlay();
    }
    
    // Auto play functionality
    function startAutoPlay() {
        autoPlayInterval = setInterval(nextSlide, 5000); // 5 seconds
    }
    
    function stopAutoPlay() {
        if (autoPlayInterval) {
            clearInterval(autoPlayInterval);
        }
    }
    
    function resetAutoPlay() {
        stopAutoPlay();
        startAutoPlay();
    }
    
    // Event listeners
    if (nextBtn) {
        nextBtn.addEventListener('click', nextSlide);
    }
    
    if (prevBtn) {
        prevBtn.addEventListener('click', prevSlide);
    }
    
    // Indicator clicks
    indicators.forEach((indicator, index) => {
        indicator.addEventListener('click', () => goToSlide(index));
    });
    
    // Keyboard navigation
    document.addEventListener('keydown', function(e) {
        if (e.key === 'ArrowLeft') {
            prevSlide();
        } else if (e.key === 'ArrowRight') {
            nextSlide();
        }
    });
    
    // Touch/swipe support
    let startX = 0;
    let endX = 0;
    
    carousel.addEventListener('touchstart', function(e) {
        startX = e.touches[0].clientX;
        stopAutoPlay();
    });
    
    carousel.addEventListener('touchmove', function(e) {
        endX = e.touches[0].clientX;
    });
    
    carousel.addEventListener('touchend', function() {
        const threshold = 50;
        const diff = startX - endX;
        
        if (Math.abs(diff) > threshold) {
            if (diff > 0) {
                nextSlide();
            } else {
                prevSlide();
            }
        } else {
            resetAutoPlay();
        }
    });
    
    // Pause auto-play on hover
    const carouselContainer = document.querySelector('.carousel-container');
    if (carouselContainer) {
        carouselContainer.addEventListener('mouseenter', stopAutoPlay);
        carouselContainer.addEventListener('mouseleave', startAutoPlay);
    }
    
    // Initialize
    updateCarousel();
    startAutoPlay();
    
    // Pause auto-play when page is not visible
    document.addEventListener('visibilitychange', function() {
        if (document.hidden) {
            stopAutoPlay();
        } else {
            startAutoPlay();
        }
    });
}

// Hero Section Animations
function initializeHeroAnimations() {
    const heroTitle = document.querySelector('.hero-title');
    const heroSubtitle = document.querySelector('.hero-subtitle');
    const heroButtons = document.querySelector('.hero-buttons');
    const profileImage = document.querySelector('.profile-image');
    const floatingElements = document.querySelectorAll('.floating-element');
    
    // Stagger animations
    if (heroTitle) {
        setTimeout(() => heroTitle.style.opacity = '1', 100);
    }
    
    if (heroSubtitle) {
        setTimeout(() => heroSubtitle.style.opacity = '1', 300);
    }
    
    if (heroButtons) {
        setTimeout(() => heroButtons.style.opacity = '1', 500);
    }
    
    // Profile image hover effect
    if (profileImage) {
        profileImage.addEventListener('mouseenter', function() {
            this.style.transform = 'scale(1.05) rotate(2deg)';
        });
        
        profileImage.addEventListener('mouseleave', function() {
            this.style.transform = 'scale(1) rotate(0deg)';
        });
    }
    
    // Floating elements random animation delays
    floatingElements.forEach((element, index) => {
        const delay = Math.random() * 2;
        element.style.animationDelay = `${delay}s`;
        
        // Add random movement
        setInterval(() => {
            const x = Math.random() * 20 - 10;
            const y = Math.random() * 20 - 10;
            element.style.transform = `translate(${x}px, ${y}px)`;
        }, 3000 + Math.random() * 2000);
    });
}

// Stats Counter Animation
function initializeStatsCounter() {
    const statNumbers = document.querySelectorAll('.stat-number');
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateCounter(entry.target);
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });
    
    statNumbers.forEach(stat => {
        observer.observe(stat);
    });
}

function animateCounter(element) {
    const target = parseInt(element.textContent.replace(/\D/g, ''));
    const suffix = element.textContent.replace(/[0-9]/g, '');
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

// Instagram Feed Simulation
function initializeInstagramFeed() {
    const instagramPosts = document.querySelectorAll('.instagram-post');
    
    // Add click handlers to Instagram posts
    instagramPosts.forEach(post => {
        post.addEventListener('click', function() {
            window.open('https://www.instagram.com/thenourishedbite', '_blank');
            
            // Track click
            if (window.NourishedBite && window.NourishedBite.trackEvent) {
                window.NourishedBite.trackEvent('instagram_post_click');
            }
        });
        
        // Add keyboard support
        post.setAttribute('tabindex', '0');
        post.addEventListener('keydown', function(e) {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                this.click();
            }
        });
    });
    
    // Simulate loading new posts (visual effect only)
    function simulateNewPosts() {
        instagramPosts.forEach((post, index) => {
            setTimeout(() => {
                post.style.opacity = '0';
                setTimeout(() => {
                    // Change background color to simulate new content
                    const colors = ['#C19A6B', '#9CAF88', '#D4A5A5', '#B8A082'];
                    const img = post.querySelector('img');
                    if (img) {
                        const randomColor = colors[Math.floor(Math.random() * colors.length)];
                        img.style.backgroundColor = randomColor;
                    }
                    post.style.opacity = '1';
                }, 200);
            }, index * 100);
        });
    }
    
    // Simulate new posts every 30 seconds
    setInterval(simulateNewPosts, 30000);
}

// Scroll Animations
function initializeScrollAnimations() {
    // Parallax effect for hero section
    const hero = document.querySelector('.hero');
    const heroContent = document.querySelector('.hero-content');
    
    if (hero && heroContent) {
        window.addEventListener('scroll', window.NourishedBite.throttle(function() {
            const scrolled = window.pageYOffset;
            const rate = scrolled * -0.5;
            
            if (scrolled < window.innerHeight) {
                heroContent.style.transform = `translateY(${rate}px)`;
            }
        }, 16));
    }
    
    // Fade in animations for sections
    const sections = document.querySelectorAll('.section');
    const sectionObserver = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in');
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
    });
    
    sections.forEach(section => {
        sectionObserver.observe(section);
    });
    
    // Recipe cards stagger animation
    const recipeCards = document.querySelectorAll('.recent-posts .recipe-card');
    const cardObserver = new IntersectionObserver(function(entries) {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.classList.add('slide-up');
                }, index * 100);
                cardObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.2 });
    
    recipeCards.forEach(card => {
        cardObserver.observe(card);
    });
}

// Recipe Card Interactions
function initializeRecipeCardInteractions() {
    const recipeCards = document.querySelectorAll('.recipe-card');
    
    recipeCards.forEach(card => {
        // Add hover sound effect (optional)
        card.addEventListener('mouseenter', function() {
            // Could add subtle sound effect here
            this.style.transform = 'translateY(-8px) scale(1.02)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
        
        // Add click tracking
        card.addEventListener('click', function() {
            const recipeTitle = this.querySelector('.recipe-title')?.textContent;
            if (window.NourishedBite && window.NourishedBite.trackEvent) {
                window.NourishedBite.trackEvent('recipe_card_click', {
                    recipe: recipeTitle
                });
            }
        });
    });
}

// Social Media Tracking
function initializeSocialTracking() {
    const socialLinks = document.querySelectorAll('.social-link, .video-link');
    
    socialLinks.forEach(link => {
        link.addEventListener('click', function() {
            const platform = this.href.includes('instagram') ? 'instagram' : 'other';
            if (window.NourishedBite && window.NourishedBite.trackEvent) {
                window.NourishedBite.trackEvent('social_link_click', {
                    platform: platform,
                    url: this.href
                });
            }
        });
    });
}

// CTA Button Interactions
function initializeCTAButtons() {
    const ctaButtons = document.querySelectorAll('.cta-buttons .btn');
    
    ctaButtons.forEach(button => {
        button.addEventListener('click', function() {
            const buttonText = this.textContent.trim();
            if (window.NourishedBite && window.NourishedBite.trackEvent) {
                window.NourishedBite.trackEvent('cta_button_click', {
                    button: buttonText
                });
            }
            
            // Add ripple effect
            createRippleEffect(this, event);
        });
    });
}

// Ripple Effect for Buttons
function createRippleEffect(button, event) {
    const ripple = document.createElement('span');
    const rect = button.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);
    const x = event.clientX - rect.left - size / 2;
    const y = event.clientY - rect.top - size / 2;
    
    ripple.style.cssText = `
        position: absolute;
        width: ${size}px;
        height: ${size}px;
        left: ${x}px;
        top: ${y}px;
        background: rgba(255, 255, 255, 0.3);
        border-radius: 50%;
        transform: scale(0);
        animation: ripple 0.6s linear;
        pointer-events: none;
    `;
    
    button.style.position = 'relative';
    button.style.overflow = 'hidden';
    button.appendChild(ripple);
    
    setTimeout(() => {
        ripple.remove();
    }, 600);
}

// Add CSS for animations
const style = document.createElement('style');
style.textContent = `
    @keyframes ripple {
        to {
            transform: scale(4);
            opacity: 0;
        }
    }
    
    .fade-in {
        animation: fadeIn 0.8s ease-out forwards;
    }
    
    @keyframes fadeIn {
        from {
            opacity: 0;
            transform: translateY(30px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
    
    .slide-up {
        animation: slideUp 0.6s ease-out forwards;
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
    
    .animate-in {
        animation: animateIn 0.8s ease-out forwards;
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
`;
document.head.appendChild(style);

// Initialize additional interactions
document.addEventListener('DOMContentLoaded', function() {
    initializeRecipeCardInteractions();
    initializeSocialTracking();
    initializeCTAButtons();
});

// Performance monitoring
function monitorPerformance() {
    // Monitor carousel performance
    const carousel = document.querySelector('.recipe-carousel');
    if (carousel) {
        let frameCount = 0;
        let lastTime = performance.now();
        
        function checkFrameRate() {
            frameCount++;
            const currentTime = performance.now();
            
            if (currentTime - lastTime >= 1000) {
                const fps = frameCount;
                frameCount = 0;
                lastTime = currentTime;
                
                // If FPS is too low, reduce animations
                if (fps < 30) {
                    document.body.classList.add('reduce-animations');
                }
            }
            
            requestAnimationFrame(checkFrameRate);
        }
        
        requestAnimationFrame(checkFrameRate);
    }
}

// Initialize performance monitoring
if (window.requestAnimationFrame) {
    monitorPerformance();
}

// Export functions for testing
window.HomePageFunctions = {
    initializeCarousel,
    initializeHeroAnimations,
    initializeStatsCounter,
    animateCounter,
    createRippleEffect
};