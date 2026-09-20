/**
 * Petal & Bloom — Luxury Floristry & Events
 * Interactive Features & State Management
 */

// Initial State
const state = {
  cart: [],
  wishlist: new Set(),
  builder: {
    currentStep: 1,
    selectedFlowers: ['Ecuadorian Garden Roses'],
    size: { name: 'Signature Bouquet (20 stems)', price: 2999 },
    wrapping: 'Matte Sand Paper & Champagne Silk Ribbon',
    recipientName: '',
    cardMessage: '',
    deliveryType: 'delivery',
    deliveryDate: new Date(Date.now() + 86400000).toISOString().split('T')[0]
  }
};

// Available Bouquets Data
const BOUQUETS = [
  {
    id: 'blush-romance',
    name: 'Blush Romance',
    price: 2499,
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDmFAzfHav1YM2P6dWno9-73Y5_yJQhU9Et1CkwCtvFiFOhLLAL5tTdgV_DsZdXuAFWzGAR8rYHSv5KUoZSiZCzJPHgrUnzEkmPM4AdKfzl1doc_nZfQfMjs3HZ_xGrjiHlF9SPdIA0w3FHiFBzKzNlDB5Lx22RLOREqk8YzxdZ5ehaZBDZhBq59q2zcnv-vlUijlvcP4uCM_0L-RVqky924eXgog2EpgF6xZBZCl9YWNiINB8Bn8at3w',
    description: 'A romantic harmony of soft blush garden roses, delicate spray florals, and silk ribbons.'
  },
  {
    id: 'pure-grace',
    name: 'Pure Grace',
    price: 2999,
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuA3m3zCBSiadNfqKWD179DH4TeNSmvpKur4mjxxT8OBdcx2QR8iv6FmgVZR4G0pw_zkWs5J3sI1anzlFV0IP1bAKOcx0VXzJmMYbw67_sxmgEKzkvVJFjQQeAorpKZ8RrDF_5_cI5DURVOEeRQonFl8GA-whdzSrX4vBr6Z9rvBXBsmBUf_o9gKpj_kgrRZPsN_7m3SEEWn2Ssdh5T7zSSa_EJJie4MoEq9lFSeW7_Ep36zS-bCiwja1A',
    description: 'Pristine white garden roses, ranunculus, and eucalyptus crafted for timeless elegance.'
  },
  {
    id: 'lavender-dreams',
    name: 'Lavender Dreams',
    price: 3499,
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDj1Vd_UMJGY8e11SToSmybn81ryV7K8z4T9EfD3FOmGTOFsHv8oaO1rkoRnjDlElTHGBZK_ThO1MOI6fCMcxe_GqkJ6FCAgMJdt5tVsQZ7TDGGhZESw-sTYNK9Y5nlflyxq4LEZnul0QDa8ONaefcWSG2WEgYOVEoDATNQHleaaH-mhfkwX-G6IlGYwh-smS2m8tiiKZzR3WoiHqih5iCMd7-b-z1UUdFO6WtQEmsTdWsbl0DHxAoiSg',
    description: 'Fragrant French lavender, lilac roses, and violet accents evocative of twilight fields.'
  },
  {
    id: 'golden-hour',
    name: 'Golden Hour',
    price: 2799,
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAkujwejbK11O-Iurykm1L_dXwYVpT_eoPFPOzLuCb1D8talU7x_lxY9DfNQGWk4fohe05s3x8s7F_Fkg7QbB_GBCbk8kihfH_DYZ4i7-z9wOssE1lZZbwaRVDeFBP1_XjxyCPaBrp2uq--2j-lrklbrlD4vcACCtctYp4CHrRmjuSz1YknBYyld4r_b2kx70y9O8eme6cECzV6oSuJNU83qYfU5oP8mveJwPEtROA6-sg82_PR59c6IQ',
    description: 'Warm honey blooms, radiant marigolds, and sunset buttercups bathed in golden light.'
  }
];

// Document Ready Setup
document.addEventListener('DOMContentLoaded', () => {
  initCart();
  initWishlist();
  initMobileMenu();
  initSearchModal();
  initBuilderModal();
  initEventConsultation();
  initDirectionsModal();
  initSmoothScroll();
});

/* ==========================================================================
   CART SYSTEM
   ========================================================================== */
function initCart() {
  const cartBtn = document.getElementById('cart-btn');
  const cartDrawer = document.getElementById('cart-drawer');
  const cartBackdrop = document.getElementById('cart-backdrop');
  const closeCartBtn = document.getElementById('close-cart-btn');

  if (cartBtn && cartDrawer) {
    cartBtn.addEventListener('click', () => openCart());
  }

  if (closeCartBtn) {
    closeCartBtn.addEventListener('click', () => closeCart());
  }

  if (cartBackdrop) {
    cartBackdrop.addEventListener('click', () => closeCart());
  }

  // Quick Add to Cart buttons
  document.querySelectorAll('.add-to-cart-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      const bouquetId = btn.getAttribute('data-id');
      const bouquet = BOUQUETS.find(b => b.id === bouquetId);
      if (bouquet) {
        addToCart(bouquet);
      }
    });
  });

  renderCart();
}

function openCart() {
  const cartDrawer = document.getElementById('cart-drawer');
  const cartBackdrop = document.getElementById('cart-backdrop');
  if (cartDrawer && cartBackdrop) {
    cartBackdrop.classList.add('open');
    cartDrawer.classList.add('open');
    document.body.style.overflow = 'hidden';
  }
}

function closeCart() {
  const cartDrawer = document.getElementById('cart-drawer');
  const cartBackdrop = document.getElementById('cart-backdrop');
  if (cartDrawer && cartBackdrop) {
    cartDrawer.classList.remove('open');
    cartBackdrop.classList.remove('open');
    document.body.style.overflow = '';
  }
}

function addToCart(item, quantity = 1) {
  const existing = state.cart.find(i => i.id === item.id);
  if (existing) {
    existing.quantity += quantity;
  } else {
    state.cart.push({ ...item, quantity });
  }

  renderCart();
  showToast(`Added "${item.name}" to your shopping bag.`, 'bag');
}

function updateCartQuantity(id, delta) {
  const itemIndex = state.cart.findIndex(i => i.id === id);
  if (itemIndex > -1) {
    state.cart[itemIndex].quantity += delta;
    if (state.cart[itemIndex].quantity <= 0) {
      state.cart.splice(itemIndex, 1);
    }
  }
  renderCart();
}

function removeCartItem(id) {
  state.cart = state.cart.filter(i => i.id !== id);
  renderCart();
}

function renderCart() {
  const cartCountBadges = document.querySelectorAll('.cart-count');
  const cartItemsContainer = document.getElementById('cart-items-container');
  const cartEmptyState = document.getElementById('cart-empty-state');
  const cartFooter = document.getElementById('cart-footer');
  const cartSubtotalEl = document.getElementById('cart-subtotal');

  const totalCount = state.cart.reduce((sum, item) => sum + item.quantity, 0);
  const subtotal = state.cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  cartCountBadges.forEach(el => {
    el.textContent = totalCount;
  });

  if (!cartItemsContainer) return;

  if (state.cart.length === 0) {
    if (cartEmptyState) cartEmptyState.classList.remove('hidden');
    if (cartFooter) cartFooter.classList.add('hidden');
    cartItemsContainer.innerHTML = '';
    return;
  }

  if (cartEmptyState) cartEmptyState.classList.add('hidden');
  if (cartFooter) cartFooter.classList.remove('hidden');

  cartItemsContainer.innerHTML = state.cart.map(item => `
    <div class="flex items-center gap-4 py-3 border-b border-[#F0E6DE]">
      <img src="${item.image}" alt="${item.name}" class="w-16 h-20 object-cover rounded-xl bg-[#F0E6DE]" />
      <div class="flex-1">
        <h4 class="font-cormorant text-lg font-medium text-brand-dark leading-tight">${item.name}</h4>
        <p class="text-xs text-[#8A7971] mt-0.5">₹${item.price.toLocaleString('en-IN')}</p>
        <div class="flex items-center gap-2.5 mt-2">
          <button onclick="updateCartQuantity('${item.id}', -1)" class="w-6 h-6 rounded-full border border-[#D5C2B6] flex items-center justify-center text-xs hover:bg-[#EAE0D8] transition-colors">-</button>
          <span class="text-xs font-semibold text-brand-dark w-4 text-center">${item.quantity}</span>
          <button onclick="updateCartQuantity('${item.id}', 1)" class="w-6 h-6 rounded-full border border-[#D5C2B6] flex items-center justify-center text-xs hover:bg-[#EAE0D8] transition-colors">+</button>
        </div>
      </div>
      <div class="text-right">
        <p class="font-medium text-sm text-brand-dark">₹${(item.price * item.quantity).toLocaleString('en-IN')}</p>
        <button onclick="removeCartItem('${item.id}')" class="text-[11px] text-[#A66B64] hover:underline mt-2 inline-block">Remove</button>
      </div>
    </div>
  `).join('');

  if (cartSubtotalEl) {
    cartSubtotalEl.textContent = `₹${subtotal.toLocaleString('en-IN')}`;
  }
}

/* ==========================================================================
   WISHLIST SYSTEM
   ========================================================================== */
function initWishlist() {
  document.querySelectorAll('.wishlist-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      const bouquetId = btn.getAttribute('data-id');
      const bouquet = BOUQUETS.find(b => b.id === bouquetId);
      const name = bouquet ? bouquet.name : 'Bouquet';

      if (state.wishlist.has(bouquetId)) {
        state.wishlist.delete(bouquetId);
        btn.classList.remove('active');
        showToast(`Removed "${name}" from your wishlist.`, 'heart');
      } else {
        state.wishlist.add(bouquetId);
        btn.classList.add('active');
        showToast(`Saved "${name}" to your wishlist!`, 'heart');
      }
    });
  });
}

/* ==========================================================================
   MOBILE MENU DRAWER
   ========================================================================== */
function initMobileMenu() {
  const mobileToggle = document.getElementById('mobile-menu-toggle');
  const mobileDrawer = document.getElementById('mobile-menu-drawer');
  const mobileBackdrop = document.getElementById('mobile-menu-backdrop');
  const closeMobileBtn = document.getElementById('close-mobile-btn');

  if (mobileToggle) {
    mobileToggle.addEventListener('click', () => {
      mobileDrawer.classList.add('open');
      mobileBackdrop.classList.add('open');
      document.body.style.overflow = 'hidden';
    });
  }

  const closeMobile = () => {
    if (mobileDrawer) mobileDrawer.classList.remove('open');
    if (mobileBackdrop) mobileBackdrop.classList.remove('open');
    document.body.style.overflow = '';
  };

  if (closeMobileBtn) closeMobileBtn.addEventListener('click', closeMobile);
  if (mobileBackdrop) mobileBackdrop.addEventListener('click', closeMobile);

  // Close when clicking nav items inside mobile menu
  document.querySelectorAll('.mobile-nav-link').forEach(link => {
    link.addEventListener('click', closeMobile);
  });
}

/* ==========================================================================
   SEARCH MODAL
   ========================================================================== */
function initSearchModal() {
  const searchBtn = document.getElementById('search-btn');
  const searchModal = document.getElementById('search-modal');
  const closeSearchBtn = document.getElementById('close-search-btn');
  const searchInput = document.getElementById('search-input');
  const searchResults = document.getElementById('search-results');

  if (!searchBtn || !searchModal) return;

  searchBtn.addEventListener('click', () => {
    searchModal.classList.add('open');
    document.body.style.overflow = 'hidden';
    setTimeout(() => searchInput?.focus(), 150);
  });

  const closeSearch = () => {
    searchModal.classList.remove('open');
    document.body.style.overflow = '';
  };

  if (closeSearchBtn) closeSearchBtn.addEventListener('click', closeSearch);
  searchModal.addEventListener('click', (e) => {
    if (e.target === searchModal) closeSearch();
  });

  if (searchInput && searchResults) {
    searchInput.addEventListener('input', (e) => {
      const q = e.target.value.toLowerCase().trim();
      if (!q) {
        searchResults.innerHTML = '<p class="text-xs text-[#8A7971] text-center py-4">Search our luxury arrangements or event services...</p>';
        return;
      }

      const matches = BOUQUETS.filter(b => b.name.toLowerCase().includes(q) || b.description.toLowerCase().includes(q));

      if (matches.length === 0) {
        searchResults.innerHTML = `<p class="text-xs text-[#8A7971] text-center py-6">No bouquets found for "${e.target.value}". Try "Rose", "Grace", or "Dreams".</p>`;
        return;
      }

      searchResults.innerHTML = matches.map(m => `
        <div class="flex items-center gap-3.5 p-2 rounded-xl hover:bg-[#F2E8E0] transition-colors cursor-pointer" onclick="quickAddToCartFromSearch('${m.id}')">
          <img src="${m.image}" class="w-12 h-14 object-cover rounded-lg" alt="${m.name}"/>
          <div class="flex-1">
            <h5 class="font-cormorant text-base font-medium text-brand-dark">${m.name}</h5>
            <p class="text-xs text-[#8A7971]">₹${m.price.toLocaleString('en-IN')}</p>
          </div>
          <span class="text-xs text-[#A66B64] font-medium tracking-wider uppercase">Add +</span>
        </div>
      `).join('');
    });
  }
}

function quickAddToCartFromSearch(id) {
  const item = BOUQUETS.find(b => b.id === id);
  if (item) {
    addToCart(item);
    document.getElementById('search-modal')?.classList.remove('open');
    document.body.style.overflow = '';
  }
}

/* ==========================================================================
   BOUQUET BUILDER WIZARD MODAL
   ========================================================================== */
function initBuilderModal() {
  const startBuilderBtns = document.querySelectorAll('.start-builder-trigger');
  const builderModal = document.getElementById('builder-modal');
  const closeBuilderBtn = document.getElementById('close-builder-btn');

  startBuilderBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const stepTarget = parseInt(btn.getAttribute('data-step') || '1', 10);
      setBuilderStep(stepTarget);
      openBuilderModal();
    });
  });

  function openBuilderModal() {
    if (builderModal) {
      builderModal.classList.add('open');
      document.body.style.overflow = 'hidden';
    }
  }

  function closeBuilderModal() {
    if (builderModal) {
      builderModal.classList.remove('open');
      document.body.style.overflow = '';
    }
  }

  if (closeBuilderBtn) closeBuilderBtn.addEventListener('click', closeBuilderModal);
  if (builderModal) {
    builderModal.addEventListener('click', (e) => {
      if (e.target === builderModal) closeBuilderModal();
    });
  }

  // Builder Step Nav buttons
  document.getElementById('builder-next-btn')?.addEventListener('click', () => {
    if (state.builder.currentStep < 6) {
      setBuilderStep(state.builder.currentStep + 1);
    } else {
      // Add custom bouquet to cart
      addCustomBouquetToCart();
      closeBuilderModal();
    }
  });

  document.getElementById('builder-prev-btn')?.addEventListener('click', () => {
    if (state.builder.currentStep > 1) {
      setBuilderStep(state.builder.currentStep - 1);
    }
  });
}

function setBuilderStep(step) {
  state.builder.currentStep = step;

  // Update tabs
  for (let i = 1; i <= 6; i++) {
    const tab = document.getElementById(`step-tab-${i}`);
    const content = document.getElementById(`step-content-${i}`);

    if (tab) {
      tab.classList.toggle('active', i === step);
      tab.classList.toggle('completed', i < step);
    }
    if (content) {
      content.classList.toggle('hidden', i !== step);
    }
  }

  // Prev / Next button label
  const prevBtn = document.getElementById('builder-prev-btn');
  const nextBtn = document.getElementById('builder-next-btn');

  if (prevBtn) {
    prevBtn.style.visibility = step === 1 ? 'hidden' : 'visible';
  }

  if (nextBtn) {
    if (step === 6) {
      nextBtn.textContent = 'ADD TO BAG →';
      nextBtn.classList.remove('bg-[#A66B64]');
      nextBtn.classList.add('bg-[#8E534B]');
    } else {
      nextBtn.textContent = 'CONTINUE →';
      nextBtn.classList.add('bg-[#A66B64]');
      nextBtn.classList.remove('bg-[#8E534B]');
    }
  }

  updateBuilderSummary();
}

function selectFlowerOption(el, flowerName) {
  el.classList.toggle('border-[#A66B64]');
  el.classList.toggle('bg-[#FAF3EE]');

  const idx = state.builder.selectedFlowers.indexOf(flowerName);
  if (idx > -1) {
    if (state.builder.selectedFlowers.length > 1) {
      state.builder.selectedFlowers.splice(idx, 1);
    }
  } else {
    state.builder.selectedFlowers.push(flowerName);
  }
  updateBuilderSummary();
}

function selectSizeOption(el, name, price) {
  document.querySelectorAll('.size-option').forEach(opt => {
    opt.classList.remove('border-[#A66B64]', 'bg-[#FAF3EE]');
  });
  el.classList.add('border-[#A66B64]', 'bg-[#FAF3EE]');
  state.builder.size = { name, price };
  updateBuilderSummary();
}

function selectWrapOption(el, wrapName) {
  document.querySelectorAll('.wrap-option').forEach(opt => {
    opt.classList.remove('border-[#A66B64]', 'bg-[#FAF3EE]');
  });
  el.classList.add('border-[#A66B64]', 'bg-[#FAF3EE]');
  state.builder.wrapping = wrapName;
  updateBuilderSummary();
}

function updateBuilderSummary() {
  const summaryEl = document.getElementById('builder-summary-preview');
  if (!summaryEl) return;

  const flowersStr = state.builder.selectedFlowers.join(', ');
  const messageInput = document.getElementById('builder-msg-input');
  const recipientInput = document.getElementById('builder-recipient-input');
  if (messageInput) state.builder.cardMessage = messageInput.value;
  if (recipientInput) state.builder.recipientName = recipientInput.value;

  summaryEl.innerHTML = `
    <div class="space-y-2 text-xs text-[#5E534D]">
      <div class="flex justify-between border-b border-[#EAE0D8] pb-1.5">
        <span class="text-[#8C7B73]">Selected Blooms:</span>
        <span class="font-medium text-brand-dark">${flowersStr || 'Garden Roses'}</span>
      </div>
      <div class="flex justify-between border-b border-[#EAE0D8] pb-1.5">
        <span class="text-[#8C7B73]">Arrangement Size:</span>
        <span class="font-medium text-brand-dark">${state.builder.size.name}</span>
      </div>
      <div class="flex justify-between border-b border-[#EAE0D8] pb-1.5">
        <span class="text-[#8C7B73]">Artisan Wrapping:</span>
        <span class="font-medium text-brand-dark">${state.builder.wrapping}</span>
      </div>
      <div class="flex justify-between border-b border-[#EAE0D8] pb-1.5">
        <span class="text-[#8C7B73]">Greeting Note:</span>
        <span class="font-medium text-brand-dark">${state.builder.cardMessage ? 'Custom Handwritten Card' : 'Standard Floral Card'}</span>
      </div>
      <div class="flex justify-between pt-1">
        <span class="text-sm font-serif text-brand-dark font-medium">Estimated Total:</span>
        <span class="text-base font-serif font-bold text-[#A66B64]">₹${state.builder.size.price.toLocaleString('en-IN')}</span>
      </div>
    </div>
  `;
}

function addCustomBouquetToCart() {
  const customItem = {
    id: `custom-bouquet-${Date.now()}`,
    name: `Custom Bouquet (${state.builder.selectedFlowers[0] || 'Artisan Mix'})`,
    price: state.builder.size.price,
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBcOQ8Fx0yYZRe_BPOXcvCVGReiFnsipLZ6pBVA-xJm1oidVdZE3ZK0IpVThaB43wN9uIaaG37k3LMC7Q1dSeA84uuDEm0rLZ4AOqsdqi_cGRQxU3Nf4yvjh3etMTSxxb5TeuYqNh4b4uwumj0F-sgULV8yswbeCMj0e9fxiM_Z6uYsGzlZAC6K8_SwEFip-WWIAodJLzH8OSI5h2jArJPtB02FeDimpXc3qgwpv0_ve3apBgfNt-fGZw',
    description: `${state.builder.size.name} with ${state.builder.wrapping}`
  };

  addToCart(customItem, 1);
  openCart();
}

/* ==========================================================================
   EVENT CONSULTATION & INQUIRY MODAL
   ========================================================================== */
function initEventConsultation() {
  const triggers = document.querySelectorAll('.event-inquiry-trigger');
  const modal = document.getElementById('event-inquiry-modal');
  const closeBtn = document.getElementById('close-event-modal-btn');
  const serviceTypeSelect = document.getElementById('event-service-type');
  const form = document.getElementById('event-inquiry-form');

  triggers.forEach(trigger => {
    trigger.addEventListener('click', (e) => {
      e.preventDefault();
      const serviceName = trigger.getAttribute('data-service') || 'Weddings';
      if (serviceTypeSelect) {
        serviceTypeSelect.value = serviceName;
      }
      modal?.classList.add('open');
      document.body.style.overflow = 'hidden';
    });
  });

  const closeModal = () => {
    modal?.classList.remove('open');
    document.body.style.overflow = '';
  };

  if (closeBtn) closeBtn.addEventListener('click', closeModal);
  if (modal) {
    modal.addEventListener('click', (e) => {
      if (e.target === modal) closeModal();
    });
  }

  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      closeModal();
      showToast('Thank you! Our floral stylist will reach out within 24 hours.', 'check');
      form.reset();
    });
  }
}

/* ==========================================================================
   DIRECTIONS MODAL
   ========================================================================== */
function initDirectionsModal() {
  const triggers = document.querySelectorAll('.directions-trigger');
  const modal = document.getElementById('directions-modal');
  const closeBtn = document.getElementById('close-directions-btn');

  triggers.forEach(trigger => {
    trigger.addEventListener('click', (e) => {
      e.preventDefault();
      modal?.classList.add('open');
      document.body.style.overflow = 'hidden';
    });
  });

  const closeModal = () => {
    modal?.classList.remove('open');
    document.body.style.overflow = '';
  };

  if (closeBtn) closeBtn.addEventListener('click', closeModal);
  if (modal) {
    modal.addEventListener('click', (e) => {
      if (e.target === modal) closeModal();
    });
  }
}

/* ==========================================================================
   SMOOTH SCROLLING WITH OFFSET
   ========================================================================== */
function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      const targetId = this.getAttribute('href');
      if (targetId === '#' || !targetId) return;

      const targetEl = document.querySelector(targetId);
      if (targetEl) {
        e.preventDefault();
        const headerOffset = 90;
        const elementPosition = targetEl.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth'
        });
      }
    });
  });
}

/* ==========================================================================
   TOAST NOTIFICATION ENGINE
   ========================================================================== */
function showToast(message, iconType = 'bag') {
  let container = document.getElementById('toast-container');
  if (!container) {
    container = document.createElement('div');
    container.id = 'toast-container';
    container.className = 'toast-container';
    document.body.appendChild(container);
  }

  const toast = document.createElement('div');
  toast.className = 'toast';

  let iconSvg = '';
  if (iconType === 'bag') {
    iconSvg = `<svg class="w-4 h-4 text-[#E2BEB7] shrink-0" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"/><line x1="3" y1="6" x2="21" y2="6"/><path d="M16 10a4 4 0 0 1-8 0"/></svg>`;
  } else if (iconType === 'heart') {
    iconSvg = `<svg class="w-4 h-4 text-[#B47065] shrink-0" fill="currentColor" viewBox="0 0 24 24"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg>`;
  } else {
    iconSvg = `<svg class="w-4 h-4 text-[#8BA783] shrink-0" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><polyline points="20 6 9 17 4 12"/></svg>`;
  }

  toast.innerHTML = `${iconSvg}<span>${message}</span>`;
  container.appendChild(toast);

  setTimeout(() => {
    toast.classList.add('toast-exit');
    setTimeout(() => toast.remove(), 300);
  }, 3200);
}
