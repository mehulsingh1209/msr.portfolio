document.addEventListener('DOMContentLoaded', function() {
  // Mobile menu toggle
  const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
  const navLinks = document.querySelector('.nav-links');
  
  if (mobileMenuBtn) {
    mobileMenuBtn.addEventListener('click', function() {
      navLinks.classList.toggle('active');
    });
  }
  
  // Close mobile menu when clicking on a link
  const navLinkItems = document.querySelectorAll('.nav-links a');
  navLinkItems.forEach(item => {
    item.addEventListener('click', function() {
      navLinks.classList.remove('active');
    });
  });
  
  // Smooth scrolling for all internal links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      e.preventDefault();
      
      const targetId = this.getAttribute('href');
      
      if (targetId === '#') return;
      
      const targetElement = document.querySelector(targetId);
      
      if (targetElement) {
        window.scrollTo({
          top: targetElement.offsetTop - 70, // Offset for fixed header
          behavior: 'smooth'
        });
      }
    });
  });
  
  // Scroll to top button
  const scrollToTopBtn = document.querySelector('.scroll-to-top');
  
  if (scrollToTopBtn) {
    // Show/hide scroll to top button
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
  }
  
  // Text animation for header and footer only
  const animateText = (element) => {
    if (!element) return;
    
    const text = element.innerText;
    element.innerText = '';
    
    let i = 0;
    const interval = setInterval(() => {
      if (i < text.length) {
        element.innerText += text.charAt(i);
        i++;
      } else {
        clearInterval(interval);
      }
    }, 50);
  };
  
  // Animate header text
  animateText(document.querySelector('header h1'));
  setTimeout(() => {
    animateText(document.querySelector('header p'));
  }, 1000);
  
  // Animate footer copyright text
  const footerText = document.querySelector('.footer-text');
  if (footerText) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          animateText(footerText);
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.5 });
    
    observer.observe(footerText);
  }
  
  // Active navigation link based on scroll position
  const sections = document.querySelectorAll('main section');
  const navItems = document.querySelectorAll('.nav-links a');
  
  window.addEventListener('scroll', () => {
    let current = '';
    
    sections.forEach(section => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.clientHeight;
      
      if (window.pageYOffset >= sectionTop - 100) {
        current = section.getAttribute('id');
      }
    });
    
    navItems.forEach(item => {
      item.classList.remove('active');
      if (item.getAttribute('href') === `#${current}`) {
        item.classList.add('active');
      }
    });
  });
});
