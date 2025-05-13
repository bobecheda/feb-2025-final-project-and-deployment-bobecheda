// DOM Elements
const contactForm = document.getElementById('contact-form');

// Form validation and submission
contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    // Get form data
    const formData = {
        name: document.getElementById('name').value,
        email: document.getElementById('email').value,
        subject: document.getElementById('subject').value,
        message: document.getElementById('message').value
    };

    // Validate form data
    if (!validateForm(formData)) {
        return;
    }

    // Simulate form submission
    submitForm(formData);
});

// Validate form data
function validateForm(data) {
    // Check for empty fields
    for (let field in data) {
        if (!data[field].trim()) {
            showNotification(`Please fill in the ${field} field`);
            return false;
        }
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(data.email)) {
        showNotification('Please enter a valid email address');
        return false;
    }

    return true;
}

// Submit form
function submitForm(data) {
    // Here you would typically send the data to a server
    // For now, we'll just simulate a successful submission
    
    // Show loading state
    const submitBtn = contactForm.querySelector('.submit-btn');
    const originalText = submitBtn.textContent;
    submitBtn.textContent = 'Sending...';
    submitBtn.disabled = true;

    // Simulate API call
    setTimeout(() => {
        // Reset form
        contactForm.reset();
        
        // Reset button
        submitBtn.textContent = originalText;
        submitBtn.disabled = false;
        
        // Show success message
        showNotification('Message sent successfully! We\'ll get back to you soon.');

        // Create and show success message in form
        const successMessage = document.createElement('div');
        successMessage.className = 'form-success';
        successMessage.innerHTML = `
            <h3>Thank you for your message!</h3>
            <p>We'll get back to you as soon as possible.</p>
        `;

        // Replace form with success message
        contactForm.innerHTML = '';
        contactForm.appendChild(successMessage);
        successMessage.classList.add('show');
    }, 1500);
}