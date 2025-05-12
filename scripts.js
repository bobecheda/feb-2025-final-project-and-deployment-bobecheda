// DOM Elements
const navLinks = document.querySelector('.nav-links');
const cartIcon = document.querySelector('.cart-icon');
const addToCartButtons = document.querySelectorAll('.product-card button');
const contactForm = document.querySelector('.contact-form');
const darkModeToggle = document.querySelector('.dark-mode-toggle');
const searchInput = document.getElementById('product-search');
const searchBtn = document.querySelector('.search-btn');
const productGrid = document.querySelector('.product-grid');
const productCards = document.querySelectorAll('.product-card');

// Shopping Cart State
let cartItems = [];

// Mobile Navigation Toggle
function toggleMobileNav() {
    navLinks.classList.toggle('active');
}

// Smooth Scroll Navigation
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        target.scrollIntoView({ behavior: 'smooth' });
        if (navLinks.classList.contains('active')) {
            toggleMobileNav();
        }
    });
});

// Shopping Cart Functionality
function updateCart() {
    const cartCount = cartItems.length;
    cartIcon.textContent = `🛒 ${cartCount}`;
}

addToCartButtons.forEach(button => {
    button.addEventListener('click', function() {
        const product = this.closest('.product-card');
        const productName = product.querySelector('h3').textContent;
        const productPrice = product.querySelector('p').textContent;
        
        cartItems.push({
            name: productName,
            price: productPrice
        });
        
        updateCart();
        
        // Animation feedback
        button.textContent = 'Added!';
        button.style.backgroundColor = '#4CAF50';
        setTimeout(() => {
            button.textContent = 'Add to Cart';
            button.style.backgroundColor = '';
        }, 1000);
    });
});

// Contact Form Validation
contactForm.addEventListener('submit', function(e) {
    e.preventDefault();
    
    const nameInput = this.querySelector('input[type="text"]');
    const emailInput = this.querySelector('input[type="email"]');
    const messageInput = this.querySelector('textarea');
    
    if (validateForm(nameInput, emailInput, messageInput)) {
        // Show success message
        showFormMessage('Message sent successfully!', 'success');
        this.reset();
    }
});

function validateForm(name, email, message) {
    let isValid = true;
    
    if (name.value.trim() === '') {
        showInputError(name, 'Name is required');
        isValid = false;
    }
    
    if (email.value.trim() === '') {
        showInputError(email, 'Email is required');
        isValid = false;
    } else if (!isValidEmail(email.value)) {
        showInputError(email, 'Please enter a valid email');
        isValid = false;
    }
    
    if (message.value.trim() === '') {
        showInputError(message, 'Message is required');
        isValid = false;
    }
    
    return isValid;
}

function isValidEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function showInputError(input, message) {
    const errorDiv = document.createElement('div');
    errorDiv.className = 'error-message';
    errorDiv.textContent = message;
    
    input.classList.add('error');
    input.parentElement.appendChild(errorDiv);
    
    setTimeout(() => {
        errorDiv.remove();
        input.classList.remove('error');
    }, 3000);
}

function showFormMessage(message, type) {
    const messageDiv = document.createElement('div');
    messageDiv.className = `form-message ${type}`;
    messageDiv.textContent = message;
    
    contactForm.appendChild(messageDiv);
    
    setTimeout(() => {
        messageDiv.remove();
    }, 3000);
}

// Intersection Observer for Animations
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animate');
        }
    });
});

// Observe elements for animation
document.querySelectorAll('.product-card, .category-card, .about-content').forEach(el => {
    observer.observe(el);
});

// Dark Mode Functionality
function initDarkMode() {
    const darkMode = localStorage.getItem('darkMode') === 'true';
    document.body.setAttribute('data-theme', darkMode ? 'dark' : 'light');
    darkModeToggle.textContent = darkMode ? '☀️' : '🌙';
}

darkModeToggle.addEventListener('click', () => {
    const isDark = document.body.getAttribute('data-theme') === 'dark';
    document.body.setAttribute('data-theme', isDark ? 'light' : 'dark');
    darkModeToggle.textContent = isDark ? '🌙' : '☀️';
    localStorage.setItem('darkMode', !isDark);
});

// Search Functionality
function searchProducts(query) {
    const searchTerm = query.toLowerCase();
    productCards.forEach(card => {
        const title = card.querySelector('h3').textContent.toLowerCase();
        const price = card.querySelector('p').textContent.toLowerCase();
        const isVisible = title.includes(searchTerm) || price.includes(searchTerm);
        card.style.display = isVisible ? 'block' : 'none';
    });
}

searchInput.addEventListener('input', (e) => searchProducts(e.target.value));
searchBtn.addEventListener('click', () => searchProducts(searchInput.value));

// Initialize
initDarkMode();
updateCart();