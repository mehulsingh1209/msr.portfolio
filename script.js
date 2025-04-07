// Wait for the DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
  // Mobile menu toggle functionality
  const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
  const navLinks = document.querySelector('.nav-links');
  const navbar = document.querySelector('.navbar');
  
  if (mobileMenuBtn) {
    mobileMenuBtn.addEventListener('click', function() {
      navLinks.classList.toggle('active');
      this.querySelector('i').classList.toggle('fa-bars');
      this.querySelector('i').classList.toggle('fa-times');
    });
  }
  
  // Add navbar scroll effect (fixed position on scroll)
  window.addEventListener('scroll', function() {
    if (window.scrollY > 50) {
      navbar.classList.add('navbar-scrolled');
    } else {
      navbar.classList.remove('navbar-scrolled');
    }
  });
  
  // Smooth scrolling for all anchor links with improved offset calculation
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      e.preventDefault();
      
      // Close mobile menu if open
      if (navLinks && navLinks.classList.contains('active')) {
        navLinks.classList.remove('active');
        if (mobileMenuBtn && mobileMenuBtn.querySelector('i')) {
          mobileMenuBtn.querySelector('i').classList.add('fa-bars');
          mobileMenuBtn.querySelector('i').classList.remove('fa-times');
        }
      }
      
      // Get the target element
      const targetId = this.getAttribute('href');
      if (targetId === '#') return; // Skip if href is just "#"
      
      const targetElement = document.querySelector(targetId);
      if (!targetElement) return; // Skip if target doesn't exist
      
      // Calculate scroll position with offset for navbar
      const navbarHeight = navbar ? navbar.offsetHeight : 0;
      const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - navbarHeight - 20; // Added extra padding
      
      // Smooth scroll to target
      window.scrollTo({
        top: targetPosition,
        behavior: 'smooth'
      });
    });
  });
  
  // Scroll to top button functionality with enhanced animation
  const scrollToTopBtn = document.querySelector('.scroll-to-top');
  
  // Show/hide scroll to top button based on scroll position
  window.addEventListener('scroll', function() {
    if (window.pageYOffset > 300) {
      scrollToTopBtn?.classList.add('visible');
    } else {
      scrollToTopBtn?.classList.remove('visible');
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
  
  // Enhanced animation for header elements on page load
  const headerElements = document.querySelectorAll('header h1, header p, header .social-links, header .btn');
  headerElements.forEach((element, index) => {
    // Add a class for CSS animations with a staggered delay
    setTimeout(() => {
      element.classList.add('animate-in');
    }, 150 * index); // Slightly faster animation
  });
  
  // Animate section headings when they come into view with refined effect
  const sectionHeadings = document.querySelectorAll('section h2');
  
  // Intersection Observer for section headings with improved threshold
  const headingObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('animate-heading');
        headingObserver.unobserve(entry.target); // Stop observing once animated
      }
    });
  }, {
    root: null,
    threshold: 0.25, // 25% of the element must be visible
    rootMargin: '-40px 0px'
  });
  
  // Observe each section heading
  sectionHeadings.forEach(heading => {
    headingObserver.observe(heading);
  });
  
  // Fixed footer with improved animation
  const footer = document.querySelector('footer');
  
  if (footer) {
    // Add fixed footer class
    footer.classList.add('fixed-footer');
    
    const footerObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          footer.classList.add('animate-footer');
          footerObserver.unobserve(footer);
        }
      });
    }, {
      threshold: 0.3,
      rootMargin: '0px'
    });
    
    footerObserver.observe(footer);
  }
  
  // Improved animation for section content
  const sectionContent = document.querySelectorAll('section > *:not(h2)');
  
  const contentObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('fade-in');
        contentObserver.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.15,
    rootMargin: '-25px 0px'
  });
  
  sectionContent.forEach(content => {
    contentObserver.observe(content);
  });
  
  // Enhanced active class to navbar links with highlight effect
  function updateActiveNavLink() {
    const sections = document.querySelectorAll('section, header');
    const navLinks = document.querySelectorAll('.nav-links a');
    
    let current = '';
    
    sections.forEach(section => {
      const sectionTop = section.offsetTop - 150; // Increased offset for better accuracy
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
  
  // Update active nav link on scroll with throttling for performance
  let scrollTimeout;
  window.addEventListener('scroll', function() {
    if (scrollTimeout) {
      clearTimeout(scrollTimeout);
    }
    scrollTimeout = setTimeout(updateActiveNavLink, 50);
  });
  
  // Call once on page load
  updateActiveNavLink();
  
  // Add CSS for animations and fixed elements
  const style = document.createElement('style');
  style.textContent = `
    /* Navbar scroll effect */
    .navbar {
      position: fixed;
      top: 0;
      left: 0;
      right: 0;
      z-index: 1000;
      transition: all 0.3s ease;
      padding: 20px 0;
      background: rgba(255, 255, 255, 0.95);
    }
    
    .navbar-scrolled {
      padding: 10px 0;
      box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
      background: rgba(255, 255, 255, 0.98);
    }
    
    /* Adjust body padding for fixed navbar */
    body {
      padding-top: 80px;
    }
    
    /* Header animations with enhanced timing */
    header h1, header p, header .social-links, header .btn {
      opacity: 0;
      transform: translateY(15px);
      transition: opacity 0.5s ease, transform 0.5s ease;
    }
    
    header h1.animate-in, header p.animate-in, header .social-links.animate-in, header .btn.animate-in {
      opacity: 1;
      transform: translateY(0);
    }
    
    /* Professional section heading animations */
    section h2 {
      position: relative;
      opacity: 0;
      transform: translateX(-15px);
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
      height: 2px;
      background-color: #2563eb;
      animation: heading-underline 0.7s forwards 0.2s;
    }
    
    @keyframes heading-underline {
      to { width: 50px; }
    }
    
    /* Fixed footer styling */
    .fixed-footer {
      position: relative;
      margin-top: 50px;
      padding: 30px 0;
      background-color: #f9fafb;
      border-top: 1px solid #e5e7eb;
    }
    
    footer.animate-footer {
      opacity: 1;
      transform: translateY(0);
    }
    
    /* Improved content fade-in animation */
    .fade-in {
      animation: fadeIn 0.7s forwards;
    }
    
    @keyframes fadeIn {
      from {
        opacity: 0;
        transform: translateY(12px);
      }
      to {
        opacity: 1;
        transform: translateY(0);
      }
    }
    
    /* Enhanced scroll to top button */
    .scroll-to-top {
      opacity: 0;
      visibility: hidden;
      position: fixed;
      bottom: 25px;
      right: 25px;
      background: #2563eb;
      color: white;
      width: 45px;
      height: 45px;
      border-radius: 50%;
      display: flex;
      justify-content: center;
      align-items: center;
      cursor: pointer;
      z-index: 1000;
      transition: all 0.3s ease;
      box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
    }
    
    .scroll-to-top.visible {
      opacity: 1;
      visibility: visible;
    }
    
    .scroll-to-top:hover {
      background: #1d4ed8;
      transform: translateY(-3px);
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
    }
    
    /* Professional active nav link styling */
    .nav-links a {
      position: relative;
      padding: 8px 0;
      margin: 0 15px;
      color: #374151;
      font-weight: 500;
      transition: color 0.3s ease;
    }
    
    .nav-links a:hover {
      color: #2563eb;
    }
    
    .nav-links a.active {
      color: #2563eb;
      font-weight: 600;
    }
    
    .nav-links a::after {
      content: '';
      position: absolute;
      bottom: -2px;
      left: 0;
      width: 0;
      height: 2px;
      background-color: #2563eb;
      transition: width 0.3s ease;
    }
    
    .nav-links a:hover::after {
      width: 30%;
    }
    
    .nav-links a.active::after {
      width: 100%;
    }
  `;
  
  document.head.appendChild(style);
});
