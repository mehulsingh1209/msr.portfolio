// Wait for the DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
  // Mobile menu toggle functionality
  const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
  const navLinks = document.querySelector('.nav-links');
  const navbar = document.querySelector('.navbar');
  let lastScrollTop = 0;
  
  // Function to close mobile menu
  function closeMobileMenu() {
    navLinks.classList.remove('active');
    mobileMenuBtn.querySelector('i').classList.add('fa-bars');
    mobileMenuBtn.querySelector('i').classList.remove('fa-times');
  }
  
  // Toggle mobile menu
  if (mobileMenuBtn) {
    mobileMenuBtn.addEventListener('click', function() {
      navLinks.classList.toggle('active');
      this.querySelector('i').classList.toggle('fa-bars');
      this.querySelector('i').classList.toggle('fa-times');
    });
  }
  
  // Close mobile menu when clicking outside
  document.addEventListener('click', function(e) {
    if (!navbar.contains(e.target) && navLinks.classList.contains('active')) {
      closeMobileMenu();
    }
  });
  
  // Hide navbar on scroll down, show on scroll up
  window.addEventListener('scroll', function() {
    const currentScroll = window.pageYOffset;
    
    if (currentScroll > lastScrollTop && currentScroll > 100) {
      // Scrolling down
      navbar.style.transform = 'translateY(-100%)';
      if (navLinks.classList.contains('active')) {
        closeMobileMenu();
      }
    } else {
      // Scrolling up
      navbar.style.transform = 'translateY(0)';
    }
    
    lastScrollTop = currentScroll;
  });
  
  // Handle window resize
  let resizeTimer;
  window.addEventListener('resize', function() {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(function() {
      if (window.innerWidth > 768 && navLinks.classList.contains('active')) {
        closeMobileMenu();
      }
    }, 250);
  });
  
  // Smooth scrolling for all anchor links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      e.preventDefault();
      
      // Close mobile menu if open
      if (navLinks.classList.contains('active')) {
        closeMobileMenu();
      }
      
      // Get the target element
      const targetId = this.getAttribute('href');
      if (targetId === '#') return;
      
      const targetElement = document.querySelector(targetId);
      if (!targetElement) return;
      
      // Calculate scroll position with dynamic offset for navbar
      const navbarHeight = navbar.offsetHeight;
      const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - navbarHeight;
      
      // Smooth scroll to target with dynamic duration based on distance
      const distance = Math.abs(window.pageYOffset - targetPosition);
      const duration = Math.min(1000, Math.max(500, distance / 2));
      
      window.scrollTo({
        top: targetPosition,
        behavior: 'smooth'
      });
    });
  });
  
  // Scroll to top button functionality
  const scrollToTopBtn = document.querySelector('.scroll-to-top');
  
  // Show/hide scroll to top button based on scroll position
  window.addEventListener('scroll', function() {
    if (window.pageYOffset > 300) {
      scrollToTopBtn.classList.add('visible');
    } else {
      scrollToTopBtn.classList.remove('visible');
    }
  });
  
  // Scroll to top when button is clicked
  if (scrollToTopBtn) {
    scrollToTopBtn.addEventListener('click', function() {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    });
  }
  
  // Animation for header elements on page load
  const headerElements = document.querySelectorAll('header h1, header p, header .social-links, header .btn');
  headerElements.forEach((element, index) => {
    // Add a class for CSS animations with a staggered delay
    setTimeout(() => {
      element.classList.add('animate-in');
    }, 200 * index);
  });
  
  // Animate section headings when they come into view
  const sectionHeadings = document.querySelectorAll('section h2');
  
  // Intersection Observer for section headings
  const headingObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('animate-heading');
        headingObserver.unobserve(entry.target); // Stop observing once animated
      }
    });
  }, {
    root: null,
    threshold: 0.2, // 20% of the element must be visible
    rootMargin: '-50px 0px'
  });
  
  // Observe each section heading
  sectionHeadings.forEach(heading => {
    headingObserver.observe(heading);
  });
  
  // Animate footer when it comes into view
  const footer = document.querySelector('footer');
  
  const footerObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        footer.classList.add('animate-footer');
        footerObserver.unobserve(footer);
      }
    });
  }, {
    threshold: 0.2,
    rootMargin: '0px'
  });
  
  if (footer) {
    footerObserver.observe(footer);
  }
  
  // Animate section content when it comes into view
  const sectionContent = document.querySelectorAll('section > *:not(h2)');
  
  const contentObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('fade-in');
        contentObserver.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.1,
    rootMargin: '-30px 0px'
  });
  
  sectionContent.forEach(content => {
    contentObserver.observe(content);
  });
  
  // Add active class to navbar links based on scroll position
  function updateActiveNavLink() {
    const sections = document.querySelectorAll('section, header');
    const navLinks = document.querySelectorAll('.nav-links a');
    
    let current = '';
    
    sections.forEach(section => {
      const sectionTop = section.offsetTop - 100;
      const sectionHeight = section.offsetHeight;
      
      if (window.pageYOffset >= sectionTop && window.pageYOffset < sectionTop + sectionHeight) {
        if (section.id) {
          current = '#' + section.id;
        } else if (section.tagName === 'HEADER') {
          current = '#home';
        }
      }
    });
    
    navLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href') === current) {
        link.classList.add('active');
      }
    });
  }
  
  // Update active nav link on scroll
  window.addEventListener('scroll', updateActiveNavLink);
  
  // Call once on page load
  updateActiveNavLink();
  
  // Add CSS for animations that will be applied by JS
  const style = document.createElement('style');
  style.textContent = `
    /* Header animations */
    header h1, header p, header .social-links, header .btn {
      opacity: 0;
      transform: translateY(20px);
      transition: opacity 0.6s ease, transform 0.6s ease;
    }
    
    header h1.animate-in, header p.animate-in, header .social-links.animate-in, header .btn.animate-in {
      opacity: 1;
      transform: translateY(0);
    }
    
    /* Section heading animations */
    section h2 {
      position: relative;
      opacity: 0;
      transform: translateX(-20px);
      transition: opacity 0.5s ease, transform 0.5s ease;
    }
    
    section h2.animate-heading {
      opacity: 1;
      transform: translateX(0);
    }
    
    section h2.animate-heading::after {
      content: '';
      position: absolute;
      bottom: -5px;
      left: 0;
      width: 0;
      height: 3px;
      background-color: #2563eb;
      animation: heading-underline 0.8s forwards 0.3s;
    }
    
    @keyframes heading-underline {
      to { width: 60px; }
    }
    
    /* Footer animation */
    footer {
      opacity: 0;
      transform: translateY(20px);
      transition: opacity 0.6s ease, transform 0.6s ease;
    }
    
    footer.animate-footer {
      opacity: 1;
      transform: translateY(0);
    }
    
    /* Content fade-in animation */
    .fade-in {
      animation: fadeIn 0.8s forwards;
    }
    
    @keyframes fadeIn {
      from {
        opacity: 0;
        transform: translateY(15px);
      }
      to {
        opacity: 1;
        transform: translateY(0);
      }
    }
    
    /* Scroll to top button animation */
    .scroll-to-top {
      opacity: 0;
      visibility: hidden;
      position: fixed;
      bottom: 20px;
      right: 20px;
      background: #2563eb;
      color: white;
      width: 40px;
      height: 40px;
      border-radius: 50%;
      display: flex;
      justify-content: center;
      align-items: center;
      cursor: pointer;
      z-index: 1000;
      transition: opacity 0.3s, visibility 0.3s, background-color 0.3s;
    }
    
    .scroll-to-top.visible {
      opacity: 1;
      visibility: visible;
    }
    
    .scroll-to-top:hover {
      background: #1d4ed8;
    }
    
    /* Active nav link */
    .nav-links a.active {
      color: #2563eb;
      font-weight: 600;
      position: relative;
    }
    
    .nav-links a.active::after {
      content: '';
      position: absolute;
      bottom: -2px;
      left: 0;
      width: 100%;
      height: 2px;
      background-color: #2563eb;
    }
    
    /* Navbar transitions */
    .navbar {
      transition: transform 0.3s ease;
    }
    
    /* Mobile menu transitions */
    .nav-links {
      transition: transform 0.3s ease, opacity 0.3s ease;
    }
    
    @media (max-width: 768px) {
      .nav-links {
        transform: translateY(-150%);
        opacity: 0;
      }
      
      .nav-links.active {
        transform: translateY(0);
        opacity: 1;
      }
    }
    
    /* Touch feedback */
    @media (hover: none) {
      .nav-links a:active,
      .btn:active,
      .skill-tag:active,
      .social-links a:active {
        transform: scale(0.95);
        transition: transform 0.1s ease;
      }
    }
  `;
  
  document.head.appendChild(style);

  // Scroll-triggered animations
  const animateElements = document.querySelectorAll('.animate-on-scroll');
  
  const observerOptions = {
    root: null,
    threshold: 0.1,
    rootMargin: '0px'
  };
  
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target); // Stop observing once animated
      }
    });
  }, observerOptions);
  
  animateElements.forEach(element => {
    observer.observe(element);
  });

  // Active section highlighting
  const sections = document.querySelectorAll('section');
  
  function highlightActiveSection() {
    const scrollPosition = window.scrollY;
    
    sections.forEach(section => {
      const sectionTop = section.offsetTop - navbar.offsetHeight - 100;
      const sectionBottom = sectionTop + section.offsetHeight;
      
      if (scrollPosition >= sectionTop && scrollPosition < sectionBottom) {
        const correspondingLink = document.querySelector(`a[href="#${section.id}"]`);
        if (correspondingLink) {
          document.querySelectorAll('.nav-links a').forEach(link => link.classList.remove('active'));
          correspondingLink.classList.add('active');
        }
      }
    });
  }
  
  window.addEventListener('scroll', highlightActiveSection);

  // Parallax effect for header
  const header = document.querySelector('header');
  const profileImg = document.querySelector('.profile-img');
  
  window.addEventListener('scroll', () => {
    if (window.innerWidth > 768) { // Only apply on desktop
      const scrolled = window.pageYOffset;
      const rate = scrolled * 0.5;
      
      profileImg.style.transform = `translateY(${rate}px)`;
      header.style.backgroundPosition = `50% ${rate}px`;
    }
  });

  // Animate skill tags on hover
  const skillTags = document.querySelectorAll('.skill-tag');
  
  skillTags.forEach(tag => {
    tag.addEventListener('mouseenter', function() {
      this.style.transform = 'translateY(-5px) scale(1.05)';
    });
    
    tag.addEventListener('mouseleave', function() {
      this.style.transform = 'translateY(0) scale(1)';
    });
  });

  // Form submission animation
  const contactForm = document.getElementById('contact-form');
  
  if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
      e.preventDefault();
      
      const submitBtn = this.querySelector('button[type="submit"]');
      const originalText = submitBtn.innerHTML;
      
      submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
      submitBtn.disabled = true;
      
      // Simulate form submission (replace with actual form submission)
      setTimeout(() => {
        submitBtn.innerHTML = '<i class="fas fa-check"></i> Sent!';
        submitBtn.style.backgroundColor = 'var(--success)';
        
        // Reset form
        setTimeout(() => {
          this.reset();
          submitBtn.innerHTML = originalText;
          submitBtn.disabled = false;
          submitBtn.style.backgroundColor = '';
        }, 2000);
      }, 1500);
    });
  }

  // Initialize animations on page load
  function initializeAnimations() {
    document.body.classList.add('loaded');
    
    // Add animation classes to elements
    const elements = document.querySelectorAll('.skill-category, .stat-item, .project-card, .contact-card');
    elements.forEach((element, index) => {
      element.style.animationDelay = `${index * 0.2}s`;
      element.classList.add('animate-on-scroll');
    });
  }
  
  // Call initialization after a short delay to ensure smooth animation start
  setTimeout(initializeAnimations, 100);
});
