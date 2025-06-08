let header = document.querySelector('header');
let menu = document.querySelector('#menu-icon');
let navbar = document.querySelector('.navbar');

window.addEventListener('scroll', () => {
    header.classList.toggle('shadow', window.scrollY > 0);
});

menu.onclick = () => {
    navbar.classList.toggle('active');
}

window.onscroll = () => {
    navbar.classList.remove('active');
}

// Dark Mode Toggle
const darkMode = document.getElementById('darkmode');
const html = document.documentElement;

// Check for saved theme preference
const savedTheme = localStorage.getItem('theme');
if (savedTheme) {
    html.setAttribute('data-theme', savedTheme);
    if (savedTheme === 'dark') {
        darkMode.classList.replace('bx-moon', 'bx-sun');
    }
}

// Toggle dark mode
darkMode.addEventListener('click', () => {
    if (html.getAttribute('data-theme') === 'dark') {
        html.setAttribute('data-theme', 'light');
        darkMode.classList.replace('bx-sun', 'bx-moon');
        localStorage.setItem('theme', 'light');
    } else {
        html.setAttribute('data-theme', 'dark');
        darkMode.classList.replace('bx-moon', 'bx-sun');
        localStorage.setItem('theme', 'dark');
    }
});

// Typing Animation
const texts = [
    "Hello, I'm",
    "Surya Prakash Singh",
    "I am a Professional Web Developer and a part time free lancer."
];

const typingElements = [
    document.querySelector('.home-text span'),
    document.querySelector('.home-text h1'),
    document.querySelector('.home-text p')
];

let currentTextIndex = 0;
let charIndex = 0;
let typingDelay = 100;

function type() {
    const currentElement = typingElements[currentTextIndex];
    const currentText = texts[currentTextIndex];

    if (charIndex < currentText.length) {
        currentElement.textContent += currentText.charAt(charIndex);
        charIndex++;
        setTimeout(type, typingDelay);
    } else {
        // Move to the next text after a pause
        currentTextIndex++;
        charIndex = 0;
        if (currentTextIndex < texts.length) {
            setTimeout(type, 1000); // Pause before typing next line
        } else {
            // All texts typed, stop or loop
            // For now, it stops. You can add looping logic here if needed.
        }
    }
}

// Start typing animation when page loads
window.addEventListener('load', () => {
    // Clear any existing text in the target elements
    typingElements.forEach(element => {
        if (element) element.textContent = '';
    });
    type();
});

// Contact Form Handling
const contactForm = document.getElementById('contactForm');
const formMessage = document.getElementById('formMessage');
const formStatus = document.getElementById('formStatus');

contactForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    // Disable submit button and show loading state
    const submitButton = contactForm.querySelector('button[type="submit"]');
    const originalButtonText = submitButton.innerHTML;
    submitButton.innerHTML = '<i class="bx bx-loader-alt bx-spin"></i> Sending...';
    submitButton.disabled = true;
    
    try {
        const formData = new FormData(contactForm);
        const response = await fetch(contactForm.action, {
            method: 'POST',
            body: formData
        });
        
        const result = await response.json();
        
        if (result.success) {
            // Show success message
            formMessage.textContent = 'Message sent successfully! I will get back to you soon.';
            formMessage.className = 'message success';
            formStatus.style.display = 'block';
            
            // Reset form
            contactForm.reset();
        } else {
            throw new Error(result.message || 'Something went wrong');
        }
    } catch (error) {
        // Show error message
        formMessage.textContent = error.message || 'Failed to send message. Please try again.';
        formMessage.className = 'message error';
        formStatus.style.display = 'block';
    } finally {
        // Reset button state
        submitButton.innerHTML = originalButtonText;
        submitButton.disabled = false;
        
        // Hide message after 5 seconds
        setTimeout(() => {
            formStatus.style.display = 'none';
        }, 5000);
    }
});

