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
let isAdminLoggedIn = false;

const app = document.getElementById('app');
const announcementRoot = document.getElementById('announcement-root');

// ============================================================
//  ADMIN SYSTEM
// ============================================================
const ADMIN_CREDENTIALS = {
  username: 'admin',
  password: 'hoblingoblin2024'
};

function loadEventsFromStorage() {
  const stored = localStorage.getItem('hobbyGoblinEvents');
  return stored ? JSON.parse(stored) : events;
}

function saveEventsToStorage(eventsList) {
  localStorage.setItem('hobbyGoblinEvents', JSON.stringify(eventsList));
}

function checkAdminLogin() {
  const stored = sessionStorage.getItem('adminLoggedIn');
  isAdminLoggedIn = stored === 'true';
}

function adminLogin(username, password) {
  if (username === ADMIN_CREDENTIALS.username && password === ADMIN_CREDENTIALS.password) {
    sessionStorage.setItem('adminLoggedIn', 'true');
    isAdminLoggedIn = true;
    return true;
  }
  return false;
}

function adminLogout() {
  sessionStorage.removeItem('adminLoggedIn');
  isAdminLoggedIn = false;
}

// Initialize events from storage on load
checkAdminLogin();
const storedEvents = loadEventsFromStorage();
if (storedEvents.length > 0) {
  events.splice(0, events.length, ...storedEvents);
}

// ============================================================
//  ROUTING
// ============================================================
function navigate(path) {
  window.location.hash = path;
}

function getRoute() {
  return window.location.hash.replace(/^#/, '') || '/';
}

function isActive(path, currentRoute) {
  if (path === '/') return currentRoute === '/';
  return currentRoute.startsWith(path);
}

// ============================================================
//  HELPERS
// ============================================================
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
    return `<a href="#${href}" class="glow-btn ${variant} ${className}"><span>${label}</span></a>`;
  }
  return `<button ${id ? `id="${id}"` : ''} ${disabled ? 'disabled' : ''} type="${type}" class="glow-btn ${variant} ${className}"><span>${label}</span></button>`;
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

// ============================================================
//  COMPONENTS
// ============================================================
function renderProductCard(product) {
  return `
    <article class="product-card fade-up">
      <a href="#/shop/${product.id}" class="product-card-link">
        <div class="product-image-placeholder"><span>HGG</span></div>
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
        <div class="event-time"> ${event.time}</div>
        <p class="event-description">${event.description}</p>
        <div class="mt-auto">
          <a href="#/events/${event.id}" class="event-link">View Details →</a>
        </div>
      </div>
    </article>
  `;
}

function renderEventCardAsNews(event) {
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
        <div class="event-time">${event.time}</div>
        <p class="event-description">${event.description}</p>
        <div class="mt-auto">
          <a href="#/news/${event.id}" class="event-link">Read More →</a>
        </div>
      </div>
    </article>
  `;
}

// ============================================================
//  NAVBAR
// ============================================================
function renderNavbar(currentRoute) {
const shopifyUrl = 'https://hobby-goblin-games.myshopify.com';

const links = [
  { name: 'Home',  path: '/' },
  { name: 'About', path: '/about' },
  { name: 'Shop',  external: true, url: shopifyUrl },
  { name: 'News',  path: '/news' },
];

  return `
    <header id="site-header" class="site-header">
      <div class="container">
        <div class="nav-inner">
          <a href="#/" class="logo">
            <img src="Pic/LogoWhite.png" alt="Hobby Goblin Games" class="logo-img" />
          </a>

          <nav class="desktop-nav">
            ${links.map(link => {
              if (link.external) {
                return `
                  <a href="${link.url}" target="_blank" rel="noopener noreferrer" class="nav-link">
                    ${link.name}
                  </a>
                `;
              }

              return `
                <a href="#${link.path}" class="nav-link ${isActive(link.path, currentRoute) ? 'active' : ''}">
                  ${link.name}
                </a>
              `;
            }).join('')}
          </nav>

          <button id="mobile-menu-toggle" class="mobile-menu-toggle" aria-label="Toggle menu">
            ${mobileMenuOpen ? '✕' : '☰'}
          </button>
        </div>
      </div>

      <div class="mobile-nav ${mobileMenuOpen ? 'open' : ''}">
        <div class="mobile-nav-inner">
          ${links.map(link => {
            if (link.external) {
              return `
                <a href="${link.url}" target="_blank" rel="noopener noreferrer">
                  ${link.name}
                </a>
              `;
            }

            return `
              <a href="#${link.path}" class="${isActive(link.path, currentRoute) ? 'active' : ''}">
                ${link.name}
              </a>
            `;
          }).join('')}
        </div>
      </div>
    </header>
  `;
}

// ============================================================
//  FOOTER
// ============================================================
function renderFooter() {
  return `
    <footer class="site-footer">
      <div class="container">
        <div class="footer-grid">
          <div>
            <div class="footer-brand">
          <a href="#/" class="logo">
            <img src="Pic/LogoWhite.png" alt="Hobby Goblin Games" class="logo-img" />
          </a>
            </div>
            <p class="footer-copy">
              A place for you to experience your D&D game with community and creativity first. Come on in and join the Horde.
            </p>
          </div>

          <div>
            <h3 class="footer-heading">Quick Links</h3>
            <ul class="footer-links">
              <li><a href="https://hobby-goblin-games.myshopify.com" target="_blank" rel="noopener noreferrer">The Shop</a></li>
              <li><a href="#/news">News</a></li>
              <li><a href="#/about">Our Story</a></li>
              <li><a href="#/contact">Contact Us</a></li>
            </ul>
          </div>

          <div>
            <h3 class="footer-heading">Holler The Horde</h3>
            <ul class="footer-contact">
              <li>(210)596-3366</li>
              <li>hobbygoblingamesrpg@gmail.com</li>
            </ul>
          </div>
        </div>

        <div class="footer-bottom">
          <p>&copy; ${new Date().getFullYear()} Hobby Goblin Games. All rights reserved. May your rolls be ever natural 20s.</p>
        </div>
      </div>
    </footer>
  `;
}

// ============================================================
//  CINEMATIC HERO WITH SLIDESHOW
// ============================================================
function renderHeroSection() {
  const spotlight = events[0]; // Friday Night Campaign: The Lost Mine

  return `
    <section class="hero-cinematic" id="hero-cinematic">

      <!-- Crossfade slideshow backgrounds -->
      <div class="hero-slides" id="hero-slides">
        <div class="hero-slide hero-slide-1 active"></div>
        <div class="hero-slide hero-slide-2"></div>
        <div class="hero-slide hero-slide-3"></div>
      </div>

      <!-- Gradient vignette -->
      <div class="hero-vignette"></div>

      <!-- Sparkle decoration top-right -->
      <div class="hero-sparkle-tr" aria-hidden="true">✦ ✦</div>

      <!-- Slide dot indicators bottom-right -->
      <div class="hero-dots" id="hero-dots">
        <div class="hero-dot active" data-slide="0"></div>
        <div class="hero-dot" data-slide="1"></div>
        <div class="hero-dot" data-slide="2"></div>
      </div>

      <!-- Event spotlight card — anchored to bottom-left corner -->
      <div class="hero-event-card">
        <div class="hero-event-sparkle">✦</div>
        <h2 class="hero-event-title">${spotlight.name}</h2>
        <div class="hero-event-time">${spotlight.time}</div>
        <p class="hero-event-desc">${spotlight.description}</p>
        <a href="#/news/${spotlight.id}" class="hero-explore-btn">Explore</a>
        <div class="hero-event-sparkle-bl">✦</div>
      </div>

      <!-- Fade into page body -->
      <div class="hero-bottom-fade"></div>
    </section>
  `;
}

// ============================================================
//  SLIDESHOW ENGINE
// ============================================================
let _slideshowTimer = null;

function initHeroSlideshow() {
  if (_slideshowTimer) {
    clearInterval(_slideshowTimer);
    _slideshowTimer = null;
  }

  const slides = document.querySelectorAll('.hero-slide');
  const dots   = document.querySelectorAll('.hero-dot');
  if (!slides.length) return;

  let current = 0;

  function goTo(index) {
    slides[current].classList.remove('active');
    dots[current]?.classList.remove('active');
    current = (index + slides.length) % slides.length;
    slides[current].classList.add('active');
    dots[current]?.classList.add('active');
  }

  dots.forEach(dot => {
    dot.addEventListener('click', () => {
      goTo(parseInt(dot.dataset.slide));
      clearInterval(_slideshowTimer);
      _slideshowTimer = setInterval(() => goTo(current + 1), 5000);
    });
  });

  _slideshowTimer = setInterval(() => goTo(current + 1), 5000);
}

// ============================================================
//  PAGES
// ============================================================
function renderHomePage() {
  const featuredProducts = products.slice(0, 4);
  const upcomingEvents   = events.slice(0, 3);

  return `
    <div>
      ${renderHeroSection()}

      <section class="section-padding">
        <div class="container">
          <section class="mb-12 fade-up">
            <h2 class="section-title">Gather Your Gear!</h2>
            <p class="section-subtitle">
              Take a look at exclusive goblin gear and quests for your campaign!
            </p>
            <div class="product-grid">
              ${featuredProducts.map(renderProductCard).join('')}
            </div>
            <div class="mt-12 text-center">
              <a href="https://hobby-goblin-games.myshopify.com" target="_blank" rel="noopener noreferrer" class="glow-btn secondary">
                    <span>Visit Shop</span>
              </a>
            </div>
          </section>

          ${fancyDivider()}

          <section class="mt-12 fade-up">
            <h2 class="section-title">Upcoming Quests!</h2>
            <p class="section-subtitle">
              Join the Horde on our upcoming quests in the mystic realms. Whether you’re a beginner or an experienced hero, we can’t wait to welcome you into the Horde!
            </p>
            <div class="event-grid three-col">
              ${upcomingEvents.map(renderEventCardAsNews).join('')}
            </div>
            <div class="mt-12 text-center">
              ${glowButton('See All News', { href: '/news', variant: 'secondary' })}
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
      : products.filter(p => p.category === activeCategory);

  return `
    <section class="section-padding">
      <div class="container">
        <div class="page-intro">
          <h1>The Merchant's Guild</h1>
          <p>Peruse our collection of fine goods. From the heaviest polyhedral dice to the most intricate campaign settings.</p>
        </div>
        <div class="filters">
          ${categories.map(category => `
            <button class="filter-btn ${activeCategory === category ? 'active' : ''}" data-category="${category}">
              ${category}
            </button>
          `).join('')}
        </div>
        ${filteredProducts.length
          ? `<div class="product-grid">${filteredProducts.map(renderProductCard).join('')}</div>`
          : `<div class="text-center" style="padding:5rem 0;"><p class="font-heading" style="font-size:1.25rem;color:var(--dusty);">The merchant's shelves are empty for this category.</p></div>`
        }
      </div>
    </section>
  `;
}

function renderProductPage(id) {
  const product = products.find(p => p.id === id);
  if (!product) {
    return `<div class="not-found"><div><h1>Item Not Found</h1><p>This artifact has been lost to the void.</p>${glowButton('Return to Shop', { href: '/shop' })}</div></div>`;
  }

  return `
    <section class="section-padding">
      <div class="container">
        <nav class="breadcrumbs">
          <a href="#/shop">Shop</a><span>›</span>
          <span>${product.category}</span><span>›</span>
          <span class="current">${product.name}</span>
        </nav>
        <div class="product-detail-grid">
          <div class="product-detail-image fade-up"><span>HGG Artifact</span></div>
          <div class="fade-up">
            <div class="product-category-detail">${product.category}</div>
            <h1 class="product-title-detail">${product.name}</h1>
            <div class="product-price-detail">$${product.price.toFixed(2)}</div>
            <div class="info-box">
              <h3>🛡️ Item Description</h3>
              <p>${product.description}</p>
            </div>
            <div style="padding-top:2rem;border-top:1px solid rgba(140,84,121,0.3);">
              ${glowButton('Add to Cart', { id: 'add-to-cart-btn', className: 'w-full' })}
              <p id="cart-success" class="success-text" style="display:none;">The item has been secured in your bag of holding.</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  `;
}

function renderNewsPage() {
  return `
    <section class="section-padding">
      <div class="container">
        <div class="page-intro">
          <h1>News</h1>
          <p>Stay updated for new quests, products, workshops, and events coming up for the Horde!</p>
        </div>
        <div class="event-grid two-col">
          ${events.map(renderEventCardAsNews).join('')}
        </div>
      </div>
    </section>
  `;
}

function renderNewsDetailPage(id) {
  const event = events.find(e => e.id === id);
  if (!event) {
    return `<div class="not-found"><div><h1>Post Not Found</h1><p>This news update has faded into myth.</p>${glowButton('View All News', { href: '/news' })}</div></div>`;
  }

  const fullDate = formatFullDate(event.date);

  return `
    <section class="section-padding">
      <div class="container-narrow">
        <nav class="breadcrumbs">
          <a href="#/news">News</a><span>›</span>
          <span class="current">${event.name}</span>
        </nav>

        <article class="event-detail-card fade-up">
          <div class="event-detail-header">
            <div class="event-badge">${event.type}</div>
            <h1 class="event-title-detail">${event.name}</h1>
          </div>

          <div style="padding:2rem;">
            <div class="event-detail-meta" style="margin-bottom:2rem;">
              <div class="meta-card">
                <div class="meta-icon">📅</div>
                <div>
                  <div class="meta-title">Date</div>
                  <div class="meta-text">${fullDate}</div>
                </div>
              </div>

              <div class="meta-card">
                <div class="meta-icon"></div>
                <div>
                  <div class="meta-title">Time</div>
                  <div class="meta-text">${event.time}</div>
                </div>
              </div>
            </div>

            <div>
              <h2 class="font-display" style="font-size:2rem;margin-bottom:1rem;border-bottom:1px solid rgba(140,84,121,0.3);padding-bottom:0.5rem;">
                Details
              </h2>
              <p style="font-size:1.15rem;line-height:1.75;color:var(--plum-mid);">
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
    <section class="about-page fantasy-about-page">
      <div class="about-bg-glow about-glow-1"></div>
      <div class="about-bg-glow about-glow-2"></div>

      <!-- floating stars -->
      <span class="about-star star-1">✦</span>
      <span class="about-star star-2">✦</span>
      <span class="about-star star-3">✦</span>
      <span class="about-star star-4">✦</span>
      <span class="about-star star-5">✦</span>
      <span class="about-star star-6">✦</span>
      <span class="about-star star-7">✦</span>
      <span class="about-star star-8">✦</span>

      <div class="container about-page-inner">
        <!-- top intro -->
        <div class="about-top-section fade-up">
          <h1 class="about-main-title">Our Tenets</h1>

          <p class="about-philosophy-text">
            At Hobby Goblin Games, we believe games are based played with a strong community. As the Horde,
            we strive to create spaces where community can flourish for the TTRPG community. We create content
            that is narrative, community, and creatively-driven.
          </p>

          <p class="about-philosophy-text">
            As a team, we believe that art and stories are made best by real people in our community. As such, we
            can assure that all of our products are entirely goblin-made, and do not use Generative AI. Our artists
            are a core part of our community, and we couldn’t do this without them!
          </p>
        </div>

        <!-- tale section -->
        <div class="about-tale-grid fade-up">
          <div class="about-image-panel">
            <div class="about-image-star">✦</div>
            <div class="about-image-placeholder">INSERT IMAGE</div>
          </div>

          <div class="about-tale-card">
            <div class="about-card-frame">
              <h2 class="about-card-title">Our Tale</h2>

              <p class="about-card-text">
                  Hobby Goblin Games is the happy product of two nerds whose ambitious designs and plethora of innovative tactics and tools became too fun not 
                  to share. With the goal to empower DMs and players alike as they embark on their latest adventures, Hobby Goblin Games offers a world of unique
                  possibilitiesto enhance your D&D experience.
              </p>

              <p class="about-card-text">
                  The founders are experienced GMs whose passion for their craft comes through in each subclass, lineage, world, and monster.  
                  Each new possibility they create has been drafted, tested, and perfected to become the makings of unique, balanced, and---most 
                  importantly---fun role playing experiences for fans of both 5e and 5.5e.
              </p>

              <p class="about-card-quote">
                Since our founding in 2023, we have attended a half dozen conventions with plans for more, including Dragonsteel Nexus, 
                The Dead Wars, and Storycon (Find us at our next convention by keeping an eye on the News page!). We have partnered with 
                amazing creators throughout the industry, and we are so excited to continue our journey of innovation and invention with you!
              </p>

              <p class="about-card-quote">
                Join the Horde!
              </p>

              <div class="about-card-divider">
                <span>✦ ✦ ✦</span>
                <div class="about-card-line"></div>
                <span>✦ ✦ ✦</span>
              </div>
            </div>
          </div>
        </div>

        <!-- team -->
        <div class="about-team-section fade-up">
          <h2 class="about-team-title">Meet the Team</h2>

          <div class="about-team-grid">
            <div class="team-member-card">
              <div class="team-member-image">
            <img src="Pic/Tyson.jpg" alt="Tyson" />
              </div>
              <h3>Tyson</h3>
              <p>
                As co-founder of Hobby Goblin Games, Tyson has made it his job to get lost in fantasy worlds and bring back stories and treasures. He loves storytelling, crafting, and learning new skills, as well as his wife and two cats. 
              </p>
            </div>

            <div class="team-member-card">
              <div class="team-member-image">
            <img src="Pic/LaRea.png" alt="LaRea" />
              </div>
              <h3>LaRea</h3>
              <p>
                LaRea loves to immerse herself in other worlds, and as the chief editor for Hobby Goblin Games, she has the privileged to do just that. A mother, editor, writer, and full-time nerd, she is happy to dive into written adventures and make them shine.
              </p>
            </div>

            <div class="team-member-card">
              <div class="team-member-image">INSERT IMAGE</div>
              <h3>Lucas Williams</h3>
              <p>
                Lucas Williams is a designer for and founding member of Hobby Goblin Games. He's played and ran a lot of D&D games over the years, but also has a background in dog care and audio engineering. He enjoys explosions, the supernatural, obsessing over his cats, and coming up with nicknames for dogs that don't belong to him.
              </p>
            </div>

            <div class="team-member-card">
              <div class="team-member-image">INSERT IMAGE</div>
              <h3>Samuel P. Ericksen</h3>
              <p>
                Samuel P. Ericksen is a designer for and co-founder of Hobby Goblin Games. He is a forever DM (by choice), real-life bard, writer, and family man. It’s really easy to get him to ramble about music theory, niche video game lore, and animation.
              </p>
            </div>

            <div class="team-member-card">
              <div class="team-member-image">INSERT IMAGE</div>
              <h3>John Smith</h3>
              <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et
              </p>
            </div>
          </div>
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
          <p>Seek us out in the physical realm, or send a message through the ether. We are always ready to assist a fellow traveler.</p>
        </div>
        <div class="contact-grid">
          <div class="contact-card fade-up">
            <h2 class="font-display" style="font-size:2rem;margin-bottom:2rem;">The Guildhall</h2>
            <div class="contact-item">
              <div class="contact-icon"></div>
              <div><h3>Speaking Stone</h3><p>(210)596-3366</p></div>
            </div>
            <div class="contact-item" style="margin-bottom:0;">
              <div class="contact-icon"></div>
              <div><h3>Electronic Missives</h3><p>hobbygoblingamesrpg@gmail.com</p></div>
            </div>
          </div>

          <div class="contact-form-card fade-up">
            <h2 class="font-display" style="font-size:2rem;margin-bottom:1.5rem;">Dispatch a Message</h2>
            <form id="contact-form">
              <div style="margin-bottom:1rem;">
                <label for="name">Your Name (or Title)</label>
                <input id="name" type="text" placeholder="e.g., Gandalf the Grey" />
              </div>
              <div style="margin-bottom:1rem;">
                <label for="email">Return Address (Email)</label>
                <input id="email" type="email" placeholder="wizard@maiar.com" />
              </div>
              <div style="margin-bottom:1.25rem;">
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
  return `<div class="not-found"><div><h1>Page Not Found</h1><p>The path you seek has vanished into the mist.</p>${glowButton('Return Home', { href: '/' })}</div></div>`;
}

// ============================================================
//  ADMIN PAGES
// ============================================================
function renderAdminLoginPage() {
  return `
    <section class="section-padding">
      <div class="container-narrow">
        <div class="admin-login-card fade-up">
          <h1 class="admin-title">Admin Portal</h1>
          <p class="admin-subtitle">Enter your credentials to access the control chamber</p>
          
          <form id="admin-login-form" class="admin-form">
            <div class="form-group">
              <label for="admin-username">Username</label>
              <input id="admin-username" type="text" placeholder="Enter username" required />
            </div>
            <div class="form-group">
              <label for="admin-password">Password</label>
              <input id="admin-password" type="password" placeholder="Enter password" required />
            </div>
            <div id="admin-error" class="admin-error" style="display:none;"></div>
            ${glowButton('Access Portal', { type: 'submit', className: 'w-full' })}
          </form>
        </div>
      </div>
    </section>
  `;
}

function renderAdminDashboard() {
  const currentEvents = loadEventsFromStorage();
  
  return `
    <section class="section-padding">
      <div class="container">
        <div class="admin-header">
          <h1 class="admin-title">Admin Dashboard</h1>
          <button id="admin-logout-btn" class="glow-btn secondary">Logout</button>
        </div>

        <div class="admin-tabs">
          <button class="admin-tab-btn active" data-tab="manage">Manage Events</button>
          <button class="admin-tab-btn" data-tab="add">Add New Event</button>
        </div>

        <!-- Manage Events Tab -->
        <div id="manage-tab" class="admin-tab-content active">
          <h2>Current Events</h2>
          <div class="admin-events-list">
            ${currentEvents.map(event => `
              <div class="admin-event-item">
                <div class="admin-event-info">
                  <h3>${event.name}</h3>
                  <p><strong>Date:</strong> ${event.date}</p>
                  <p><strong>Time:</strong> ${event.time}</p>
                  <p><strong>Type:</strong> ${event.type}</p>
                  <p><strong>Description:</strong> ${event.description}</p>
                </div>
                <div class="admin-event-actions">
                  <button class="admin-edit-btn" data-event-id="${event.id}">Edit</button>
                  <button class="admin-delete-btn" data-event-id="${event.id}">Delete</button>
                </div>
              </div>
            `).join('')}
          </div>
        </div>

        <!-- Add Event Tab -->
        <div id="add-tab" class="admin-tab-content">
          <h2>Add New Event</h2>
          <form id="admin-event-form" class="admin-form">
            <div class="form-group">
              <label for="event-name">Event Name</label>
              <input id="event-name" type="text" placeholder="Enter event name" required />
            </div>
            <div class="form-group">
              <label for="event-date">Date</label>
              <input id="event-date" type="date" required />
            </div>
            <div class="form-group">
              <label for="event-time">Time</label>
              <input id="event-time" type="text" placeholder="e.g., 6:00 PM - 10:00 PM" required />
            </div>
            <div class="form-group">
              <label for="event-type">Type</label>
              <select id="event-type" required>
                <option value="">Select type</option>
                <option value="RPG">RPG</option>
                <option value="Workshop">Workshop</option>
                <option value="Tournament">Tournament</option>
                <option value="Casual">Casual</option>
                <option value="Showcase">Showcase</option>
              </select>
            </div>
            <div class="form-group">
              <label for="event-description">Description</label>
              <textarea id="event-description" rows="5" placeholder="Enter event description" required></textarea>
            </div>
            <div id="form-message" class="admin-message" style="display:none;"></div>
            ${glowButton('Create Event', { type: 'submit', className: 'w-full' })}
          </form>
        </div>

        <!-- Edit Modal -->
        <div id="edit-modal" class="admin-modal" style="display:none;">
          <div class="admin-modal-content">
            <button id="modal-close" class="modal-close">✕</button>
            <h2>Edit Event</h2>
            <form id="admin-edit-form" class="admin-form">
              <input type="hidden" id="edit-event-id" />
              <div class="form-group">
                <label for="edit-event-name">Event Name</label>
                <input id="edit-event-name" type="text" required />
              </div>
              <div class="form-group">
                <label for="edit-event-date">Date</label>
                <input id="edit-event-date" type="date" required />
              </div>
              <div class="form-group">
                <label for="edit-event-time">Time</label>
                <input id="edit-event-time" type="text" required />
              </div>
              <div class="form-group">
                <label for="edit-event-type">Type</label>
                <select id="edit-event-type" required>
                  <option value="RPG">RPG</option>
                  <option value="Workshop">Workshop</option>
                  <option value="Tournament">Tournament</option>
                  <option value="Casual">Casual</option>
                  <option value="Showcase">Showcase</option>
                </select>
              </div>
              <div class="form-group">
                <label for="edit-event-description">Description</label>
                <textarea id="edit-event-description" rows="5" required></textarea>
              </div>
              <div class="form-buttons">
                ${glowButton('Save Changes', { type: 'submit', className: 'w-full' })}
                <button type="button" id="cancel-edit" class="glow-btn secondary w-full">Cancel</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  `;
}

// ============================================================
//  ANNOUNCEMENT POPUP
// ============================================================
function renderAnnouncementPopup() {
  const seen = sessionStorage.getItem('hobbyGoblin_announcementSeen');
  if (seen) { announcementRoot.innerHTML = ''; return; }

  setTimeout(() => {
    if (sessionStorage.getItem('hobbyGoblin_announcementSeen')) return;

    announcementRoot.innerHTML = `
      <div class="popup-overlay-wrap" id="popup-wrap">
        <div class="popup-backdrop" id="popup-backdrop"></div>
        <div class="popup-card">
          <button class="popup-close" id="popup-close" aria-label="Close">✕</button>
          <div class="popup-icon">🎲</div>
          <h2 class="popup-title">Friday Night Campaign</h2>
          <p class="popup-text">A new adventure begins! Join our ongoing beginner-friendly RPG campaign. Pre-generated characters available.</p>
          <div class="popup-actions">
            <a href="#/news/e1" class="glow-btn primary" id="popup-learn-more">Learn More</a>
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

// ============================================================
//  ROUTER
// ============================================================
function renderPage(route) {
  if (route === '/admin/login') return renderAdminLoginPage();
  if (route === '/admin' && isAdminLoggedIn) return renderAdminDashboard();
  if (route === '/admin' && !isAdminLoggedIn) return renderAdminLoginPage();
  
  if (route === '/')                return renderHomePage();
  if (route === '/news')            return renderNewsPage();
  if (route.startsWith('/news/'))   return renderNewsDetailPage(route.split('/')[2]);
  if (route === '/about')           return renderAboutPage();
  if (route === '/contact')         return renderContactPage();
  return renderNotFoundPage();
}

// ============================================================
//  APP RENDER
// ============================================================
function renderApp() {
  const route = getRoute();
  const isAdminPage = route.startsWith('/admin');

  app.innerHTML = `
    <div class="app-shell">
      ${!isAdminPage ? renderNavbar(route) : ''}
      <main>
        ${renderPage(route)}
      </main>
      ${!isAdminPage ? renderFooter() : ''}
    </div>
  `;

  attachEvents();
  if (!isAdminPage) {
    updateScrolledNavbar();
    initHeroSlideshow();
  }
}

// ============================================================
//  EVENT HANDLERS
// ============================================================
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
    contactForm.addEventListener('submit', e => {
      e.preventDefault();
      alert('Message sent... by fantasy standards. Connect this form to Formspree, Netlify Forms, or your backend.');
      contactForm.reset();
    });
  }

  // ============================================================
  //  ADMIN EVENT HANDLERS
  // ============================================================
  
  // Admin Login
  const adminLoginForm = document.getElementById('admin-login-form');
  if (adminLoginForm) {
    adminLoginForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const username = document.getElementById('admin-username').value;
      const password = document.getElementById('admin-password').value;
      
      if (adminLogin(username, password)) {
        navigate('/admin');
      } else {
        const errorDiv = document.getElementById('admin-error');
        errorDiv.textContent = 'Invalid username or password';
        errorDiv.style.display = 'block';
      }
    });
  }

  // Admin Logout
  const logoutBtn = document.getElementById('admin-logout-btn');
  if (logoutBtn) {
    logoutBtn.addEventListener('click', () => {
      adminLogout();
      navigate('/');
    });
  }

  // Admin Tab Navigation
  document.querySelectorAll('.admin-tab-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const tab = btn.dataset.tab;
      document.querySelectorAll('.admin-tab-btn').forEach(b => b.classList.remove('active'));
      document.querySelectorAll('.admin-tab-content').forEach(c => c.classList.remove('active'));
      btn.classList.add('active');
      document.getElementById(`${tab}-tab`).classList.add('active');
    });
  });

  // Add Event Form
  const eventForm = document.getElementById('admin-event-form');
  if (eventForm) {
    eventForm.addEventListener('submit', (e) => {
      e.preventDefault();
      
      const newEvent = {
        id: 'e' + (loadEventsFromStorage().length + 1),
        name: document.getElementById('event-name').value,
        date: document.getElementById('event-date').value,
        time: document.getElementById('event-time').value,
        type: document.getElementById('event-type').value,
        description: document.getElementById('event-description').value
      };

      const currentEvents = loadEventsFromStorage();
      currentEvents.push(newEvent);
      saveEventsToStorage(currentEvents);
      events.splice(0, events.length, ...currentEvents);

      const msgDiv = document.getElementById('form-message');
      msgDiv.textContent = 'Event created successfully!';
      msgDiv.style.display = 'block';
      msgDiv.style.color = '#90EE90';
      
      eventForm.reset();
      setTimeout(() => {
        msgDiv.style.display = 'none';
      }, 3000);
    });
  }

  // Edit Event Buttons
  document.querySelectorAll('.admin-edit-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const eventId = btn.dataset.eventId;
      const eventToEdit = loadEventsFromStorage().find(e => e.id === eventId);
      
      if (eventToEdit) {
        document.getElementById('edit-event-id').value = eventToEdit.id;
        document.getElementById('edit-event-name').value = eventToEdit.name;
        document.getElementById('edit-event-date').value = eventToEdit.date;
        document.getElementById('edit-event-time').value = eventToEdit.time;
        document.getElementById('edit-event-type').value = eventToEdit.type;
        document.getElementById('edit-event-description').value = eventToEdit.description;
        
        document.getElementById('edit-modal').style.display = 'flex';
      }
    });
  });

  // Close Edit Modal
  const modalClose = document.getElementById('modal-close');
  if (modalClose) {
    modalClose.addEventListener('click', () => {
      document.getElementById('edit-modal').style.display = 'none';
    });
  }

  const cancelEdit = document.getElementById('cancel-edit');
  if (cancelEdit) {
    cancelEdit.addEventListener('click', () => {
      document.getElementById('edit-modal').style.display = 'none';
    });
  }

  // Save Edit Form
  const editForm = document.getElementById('admin-edit-form');
  if (editForm) {
    editForm.addEventListener('submit', (e) => {
      e.preventDefault();
      
      const eventId = document.getElementById('edit-event-id').value;
      const currentEvents = loadEventsFromStorage();
      const eventIndex = currentEvents.findIndex(e => e.id === eventId);

      if (eventIndex !== -1) {
        currentEvents[eventIndex] = {
          id: eventId,
          name: document.getElementById('edit-event-name').value,
          date: document.getElementById('edit-event-date').value,
          time: document.getElementById('edit-event-time').value,
          type: document.getElementById('edit-event-type').value,
          description: document.getElementById('edit-event-description').value
        };

        saveEventsToStorage(currentEvents);
        events.splice(0, events.length, ...currentEvents);
        
        document.getElementById('edit-modal').style.display = 'none';
        renderApp();
      }
    });
  }

  // Delete Event Buttons
  document.querySelectorAll('.admin-delete-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const eventId = btn.dataset.eventId;
      
      if (confirm('Are you sure you want to delete this event?')) {
        const currentEvents = loadEventsFromStorage();
        const updatedEvents = currentEvents.filter(e => e.id !== eventId);
        saveEventsToStorage(updatedEvents);
        events.splice(0, events.length, ...updatedEvents);
        
        renderApp();
      }
    });
  });
}

function updateScrolledNavbar() {
  const header = document.getElementById('site-header');
  if (!header) return;
  header.classList.toggle('scrolled', window.scrollY > 20);
}

// ============================================================
//  INIT
// ============================================================
window.addEventListener('scroll', updateScrolledNavbar);

window.addEventListener('hashchange', () => {
  renderApp();
  window.scrollTo({ top: 0, behavior: 'smooth' });
});

window.addEventListener('DOMContentLoaded', () => {
  renderApp();
  renderAnnouncementPopup();
});