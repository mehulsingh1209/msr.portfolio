document.addEventListener('DOMContentLoaded', function() {
  // DOM Elements
  const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
  const navLinks = document.querySelector('.nav-links');
  const scrollToTopBtn = document.querySelector('.scroll-to-top');
  const contactForm = document.getElementById('contact-form');
  
  // Mobile menu toggle
  mobileMenuBtn.addEventListener('click', function() {
    navLinks.classList.toggle('active');
    // Toggle icon between bars and times
    const icon = this.querySelector('i');
    if (icon.classList.contains('fa-bars')) {
      icon.classList.remove('fa-bars');
      icon.classList.add('fa-times');
    } else {
      icon.classList.remove('fa-times');
      icon.classList.add('fa-bars');
    }
  });
  
  // Close mobile menu when a link is clicked
  document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', function() {
      navLinks.classList.remove('active');
      // Reset icon
      const icon = mobileMenuBtn.querySelector('i');
      icon.classList.remove('fa-times');
      icon.classList.add('fa-bars');
    });
  });
  
  // Scroll to top button visibility
  window.addEventListener('scroll', function() {
    if (window.pageYOffset > 300) {
      scrollToTopBtn.classList.add('visible');
    } else {
      scrollToTopBtn.classList.remove('visible');
    }
  });
  
  // Scroll to top functionality
  scrollToTopBtn.addEventListener('click', function() {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });
  
  // Smooth scroll for navigation links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      e.preventDefault();
      
      const targetId = this.getAttribute('href');
      
      if (targetId === '#') return;
      
      const targetElement = document.querySelector(targetId);
      
      if (targetElement) {
        targetElement.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
      }
    });
  });
  
  // Form submission handler with email functionality
  if (contactForm) {
    // Update form action to use FormSubmit service
    contactForm.setAttribute('action', 'https://formsubmit.co/mehulsingh1209@gmail.com');
    contactForm.setAttribute('method', 'POST');
    
    // Add required hidden fields for FormSubmit configuration
    const createHiddenInput = (name, value) => {
      const input = document.createElement('input');
      input.type = 'hidden';
      input.name = name;
      input.value = value;
      return input;
    };
    
    // Add redirect back to portfolio page after submission
    contactForm.appendChild(createHiddenInput('_next', window.location.href));
    
    // Disable captcha
    contactForm.appendChild(createHiddenInput('_captcha', 'false'));
    
    // Set subject of email
    contactForm.appendChild(createHiddenInput('_subject', 'New Portfolio Contact Form Submission'));
    
    // Add name attributes to form inputs if they don't exist
    const nameInput = contactForm.querySelector('input[type="text"]');
    const emailInput = contactForm.querySelector('input[type="email"]');
    const messageInput = contactForm.querySelector('textarea');
    
    if (!nameInput.hasAttribute('name')) nameInput.setAttribute('name', 'name');
    if (!emailInput.hasAttribute('name')) emailInput.setAttribute('name', 'email');
    if (!messageInput.hasAttribute('name')) messageInput.setAttribute('name', 'message');
    
    // Add form submission feedback
    contactForm.addEventListener('submit', function() {
      // We don't need to preventDefault as we want the form to submit now
      const submitBtn = this.querySelector('button[type="submit"]');
      const originalText = submitBtn.innerHTML;
      
      // Change button text to indicate submission
      submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
      
      // Button will automatically reset when page reloads after submission
    });
  }
  
  // Add animation to sections on scroll
  const revealOnScroll = () => {
    const sections = document.querySelectorAll('section');
    
    sections.forEach(section => {
      const sectionTop = section.getBoundingClientRect().top;
      const windowHeight = window.innerHeight;
      
      if (sectionTop < windowHeight - 100) {
        section.style.opacity = '1';
        section.style.transform = 'translateY(0)';
      }
    });
  };
  
  // Initial setup for reveal animation
  document.querySelectorAll('section').forEach(section => {
    section.style.opacity = '0';
    section.style.transform = 'translateY(20px)';
    section.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
  });
  
  // Run reveal on load and scroll
  window.addEventListener('load', revealOnScroll);
  window.addEventListener('scroll', revealOnScroll);
});
