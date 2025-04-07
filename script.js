// Wait for the DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
  // Get navbar element
  const navbar = document.querySelector('.navbar');
  const navHeight = navbar.offsetHeight;
  
  // Add fixed header functionality
  window.addEventListener('scroll', function() {
    // Add fixed class when scrolling down
    if (window.pageYOffset > 50) {
      navbar.classList.add('fixed-nav');
      document.body.style.paddingTop = navHeight + 'px';
    } else {
      navbar.classList.remove('fixed-nav');
      document.body.style.paddingTop = '0';
    }
    
    // Navigation highlight effect - slight shadow when scrolled
    if (window.pageYOffset > 10) {
      navbar.classList.add('nav-shadow');
    } else {
      navbar.classList.remove('nav-shadow');
    }
  });

  // Mobile menu toggle functionality
  const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
  const navLinks = document.querySelector('.nav-links');
  
  if (mobileMenuBtn) {
    mobileMenuBtn.addEventListener('click', function() {
      navLinks.classList.toggle('active');
      this.querySelector('i').classList.toggle('fa-bars');
      this.querySelector('i').classList.toggle('fa-times');
      
      // Add body lock to prevent scrolling when menu is open
      document.body.classList.toggle('menu-open');
    });
  }
  
  // Smooth scrolling for all anchor links with navbar offset adjustment
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      e.preventDefault();
      
      // Close mobile menu if open
      if (navLinks.classList.contains('active')) {
        navLinks.classList.remove('active');
        mobileMenuBtn.querySelector('i').classList.add('fa-bars');
        mobileMenuBtn.querySelector('i').classList.remove('fa-times');
        document.body.classList.remove('menu-open');
      }
      
      // Get the target element
      const targetId = this.getAttribute('href');
      if (targetId === '#') return; // Skip if href is just "#"
      
      const targetElement = document.querySelector(targetId);
      if (!targetElement) return; // Skip if target doesn't exist
      
      // Calculate scroll position with offset for fixed navbar
      const currentNavHeight = navbar.offsetHeight; // Get current height which may have changed
      const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - currentNavHeight;
      
      // Smooth scroll to target
      window.scrollTo({
        top: targetPosition,
        behavior: 'smooth'
      });
      
      // Update active class for clicked link
      document.querySelectorAll('.nav-links a').forEach(link => {
        link.classList.remove('active');
      });
      this.classList.add('active');
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
  
  // Fix footer to bottom and animate when it comes into view
  const footer = document.querySelector('footer');
  footer.classList.add('fixed-footer');
  
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
    
    // Add padding to body equal to footer height to prevent content overlap
    const footerHeight = footer.offsetHeight;
    document.body.style.paddingBottom = footerHeight + 'px';
    
    // Update padding on window resize
    window.addEventListener('resize', function() {
      const updatedFooterHeight = footer.offsetHeight;
      document.body.style.paddingBottom = updatedFooterHeight + 'px';
    });
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
  
  // Enhanced navbar active link detection
  function updateActiveNavLink() {
    const scrollPosition = window.pageYOffset;
    
    // Get all sections and their positions
    const sections = document.querySelectorAll('section, header');
    let currentSection = '';
    
    sections.forEach(section => {
      const sectionTop = section.offsetTop - navbar.offsetHeight - 20; // Small additional offset
      const sectionBottom = sectionTop + section.offsetHeight;
      
      if (scrollPosition >= sectionTop && scrollPosition < sectionBottom) {
        if (section.id) {
          currentSection = '#' + section.id;
        } else if (section.tagName === 'HEADER') {
          currentSection = '#home';
        }
      }
    });
    
    // Update active class with smooth transition
    const navLinks = document.querySelectorAll('.nav-links a');
    navLinks.forEach(link => {
      if (link.getAttribute('href') === currentSection) {
        if (!link.classList.contains('active')) {
          navLinks.forEach(l => l.classList.remove('active'));
          link.classList.add('active');
        }
      }
    });
  }
  
  // Update active nav link on scroll with throttling for performance
  let scrollThrottleTimer;
  window.addEventListener('scroll', function() {
    if (!scrollThrottleTimer) {
      scrollThrottleTimer = setTimeout(function() {
        updateActiveNavLink();
        scrollThrottleTimer = null;
      }, 100);
    }
  });
  
  // Call once on page load
  updateActiveNavLink();
  
  // Add navigation hover effects
  const navItems = document.querySelectorAll('.nav-links a');
  navItems.forEach(item => {
    item.addEventListener('mouseenter', function() {
      this.classList.add('nav-hover');
    });
    
    item.addEventListener('mouseleave', function() {
      this.classList.remove('nav-hover');
    });
  });

  // Add inline JavaScript CSS styles
  const style = document.createElement('style');
  style.textContent = `
    /* Fixed navigation styles added via JavaScript */
    body {
      transition: padding 0.3s ease;
    }
    
    body.menu-open {
      overflow: hidden;
    }
    
    .navbar {
      transition: all 0.3s ease;
    }
    
    .fixed-nav {
      position: fixed;
      top: 0;
      left: 0;
      right: 0;
      z-index: 1000;
      background-color: rgba(255, 255, 255, 0.95);
    }
    
    .nav-shadow {
      box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
    }
    
    /* Fixed footer styles */
    .fixed-footer {
      position: fixed;
      bottom: 0;
      left: 0;
      right: 0;
      z-index: 990;
      background-color: rgba(255, 255, 255, 0.95);
      box-shadow: 0 -2px 10px rgba(0, 0, 0, 0.1);
    }
    
    /* Navigation hover effect */
    .nav-links a {
      position: relative;
      transition: color 0.3s ease;
    }
    
    .nav-links a::before {
      content: '';
      position: absolute;
      bottom: -2px;
      left: 0;
      width: 0;
      height: 2px;
      background-color: #2563eb;
      transition: width 0.3s ease;
    }
    
    .nav-links a:hover::before,
    .nav-links a.nav-hover::before {
      width: 100%;
    }
    
    /* Active nav link - enhanced */
    .nav-links a.active {
      color: #2563eb;
      font-weight: 600;
    }
    
    .nav-links a.active::after {
      content: '';
      position: absolute;
      bottom: -2px;
      left: 0;
      width: 100%;
      height: 2px;
      background-color: #2563eb;
      animation: activeLink 0.3s ease-in-out;
    }
    
    @keyframes activeLink {
      0% { width: 0; left: 50%; }
      100% { width: 100%; left: 0; }
    }
  `;
  
  document.head.appendChild(style);
});
