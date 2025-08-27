/**
 * Media Page JavaScript
 * Handles media page functionality including filtering, animations, and interactions
 */

(function() {
    'use strict';

    // State management
    let currentFilter = 'all';
    let isLoading = false;
    let publicationsLoaded = 6; // Initial number of publications shown
    const publicationsPerLoad = 6;

    // DOM elements
    const elements = {
        filterButtons: null,
        publicationsGrid: null,
        publicationCards: null,
        loadMoreBtn: null,
        heroStats: null,
        featuredCards: null,
        tvCards: null,
        awardCards: null
    };

    // Sample additional publications data (for load more functionality)
    const additionalPublications = [
        {
            category: 'magazines',
            title: 'Health Magazine',
            description: '"Supercharge Your Morning Routine" - Five energizing breakfast recipes that fuel your day with sustained energy.',
            date: 'June 2023',
            type: 'Recipe Feature',
            image: './images/health-magazine.jpg'
        },
        {
            category: 'online',
            title: 'Food52',
            description: '"The Science of Flavor Pairing" - Understanding how to combine ingredients for maximum taste and nutritional benefit.',
            date: 'May 2023',
            type: 'Expert Article',
            image: './images/food52.jpg'
        },
        {
            category: 'newspapers',
            title: 'USA Today',
            description: '"Healthy Eating on a Budget" - Practical tips for maintaining nutritious meals without breaking the bank.',
            date: 'April 2023',
            type: 'Lifestyle Section',
            image: './images/usa-today.jpg'
        },
        {
            category: 'magazines',
            title: 'Women\'s Health',
            description: '"Post-Workout Nutrition" - Optimal recovery meals that support fitness goals and muscle recovery.',
            date: 'March 2023',
            type: 'Fitness Feature',
            image: './images/womens-health.jpg'
        },
        {
            category: 'online',
            title: 'The Kitchn',
            description: '"Meal Prep Like a Pro" - Advanced strategies for efficient meal preparation that saves time and reduces stress.',
            date: 'February 2023',
            type: 'How-To Guide',
            image: './images/the-kitchn.jpg'
        },
        {
            category: 'books',
            title: '"Plant-Forward Living"',
            description: 'Guest contributor with 8 seasonal recipes highlighting the versatility of plant-based ingredients.',
            date: 'January 2023',
            type: 'Cookbook',
            image: './images/plant-forward-book.jpg'
        }
    ];

    /**
     * Initialize the media page
     */
    function init() {
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', setupMediaPage);
        } else {
            setupMediaPage();
        }
    }

    /**
     * Setup media page functionality
     */
    function setupMediaPage() {
        try {
            cacheElements();
            setupEventListeners();
            initializeAnimations();
            setupIntersectionObserver();
            animateHeroStats();
            showAllPublications(); // Show all publications by default
            
            console.log('Media page initialized successfully');
        } catch (error) {
            console.error('Error initializing media page:', error);
        }
    }

    /**
     * Show all publications by default
     */
    function showAllPublications() {
        if (!elements.publicationCards) return;
        
        elements.publicationCards.forEach((card, index) => {
            card.classList.add('show');
            // Stagger animation
            setTimeout(() => {
                card.style.animationDelay = `${index * 0.1}s`;
            }, 50);
        });
    }

    /**
     * Cache DOM elements
     */
    function cacheElements() {
        elements.filterButtons = document.querySelectorAll('.filter-btn');
        elements.publicationsGrid = document.getElementById('publications-grid');
        elements.publicationCards = document.querySelectorAll('.publication-card');
        elements.loadMoreBtn = document.getElementById('load-more-publications');
        elements.heroStats = document.querySelectorAll('.stat-number');
        elements.featuredCards = document.querySelectorAll('.featured-media-card');
        elements.tvCards = document.querySelectorAll('.tv-appearance-card');
        elements.awardCards = document.querySelectorAll('.award-card');
    }

    /**
     * Setup event listeners
     */
    function setupEventListeners() {
        // Filter buttons
        if (elements.filterButtons) {
            elements.filterButtons.forEach(button => {
                button.addEventListener('click', handleFilterClick);
            });
        }

        // Load more button
        if (elements.loadMoreBtn) {
            elements.loadMoreBtn.addEventListener('click', handleLoadMore);
        }

        // TV appearance cards (video play simulation)
        if (elements.tvCards) {
            elements.tvCards.forEach(card => {
                card.addEventListener('click', handleTvCardClick);
                card.addEventListener('keydown', handleTvCardKeydown);
            });
        }

        // Keyboard navigation for filter buttons
        if (elements.filterButtons) {
            elements.filterButtons.forEach(button => {
                button.addEventListener('keydown', handleFilterKeydown);
            });
        }

        // Social media tracking for media links
        document.addEventListener('click', handleMediaLinkClick);
    }

    /**
     * Handle filter button clicks
     */
    function handleFilterClick(event) {
        const button = event.target;
        const filter = button.dataset.filter;
        
        if (filter === currentFilter || isLoading) return;
        
        // Update active button
        elements.filterButtons.forEach(btn => btn.classList.remove('active'));
        button.classList.add('active');
        
        // Apply filter
        currentFilter = filter;
        filterPublications(filter);
        
        // Track filter usage
        if (window.NourishedBite && window.NourishedBite.analytics) {
            window.NourishedBite.analytics.track('media_filter_used', {
                filter: filter,
                timestamp: new Date().toISOString()
            });
        }
    }

    /**
     * Handle keyboard navigation for filter buttons
     */
    function handleFilterKeydown(event) {
        if (event.key === 'Enter' || event.key === ' ') {
            event.preventDefault();
            handleFilterClick(event);
        }
    }

    /**
     * Filter publications based on category
     */
    function filterPublications(filter) {
        if (!elements.publicationCards) return;
        
        elements.publicationCards.forEach((card, index) => {
            const category = card.dataset.category;
            const shouldShow = filter === 'all' || category === filter;
            
            if (shouldShow) {
                card.classList.remove('hide');
                card.classList.add('show');
                // Stagger animation
                setTimeout(() => {
                    card.style.animationDelay = `${index * 0.1}s`;
                }, 50);
            } else {
                card.classList.remove('show');
                card.classList.add('hide');
            }
        });
        
        // Update load more button visibility
        updateLoadMoreButton();
    }

    /**
     * Handle load more button click
     */
    function handleLoadMore() {
        if (isLoading) return;
        
        isLoading = true;
        elements.loadMoreBtn.classList.add('loading');
        elements.loadMoreBtn.textContent = 'Loading...';
        
        // Simulate loading delay
        setTimeout(() => {
            loadMorePublications();
            isLoading = false;
            elements.loadMoreBtn.classList.remove('loading');
            elements.loadMoreBtn.innerHTML = `
                Load More Publications
                <i class="fas fa-chevron-down" aria-hidden="true"></i>
            `;
        }, 1000);
    }

    /**
     * Load more publications
     */
    function loadMorePublications() {
        const publicationsToLoad = additionalPublications.slice(
            publicationsLoaded - 6, 
            publicationsLoaded - 6 + publicationsPerLoad
        );
        
        publicationsToLoad.forEach((publication, index) => {
            const card = createPublicationCard(publication);
            elements.publicationsGrid.appendChild(card);
            
            // Animate new cards
            setTimeout(() => {
                card.classList.add('show');
            }, index * 100);
        });
        
        publicationsLoaded += publicationsPerLoad;
        
        // Update cached elements
        elements.publicationCards = document.querySelectorAll('.publication-card');
        
        // Apply current filter to new cards
        if (currentFilter !== 'all') {
            filterPublications(currentFilter);
        }
        
        updateLoadMoreButton();
    }

    /**
     * Create publication card element
     */
    function createPublicationCard(publication) {
        const card = document.createElement('article');
        card.className = 'publication-card';
        card.dataset.category = publication.category;
        
        card.innerHTML = `
            <div class="publication-image">
                <img src="${publication.image}" alt="${publication.title}" loading="lazy">
            </div>
            <div class="publication-content">
                <h3 class="publication-title">${publication.title}</h3>
                <p class="publication-description">${publication.description}</p>
                <div class="publication-meta">
                    <span class="publication-date">${publication.date}</span>
                    <span class="publication-type">${publication.type}</span>
                </div>
            </div>
        `;
        
        return card;
    }

    /**
     * Update load more button visibility
     */
    function updateLoadMoreButton() {
        if (!elements.loadMoreBtn) return;
        
        const remainingPublications = additionalPublications.length - (publicationsLoaded - 6);
        
        if (remainingPublications <= 0) {
            elements.loadMoreBtn.style.display = 'none';
        } else {
            elements.loadMoreBtn.style.display = 'inline-flex';
        }
    }

    /**
     * Handle TV card clicks (video play simulation)
     */
    function handleTvCardClick(event) {
        const card = event.currentTarget;
        const title = card.querySelector('.tv-title').textContent;
        
        // Simulate video play
        showVideoModal(title);
        
        // Track video interaction
        if (window.NourishedBite && window.NourishedBite.analytics) {
            window.NourishedBite.analytics.track('tv_video_clicked', {
                title: title,
                timestamp: new Date().toISOString()
            });
        }
    }

    /**
     * Handle TV card keyboard navigation
     */
    function handleTvCardKeydown(event) {
        if (event.key === 'Enter' || event.key === ' ') {
            event.preventDefault();
            handleTvCardClick(event);
        }
    }

    /**
     * Show video modal (simulation)
     */
    function showVideoModal(title) {
        // Create modal overlay
        const modal = document.createElement('div');
        modal.className = 'video-modal';
        modal.innerHTML = `
            <div class="modal-content">
                <div class="modal-header">
                    <h3>${title}</h3>
                    <button class="modal-close" aria-label="Close video">
                        <i class="fas fa-times"></i>
                    </button>
                </div>
                <div class="modal-body">
                    <div class="video-placeholder">
                        <i class="fas fa-play-circle"></i>
                        <p>Video would play here</p>
                        <p class="video-note">This is a demo - actual video integration would connect to your media hosting platform</p>
                    </div>
                </div>
            </div>
        `;
        
        // Add modal styles
        const style = document.createElement('style');
        style.textContent = `
            .video-modal {
                position: fixed;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                background: rgba(0, 0, 0, 0.8);
                display: flex;
                align-items: center;
                justify-content: center;
                z-index: 1000;
                animation: fadeIn 0.3s ease;
            }
            .modal-content {
                background: white;
                border-radius: 12px;
                max-width: 600px;
                width: 90%;
                max-height: 80%;
                overflow: hidden;
            }
            .modal-header {
                display: flex;
                justify-content: space-between;
                align-items: center;
                padding: 1rem 1.5rem;
                border-bottom: 1px solid #eee;
            }
            .modal-close {
                background: none;
                border: none;
                font-size: 1.5rem;
                cursor: pointer;
                color: #666;
            }
            .modal-body {
                padding: 2rem;
            }
            .video-placeholder {
                text-align: center;
                padding: 3rem;
                background: #f8f9fa;
                border-radius: 8px;
            }
            .video-placeholder i {
                font-size: 4rem;
                color: #d4a574;
                margin-bottom: 1rem;
            }
            .video-note {
                font-size: 0.9rem;
                color: #666;
                margin-top: 1rem;
            }
            @keyframes fadeIn {
                from { opacity: 0; }
                to { opacity: 1; }
            }
        `;
        
        document.head.appendChild(style);
        document.body.appendChild(modal);
        
        // Close modal functionality
        const closeBtn = modal.querySelector('.modal-close');
        const closeModal = () => {
            modal.remove();
            style.remove();
        };
        
        closeBtn.addEventListener('click', closeModal);
        modal.addEventListener('click', (e) => {
            if (e.target === modal) closeModal();
        });
        
        // Escape key to close
        const handleEscape = (e) => {
            if (e.key === 'Escape') {
                closeModal();
                document.removeEventListener('keydown', handleEscape);
            }
        };
        document.addEventListener('keydown', handleEscape);
    }

    /**
     * Handle media link clicks for tracking
     */
    function handleMediaLinkClick(event) {
        const link = event.target.closest('a');
        if (!link) return;
        
        const href = link.getAttribute('href');
        const text = link.textContent.trim();
        
        // Track external media links
        if (href && (href.startsWith('http') || href.includes('media'))) {
            if (window.NourishedBite && window.NourishedBite.analytics) {
                window.NourishedBite.analytics.track('media_link_clicked', {
                    url: href,
                    text: text,
                    timestamp: new Date().toISOString()
                });
            }
        }
    }

    /**
     * Animate hero statistics
     */
    function animateHeroStats() {
        if (!elements.heroStats) return;
        
        elements.heroStats.forEach((stat, index) => {
            const finalValue = parseInt(stat.textContent.replace(/\D/g, ''));
            const suffix = stat.textContent.replace(/\d/g, '');
            
            animateCounter(stat, 0, finalValue, 2000, suffix, index * 200);
        });
    }

    /**
     * Animate counter with easing
     */
    function animateCounter(element, start, end, duration, suffix = '', delay = 0) {
        setTimeout(() => {
            const startTime = performance.now();
            
            function updateCounter(currentTime) {
                const elapsed = currentTime - startTime;
                const progress = Math.min(elapsed / duration, 1);
                
                // Easing function (ease-out)
                const easeOut = 1 - Math.pow(1 - progress, 3);
                const current = Math.floor(start + (end - start) * easeOut);
                
                element.textContent = current + suffix;
                
                if (progress < 1) {
                    requestAnimationFrame(updateCounter);
                }
            }
            
            requestAnimationFrame(updateCounter);
        }, delay);
    }

    /**
     * Initialize scroll animations
     */
    function initializeAnimations() {
        // Add initial animation classes
        if (elements.featuredCards) {
            elements.featuredCards.forEach((card, index) => {
                card.style.animationDelay = `${index * 0.2}s`;
            });
        }
    }

    /**
     * Setup intersection observer for scroll animations
     */
    function setupIntersectionObserver() {
        if (!window.IntersectionObserver) return;
        
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animate');
                    
                    // Special handling for award cards
                    if (entry.target.classList.contains('award-card')) {
                        const icon = entry.target.querySelector('.award-icon');
                        if (icon) {
                            setTimeout(() => {
                                icon.style.transform = 'scale(1.1) rotate(360deg)';
                                setTimeout(() => {
                                    icon.style.transform = 'scale(1) rotate(0deg)';
                                }, 600);
                            }, 300);
                        }
                    }
                }
            });
        }, observerOptions);
        
        // Observe elements
        const elementsToObserve = [
            ...elements.featuredCards,
            ...elements.publicationCards,
            ...elements.tvCards,
            ...elements.awardCards
        ];
        
        elementsToObserve.forEach(element => {
            if (element) observer.observe(element);
        });
    }

    /**
     * Utility function to debounce events
     */
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

    /**
     * Handle window resize
     */
    const handleResize = debounce(() => {
        // Recalculate layouts if needed
        console.log('Media page layout recalculated');
    }, 250);

    // Add resize listener
    window.addEventListener('resize', handleResize);

    // Export functions to global scope
    if (!window.NourishedBite) {
        window.NourishedBite = {};
    }
    
    window.NourishedBite.media = {
        init,
        filterPublications,
        loadMorePublications,
        animateHeroStats
    };

    // Initialize when script loads
    init();

})();

// Global error handling for media page
window.addEventListener('error', (event) => {
    if (event.filename && event.filename.includes('media.js')) {
        console.error('Media page error:', event.error);
        
        // Track error if analytics available
        if (window.NourishedBite && window.NourishedBite.analytics) {
            window.NourishedBite.analytics.track('media_page_error', {
                error: event.error.message,
                line: event.lineno,
                timestamp: new Date().toISOString()
            });
        }
    }
});

// Performance monitoring
if (window.performance && window.performance.mark) {
    window.performance.mark('media-js-loaded');
    
    window.addEventListener('load', () => {
        window.performance.mark('media-page-loaded');
        
        // Measure performance
        try {
            window.performance.measure('media-page-load-time', 'media-js-loaded', 'media-page-loaded');
            const measure = window.performance.getEntriesByName('media-page-load-time')[0];
            console.log(`Media page load time: ${measure.duration.toFixed(2)}ms`);
        } catch (error) {
            console.log('Performance measurement not available');
        }
    });
}