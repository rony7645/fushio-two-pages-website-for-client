document.addEventListener("DOMContentLoaded", function () {
    const icons = document.querySelectorAll(".icon");
    const cards = document.querySelectorAll(".info-card");

    let clicked = false;
    let scrollTimeout = null;

    // Show one card and hide others
    function showCard(index) {
      cards.forEach((card, i) => {
        card.style.display = i === index ? "block" : "none";
      });
    }

    // Activate icon and card by index
    function activateByIndex(index) {
      icons.forEach((icon) => icon.classList.remove("active"));
      if (icons[index]) {
        icons[index].classList.add("active");
        showCard(index);
      }
    }

    // Scroll handler — now based on .icon position
    function onScroll() {
      if (clicked) return;

      let currentIndex = -1;

      icons.forEach((icon, index) => {
        const rect = icon.getBoundingClientRect();

        if (rect.top <= 300) {
          currentIndex = index;
        }
      });

      if (currentIndex !== -1) {
        activateByIndex(currentIndex);
      }
    }

    // Click handler
    icons.forEach((icon, index) => {
      icon.addEventListener("click", () => {
        clicked = true;
        activateByIndex(index);

        // Unlock scroll after timeout
        if (scrollTimeout) clearTimeout(scrollTimeout);
        scrollTimeout = setTimeout(() => {
          clicked = false;
        }, 1000);
      });
    });

    // Initial state
    activateByIndex(0);
    window.addEventListener("scroll", onScroll);
  });




// Off Canvas 

// Refs
const panel = document.getElementById('offcanvas');
const openBtn = document.getElementById('openOffcanvas');
const closeBtn = document.getElementById('closeOffcanvas');

// Guard
if (!panel || !openBtn) {
  console.warn('Offcanvas: Missing #offcanvas or #openOffcanvas');
}

// Toggle open/close on button click
openBtn?.addEventListener('click', () => {
  panel.classList.toggle('is-open'); // expects CSS to show/hide via .is-open
});

// Close panel on close button click
closeBtn?.addEventListener('click', () => {
  panel.classList.remove('is-open');
});

// Close panel when any link inside is clicked
panel?.addEventListener('click', (e) => {
  const link = e.target.closest('a');
  if (!link) return;

  const href = link.getAttribute('href') || '';

  // If it's a hash link, smooth scroll to section
  if (href.startsWith('#')) {
    const target = document.querySelector(href);
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth' });
    }
  }

  // Close the panel
  panel.classList.remove('is-open');
});
