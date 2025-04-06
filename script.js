document.addEventListener('DOMContentLoaded', function() {
  // =========================
  // TEXT TYPING ANIMATIONS
  // =========================
  // Function to animate text with a typing effect
  function animateTextTyping(selector, speed = 100, startDelay = 500) {
    const element = document.querySelector(selector);
    if (!element) return;
    
    // Store the original text
    const originalText = element.textContent.trim();
    
    // Clear the element
    element.innerHTML = '';
    
    // Create a span for the text
    const textSpan = document.createElement('span');
    element.appendChild(textSpan);
    
    // Create cursor element
    const cursor = document.createElement('span');
    cursor.classList.add('typing-cursor');
    cursor.innerHTML = '|';
    element.appendChild(cursor);
    
    let charIndex = 0;
    
    function typeNextChar() {
      if (charIndex < originalText.length) {
        textSpan.textContent += originalText.charAt(charIndex);
        charIndex++;
        setTimeout(typeNextChar, speed);
      } else {
        // Add a class when animation is complete
        element.classList.add('typing-complete');
      }
    }
    
    // Start typing after specified delay
    setTimeout(typeNextChar, startDelay);
  }
  
  // Add cursor blinking CSS
  const styleSheet = document.createElement('style');
  styleSheet.type = 'text/css';
  styleSheet.innerHTML = `
    @keyframes float {
      0% { transform: translateY(0px); }
      50% { transform: translateY(-10px); }
      100% { transform: translateY(0px); }
    }
    
    @keyframes fadeIn {
      from { opacity: 0; transform: translateY(5px); }
      to { opacity: 1; transform: translateY(0); }
    }
    
    @keyframes cursor-blink {
      0%, 100% { opacity: 1; }
      50% { opacity: 0; }
    }
    
    section.animated {
      opacity: 1 !important;
      transform: translateY(0) !important;
    }

    .skill-tag {
      transition: transform 0.3s ease, box-shadow 0.3s ease, background-color 0.3s ease;
    }
    
    .skill-tag:hover {
      transform: translateY(-5px) !important;
      box-shadow: 0 8px 15px rgba(0, 0, 0, 0.1);
      background-color: rgba(37, 99, 235, 0.1);
    }

    .typing-cursor {
      display: inline-block;
      color: var(--primary-color, #2563eb);
      animation: cursor-blink 1s infinite;
      font-weight: normal;
      margin-left: 2px;
    }
    
    header h1, footer .copyright {
      white-space: nowrap;
      display: inline-block;
    }
  `;
  document.head.appendChild(styleSheet);
  
  // Start text animations
  animateTextTyping('header h1', 150);
  setTimeout(() => {
    animateTextTyping('header p', 100, 200);
  }, 2500);
  
  // =========================
  // MOBILE MENU TOGGLE
  // =========================
  const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
  const navLinks = document.querySelector('.nav-links');
  
  if (mobileMenuBtn) {
    mobileMenuBtn.addEventListener('click', function() {
      navLinks.classList.toggle('active');
    });
  }
  
  // =========================
  // SCROLL TO TOP BUTTON
  // =========================
  const scrollToTopBtn = document.querySelector('.scroll-to-top');
  
  window.addEventListener('scroll', function() {
    if (window.pageYOffset > 300) {
      scrollToTopBtn.classList.add('visible');
    } else {
      scrollToTopBtn.classList.remove('visible');
    }
    
    // Animate footer copyright when near bottom
    const windowHeight = window.innerHeight;
    const documentHeight = document.documentElement.scrollHeight;
    const scrollTop = window.scrollY || document.documentElement.scrollTop;
    
    if (documentHeight - (scrollTop + windowHeight) < 300) {
      // User has scrolled near the bottom
      if (!document.querySelector('footer .copyright.typing-complete')) {
        animateTextTyping('footer .copyright', 80, 0);
      }
    }
  });
  
  if (scrollToTopBtn) {
    scrollToTopBtn.addEventListener('click', function() {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    });
  }
  
  // =========================
  // SMOOTH SCROLLING
  // =========================
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      e.preventDefault();
      
      const targetId = this.getAttribute('href');
      if (targetId === '#') return;
      
      const targetElement = document.querySelector(targetId);
      if (targetElement) {
        window.scrollTo({
          top: targetElement.offsetTop - 70,
          behavior: 'smooth'
        });
        
        // Close mobile menu if open
        if (navLinks.classList.contains('active')) {
          navLinks.classList.remove('active');
        }
      }
    });
  });
  
  // =========================
  // SECTION ANIMATIONS
  // =========================
  const sections = document.querySelectorAll('section');
  const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.1
  };
  
  const sectionObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('animated');
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);
  
  sections.forEach(section => {
    section.style.opacity = '0';
    section.style.transform = 'translateY(20px)';
    section.style.transition = 'opacity 0.6s ease-out, transform 0.6s ease-out';
    sectionObserver.observe(section);
  });
  
  // =========================
  // PROJECT ITEMS HOVER
  // =========================
  const projectItems = document.querySelectorAll('.project-item');
  projectItems.forEach(item => {
    item.addEventListener('mouseenter', function() {
      this.style.transform = 'translateY(-5px)';
      this.style.boxShadow = '0 10px 20px rgba(0, 0, 0, 0.1)';
      this.style.transition = 'all 0.3s ease';
    });
    
    item.addEventListener('mouseleave', function() {
      this.style.transform = 'translateY(0)';
      this.style.boxShadow = '0 4px 6px rgba(0, 0, 0, 0.1)';
    });
  });
  
  // =========================
  // SKILL TAGS ANIMATION
  // =========================
  const skillTags = document.querySelectorAll('.skill-tag');
  skillTags.forEach((tag, index) => {
    tag.style.opacity = '0';
    tag.style.transform = 'translateY(10px)';
    
    setTimeout(() => {
      tag.style.transition = 'opacity 0.3s ease, transform 0.3s ease';
      tag.style.opacity = '1';
      tag.style.transform = 'translateY(0)';
    }, index * 100);
  });
  
  // =========================
  // SOCIAL LINKS HOVER
  // =========================
  const socialLinks = document.querySelectorAll('.social-links a');
  
  socialLinks.forEach(link => {
    link.addEventListener('mouseenter', function() {
      this.style.transform = 'translateY(-5px) rotate(5deg)';
    });
    
    link.addEventListener('mouseleave', function() {
      this.style.transform = 'translateY(0) rotate(0)';
    });
  });

  // =========================
  // HEADER PARALLAX EFFECT
  // =========================
  const header = document.querySelector('header');
  if (header) {
    window.addEventListener('scroll', function() {
      const scrollPosition = window.pageYOffset;
      header.style.backgroundPosition = `50% ${scrollPosition * 0.5}px`;
    });
  }

  // =========================
  // PROFILE IMAGE ANIMATION
  // =========================
  const profileImg = document.querySelector('.profile-img');
  if (profileImg) {
    profileImg.style.animation = 'float 6s ease-in-out infinite';
  }

  // =========================
  // CUSTOM CURSOR EFFECT
  // =========================
  const customCursor = document.createElement('div');
  customCursor.className = 'custom-cursor';
  customCursor.style.position = 'fixed';
  customCursor.style.width = '12px';
  customCursor.style.height = '12px';
  customCursor.style.borderRadius = '50%';
  customCursor.style.backgroundColor = 'var(--primary-color)';
  customCursor.style.opacity = '0.5';
  customCursor.style.pointerEvents = 'none';
  customCursor.style.zIndex = '9999';
  customCursor.style.transform = 'translate(-50%, -50%)';
  customCursor.style.transition = 'width 0.2s, height 0.2s, opacity 0.2s';
  document.body.appendChild(customCursor);

  // Normal cursor
  document.addEventListener('mousemove', (e) => {
    customCursor.style.left = e.clientX + 'px';
    customCursor.style.top = e.clientY + 'px';
  });

  // Larger cursor on clickable elements
  const clickableElements = document.querySelectorAll('a, button, .btn, .skill-tag, .interest-item');
  clickableElements.forEach(element => {
    element.addEventListener('mouseenter', () => {
      customCursor.style.width = '24px';
      customCursor.style.height = '24px';
      customCursor.style.opacity = '0.3';
    });

    element.addEventListener('mouseleave', () => {
      customCursor.style.width = '12px';
      customCursor.style.height = '12px';
      customCursor.style.opacity = '0.5';
    });
  });

  // Remove default cursor
  document.body.style.cursor = 'none';
  document.querySelectorAll('*').forEach(el => {
    el.style.cursor = 'none';
  });
});
