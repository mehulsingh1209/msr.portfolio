document.addEventListener('DOMContentLoaded', function() {
  // Initialize animations when the DOM is fully loaded
  initAnimations();
});

function initAnimations() {
  // 1. Scroll animations for elements
  animateOnScroll();
  
  // 2. Typing effect for header text
  setupTypingEffect();
  
  // 3. Animated skill bars
  animateSkillBars();
  
  // 4. Tilt effect for project cards
  setupTiltEffect();
  
  // 5. Parallax effect for header
  setupParallax();
  
  // 6. Animate counters (for statistics, etc.)
  setupCounters();
}

// 1. Scroll animations using Intersection Observer
function animateOnScroll() {
  const elements = document.querySelectorAll('.animate-on-scroll');
  
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('animated');
        // Optional: Stop observing after animation
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });
  
  elements.forEach(element => {
    observer.observe(element);
  });
}

// 2. Typing effect for header text
function setupTypingEffect() {
  const element = document.querySelector('.typing-text');
  if (!element) return;
  
  const text = element.getAttribute('data-text');
  element.textContent = '';
  
  let i = 0;
  const speed = 100; // typing speed in milliseconds
  
  function typeWriter() {
    if (i < text.length) {
      element.textContent += text.charAt(i);
      i++;
      setTimeout(typeWriter, speed);
    }
  }
  
  typeWriter();
}

// 3. Animate skill bars when they come into view
function animateSkillBars() {
  const skillBars = document.querySelectorAll('.skill-progress-bar');
  
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const bar = entry.target;
        const width = bar.getAttribute('data-width');
        bar.style.width = width + '%';
        observer.unobserve(bar);
      }
    });
  }, { threshold: 0.1 });
  
  skillBars.forEach(bar => {
    observer.observe(bar);
  });
}

// 4. Tilt effect for project cards
function setupTiltEffect() {
  const cards = document.querySelectorAll('.project-item, .interest-item');
  
  cards.forEach(card => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      
      const tiltX = (y - centerY) / 10;
      const tiltY = (centerX - x) / 10;
      
      card.style.transform = `perspective(1000px) rotateX(${tiltX}deg) rotateY(${tiltY}deg) scale3d(1.05, 1.05, 1.05)`;
    });
    
    card.addEventListener('mouseleave', () => {
      card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) scale3d(1, 1, 1)';
      card.style.transition = 'all 0.5s ease';
    });
  });
}

// 5. Parallax effect for header
function setupParallax() {
  const header = document.querySelector('header');
  if (!header) return;
  
  window.addEventListener('scroll', () => {
    const scrolled = window.scrollY;
    header.style.backgroundPositionY = scrolled * 0.5 + 'px';
  });
}

// 6. Animate number counters
function setupCounters() {
  const counters = document.querySelectorAll('.counter');
  
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const counter = entry.target;
        const target = parseInt(counter.getAttribute('data-target'));
        const duration = 2000; // 2 seconds
        const increment = target / (duration / 16); // 60fps
        
        let current = 0;
        const updateCounter = () => {
          current += increment;
          if (current < target) {
            counter.textContent = Math.floor(current);
            requestAnimationFrame(updateCounter);
          } else {
            counter.textContent = target;
          }
        };
        
        updateCounter();
        observer.unobserve(counter);
      }
    });
  }, { threshold: 0.1 });
  
  counters.forEach(counter => {
    observer.observe(counter);
  });
}

// Mobile menu toggle
document.querySelector('.mobile-menu-btn')?.addEventListener('click', function() {
  document.querySelector('.nav-links').classList.toggle('active');
});

// Smooth scroll for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function(e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      window.scrollTo({
        top: target.offsetTop - 80, // Adjust for navbar height
        behavior: 'smooth'
      });
    }
  });
});

// Scroll to top button visibility
window.addEventListener('scroll', function() {
  const scrollButton = document.querySelector('.scroll-to-top');
  if (scrollButton) {
    if (window.scrollY > 300) {
      scrollButton.classList.add('visible');
    } else {
      scrollButton.classList.remove('visible');
    }
  }
});

// Scroll to top button functionality
document.querySelector('.scroll-to-top')?.addEventListener('click', function() {
  window.scrollTo({
    top: 0,
    behavior: 'smooth'
  });
});
