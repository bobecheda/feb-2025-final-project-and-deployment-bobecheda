// DOM Elements
const navToggle = document.querySelector('.nav-toggle');
const navLinks = document.querySelector('.nav-links');
const cartCount = document.querySelector('.cart-count');

// Sample featured products data (to be replaced with actual data)
const featuredProducts = [
    {
        id: 1,
        name: 'Pro Runner Shoes',
        price: 129.99,
        image: 'pro-runner.jpg',
        category: 'shoes'
    },
    {
        id: 2,
        name: 'Elite Track Suit',
        price: 89.99,
        image: 'elite-tracksuit.jpg',
        category: 'tracksuits'
    },
    {
        id: 3,
        name: 'Champion Jersey',
        price: 59.99,
        image: 'champion-jersey.jpg',
        category: 'jerseys'
    },
    {
        id: 4,
        name: 'Premium Football',
        price: 34.99,
        image: 'premium-football.jpg',
        category: 'equipment'
    }
];

// Navigation Toggle
navToggle.addEventListener('click', () => {
    navLinks.classList.toggle('active');
});

// Smooth Scroll
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// Populate Featured Products
function populateFeaturedProducts() {
    const productGrid = document.querySelector('.product-grid');
    if (!productGrid) return;

    featuredProducts.forEach(product => {
        const productCard = document.createElement('div');
        productCard.className = 'product-card';
        productCard.innerHTML = `
            <div class="product-img">
                <img src="images/${product.image}" alt="${product.name}">
            </div>
            <div class="product-info">
                <h3>${product.name}</h3>
                <p class="price">$${product.price}</p>
                <button class="add-to-cart" data-id="${product.id}">Add to Cart</button>
            </div>
        `;
        productGrid.appendChild(productCard);
    });
}

// Cart Functionality
let cart = JSON.parse(localStorage.getItem('cart')) || [];

function updateCartCount() {
    cartCount.textContent = cart.length;
}

function addToCart(productId) {
    const product = featuredProducts.find(p => p.id === productId);
    if (product) {
        cart.push(product);
        localStorage.setItem('cart', JSON.stringify(cart));
        updateCartCount();
        
        // Show notification
        showNotification('Product added to cart!');
    }
}

function showNotification(message) {
    const notification = document.createElement('div');
    notification.className = 'notification';
    notification.textContent = message;
    document.body.appendChild(notification);

    // Remove notification after 3 seconds
    setTimeout(() => {
        notification.remove();
    }, 3000);
}

// Event Listeners
document.addEventListener('DOMContentLoaded', () => {
    populateFeaturedProducts();
    updateCartCount();

    // Add to cart button clicks
    document.addEventListener('click', (e) => {
        if (e.target.classList.contains('add-to-cart')) {
            const productId = parseInt(e.target.dataset.id);
            addToCart(productId);
        }
    });

    // Image hover zoom effect
    document.querySelectorAll('.product-img').forEach(img => {
        img.addEventListener('mouseover', () => {
            img.style.transform = 'scale(1.1)';
        });
        img.addEventListener('mouseout', () => {
            img.style.transform = 'scale(1)';
        });
    });

    // Newsletter form submission
    const newsletterForm = document.querySelector('.newsletter-form');
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const email = newsletterForm.querySelector('input[type="email"]').value;
            // Here you would typically send this to a server
            showNotification('Thanks for subscribing!');
            newsletterForm.reset();
        });
    }
});