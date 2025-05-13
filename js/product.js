// DOM Elements
const mainImage = document.getElementById('main-product-image');
const thumbnails = document.querySelectorAll('.thumbnail');
const sizeOptions = document.querySelectorAll('.size-option');
const colorOptions = document.querySelectorAll('.color-option');
const quantityInput = document.getElementById('quantity-input');
const quantityBtns = document.querySelectorAll('.quantity-btn');
const addToCartBtn = document.querySelector('.add-to-cart-btn');
const buyNowBtn = document.querySelector('.buy-now-btn');

// Sample product data (to be replaced with actual data)
const productData = {
    id: 1,
    name: 'Pro Runner Shoes',
    category: 'Sports Shoes',
    currentPrice: 129.99,
    originalPrice: 159.99,
    description: 'Professional grade running shoes designed for maximum comfort and performance. Features advanced cushioning technology and breathable mesh upper.',
    features: [
        'Breathable mesh upper',
        'Advanced cushioning system',
        'Durable rubber outsole',
        'Reflective details for visibility',
        'Anatomical lacing system'
    ],
    images: [
        'main1.jpg',
        'main2.jpg',
        'main3.jpg',
        'main4.jpg',
    ],
    variants: {
        sizes: ['7', '8', '9', '10', '11'],
        colors: ['Black', 'White', 'Red', 'Blue']
    }
};

// Related products data
const relatedProducts = [
    {
        id: 2,
        name: 'Court Master Basketball Shoes',
        price: 149.99,
        image: 'court-master-shoes.jpg'
    },
    {
        id: 3,
        name: 'Elite Track Suit',
        price: 89.99,
        image: 'elite-track-suit.jpg'
    },
    {
        id: 4,
        name: 'Pro Team Jersey',
        price: 59.99,
        image: 'team-jersey.jpg'
    }
];

// Initialize product page
function initializeProduct() {
    // Set product details
    document.getElementById('product-title').textContent = productData.name;
    document.getElementById('product-category').textContent = productData.category;
    document.getElementById('product-name').textContent = productData.name;
    document.querySelector('.current-price').textContent = `$${productData.currentPrice}`;
    document.querySelector('.original-price').textContent = `$${productData.originalPrice}`;
    document.getElementById('product-description-text').textContent = productData.description;

    // Set features
    const featuresList = document.getElementById('product-features-list');
    featuresList.innerHTML = productData.features
        .map(feature => `<li>${feature}</li>`)
        .join('');

    // Initialize related products
    displayRelatedProducts();
}

// Image Gallery
thumbnails.forEach((thumbnail, index) => {
    thumbnail.addEventListener('click', () => {
        // Update main image
        mainImage.src = thumbnail.src;
        
        // Update active thumbnail
        thumbnails.forEach(thumb => thumb.classList.remove('active'));
        thumbnail.classList.add('active');
    });
});

// Size Selection
sizeOptions.forEach(option => {
    option.addEventListener('click', () => {
        sizeOptions.forEach(opt => opt.classList.remove('active'));
        option.classList.add('active');
    });
});

// Color Selection
colorOptions.forEach(option => {
    option.addEventListener('click', () => {
        colorOptions.forEach(opt => opt.classList.remove('active'));
        option.classList.add('active');
    });
});

// Quantity Controls
quantityBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        const currentValue = parseInt(quantityInput.value);
        if (btn.classList.contains('minus')) {
            if (currentValue > 1) {
                quantityInput.value = currentValue - 1;
            }
        } else {
            if (currentValue < 10) {
                quantityInput.value = currentValue + 1;
            }
        }
    });
});

// Validate quantity input
quantityInput.addEventListener('change', () => {
    let value = parseInt(quantityInput.value);
    if (isNaN(value) || value < 1) value = 1;
    if (value > 10) value = 10;
    quantityInput.value = value;
});

// Add to Cart
function addToCart() {
    const selectedSize = document.querySelector('.size-option.active');
    const selectedColor = document.querySelector('.color-option.active');

    if (!selectedSize || !selectedColor) {
        showNotification('Please select size and color');
        return;
    }

    const product = {
        ...productData,
        quantity: parseInt(quantityInput.value),
        size: selectedSize.textContent,
        color: selectedColor.style.backgroundColor
    };

    // Get existing cart
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    
    // Add product to cart
    cart.push(product);
    
    // Save cart
    localStorage.setItem('cart', JSON.stringify(cart));
    
    // Update cart count
    updateCartCount();
    
    // Show notification
    showNotification('Product added to cart!');
}

// Buy Now
function buyNow() {
    addToCart();
    window.location.href = 'cart.html';
}

// Display Related Products
function displayRelatedProducts() {
    const relatedProductsGrid = document.querySelector('.related-products-grid');
    
    relatedProducts.forEach(product => {
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
        relatedProductsGrid.appendChild(productCard);
    });
}

// Event Listeners
addToCartBtn.addEventListener('click', addToCart);
buyNowBtn.addEventListener('click', buyNow);

// Initialize
document.addEventListener('DOMContentLoaded', initializeProduct);