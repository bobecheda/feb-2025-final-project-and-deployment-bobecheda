// Sample products data (to be replaced with actual data)
const products = [
    // Sports Shoes
    {
        id: 1,
        name: 'Pro Runner Shoes',
        price: 129.99,
        image: 'pro-runner-shoes.jpg',
        category: 'shoes'
    },
    {
        id: 2,
        name: 'Court Master Basketball Shoes',
        price: 149.99,
        image: 'basketball-shoes.jpg',
        category: 'shoes'
    },
    // Track Suits
    {
        id: 3,
        name: 'Elite Track Suit',
        price: 89.99,
        image: 'elite-tracksuit.jpg',
        category: 'tracksuits'
    },
    {
        id: 4,
        name: 'Performance Track Suit',
        price: 79.99,
        image: 'performance-track-suit.jpg',
        category: 'tracksuits'
    },
    // Football Jerseys
    {
        id: 5,
        name: 'National Team Jersey',
        price: 69.99,
        image: 'national-team-jersey.jpg',
        category: 'football-jerseys'
    },
    // Basketball Jerseys
    {
        id: 6,
        name: 'Pro Team Basketball Jersey',
        price: 64.99,
        image: 'basketball-jersey.jpg',
        category: 'basketball-jerseys'
    },
    // Footballs
    {
        id: 7,
        name: 'Professional Match Ball',
        price: 34.99,
        image: 'football.jpg',
        category: 'footballs'
    },
    // Artificial Turfs
    {
        id: 8,
        name: 'Indoor Training Turf',
        price: 299.99,
        image: 'turf.jpg',
        category: 'turfs'
    }
];

// DOM Elements
const productsGrid = document.querySelector('.products-grid');
const filterCheckboxes = document.querySelectorAll('.filter-options input[type="checkbox"]');
const priceSlider = document.getElementById('price-slider');
const minPriceInput = document.getElementById('min-price');
const maxPriceInput = document.getElementById('max-price');
const sortSelect = document.getElementById('sort');
const applyFiltersBtn = document.querySelector('.apply-filters');

// State
let activeFilters = {
    categories: [],
    minPrice: 0,
    maxPrice: 500,
    sort: 'featured'
};

// Initialize products
function initializeProducts() {
    displayProducts(products);
    updatePriceInputs();
}

// Display products based on filters
function displayProducts(productsToShow) {
    productsGrid.innerHTML = '';
    
    productsToShow.forEach(product => {
        const productCard = document.createElement('div');
        productCard.className = 'product-card';
        productCard.innerHTML = `
            <div class="product-img">
                <img src="images/${product.image}" alt="${product.name}">
            </div>
            <div class="product-info">
                <h3>${product.name}</h3>
                <p class="price">$${product.price.toFixed(2)}</p>
                <button class="add-to-cart" data-id="${product.id}">Add to Cart</button>
            </div>
        `;
        productsGrid.appendChild(productCard);
    });
}

// Filter products
function filterProducts() {
    let filteredProducts = products.filter(product => {
        const matchesCategory = activeFilters.categories.length === 0 || 
                              activeFilters.categories.includes(product.category);
        const matchesPrice = product.price >= activeFilters.minPrice && 
                           product.price <= activeFilters.maxPrice;
        return matchesCategory && matchesPrice;
    });

    // Sort products
    switch(activeFilters.sort) {
        case 'price-low':
            filteredProducts.sort((a, b) => a.price - b.price);
            break;
        case 'price-high':
            filteredProducts.sort((a, b) => b.price - a.price);
            break;
        case 'name':
            filteredProducts.sort((a, b) => a.name.localeCompare(b.name));
            break;
        default: // 'featured'
            // Keep original order
            break;
    }

    displayProducts(filteredProducts);
}

// Update price inputs based on slider
function updatePriceInputs() {
    const value = priceSlider.value;
    maxPriceInput.value = value;
    activeFilters.maxPrice = Number(value);
}

// Event Listeners
filterCheckboxes.forEach(checkbox => {
    checkbox.addEventListener('change', () => {
        activeFilters.categories = Array.from(filterCheckboxes)
            .filter(cb => cb.checked)
            .map(cb => cb.value);
    });
});

priceSlider.addEventListener('input', updatePriceInputs);

minPriceInput.addEventListener('change', () => {
    activeFilters.minPrice = Number(minPriceInput.value) || 0;
});

maxPriceInput.addEventListener('change', () => {
    activeFilters.maxPrice = Number(maxPriceInput.value) || 500;
    priceSlider.value = activeFilters.maxPrice;
});

sortSelect.addEventListener('change', () => {
    activeFilters.sort = sortSelect.value;
});

applyFiltersBtn.addEventListener('click', filterProducts);

// Mobile filter toggle
const filterToggle = document.createElement('button');
filterToggle.className = 'filter-toggle';
filterToggle.innerHTML = 'Filters';
document.querySelector('.products-header').appendChild(filterToggle);

filterToggle.addEventListener('click', () => {
    document.querySelector('.filters').classList.toggle('active');
});

// Initialize
document.addEventListener('DOMContentLoaded', initializeProducts);