// Wait for the DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
  // Mobile menu toggle functionality
  const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
  const navLinks = document.querySelector('.nav-links');
  
  if (mobileMenuBtn) {
    mobileMenuBtn.addEventListener('click', function() {
      navLinks.classList.toggle('active');
      this.querySelector('i').classList.toggle('fa-bars');
      this.querySelector('i').classList.toggle('fa-times');
    });
  }
  
  // Smooth scrolling for all anchor links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      e.preventDefault();
      
      // Close mobile menu if open
      if (navLinks.classList.contains('active')) {
        navLinks.classList.remove('active');
        mobileMenuBtn.querySelector('i').classList.add('fa-bars');
        mobileMenuBtn.querySelector('i').classList.remove('fa-times');
      }
      
      // Get the target element
      const targetId = this.getAttribute('href');
      if (targetId === '#') return; // Skip if href is just "#"
      
      const targetElement = document.querySelector(targetId);
      if (!targetElement) return; // Skip if target doesn't exist
      
      // Calculate scroll position with offset for navbar
      const navbarHeight = document.querySelector('.navbar').offsetHeight;
      const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - navbarHeight;
      
      // Smooth scroll to target
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
  `;
  
  document.head.appendChild(style);
});
