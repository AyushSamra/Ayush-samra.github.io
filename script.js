document.addEventListener('DOMContentLoaded', function() {
    // Mobile Navigation Toggle
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');
    
    hamburger.addEventListener('click', function() {
        navLinks.classList.toggle('active');
    });

    // Smooth Scrolling for Navigation Links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            navLinks.classList.remove('active');
            
            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });

    // Sticky Header on Scroll
    window.addEventListener('scroll', function() {
        const header = document.querySelector('header');
        header.classList.toggle('sticky', window.scrollY > 0);
    });

    // Contact Form Submission - UPDATED VERSION
  // Contact Form Submission
// Contact Form Submission with New Tab Redirect
const contactForm = document.getElementById('contactForm');
if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        const submitBtn = contactForm.querySelector('button[type="submit"]');
        const originalBtnText = submitBtn.textContent;
        
        // Show loading state
        submitBtn.textContent = 'SENDING...';
        submitBtn.disabled = true;

        // Create a unique token for this submission
        const submissionToken = 'submission_' + Date.now();
        
        // Store form data temporarily
        const formData = new FormData(contactForm);
        const formEntries = Object.fromEntries(formData.entries());
        sessionStorage.setItem(submissionToken, JSON.stringify(formEntries));
        
        // Open thank you page in new tab immediately
        const thankYouUrl = 'thank-you.html?token=' + submissionToken;
        const newTab = window.open(thankYouUrl, '_blank');
        
        // Submit form data to FormSubmit
        const iframe = document.createElement('iframe');
        iframe.name = 'formsubmit-iframe';
        iframe.style.display = 'none';
        document.body.appendChild(iframe);
        
        contactForm.target = 'formsubmit-iframe';
        contactForm.submit();
        
        // Reset form after submission
        setTimeout(() => {
            contactForm.reset();
            submitBtn.textContent = originalBtnText;
            submitBtn.disabled = false;
            document.body.removeChild(iframe);
            
            // Focus on the new tab (optional)
            if (newTab) {
                newTab.focus();
            }
        }, 1000);
    });
}
    // Animate elements when they come into view
    const animateOnScroll = function() {
        const elements = document.querySelectorAll('.service-card, .feature');
        
        elements.forEach(element => {
            const elementPosition = element.getBoundingClientRect().top;
            const screenPosition = window.innerHeight / 1.3;
            
            if (elementPosition < screenPosition) {
                element.style.opacity = '1';
                element.style.transform = 'translateY(0)';
            }
        });
    };

    // Set initial state for animation
    document.querySelectorAll('.service-card, .feature').forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(20px)';
        element.style.transition = 'all 0.5s ease';
    });

    window.addEventListener('scroll', animateOnScroll);
    animateOnScroll(); // Run once on page load
});
// Gallery Lightbox Functionality
// Video Gallery Functionality
document.addEventListener('DOMContentLoaded', function() {
    // Store all video elements
    const videos = document.querySelectorAll('.gallery-item video');
    let currentlyPlaying = null;

    // Pause all other videos when one plays
    videos.forEach(video => {
        video.addEventListener('play', function() {
            if (currentlyPlaying && currentlyPlaying !== this) {
                currentlyPlaying.pause();
            }
            currentlyPlaying = this;
        });
    });

    // Lightbox for images (existing code)
    const galleryImages = document.querySelectorAll('.gallery-item img');
    const modal = document.createElement('div');
    modal.className = 'modal';
    modal.innerHTML = `
        <span class="close">&times;</span>
        <img class="modal-content" id="modal-image">
    `;
    document.body.appendChild(modal);
    
    galleryImages.forEach(item => {
        item.addEventListener('click', function() {
            const modalImg = document.getElementById('modal-image');
            modal.style.display = 'block';
            modalImg.src = this.src;
        });
    });
    
    // Close modal
    modal.querySelector('.close').addEventListener('click', function() {
        modal.style.display = 'none';
    });
    
    modal.addEventListener('click', function(e) {
        if (e.target === modal) {
            modal.style.display = 'none';
        }
    });
});
// Floating buttons animation
document.addEventListener('DOMContentLoaded', function() {
    const floatingButtons = document.querySelectorAll('.floating-button');
    
    floatingButtons.forEach(button => {
        // Initial animation
        setTimeout(() => {
            button.style.transform = 'translateY(0)';
        }, 1000);
        
        // Click animation
        button.addEventListener('click', function() {
            this.style.transform = 'scale(0.9)';
            setTimeout(() => {
                this.style.transform = 'scale(1)';
            }, 300);
        });
    });
});

