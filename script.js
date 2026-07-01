// Configuration - Replace this with your Google Apps Script Web App URL
const GOOGLE_SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbwf0b5ZN4pwjciqa2q2WokUTFROkulj2Bun2ZaSaUO9e48ax6t7BWF0kVeCBCvuop49/exec';

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
        showMessage('Thank you for joining! We\'ll be in touch soon.', 'success');
        form.reset();

    } catch (error) {
        console.error('Error:', error);
        showMessage('Something went wrong. Please try again.', 'error');
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

// ========================
// Sticky Nav on Scroll
// ========================
const navbar = document.getElementById('navbar');
let lastScroll = 0;

window.addEventListener('scroll', () => {
    const currentScroll = window.scrollY;

    if (currentScroll > 40) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }

    lastScroll = currentScroll;
}, { passive: true });

// ========================
// Mobile Hamburger Menu
// ========================
const hamburger = document.getElementById('hamburger');
const navLinks = document.getElementById('navLinks');

hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navLinks.classList.toggle('open');
    document.body.style.overflow = navLinks.classList.contains('open') ? 'hidden' : '';
});

// Close mobile menu when a link is clicked
navLinks.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navLinks.classList.remove('open');
        document.body.style.overflow = '';
    });
});

// Close mobile menu on Escape key
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && navLinks.classList.contains('open')) {
        hamburger.classList.remove('active');
        navLinks.classList.remove('open');
        document.body.style.overflow = '';
    }
});

// ========================
// Smooth Scroll for all anchor links
// ========================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const href = this.getAttribute('href');
        if (href === '#') return;
        e.preventDefault();
        const target = document.querySelector(href);
        if (target) {
            const navHeight = navbar.offsetHeight;
            const targetPosition = target.getBoundingClientRect().top + window.scrollY - navHeight;
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// ========================
// Scroll Reveal (Intersection Observer)
// ========================
const revealElements = document.querySelectorAll('.reveal');

const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            revealObserver.unobserve(entry.target);
        }
    });
}, {
    threshold: 0.1,
    rootMargin: '0px 0px -40px 0px'
});

revealElements.forEach(el => revealObserver.observe(el));

// ========================
// Contact Form (mailto)
// ========================
const contactForm = document.getElementById('contactForm');

contactForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const name = document.getElementById('contactName').value.trim();
    const email = document.getElementById('contactEmail').value.trim();
    const category = document.getElementById('contactCategory').value;
    const message = document.getElementById('contactMessage').value.trim();

    if (!name || !email || !message) {
        return;
    }

    const subject = encodeURIComponent(`[${category}] Message from ${name}`);
    const body = encodeURIComponent(
        `Name: ${name}\nEmail: ${email}\nCategory: ${category}\n\n${message}`
    );

    window.location.href = `mailto:byldforfun@gmail.com?subject=${subject}&body=${body}`;
});

// ========================
// Input focus animation
// ========================
const inputs = document.querySelectorAll('input, select, textarea');
inputs.forEach(input => {
    input.addEventListener('focus', function () {
        this.parentElement.classList.add('focused');
    });

    input.addEventListener('blur', function () {
        this.parentElement.classList.remove('focused');
    });
});

// ========================
// Active nav link highlighting
// ========================
const sections = document.querySelectorAll('section[id]');
const navAnchors = document.querySelectorAll('.nav-links a');

function highlightNav() {
    const scrollY = window.scrollY + navbar.offsetHeight + 100;

    sections.forEach(section => {
        const top = section.offsetTop;
        const height = section.offsetHeight;
        const id = section.getAttribute('id');

        if (scrollY >= top && scrollY < top + height) {
            navAnchors.forEach(a => {
                a.classList.remove('active');
                if (a.getAttribute('href') === `#${id}`) {
                    a.classList.add('active');
                }
            });
        }
    });
}

window.addEventListener('scroll', highlightNav, { passive: true });
