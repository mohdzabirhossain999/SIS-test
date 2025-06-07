// Nav
const navToggle = document.querySelector('.nav-toggle');
const navMenu = document.querySelector('.nav-menu');

navToggle.addEventListener('click', () => {
  navMenu.classList.toggle('active');
  navToggle.classList.toggle('active');
});






// Expand/Collapse About Boxes
document.querySelectorAll('.about-box').forEach(box => {
  const btn = box.querySelector('.toggle-btn');
  const content = box.querySelector('.about-box-content');

  btn.addEventListener('click', () => {
    const expanded = box.classList.toggle('expanded');
    btn.textContent = expanded ? 'Show less' : 'Show more';
    btn.setAttribute('aria-expanded', expanded);
    content.setAttribute('aria-hidden', !expanded);
  });

  box.querySelector('.about-box-header').addEventListener('click', (e) => {
    if (e.target === btn) return;
    btn.click();
  });
});



// Smooth Scroll for Navigation Links
document.querySelectorAll('.nav-menu a').forEach(link => {
  link.addEventListener('click', (e) => {
    e.preventDefault();
    const targetId = link.getAttribute('href').substring(1);
    const targetElement = document.getElementById(targetId);

    if (targetElement) {
      targetElement.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
      navMenu.classList.remove('active');
      navToggle.classList.remove('active');
    }
  });
});




// Expandable Cards Functionality
document.addEventListener("DOMContentLoaded", function () {
  const toggleButtons = document.querySelectorAll(".expandable-card .toggle-btn");

  toggleButtons.forEach(button => {
    button.addEventListener("click", function () {
      const card = this.closest(".expandable-card");
      const isExpanded = card.classList.contains("expanded");

      card.classList.toggle("expanded");
      this.textContent = isExpanded ? "Show More" : "Show Less";
    });
  });
});












// Contact Form Validation
function validateForm() {
  const name = document.getElementById("name").value.trim();
  const email = document.getElementById("email").value.trim();
  const message = document.getElementById("message").value.trim();
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (name === "" || email === "" || message === "") {
    alert("Please fill out all required fields.");
    return false;
  }

  if (!emailPattern.test(email)) {
    alert("Please enter a valid email address.");
    return false;
  }
  alert("Thank you for contacting us, " + name + "! We will get back to you soon.");
  return false; // prevent actual submission for demo
}
















// Gallery functionality
const galleryBtn = document.querySelector('.gallery-btn');
const galleryPopup = document.querySelector('.gallery-popup');
const closeGallery = document.querySelector('.close-gallery');
const galleryOverlay = document.querySelector('.gallery-overlay');

// Open gallery
galleryBtn.addEventListener('click', () => {
  galleryPopup.classList.add('active');
  document.body.style.overflow = 'hidden'; // Prevent scrolling
});

// Close gallery
function closeGalleryPopup() {
  galleryPopup.classList.remove('active');
  document.body.style.overflow = ''; // Re-enable scrolling
}

closeGallery.addEventListener('click', closeGalleryPopup);
galleryOverlay.addEventListener('click', closeGalleryPopup);

// Close with ESC key
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape' && galleryPopup.classList.contains('active')) {
    closeGalleryPopup();
  }
});

// Add animation to gallery images when they come into view
const galleryImages = document.querySelectorAll('.gallery-grid img');

const imageObserver = new IntersectionObserver((entries, observer) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = '1';
      entry.target.style.transform = 'translateY(0)';
      observer.unobserve(entry.target);
    }
  });
}, {
  threshold: 0.1
});

galleryImages.forEach(img => {
  img.style.opacity = '0';
  img.style.transform = 'translateY(20px)';
  img.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
  imageObserver.observe(img);
});