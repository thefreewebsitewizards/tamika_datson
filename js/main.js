// The Nourished Bite - Main JavaScript
// Global functionality for navigation, mobile menu, and common interactions

// DOM Content Loaded Event
document.addEventListener('DOMContentLoaded', function() {
    initializeNavigation();
    initializeMobileMenu();
    initializeScrollEffects();
    initializeAccessibility();
    initializePerformanceOptimizations();
});

// Navigation Functionality
function initializeNavigation() {
    const navLinks = document.querySelectorAll('.nav-link');
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    
    // Set active navigation link
    navLinks.forEach(link => {
        const href = link.getAttribute('href');
        // Extract filename from href (handle both relative and absolute paths)
        const hrefFilename = href.split('/').pop();
        
        if (hrefFilename === currentPage || 
            (currentPage === '' && hrefFilename === 'index.html') ||
            (currentPage === 'index.html' && hrefFilename === 'index.html')) {
            link.classList.add('active');
        } else {
            link.classList.remove('active');
        }
    });
    
    // Smooth scroll for anchor links
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            if (href.startsWith('#')) {
                e.preventDefault();
                const target = document.querySelector(href);
                if (target) {
                    target.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            }
        });
    });
}

// Mobile Menu Functionality
function initializeMobileMenu() {
    const mobileToggle = document.querySelector('.mobile-menu-toggle');
    const navMenu = document.querySelector('.nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');
    
    if (!mobileToggle || !navMenu) return;
    
    // Toggle mobile menu
    mobileToggle.addEventListener('click', function() {
        navMenu.classList.toggle('active');
        mobileToggle.classList.toggle('active');
        
        // Animate hamburger lines
        const lines = mobileToggle.querySelectorAll('.hamburger-line');
        lines.forEach((line, index) => {
            if (mobileToggle.classList.contains('active')) {
                if (index === 0) line.style.transform = 'rotate(45deg) translate(5px, 5px)';
                if (index === 1) line.style.opacity = '0';
                if (index === 2) line.style.transform = 'rotate(-45deg) translate(7px, -6px)';
            } else {
                line.style.transform = 'none';
                line.style.opacity = '1';
            }
        });
        
        // Prevent body scroll when menu is open
        document.body.style.overflow = navMenu.classList.contains('active') ? 'hidden' : '';
    });
    
    // Close mobile menu when clicking on a link
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            navMenu.classList.remove('active');
            mobileToggle.classList.remove('active');
            document.body.style.overflow = '';
            
            // Reset hamburger lines
            const lines = mobileToggle.querySelectorAll('.hamburger-line');
            lines.forEach(line => {
                line.style.transform = 'none';
                line.style.opacity = '1';
            });
        });
    });
    
    // Close mobile menu when clicking outside
    document.addEventListener('click', function(e) {
        if (!mobileToggle.contains(e.target) && !navMenu.contains(e.target)) {
            navMenu.classList.remove('active');
            mobileToggle.classList.remove('active');
            document.body.style.overflow = '';
            
            // Reset hamburger lines
            const lines = mobileToggle.querySelectorAll('.hamburger-line');
            lines.forEach(line => {
                line.style.transform = 'none';
                line.style.opacity = '1';
            });
        }
    });
}

// Scroll Effects
function initializeScrollEffects() {
    // Navbar scroll effect
    const navbar = document.querySelector('.navbar');
    const heroSection = document.querySelector('.hero') || 
                       document.querySelector('.recipes-hero') || 
                       document.querySelector('.media-hero') || 
                       document.querySelector('.about-hero') || 
                       document.querySelector('.contact-hero');
    
    if (navbar && heroSection) {
        window.addEventListener('scroll', function() {
            const heroHeight = heroSection.offsetHeight;
            const scrollPosition = window.scrollY;
            
            if (scrollPosition > heroHeight * 0.8) {
                navbar.classList.add('scrolled');
            } else {
                navbar.classList.remove('scrolled');
            }
        });
    }
    
    // Scroll indicator functionality
    const scrollIndicator = document.querySelector('.hero-scroll-indicator');
    if (scrollIndicator) {
        scrollIndicator.addEventListener('click', function() {
            // Find the hero section first
            const heroSection = document.querySelector('.hero, .recipes-hero, .media-hero, .about-hero, .contact-hero');
            if (heroSection) {
                // Find the next sibling section after the hero
                const nextSection = heroSection.nextElementSibling;
                if (nextSection) {
                    nextSection.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            }
        });
    }
    
    // Intersection Observer for animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
            }
        });
    }, observerOptions);
    
    // Observe elements for animation
    const animateElements = document.querySelectorAll('.card, .recipe-card, .stat-item');
    animateElements.forEach(el => {
        observer.observe(el);
    });
}

// Accessibility Enhancements
function initializeAccessibility() {
    // Keyboard navigation for custom elements
    const interactiveElements = document.querySelectorAll('.btn, .recipe-card, .nav-link');
    
    interactiveElements.forEach(element => {
        // Add keyboard support
        element.addEventListener('keydown', function(e) {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                this.click();
            }
        });
        
        // Ensure focusable elements have tabindex
        if (!element.hasAttribute('tabindex') && element.tagName !== 'A' && element.tagName !== 'BUTTON') {
            element.setAttribute('tabindex', '0');
        }
    });
    

}

// Performance Optimizations
function initializePerformanceOptimizations() {
    // Lazy loading for images
    const images = document.querySelectorAll('img[data-src]');
    const imageObserver = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.remove('lazy');
                imageObserver.unobserve(img);
            }
        });
    });
    
    images.forEach(img => {
        imageObserver.observe(img);
    });
    
    // Preload critical resources
    const criticalImages = [
        'images/Profile.jpg'
    ];
    
    criticalImages.forEach(src => {
        const link = document.createElement('link');
        link.rel = 'preload';
        link.as = 'image';
        link.href = src;
        document.head.appendChild(link);
    });
}

// Utility Functions
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

function throttle(func, limit) {
    let inThrottle;
    return function() {
        const args = arguments;
        const context = this;
        if (!inThrottle) {
            func.apply(context, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    };
}

// Loading Animation
function showLoading() {
    const loader = document.createElement('div');
    loader.className = 'loading-overlay';
    loader.innerHTML = '<div class="loading"></div>';
    loader.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(247, 243, 240, 0.9);
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 9999;
    `;
    document.body.appendChild(loader);
    return loader;
}

function hideLoading(loader) {
    if (loader && loader.parentNode) {
        loader.parentNode.removeChild(loader);
    }
}

// Error Handling
function handleError(error, context = 'Unknown') {
    console.error(`Error in ${context}:`, error);
    
    // Show user-friendly error message
    const errorMessage = document.createElement('div');
    errorMessage.className = 'error-message';
    errorMessage.textContent = 'Something went wrong. Please try again later.';
    errorMessage.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: var(--dusty-rose);
        color: var(--warm-white);
        padding: 1rem;
        border-radius: 8px;
        z-index: 1000;
        animation: slideInRight 0.3s ease;
    `;
    
    document.body.appendChild(errorMessage);
    
    // Auto-remove after 5 seconds
    setTimeout(() => {
        if (errorMessage.parentNode) {
            errorMessage.parentNode.removeChild(errorMessage);
        }
    }, 5000);
}

// Form Validation (for future use)
function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}

function validateForm(form) {
    const inputs = form.querySelectorAll('input[required], textarea[required]');
    let isValid = true;
    
    inputs.forEach(input => {
        const value = input.value.trim();
        
        if (!value) {
            showFieldError(input, 'This field is required');
            isValid = false;
        } else if (input.type === 'email' && !validateEmail(value)) {
            showFieldError(input, 'Please enter a valid email address');
            isValid = false;
        } else {
            clearFieldError(input);
        }
    });
    
    return isValid;
}

function showFieldError(input, message) {
    clearFieldError(input);
    
    const errorElement = document.createElement('div');
    errorElement.className = 'field-error';
    errorElement.textContent = message;
    errorElement.style.cssText = `
        color: var(--dusty-rose);
        font-size: 0.875rem;
        margin-top: 0.25rem;
    `;
    
    input.parentNode.appendChild(errorElement);
    input.style.borderColor = 'var(--dusty-rose)';
}

function clearFieldError(input) {
    const existingError = input.parentNode.querySelector('.field-error');
    if (existingError) {
        existingError.remove();
    }
    input.style.borderColor = '';
}

// Local Storage Utilities
function saveToLocalStorage(key, data) {
    try {
        localStorage.setItem(key, JSON.stringify(data));
    } catch (error) {
        console.warn('Could not save to localStorage:', error);
    }
}

function loadFromLocalStorage(key) {
    try {
        const data = localStorage.getItem(key);
        return data ? JSON.parse(data) : null;
    } catch (error) {
        console.warn('Could not load from localStorage:', error);
        return null;
    }
}

// Analytics (placeholder for future implementation)
function trackEvent(eventName, properties = {}) {
    // Placeholder for analytics tracking
    console.log('Event tracked:', eventName, properties);
}

// Social Media Integration
function shareOnSocialMedia(platform, url, text) {
    const shareUrls = {
        facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`,
        twitter: `https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}&text=${encodeURIComponent(text)}`,
        pinterest: `https://pinterest.com/pin/create/button/?url=${encodeURIComponent(url)}&description=${encodeURIComponent(text)}`,
        instagram: 'https://www.instagram.com/thenourishedbite'
    };
    
    if (shareUrls[platform]) {
        window.open(shareUrls[platform], '_blank', 'width=600,height=400');
        trackEvent('social_share', { platform, url });
    }
}

// Recipe Utilities
function formatRecipeTime(minutes) {
    if (minutes < 60) {
        return `${minutes} min`;
    } else {
        const hours = Math.floor(minutes / 60);
        const remainingMinutes = minutes % 60;
        return remainingMinutes > 0 ? `${hours}h ${remainingMinutes}m` : `${hours}h`;
    }
}

function calculateServings(originalServings, newServings, ingredients) {
    const ratio = newServings / originalServings;
    return ingredients.map(ingredient => {
        // Simple ingredient scaling (would need more sophisticated parsing for real implementation)
        return ingredient.replace(/\d+(\.\d+)?/g, match => {
            const number = parseFloat(match);
            return (number * ratio).toString();
        });
    });
}

// Print Recipe Function
function printRecipe(recipeElement) {
    const printWindow = window.open('', '_blank');
    const recipeHTML = recipeElement.outerHTML;
    
    printWindow.document.write(`
        <!DOCTYPE html>
        <html>
        <head>
            <title>Recipe - The Nourished Bite</title>
            <style>
                body { font-family: Georgia, serif; margin: 2rem; }
                .recipe-card { box-shadow: none; border: 1px solid #ccc; }
                .btn, .video-link { display: none; }
                @media print {
                    body { margin: 0; }
                    .recipe-card { break-inside: avoid; }
                }
            </style>
        </head>
        <body>
            ${recipeHTML}
        </body>
        </html>
    `);
    
    printWindow.document.close();
    printWindow.print();
}

/**
 * Add ripple effect to clicked elements
 */
function addRippleEffect(element, event) {
    try {
        const ripple = document.createElement('span');
        const rect = element.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        const x = event.clientX - rect.left - size / 2;
        const y = event.clientY - rect.top - size / 2;
        
        ripple.style.cssText = `
            position: absolute;
            border-radius: 50%;
            background: rgba(255, 255, 255, 0.3);
            transform: scale(0);
            animation: ripple 0.6s linear;
            width: ${size}px;
            height: ${size}px;
            left: ${x}px;
            top: ${y}px;
            pointer-events: none;
        `;
        
        // Ensure element has relative positioning
        const originalPosition = element.style.position;
        if (getComputedStyle(element).position === 'static') {
            element.style.position = 'relative';
        }
        
        element.appendChild(ripple);
        
        // Remove ripple after animation
        setTimeout(() => {
            if (ripple.parentNode) {
                ripple.parentNode.removeChild(ripple);
            }
            // Restore original position if we changed it
            if (originalPosition) {
                element.style.position = originalPosition;
            }
        }, 600);
        
        // Add CSS animation if not already present
        if (!document.querySelector('#ripple-animation')) {
            const style = document.createElement('style');
            style.id = 'ripple-animation';
            style.textContent = `
                @keyframes ripple {
                    to {
                        transform: scale(4);
                        opacity: 0;
                    }
                }
            `;
            document.head.appendChild(style);
        }
    } catch (error) {
        // Silently fail if ripple effect can't be added
        console.warn('Could not add ripple effect:', error);
    }
}

// Export functions for use in other files
window.NourishedBite = {
    showLoading,
    hideLoading,
    handleError,
    validateForm,
    saveToLocalStorage,
    loadFromLocalStorage,
    trackEvent,
    shareOnSocialMedia,
    formatRecipeTime,
    calculateServings,
    printRecipe,
    debounce,
    throttle,
    addRippleEffect
};

// Global error handler
window.addEventListener('error', function(e) {
    handleError(e.error, 'Global');
});

// Unhandled promise rejection handler
window.addEventListener('unhandledrejection', function(e) {
    handleError(e.reason, 'Promise');
    e.preventDefault();
});