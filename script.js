// Configuration - Replace this with your Google Apps Script Web App URL
const GOOGLE_SCRIPT_URL = 'YOUR_GOOGLE_SCRIPT_URL_HERE';

// Get form elements
const form = document.getElementById('signupForm');
const submitBtn = document.getElementById('submitBtn');
const formMessage = document.getElementById('formMessage');

// Form submission handler
form.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    // Get form data
    const name = document.getElementById('name').value.trim();
    const email = document.getElementById('email').value.trim();
    
    // Validate inputs
    if (!name || !email) {
        showMessage('Please fill in all fields.', 'error');
        return;
    }
    
    // Validate email format
    if (!isValidEmail(email)) {
        showMessage('Please enter a valid email address.', 'error');
        return;
    }
    
    // Show loading state
    setLoading(true);
    hideMessage();
    
    try {
        // Send data to Google Sheets
        const response = await fetch(GOOGLE_SCRIPT_URL, {
            method: 'POST',
            mode: 'no-cors', // Important for Google Apps Script
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                name: name,
                email: email,
                timestamp: new Date().toISOString()
            })
        });
        
        // Note: With 'no-cors' mode, we can't read the response
        // We'll assume success if no error is thrown
        showMessage('🎉 Thank you for joining! We\'ll be in touch soon.', 'success');
        form.reset();
        
    } catch (error) {
        console.error('Error:', error);
        showMessage('Oops! Something went wrong. Please try again.', 'error');
    } finally {
        setLoading(false);
    }
});

// Helper function to validate email
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// Helper function to show loading state
function setLoading(isLoading) {
    submitBtn.disabled = isLoading;
    
    if (isLoading) {
        submitBtn.classList.add('loading');
        document.querySelector('.btn-text').style.display = 'none';
        document.querySelector('.btn-loader').style.display = 'inline-block';
    } else {
        submitBtn.classList.remove('loading');
        document.querySelector('.btn-text').style.display = 'inline-block';
        document.querySelector('.btn-loader').style.display = 'none';
    }
}

// Helper function to show message
function showMessage(message, type) {
    formMessage.textContent = message;
    formMessage.className = `form-message ${type}`;
    formMessage.style.display = 'block';
    
    // Auto-hide success message after 5 seconds
    if (type === 'success') {
        setTimeout(() => {
            hideMessage();
        }, 5000);
    }
}

// Helper function to hide message
function hideMessage() {
    formMessage.style.display = 'none';
    formMessage.className = 'form-message';
}

// Add smooth scroll behavior
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth'
            });
        }
    });
});

// Add input animation on focus
const inputs = document.querySelectorAll('input');
inputs.forEach(input => {
    input.addEventListener('focus', function() {
        this.parentElement.classList.add('focused');
    });
    
    input.addEventListener('blur', function() {
        this.parentElement.classList.remove('focused');
    });
});

