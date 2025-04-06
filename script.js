// Wait for DOM to fully load
document.addEventListener('DOMContentLoaded', function() {
  // Initialize components
  initMobileMenu();
  initSmoothScrolling();
  initScrollToTop();
  initAnimations();
  initSectionHighlighting();
  initFormValidation();
});

// Mobile Menu Functionality
function initMobileMenu() {
  const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
  const navLinks = document.querySelector('.nav-links');
  
  if (mobileMenuBtn && navLinks) {
    mobileMenuBtn.addEventListener('click', function() {
      navLinks.classList.toggle('active');
    });
    
    // Close mobile menu when clicking a link
    const navItems = navLinks.querySelectorAll('a');
    navItems.forEach(item => {
      item.addEventListener('click', function() {
        if (window.innerWidth <= 768) {
          navLinks.classList.remove('active');
        }
      });
    });
  }
}

// Smooth scrolling for anchor links
function initSmoothScrolling() {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      e.preventDefault();
      
      const targetId = this.getAttribute('href');
      if (targetId === '#') return;
      
      const targetElement = document.querySelector(targetId);
      if (targetElement) {
        // Calculate offset for fixed header
        const navbarHeight = document.querySelector('.navbar').offsetHeight;
        const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - navbarHeight;
        
        window.scrollTo({
          top: targetPosition,
          behavior: 'smooth'
        });
      }
    });
  });
}

// Scroll to top button
function initScrollToTop() {
  const scrollToTopBtn = document.querySelector('.scroll-to-top');
  
  if (scrollToTopBtn) {
    // Show/hide button based on scroll position
    window.addEventListener('scroll', function() {
      if (window.pageYOffset > 300) {
        scrollToTopBtn.classList.add('visible');
      } else {
        scrollToTopBtn.classList.remove('visible');
      }
    });
    
    // Scroll to top on click
    scrollToTopBtn.addEventListener('click', function() {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    });
  } else {
    // Create scroll to top button if it doesn't exist
    const scrollBtn = document.createElement('div');
    scrollBtn.className = 'scroll-to-top';
    scrollBtn.innerHTML = '<i class="fas fa-arrow-up"></i>';
    document.body.appendChild(scrollBtn);
    
    // Initialize the newly created button
    initScrollToTop();
  }
}

// Optimized section animations - preserves text integrity
function initAnimations() {
  const sections = document.querySelectorAll('section');
  
  // Preserve text integrity by using opacity for animations rather than text manipulations
  const revealSection = function(entries, observer) {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      
      // Simple fade-in without affecting text rendering
      entry.target.style.opacity = '1';
      entry.target.style.transform = 'translateY(0)';
      observer.unobserve(entry.target);
      
      // Carefully animate children without disrupting text
      const animatedElements = entry.target.querySelectorAll('h2, h3, .skill-tag, .internship-item, .education-item, .project-item, .interest-item');
      animatedElements.forEach((el, i) => {
        // Use CSS classes instead of inline styles for better performance
        setTimeout(() => {
          el.classList.add('revealed');
        }, i * 100);
      });
    });
  };
  
  // Set initial state for sections
  sections.forEach(section => {
    section.style.opacity = '0';
    section.style.transform = 'translateY(20px)';
    section.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
  });
  
  // Add CSS for animated elements
  const style = document.createElement('style');
  style.innerHTML = `
    /* Animation classes */
    .revealed {
      animation: fadeIn 0.5s ease forwards;
    }
    
    @keyframes fadeIn {
      from { opacity: 0; transform: translateY(10px); }
      to { opacity: 1; transform: translateY(0); }
    }
  `;
  document.head.appendChild(style);
  
  // Create and run the intersection observer
  const sectionObserver = new IntersectionObserver(revealSection, {
    root: null,
    threshold: 0.15
  });
  
  sections.forEach(section => {
    sectionObserver.observe(section);
  });
}

// Highlight active section in navigation
function initSectionHighlighting() {
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-links a');
  
  if (sections.length === 0 || navLinks.length === 0) return;
  
  // Use requestAnimationFrame for better performance
  let ticking = false;
  
  function highlightNavigation() {
    const scrollPosition = window.scrollY;
    const navbarHeight = document.querySelector('.navbar').offsetHeight;
    
    // Find current section
    let current = '';
    sections.forEach(section => {
      const sectionTop = section.offsetTop - navbarHeight - 100;
      const sectionHeight = section.offsetHeight;
      
      if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
        current = '#' + section.getAttribute('id');
      }
    });
    
    // Update active class
    navLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href') === current) {
        link.classList.add('active');
      }
    });
    
    ticking = false;
  }
  
  // Throttle scroll events
  window.addEventListener('scroll', function() {
    if (!ticking) {
      window.requestAnimationFrame(highlightNavigation);
      ticking = true;
    }
  });
  
  // Add active class styles
  const navStyle = document.createElement('style');
  navStyle.innerHTML = `
    .nav-links a.active {
      color: var(--primary-color);
    }
    
    .nav-links a.active::after {
      width: 100%;
    }
  `;
  document.head.appendChild(navStyle);
}

// Form validation
function initFormValidation() {
  const contactForm = document.getElementById('contact-form');
  
  if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
      e.preventDefault();
      
      // Basic form validation
      let valid = true;
      const nameInput = contactForm.querySelector('input[name="name"]');
      const emailInput = contactForm.querySelector('input[name="email"]');
      const messageInput = contactForm.querySelector('textarea[name="message"]');
      
      // Reset previous error states
      const inputs = contactForm.querySelectorAll('input, textarea');
      inputs.forEach(input => {
        input.style.borderColor = '';
      });
      
      // Validate required fields
      if (nameInput && !nameInput.value.trim()) {
        nameInput.style.borderColor = 'var(--danger)';
        valid = false;
      }
      
      if (emailInput) {
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailPattern.test(emailInput.value)) {
          emailInput.style.borderColor = 'var(--danger)';
          valid = false;
        }
      }
      
      if (messageInput && !messageInput.value.trim()) {
        messageInput.style.borderColor = 'var(--danger)';
        valid = false;
      }
      
      if (valid) {
        // Show success message
        const successMsg = document.createElement('div');
        successMsg.textContent = 'Message sent successfully!';
        successMsg.style.padding = '10px';
        successMsg.style.marginTop = '10px';
        successMsg.style.backgroundColor = 'var(--success)';
        successMsg.style.color = 'white';
        successMsg.style.borderRadius = 'var(--border-radius)';
        
        contactForm.appendChild(successMsg);
        
        // Reset form
        contactForm.reset();
        
        // Remove success message after 5 seconds
        setTimeout(() => {
          contactForm.removeChild(successMsg);
        }, 5000);
      }
    });
  }
}

// Add responsive behavior for skill tags
document.addEventListener('DOMContentLoaded', function() {
  const skillTags = document.querySelectorAll('.skill-tag');
  
  if (window.innerWidth > 768) {  // Only add hover effects on desktop
    skillTags.forEach(tag => {
      tag.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-5px)';
        this.style.boxShadow = '0 6px 12px rgba(0, 0, 0, 0.15)';
      });
      
      tag.addEventListener('mouseleave', function() {
        this.style.transform = '';
        this.style.boxShadow = '';
      });
    });
  }
});

// Optional: Lightweight header parallax effect (won't affect text rendering)
document.addEventListener('DOMContentLoaded', function() {
  const header = document.querySelector('header');
  
  if (header && window.innerWidth > 768) {  // Only on desktop for performance
    let ticking = false;
    
    window.addEventListener('scroll', function() {
      if (!ticking) {
        window.requestAnimationFrame(function() {
          const scrollPosition = window.pageYOffset;
          if (scrollPosition < header.offsetHeight) {
            // Apply subtle effect to the background only, not affecting text
            const headerBg = header.querySelector(':before');
            if (headerBg) {
              headerBg.style.transform = `translateY(${scrollPosition * 0.2}px)`;
            }
          }
          ticking = false;
        });
        ticking = true;
      }
    });
  }
});

// Add preload hint for key resources
document.addEventListener('DOMContentLoaded', function() {
  // Improve page load performance
  const links = [
    { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
    { rel: 'preconnect', href: 'https://fonts.gstatic.com', crossorigin: 'anonymous' },
    { rel: 'dns-prefetch', href: 'https://fonts.googleapis.com' }
  ];
  
  links.forEach(link => {
    const el = document.createElement('link');
    el.rel = link.rel;
    el.href = link.href;
    if (link.crossorigin) el.crossorigin = link.crossorigin;
    document.head.appendChild(el);
  });
});

// Add minimal intersection observer polyfill
if (!('IntersectionObserver' in window)) {
  window.IntersectionObserver = function(callback) {
    this.observe = function(element) {
      // Simple polyfill that just reveals elements
      element.style.opacity = '1';
      element.style.transform = 'translateY(0)';
      callback([{isIntersecting: true, target: element}], this);
    };
    this.unobserve = function() {};
  };
}
