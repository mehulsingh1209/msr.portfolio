// Wait for DOM to fully load
document.addEventListener('DOMContentLoaded', function() {
  // Initialize components
  initMobileMenu();
  initSmoothScrolling();
  initScrollToTop();
  initAnimations();
  initCursorEffects();
});

// Mobile Menu Functionality
function initMobileMenu() {
  const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
  const navLinks = document.querySelector('.nav-links');
  
  if (mobileMenuBtn && navLinks) {
    mobileMenuBtn.addEventListener('click', function() {
      navLinks.classList.toggle('active');
      
      // Add mobile-specific animation
      const links = navLinks.querySelectorAll('a');
      links.forEach((link, index) => {
        link.style.animation = navLinks.classList.contains('active') 
          ? `fadeInDown 0.3s ease forwards ${index * 0.1}s` 
          : '';
      });
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

// Enhanced scroll animations
function initAnimations() {
  // Advanced section reveal on scroll
  const sections = document.querySelectorAll('section');
  
  const revealSection = function(entries, observer) {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      
      entry.target.style.opacity = '1';
      entry.target.style.transform = 'translateY(0)';
      observer.unobserve(entry.target);
      
      // Animate children elements with cascade effect
      const animatedElements = entry.target.querySelectorAll('h2, h3, p, .skill-tag, .internship-item, .education-item, .project-item, .interest-item');
      animatedElements.forEach((el, i) => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'opacity 0.4s ease, transform 0.5s ease';
        el.style.transitionDelay = `${i * 0.1}s`;
        
        setTimeout(() => {
          el.style.opacity = '1';
          el.style.transform = 'translateY(0)';
        }, 100);
      });
    });
  };
  
  // Set initial state for sections
  sections.forEach(section => {
    section.style.opacity = '0';
    section.style.transform = 'translateY(20px)';
    section.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
  });
  
  // Create and run the intersection observer
  const sectionObserver = new IntersectionObserver(revealSection, {
    root: null,
    threshold: 0.15,
    rootMargin: '-100px'
  });
  
  sections.forEach(section => {
    sectionObserver.observe(section);
  });
  
  // Parallax effect for header background
  const header = document.querySelector('header');
  if (header) {
    window.addEventListener('scroll', function() {
      const scrollPosition = window.pageYOffset;
      if (scrollPosition < header.offsetHeight) {
        header.style.backgroundPosition = `center ${scrollPosition * 0.4}px`;
      }
    });
  }
}

// Cursor and hover effects matching the terminal/code aesthetic
function initCursorEffects() {
  // Add typing animation effect to the main title
  const mainTitle = document.querySelector('header h1');
  if (mainTitle) {
    const text = mainTitle.textContent;
    mainTitle.textContent = '';
    mainTitle.style.borderRight = '0.15em solid var(--primary-color)';
    mainTitle.style.animation = 'cursor-blink 1.2s infinite';
    
    // Only apply typing animation on desktop for performance
    if (window.innerWidth > 768) {
      let i = 0;
      const typeWriter = function() {
        if (i < text.length) {
          mainTitle.textContent += text.charAt(i);
          i++;
          setTimeout(typeWriter, 100);
        }
      };
      setTimeout(typeWriter, 500);
    } else {
      mainTitle.textContent = text;
    }
  }
  
  // Add terminal-like effects to buttons
  const buttons = document.querySelectorAll('.btn');
  buttons.forEach(btn => {
    btn.addEventListener('mouseenter', function() {
      this.style.position = 'relative';
      
      const cursor = document.createElement('span');
      cursor.style.position = 'absolute';
      cursor.style.right = '10px';
      cursor.style.width = '3px';
      cursor.style.height = '50%';
      cursor.style.backgroundColor = 'white';
      cursor.style.animation = 'cursor-blink 1.2s infinite';
      
      this.appendChild(cursor);
    });
    
    btn.addEventListener('mouseleave', function() {
      const cursor = this.querySelector('span');
      if (cursor) {
        this.removeChild(cursor);
      }
    });
  });
  
  // Skill tag hover effects
  const skillTags = document.querySelectorAll('.skill-tag');
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

// Form validation for contact form
document.addEventListener('DOMContentLoaded', function() {
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
        successMsg.style.padding = '10px';
        successMsg.style.marginTop = '10px';
        successMsg.style.backgroundColor = 'var(--success)';
        successMsg.style.color = 'white';
        successMsg.style.borderRadius = 'var(--border-radius)';
        successMsg.style.animation = 'fadeInUp 0.5s forwards';
        successMsg.textContent = 'Message sent successfully!';
        
        contactForm.appendChild(successMsg);
        
        // Reset form
        contactForm.reset();
        
        // Remove success message after 5 seconds
        setTimeout(() => {
          successMsg.style.animation = 'fadeOutDown 0.5s forwards';
          setTimeout(() => {
            contactForm.removeChild(successMsg);
          }, 500);
        }, 5000);
      } else {
        // Add shake animation to form for invalid submission
        contactForm.style.animation = 'shake 0.5s';
        setTimeout(() => {
          contactForm.style.animation = '';
        }, 500);
      }
    });
  }
});

// Additional animations
document.addEventListener('DOMContentLoaded', function() {
  // Add these additional keyframes to your CSS via JavaScript
  const style = document.createElement('style');
  style.innerHTML = `
    @keyframes fadeInDown {
      from {
        opacity: 0;
        transform: translateY(-10px);
      }
      to {
        opacity: 1;
        transform: translateY(0);
      }
    }
    
    @keyframes fadeOutDown {
      from {
        opacity: 1;
        transform: translateY(0);
      }
      to {
        opacity: 0;
        transform: translateY(10px);
      }
    }
    
    @keyframes shake {
      0%, 100% { transform: translateX(0); }
      20%, 60% { transform: translateX(-5px); }
      40%, 80% { transform: translateX(5px); }
    }
    
    /* Add highlight effect for active navigation item */
    .nav-links a.active {
      color: var(--primary-color);
    }
    
    .nav-links a.active::after {
      width: 100%;
    }
  `;
  document.head.appendChild(style);
  
  // Mark active navigation based on scroll position
  updateActiveNavOnScroll();
  
  // Add particle background effect for header
  addParticleEffect();
});

// Update active navigation item based on scroll position
function updateActiveNavOnScroll() {
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-links a');
  
  window.addEventListener('scroll', function() {
    let current = '';
    const offset = document.querySelector('.navbar').offsetHeight + 100;
    
    sections.forEach(section => {
      const sectionTop = section.offsetTop - offset;
      const sectionHeight = section.offsetHeight;
      
      if (pageYOffset >= sectionTop && pageYOffset < sectionTop + sectionHeight) {
        current = '#' + section.getAttribute('id');
      }
    });
    
    navLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href') === current) {
        link.classList.add('active');
      }
    });
  });
}

// Add particle effect to header (lightweight version)
function addParticleEffect() {
  const header = document.querySelector('header');
  
  if (header && window.innerWidth > 768) { // Only on desktop
    const particleContainer = document.createElement('div');
    particleContainer.className = 'particle-container';
    particleContainer.style.position = 'absolute';
    particleContainer.style.top = '0';
    particleContainer.style.left = '0';
    particleContainer.style.width = '100%';
    particleContainer.style.height = '100%';
    particleContainer.style.overflow = 'hidden';
    particleContainer.style.zIndex = '0';
    
    // Add 20 particles
    for (let i = 0; i < 20; i++) {
      const particle = document.createElement('span');
      particle.className = 'particle';
      
      // Random styling for particles
      particle.style.position = 'absolute';
      particle.style.display = 'block';
      particle.style.width = Math.random() * 5 + 2 + 'px';
      particle.style.height = Math.random() * 5 + 2 + 'px';
      particle.style.background = 'rgba(37, 99, 235, ' + (Math.random() * 0.2 + 0.1) + ')';
      particle.style.borderRadius = '50%';
      particle.style.left = Math.random() * 100 + '%';
      particle.style.top = Math.random() * 100 + '%';
      
      // Animation properties
      particle.style.animation = `float ${Math.random() * 10 + 10}s linear infinite`;
      particle.style.opacity = Math.random() * 0.5 + 0.2;
      
      particleContainer.appendChild(particle);
    }
    
    // Add float animation
    const particleStyle = document.createElement('style');
    particleStyle.innerHTML = `
      @keyframes float {
        0% {
          transform: translateY(0) translateX(0) rotate(0deg);
        }
        50% {
          transform: translateY(-20px) translateX(20px) rotate(180deg);
        }
        100% {
          transform: translateY(0) translateX(0) rotate(360deg);
        }
      }
    `;
    document.head.appendChild(particleStyle);
    
    // Insert particle container at the start of header
    header.insertBefore(particleContainer, header.firstChild);
  }
}

// Lazy load images (if any)
document.addEventListener('DOMContentLoaded', function() {
  const lazyImages = document.querySelectorAll('img[data-src]');
  
  if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver(function(entries, observer) {
      entries.forEach(function(entry) {
        if (entry.isIntersecting) {
          const img = entry.target;
          img.src = img.dataset.src;
          img.removeAttribute('data-src');
          imageObserver.unobserve(img);
        }
      });
    });
    
    lazyImages.forEach(function(img) {
      imageObserver.observe(img);
    });
  } else {
    // Fallback for browsers without IntersectionObserver
    lazyImages.forEach(function(img) {
      img.src = img.dataset.src;
      img.removeAttribute('data-src');
    });
  }
});

// Add dark mode toggle (optional enhancement)
function initDarkMode() {
  // Check for saved user preference
  const savedTheme = localStorage.getItem('theme') || (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
  
  // Create toggle button
  const themeToggle = document.createElement('button');
  themeToggle.className = 'theme-toggle';
  themeToggle.innerHTML = '<i class="fas fa-moon"></i>';
  themeToggle.style.position = 'fixed';
  themeToggle.style.top = '80px';
  themeToggle.style.right = '20px';
  themeToggle.style.width = '40px';
  themeToggle.style.height = '40px';
  themeToggle.style.borderRadius = '50%';
  themeToggle.style.background = 'var(--primary-color)';
  themeToggle.style.color = 'white';
  themeToggle.style.border = 'none';
  themeToggle.style.display = 'flex';
  themeToggle.style.alignItems = 'center';
  themeToggle.style.justifyContent = 'center';
  themeToggle.style.cursor = 'pointer';
  themeToggle.style.zIndex = '999';
  themeToggle.style.boxShadow = '0 4px 6px rgba(0, 0, 0, 0.1)';
  
  document.body.appendChild(themeToggle);
  
  // Add event listener
  themeToggle.addEventListener('click', function() {
    const currentTheme = document.body.classList.contains('dark-mode') ? 'dark' : 'light';
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    
    document.body.classList.toggle('dark-mode');
    localStorage.setItem('theme', newTheme);
    
    // Update button icon
    themeToggle.innerHTML = newTheme === 'dark' ? '<i class="fas fa-sun"></i>' : '<i class="fas fa-moon"></i>';
  });
  
  // Apply saved theme
  if (savedTheme === 'dark') {
    document.body.classList.add('dark-mode');
    themeToggle.innerHTML = '<i class="fas fa-sun"></i>';
  }
}

// Call dark mode function if you want to include this feature
// Uncomment the line below if you want to add dark mode toggle
// initDarkMode();
