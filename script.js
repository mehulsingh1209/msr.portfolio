document.addEventListener('DOMContentLoaded', function() {
  // =========================
  // TEXT TYPING ANIMATIONS WITH LETTER MOTION
  // =========================
  // Function to animate text with a typing effect and letter motion
  function animateTextTyping(selector, speed = 100, startDelay = 500) {
    const element = document.querySelector(selector);
    if (!element) return;
    
    // Store the original text
    const originalText = element.textContent.trim();
    
    // Clear the element
    element.innerHTML = '';
    
    // Create a container for the animated letters
    const textContainer = document.createElement('span');
    textContainer.classList.add('text-container');
    element.appendChild(textContainer);
    
    // Create cursor element
    const cursor = document.createElement('span');
    cursor.classList.add('typing-cursor');
    cursor.innerHTML = '|';
    element.appendChild(cursor);
    
    let charIndex = 0;
    
    function typeNextChar() {
      if (charIndex < originalText.length) {
        // Create a span for each letter to apply individual animations
        const letterSpan = document.createElement('span');
        letterSpan.classList.add('animated-letter');
        letterSpan.textContent = originalText.charAt(charIndex);
        textContainer.appendChild(letterSpan);
        
        charIndex++;
        setTimeout(typeNextChar, speed);
      } else {
        // Add a class when animation is complete
        element.classList.add('typing-complete');
        
        // Apply motion effects to letters after typing is complete
        const letters = element.querySelectorAll('.animated-letter');
        letters.forEach((letter, i) => {
          letter.style.animation = `letterFloat 2s ease-in-out infinite`;
          letter.style.animationDelay = `${i * 0.1}s`;
        });
      }
    }
    
    // Start typing after specified delay
    setTimeout(typeNextChar, startDelay);
  }
  
  // Add animations CSS
  const styleSheet = document.createElement('style');
  styleSheet.type = 'text/css';
  styleSheet.innerHTML = `
    @keyframes float {
      0% { transform: translateY(0px); }
      50% { transform: translateY(-10px); }
      100% { transform: translateY(0px); }
    }
    
    @keyframes letterFloat {
      0% { transform: translateY(0); }
      25% { transform: translateY(-2px); }
      50% { transform: translateY(0); }
      75% { transform: translateY(2px); }
      100% { transform: translateY(0); }
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

    .animated-letter {
      display: inline-block;
      transition: transform 0.2s ease;
    }
    
    .typing-complete .animated-letter:hover {
      transform: translateY(-3px) scale(1.1);
      color: var(--primary-color, #2563eb);
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
    
    /* Make scrolling smoother across devices */
    html {
      scroll-behavior: smooth;
    }
    
    @media (prefers-reduced-motion: reduce) {
      html {
        scroll-behavior: auto;
      }
      
      .animated-letter {
        animation: none !important;
      }
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
        // Use passive event listener for better performance
        const headerOffset = 70;
        const elementPosition = targetElement.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
        
        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth'
        });
        
        // Close mobile menu if open
        if (navLinks && navLinks.classList.contains('active')) {
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
  
  // Use Intersection Observer for better performance than scroll events
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
  // PROFILE IMAGE ANIMATION
  // =========================
  const profileImg = document.querySelector('.profile-img');
  if (profileImg) {
    profileImg.style.animation = 'float 6s ease-in-out infinite';
  }

  // =========================
  // OPTIMIZE FOR MOBILE PERFORMANCE
  // =========================
  function isMobile() {
    return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) || window.innerWidth < 768;
  }
  
  if (isMobile()) {
    // Reduce animation complexity on mobile for better performance
    document.body.classList.add('mobile-device');
    
    // Simplified animations for mobile
    styleSheet.innerHTML += `
      .mobile-device .animated-letter {
        animation-duration: 3s !important;
      }
      
      .mobile-device section {
        transition: opacity 0.4s ease-out, transform 0.4s ease-out !important;
      }
    `;
  }

  // =========================
  // REMOVE CUSTOM CURSOR EFFECT FOR BETTER MOBILE EXPERIENCE
  // =========================
  // Custom cursor only for desktop
  if (!isMobile()) {
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
      // Use requestAnimationFrame for smoother cursor movement
      requestAnimationFrame(() => {
        customCursor.style.left = e.clientX + 'px';
        customCursor.style.top = e.clientY + 'px';
      });
    }, { passive: true });

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

    // Remove default cursor only on desktop
    document.body.style.cursor = 'none';
    document.querySelectorAll('*').forEach(el => {
      el.style.cursor = 'none';
    });
  }

  // =========================
  // OPTIMIZE RESOURCES
  // =========================
  // Use passive event listeners for better scrolling performance
  const passiveSupported = () => {
    let passive = false;
    try {
      const options = Object.defineProperty({}, "passive", {
        get: function() { passive = true; return true; }
      });
      window.addEventListener("test", null, options);
      window.removeEventListener("test", null, options);
    } catch(err) {}
    return passive;
  };

  const wheelOpt = passiveSupported() ? { passive: true } : false;
  window.addEventListener('scroll', function() {
    // Event handler functions remain the same
  }, wheelOpt);
});
