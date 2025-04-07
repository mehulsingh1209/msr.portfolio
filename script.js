// Wait for DOM to fully load
document.addEventListener('DOMContentLoaded', function() {
  // Mobile menu toggle functionality
  const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
  const navLinks = document.querySelector('.nav-links');
  
  if (mobileMenuBtn) {
    mobileMenuBtn.addEventListener('click', function() {
      navLinks.classList.toggle('active');
    });
  }
  
  // Close mobile menu when clicking a nav link
  const navLinkItems = document.querySelectorAll('.nav-links a');
  navLinkItems.forEach(link => {
    link.addEventListener('click', function() {
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
          top: targetElement.offsetTop - 70, // Adjust for header height
          behavior: 'smooth'
        });
      }
    });
  });
  
  // Scroll to top button functionality
  const scrollToTopBtn = document.querySelector('.scroll-to-top');
  
  if (scrollToTopBtn) {
    // Show/hide scroll to top button based on scroll position
    window.addEventListener('scroll', function() {
      if (window.pageYOffset > 300) {
        scrollToTopBtn.classList.add('show');
      } else {
        scrollToTopBtn.classList.remove('show');
      }
    });
    
    // Scroll to top when button is clicked
    scrollToTopBtn.addEventListener('click', function() {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    });
  }
  
  // Animate elements on scroll
  const animateOnScroll = function() {
    // Get all sections
    const sections = document.querySelectorAll('section');
    const header = document.querySelector('header');
    const footer = document.querySelector('footer');
    
    // Set initial state for header (appears on page load)
    if (header) {
      animateElement(header);
    }
    
    // Check if element is in viewport
    const isInViewport = function(element) {
      const rect = element.getBoundingClientRect();
      return (
        rect.top <= (window.innerHeight || document.documentElement.clientHeight) * 0.85 &&
        rect.bottom >= 0
      );
    };
    
    // Apply animation to an element
    function animateElement(element) {
      element.classList.add('animated');
    }
    
    // Check all sections on scroll
    window.addEventListener('scroll', function() {
      sections.forEach(section => {
        if (isInViewport(section) && !section.classList.contains('animated')) {
          animateElement(section);
          
          // Animate section headings with delay
          setTimeout(() => {
            const heading = section.querySelector('h2');
            if (heading) {
              heading.classList.add('animated');
            }
          }, 300);
          
          // Animate section content with more delay
          setTimeout(() => {
            const contentElements = section.querySelectorAll('p, .skill-category, .project-item, .education-item, .internship-item, .interest-grid, form');
            contentElements.forEach((element, index) => {
              setTimeout(() => {
                element.classList.add('animated');
              }, index * 150);
            });
          }, 500);
        }
      });
      
      // Animate footer when scrolled to bottom
      if (footer && isInViewport(footer) && !footer.classList.contains('animated')) {
        animateElement(footer);
      }
    });
    
    // Trigger scroll event once to check initial viewport
    window.dispatchEvent(new Event('scroll'));
  };
  
  // Call animate on scroll function
  animateOnScroll();
  
  // Add parallax effect to header
  const parallaxHeader = function() {
    const header = document.querySelector('header');
    
    if (header) {
      window.addEventListener('scroll', function() {
        const scrollPosition = window.pageYOffset;
        
        if (scrollPosition < window.innerHeight) {
          // Create parallax effect for header background
          header.style.backgroundPositionY = scrollPosition * 0.5 + 'px';
          
          // Subtle movement for profile image on scroll
          const profileImg = header.querySelector('.profile-img');
          if (profileImg) {
            profileImg.style.transform = `translateY(${scrollPosition * 0.05}px)`;
          }
          
          // Fade text slightly as user scrolls away
          const textElements = header.querySelectorAll('h1, p, .social-links, .btn');
          textElements.forEach(element => {
            const opacity = 1 - (scrollPosition / (window.innerHeight * 0.8));
            element.style.opacity = Math.max(opacity, 0.4);
          });
        }
      });
    }
  };
  
  // Initialize parallax effect
  parallaxHeader();
  
  // Add hover effects for interactive elements
  const addHoverEffects = function() {
    // Project cards hover effect
    const projectItems = document.querySelectorAll('.project-item');
    projectItems.forEach(item => {
      item.addEventListener('mouseenter', function() {
        this.classList.add('hover');
      });
      
      item.addEventListener('mouseleave', function() {
        this.classList.remove('hover');
      });
    });
    
    // Skill tags hover effect
    const skillTags = document.querySelectorAll('.skill-tag');
    skillTags.forEach(tag => {
      tag.addEventListener('mouseenter', function() {
        this.classList.add('hover');
      });
      
      tag.addEventListener('mouseleave', function() {
        this.classList.remove('hover');
      });
    });
  };
  
  // Initialize hover effects
  addHoverEffects();
  
  // Add CSS for animations
  const createAnimationStyles = function() {
    const style = document.createElement('style');
    style.textContent = `
      /* Base animation styles */
      header, section, footer, h2, p, .skill-category, .project-item, .education-item, .internship-item, .interest-grid, form {
        opacity: 0;
        transform: translateY(20px);
        transition: opacity 0.8s ease, transform 0.8s ease;
      }
      
      /* Animated state */
      header.animated, section.animated, footer.animated {
        opacity: 1;
        transform: translateY(0);
      }
      
      /* Heading animations */
      h2.animated {
        opacity: 1;
        transform: translateY(0);
        position: relative;
      }
      
      h2.animated::after {
        content: '';
        position: absolute;
        bottom: -5px;
        left: 0;
        width: 0;
        height: 3px;
        background-color: #2563eb;
        animation: lineExpand 1s forwards 0.3s;
      }
      
      @keyframes lineExpand {
        to { width: 50px; }
      }
      
      /* Content animations */
      section.animated p.animated, 
      .skill-category.animated, 
      .project-item.animated, 
      .education-item.animated, 
      .internship-item.animated, 
      .interest-grid.animated, 
      form.animated {
        opacity: 1;
        transform: translateY(0);
      }
      
      /* Hover effects */
      .project-item.hover {
        transform: translateY(-5px);
        box-shadow: 0 10px 20px rgba(0, 0, 0, 0.1);
        transition: transform 0.3s ease, box-shadow 0.3s ease;
      }
      
      .skill-tag.hover {
        transform: scale(1.05);
        background-color: #2563eb;
        color: white;
        transition: all 0.3s ease;
      }
      
      /* Scroll to top button animation */
      .scroll-to-top {
        opacity: 0;
        visibility: hidden;
        transition: opacity 0.3s ease, visibility 0.3s ease;
      }
      
      .scroll-to-top.show {
        opacity: 1;
        visibility: visible;
      }
      
      /* Navbar animation on scroll */
      .navbar {
        transition: background-color 0.3s ease, box-shadow 0.3s ease;
      }
      
      .navbar.scrolled {
        background-color: rgba(255, 255, 255, 0.95);
        box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
      }
    `;
    document.head.appendChild(style);
  };
  
  // Create and add animation styles
  createAnimationStyles();
  
  // Change navbar style on scroll
  const navbarScrollEffect = function() {
    const navbar = document.querySelector('.navbar');
    
    if (navbar) {
      window.addEventListener('scroll', function() {
        if (window.pageYOffset > 50) {
          navbar.classList.add('scrolled');
        } else {
          navbar.classList.remove('scrolled');
        }
      });
    }
  };
  
  // Initialize navbar scroll effect
  navbarScrollEffect();
  
  // Add typing effect to header title
  const typingEffect = function() {
    const headerTitle = document.querySelector('header h1');
    
    if (headerTitle) {
      const text = headerTitle.textContent;
      headerTitle.textContent = '';
      headerTitle.style.borderRight = '3px solid #2563eb';
      
      let charIndex = 0;
      const type = function() {
        if (charIndex < text.length) {
          headerTitle.textContent += text.charAt(charIndex);
          charIndex++;
          setTimeout(type, 100);
        } else {
          headerTitle.style.borderRight = 'none';
        }
      };
      
      // Start typing after a short delay
      setTimeout(type, 1000);
    }
  };
  
  // Initialize typing effect
  typingEffect();
});
