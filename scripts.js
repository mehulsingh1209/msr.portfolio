document.addEventListener('DOMContentLoaded', function() {
  // DOM Elements
  const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
  const navLinks = document.querySelector('.nav-links');
  
  // Mobile menu toggle - add specific checks for null elements
  if (mobileMenuBtn && navLinks) {
    // Event listener for the menu button
    mobileMenuBtn.addEventListener('click', function(e) {
      e.preventDefault();
      e.stopPropagation();
      
      // Toggle the active class on the menu
      navLinks.classList.toggle('active');
      
      // Toggle icon between bars and times
      const icon = this.querySelector('i');
      if (icon) {
        if (icon.classList.contains('fa-bars')) {
          icon.classList.remove('fa-bars');
          icon.classList.add('fa-times');
        } else {
          icon.classList.remove('fa-times');
          icon.classList.add('fa-bars');
        }
      }
    });
  
    // Close mobile menu when a link is clicked
    const navLinkElements = document.querySelectorAll('.nav-links a');
    navLinkElements.forEach(link => {
      link.addEventListener('click', function() {
        navLinks.classList.remove('active');
        
        // Reset icon
        const icon = mobileMenuBtn.querySelector('i');
        if (icon) {
          icon.classList.remove('fa-times');
          icon.classList.add('fa-bars');
        }
      });
    });
    
    // Close menu when clicking outside
    document.addEventListener('click', function(e) {
      if (navLinks.classList.contains('active') && 
          !navLinks.contains(e.target) && 
          e.target !== mobileMenuBtn && 
          !mobileMenuBtn.contains(e.target)) {
        navLinks.classList.remove('active');
        
        // Reset icon
        const icon = mobileMenuBtn.querySelector('i');
        if (icon) {
          icon.classList.remove('fa-times');
          icon.classList.add('fa-bars');
        }
      }
    });
  }
  
  // Ensure proper mobile menu behavior on orientation change or resize
  window.addEventListener('resize', function() {
    if (window.innerWidth > 768 && navLinks) { // Adjust breakpoint to match your CSS
      navLinks.classList.remove('active');
      
      const icon = mobileMenuBtn?.querySelector('i');
      if (icon) {
        icon.classList.remove('fa-times');
        icon.classList.add('fa-bars');
      }
    }
  });
  
  // Fix for iOS touch events
  if (navLinks) {
    navLinks.addEventListener('touchstart', function(e) {
      // This prevents issues with scrolling and clicking in iOS
    }, { passive: true });
  }
});
