// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function(e) {
    e.preventDefault();
    
    const targetId = this.getAttribute('href');
    const targetElement = document.querySelector(targetId);
    
    if (targetElement) {
      window.scrollTo({
        top: targetElement.offsetTop - 70, // Adjust for navbar height
        behavior: 'smooth'
      });
    }
  });
});

// Scroll to top button functionality
const scrollToTopButton = document.querySelector('.scroll-to-top');

window.addEventListener('scroll', () => {
  if (window.pageYOffset > 300) {
    scrollToTopButton.classList.add('show');
  } else {
    scrollToTopButton.classList.remove('show');
  }
});

scrollToTopButton.addEventListener('click', () => {
  window.scrollTo({
    top: 0,
    behavior: 'smooth'
  });
});

// Mobile menu toggle
const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
const navLinks = document.querySelector('.nav-links');

mobileMenuBtn.addEventListener('click', () => {
  navLinks.classList.toggle('active');
});

// Scroll animations for sections
document.addEventListener('DOMContentLoaded', () => {
  // Animate header elements on page load
  const header = document.querySelector('header');
  const headerElements = header.querySelectorAll('h1, p, .contact-info, .social-links, .btn');
  
  setTimeout(() => {
    header.classList.add('visible');
    headerElements.forEach((element, index) => {
      setTimeout(() => {
        element.classList.add('visible');
      }, 200 * index);
    });
  }, 300);
  
  // Intersection Observer for scroll animations
  const sections = document.querySelectorAll('section');
  
  const sectionObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        // Add visible class to the section
        entry.target.classList.add('visible');
        
        // Animate section title
        const sectionTitle = entry.target.querySelector('h2');
        if (sectionTitle) {
          sectionTitle.classList.add('title-animation');
        }
        
        // Animate section items with staggered delay
        const items = entry.target.querySelectorAll('.project-item, .skill-category, .education-item, .internship-item, .interest-item');
        items.forEach((item, index) => {
          setTimeout(() => {
            item.classList.add('item-animation');
          }, 150 * index);
        });
        
        // Animate skill tags with staggered delay
        const skillTags = entry.target.querySelectorAll('.skill-tag');
        skillTags.forEach((tag, index) => {
          setTimeout(() => {
            tag.classList.add('tag-animation');
          }, 100 * index);
        });
        
        // Unobserve after animation is added
        sectionObserver.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.2
  });
  
  // Observe all sections
  sections.forEach(section => {
    sectionObserver.observe(section);
  });
  
  // Footer animation
  const footer = document.querySelector('footer');
  const footerObserver = new IntersectionObserver((entries) => {
    if (entries[0].isIntersecting) {
      footer.classList.add('footer-animation');
      footerObserver.unobserve(footer);
    }
  }, {
    threshold: 0.5
  });
  
  footerObserver.observe(footer);
});

// Parallax effect for header
window.addEventListener('scroll', () => {
  const scrollPosition = window.pageYOffset;
  const header = document.querySelector('header');
  
  if (scrollPosition < window.innerHeight) {
    header.style.backgroundPositionY = `${scrollPosition * 0.5}px`;
    
    // Move header content slightly as user scrolls
    const headerContent = header.querySelector('.container');
    headerContent.style.transform = `translateY(${scrollPosition * 0.2}px)`;
    headerContent.style.opacity = 1 - (scrollPosition / (window.innerHeight * 0.8));
  }
});

// Highlight active navigation link based on scroll position
window.addEventListener('scroll', () => {
  const sections = document.querySelectorAll('section');
  const navLinks = document.querySelectorAll('.nav-links a');
  
  let current = '';
  
  sections.forEach(section => {
    const sectionTop = section.offsetTop - 100;
    const sectionHeight = section.clientHeight;
    
    if (window.pageYOffset >= sectionTop && window.pageYOffset < sectionTop + sectionHeight) {
      current = section.getAttribute('id');
    }
  });
  
  navLinks.forEach(link => {
    link.classList.remove('active');
    if (link.getAttribute('href') === `#${current}`) {
      link.classList.add('active');
    }
  });
});

// Add hover animations for interactive elements
document.querySelectorAll('.btn, .social-links a, .skill-tag').forEach(element => {
  element.addEventListener('mouseenter', function() {
    this.classList.add('hover-animation');
  });
  
  element.addEventListener('mouseleave', function() {
    this.classList.remove('hover-animation');
    // Add a small transition out animation
    this.classList.add('hover-out');
    setTimeout(() => {
      this.classList.remove('hover-out');
    }, 300);
  });
});
