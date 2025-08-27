// Contact Page JavaScript

// State management
const contactState = {
    activeFAQ: null,
    animationsEnabled: !window.matchMedia('(prefers-reduced-motion: reduce)').matches,
    socialClicks: {},
    emailClicks: {}
};

// DOM elements
let elements = {};

// Initialize contact page
function initContactPage() {
    cacheElements();
    setupEventListeners();
    initAnimations();
    initFAQ();
    initSocialTracking();
    initHeroAnimations();
    initScrollAnimations();
    
    console.log('Contact page initialized successfully');
}

// Cache DOM elements
function cacheElements() {
    elements = {
        faqItems: document.querySelectorAll('.faq-item'),
        faqQuestions: document.querySelectorAll('.faq-question'),
        socialPlatforms: document.querySelectorAll('.social-platform'),
        contactMethods: document.querySelectorAll('.contact-method'),
        methodLinks: document.querySelectorAll('.method-link'),
        heroStats: document.querySelectorAll('.platform-stats .stat-number'),
        ctaButtons: document.querySelectorAll('.cta-buttons .btn'),
        responseItems: document.querySelectorAll('.response-item'),
        featureItems: document.querySelectorAll('.feature-item')
    };
}

// Setup event listeners
function setupEventListeners() {
    // FAQ toggle functionality
    elements.faqQuestions.forEach(question => {
        question.addEventListener('click', handleFAQToggle);
        question.addEventListener('keydown', handleFAQKeydown);
    });
    
    // Social platform tracking
    elements.socialPlatforms.forEach(platform => {
        platform.addEventListener('click', handleSocialClick);
    });
    
    // Contact method tracking
    elements.methodLinks.forEach(link => {
        link.addEventListener('click', handleContactMethodClick);
    });
    
    // CTA button tracking
    elements.ctaButtons.forEach(button => {
        button.addEventListener('click', handleCTAClick);
    });
    
    // Ripple effect for interactive elements
    const interactiveElements = [
        ...elements.contactMethods,
        ...elements.socialPlatforms,
        ...elements.ctaButtons
    ];
    
    interactiveElements.forEach(element => {
        element.addEventListener('click', createRippleEffect);
    });
    
    // Keyboard navigation
    document.addEventListener('keydown', handleGlobalKeydown);
}

// FAQ functionality
function initFAQ() {
    // Close all FAQ items initially
    elements.faqItems.forEach(item => {
        const answer = item.querySelector('.faq-answer');
        const question = item.querySelector('.faq-question');
        
        if (answer && question) {
            answer.style.maxHeight = '0';
            question.setAttribute('aria-expanded', 'false');
        }
    });
}

function handleFAQToggle(event) {
    const question = event.currentTarget;
    const faqItem = question.closest('.faq-item');
    const answer = faqItem.querySelector('.faq-answer');
    const isExpanded = question.getAttribute('aria-expanded') === 'true';
    
    // Close all other FAQ items
    elements.faqItems.forEach(item => {
        if (item !== faqItem) {
            const otherQuestion = item.querySelector('.faq-question');
            const otherAnswer = item.querySelector('.faq-answer');
            
            if (otherQuestion && otherAnswer) {
                otherQuestion.setAttribute('aria-expanded', 'false');
                otherAnswer.style.maxHeight = '0';
                item.classList.remove('active');
            }
        }
    });
    
    // Toggle current FAQ item
    if (isExpanded) {
        question.setAttribute('aria-expanded', 'false');
        answer.style.maxHeight = '0';
        faqItem.classList.remove('active');
        contactState.activeFAQ = null;
    } else {
        question.setAttribute('aria-expanded', 'true');
        answer.style.maxHeight = answer.scrollHeight + 'px';
        faqItem.classList.add('active');
        contactState.activeFAQ = faqItem;
        
        // Smooth scroll to FAQ item
        setTimeout(() => {
            faqItem.scrollIntoView({
                behavior: 'smooth',
                block: 'center'
            });
        }, 100);
    }
    
    // Track FAQ interaction
    trackFAQInteraction(question.textContent.trim());
}

function handleFAQKeydown(event) {
    if (event.key === 'Enter' || event.key === ' ') {
        event.preventDefault();
        handleFAQToggle(event);
    }
}

// Social media tracking
function initSocialTracking() {
    contactState.socialClicks = {
        instagram: 0,
        youtube: 0,
        pinterest: 0,
        tiktok: 0
    };
}

function handleSocialClick(event) {
    const platform = event.currentTarget;
    const platformName = getPlatformName(platform);
    
    if (platformName) {
        contactState.socialClicks[platformName]++;
        
        // Add click animation
        platform.style.transform = 'scale(0.95)';
        setTimeout(() => {
            platform.style.transform = '';
        }, 150);
        
        // Track analytics (placeholder)
        trackSocialClick(platformName);
        
        console.log(`Social platform clicked: ${platformName}`);
    }
}

function getPlatformName(platformElement) {
    const iconElement = platformElement.querySelector('.platform-icon');
    if (!iconElement) return null;
    
    if (iconElement.classList.contains('instagram')) return 'instagram';
    if (iconElement.classList.contains('youtube')) return 'youtube';
    if (iconElement.classList.contains('pinterest')) return 'pinterest';
    if (iconElement.classList.contains('tiktok')) return 'tiktok';
    
    return null;
}

// Contact method tracking
function handleContactMethodClick(event) {
    const link = event.currentTarget;
    const email = link.textContent.trim();
    
    if (email.includes('@')) {
        contactState.emailClicks[email] = (contactState.emailClicks[email] || 0) + 1;
        
        // Track email click
        trackEmailClick(email);
        
        console.log(`Email clicked: ${email}`);
    }
}

// CTA button tracking
function handleCTAClick(event) {
    const button = event.currentTarget;
    const buttonText = button.textContent.trim();
    
    // Track CTA interaction
    trackCTAClick(buttonText);
    
    console.log(`CTA button clicked: ${buttonText}`);
}

// Hero animations
function initHeroAnimations() {
    if (!contactState.animationsEnabled) return;
    
    // Animate hero stats with counting effect
    const observerOptions = {
        threshold: 0.5,
        rootMargin: '0px 0px -100px 0px'
    };
    
    const statsObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateStatNumber(entry.target);
                statsObserver.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    elements.heroStats.forEach(stat => {
        statsObserver.observe(stat);
    });
}

function animateStatNumber(element) {
    const finalValue = element.textContent;
    const numericValue = parseInt(finalValue.replace(/[^0-9]/g, ''));
    const suffix = finalValue.replace(/[0-9]/g, '');
    
    if (isNaN(numericValue)) return;
    
    let currentValue = 0;
    const increment = numericValue / 50;
    const duration = 2000;
    const stepTime = duration / 50;
    
    element.textContent = '0' + suffix;
    
    const timer = setInterval(() => {
        currentValue += increment;
        
        if (currentValue >= numericValue) {
            currentValue = numericValue;
            clearInterval(timer);
        }
        
        element.textContent = Math.floor(currentValue) + suffix;
    }, stepTime);
}

// Scroll animations
function initScrollAnimations() {
    if (!contactState.animationsEnabled) return;
    
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const scrollObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);
    
    // Animate contact methods
    elements.contactMethods.forEach((method, index) => {
        method.style.opacity = '0';
        method.style.transform = 'translateY(30px)';
        method.style.transition = `opacity 0.6s ease ${index * 0.1}s, transform 0.6s ease ${index * 0.1}s`;
        scrollObserver.observe(method);
    });
    
    // Animate social platforms
    elements.socialPlatforms.forEach((platform, index) => {
        platform.style.opacity = '0';
        platform.style.transform = 'translateY(30px)';
        platform.style.transition = `opacity 0.6s ease ${index * 0.1}s, transform 0.6s ease ${index * 0.1}s`;
        scrollObserver.observe(platform);
    });
    
    // Animate feature items
    elements.featureItems.forEach((item, index) => {
        item.style.opacity = '0';
        item.style.transform = 'translateY(30px)';
        item.style.transition = `opacity 0.6s ease ${index * 0.1}s, transform 0.6s ease ${index * 0.1}s`;
        scrollObserver.observe(item);
    });
    
    // Animate response items
    elements.responseItems.forEach((item, index) => {
        item.style.opacity = '0';
        item.style.transform = 'translateY(30px)';
        item.style.transition = `opacity 0.6s ease ${index * 0.1}s, transform 0.6s ease ${index * 0.1}s`;
        scrollObserver.observe(item);
    });
}

// Ripple effect
function createRippleEffect(event) {
    const element = event.currentTarget;
    const rect = element.getBoundingClientRect();
    const ripple = document.createElement('span');
    
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
        animation: ripple 0.6s ease-out;
        pointer-events: none;
        z-index: 1;
    `;
    
    // Ensure element has relative positioning
    if (getComputedStyle(element).position === 'static') {
        element.style.position = 'relative';
    }
    
    element.appendChild(ripple);
    
    // Remove ripple after animation
    setTimeout(() => {
        if (ripple.parentNode) {
            ripple.parentNode.removeChild(ripple);
        }
    }, 600);
}

// Keyboard navigation
function handleGlobalKeydown(event) {
    // Close FAQ with Escape key
    if (event.key === 'Escape' && contactState.activeFAQ) {
        const question = contactState.activeFAQ.querySelector('.faq-question');
        const answer = contactState.activeFAQ.querySelector('.faq-answer');
        
        if (question && answer) {
            question.setAttribute('aria-expanded', 'false');
            answer.style.maxHeight = '0';
            contactState.activeFAQ.classList.remove('active');
            contactState.activeFAQ = null;
            question.focus();
        }
    }
}

// Animation initialization
function initAnimations() {
    // Add CSS for ripple animation if not exists
    if (!document.querySelector('#contact-animations')) {
        const style = document.createElement('style');
        style.id = 'contact-animations';
        style.textContent = `
            @keyframes ripple {
                to {
                    transform: scale(2);
                    opacity: 0;
                }
            }
        `;
        document.head.appendChild(style);
    }
}

// Analytics tracking functions (placeholders)
function trackFAQInteraction(question) {
    // Placeholder for analytics
    if (window.gtag) {
        window.gtag('event', 'faq_interaction', {
            event_category: 'Contact',
            event_label: question,
            value: 1
        });
    }
}

function trackSocialClick(platform) {
    // Placeholder for analytics
    if (window.gtag) {
        window.gtag('event', 'social_click', {
            event_category: 'Contact',
            event_label: platform,
            value: 1
        });
    }
}

function trackEmailClick(email) {
    // Placeholder for analytics
    if (window.gtag) {
        window.gtag('event', 'email_click', {
            event_category: 'Contact',
            event_label: email,
            value: 1
        });
    }
}

function trackCTAClick(buttonText) {
    // Placeholder for analytics
    if (window.gtag) {
        window.gtag('event', 'cta_click', {
            event_category: 'Contact',
            event_label: buttonText,
            value: 1
        });
    }
}

// Utility functions
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

// Performance monitoring
function monitorPerformance() {
    if ('performance' in window) {
        const perfData = performance.getEntriesByType('navigation')[0];
        if (perfData) {
            console.log('Contact page load time:', perfData.loadEventEnd - perfData.loadEventStart, 'ms');
        }
    }
}

// Error handling
function handleError(error, context) {
    console.error(`Contact page error in ${context}:`, error);
    
    // Track error for analytics
    if (window.gtag) {
        window.gtag('event', 'exception', {
            description: `Contact: ${context} - ${error.message}`,
            fatal: false
        });
    }
}

// Export functions to global scope
if (typeof window !== 'undefined') {
    window.NourishedBite = window.NourishedBite || {};
    window.NourishedBite.contact = {
        init: initContactPage,
        state: contactState,
        trackSocialClick,
        trackEmailClick,
        trackCTAClick
    };
}

// Initialize when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initContactPage);
} else {
    initContactPage();
}

// Monitor performance
window.addEventListener('load', monitorPerformance);

// Global error handling
window.addEventListener('error', (event) => {
    handleError(event.error, 'Global');
});

window.addEventListener('unhandledrejection', (event) => {
    handleError(event.reason, 'Promise');
});