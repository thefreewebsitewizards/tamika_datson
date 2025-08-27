// Recipes Page JavaScript

// Recipe Database - Tamika's Authentic Recipes
const recipeDatabase = [
    {
        id: 1,
        title: "Milky Way Slice 💫",
        description: "Decadent layers of almond base, creamy caramel, and rich chocolate coating",
        image: "https://images.unsplash.com/photo-1551024506-0bccd828d307?w=400&h=300&fit=crop&auto=format", // TEMP PLACEHOLDER - chocolate dessert slice
        category: "desserts",
        diet: ["gluten-free", "dairy-free"],
        cookTime: 45,
        servings: 8,
        difficulty: "easy",
        ingredients: ["almond meal", "coconut", "coconut butter", "maple syrup", "medjool dates", "coconut yoghurt", "vanilla", "dark chocolate"],
        videoUrl: "https://www.instagram.com/reel/DNePaKqTR1G/",
        featured: true
    },
    {
        id: 2,
        title: "Salted Caramel Banana Truffles 🍌",
        description: "Protein-packed truffles with banana, almond butter, and chocolate coating",
        image: "https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=400&h=300&fit=crop&auto=format", // TEMP PLACEHOLDER - chocolate truffles
        category: "desserts",
        diet: ["gluten-free", "protein"],
        cookTime: 30,
        servings: 12,
        difficulty: "easy",
        ingredients: ["banana", "honey", "almond butter", "almond meal", "salted caramel protein", "hemp seeds", "cinnamon", "chocolate chips", "dark chocolate", "cacao nibs"],
        videoUrl: "https://www.instagram.com/reel/DM7J8mhz1NB/"
    },
    {
        id: 3,
        title: "Chocolate, Kiwi, Honey & Yoghurt Clusters 🥝🍯",
        description: "Fresh kiwi and yogurt clusters coated in dark chocolate",
        image: "https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445?w=400&h=300&fit=crop&auto=format", // TEMP PLACEHOLDER - kiwi yogurt dessert
        category: "desserts",
        diet: ["fresh", "probiotic"],
        cookTime: 20,
        servings: 6,
        difficulty: "easy",
        ingredients: ["golden kiwis", "coconut yoghurt", "honey", "chia seeds", "dark chocolate"],
        videoUrl: "https://www.instagram.com/reel/DLHPwBlTxXu/"
    },
    {
        id: 4,
        title: "Fudgy Tahini Brownies 🤎",
        description: "Rich, fudgy brownies with tahini and chocolate chips",
        image: "https://images.unsplash.com/photo-1606313564200-e75d5e30476c?w=400&h=300&fit=crop&auto=format", // TEMP PLACEHOLDER - chocolate brownies
        category: "desserts",
        diet: ["gluten-free", "protein"],
        cookTime: 25,
        servings: 9,
        difficulty: "easy",
        ingredients: ["cacao powder", "almond meal", "baking powder", "protein powder", "tahini", "maple syrup", "eggs", "chocolate chips"],
        videoUrl: "https://www.instagram.com/reel/DKZIe69TjjR/"
    },
    {
        id: 5,
        title: "Pistachio Crunch Balls 💚",
        description: "Protein-packed energy balls with pistachios and dark chocolate coating",
        image: "https://images.unsplash.com/photo-1558961363-fa8fdf82db35?w=400&h=300&fit=crop&auto=format", // TEMP PLACEHOLDER - pistachio energy balls
        category: "snacks",
        diet: ["vegan", "protein"],
        cookTime: 25,
        servings: 15,
        difficulty: "easy",
        ingredients: ["medjool dates", "pistachios", "seeds", "chia seeds", "cacao powder", "vanilla protein powder", "almond meal", "tahini", "dark chocolate"],
        videoUrl: "https://www.instagram.com/reel/DKJyzt0zVD/"
    },
    {
        id: 6,
        title: "Gut Loving Chia Seed Pudding 🫐",
        description: "Creamy chia pudding with vanilla protein and fresh toppings",
        image: "https://images.unsplash.com/photo-1511690743698-d9d85f2fbf38?w=400&h=300&fit=crop&auto=format", // TEMP PLACEHOLDER - chia pudding with berries
        category: "breakfast",
        diet: ["vegan", "gluten-free", "protein"],
        cookTime: 65,
        servings: 2,
        difficulty: "easy",
        ingredients: ["chia seeds", "vanilla protein powder", "cinnamon", "coconut yogurt", "almond milk", "maple syrup", "shredded coconut"],
        videoUrl: "https://www.instagram.com/reel/DJyWDHxzjJU/"
    },
    {
        id: 7,
        title: "Sunday Morning Pancakes 🥞",
        description: "Fluffy buckwheat pancakes with cacao and banana",
        image: "https://images.unsplash.com/photo-1506084868230-bb9d95c24759?w=400&h=300&fit=crop&auto=format", // TEMP PLACEHOLDER - fluffy pancakes
        category: "breakfast",
        diet: ["gluten-free", "vegan"],
        cookTime: 20,
        servings: 4,
        difficulty: "easy",
        ingredients: ["buckwheat flour", "cacao powder", "baking powder", "cinnamon", "banana", "maple syrup", "plant milk"],
        videoUrl: "https://www.instagram.com/reel/DIYJmzizqSA/"
    },
    {
        id: 8,
        title: "Crispy Jasmine Rice Salad 🍚",
        description: "Asian-inspired salad with crispy rice and fresh vegetables",
        image: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=400&h=300&fit=crop&auto=format", // TEMP PLACEHOLDER - colorful rice salad
        category: "lunch",
        diet: ["vegan", "gluten-free"],
        cookTime: 45,
        servings: 4,
        difficulty: "medium",
        ingredients: ["jasmine rice", "carrots", "cucumber", "red cabbage", "spring onions", "coriander", "mint", "peanuts", "chili", "sesame seeds", "lime", "soy sauce", "honey", "sesame oil", "ginger", "garlic"],
        videoUrl: "https://www.instagram.com/reel/DI_KZIdTsar/"
    }
];

// State Management
let currentRecipes = [...recipeDatabase];
let currentFilters = {
    search: '',
    category: 'all',
    diet: 'all',
    time: 'all'
};
let currentView = 'grid';
let recipesPerPage = 8;
let currentPage = 1;

// DOM Elements
const searchInput = document.getElementById('recipe-search');
const categoryFilter = document.getElementById('category-filter');
const dietFilter = document.getElementById('diet-filter');
const timeFilter = document.getElementById('time-filter');
const clearFiltersBtn = document.querySelector('.clear-filters-btn');
const recipeGrid = document.getElementById('recipe-grid');
const resultsNumber = document.getElementById('results-number');
const viewButtons = document.querySelectorAll('.view-btn');
const loadMoreBtn = document.getElementById('load-more-btn');
const noResults = document.getElementById('no-results');
const categoryCards = document.querySelectorAll('.category-card');

// Initialize page
document.addEventListener('DOMContentLoaded', function() {
    initializeRecipePage();
    setupEventListeners();
    renderRecipes();
    animateHeroStats();
});

function initializeRecipePage() {
    // Set initial view
    recipeGrid.classList.add('grid-view');
    
    // Initialize filters
    updateResultsCount();
    
    // Setup intersection observer for animations
    setupScrollAnimations();
    
    // Setup lazy loading for recipe images
    setupLazyLoading();
}

function setupEventListeners() {
    // Search functionality
    searchInput.addEventListener('input', window.NourishedBite.debounce(handleSearch, 300));
    
    // Filter functionality
    categoryFilter.addEventListener('change', handleCategoryFilter);
    dietFilter.addEventListener('change', handleDietFilter);
    timeFilter.addEventListener('change', handleTimeFilter);
    clearFiltersBtn.addEventListener('click', clearAllFilters);
    
    // View toggle
    viewButtons.forEach(btn => {
        btn.addEventListener('click', handleViewToggle);
    });
    
    // Load more
    loadMoreBtn.addEventListener('click', loadMoreRecipes);
    
    // Category cards
    categoryCards.forEach(card => {
        card.addEventListener('click', handleCategoryCardClick);
    });
    
    // Recipe card interactions
    document.addEventListener('click', handleRecipeCardClick);
    
    // Featured recipe buttons
    const featuredPrintBtn = document.querySelector('.featured-recipe-section .print-btn');
    const featuredViewBtn = document.querySelector('.featured-recipe-section .view-recipe-btn');
    
    if (featuredPrintBtn) {
        featuredPrintBtn.addEventListener('click', function() {
            // Get the featured recipe (first recipe in database)
            const featuredRecipe = recipeDatabase.find(r => r.featured === true) || recipeDatabase[0];
            printRecipe(featuredRecipe);
        });
    }
    
    if (featuredViewBtn) {
        featuredViewBtn.addEventListener('click', function() {
            // Get the featured recipe (first recipe in database)
            const featuredRecipe = recipeDatabase.find(r => r.featured === true) || recipeDatabase[0];
            showRecipeDetails(featuredRecipe);
        });
    }
    
    // Modal event listeners
    const modal = document.getElementById('recipe-modal');
    const modalClose = document.querySelector('.modal-close');
    const modalOverlay = document.querySelector('.modal-overlay');
    
    if (modalClose) {
        modalClose.addEventListener('click', closeRecipeModal);
    }
    
    if (modalOverlay) {
        modalOverlay.addEventListener('click', closeRecipeModal);
    }
    
    // Close modal on Escape key
    document.addEventListener('keydown', function(event) {
        if (event.key === 'Escape' && modal && modal.classList.contains('active')) {
            closeRecipeModal();
        }
    });
    
    // Keyboard navigation
    document.addEventListener('keydown', handleKeyboardNavigation);
}

function handleSearch(event) {
    currentFilters.search = event.target.value.toLowerCase();
    currentPage = 1;
    filterAndRenderRecipes();
    
    // Track search
    if (window.NourishedBite && window.NourishedBite.trackEvent) {
        window.NourishedBite.trackEvent('recipe_search', {
            query: currentFilters.search
        });
    }
}

function handleCategoryFilter(event) {
    currentFilters.category = event.target.value;
    currentPage = 1;
    filterAndRenderRecipes();
    
    // Update URL hash
    if (currentFilters.category !== 'all') {
        window.location.hash = currentFilters.category;
    } else {
        window.location.hash = '';
    }
}

function handleDietFilter(event) {
    currentFilters.diet = event.target.value;
    currentPage = 1;
    filterAndRenderRecipes();
}

function handleTimeFilter(event) {
    currentFilters.time = event.target.value;
    currentPage = 1;
    filterAndRenderRecipes();
}

function clearAllFilters() {
    // Reset all filters
    currentFilters = {
        search: '',
        category: 'all',
        diet: 'all',
        time: 'all'
    };
    
    // Reset form elements
    searchInput.value = '';
    categoryFilter.value = 'all';
    dietFilter.value = 'all';
    timeFilter.value = 'all';
    
    // Reset page
    currentPage = 1;
    
    // Clear URL hash
    window.location.hash = '';
    
    // Re-render
    filterAndRenderRecipes();
    
    // Add ripple effect
    window.NourishedBite.addRippleEffect(clearFiltersBtn, event);
}

function handleViewToggle(event) {
    const viewType = event.currentTarget.dataset.view;
    
    // Update active state
    viewButtons.forEach(btn => btn.classList.remove('active'));
    event.currentTarget.classList.add('active');
    
    // Update view
    currentView = viewType;
    recipeGrid.className = `recipe-grid ${viewType}-view`;
    
    // Track view change
    if (window.NourishedBite && window.NourishedBite.trackEvent) {
        window.NourishedBite.trackEvent('view_toggle', {
            view: viewType
        });
    }
}

function handleCategoryCardClick(event) {
    event.preventDefault();
    const category = event.currentTarget.dataset.category;
    
    // Update filter
    categoryFilter.value = category;
    currentFilters.category = category;
    currentPage = 1;
    
    // Scroll to recipes section
    document.querySelector('.recipe-grid-section').scrollIntoView({
        behavior: 'smooth'
    });
    
    // Filter and render
    filterAndRenderRecipes();
    
    // Add ripple effect
    window.NourishedBite.addRippleEffect(event.currentTarget, event);
}

function handleRecipeCardClick(event) {
    const recipeCard = event.target.closest('.recipe-card');
    if (!recipeCard) return;
    
    const recipeId = parseInt(recipeCard.dataset.recipeId);
    const recipe = recipeDatabase.find(r => r.id === recipeId);
    
    if (event.target.closest('.favorite-btn')) {
        toggleFavorite(recipeId, event.target.closest('.favorite-btn'));
        return;
    }
    
    if (event.target.closest('.print-btn')) {
        printRecipe(recipe);
        return;
    }
    
    if (event.target.closest('.video-btn')) {
        openRecipeVideo(recipe.videoUrl);
        return;
    }
    
    // Default: show recipe details
    showRecipeDetails(recipe);
}

function filterAndRenderRecipes() {
    // Apply filters
    currentRecipes = recipeDatabase.filter(recipe => {
        // Search filter
        if (currentFilters.search) {
            const searchTerm = currentFilters.search;
            const searchableText = (
                recipe.title + ' ' +
                recipe.description + ' ' +
                recipe.ingredients.join(' ')
            ).toLowerCase();
            
            if (!searchableText.includes(searchTerm)) {
                return false;
            }
        }
        
        // Category filter
        if (currentFilters.category !== 'all' && recipe.category !== currentFilters.category) {
            return false;
        }
        
        // Diet filter
        if (currentFilters.diet !== 'all' && !recipe.diet.includes(currentFilters.diet)) {
            return false;
        }
        
        // Time filter
        if (currentFilters.time !== 'all') {
            if (currentFilters.time === 'quick' && recipe.cookTime >= 30) return false;
            if (currentFilters.time === 'medium' && (recipe.cookTime < 30 || recipe.cookTime > 60)) return false;
            if (currentFilters.time === 'long' && recipe.cookTime <= 60) return false;
        }
        
        return true;
    });
    
    // Update results count
    updateResultsCount();
    
    // Render recipes
    renderRecipes();
}

function renderRecipes() {
    const startIndex = 0;
    const endIndex = currentPage * recipesPerPage;
    const recipesToShow = currentRecipes.slice(startIndex, endIndex);
    
    if (recipesToShow.length === 0) {
        recipeGrid.style.display = 'none';
        loadMoreBtn.style.display = 'none';
        noResults.style.display = 'block';
        return;
    }
    
    recipeGrid.style.display = 'grid';
    noResults.style.display = 'none';
    
    // Clear existing recipes
    recipeGrid.innerHTML = '';
    
    // Render recipe cards
    recipesToShow.forEach((recipe, index) => {
        const recipeCard = createRecipeCard(recipe);
        recipeGrid.appendChild(recipeCard);
        
        // Animate card appearance
        setTimeout(() => {
            recipeCard.classList.add('fade-in');
        }, index * 100);
    });
    
    // Update load more button
    if (endIndex >= currentRecipes.length) {
        loadMoreBtn.style.display = 'none';
    } else {
        loadMoreBtn.style.display = 'block';
    }
    
    // Setup lazy loading for new images
    setupLazyLoading();
}

function createRecipeCard(recipe) {
    const card = document.createElement('div');
    card.className = 'recipe-card';
    card.dataset.recipeId = recipe.id;
    card.setAttribute('tabindex', '0');
    card.setAttribute('role', 'button');
    card.setAttribute('aria-label', `View recipe for ${recipe.title}`);
    
    const badges = recipe.diet.map(diet => 
        `<span class="badge ${diet}">${diet.charAt(0).toUpperCase() + diet.slice(1)}</span>`
    ).join('');
    
    card.innerHTML = `
        <div class="recipe-image">
            <img src="${recipe.image}" alt="${recipe.title}" loading="lazy">
            <div class="recipe-badges">
                ${badges}
            </div>
            <button class="favorite-btn" aria-label="Add to favorites">
                <i class="far fa-heart" aria-hidden="true"></i>
            </button>
        </div>
        <div class="recipe-card-content">
            <h3 class="recipe-title">${recipe.title}</h3>
            <p class="recipe-description">${recipe.description}</p>
            <div class="recipe-meta">
                <div class="meta-item">
                    <i class="fas fa-clock" aria-hidden="true"></i>
                    <span>${recipe.cookTime} minutes</span>
                </div>
                <div class="meta-item">
                    <i class="fas fa-users" aria-hidden="true"></i>
                    <span>${recipe.servings} servings</span>
                </div>
                <div class="meta-item">
                    <i class="fas fa-signal" aria-hidden="true"></i>
                    <span>${recipe.difficulty}</span>
                </div>
            </div>
            <div class="recipe-actions">
                <button class="btn btn-primary view-recipe-btn">View Recipe</button>
                <div class="action-buttons">
                    <button class="btn btn-secondary print-btn" aria-label="Print recipe">
                        <i class="fas fa-print" aria-hidden="true"></i>
                    </button>
                    <button class="btn btn-secondary video-btn" aria-label="Watch recipe video">
                        <i class="fas fa-play" aria-hidden="true"></i>
                    </button>
                </div>
            </div>
        </div>
    `;
    
    return card;
}

function loadMoreRecipes() {
    currentPage++;
    renderRecipes();
    
    // Add loading animation
    loadMoreBtn.classList.add('loading');
    setTimeout(() => {
        loadMoreBtn.classList.remove('loading');
    }, 500);
    
    // Track load more
    if (window.NourishedBite && window.NourishedBite.trackEvent) {
        window.NourishedBite.trackEvent('load_more_recipes', {
            page: currentPage
        });
    }
}

function updateResultsCount() {
    resultsNumber.textContent = currentRecipes.length;
}

function toggleFavorite(recipeId, button) {
    const icon = button.querySelector('i');
    const isFavorited = icon.classList.contains('fas');
    
    if (isFavorited) {
        icon.classList.remove('fas');
        icon.classList.add('far');
        removeFavorite(recipeId);
    } else {
        icon.classList.remove('far');
        icon.classList.add('fas');
        addFavorite(recipeId);
    }
    
    // Add animation
    button.style.transform = 'scale(1.2)';
    setTimeout(() => {
        button.style.transform = 'scale(1)';
    }, 200);
}

function addFavorite(recipeId) {
    let favorites = JSON.parse(localStorage.getItem('recipe-favorites') || '[]');
    if (!favorites.includes(recipeId)) {
        favorites.push(recipeId);
        localStorage.setItem('recipe-favorites', JSON.stringify(favorites));
    }
    
    // Track favorite
    if (window.NourishedBite && window.NourishedBite.trackEvent) {
        window.NourishedBite.trackEvent('recipe_favorited', {
            recipe_id: recipeId
        });
    }
}

function removeFavorite(recipeId) {
    let favorites = JSON.parse(localStorage.getItem('recipe-favorites') || '[]');
    favorites = favorites.filter(id => id !== recipeId);
    localStorage.setItem('recipe-favorites', JSON.stringify(favorites));
}

// Complete recipe details database from instruction file
const completeRecipeDetails = {
    1: { // Milky Way Slice
        ingredients: {
            base: ['1 cup almond meal', '1 tbsp desiccated coconut', 'pinch salt', '2 tbsp melted coconut butter', '1 tbsp + 1 tsp maple syrup'],
            caramel: ['6 medjool dates (pitted)', '½ cup coconut yoghurt', '¼ tsp vanilla essence', '2 tbsp water', 'pinch salt'],
            crunch: ['Diced roasted almonds', 'hemp seeds'],
            chocolate: ['1 block dark chocolate']
        },
        method: 'Line tin, mix base ingredients and press, blend caramel and pour, add crunch, freeze, melt chocolate and coat, freeze until set'
    },
    2: { // Salted Caramel Banana Truffles
        ingredients: {
            main: ['1 ripe banana', '1 tbsp honey', '1 tbsp almond butter', '1 cup almond meal', '2 tbsp salted caramel protein', '1 tbsp hemp seeds', 'dash cinnamon', 'splash almond milk', 'chocolate chips'],
            toppings: ['1 block dark chocolate (melted)', 'cacao nibs']
        },
        method: 'Mix dry ingredients, add wet ingredients to form dough, fold in chocolate chips, roll into balls, freeze, coat in melted chocolate, sprinkle cacao nibs, freeze to set'
    },
    3: { // Chocolate, Kiwi, Honey & Yoghurt Clusters
        ingredients: {
            main: ['2 golden kiwis diced', '1 cup coconut yoghurt', '1-2 tsp honey'],
            toppings: ['Chia seeds', 'dark chocolate melted']
        },
        method: 'Mix kiwi, yoghurt, honey, spoon clusters onto parchment tray, sprinkle chia seeds, freeze until firm, coat with chocolate, freeze to harden'
    },
    4: { // Fudgy Tahini Brownies
        ingredients: {
            main: ['1/2 cup cacao powder', '1/4 cup almond meal', '1/2 tsp baking powder', '1 tbsp protein powder (optional)', '1/3 cup runny tahini', '1/4 cup maple syrup', 'splash milk', '2 eggs', 'pinch salt', 'chocolate chips']
        },
        method: 'Preheat 180°C, combine all ingredients except chips, fold in chocolate, bake 15-20 minutes'
    },
    5: { // Pistachio Crunch Balls
        ingredients: {
            main: ['10 medjool dates (soaked)', '½ cup mixed pistachios & seeds', '1 tbsp chia seeds', '⅓ cup cacao powder', '1-2 tbsp vanilla protein powder', 'sprinkle almond meal', 'pinch salt', '½ cup runny tahini', 'splash milk'],
            toppings: ['Dark chocolate melted', 'crushed pistachios']
        },
        method: 'Blend all ingredients, roll into balls, coat in chocolate, top with pistachios, freeze to firm'
    },
    6: { // Gut Loving Chia Seed Pudding
        ingredients: {
            main: ['1/4 cup chia seeds', '1 heaping tbsp vanilla protein powder', 'cinnamon to taste', '1/4 cup coconut yogurt', '1 cup almond/coconut milk', 'dash maple syrup', 'shredded coconut (optional)']
        },
        method: 'Mix all ingredients, refrigerate minimum 1 hour, top with fruits, granola, nut butter'
    },
    7: { // Sunday Morning Pancakes
        ingredients: {
            main: ['1 cup buckwheat flour', '1/4 cup cacao powder', '1 tsp baking powder', 'dash cinnamon', '1 ripe banana', '1-2 tbsp maple syrup', '1 cup milk of choice']
        },
        method: 'Blend all ingredients, cook on hot pan, top with berries, coconut yoghurt, nut butter, maple syrup'
    },
    8: { // Crispy Jasmine Rice Salad
        ingredients: {
            crispyRice: ['2 cups organic white jasmine rice', '3 cups water', '1 tsp salt', 'EVOO for baking'],
            salad: ['1 cup shredded carrots', '½ cup cucumber sliced', '½ cup red cabbage shredded', '¼ cup spring onions chopped', '¼ cup fresh coriander chopped', '¼ cup fresh mint shredded', '¼ cup crushed roasted peanuts', '1 red chili sliced', '1 tbsp sesame seeds'],
            dressing: ['3 tbsp lime juice', '2 tbsp soy sauce', '1 tbsp honey', '1 tbsp sesame oil', '1 tsp grated ginger', '1 garlic clove minced']
        },
        method: 'Cook rice, spread on baking sheet with oil, bake 180°C for 25-30 minutes until crispy, whisk dressing, toss salad ingredients with crispy rice, drizzle dressing, top with sesame seeds and peanuts'
    }
};

function printRecipe(recipe) {
    // Get complete recipe details
    const recipeKey = recipe.id;
    const completeDetails = completeRecipeDetails[recipeKey];
    
    // Create print-friendly version
    const printWindow = window.open('', '_blank');
    
    let ingredientsHtml = '';
    let methodHtml = '';
    
    if (completeDetails) {
        // Format ingredients by sections
        Object.keys(completeDetails.ingredients).forEach(section => {
            if (section !== 'main') {
                ingredientsHtml += `<h4 style="color: #A68B5B; margin: 15px 0 5px 0; text-transform: capitalize;">${section}:</h4>`;
            }
            ingredientsHtml += '<ul style="margin: 5px 0 15px 20px;">';
            completeDetails.ingredients[section].forEach(ingredient => {
                ingredientsHtml += `<li style="margin: 3px 0;">${ingredient}</li>`;
            });
            ingredientsHtml += '</ul>';
        });
        
        methodHtml = `<p style="line-height: 1.6; margin: 10px 0;">${completeDetails.method}</p>`;
    } else {
        // Fallback to basic ingredients
        ingredientsHtml = '<ul style="margin: 5px 0 15px 20px;">';
        recipe.ingredients.forEach(ingredient => {
            ingredientsHtml += `<li style="margin: 3px 0;">${ingredient}</li>`;
        });
        ingredientsHtml += '</ul>';
        methodHtml = '<p style="line-height: 1.6; margin: 10px 0;">For detailed instructions, please visit: <strong>thenourishedbite.com</strong></p>';
    }
    
    const printContent = `
        <!DOCTYPE html>
        <html>
        <head>
            <title>${recipe.title} - The Nourished Bite</title>
            <style>
                @page { margin: 20mm; }
                body { 
                    font-family: 'Georgia', serif; 
                    margin: 0; 
                    padding: 20px;
                    color: #333;
                    line-height: 1.5;
                }
                .recipe-header { 
                    border-bottom: 3px solid #C19A6B; 
                    padding-bottom: 15px; 
                    margin-bottom: 25px; 
                    text-align: center;
                }
                .recipe-title { 
                    color: #8B4513; 
                    margin: 0 0 10px 0;
                    font-size: 28px;
                    font-weight: bold;
                }
                .recipe-description {
                    font-style: italic;
                    color: #666;
                    margin: 10px 0;
                    font-size: 16px;
                }
                .recipe-meta { 
                    display: flex; 
                    justify-content: center;
                    gap: 30px; 
                    margin: 15px 0;
                    flex-wrap: wrap;
                }
                .meta-item {
                    background: #F7F3F0;
                    padding: 8px 15px;
                    border-radius: 20px;
                    border: 1px solid #E8DDD4;
                }
                .ingredients, .instructions { 
                    margin: 25px 0; 
                    page-break-inside: avoid;
                }
                .ingredients h3, .instructions h3 { 
                    color: #8B4513; 
                    font-size: 20px;
                    margin-bottom: 15px;
                    border-bottom: 1px solid #E8DDD4;
                    padding-bottom: 5px;
                }
                .footer {
                    margin-top: 30px;
                    text-align: center;
                    font-style: italic;
                    color: #666;
                    border-top: 1px solid #E8DDD4;
                    padding-top: 15px;
                }
                .video-link {
                    background: #F7F3F0;
                    padding: 10px;
                    border-radius: 5px;
                    margin: 15px 0;
                    border-left: 4px solid #C19A6B;
                }
                @media print {
                    body { font-size: 12pt; }
                    .recipe-title { font-size: 18pt; }
                    .ingredients h3, .instructions h3 { font-size: 14pt; }
                }
            </style>
        </head>
        <body>
            <div class="recipe-header">
                <h1 class="recipe-title">${recipe.title}</h1>
                <p class="recipe-description">${recipe.description}</p>
                <div class="recipe-meta">
                    <div class="meta-item"><strong>Cook Time:</strong> ${recipe.cookTime} minutes</div>
                    <div class="meta-item"><strong>Servings:</strong> ${recipe.servings}</div>
                    <div class="meta-item"><strong>Difficulty:</strong> ${recipe.difficulty}</div>
                    <div class="meta-item"><strong>Diet:</strong> ${recipe.diet}</div>
                </div>
            </div>
            <div class="ingredients">
                <h3>🥄 Ingredients</h3>
                ${ingredientsHtml}
            </div>
            <div class="instructions">
                <h3>👩‍🍳 Method</h3>
                ${methodHtml}
            </div>
            ${recipe.videoUrl ? `<div class="video-link">
                <strong>📹 Watch Recipe Video:</strong><br>
                <span style="font-size: 12px;">${recipe.videoUrl}</span>
            </div>` : ''}
            <div class="footer">
                <p><strong>The Nourished Bite</strong> by Tamika Datson</p>
                <p style="font-size: 12px; margin-top: 10px;">For more healthy recipes visit: thenourishedbite.com</p>
            </div>
            <script>
                // Auto-print when page loads
                window.addEventListener('load', function() {
                    setTimeout(function() {
                        window.print();
                    }, 500);
                });
                
                // Close window after print dialog is handled
                window.addEventListener('afterprint', function() {
                    window.close();
                });
                
                // Handle print cancellation - close window after a short delay
                window.addEventListener('beforeprint', function() {
                    setTimeout(function() {
                        if (!window.closed) {
                            window.close();
                        }
                    }, 1000);
                });
            </script>
        </body>
        </html>
    `;
    
    printWindow.document.write(printContent);
    printWindow.document.close();
    
    // The print functionality is handled by the script inside the print window
    
    // Track print
    if (window.NourishedBite && window.NourishedBite.trackEvent) {
        window.NourishedBite.trackEvent('recipe_printed', {
            recipe_id: recipe.id
        });
    }
}

function openRecipeVideo(videoUrl) {
    window.open(videoUrl, '_blank', 'noopener,noreferrer');
    
    // Track video view
    if (window.NourishedBite && window.NourishedBite.trackEvent) {
        window.NourishedBite.trackEvent('recipe_video_viewed', {
            video_url: videoUrl
        });
    }
}

function showRecipeDetails(recipe) {
    const modal = document.getElementById('recipe-modal');
    const recipeDetails = completeRecipeDetails[recipe.id];
    
    // Populate modal with recipe data
    document.getElementById('modal-recipe-title').textContent = recipe.title;
    document.getElementById('modal-recipe-image').src = recipe.image;
    document.getElementById('modal-recipe-image').alt = recipe.title;
    document.getElementById('modal-cook-time').textContent = `${recipe.cookTime} min`;
    document.getElementById('modal-servings').textContent = `${recipe.servings} servings`;
    document.getElementById('modal-difficulty').textContent = recipe.difficulty;
    document.getElementById('modal-recipe-description').textContent = recipe.description;
    
    // Clear badges container (dietary tags removed)
    const badgesContainer = document.getElementById('modal-recipe-badges');
    badgesContainer.innerHTML = '';
    
    // Populate ingredients
    const ingredientsContainer = document.getElementById('modal-ingredients');
    ingredientsContainer.innerHTML = '';
    
    if (recipeDetails && recipeDetails.ingredients) {
        Object.entries(recipeDetails.ingredients).forEach(([groupName, ingredients]) => {
            const groupDiv = document.createElement('div');
            groupDiv.className = 'ingredient-group';
            
            const groupTitle = document.createElement('h4');
            groupTitle.textContent = groupName;
            groupDiv.appendChild(groupTitle);
            
            const ingredientsList = document.createElement('ul');
            ingredients.forEach(ingredient => {
                const li = document.createElement('li');
                li.textContent = ingredient;
                ingredientsList.appendChild(li);
            });
            
            groupDiv.appendChild(ingredientsList);
            ingredientsContainer.appendChild(groupDiv);
        });
    } else {
        // Fallback to basic ingredients list
        const groupDiv = document.createElement('div');
        groupDiv.className = 'ingredient-group';
        
        const groupTitle = document.createElement('h4');
        groupTitle.textContent = 'Ingredients';
        groupDiv.appendChild(groupTitle);
        
        const ingredientsList = document.createElement('ul');
        recipe.ingredients.forEach(ingredient => {
            const li = document.createElement('li');
            li.textContent = ingredient;
            ingredientsList.appendChild(li);
        });
        
        groupDiv.appendChild(ingredientsList);
        ingredientsContainer.appendChild(groupDiv);
    }
    
    // Populate method
    const methodText = recipeDetails && recipeDetails.method ? recipeDetails.method : 'Method details coming soon!';
    document.getElementById('modal-method').textContent = methodText;
    
    // Set up action buttons
    const printBtn = modal.querySelector('.print-recipe-btn');
    const videoBtn = modal.querySelector('.watch-video-btn');
    const favoriteBtn = modal.querySelector('.favorite-recipe-btn');
    
    // Remove existing event listeners
    printBtn.replaceWith(printBtn.cloneNode(true));
    videoBtn.replaceWith(videoBtn.cloneNode(true));
    favoriteBtn.replaceWith(favoriteBtn.cloneNode(true));
    
    // Get new references
    const newPrintBtn = modal.querySelector('.print-recipe-btn');
    const newVideoBtn = modal.querySelector('.watch-video-btn');
    const newFavoriteBtn = modal.querySelector('.favorite-recipe-btn');
    
    // Add event listeners
    newPrintBtn.addEventListener('click', () => printRecipe(recipe));
    newVideoBtn.addEventListener('click', () => openRecipeVideo(recipe.videoUrl));
    newFavoriteBtn.addEventListener('click', () => {
        toggleFavorite(recipe.id, newFavoriteBtn);
    });
    
    // Update favorite button state
    updateFavoriteButtonState(newFavoriteBtn, recipe.id);
    
    // Show modal
    modal.classList.add('active');
    modal.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
    
    // Track recipe view
    if (window.NourishedBite && window.NourishedBite.trackEvent) {
        window.NourishedBite.trackEvent('recipe_viewed', {
            recipe_id: recipe.id,
            recipe_title: recipe.title
        });
    }
}

function closeRecipeModal() {
    const modal = document.getElementById('recipe-modal');
    modal.classList.remove('active');
    modal.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
}

function updateFavoriteButtonState(button, recipeId) {
    const favorites = JSON.parse(localStorage.getItem('favoriteRecipes') || '[]');
    const isFavorite = favorites.includes(recipeId);
    
    const icon = button.querySelector('i');
    if (isFavorite) {
        icon.className = 'fas fa-heart';
        button.innerHTML = '<i class="fas fa-heart"></i> Remove from Favorites';
    } else {
        icon.className = 'far fa-heart';
        button.innerHTML = '<i class="far fa-heart"></i> Add to Favorites';
    }
}

function animateHeroStats() {
    const statNumbers = document.querySelectorAll('.stat-number');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const target = entry.target;
                const finalValue = target.textContent;
                
                if (finalValue.includes('+')) {
                    const number = parseInt(finalValue);
                    animateNumber(target, 0, number, 2000, '+');
                } else if (finalValue.includes('min')) {
                    const number = parseInt(finalValue);
                    animateNumber(target, 0, number, 1500, 'min');
                } else {
                    const number = parseInt(finalValue);
                    animateNumber(target, 0, number, 1000);
                }
                
                observer.unobserve(target);
            }
        });
    }, { threshold: 0.5 });
    
    statNumbers.forEach(stat => observer.observe(stat));
}

function animateNumber(element, start, end, duration, suffix = '') {
    const startTime = performance.now();
    
    function update(currentTime) {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);
        
        const current = Math.floor(start + (end - start) * easeOutCubic(progress));
        element.textContent = current + suffix;
        
        if (progress < 1) {
            requestAnimationFrame(update);
        }
    }
    
    requestAnimationFrame(update);
}

function easeOutCubic(t) {
    return 1 - Math.pow(1 - t, 3);
}

function setupScrollAnimations() {
    const animatedElements = document.querySelectorAll('.recipe-card, .category-card, .featured-recipe-card');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in');
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });
    
    animatedElements.forEach(el => observer.observe(el));
}

function setupLazyLoading() {
    const images = document.querySelectorAll('img[loading="lazy"]');
    
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.src; // Trigger loading
                    img.classList.add('loaded');
                    imageObserver.unobserve(img);
                }
            });
        });
        
        images.forEach(img => imageObserver.observe(img));
    }
}

function handleKeyboardNavigation(event) {
    if (event.key === 'Enter' || event.key === ' ') {
        const target = event.target;
        
        if (target.classList.contains('recipe-card')) {
            event.preventDefault();
            target.click();
        }
        
        if (target.classList.contains('category-card')) {
            event.preventDefault();
            target.click();
        }
    }
}

// Initialize favorites on page load
function initializeFavorites() {
    const favorites = JSON.parse(localStorage.getItem('recipe-favorites') || '[]');
    
    favorites.forEach(recipeId => {
        const recipeCard = document.querySelector(`[data-recipe-id="${recipeId}"]`);
        if (recipeCard) {
            const favoriteBtn = recipeCard.querySelector('.favorite-btn i');
            if (favoriteBtn) {
                favoriteBtn.classList.remove('far');
                favoriteBtn.classList.add('fas');
            }
        }
    });
}

// URL hash handling
function handleUrlHash() {
    const hash = window.location.hash.substring(1);
    if (hash && ['breakfast', 'lunch', 'dinner', 'snacks', 'desserts'].includes(hash)) {
        categoryFilter.value = hash;
        currentFilters.category = hash;
        filterAndRenderRecipes();
    }
}

// Handle hash changes
window.addEventListener('hashchange', handleUrlHash);

// Initialize hash on load
document.addEventListener('DOMContentLoaded', handleUrlHash);

// Export functions for global access
if (window.NourishedBite) {
    window.NourishedBite.recipes = {
        clearAllFilters,
        filterRecipes: filterAndRenderRecipes,
        searchRecipes: handleSearch,
        toggleFavorite,
        printRecipe,
        recipeDatabase
    };
}

// Performance monitoring
if (window.NourishedBite && window.NourishedBite.performanceMonitor) {
    window.NourishedBite.performanceMonitor.mark('recipes-js-loaded');
}

// Error handling
window.addEventListener('error', function(event) {
    console.error('Recipe page error:', event.error);
    
    // Show user-friendly error message
    if (event.error.message.includes('recipe')) {
        const errorMessage = document.createElement('div');
        errorMessage.className = 'error-message';
        errorMessage.innerHTML = `
            <p>We're having trouble loading some recipes. Please try refreshing the page.</p>
            <button onclick="location.reload()" class="btn btn-primary">Refresh Page</button>
        `;
        
        const container = document.querySelector('.recipe-grid-section .container');
        if (container) {
            container.insertBefore(errorMessage, container.firstChild);
        }
    }
});

// Initialize favorites after DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    setTimeout(initializeFavorites, 100);
});