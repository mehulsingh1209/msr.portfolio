// Form submission
const contactForm = document.getElementById('contact-form');

contactForm.addEventListener('submit', (e) => {
  e.preventDefault();
  
  // Get form data
  const formData = new FormData(contactForm);
  const name = formData.get('name');
  const email = formData.get('email');
  const message = formData.get('message');
  
  // Here you would typically send the data to a server
  // For example, using fetch to a backend API
  
  // You could store the recipient email in a variable
  const recipientEmail = "mehulsingh127@gmail.com";
  
  // For demonstration purposes, show what would be sent
  console.log(`Sending message to: ${recipientEmail}`);
  console.log(`From: ${name} (${email})`);
  console.log(`Message: ${message}`);
  
  // Show confirmation to user
  alert('Thank you for your message! I will get back to you soon.');
  contactForm.reset();
});
