
import React, { useEffect, useMemo, useState } from "react";
import "./App.css";

/* =========================================================
   TRAVELORA - LUXURY TRAVEL BOOKING WEBSITE
   Complete React application in one JSX file.
   College demonstration project using localStorage.
========================================================= */

const DESTINATIONS = [
  { id: 1, name: "Maldives", country: "Indian Ocean", category: "Beach", price: 45999, rating: 4.9, image: "https://images.unsplash.com/photo-1514282401047-d79a71a590e8?w=1000", description: "Experience crystal-clear waters, beautiful islands and unforgettable tropical escapes." },
  { id: 2, name: "Bali", country: "Indonesia", category: "Beach", price: 35999, rating: 4.9, image: "https://images.unsplash.com/photo-1537996194471-e657df975ab4?w=1000", description: "Discover tropical beaches, ancient temples and beautiful island landscapes." },
  { id: 3, name: "Paris", country: "France", category: "City", price: 45999, rating: 4.8, image: "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?w=1000", description: "Explore romantic streets, iconic architecture and wonderful French culture." },
  { id: 4, name: "Switzerland", country: "Europe", category: "Mountain", price: 59999, rating: 4.9, image: "https://images.unsplash.com/photo-1531366936337-7c912a4589a7?w=1000", description: "Enjoy spectacular mountains, beautiful lakes and scenic landscapes." },
  { id: 5, name: "Dubai", country: "UAE", category: "City", price: 29999, rating: 4.8, image: "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=1000", description: "Discover modern architecture, shopping destinations and desert experiences." },
  { id: 6, name: "Goa", country: "India", category: "Beach", price: 8999, rating: 4.7, image: "https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?w=1000", description: "Relax on golden beaches and enjoy beautiful coastal experiences." },
  { id: 7, name: "Manali", country: "India", category: "Mountain", price: 11999, rating: 4.8, image: "https://images.unsplash.com/photo-1626621341517-bbf3d9990a23?w=1000", description: "Explore Himalayan scenery, mountain views and peaceful surroundings." },
  { id: 8, name: "Singapore", country: "Asia", category: "City", price: 32999, rating: 4.8, image: "https://images.unsplash.com/photo-1525625293386-3f8f99389edd?w=1000", description: "Discover futuristic gardens, city attractions and vibrant neighbourhoods." },
  { id: 9, name: "Tokyo", country: "Japan", category: "City", price: 49999, rating: 4.9, image: "https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?w=1000", description: "Experience Japanese culture, modern architecture and exciting city life." },
  { id: 10, name: "Kerala", country: "India", category: "Nature", price: 9999, rating: 4.8, image: "https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?w=1000", description: "Enjoy peaceful backwaters, green landscapes and beautiful nature." },
  { id: 11, name: "London", country: "United Kingdom", category: "City", price: 54999, rating: 4.7, image: "https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?w=1000", description: "Explore historic landmarks, museums and beautiful city streets." },
  { id: 12, name: "Thailand", country: "Asia", category: "Beach", price: 24999, rating: 4.8, image: "https://images.unsplash.com/photo-1528181304800-259b08848526?w=1000", description: "Discover tropical islands, beautiful beaches and exciting experiences." },
  { id: 13, name: "New York", country: "USA", category: "City", price: 64999, rating: 4.8, image: "https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?w=1000", description: "Discover famous landmarks and the iconic New York skyline." },
  { id: 14, name: "Ooty", country: "India", category: "Nature", price: 7999, rating: 4.7, image: "https://images.unsplash.com/photo-1597074866923-dc0589150358?w=1000", description: "Enjoy green hills, tea gardens and peaceful surroundings." },
  { id: 15, name: "Jaipur", country: "India", category: "Culture", price: 9999, rating: 4.7, image: "https://images.unsplash.com/photo-1599661046827-dacff0c0f09a?w=1000", description: "Explore royal palaces, historic forts and colourful culture." }
];

const PACKAGES = [
  { id: 1, name: "Tropical Paradise", destination: "Maldives", days: "5 Days / 4 Nights", price: 45999 },
  { id: 2, name: "Island Escape", destination: "Bali", days: "6 Days / 5 Nights", price: 35999 },
  { id: 3, name: "Romantic Europe", destination: "Paris", days: "5 Days / 4 Nights", price: 45999 },
  { id: 4, name: "Mountain Retreat", destination: "Switzerland", days: "7 Days / 6 Nights", price: 59999 },
  { id: 5, name: "Dubai Luxury", destination: "Dubai", days: "4 Days / 3 Nights", price: 29999 },
  { id: 6, name: "Indian Getaway", destination: "Goa", days: "3 Days / 2 Nights", price: 8999 }
];

const DEFAULT_OFFERS = [
  { id: 1, title: "Anniversary Special", code: "LOVE35", discount: 35, description: "Special savings on selected romantic holidays." },
  { id: 2, title: "Honeymoon Escape", code: "HONEY30", discount: 30, description: "Make your honeymoon unforgettable." },
  { id: 3, title: "Festival Celebration", code: "FEST25", discount: 25, description: "Celebrate your holidays with exciting offers." }
];

const ADMIN_ACCOUNT = {
  id: "travelora-admin",
  name: "Travelora Administrator",
  email: "admin@travelora.com",
  password: "admin123",
  role: "Admin"
};

const money = value =>
  new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0
  }).format(Number(value) || 0);

const readStorage = (key, fallback) => {
  try {
    const stored = localStorage.getItem(key);
    return stored ? JSON.parse(stored) : fallback;
  } catch {
    return fallback;
  }
};

/* =========================================================
   SHARED COMPONENTS
========================================================= */

function PageBanner({ title, subtitle }) {
  return (
    <section className="page-banner">
      <p className="eyebrow">DISCOVER TRAVELORA</p>
      <h1>{title}</h1>
      <p>{subtitle}</p>
    </section>
  );
}

function EmptyState({ title, description, action, onAction }) {
  return (
    <div className="empty-state">
      <div className="empty-icon">✦</div>
      <h2>{title}</h2>
      <p>{description}</p>
      {action && <button className="btn" onClick={onAction}>{action}</button>}
    </div>
  );
}

function DestinationCard({ destination, saved, onSave, onExplore, canSave }) {
  return (
    <article className="destination-card">
      <div className="destination-image">
        <img src={destination.image} alt={destination.name} loading="lazy" />
        {canSave && (
          <button
            className={`heart-button ${saved ? "saved" : ""}`}
            onClick={() => onSave(destination.id)}
            aria-label="Toggle wishlist"
          >
            {saved ? "♥" : "♡"}
          </button>
        )}
        <span className="category-tag">{destination.category}</span>
      </div>

      <div className="destination-info">
        <div className="destination-heading">
          <h3>{destination.name}</h3>
          <span className="rating">★ {destination.rating}</span>
        </div>
        <p className="destination-country">{destination.country}</p>
        <div className="destination-bottom">
          <div>
            <strong>{money(destination.price)}</strong>
            <small> / person</small>
          </div>
          <button className="btn btn-small" onClick={() => onExplore(destination)}>
            Explore
          </button>
        </div>
      </div>
    </article>
  );
}

function Navbar({ user, unreadCount, navigate, logout }) {
  const [menuOpen, setMenuOpen] = useState(false);

  const links = user?.role === "Admin"
    ? [
        ["admin", "Dashboard"],
        ["destinations", "Destinations"],
        ["offers", "Offers"]
      ]
    : [
        ["home", "Home"],
        ["destinations", "Destinations"],
        ["packages", "Packages"],
        ["offers", "Offers"],
        ["activities", "Experiences"],
        ["wishlist", "Wishlist"],
        ["trips", "My Trips"]
      ];

  const go = page => {
    setMenuOpen(false);
    navigate(page);
  };

  return (
    <>
      <div className="topbar">
        LUXURY JOURNEYS · BEAUTIFUL DESTINATIONS · TRAVELORA
      </div>

      <header className="navbar">
        <button className="brand" onClick={() => go("home")}>
          Travelora<span> ✦</span>
        </button>

        <nav className={`nav-links ${menuOpen ? "show-menu" : ""}`}>
          {links.map(([page, label]) => (
            <button key={page} onClick={() => go(page)}>{label}</button>
          ))}
        </nav>

        <div className="nav-actions">
          {user?.role === "User" && (
            <button
              className="notification-button"
              onClick={() => go("notifications")}
              title="Notifications"
            >
              ♧
              {unreadCount > 0 && <span className="notification-count">{unreadCount}</span>}
            </button>
          )}

          {user ? (
            <>
              <button
                className="profile-link"
                onClick={() => go(user.role === "Admin" ? "admin" : "profile")}
              >
                {user.name.split(" ")[0]}
              </button>
              <button className="btn btn-small" onClick={logout}>Logout</button>
            </>
          ) : (
            <>
              <button onClick={() => go("login")}>Login</button>
              <button className="btn btn-small" onClick={() => go("register")}>Register</button>
            </>
          )}

          <button
            className="menu-button"
            onClick={() => setMenuOpen(v => !v)}
            aria-label="Toggle menu"
          >
            ☰
          </button>
        </div>
      </header>
    </>
  );
}

function Footer({ navigate }) {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-brand">
          <h2>Travelora<span> ✦</span></h2>
          <p className="footer-tagline">One Platform. Every Journey.</p>
          <p>
            Discover extraordinary destinations and create
            unforgettable memories with Travelora.
          </p>
        </div>

        <div>
          <h4>EXPLORE</h4>
          <button onClick={() => navigate("home")}>Home</button>
          <button onClick={() => navigate("destinations")}>Destinations</button>
          <button onClick={() => navigate("packages")}>Packages</button>
          <button onClick={() => navigate("offers")}>Special Offers</button>
          <button onClick={() => navigate("activities")}>Experiences</button>
        </div>

        <div>
          <h4>MY ACCOUNT</h4>
          <button onClick={() => navigate("profile")}>My Profile</button>
          <button onClick={() => navigate("trips")}>My Bookings</button>
          <button onClick={() => navigate("wishlist")}>Wishlist</button>
          <button onClick={() => navigate("notifications")}>Notifications</button>
          <button onClick={() => navigate("reviews")}>Reviews</button>
        </div>

        <div>
          <h4>CONTACT</h4>
          <p>Email: support@travelora.example</p>
          <p>Travel beyond the ordinary.</p>
          <p className="social-text">Instagram · Facebook · YouTube</p>
        </div>
      </div>

      <div className="footer-bottom">
        <p>© {new Date().getFullYear()} Travelora. All rights reserved.</p>
        <p>One Platform. Every Journey.</p>
      </div>
    </footer>
  );
}

/* =========================================================
   HOME PAGE
========================================================= */

function HomePage({ navigate, search, setSearch, destinations }) {
  const featured = destinations.slice(0, 6);

  return (
    <>
      <section className="hero">
        <div className="hero-content">
          <p className="eyebrow">DISCOVER THE EXTRAORDINARY</p>
          <h1>Travel beyond<br />the ordinary.</h1>
          <p>
            Discover beautiful destinations, exceptional stays
            and unforgettable experiences with Travelora.
          </p>
          <button className="btn" onClick={() => navigate("destinations")}>
            Explore Destinations →
          </button>

          <div className="hero-search">
            <input
              type="search"
              placeholder="Where would you like to go?"
              value={search}
              onChange={e => setSearch(e.target.value)}
              onKeyDown={e => e.key === "Enter" && navigate("destinations")}
            />
            <button className="btn" onClick={() => navigate("destinations")}>Search</button>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="section-heading">
            <p className="eyebrow">EXPLORE THE WORLD</p>
            <h2>Popular Destinations</h2>
            <p>Find beautiful places for your next adventure.</p>
          </div>

          <div className="featured-scroll">
            <div className="featured-track">
              {[...featured, ...featured].map((d, index) => (
                <article className="featured-card" key={`${d.id}-${index}`}>
                  <img src={d.image} alt={d.name} />
                  <div>
                    <h3>{d.name}</h3>
                    <p>{d.country}</p>
                    <strong>{money(d.price)}</strong>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="section light-section">
        <div className="container">
          <div className="section-heading">
            <p className="eyebrow">THE TRAVELORA DIFFERENCE</p>
            <h2>Travel Made Extraordinary</h2>
          </div>

          <div className="features-grid">
            <article className="feature-card">
              <span>✦</span>
              <h3>Handpicked Destinations</h3>
              <p>Explore carefully selected places around the world.</p>
            </article>
            <article className="feature-card">
              <span>◇</span>
              <h3>Easy Booking</h3>
              <p>Manage your reservations through one convenient platform.</p>
            </article>
            <article className="feature-card">
              <span>♧</span>
              <h3>Memorable Experiences</h3>
              <p>Discover journeys that create lasting memories.</p>
            </article>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="section-heading">
            <p className="eyebrow">CURATED FOR YOU</p>
            <h2>Featured Escapes</h2>
          </div>

          <div className="destination-grid">
            {featured.map(d => (
              <article className="destination-card" key={d.id}>
                <img src={d.image} alt={d.name} />
                <div className="destination-info">
                  <h3>{d.name}</h3>
                  <p>{d.country}</p>
                  <div className="destination-bottom">
                    <strong>{money(d.price)}</strong>
                    <button className="btn btn-small" onClick={() => navigate("destinations")}>
                      Explore
                    </button>
                  </div>
                </div>
              </article>
            ))}
          </div>

          <div className="center-button">
            <button className="btn btn-outline" onClick={() => navigate("destinations")}>
              View All Destinations
            </button>
          </div>
        </div>
      </section>

      <section className="cta-section">
        <p className="eyebrow">YOUR NEXT ADVENTURE</p>
        <h2>Make the world your destination.</h2>
        <p>Discover your next unforgettable journey with Travelora.</p>
        <button className="btn" onClick={() => navigate("destinations")}>
          Start Exploring →
        </button>
      </section>
    </>
  );
}

/* =========================================================
   DESTINATIONS AND DETAILS
========================================================= */

function DestinationsPage({
  destinations, search, setSearch, category, setCategory,
  wishlist, toggleWishlist, openDestination, canSave
}) {
  const filtered = useMemo(() => destinations.filter(d => {
    const matchesSearch = `${d.name} ${d.country}`.toLowerCase().includes(search.toLowerCase());
    const matchesCategory = category === "All" || d.category === category;
    return matchesSearch && matchesCategory;
  }), [destinations, search, category]);

  return (
    <>
      <PageBanner title="Explore Destinations" subtitle="Discover the places you've always wanted to visit." />
      <main className="container page-content">
        <div className="filter-bar">
          <input
            type="search"
            placeholder="Search destination or country..."
            value={search}
            onChange={e => setSearch(e.target.value)}
          />
          <select value={category} onChange={e => setCategory(e.target.value)}>
            {["All", "Beach", "City", "Mountain", "Nature", "Culture"].map(c => (
              <option key={c} value={c}>{c}</option>
            ))}
          </select>
        </div>

        {filtered.length ? (
          <div className="destination-grid">
            {filtered.map(d => (
              <DestinationCard
                key={d.id}
                destination={d}
                saved={wishlist.includes(d.id)}
                onSave={toggleWishlist}
                onExplore={openDestination}
                canSave={canSave}
              />
            ))}
          </div>
        ) : (
          <EmptyState
            title="No destinations found"
            description="Try a different search or category."
            action="Clear Filters"
            onAction={() => { setSearch(""); setCategory("All"); }}
          />
        )}
      </main>
    </>
  );
}

function DetailsPage({ destination, onBook, onBack }) {
  if (!destination) {
    return <EmptyState title="Destination not found" description="Please select a destination." action="Explore Destinations" onAction={onBack} />;
  }

  return (
    <>
      <PageBanner title={destination.name} subtitle={destination.country} />
      <main className="container page-content">
        <div className="details-layout">
          <img src={destination.image} alt={destination.name} />
          <div>
            <p className="eyebrow">{destination.category} ESCAPE</p>
            <h2>{destination.name}</h2>
            <p className="rating">★ {destination.rating} / 5</p>
            <p className="details-description">{destination.description}</p>
            <h3 className="details-price">{money(destination.price)} <small>/ person</small></h3>
            <button className="btn" onClick={() => onBook(destination)}>Book Now →</button>
            <button className="btn btn-outline details-back" onClick={onBack}>Back to Destinations</button>
          </div>
        </div>
      </main>
    </>
  );
}

/* =========================================================
   PACKAGES, OFFERS AND EXPERIENCES
========================================================= */

function PackagesPage({ destinations, openDestination }) {
  return (
    <>
      <PageBanner title="Travel Packages" subtitle="Discover thoughtfully selected travel experiences." />
      <main className="container page-content">
        <div className="destination-grid">
          {PACKAGES.map(p => {
            const destination = destinations.find(d => d.name === p.destination);
            return (
              <article className="package-card" key={p.id}>
                <img src={destination?.image} alt={p.name} />
                <div className="destination-info">
                  <p className="eyebrow">EXCLUSIVE PACKAGE</p>
                  <h3>{p.name}</h3>
                  <p>{p.destination} · {p.days}</p>
                  <div className="destination-bottom">
                    <strong>{money(p.price)}</strong>
                    <button className="btn btn-small" onClick={() => destination && openDestination(destination)}>
                      View Package
                    </button>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </main>
    </>
  );
}

function OffersPage({ offers }) {
  const copyCode = async code => {
    try {
      await navigator.clipboard.writeText(code);
      window.alert(`Coupon ${code} copied.`);
    } catch {
      window.alert(`Coupon code: ${code}`);
    }
  };

  return (
    <>
      <PageBanner title="Special Offers" subtitle="Make your next adventure more rewarding." />
      <main className="container page-content">
        <div className="offer-grid">
          {offers.map(o => (
            <article className="offer-card" key={o.id}>
              <p className="eyebrow">TRAVELORA EXCLUSIVE</p>
              <h2>{o.title}</h2>
              <div className="discount">{o.discount}% OFF</div>
              <p>{o.description}</p>
              <strong className="coupon-code">{o.code}</strong>
              <button className="btn btn-small" onClick={() => copyCode(o.code)}>Copy Coupon</button>
            </article>
          ))}
        </div>
      </main>
    </>
  );
}

function ActivitiesPage({ navigate }) {
  const activities = [
    ["🏝️", "Island Escapes", "Discover beautiful tropical islands.", "Maldives"],
    ["🏔️", "Mountain Adventures", "Explore spectacular mountain scenery.", "Switzerland"],
    ["🏛️", "Cultural Exploration", "Discover history, heritage and traditions.", "Jaipur"],
    ["🚤", "Water Experiences", "Enjoy unforgettable water adventures.", "Bali"],
    ["🌆", "City Experiences", "Discover famous attractions and landmarks.", "Dubai"],
    ["🌿", "Nature Escapes", "Relax in beautiful natural surroundings.", "Kerala"]
  ];

  return (
    <>
      <PageBanner title="Experiences" subtitle="Find experiences that make every journey special." />
      <main className="container page-content">
        <div className="features-grid">
          {activities.map(([icon, name, description, place]) => (
            <article className="feature-card" key={name}>
              <span>{icon}</span>
              <h3>{name}</h3>
              <p>{description}</p>
              <button className="btn btn-small" onClick={() => navigate("destinations", place)}>
                Explore {place}
              </button>
            </article>
          ))}
        </div>
      </main>
    </>
  );
}

/* =========================================================
   LOGIN AND REGISTRATION
========================================================= */

function AuthPage({ mode, form, setForm, onSubmit, switchMode, error }) {
  const registering = mode === "register";

  return (
    <main className="auth-section">
      <div className="auth-card">
        <div className="auth-brand">Travelora<span> ✦</span></div>
        <p className="eyebrow">YOUR JOURNEY STARTS HERE</p>
        <h1>{registering ? "Create Your Account" : "Welcome Back"}</h1>
        <p className="auth-description">
          {registering
            ? "Join Travelora and discover extraordinary destinations."
            : "Login to continue your travel journey."}
        </p>

        {error && <div className="form-error" role="alert">{error}</div>}

        <form onSubmit={onSubmit}>
          {registering && (
            <div className="form-group">
              <label>Full Name</label>
              <input
                type="text"
                autoComplete="name"
                placeholder="Enter your full name"
                value={form.name}
                onChange={e => setForm(prev => ({ ...prev, name: e.target.value }))}
                required
                minLength={2}
              />
            </div>
          )}

          <div className="form-group">
            <label>Email Address</label>
            <input
              type="email"
              autoComplete="email"
              placeholder="Enter your email address"
              value={form.email}
              onChange={e => setForm(prev => ({ ...prev, email: e.target.value }))}
              required
            />
          </div>

          <div className="form-group">
            <label>Password</label>
            <input
              type="password"
              autoComplete={registering ? "new-password" : "current-password"}
              placeholder="Enter your password"
              value={form.password}
              onChange={e => setForm(prev => ({ ...prev, password: e.target.value }))}
              required
              minLength={6}
            />
          </div>

          <div className="form-group">
            <label>Account Type</label>
            <select
              value={form.role}
              onChange={e => setForm(prev => ({ ...prev, role: e.target.value }))}
            >
              <option value="User">User Account</option>
              <option value="Admin">Admin Account</option>
            </select>
          </div>

          <button className="btn auth-submit" type="submit">
            {registering ? "Create Account →" : "Login →"}
          </button>
        </form>

        <div className="auth-switch">
          {registering ? "Already have an account?" : "New to Travelora?"}
          <button type="button" onClick={switchMode}>
            {registering ? " Login" : " Register"}
          </button>
        </div>

        {!registering && (
          <div className="demo-info">
            <strong>Demo Admin Account</strong>
            <p>Email: admin@travelora.com</p>
            <p>Password: admin123</p>
            <p>Select Admin as the account type.</p>
          </div>
        )}
      </div>
    </main>
  );
}

/* =========================================================
   BOOKING
========================================================= */

function BookingPage({
  destination, user, form, setForm, offers,
  discount, onApplyCoupon, onConfirm, error
}) {
  if (!destination) {
    return <EmptyState title="Select a destination" description="Choose a destination before booking." />;
  }

  const subtotal = destination.price * Number(form.travellers || 1);
  const total = Math.round(subtotal * (1 - discount / 100));

  return (
    <>
      <PageBanner title="Complete Your Booking" subtitle="Your next journey is just a few steps away." />
      <main className="container page-content">
        <div className="booking-layout">
          <form className="form-panel" onSubmit={onConfirm}>
            <h2>Traveller Details</h2>
            {error && <div className="form-error">{error}</div>}

            <div className="form-group">
              <label>Full Name</label>
              <input value={user.name} readOnly />
            </div>

            <div className="form-group">
              <label>Email</label>
              <input value={user.email} readOnly />
            </div>

            <div className="form-group">
              <label>Destination</label>
              <input value={destination.name} readOnly />
            </div>

            <div className="form-group">
              <label>Departure Date</label>
              <input
                type="date"
                min={new Date().toISOString().split("T")[0]}
                value={form.date}
                onChange={e => setForm(prev => ({ ...prev, date: e.target.value }))}
                required
              />
            </div>

            <div className="form-group">
              <label>Number of Travellers</label>
              <input
                type="number"
                min="1"
                max="20"
                value={form.travellers}
                onChange={e => setForm(prev => ({
                  ...prev,
                  travellers: Math.max(1, Math.min(20, Number(e.target.value) || 1))
                }))}
                required
              />
            </div>

            <div className="form-group">
              <label>Special Requirements</label>
              <textarea
                placeholder="Enter any special requirements..."
                value={form.requirements}
                onChange={e => setForm(prev => ({ ...prev, requirements: e.target.value }))}
              />
            </div>

            <div className="form-group">
              <label>Coupon Code</label>
              <div className="coupon-input">
                <input
                  placeholder="Enter coupon"
                  value={form.coupon}
                  onChange={e => setForm(prev => ({ ...prev, coupon: e.target.value }))}
                />
                <button type="button" className="btn" onClick={onApplyCoupon}>Apply</button>
              </div>
            </div>

            <button type="submit" className="btn booking-submit">Confirm Booking →</button>
            <p className="demo-note">Demonstration booking only. No actual payment is collected.</p>
          </form>

          <aside className="booking-summary">
            <img src={destination.image} alt={destination.name} />
            <p className="eyebrow">YOUR JOURNEY</p>
            <h2>{destination.name}</h2>
            <div className="summary-row"><span>Price per traveller</span><strong>{money(destination.price)}</strong></div>
            <div className="summary-row"><span>Travellers</span><strong>{form.travellers}</strong></div>
            <div className="summary-row"><span>Subtotal</span><strong>{money(subtotal)}</strong></div>
            <div className="summary-row"><span>Discount</span><strong>{discount}%</strong></div>
            <div className="summary-row total-row"><span>Total</span><strong>{money(total)}</strong></div>
          </aside>
        </div>
      </main>
    </>
  );
}

/* =========================================================
   USER PAGES
========================================================= */

function UserDashboard({ user, trips, wishlist, navigate }) {
  const ownTrips = trips.filter(t => t.userEmail === user.email);

  return (
    <>
      <PageBanner title="My Dashboard" subtitle={`Welcome back, ${user.name}.`} />
      <main className="container page-content">
        <div className="stats-grid">
          <div className="stat-card"><span>Total Bookings</span><h2>{ownTrips.length}</h2></div>
          <div className="stat-card"><span>Confirmed Trips</span><h2>{ownTrips.filter(t => t.status === "Confirmed").length}</h2></div>
          <div className="stat-card"><span>Wishlist</span><h2>{wishlist.length}</h2></div>
        </div>
        <div className="form-panel">
          <h2>Account Information</h2>
          <p><b>Name:</b> {user.name}</p>
          <p><b>Email:</b> {user.email}</p>
          <p><b>Account Type:</b> {user.role}</p>
          <button className="btn" onClick={() => navigate("trips")}>View My Bookings</button>
        </div>
      </main>
    </>
  );
}

function TripsPage({ trips, user, cancelBooking }) {
  const ownTrips = trips.filter(t => t.userEmail === user.email);

  return (
    <>
      <PageBanner title="My Trips" subtitle="Manage your travel bookings." />
      <main className="container page-content">
        {ownTrips.length === 0 ? (
          <EmptyState title="No bookings yet" description="Your trips will appear here after booking." />
        ) : (
          <div className="table-panel">
            <h2>Booking History</h2>
            <div className="table-scroll">
              <table>
                <thead>
                  <tr>
                    <th>Booking ID</th><th>Destination</th><th>Date</th>
                    <th>Travellers</th><th>Amount</th><th>Status</th><th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {ownTrips.map(t => (
                    <tr key={t.id}>
                      <td>{t.id}</td>
                      <td>{t.destination}</td>
                      <td>{t.date}</td>
                      <td>{t.travellers}</td>
                      <td>{money(t.finalPrice)}</td>
                      <td><span className={`status ${t.status.toLowerCase()}`}>{t.status}</span></td>
                      <td>
                        {t.status === "Confirmed" && (
                          <button className="btn btn-small btn-outline" onClick={() => cancelBooking(t.id)}>Cancel</button>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </main>
    </>
  );
}

function WishlistPage({ destinations, wishlist, openDestination, removeWishlist }) {
  const saved = destinations.filter(d => wishlist.includes(d.id));

  return (
    <>
      <PageBanner title="My Wishlist" subtitle="Your favourite destinations in one place." />
      <main className="container page-content">
        {saved.length ? (
          <div className="destination-grid">
            {saved.map(d => (
              <DestinationCard
                key={d.id}
                destination={d}
                saved
                canSave
                onSave={removeWishlist}
                onExplore={openDestination}
              />
            ))}
          </div>
        ) : (
          <EmptyState title="Your wishlist is empty" description="Save destinations you love to see them here." />
        )}
      </main>
    </>
  );
}

function NotificationsPage({ notifications, markRead }) {
  return (
    <>
      <PageBanner title="Notifications" subtitle="Stay updated on your bookings." />
      <main className="container page-content">
        <div className="form-panel">
          <div className="panel-heading">
            <h2>Recent Updates</h2>
            <button className="btn btn-small btn-outline" onClick={markRead}>Mark All Read</button>
          </div>
          {notifications.length ? notifications.map(n => (
            <div className={`notification-item ${n.read ? "" : "unread"}`} key={n.id}>
              <div>✦</div>
              <section>
                <p>{n.message}</p>
                <small>{n.date}</small>
              </section>
            </div>
          )) : (
            <EmptyState title="No notifications" description="Your booking updates will appear here." />
          )}
        </div>
      </main>
    </>
  );
}

function ReviewsPage({ reviews, user, submitReview }) {
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState("");

  return (
    <>
      <PageBanner title="Guest Reviews" subtitle="Stories and experiences from travellers." />
      <main className="container page-content">
        {user?.role === "User" && (
          <form className="form-panel" onSubmit={e => {
            e.preventDefault();
            submitReview(rating, comment);
            setComment("");
            setRating(5);
          }}>
            <h2>Share Your Experience</h2>
            <div className="form-group">
              <label>Rating</label>
              <select value={rating} onChange={e => setRating(Number(e.target.value))}>
                {[5, 4, 3, 2, 1].map(n => <option key={n} value={n}>{n} Stars</option>)}
              </select>
            </div>
            <div className="form-group">
              <label>Your Review</label>
              <textarea value={comment} onChange={e => setComment(e.target.value)} required />
            </div>
            <button className="btn">Submit Review</button>
          </form>
        )}

        <div className="review-grid">
          {reviews.map(r => (
            <article className="review-card" key={r.id}>
              <div className="rating">{"★".repeat(r.rating)}{"☆".repeat(5 - r.rating)}</div>
              <p>{r.comment}</p>
              <strong>{r.name}</strong>
              <small>{r.date}</small>
            </article>
          ))}
        </div>
        {!reviews.length && <EmptyState title="No reviews yet" description="Reviews will appear here." />}
      </main>
    </>
  );
}

/* =========================================================
   ADMIN DASHBOARD
========================================================= */

function AdminDashboard({
  users, trips, destinations, offers, onCancel,
  onDeleteUser, onAddDestination, onDeleteDestination,
  onAddOffer, onDeleteOffer
}) {
  const [tab, setTab] = useState("overview");
  const [destinationForm, setDestinationForm] = useState({
    name: "", country: "", category: "Beach", price: "", image: "", description: ""
  });
  const [offerForm, setOfferForm] = useState({
    title: "", code: "", discount: "", description: ""
  });

  const confirmed = trips.filter(t => t.status === "Confirmed");
  const revenue = confirmed.reduce((sum, t) => sum + t.finalPrice, 0);

  const submitDestination = e => {
    e.preventDefault();
    onAddDestination(destinationForm);
    setDestinationForm({ name: "", country: "", category: "Beach", price: "", image: "", description: "" });
  };

  const submitOffer = e => {
    e.preventDefault();
    onAddOffer(offerForm);
    setOfferForm({ title: "", code: "", discount: "", description: "" });
  };

  return (
    <>
      <PageBanner title="Admin Dashboard" subtitle="Manage and monitor your Travelora platform." />
      <main className="container page-content">
        <div className="stats-grid">
          <div className="stat-card"><span>Total Users</span><h2>{users.filter(u => u.role === "User").length}</h2></div>
          <div className="stat-card"><span>Total Bookings</span><h2>{trips.length}</h2></div>
          <div className="stat-card"><span>Confirmed</span><h2>{confirmed.length}</h2></div>
          <div className="stat-card"><span>Booking Value</span><h2>{money(revenue)}</h2></div>
        </div>

        <div className="admin-tabs">
          {["overview", "bookings", "users", "destinations", "offers"].map(t => (
            <button key={t} className={tab === t ? "active" : ""} onClick={() => setTab(t)}>
              {t.charAt(0).toUpperCase() + t.slice(1)}
            </button>
          ))}
        </div>

        {tab === "overview" && (
          <div className="form-panel">
            <h2>Welcome, Administrator</h2>
            <p>Manage reservations, registered accounts, destinations and special offers from one place.</p>
            <p>Current destination count: {destinations.length}</p>
            <p>Current promotional offers: {offers.length}</p>
          </div>
        )}

        {tab === "bookings" && (
          <div className="table-panel">
            <h2>All Bookings</h2>
            <div className="table-scroll">
              <table>
                <thead><tr><th>ID</th><th>Customer</th><th>Email</th><th>Destination</th><th>Date</th><th>Amount</th><th>Status</th><th>Action</th></tr></thead>
                <tbody>
                  {trips.map(t => (
                    <tr key={t.id}>
                      <td>{t.id}</td><td>{t.customerName}</td><td>{t.userEmail}</td>
                      <td>{t.destination}</td><td>{t.date}</td><td>{money(t.finalPrice)}</td>
                      <td>{t.status}</td>
                      <td>{t.status === "Confirmed" && <button className="btn btn-small btn-outline" onClick={() => onCancel(t.id)}>Cancel</button>}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {tab === "users" && (
          <div className="table-panel">
            <h2>Registered Users</h2>
            <div className="table-scroll">
              <table>
                <thead><tr><th>Name</th><th>Email</th><th>Role</th><th>Action</th></tr></thead>
                <tbody>
                  {users.map(u => (
                    <tr key={u.id}>
                      <td>{u.name}</td><td>{u.email}</td><td>{u.role}</td>
                      <td>
                        {u.role !== "Admin" && (
                          <button className="btn btn-small btn-outline" onClick={() => onDeleteUser(u.id)}>Delete</button>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {tab === "destinations" && (
          <>
            <form className="form-panel" onSubmit={submitDestination}>
              <h2>Add Destination</h2>
              <div className="form-grid">
                <div className="form-group">
                  <label>Name</label>
                  <input required value={destinationForm.name} onChange={e => setDestinationForm(p => ({ ...p, name: e.target.value }))} />
                </div>
                <div className="form-group">
                  <label>Country</label>
                  <input required value={destinationForm.country} onChange={e => setDestinationForm(p => ({ ...p, country: e.target.value }))} />
                </div>
                <div className="form-group">
                  <label>Category</label>
                  <select value={destinationForm.category} onChange={e => setDestinationForm(p => ({ ...p, category: e.target.value }))}>
                    {["Beach", "City", "Mountain", "Nature", "Culture"].map(c => <option key={c}>{c}</option>)}
                  </select>
                </div>
                <div className="form-group">
                  <label>Price</label>
                  <input type="number" min="1" required value={destinationForm.price} onChange={e => setDestinationForm(p => ({ ...p, price: e.target.value }))} />
                </div>
              </div>
              <div className="form-group">
                <label>Image URL</label>
                <input type="url" required value={destinationForm.image} onChange={e => setDestinationForm(p => ({ ...p, image: e.target.value }))} />
              </div>
              <div className="form-group">
                <label>Description</label>
                <textarea value={destinationForm.description} onChange={e => setDestinationForm(p => ({ ...p, description: e.target.value }))} />
              </div>
              <button className="btn">Add Destination</button>
            </form>

            <div className="table-panel">
              <h2>Manage Destinations</h2>
              <div className="table-scroll">
                <table>
                  <thead><tr><th>Name</th><th>Country</th><th>Category</th><th>Price</th><th>Action</th></tr></thead>
                  <tbody>
                    {destinations.map(d => (
                      <tr key={d.id}>
                        <td>{d.name}</td><td>{d.country}</td><td>{d.category}</td><td>{money(d.price)}</td>
                        <td><button className="btn btn-small btn-outline" onClick={() => onDeleteDestination(d.id)}>Delete</button></td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </>
        )}

        {tab === "offers" && (
          <>
            <form className="form-panel" onSubmit={submitOffer}>
              <h2>Create Offer</h2>
              <div className="form-grid">
                <div className="form-group">
                  <label>Offer Name</label>
                  <input required value={offerForm.title} onChange={e => setOfferForm(p => ({ ...p, title: e.target.value }))} />
                </div>
                <div className="form-group">
                  <label>Coupon Code</label>
                  <input required value={offerForm.code} onChange={e => setOfferForm(p => ({ ...p, code: e.target.value }))} />
                </div>
                <div className="form-group">
                  <label>Discount (%)</label>
                  <input type="number" min="1" max="90" required value={offerForm.discount} onChange={e => setOfferForm(p => ({ ...p, discount: e.target.value }))} />
                </div>
                <div className="form-group">
                  <label>Description</label>
                  <input value={offerForm.description} onChange={e => setOfferForm(p => ({ ...p, description: e.target.value }))} />
                </div>
              </div>
              <button className="btn">Create Offer</button>
            </form>

            <div className="table-panel">
              <h2>Available Offers</h2>
              <div className="table-scroll">
                <table>
                  <thead><tr><th>Title</th><th>Code</th><th>Discount</th><th>Action</th></tr></thead>
                  <tbody>
                    {offers.map(o => (
                      <tr key={o.id}>
                        <td>{o.title}</td><td>{o.code}</td><td>{o.discount}%</td>
                        <td><button className="btn btn-small btn-outline" onClick={() => onDeleteOffer(o.id)}>Delete</button></td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </>
        )}
      </main>
    </>
  );
}

/* =========================================================
   MAIN APPLICATION
========================================================= */

export default function App() {
  const [users, setUsers] = useState(() => readStorage("travelora_users", [ADMIN_ACCOUNT]));
  const [user, setUser] = useState(() => readStorage("travelora_session", null));
  const [trips, setTrips] = useState(() => readStorage("travelora_trips", []));
  const [wishlist, setWishlist] = useState(() => readStorage("travelora_wishlist", []));
  const [notifications, setNotifications] = useState(() => readStorage("travelora_notifications", []));
  const [reviews, setReviews] = useState(() => readStorage("travelora_reviews", []));
  const [destinations, setDestinations] = useState(() => readStorage("travelora_destinations", DESTINATIONS));
  const [offers, setOffers] = useState(() => readStorage("travelora_offers", DEFAULT_OFFERS));

  const [page, setPage] = useState("home");
  const [authMode, setAuthMode] = useState("login");
  const [authForm, setAuthForm] = useState({ name: "", email: "", password: "", role: "User" });

  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [selectedDestination, setSelectedDestination] = useState(null);
  const [bookingForm, setBookingForm] = useState({ date: "", travellers: 1, coupon: "", requirements: "" });
  const [discount, setDiscount] = useState(0);
  const [lastBooking, setLastBooking] = useState(null);

  const [message, setMessage] = useState("");
  const [authError, setAuthError] = useState("");
  const [bookingError, setBookingError] = useState("");

  const userWishlist = wishlist
    .filter(item => item.userEmail === user?.email)
    .map(item => item.id);

  const userNotifications = notifications.filter(n => n.userEmail === user?.email);
  const unreadCount = userNotifications.filter(n => !n.read).length;

  /* Save application data */
  useEffect(() => { localStorage.setItem("travelora_users", JSON.stringify(users)); }, [users]);
  useEffect(() => { localStorage.setItem("travelora_session", JSON.stringify(user)); }, [user]);
  useEffect(() => { localStorage.setItem("travelora_trips", JSON.stringify(trips)); }, [trips]);
  useEffect(() => { localStorage.setItem("travelora_wishlist", JSON.stringify(wishlist)); }, [wishlist]);
  useEffect(() => { localStorage.setItem("travelora_notifications", JSON.stringify(notifications)); }, [notifications]);
  useEffect(() => { localStorage.setItem("travelora_reviews", JSON.stringify(reviews)); }, [reviews]);
  useEffect(() => { localStorage.setItem("travelora_destinations", JSON.stringify(destinations)); }, [destinations]);
  useEffect(() => { localStorage.setItem("travelora_offers", JSON.stringify(offers)); }, [offers]);

  useEffect(() => {
    if (!message) return undefined;
    const timer = window.setTimeout(() => setMessage(""), 3500);
    return () => window.clearTimeout(timer);
  }, [message]);

  const showMessage = text => setMessage(text);

  const notify = (email, text) => {
    setNotifications(prev => [{
      id: Date.now() + Math.random(),
      userEmail: email,
      message: text,
      date: new Date().toLocaleString(),
      read: false
    }, ...prev]);
  };

  /* Navigation and access control */
  const navigate = (nextPage, searchValue) => {
    const userOnlyPages = ["profile", "wishlist", "trips", "notifications", "booking", "confirmation"];

    if (nextPage === "admin" && user?.role !== "Admin") {
      setMessage("Please log in with an Admin account.");
      setAuthMode("login");
      setPage("login");
      return;
    }

    if (userOnlyPages.includes(nextPage) && user?.role !== "User") {
      setMessage("Please login as a User to access this page.");
      setAuthMode("login");
      setPage("login");
      return;
    }

    if (user?.role === "Admin" && userOnlyPages.includes(nextPage)) {
      setMessage("This section is available to User accounts.");
      setPage("admin");
      return;
    }

    if (searchValue) setSearch(searchValue);
    setPage(nextPage);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  /* Register: create account, but do not log in */
  const register = e => {
    e.preventDefault();
    setAuthError("");

    const name = authForm.name.trim();
    const email = authForm.email.trim().toLowerCase();

    if (name.length < 2) {
      setAuthError("Please enter your full name.");
      return;
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setAuthError("Please enter a valid email address.");
      return;
    }

    if (authForm.password.length < 6) {
      setAuthError("Password must contain at least 6 characters.");
      return;
    }

    if (users.some(u => u.email.toLowerCase() === email)) {
      setAuthError("This email is already registered. Please log in.");
      return;
    }

    const account = {
      id: Date.now(),
      name,
      email,
      password: authForm.password,
      role: authForm.role
    };

    setUsers(prev => [...prev, account]);

    // Important: registration does not set the current user.
    setAuthForm({ name: "", email, password: "", role: account.role });
    setAuthMode("login");
    setPage("login");
    setMessage("Registration successful! Please log in.");
  };

  /* Login: route by account type */
  const login = e => {
    e.preventDefault();
    setAuthError("");

    const email = authForm.email.trim().toLowerCase();
    const account = users.find(u =>
      u.email.toLowerCase() === email &&
      u.password === authForm.password &&
      u.role === authForm.role
    );

    if (!account) {
      setAuthError("Incorrect email, password or account type.");
      return;
    }

    setUser(account);
    setAuthForm({ name: "", email: "", password: "", role: account.role });
    setAuthMode("login");
    setPage(account.role === "Admin" ? "admin" : "home");
    setMessage(`Welcome to Travelora, ${account.name}!`);
    window.scrollTo(0, 0);
  };

  const logout = () => {
    setUser(null);
    setAuthForm({ name: "", email: "", password: "", role: "User" });
    setPage("home");
    setMessage("You have logged out successfully.");
    window.scrollTo(0, 0);
  };

  const switchAuthMode = () => {
    setAuthError("");
    const next = authMode === "login" ? "register" : "login";
    setAuthMode(next);
    setPage(next);
  };

  /* Destination navigation */
  const openDestination = destination => {
    setSelectedDestination(destination);
    setPage("details");
    window.scrollTo(0, 0);
  };

  /* Booking: guests cannot open booking */
  const startBooking = destination => {
    if (!user || user.role !== "User") {
      setSelectedDestination(destination);
      setAuthMode("login");
      setAuthError("");
      setMessage("Please login or register before booking your trip.");
      setPage("login");
      window.scrollTo(0, 0);
      return;
    }

    setSelectedDestination(destination);
    setBookingForm({ date: "", travellers: 1, coupon: "", requirements: "" });
    setDiscount(0);
    setBookingError("");
    setPage("booking");
    window.scrollTo(0, 0);
  };

  const applyCoupon = () => {
    const offer = offers.find(o =>
      o.code.toUpperCase() === bookingForm.coupon.trim().toUpperCase()
    );

    if (!offer) {
      setDiscount(0);
      setBookingError("Invalid coupon code.");
      return;
    }

    setBookingError("");
    setDiscount(offer.discount);
    showMessage(`${offer.discount}% discount applied successfully.`);
  };

  const confirmBooking = e => {
    e.preventDefault();
    setBookingError("");

    // Independently check authentication before creating a booking.
    if (!user || user.role !== "User") {
      setMessage("Please log in as a User before confirming your booking.");
      setAuthMode("login");
      setPage("login");
      return;
    }

    if (!selectedDestination) {
      setBookingError("Please select a destination.");
      return;
    }

    if (!bookingForm.date) {
      setBookingError("Please select your departure date.");
      return;
    }

    const selectedDate = new Date(`${bookingForm.date}T00:00:00`);
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    if (selectedDate < today) {
      setBookingError("Please select a future travel date.");
      return;
    }

    const travellers = Number(bookingForm.travellers);

    if (!Number.isInteger(travellers) || travellers < 1 || travellers > 20) {
      setBookingError("Please select between 1 and 20 travellers.");
      return;
    }

    const subtotal = selectedDestination.price * travellers;
    const finalPrice = Math.round(subtotal * (1 - discount / 100));

    const booking = {
      id: "TRV" + Date.now(),
      userEmail: user.email,
      customerName: user.name,
      destination: selectedDestination.name,
      image: selectedDestination.image,
      date: bookingForm.date,
      travellers,
      finalPrice,
      discount,
      requirements: bookingForm.requirements,
      status: "Confirmed",
      createdAt: new Date().toLocaleDateString()
    };

    setTrips(prev => [booking, ...prev]);
    setLastBooking(booking);
    notify(user.email, `Your ${booking.destination} booking is confirmed. Booking ID: ${booking.id}`);
    setPage("confirmation");
    window.scrollTo(0, 0);
  };

  /* Wishlist */
  const toggleWishlist = id => {
    if (!user || user.role !== "User") {
      setMessage("Login as a User to save destinations.");
      setAuthMode("login");
      setPage("login");
      return;
    }

    const exists = wishlist.some(item =>
      item.id === id && item.userEmail === user.email
    );

    if (exists) {
      setWishlist(prev => prev.filter(item =>
        !(item.id === id && item.userEmail === user.email)
      ));
      showMessage("Removed from wishlist.");
    } else {
      setWishlist(prev => [...prev, { id, userEmail: user.email }]);
      showMessage("Added to wishlist.");
    }
  };

  /* Booking cancellation */
  const cancelBooking = id => {
    const booking = trips.find(t => t.id === id);
    if (!booking || booking.status !== "Confirmed") return;

    setTrips(prev => prev.map(t =>
      t.id === id ? { ...t, status: "Cancelled" } : t
    ));

    notify(booking.userEmail, `Your booking ${id} has been cancelled.`);
    showMessage("Booking cancelled.");
  };

  /* Notifications */
  const markRead = () => {
    setNotifications(prev => prev.map(n =>
      n.userEmail === user?.email ? { ...n, read: true } : n
    ));
    showMessage("Notifications marked as read.");
  };

  /* Reviews */
  const submitReview = (rating, comment) => {
    if (!user || user.role !== "User") {
      showMessage("Please log in to submit a review.");
      return;
    }

    if (!comment.trim()) {
      showMessage("Please enter your review.");
      return;
    }

    setReviews(prev => [{
      id: Date.now(),
      name: user.name,
      rating,
      comment: comment.trim(),
      date: new Date().toLocaleDateString()
    }, ...prev]);

    showMessage("Thank you for your review!");
  };

  /* Admin actions */
  const addDestination = form => {
    if (user?.role !== "Admin") return;

    setDestinations(prev => [...prev, {
      ...form,
      id: Date.now(),
      price: Number(form.price),
      rating: 4.7
    }]);

    showMessage("Destination added successfully.");
  };

  const deleteDestination = id => {
    if (user?.role !== "Admin") return;
    setDestinations(prev => prev.filter(d => d.id !== id));
    showMessage("Destination deleted.");
  };

  const addOffer = form => {
    if (user?.role !== "Admin") return;

    const discountValue = Number(form.discount);

    if (discountValue < 1 || discountValue > 90) {
      showMessage("Discount must be between 1 and 90.");
      return;
    }

    if (offers.some(o => o.code.toUpperCase() === form.code.trim().toUpperCase())) {
      showMessage("Coupon code already exists.");
      return;
    }

    setOffers(prev => [...prev, {
      ...form,
      id: Date.now(),
      code: form.code.trim().toUpperCase(),
      discount: discountValue
    }]);

    showMessage("Offer created successfully.");
  };

  const deleteOffer = id => {
    if (user?.role !== "Admin") return;
    setOffers(prev => prev.filter(o => o.id !== id));
    showMessage("Offer deleted.");
  };

  const deleteUser = id => {
    if (user?.role !== "Admin") return;

    const target = users.find(u => u.id === id);
    if (!target || target.role === "Admin") return;

    setUsers(prev => prev.filter(u => u.id !== id));
    setTrips(prev => prev.filter(t => t.userEmail !== target.email));
    setWishlist(prev => prev.filter(w => w.userEmail !== target.email));
    setNotifications(prev => prev.filter(n => n.userEmail !== target.email));
    showMessage("User account deleted.");
  };

  /* Render page */
  const renderPage = () => {
    const protectedPages = [
      "profile", "wishlist", "trips", "notifications",
      "booking", "confirmation"
    ];

    if (protectedPages.includes(page) && user?.role !== "User") {
      return (
        <AuthPage
          mode="login"
          form={authForm}
          setForm={setAuthForm}
          onSubmit={login}
          switchMode={switchAuthMode}
          error={authError}
        />
      );
    }

    if (page === "admin" && user?.role !== "Admin") {
      return (
        <AuthPage
          mode="login"
          form={authForm}
          setForm={setAuthForm}
          onSubmit={login}
          switchMode={switchAuthMode}
          error={authError}
        />
      );
    }

    if (user?.role === "Admin" && protectedPages.includes(page)) {
      return (
        <AdminDashboard
          users={users}
          trips={trips}
          destinations={destinations}
          offers={offers}
          onCancel={cancelBooking}
          onDeleteUser={deleteUser}
          onAddDestination={addDestination}
          onDeleteDestination={deleteDestination}
          onAddOffer={addOffer}
          onDeleteOffer={deleteOffer}
        />
      );
    }

    switch (page) {
      case "home":
        return <HomePage navigate={navigate} search={search} setSearch={setSearch} destinations={destinations} />;

      case "login":
      case "register":
        return (
          <AuthPage
            mode={page}
            form={authForm}
            setForm={setAuthForm}
            onSubmit={page === "register" ? register : login}
            switchMode={switchAuthMode}
            error={authError}
          />
        );

      case "destinations":
        return (
          <DestinationsPage
            destinations={destinations}
            search={search}
            setSearch={setSearch}
            category={category}
            setCategory={setCategory}
            wishlist={userWishlist}
            toggleWishlist={toggleWishlist}
            openDestination={openDestination}
            canSave={user?.role === "User"}
          />
        );

      case "details":
        return (
          <DetailsPage
            destination={selectedDestination}
            onBook={startBooking}
            onBack={() => navigate("destinations")}
          />
        );

      case "packages":
        return <PackagesPage destinations={destinations} openDestination={openDestination} />;

      case "offers":
        return <OffersPage offers={offers} />;

      case "activities":
        return <ActivitiesPage navigate={navigate} />;

      case "booking":
        return (
          <BookingPage
            destination={selectedDestination}
            user={user}
            form={bookingForm}
            setForm={setBookingForm}
            offers={offers}
            discount={discount}
            onApplyCoupon={applyCoupon}
            onConfirm={confirmBooking}
            error={bookingError}
          />
        );

      case "confirmation":
        return (
          <main className="container page-content">
            <div className="confirmation-card">
              <div className="success-icon">✓</div>
              <p className="eyebrow">BOOKING SUCCESSFUL</p>
              <h1>Your journey is confirmed!</h1>
              <p>Thank you for choosing Travelora.</p>

              {lastBooking && (
                <div className="confirmation-details">
                  <p><b>Booking ID:</b> {lastBooking.id}</p>
                  <p><b>Destination:</b> {lastBooking.destination}</p>
                  <p><b>Travel Date:</b> {lastBooking.date}</p>
                  <p><b>Travellers:</b> {lastBooking.travellers}</p>
                  <p><b>Total:</b> {money(lastBooking.finalPrice)}</p>
                  <p><b>Status:</b> Confirmed</p>
                </div>
              )}

              <button className="btn" onClick={() => navigate("trips")}>View My Trips</button>
            </div>
          </main>
        );

      case "profile":
        return <UserDashboard user={user} trips={trips} wishlist={userWishlist} navigate={navigate} />;

      case "trips":
        return <TripsPage trips={trips} user={user} cancelBooking={cancelBooking} />;

      case "wishlist":
        return (
          <WishlistPage
            destinations={destinations}
            wishlist={userWishlist}
            openDestination={openDestination}
            removeWishlist={toggleWishlist}
          />
        );

      case "notifications":
        return <NotificationsPage notifications={userNotifications} markRead={markRead} />;

      case "reviews":
        return <ReviewsPage reviews={reviews} user={user} submitReview={submitReview} />;

      case "admin":
        return (
          <AdminDashboard
            users={users}
            trips={trips}
            destinations={destinations}
            offers={offers}
            onCancel={cancelBooking}
            onDeleteUser={deleteUser}
            onAddDestination={addDestination}
            onDeleteDestination={deleteDestination}
            onAddOffer={addOffer}
            onDeleteOffer={deleteOffer}
          />
        );

      default:
        return <HomePage navigate={navigate} search={search} setSearch={setSearch} destinations={destinations} />;
    }
  };

  return (
    <div className="app">
      <Navbar
        user={user}
        unreadCount={unreadCount}
        navigate={navigate}
        logout={logout}
      />

      {message && (
        <div className="toast" role="status">
          <span>{message}</span>
          <button onClick={() => setMessage("")} aria-label="Close message">×</button>
        </div>
      )}

      {renderPage()}

      <Footer navigate={navigate} />
    </div>
  );
}
