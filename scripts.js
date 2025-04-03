document.addEventListener('DOMContentLoaded', function() {
  // Get existing elements
  const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
  const navLinks = document.querySelector('.nav-links');
  
  // Add dropdown functionality for mobile submenus if needed
  const dropdownLinks = document.querySelectorAll('.nav-links .has-dropdown');
  
  // Handle dropdowns on mobile
  dropdownLinks.forEach(link => {
    // Create dropdown toggle button
    const dropdownToggle = document.createElement('span');
    dropdownToggle.className = 'dropdown-toggle';
    dropdownToggle.innerHTML = '<i class="fas fa-chevron-down"></i>';
    link.appendChild(dropdownToggle);
    
    // Toggle dropdown on click
    dropdownToggle.addEventListener('click', function(e) {
      e.preventDefault();
      e.stopPropagation();
      
      // Toggle active class on parent
      link.classList.toggle('dropdown-active');
      
      // Find the dropdown menu
      const dropdown = link.querySelector('.dropdown-menu');
      
      // Toggle height for smooth animation
      if (link.classList.contains('dropdown-active')) {
        dropdown.style.maxHeight = dropdown.scrollHeight + 'px';
      } else {
        dropdown.style.maxHeight = '0';
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
  
  // Handle window resize
  let windowWidth = window.innerWidth;
  window.addEventListener('resize', function() {
    // Check if width changed significantly to avoid resize events when scrolling on mobile
    if (Math.abs(windowWidth - window.innerWidth) > 50) {
      windowWidth = window.innerWidth;
      
      // If window is resized larger than mobile breakpoint, reset mobile menu
      if (window.innerWidth > 768) { // Adjust this value to match your CSS breakpoint
        navLinks.classList.remove('active');
        
        // Reset icon
        const icon = mobileMenuBtn.querySelector('i');
        if (icon) {
          icon.classList.remove('fa-times');
          icon.classList.add('fa-bars');
        }
        
        // Reset any open dropdowns
        document.querySelectorAll('.dropdown-active').forEach(item => {
          item.classList.remove('dropdown-active');
          const dropdown = item.querySelector('.dropdown-menu');
          if (dropdown) dropdown.style.maxHeight = '0';
        });
      }
    }
  });
  
  // Add swipe functionality to close/open menu
  let touchStartX = 0;
  let touchEndX = 0;
  
  document.addEventListener('touchstart', function(e) {
    touchStartX = e.changedTouches[0].screenX;
  }, false);
  
  document.addEventListener('touchend', function(e) {
    touchEndX = e.changedTouches[0].screenX;
    handleSwipe();
  }, false);
  
  function handleSwipe() {
    const swipeThreshold = 100; // Minimum distance for swipe to register
    
    // Swipe right to open menu
    if (touchEndX - touchStartX > swipeThreshold && !navLinks.classList.contains('active')) {
      navLinks.classList.add('active');
      const icon = mobileMenuBtn.querySelector('i');
      if (icon) {
        icon.classList.remove('fa-bars');
        icon.classList.add('fa-times');
      }
    }
    
    // Swipe left to close menu
    if (touchStartX - touchEndX > swipeThreshold && navLinks.classList.contains('active')) {
      navLinks.classList.remove('active');
      const icon = mobileMenuBtn.querySelector('i');
      if (icon) {
        icon.classList.remove('fa-times');
        icon.classList.add('fa-bars');
      }
    }
  }
});
