const products = [
  {
    id: 'p1',
    name: "Dragon's Lair Master Set",
    price: 89.99,
    category: 'Board Games',
    description:
      'Delve into the deepest dungeons with this comprehensive master set. Includes 50+ detailed miniatures, modular dungeon tiles, and an epic campaign book.',
  },
  {
    id: 'p2',
    name: 'Tome of Ancient Secrets',
    price: 49.99,
    category: 'RPG Books',
    description:
      'A must-have rulebook expansion featuring new classes, spells, and forbidden lore for your tabletop roleplaying campaigns.',
  },
  {
    id: 'p3',
    name: 'Obsidian Polyhedral Dice Set',
    price: 24.99,
    category: 'Accessories',
    description:
      'A heavy, satisfying set of 7 polyhedral dice crafted from synthetic obsidian, featuring gold-painted numbers for easy reading in dim tavern light.',
  },
  {
    id: 'p4',
    name: 'Goblin Skirmishers Pack',
    price: 19.99,
    category: 'Miniatures',
    description:
      'A set of 12 highly detailed, unpainted goblin miniatures ready to ambush your unsuspecting adventuring party.',
  },
  {
    id: 'p5',
    name: 'Merchants of the Realm',
    price: 54.99,
    category: 'Board Games',
    description:
      'A strategic trading and negotiation game where players compete to become the wealthiest guild master in the kingdom.',
  },
  {
    id: 'p6',
    name: 'Leatherbound Campaign Journal',
    price: 34.99,
    category: 'Accessories',
    description:
      "Keep track of your party's adventures, NPCs, and quests in this genuine leather journal with thick, parchment-style paper.",
  },
  {
    id: 'p7',
    name: 'Abyssal Dragon Miniature',
    price: 79.99,
    category: 'Miniatures',
    description:
      'A massive, imposing dragon miniature that will strike fear into the hearts of your players. Requires assembly and painting.',
  },
  {
    id: 'p8',
    name: 'Shadows over the Capital',
    price: 39.99,
    category: 'RPG Books',
    description:
      'An intricate city-setting sourcebook filled with political intrigue, hidden cults, and detailed maps of the sprawling metropolis.',
  },
];

const events = [
  {
    id: 'e1',
    name: 'Friday Night Campaign: The Lost Mine',
    date: '2026-03-27',
    time: '6:00 PM - 10:00 PM',
    description:
      'Join our ongoing beginner-friendly RPG campaign. Pre-generated characters available, or bring your own level 3 hero!',
    type: 'RPG',
  },
  {
    id: 'e2',
    name: 'Miniature Painting Workshop',
    date: '2026-03-28',
    time: '1:00 PM - 4:00 PM',
    description:
      'Learn the basics of washing, drybrushing, and highlighting from our resident painting expert. Materials provided.',
    type: 'Workshop',
  },
  {
    id: 'e3',
    name: 'Card Game Weekly Tournament',
    date: '2026-03-29',
    time: '2:00 PM - 7:00 PM',
    description:
      'Bring your best deck and compete for store credit and exclusive promo cards. Standard format.',
    type: 'Tournament',
  },
  {
    id: 'e4',
    name: 'Board Game Open Play',
    date: '2026-04-02',
    time: '5:00 PM - 11:00 PM',
    description:
      'Grab a game from our massive library or bring your own. A great way to meet fellow tabletop enthusiasts.',
    type: 'Casual',
  },
  {
    id: 'e5',
    name: 'Epic Boss Battle One-Shot',
    date: '2026-04-04',
    time: '4:00 PM - 9:00 PM',
    description:
      'A high-level, high-stakes one-shot adventure where players face off against a legendary titan. Experience required.',
    type: 'RPG',
  },
  {
    id: 'e6',
    name: 'New Release Showcase',
    date: '2026-04-10',
    time: '6:00 PM - 9:00 PM',
    description:
      'Be the first to try out the hottest new board game releases of the month. Staff will be on hand to teach the rules.',
    type: 'Showcase',
  },
];

const categories = ['All', 'Board Games', 'RPG Books', 'Miniatures', 'Accessories'];

let activeCategory = 'All';
let mobileMenuOpen = false;

const app = document.getElementById('app');
const announcementRoot = document.getElementById('announcement-root');

function navigate(path) {
  window.location.hash = path;
}

function getRoute() {
  return window.location.hash.replace(/^#/, '') || '/';
}

function formatMonthDay(dateString) {
  const dateObj = new Date(dateString);
  const month = dateObj.toLocaleString('default', { month: 'short' });
  const day = dateObj.getDate();
  return { month, day };
}

function formatFullDate(dateString) {
  const dateObj = new Date(dateString);
  return dateObj.toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}

function isActive(path, currentRoute) {
  if (path === '/') return currentRoute === '/';
  return currentRoute.startsWith(path);
}

function glowButton(label, options = {}) {
  const {
    variant = 'primary',
    href = null,
    className = '',
    id = '',
    disabled = false,
    type = 'button'
  } = options;

  if (href) {
    return `
      <a href="#${href}" class="glow-btn ${variant} ${className}">
        <span>${label}</span>
      </a>
    `;
  }

  return `
    <button ${id ? `id="${id}"` : ''} ${disabled ? 'disabled' : ''} type="${type}" class="glow-btn ${variant} ${className}">
      <span>${label}</span>
    </button>
  `;
}

function fancyDivider() {
  return `
    <div class="fancy-divider">
      <div class="line"></div>
      <div class="icon">✦</div>
      <div class="line"></div>
    </div>
  `;
}

function renderProductCard(product) {
  return `
    <article class="product-card fade-up">
      <a href="#/shop/${product.id}" class="product-card-link">
        <div class="product-image-placeholder">
          <span>HGG</span>
        </div>
        <div class="product-body">
          <div class="product-category">${product.category}</div>
          <h3 class="product-name">${product.name}</h3>
          <p class="product-description">${product.description}</p>
          <div class="product-price">$${product.price.toFixed(2)}</div>
        </div>
      </a>
    </article>
  `;
}

function renderEventCard(event) {
  const { month, day } = formatMonthDay(event.date);
  return `
    <article class="event-card fade-up">
      <div class="event-date-block">
        <span class="event-month">${month}</span>
        <span class="event-day">${day}</span>
      </div>
      <div class="event-content">
        <div class="event-top">
          <h3 class="event-name">${event.name}</h3>
          <span class="event-type">${event.type}</span>
        </div>
        <div class="event-time">⏰ ${event.time}</div>
        <p class="event-description">${event.description}</p>
        <div class="mt-auto">
          <a href="#/events/${event.id}" class="event-link">View Details →</a>
        </div>
      </div>
    </article>
  `;
}

function renderNavbar(currentRoute) {
  const links = [
    { name: 'Home', path: '/' },
    { name: 'Shop', path: '/shop' },
    { name: 'Events', path: '/events' },
    { name: 'About', path: '/about' },
    { name: 'Contact', path: '/contact' },
  ];

  return `
    <header id="site-header" class="site-header">
      <div class="container">
        <div class="nav-inner">
          <a href="#/" class="logo">
            <span class="logo-symbol">📜</span>
            <span class="logo-text">Hobby Goblin</span>
          </a>

          <nav class="desktop-nav">
            ${links.map(link => `
              <a href="#${link.path}" class="nav-link ${isActive(link.path, currentRoute) ? 'active' : ''}">
                ${link.name}
              </a>
            `).join('')}
          </nav>

          <button id="mobile-menu-toggle" class="mobile-menu-toggle" aria-label="Toggle menu">
            ${mobileMenuOpen ? '✕' : '☰'}
          </button>
        </div>
      </div>

      <div class="mobile-nav ${mobileMenuOpen ? 'open' : ''}">
        <div class="mobile-nav-inner">
          ${links.map(link => `
            <a href="#${link.path}" class="${isActive(link.path, currentRoute) ? 'active' : ''}">
              ${link.name}
            </a>
          `).join('')}
        </div>
      </div>
    </header>
  `;
}

function renderFooter() {
  return `
    <footer class="site-footer">
      <div class="container">
        <div class="footer-grid">
          <div>
            <div class="footer-brand">
              <span class="icon">⚔️</span>
              <span class="text">Hobby Goblin</span>
            </div>
            <p class="footer-copy">
              Your sanctuary for tabletop adventures, rare miniatures, and epic
              campaigns. Gather your party and step inside.
            </p>
          </div>

          <div>
            <h3 class="footer-heading">Quick Links</h3>
            <ul class="footer-links">
              <li><a href="#/shop">The Shop</a></li>
              <li><a href="#/events">Upcoming Events</a></li>
              <li><a href="#/about">Our Story</a></li>
              <li><a href="#/contact">Contact Us</a></li>
            </ul>
          </div>

          <div>
            <h3 class="footer-heading">Visit the Tavern</h3>
            <ul class="footer-contact">
              <li>📍 Find us</li>
              <li>🕒 Tue - Sun: 12:00 PM - 10:00 PM</li>
              <li>📞 (123) 456-7890</li>
              <li>✉️ wassupp@hobbygoblin.com</li>
            </ul>
          </div>
        </div>

        <div class="footer-bottom">
          <p>&copy; ${new Date().getFullYear()} Hobby Goblin Games. All rights reserved.</p>
        </div>
      </div>
    </footer>
  `;
}

function renderHeroSection() {
  return `
    <section class="hero">
      <div class="hero-bg"></div>

      <div class="hero-content">
        <h1>Gather Your <span>Party</span></h1>
        <p>
          Step into a realm of imagination. Discover rare tomes, legendary
          games, and a community of fellow adventurers.
        </p>
        <div class="hero-actions">
          ${glowButton('Enter the Shop', { href: '/shop', className: 'hero-btn' })}
          ${glowButton('View Events', { href: '/events', variant: 'secondary', className: 'hero-btn' })}
        </div>
      </div>

      <div class="hero-bottom-fade"></div>
    </section>
  `;
}

function renderHomePage() {
  const featuredProducts = products.slice(0, 4);
  const upcomingEvents = events.slice(0, 3);

  return `
    <div>
      ${renderHeroSection()}

      <section class="section-padding">
        <div class="container">
          <section class="mb-12 fade-up">
            <h2 class="section-title">Wares of Wonder</h2>
            <p class="section-subtitle">
              Discover our most sought-after treasures, from ancient rulebooks
              to finely crafted miniatures.
            </p>

            <div class="product-grid">
              ${featuredProducts.map(renderProductCard).join('')}
            </div>

            <div class="mt-12 text-center">
              ${glowButton('View All Wares', { href: '/shop', variant: 'secondary' })}
            </div>
          </section>

          ${fancyDivider()}

          <section class="mt-12 fade-up">
            <h2 class="section-title">Gatherings & Quests</h2>
            <p class="section-subtitle">
              Join fellow adventurers in our tavern. Whether you're a seasoned
              veteran or a curious newcomer, there's a seat at our table.
            </p>

            <div class="event-grid three-col">
              ${upcomingEvents.map(renderEventCard).join('')}
            </div>

            <div class="mt-12 text-center">
              ${glowButton('See Full Calendar', { href: '/events', variant: 'secondary' })}
            </div>
          </section>
        </div>
      </section>
    </div>
  `;
}

function renderShopPage() {
  const filteredProducts =
    activeCategory === 'All'
      ? products
      : products.filter((p) => p.category === activeCategory);

  return `
    <section class="section-padding">
      <div class="container">
        <div class="page-intro">
          <h1>The Merchant's Guild</h1>
          <p>
            Peruse our collection of fine goods. From the heaviest polyhedral dice
            to the most intricate campaign settings.
          </p>
        </div>

        <div class="filters">
          ${categories.map(category => `
            <button class="filter-btn ${activeCategory === category ? 'active' : ''}" data-category="${category}">
              ${category}
            </button>
          `).join('')}
        </div>

        ${
          filteredProducts.length
            ? `<div class="product-grid">${filteredProducts.map(renderProductCard).join('')}</div>`
            : `
              <div class="text-center" style="padding: 5rem 0;">
                <p class="font-heading" style="font-size: 1.25rem; color: var(--dusty);">
                  The merchant's shelves are empty for this category.
                </p>
              </div>
            `
        }
      </div>
    </section>
  `;
}

function renderProductPage(id) {
  const product = products.find((p) => p.id === id);

  if (!product) {
    return `
      <div class="not-found">
        <div>
          <h1>Item Not Found</h1>
          <p>This artifact has been lost to the void.</p>
          ${glowButton('Return to Shop', { href: '/shop' })}
        </div>
      </div>
    `;
  }

  return `
    <section class="section-padding">
      <div class="container">
        <nav class="breadcrumbs">
          <a href="#/shop">Shop</a>
          <span>›</span>
          <span>${product.category}</span>
          <span>›</span>
          <span class="current">${product.name}</span>
        </nav>

        <div class="product-detail-grid">
          <div class="product-detail-image fade-up">
            <span>HGG Artifact</span>
          </div>

          <div class="fade-up">
            <div class="product-category-detail">${product.category}</div>
            <h1 class="product-title-detail">${product.name}</h1>
            <div class="product-price-detail">$${product.price.toFixed(2)}</div>

            <div class="info-box">
              <h3>🛡️ Item Description</h3>
              <p>${product.description}</p>
            </div>

            <div style="padding-top: 2rem; border-top: 1px solid rgba(140,84,121,0.3);">
              ${glowButton('Add to Cart', { id: 'add-to-cart-btn', className: 'w-full' })}
              <p id="cart-success" class="success-text" style="display:none;">
                The item has been secured in your bag of holding.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  `;
}

function renderEventsPage() {
  return `
    <section class="section-padding">
      <div class="container">
        <div class="page-intro">
          <h1>Tavern Gatherings</h1>
          <p>
            Join our community for epic campaigns, fierce tournaments, and casual
            game nights. There's always a seat open at our tables.
          </p>
        </div>

        <div class="event-grid two-col">
          ${events.map(renderEventCard).join('')}
        </div>
      </div>
    </section>
  `;
}

function renderEventDetailPage(id) {
  const event = events.find((e) => e.id === id);

  if (!event) {
    return `
      <div class="not-found">
        <div>
          <h1>Event Not Found</h1>
          <p>This gathering has faded into myth.</p>
          ${glowButton('View All Events', { href: '/events' })}
        </div>
      </div>
    `;
  }

  const fullDate = formatFullDate(event.date);

  return `
    <section class="section-padding">
      <div class="container-narrow">
        <nav class="breadcrumbs">
          <a href="#/events">Events</a>
          <span>›</span>
          <span class="current">${event.name}</span>
        </nav>

        <article class="event-detail-card fade-up">
          <div class="event-detail-header">
            <div class="event-badge">${event.type}</div>
            <h1 class="event-title-detail">${event.name}</h1>
          </div>

          <div style="padding: 2rem;">
            <div class="event-detail-meta" style="margin-bottom: 2rem;">
              <div class="meta-card">
                <div class="meta-icon">📅</div>
                <div>
                  <div class="meta-title">Date</div>
                  <div class="meta-text">${fullDate}</div>
                </div>
              </div>

              <div class="reserve-box">
                <h3 class="font-heading">👥 Gather Your Party</h3>
                <p class="meta-text" style="margin-bottom: 1rem;">
                  Space is limited in the tavern. Secure your spot at the table
                  before it fills up!
                </p>
                ${glowButton('Join / Attend', { id: 'attend-btn', className: 'w-full' })}
              </div>

              <div class="meta-card">
                <div class="meta-icon">⏰</div>
                <div>
                  <div class="meta-title">Time</div>
                  <div class="meta-text">${event.time}</div>
                </div>
              </div>
            </div>

            <div>
              <h2 class="font-display" style="font-size:2rem; margin-bottom:1rem; border-bottom:1px solid rgba(140,84,121,0.3); padding-bottom:0.5rem;">
                About This Event
              </h2>
              <p style="font-size:1.15rem; line-height:1.75; color:var(--plum-mid);">
                ${event.description}
              </p>
            </div>
          </div>
        </article>
      </div>
    </section>
  `;
}

function renderAboutPage() {
  return `
    <section class="section-padding">
      <div class="container-narrow">
        <div class="page-intro">
          <div style="font-size: 2.7rem; color: var(--orange); margin-bottom: 1rem;">🏬</div>
          <h1>Our Tale</h1>
        </div>

        <div class="story-card fade-in">
          <div class="story-corner tl"></div>
          <div class="story-corner tr"></div>
          <div class="story-corner bl"></div>
          <div class="story-corner br"></div>

          <p class="story-quote">
            "In the heart of the realm, where the cobblestones end and the imagination begins..."
          </p>

          <p>
            Hobby Goblin Games was forged in 2020 by a small fellowship of
            adventurers who believed that the best stories aren't watched on a
            screen, but created around a table. What started as a modest
            collection of dice and rulebooks in a dusty basement has grown into
            the sanctuary you see today.
          </p>

          <p>
            We are more than just merchants of cardboard and plastic. We are
            curators of worlds. Whether you are a seasoned Dungeon Master
            seeking the perfect miniature for your campaign's climax, or a weary
            traveler looking for a casual board game to share with family, our
            doors are open to you.
          </p>

          ${fancyDivider()}

          <h2 class="story-subtitle">Our Philosophy</h2>

          <p>
            We believe in the magic of face-to-face connection. In an
            increasingly digital age, the tactile joy of rolling a natural 20,
            the tension of drawing the final card, and the shared laughter over
            a brilliant (or disastrous) strategy are treasures worth protecting.
          </p>

          <p>
            Our tavern tables are always free to use. Our staff are guides, not
            just clerks. We invite you to gather your party, pull up a chair,
            and stay awhile. The next great adventure is waiting.
          </p>
        </div>
      </div>
    </section>
  `;
}

function renderContactPage() {
  return `
    <section class="section-padding">
      <div class="container">
        <div class="page-intro">
          <h1>Send a Raven</h1>
          <p>
            Seek us out in the physical realm, or send a message through the
            ether. We are always ready to assist a fellow traveler.
          </p>
        </div>

        <div class="contact-grid">
          <div class="contact-card fade-up">
            <h2 class="font-display" style="font-size:2rem; margin-bottom:2rem;">The Guildhall</h2>

            <div class="contact-item">
              <div class="contact-icon">📍</div>
              <div>
                <h3>Location</h3>
                <p>
                  Find<br>
                  Us<br>
                  (Next to our Neighbor House)
                </p>
              </div>
            </div>

            <div class="contact-item">
              <div class="contact-icon">🕒</div>
              <div>
                <h3>Trading Hours</h3>
                <p>
                  Monday: Closed (Resting)<br>
                  Tue - Thu: 12:00 PM - 10:00 PM<br>
                  Fri - Sat: 12:00 PM - 12:00 AM<br>
                  Sunday: 12:00 PM - 8:00 PM
                </p>
              </div>
            </div>

            <div class="contact-item">
              <div class="contact-icon">📞</div>
              <div>
                <h3>Speaking Stone</h3>
                <p>(123) 456-7890</p>
              </div>
            </div>

            <div class="contact-item" style="margin-bottom:0;">
              <div class="contact-icon">✉️</div>
              <div>
                <h3>Electronic Missives</h3>
                <p>wassupp@hobbygoblin.com</p>
              </div>
            </div>
          </div>

          <div class="contact-form-card fade-up">
            <h2 class="font-display" style="font-size:2rem; margin-bottom:1.5rem;">Dispatch a Message</h2>

            <form id="contact-form">
              <div style="margin-bottom: 1rem;">
                <label for="name">Your Name (or Title)</label>
                <input id="name" type="text" placeholder="e.g., Gandalf the Grey" />
              </div>

              <div style="margin-bottom: 1rem;">
                <label for="email">Return Address (Email)</label>
                <input id="email" type="email" placeholder="wizard@maiar.com" />
              </div>

              <div style="margin-bottom: 1.25rem;">
                <label for="message">Your Missive</label>
                <textarea id="message" rows="5" placeholder="I seek a specific artifact..."></textarea>
              </div>

              ${glowButton('Send Message', { type: 'submit', className: 'w-full' })}
            </form>
          </div>
        </div>
      </div>
    </section>
  `;
}

function renderNotFoundPage() {
  return `
    <div class="not-found">
      <div>
        <h1>Page Not Found</h1>
        <p>The path you seek has vanished into the mist.</p>
        ${glowButton('Return Home', { href: '/' })}
      </div>
    </div>
  `;
}

function renderAnnouncementPopup() {
  const seen = sessionStorage.getItem('hobbyGoblin_announcementSeen');
  if (seen) {
    announcementRoot.innerHTML = '';
    return;
  }

  setTimeout(() => {
    if (sessionStorage.getItem('hobbyGoblin_announcementSeen')) return;

    announcementRoot.innerHTML = `
      <div class="popup-overlay-wrap" id="popup-wrap">
        <div class="popup-backdrop" id="popup-backdrop"></div>
        <div class="popup-card">
          <button class="popup-close" id="popup-close" aria-label="Close announcement">✕</button>

          <div class="popup-icon">🎲</div>

          <h2 class="popup-title">Friday Night Campaign</h2>

          <p class="popup-text">
            A new adventure begins! Join our ongoing beginner-friendly RPG
            campaign. Pre-generated characters available.
          </p>

          <div class="popup-actions">
            <a href="#/events/e1" class="glow-btn primary" id="popup-learn-more">Learn More</a>
            <button class="dismiss-btn" id="popup-dismiss">Dismiss</button>
          </div>
        </div>
      </div>
    `;

    const closePopup = () => {
      announcementRoot.innerHTML = '';
      sessionStorage.setItem('hobbyGoblin_announcementSeen', 'true');
    };

    document.getElementById('popup-close')?.addEventListener('click', closePopup);
    document.getElementById('popup-dismiss')?.addEventListener('click', closePopup);
    document.getElementById('popup-backdrop')?.addEventListener('click', closePopup);
    document.getElementById('popup-learn-more')?.addEventListener('click', closePopup);
  }, 1500);
}

function renderPage(route) {
  if (route === '/') return renderHomePage();
  if (route === '/shop') return renderShopPage();
  if (route.startsWith('/shop/')) return renderProductPage(route.split('/')[2]);
  if (route === '/events') return renderEventsPage();
  if (route.startsWith('/events/')) return renderEventDetailPage(route.split('/')[2]);
  if (route === '/about') return renderAboutPage();
  if (route === '/contact') return renderContactPage();
  return renderNotFoundPage();
}

function renderApp() {
  const route = getRoute();

  app.innerHTML = `
    <div class="app-shell">
      ${renderNavbar(route)}

      <main>
        ${renderPage(route)}
      </main>

      ${renderFooter()}
    </div>
  `;

  attachEvents();
  updateScrolledNavbar();
}

function attachEvents() {
  const mobileToggle = document.getElementById('mobile-menu-toggle');
  if (mobileToggle) {
    mobileToggle.addEventListener('click', () => {
      mobileMenuOpen = !mobileMenuOpen;
      document.body.classList.toggle('menu-open', mobileMenuOpen);
      renderApp();
    });
  }

  document.querySelectorAll('.mobile-nav a, .desktop-nav a, .logo').forEach(link => {
    link.addEventListener('click', () => {
      mobileMenuOpen = false;
      document.body.classList.remove('menu-open');
    });
  });

  document.querySelectorAll('.filter-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      activeCategory = btn.dataset.category;
      renderApp();
    });
  });

  const addToCartBtn = document.getElementById('add-to-cart-btn');
  if (addToCartBtn) {
    addToCartBtn.addEventListener('click', () => {
      addToCartBtn.disabled = true;
      addToCartBtn.querySelector('span').textContent = 'Added to Inventory!';
      const success = document.getElementById('cart-success');
      if (success) success.style.display = 'block';

      setTimeout(() => {
        addToCartBtn.disabled = false;
        addToCartBtn.querySelector('span').textContent = 'Add to Cart';
        if (success) success.style.display = 'none';
      }, 3000);
    });
  }

  const attendBtn = document.getElementById('attend-btn');
  if (attendBtn) {
    attendBtn.addEventListener('click', () => {
      attendBtn.disabled = true;
      attendBtn.querySelector('span').textContent = 'Seat Reserved!';
    });
  }

  const contactForm = document.getElementById('contact-form');
  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      alert('Message sent... by fantasy standards. Connect this form to Formspree, Netlify Forms, or your backend.');
      contactForm.reset();
    });
  }
}

function updateScrolledNavbar() {
  const header = document.getElementById('site-header');
  if (!header) return;

  if (window.scrollY > 20) {
    header.classList.add('scrolled');
  } else {
    header.classList.remove('scrolled');
  }
}

window.addEventListener('scroll', updateScrolledNavbar);
window.addEventListener('hashchange', () => {
  renderApp();
  window.scrollTo({ top: 0, behavior: 'smooth' });
});
window.addEventListener('DOMContentLoaded', () => {
  renderApp();
  renderAnnouncementPopup();
});