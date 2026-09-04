// js/main.js – Interactive functionality for Blaze Byte Restaurant

document.addEventListener('DOMContentLoaded', () => {
  // ---------- Mobile Navigation ----------
  const hamburger = document.querySelector('.hamburger');
  const navLinks = document.querySelector('.nav-links');
  hamburger.addEventListener('click', () => {
    const expanded = hamburger.getAttribute('aria-expanded') === 'true';
    hamburger.setAttribute('aria-expanded', !expanded);
    navLinks.classList.toggle('open');
  });

  // ---------- Sticky Navbar Scrolled State ----------
  const navbar = document.getElementById('navbar');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  });

  // ---------- Scroll Reveal (IntersectionObserver) ----------
  const revealElements = document.querySelectorAll('[data-reveal]');
  const revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('revealed');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });
  revealElements.forEach(el => revealObserver.observe(el));

  // ---------- Menu Tabs ----------
  const menuData = {
    starters: [
      { name: 'Paneer Tikka', description: 'Chargrilled cottage cheese with spices', price: '₹199' },
      { name: 'Garlic Bread', description: 'Buttery bread with garlic herbs', price: '₹99' }
    ],
    main: [
      { name: 'Butter Chicken', description: 'Creamy tomato based chicken curry', price: '₹349' },
      { name: 'Dal Makhani', description: 'Slow cooked black lentils', price: '₹279' }
    ],
    biryani: [
      { name: 'Mutton Biryani', description: 'Fragrant basmati rice with tender mutton', price: '₹399' },
      { name: 'Veg Biryani', description: 'Mixed vegetables & aromatic spices', price: '₹299' }
    ],
    grills: [
      { name: 'Tandoori Chicken', description: 'Spiced roasted chicken', price: '₹359' },
      { name: 'Lamb Chops', description: 'Grilled lamb with herbs', price: '₹449' }
    ],
    desserts: [
      { name: 'Gulab Jamun', description: 'Soft milk‑based sweets', price: '₹149' },
      { name: 'Rasmalai', description: 'Sweet cheese discs in saffron milk', price: '₹159' }
    ],
    beverages: [
      { name: 'Masala Chai', description: 'Spiced Indian tea', price: '₹79' },
      { name: 'Mango Lassi', description: 'Yogurt‑mango drink', price: '₹119' }
    ]
  };

  const tabs = document.querySelectorAll('.menu-tabs .tab');
  const menuList = document.getElementById('menu-list');

  const renderMenu = category => {
    const items = menuData[category] || [];
    menuList.innerHTML = items.map(item => `
      <li class="menu-item">
        <span class="item-name">${item.name}</span>
        <span class="item-desc">${item.description}</span>
        <span class="item-price">${item.price}</span>
      </li>`).join('');
  };

  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      tabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');
      const cat = tab.dataset.category;
      renderMenu(cat);
    });
  });

  // Initialise with first tab
  renderMenu('starters');

  // ---------- Reservation Form ----------
  const form = document.getElementById('reservation-form');
  const toast = document.createElement('div');
  toast.className = 'toast';
  toast.textContent = '✅ Your reservation request has been received!';
  document.body.appendChild(toast);

  form.addEventListener('submit', e => {
    e.preventDefault();
    // Simple validation – all fields required, phone numeric length >=10
    const name = form.name.value.trim();
    const phone = form.phone.value.trim();
    const guests = form.guests.value;
    const date = form.date.value;
    const time = form.time.value;

    if (!name || !phone || !guests || !date || !time) {
      alert('Please fill in all fields.');
      return;
    }
    if (!/^\d{10,}$/.test(phone)) {
      alert('Please enter a valid phone number (minimum 10 digits).');
      return;
    }
    // Show toast
    toast.classList.add('show');
    setTimeout(() => toast.classList.remove('show'), 3000);
    form.reset();
  });
});
