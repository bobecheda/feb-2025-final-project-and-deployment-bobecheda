// DOM Elements
const cartItemsList = document.getElementById('cart-items-list');
const emptyCartMessage = document.getElementById('empty-cart-message');
const subtotalElement = document.getElementById('subtotal');
const shippingElement = document.getElementById('shipping');
const discountElement = document.getElementById('discount');
const totalElement = document.getElementById('total');
const promoInput = document.getElementById('promo-input');
const applyPromoBtn = document.getElementById('apply-promo');
const checkoutBtn = document.getElementById('checkout-btn');

// Cart state
let cart = [];
let promoCode = '';
const SHIPPING_COST = 10;
const PROMO_CODES = {
    'WELCOME10': 10,
    'SPORT20': 20
};

// Initialize cart
function initializeCart() {
    // Get cart from localStorage
    cart = JSON.parse(localStorage.getItem('cart')) || [];
    
    // Update cart display
    updateCartDisplay();
}

// Update cart display
function updateCartDisplay() {
    if (cart.length === 0) {
        emptyCartMessage.style.display = 'block';
        cartItemsList.style.display = 'none';
        updateSummary(0, 0, 0);
        return;
    }

    emptyCartMessage.style.display = 'none';
    cartItemsList.style.display = 'block';
    
    // Clear current items
    cartItemsList.innerHTML = '';
    
    // Add each item to the display
    cart.forEach((item, index) => {
        const cartItem = document.createElement('div');
        cartItem.className = 'cart-item';
        cartItem.innerHTML = `
            <div class="cart-item-image">
                <img src="images/${item.image}" alt="${item.name}">
            </div>
            <div class="cart-item-details">
                <h3 class="cart-item-name">${item.name}</h3>
                <p class="cart-item-variant">
                    Size: ${item.size} | Color: ${item.color}
                </p>
                <p class="cart-item-price">$${(item.currentPrice * item.quantity).toFixed(2)}</p>
            </div>
            <div class="cart-item-actions">
                <div class="quantity-controls">
                    <button class="quantity-btn minus" data-index="${index}">-</button>
                    <input type="number" class="quantity-input" value="${item.quantity}" min="1" max="10" data-index="${index}">
                    <button class="quantity-btn plus" data-index="${index}">+</button>
                </div>
                <button class="remove-item" data-index="${index}">Remove</button>
            </div>
        `;
        cartItemsList.appendChild(cartItem);
    });

    // Calculate and update summary
    updateCartSummary();
}

// Update cart summary
function updateCartSummary() {
    const subtotal = cart.reduce((sum, item) => sum + (item.currentPrice * item.quantity), 0);
    const shipping = cart.length > 0 ? SHIPPING_COST : 0;
    const discount = calculateDiscount(subtotal);
    const total = subtotal + shipping - discount;

    updateSummary(subtotal, shipping, discount);
}

// Update summary display
function updateSummary(subtotal, shipping, discount) {
    subtotalElement.textContent = `$${subtotal.toFixed(2)}`;
    shippingElement.textContent = `$${shipping.toFixed(2)}`;
    discountElement.textContent = `-$${discount.toFixed(2)}`;
    totalElement.textContent = `$${(subtotal + shipping - discount).toFixed(2)}`;
}

// Calculate discount
function calculateDiscount(subtotal) {
    if (!promoCode || !PROMO_CODES[promoCode]) return 0;
    return (subtotal * PROMO_CODES[promoCode]) / 100;
}

// Update item quantity
function updateQuantity(index, newQuantity) {
    if (newQuantity < 1) newQuantity = 1;
    if (newQuantity > 10) newQuantity = 10;
    
    cart[index].quantity = newQuantity;
    localStorage.setItem('cart', JSON.stringify(cart));
    updateCartDisplay();
}

// Remove item from cart
function removeItem(index) {
    cart.splice(index, 1);
    localStorage.setItem('cart', JSON.stringify(cart));
    updateCartCount(); // Update the cart count in the header
    updateCartDisplay();
}

// Apply promo code
function applyPromoCode() {
    const code = promoInput.value.toUpperCase();
    if (PROMO_CODES[code]) {
        promoCode = code;
        showNotification(`Promo code applied! ${PROMO_CODES[code]}% discount`);
        updateCartSummary();
    } else {
        showNotification('Invalid promo code');
    }
}

// Proceed to checkout
function proceedToCheckout() {
    if (cart.length === 0) {
        showNotification('Your cart is empty');
        return;
    }
    
    // Here you would typically redirect to a checkout page or open a checkout modal
    showNotification('Proceeding to checkout...');
    // window.location.href = 'checkout.html';
}

// Event Listeners
document.addEventListener('click', (e) => {
    if (e.target.classList.contains('quantity-btn')) {
        const index = parseInt(e.target.dataset.index);
        const currentQuantity = cart[index].quantity;
        
        if (e.target.classList.contains('minus')) {
            updateQuantity(index, currentQuantity - 1);
        } else {
            updateQuantity(index, currentQuantity + 1);
        }
    }

    if (e.target.classList.contains('remove-item')) {
        const index = parseInt(e.target.dataset.index);
        removeItem(index);
    }
});

document.addEventListener('change', (e) => {
    if (e.target.classList.contains('quantity-input')) {
        const index = parseInt(e.target.dataset.index);
        const newQuantity = parseInt(e.target.value);
        updateQuantity(index, newQuantity);
    }
});

applyPromoBtn.addEventListener('click', applyPromoCode);
checkoutBtn.addEventListener('click', proceedToCheckout);

// Initialize cart when page loads
document.addEventListener('DOMContentLoaded', initializeCart);