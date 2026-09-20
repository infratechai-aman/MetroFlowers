# 🌸 Petal & Bloom — Luxury Floristry & Event Design

> *Handpicked with love. Fresh blooms, elegant wraps, thoughtful details — just for you.*

Petal & Bloom is an editorial luxury florist and bespoke event styling web application handcrafted for celebrating every kind of moment.

---

## ✨ Features

- **Editorial Luxury Design**: Tailored aesthetics with Cormorant Garamond serif typography, warm pastel blush/rose palettes (`#FBF8F5`, `#A66B64`), and arched card geometries (`.arch-card-top`).
- **Interactive Shopping Bag**: Full slide-over cart drawer with real-time item count badge, quantity adjustment, remove options, and subtotal calculation.
- **Wishlist Engine**: Interactive heart toggles with dynamic fill animations and instant toast feedback.
- **Bespoke Bouquet Builder**: 6-step interactive workshop wizard matching the signature steps:
  1. *Choose Flowers*
  2. *Choose Quantity*
  3. *Choose Wrapping*
  4. *Add Handwritten Note*
  5. *Delivery / Boutique Pickup*
  6. *Review & Add to Bag*
- **Event Floral Consultation**: Customized event inquiry modal for Weddings, Birthdays, Stages & Backdrops, Luxury Car Décor, and Corporate Galas.
- **Instant Search Modal**: Real-time filter lookup for bouquets and floral arrangements.
- **Responsive Navigation**: Desktop navigation bar with animated link indicators, plus an off-canvas mobile drawer with quick boutique contacts.
- **Pune Studio Directions**: Integrated boutique hours and Google Maps navigation modal.

---

## 📁 Project Architecture

```
MetroFollowers/
├── index.html            # Main semantic HTML5 landing page with full interactive markup
├── code.html             # Formatted HTML reference copy
├── package.json          # Node project scripts (npm start, npm run dev)
├── server.js             # Zero-dependency Node.js HTTP static server
├── css/
│   └── style.css         # Modular luxury design system, typography & animations
├── js/
│   └── main.js           # Client-side state & interactive modules
├── .gitignore            # Git ignore configuration
├── README.md             # Project documentation
└── screen.png            # Visual design mockup reference
```

---

## 🚀 Running Locally

### Prerequisites
- [Node.js](https://nodejs.org/) (v16 or higher)

### Quick Start
Clone the repository and start the local server:

```bash
# Using npm
npm start
# or
npm run dev

# Or using Node directly
node server.js
```

Open your browser at **`http://localhost:3000`** (or the port indicated in the terminal).

---

## 🎨 Tech Stack
- **HTML5**: Semantic, accessible structure
- **CSS**: Vanilla CSS design tokens & Tailwind CSS v3
- **JavaScript**: Modular vanilla JavaScript (no build step required)
- **Server**: Lightweight Node.js HTTP server (zero external dependencies)
- **Typography**: Google Fonts (*Cormorant Garamond*, *Great Vibes*, *Plus Jakarta Sans*)

---

© 2025 Petal & Bloom Floristry. Handcrafted moments with love.
