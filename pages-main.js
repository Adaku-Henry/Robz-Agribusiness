import {
  navigate, el, formatPrice, getStars, getCategoryById, getProductById, addToCart,
  removeFromCart, updateCartQty, getCartTotal, getCartCount, showToast, getIcon, icons,
  pageWrapper, categories, products, blogPosts, faqs, testimonials, services, stats, businessInfo, localImages, cart
} from './app-core.js'

// ===== HOME PAGE =====
export function renderHome() {
  const featured = products.filter(p => p.badge).slice(0, 8)
  const onSale = products.slice(0, 4)

  const content = `
    <!-- HERO -->
    <section class="hero">
      <div class="hero-bg" style="background-image:url('${localImages.hero}')"></div>
      <div class="container hero-content">
        <div class="hero-badge fade-in">${icons.globe} ROBZ Agribusiness SMC Ltd • West Nile, Uganda</div>
        <h1 class="fade-in fade-in-delay-1">Supporting Farmers,<br>Growing Prosperity</h1>
        <p class="fade-in fade-in-delay-2">We supply farm inputs, provide extension and consultation services, deliver products to farmers, and link growers to ready markets across Ocodri, Bileafe, Terego, and the wider West Nile region.</p>
        <div class="hero-actions fade-in fade-in-delay-3">
          <button class="btn btn-accent btn-lg" data-nav="marketplace">Shop Inputs</button>
          <button class="btn btn-outline btn-lg" style="border-color:white;color:white" data-nav="services">Explore Services</button>
        </div>
        <div class="hero-search fade-in fade-in-delay-4">
          ${icons.search}
          <input type="text" placeholder="Search for seeds, tools, pesticides, livestock feed..." id="hero-search-input" />
        </div>
      </div>
    </section>

    <!-- STATS -->
    <section class="stats-bar">
      <div class="container">
        <div class="grid grid-4">
          ${stats.map(s => `<div class="stat-item"><div class="stat-value">${s.value}</div><div class="stat-label">${s.label}</div></div>`).join('')}
        </div>
      </div>
    </section>

    <section class="section">
      <div class="container">
        <div class="section-header">
          <span class="badge badge-primary">Why ROBZ</span>
          <h2>Built for the realities of local farming</h2>
          <p>From Ocodri to communities across Terego and West Nile, our business is designed around the needs of smallholder farmers.</p>
        </div>
        <div class="grid grid-3">
          ${[
            { icon: 'sprout', title: 'Farm Inputs', desc: 'Quality seeds, chemicals, tools, pesticides, herbicides, fungicides, and support for improved crop performance.' },
            { icon: 'users', title: 'Training & Extension', desc: 'Practical agronomy guidance, farmer group engagement, and climate-smart agricultural training.' },
            { icon: 'truck', title: 'Delivery & Market Linkages', desc: 'Door-to-door delivery and reliable access to buyers for produce, farm supplies, and bulk orders.' }
          ].map(item => `
            <div class="feature-item" style="background:white;border:1px solid var(--neutral-200);border-radius:20px;padding:1.5rem;box-shadow:var(--shadow-sm)">
              <div class="feature-item-icon">${getIcon(item.icon)}</div>
              <div>
                <h4>${item.title}</h4>
                <p>${item.desc}</p>
              </div>
            </div>
          `).join('')}
        </div>
      </div>
    </section>

    <!-- CATEGORIES -->
    <section class="section">
      <div class="container">
        <div class="section-header">
          <span class="badge badge-primary">Browse by Category</span>
          <h2>Shop by Category</h2>
          <p>Everything you need for your farm, all in one place</p>
        </div>
        <div class="grid grid-4">
          ${categories.map((c, i) => `
            <div class="category-card fade-in" data-nav="category/${c.id}" style="animation-delay:${i * 0.05}s">
              <img src="${c.image}" alt="${c.name}" loading="lazy" />
              <div class="category-card-overlay">
                <h3>${c.name}</h3>
                <p>${c.subcategories.length} subcategories</p>
              </div>
            </div>
          `).join('')}
        </div>
      </div>
    </section>

    <!-- FEATURED PRODUCTS -->
    <section class="section bg-light">
      <div class="container">
        <div class="section-header">
          <span class="badge badge-accent">Top Picks</span>
          <h2>Featured Products</h2>
          <p>Hand-picked quality products from verified sellers</p>
        </div>
        <div class="grid grid-4">
          ${featured.map((p, i) => productCardHTML(p, i)).join('')}
        </div>
        <div class="text-center mt-4">
          <button class="btn btn-primary btn-lg" data-nav="marketplace">View All Products ${icons.arrow}</button>
        </div>
      </div>
    </section>

    <!-- VALUE CHAIN -->
    <section class="section">
      <div class="container">
        <div class="section-header">
          <span class="badge badge-primary">The ROBZ Platform</span>
          <h2>A Complete Agricultural Value Chain</h2>
          <p>From farm planning to final delivery, ROBZ connects every stage</p>
        </div>
        <div class="value-chain">
          ${[
            { title: 'Farm Planning', desc: 'Plan crops, calculate inputs, estimate harvest', icon: 'sprout' },
            { title: 'Production', desc: 'Seeds, inputs, equipment, and agronomy support', icon: 'leaf' },
            { title: 'Harvest & Quality', desc: 'Grading, moisture testing, certification', icon: 'check' },
            { title: 'Traceability', desc: 'Track every batch from farm to buyer', icon: 'qr' },
            { title: 'Marketplace', desc: 'B2B trading, contracts, buyer demand board', icon: 'store' },
            { title: 'Logistics & Delivery', desc: 'Farm-to-market transport and warehousing', icon: 'truck' },
            { title: 'Payment & Settlement', desc: 'Secure transactions, farmer payments', icon: 'wallet' },
            { title: 'Analytics', desc: 'Profitability insights for better next season', icon: 'chart' }
          ].map((step, i, arr) => `
            <div class="value-chain-step fade-in" style="animation-delay:${i * 0.05}s">
              <div style="display:flex;align-items:center;gap:0.5rem;justify-content:center">
                <span style="font-size:1.5rem">${getIcon(step.icon)}</span>
                <h4>${step.title}</h4>
              </div>
              <p>${step.desc}</p>
            </div>
            ${i < arr.length - 1 ? `<div class="value-chain-arrow">${icons.arrowDown}</div>` : ''}
          `).join('')}
        </div>
        <div class="text-center mt-4">
          <button class="btn btn-outline btn-lg" data-nav="platform">Explore the Full Platform ${icons.arrow}</button>
        </div>
      </div>
    </section>

    <!-- SERVICES -->
    <section class="section bg-light">
      <div class="container">
        <div class="section-header">
          <span class="badge badge-primary">What We Offer</span>
          <h2>Services Beyond the Marketplace</h2>
          <p>Comprehensive support for every stage of your agribusiness</p>
        </div>
        <div class="grid grid-3">
          ${services.map((s, i) => `
            <div class="service-card fade-in" style="animation-delay:${i * 0.05}s" data-nav="services">
              <div class="service-card-img"><img src="${s.image}" alt="${s.title}" loading="lazy" /></div>
              <div class="service-card-body">
                <div class="service-card-icon">${getIcon(s.icon)}</div>
                <h3>${s.title}</h3>
                <p>${s.description}</p>
              </div>
            </div>
          `).join('')}
        </div>
      </div>
    </section>

    <!-- TESTIMONIALS -->
    <section class="section">
      <div class="container">
        <div class="section-header">
          <span class="badge badge-accent">Success Stories</span>
          <h2>What Our Farmers Say</h2>
          <p>Real results from real farmers using ROBZ</p>
        </div>
        <div class="grid grid-4">
          ${testimonials.map((t, i) => `
            <div class="testimonial-card fade-in" style="animation-delay:${i * 0.05}s">
              <div class="testimonial-header">
                <img src="${t.avatar}" alt="${t.name}" class="testimonial-avatar" loading="lazy" />
                <div>
                  <div class="testimonial-name">${t.name}</div>
                  <div class="testimonial-role">${t.role}</div>
                </div>
              </div>
              <p class="testimonial-text">"${t.text}"</p>
              <div class="stars" style="margin-top:0.5rem">${'\u2605'.repeat(5)}</div>
            </div>
          `).join('')}
        </div>
      </div>
    </section>

    <!-- BLOG PREVIEW -->
    <section class="section bg-light">
      <div class="container">
        <div class="section-header">
          <span class="badge badge-primary">Knowledge Hub</span>
          <h2>Latest from Our Blog</h2>
          <p>Expert insights and practical farming guides</p>
        </div>
        <div class="grid grid-3">
          ${blogPosts.slice(0, 3).map((b, i) => `
            <div class="blog-card fade-in" style="animation-delay:${i * 0.05}s" data-nav="blog/${b.id}">
              <div class="blog-card-img"><img src="${b.image}" alt="${b.title}" loading="lazy" /></div>
              <div class="blog-card-body">
                <div class="blog-card-meta">
                  <span class="badge badge-primary">${b.category}</span>
                  <span>${b.date}</span>
                </div>
                <h3>${b.title}</h3>
                <p>${b.excerpt}</p>
                <span class="blog-card-read">Read More ${icons.arrow}</span>
              </div>
            </div>
          `).join('')}
        </div>
        <div class="text-center mt-4">
          <button class="btn btn-outline" data-nav="blog">View All Articles ${icons.arrow}</button>
        </div>
      </div>
    </section>

    <!-- CTA -->
    <section class="section">
      <div class="container">
        <div class="cta-section">
          <h2>Ready to Transform Your Farm?</h2>
          <p>Join 15,000+ farmers already growing with ROBZ</p>
          <div class="flex gap-2 justify-center flex-wrap">
            <button class="btn btn-white btn-lg" data-nav="marketplace">Start Shopping</button>
            <button class="btn btn-outline btn-lg" style="border-color:white;color:white" data-nav="contact">Become a Seller</button>
          </div>
        </div>
      </div>
    </section>
  `

  const wrapper = pageWrapper(content)
  setTimeout(() => {
    const searchInput = document.getElementById('hero-search-input')
    if (searchInput) {
      searchInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter' && searchInput.value.trim()) {
          navigate('marketplace')
        }
      })
    }
  }, 100)
  return wrapper
}

// ===== PRODUCT CARD HTML =====
export function productCardHTML(p, i = 0, rowLayout = false) {
  const cat = getCategoryById(p.category)
  return `
    <div class="product-card ${rowLayout ? 'product-card-row' : ''} fade-in" style="animation-delay:${i * 0.05}s" data-nav="product/${p.id}">
      <div class="product-card-img">
        ${p.badge ? `<span class="badge ${p.badge === 'Best Seller' ? 'badge-accent' : p.badge === 'New Arrival' ? 'badge-success' : 'badge-primary'} product-card-badge">${p.badge}</span>` : ''}
        ${!p.inStock ? '<span class="badge badge-error product-card-stock">Out of Stock</span>' : ''}
        <img src="${p.image}" alt="${p.name}" loading="lazy" />
      </div>
      <div class="product-card-body">
        <span class="product-card-category">${cat ? cat.name : ''}</span>
        <h3>${p.name}</h3>
        <div class="product-card-seller">${icons.store} ${p.seller} &middot; ${businessInfo.address}</div>
        <div class="product-card-rating">
          <span class="stars">${getStars(p.rating)}</span>
          <span class="text-muted">${p.rating} (${p.reviews})</span>
        </div>
        <div class="product-card-price">
          <div>
            <span class="price">${formatPrice(p.price)}</span>
            <span class="unit">${p.unit}</span>
          </div>
          ${p.inStock ? `<button class="product-card-add" onclick="event.stopPropagation()" data-add-cart="${p.id}">${icons.plus}</button>` : ''}
        </div>
      </div>
    </div>
  `
}

// ===== MARKETPLACE =====
export function renderMarketplace() {
  const content = `
    <div class="page-banner">
      <div class="container">
        <h1>Marketplace</h1>
        <p>Browse ${products.length}+ products available from our OCODRI base</p>
      </div>
    </div>
    <section class="section">
      <div class="container">
        <div class="marketplace-layout">
          <aside class="filter-sidebar" id="filter-sidebar">
            <div class="filter-group">
              <h4>Categories</h4>
              ${categories.map(c => `
                <div class="filter-option" data-filter-cat="${c.id}">
                  <span>${getIcon(c.icon)}</span>
                  <span>${c.name}</span>
                  <span class="filter-count">${products.filter(p => p.category === c.id).length}</span>
                </div>
              `).join('')}
            </div>
            <div class="filter-group">
              <h4>Price Range</h4>
              <div class="price-range">
                <input type="number" placeholder="Min" id="price-min" />
                <span>-</span>
                <input type="number" placeholder="Max" id="price-max" />
              </div>
            </div>
            <div class="filter-group">
              <h4>Availability</h4>
              <div class="filter-option"><input type="checkbox" id="filter-instock" checked /> <span>In Stock Only</span></div>
            </div>
            <div class="filter-group">
              <h4>Rating</h4>
              <div class="filter-option" data-filter-rating="4"><span class="stars">${'\u2605'.repeat(4)}${'\u2606'}</span> <span>&amp; up</span></div>
              <div class="filter-option" data-filter-rating="3"><span class="stars">${'\u2605'.repeat(3)}${'\u2606'.repeat(2)}</span> <span>&amp; up</span></div>
            </div>
            <button class="btn btn-outline btn-sm" id="clear-filters" style="width:100%;margin-top:0.5rem">Clear Filters</button>
          </aside>
          <div>
            <div class="sort-bar">
              <span class="result-count" id="result-count">Showing ${products.length} products</span>
              <select id="sort-select">
                <option value="featured">Sort: Featured</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
                <option value="rating">Highest Rated</option>
                <option value="name">Name: A-Z</option>
              </select>
            </div>
            <div class="grid product-list-rows" id="product-grid">
              ${products.map((p, i) => productCardHTML(p, i, true)).join('')}
            </div>
          </div>
        </div>
      </div>
    </section>
  `

  const wrapper = pageWrapper(content, true, [{ label: 'Home', path: '' }, { label: 'Marketplace', path: 'marketplace' }])

  setTimeout(() => {
    let activeFilters = { cat: null, minPrice: null, maxPrice: null, inStock: true, rating: 0, sort: 'featured' }

    function applyFilters() {
      let filtered = [...products]
      if (activeFilters.cat) filtered = filtered.filter(p => p.category === activeFilters.cat)
      if (activeFilters.inStock) filtered = filtered.filter(p => p.inStock)
      if (activeFilters.minPrice) filtered = filtered.filter(p => p.price >= activeFilters.minPrice)
      if (activeFilters.maxPrice) filtered = filtered.filter(p => p.price <= activeFilters.maxPrice)
      if (activeFilters.rating) filtered = filtered.filter(p => p.rating >= activeFilters.rating)
      switch (activeFilters.sort) {
        case 'price-low': filtered.sort((a, b) => a.price - b.price); break
        case 'price-high': filtered.sort((a, b) => b.price - a.price); break
        case 'rating': filtered.sort((a, b) => b.rating - a.rating); break
        case 'name': filtered.sort((a, b) => a.name.localeCompare(b.name)); break
      }
      const grid = document.getElementById('product-grid')
      const count = document.getElementById('result-count')
      if (filtered.length === 0) {
        grid.innerHTML = '<div class="empty-state"><div class="empty-state-icon">' + icons.search + '</div><h3>No products found</h3><p>Try adjusting your filters</p></div>'
      } else {
        grid.innerHTML = filtered.map((p, i) => productCardHTML(p, i, true)).join('')
      }
      count.textContent = `Showing ${filtered.length} product${filtered.length !== 1 ? 's' : ''}`
      bindNavLinks()
    }

    document.querySelectorAll('[data-filter-cat]').forEach(opt => {
      opt.addEventListener('click', () => {
        const cat = opt.getAttribute('data-filter-cat')
        activeFilters.cat = activeFilters.cat === cat ? null : cat
        document.querySelectorAll('[data-filter-cat]').forEach(o => o.style.background = '')
        if (activeFilters.cat) opt.style.background = 'var(--primary-50)'
        applyFilters()
      })
    })

    document.querySelectorAll('[data-filter-rating]').forEach(opt => {
      opt.addEventListener('click', () => {
        activeFilters.rating = parseInt(opt.getAttribute('data-filter-rating'))
        applyFilters()
      })
    })

    document.getElementById('price-min')?.addEventListener('input', e => { activeFilters.minPrice = parseFloat(e.target.value) || null; applyFilters() })
    document.getElementById('price-max')?.addEventListener('input', e => { activeFilters.maxPrice = parseFloat(e.target.value) || null; applyFilters() })
    document.getElementById('filter-instock')?.addEventListener('change', e => { activeFilters.inStock = e.target.checked; applyFilters() })
    document.getElementById('sort-select')?.addEventListener('change', e => { activeFilters.sort = e.target.value; applyFilters() })
    document.getElementById('clear-filters')?.addEventListener('click', () => {
      activeFilters = { cat: null, minPrice: null, maxPrice: null, inStock: true, rating: 0, sort: 'featured' }
      document.querySelectorAll('[data-filter-cat]').forEach(o => o.style.background = '')
      document.getElementById('price-min').value = ''
      document.getElementById('price-max').value = ''
      document.getElementById('filter-instock').checked = true
      document.getElementById('sort-select').value = 'featured'
      applyFilters()
    })

    bindNavLinks()
  }, 100)

  return wrapper
}

function bindNavLinks() {
  document.querySelectorAll('[data-nav]').forEach(link => {
    link.onclick = (e) => {
      e.preventDefault()
      e.stopPropagation()
      navigate(link.getAttribute('data-nav'))
    }
  })
  document.querySelectorAll('[data-add-cart]').forEach(btn => {
    btn.onclick = (e) => {
      e.preventDefault()
      e.stopPropagation()
      addToCart(btn.getAttribute('data-add-cart'))
    }
  })
}

// ===== PRODUCT DETAIL =====
export function renderProductDetail(params) {
  const product = getProductById(params.id)
  if (!product) { navigate('marketplace'); return el('div') }
  const cat = getCategoryById(product.category)
  const related = products.filter(p => p.category === product.category && p.id !== product.id).slice(0, 4)

  const content = `
    <section class="section">
      <div class="container">
        <div class="product-detail">
          <div>
            <div class="product-gallery-main" id="gallery-main">
              <img src="${product.gallery[0]}" alt="${product.name}" />
            </div>
            <div class="product-gallery-thumbs">
              ${product.gallery.map((g, i) => `
                <div class="product-thumb ${i === 0 ? 'active' : ''}" data-gallery="${i}">
                  <img src="${g}" alt="${product.name} view ${i + 1}" loading="lazy" />
                </div>
              `).join('')}
            </div>
            ${product.video ? `
              <div class="product-video mt-2">
                <iframe src="${product.video}" title="${product.name} video" allowfullscreen></iframe>
              </div>
            ` : ''}
          </div>
          <div class="product-info">
            <div class="flex gap-2 flex-wrap mb-1">
              <span class="badge badge-primary">${cat ? cat.name : ''}</span>
              <span class="badge badge-neutral">${product.subcategory}</span>
              ${product.badge ? `<span class="badge badge-accent">${product.badge}</span>` : ''}
              ${product.inStock ? '<span class="badge badge-success">In Stock</span>' : '<span class="badge badge-error">Out of Stock</span>'}
            </div>
            <h1>${product.name}</h1>
            <div class="product-info-meta">
              <span class="stars">${getStars(product.rating)}</span>
              <span class="text-muted">${product.rating} (${product.reviews} reviews)</span>
              <span class="text-muted">&middot;</span>
              <span class="text-muted">${icons.store} ${product.seller}</span>
              <span class="text-muted">&middot;</span>
              <span class="text-muted">${icons.location} ${businessInfo.address}</span>
            </div>
            <div class="product-info-price">
              <span class="price">${formatPrice(product.price)}</span>
              <span class="unit">${product.unit}</span>
            </div>
            <p class="product-info-desc">${product.description}</p>
            <div class="product-specs">
              <h4>Specifications</h4>
              ${Object.entries(product.specs).map(([k, v]) => `<div class="spec-row"><span class="key">${k}</span><span class="val">${v}</span></div>`).join('')}
            </div>
            ${product.inStock ? `
              <div class="qty-selector">
                <button class="qty-btn" id="qty-minus">${icons.minus}</button>
                <span class="qty-value" id="qty-value">1</span>
                <button class="qty-btn" id="qty-plus">${icons.plus}</button>
              </div>
              <div class="flex gap-2 flex-wrap">
                <button class="btn btn-primary btn-lg" id="add-to-cart-btn">${icons.cart} Add to Cart</button>
                <button class="btn btn-accent btn-lg" id="buy-now-btn">Buy Now</button>
                <button class="btn btn-outline" id="wishlist-btn">${icons.heart || icons.star} Save</button>
              </div>
            ` : '<div class="badge badge-error" style="font-size:1rem;padding:0.5rem 1rem">Currently Unavailable</div>'}
            <div class="flex gap-3 mt-4" style="border-top:1px solid var(--neutral-200);padding-top:1rem">
              <div style="display:flex;align-items:center;gap:0.5rem;font-size:0.85rem;color:var(--neutral-500)">
                ${icons.truck} <span>Reliable delivery from OCODRI</span>
              </div>
              <div style="display:flex;align-items:center;gap:0.5rem;font-size:0.85rem;color:var(--neutral-500)">
                ${icons.shield} <span>Quality guaranteed</span>
              </div>
              <div style="display:flex;align-items:center;gap:0.5rem;font-size:0.85rem;color:var(--neutral-500)">
                ${icons.check} <span>Verified seller</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
    ${related.length > 0 ? `
      <section class="section bg-light">
        <div class="container">
          <div class="section-header-left">
            <h2>Related Products</h2>
            <p>You might also be interested in these</p>
          </div>
          <div class="grid grid-4">
            ${related.map((p, i) => productCardHTML(p, i)).join('')}
          </div>
        </div>
      </section>
    ` : ''}
  `

  const wrapper = pageWrapper(content, true, [
    { label: 'Home', path: '' },
    { label: 'Marketplace', path: 'marketplace' },
    { label: cat ? cat.name : 'Product', path: `category/${product.category}` },
    { label: product.name }
  ])

  setTimeout(() => {
    let qty = 1
    const qtyValue = document.getElementById('qty-value')
    document.getElementById('qty-plus')?.addEventListener('click', () => { qty++; qtyValue.textContent = qty })
    document.getElementById('qty-minus')?.addEventListener('click', () => { if (qty > 1) { qty--; qtyValue.textContent = qty } })
    document.getElementById('add-to-cart-btn')?.addEventListener('click', () => addToCart(product.id, qty))
    document.getElementById('buy-now-btn')?.addEventListener('click', () => { addToCart(product.id, qty); navigate('cart') })

    document.querySelectorAll('[data-gallery]').forEach(thumb => {
      thumb.addEventListener('click', () => {
        const idx = parseInt(thumb.getAttribute('data-gallery'))
        document.getElementById('gallery-main').querySelector('img').src = product.gallery[idx]
        document.querySelectorAll('[data-gallery]').forEach(t => t.classList.remove('active'))
        thumb.classList.add('active')
      })
    })
    bindNavLinks()
  }, 100)

  return wrapper
}

// ===== CATEGORY PAGE =====
export function renderCategory(params) {
  const cat = getCategoryById(params.id)
  if (!cat) { navigate('marketplace'); return el('div') }
  const catProducts = products.filter(p => p.category === cat.id)

  const content = `
    <div class="page-banner">
      <div class="container">
        <h1>${cat.name}</h1>
        <p>${cat.description}</p>
      </div>
    </div>
    <section class="section">
      <div class="container">
        <div class="section-header-left mb-4">
          <h2>Subcategories</h2>
          <div class="flex gap-1 flex-wrap mt-2">
            ${cat.subcategories.map(s => `<span class="badge badge-primary">${getIcon(cat.icon)} ${s}</span>`).join('')}
          </div>
        </div>
        ${catProducts.length > 0 ? `
          <div class="grid grid-4">
            ${catProducts.map((p, i) => productCardHTML(p, i)).join('')}
          </div>
        ` : '<div class="empty-state"><div class="empty-state-icon">' + icons.search + '</div><h3>No products yet</h3><p>Check back soon for new listings</p></div>'}
      </div>
    </section>
  `

  const wrapper = pageWrapper(content, true, [{ label: 'Home', path: '' }, { label: 'Marketplace', path: 'marketplace' }, { label: cat.name }])
  setTimeout(bindNavLinks, 100)
  return wrapper
}

// ===== CART =====
export function renderCart() {
  const cartItems = cart.map(item => {
    const p = getProductById(item.id)
    return p ? { ...p, qty: item.qty } : null
  }).filter(Boolean)

  const content = `
    <section class="section">
      <div class="container">
        <div class="section-header-left">
          <h1>Shopping Cart</h1>
          <p>${cartItems.length} item${cartItems.length !== 1 ? 's' : ''} in your cart</p>
        </div>
        ${cartItems.length === 0 ? `
          <div class="empty-state">
            <div class="empty-state-icon">${icons.cart}</div>
            <h3>Your cart is empty</h3>
            <p>Browse our marketplace to find quality agricultural products</p>
            <button class="btn btn-primary btn-lg mt-3" data-nav="marketplace">Shop Now</button>
          </div>
        ` : `
          <div style="display:grid;gap:1.5rem;grid-template-columns:1fr" class="cart-layout">
            <div>
              ${cartItems.map(item => `
                <div class="cart-item">
                  <div class="cart-item-img"><img src="${item.image}" alt="${item.name}" /></div>
                  <div class="cart-item-info">
                    <h4>${item.name}</h4>
                    <p>${item.seller} &middot; ${formatPrice(item.price)} ${item.unit}</p>
                  </div>
                  <div class="qty-selector" style="margin:0">
                    <button class="qty-btn" data-cart-minus="${item.id}">${icons.minus}</button>
                    <span class="qty-value">${item.qty}</span>
                    <button class="qty-btn" data-cart-plus="${item.id}">${icons.plus}</button>
                  </div>
                  <div class="cart-item-price">${formatPrice(item.price * item.qty)}</div>
                  <button class="cart-item-remove" data-cart-remove="${item.id}">${icons.trash}</button>
                </div>
              `).join('')}
            </div>
            <div class="cart-summary">
              <h3>Order Summary</h3>
              <div class="cart-summary-row"><span>Subtotal</span><span>${formatPrice(getCartTotal())}</span></div>
              <div class="cart-summary-row"><span>Delivery</span><span>Calculated at checkout</span></div>
              <div class="cart-summary-row"><span>Platform Fee</span><span>${formatPrice(Math.round(getCartTotal() * 0.02))}</span></div>
              <div class="cart-summary-total"><span>Total</span><span class="price">${formatPrice(getCartTotal() + Math.round(getCartTotal() * 0.02))}</span></div>
              <button class="btn btn-primary btn-lg" style="width:100%;margin-top:1rem" data-nav="checkout">Proceed to Checkout</button>
              <button class="btn btn-ghost" style="width:100%;margin-top:0.5rem" data-nav="marketplace">Continue Shopping</button>
            </div>
          </div>
        `}
      </div>
    </section>
  `

  const wrapper = pageWrapper(content, true, [{ label: 'Home', path: '' }, { label: 'Cart' }])

  setTimeout(() => {
    document.querySelectorAll('[data-cart-plus]').forEach(btn => {
      btn.onclick = () => updateCartQty(btn.getAttribute('data-cart-plus'), 1)
    })
    document.querySelectorAll('[data-cart-minus]').forEach(btn => {
      btn.onclick = () => updateCartQty(btn.getAttribute('data-cart-minus'), -1)
    })
    document.querySelectorAll('[data-cart-remove]').forEach(btn => {
      btn.onclick = () => removeFromCart(btn.getAttribute('data-cart-remove'))
    })
    bindNavLinks()
  }, 100)

  return wrapper
}

// ===== CHECKOUT =====
export function renderCheckout() {
  if (cart.length === 0) { navigate('cart'); return el('div') }

  const cartItems = cart.map(item => {
    const product = getProductById(item.id)
    return product ? { ...product, qty: item.qty } : null
  }).filter(Boolean)
  const subtotal = getCartTotal()
  const fee = Math.round(subtotal * 0.02)
  const total = subtotal + fee

  const content = `
    <section class="section checkout-page">
      <div class="container">
        <div class="checkout-progress" aria-label="Checkout progress">
          <span class="complete">1. Cart</span><span class="active">2. Payment</span><span>3. Confirmation</span>
        </div>
        <div class="checkout-layout">
          <form class="checkout-form" id="checkout-form">
            <div class="checkout-card">
              <div class="checkout-card-heading"><span class="checkout-step">1</span><div><h2>Delivery details</h2><p>Tell us where to deliver your order in OCODRI.</p></div></div>
              <div class="form-row">
                <div class="form-group"><label for="checkout-name">Full name</label><input id="checkout-name" name="name" required autocomplete="name" placeholder="Your full name" /></div>
                <div class="form-group"><label for="checkout-phone">Phone number</label><input id="checkout-phone" name="phone" required autocomplete="tel" placeholder="+256 700 000 000" /></div>
              </div>
              <div class="form-group"><label for="checkout-address">Delivery address</label><input id="checkout-address" name="address" required autocomplete="street-address" value="OCODRI, BILEAFE SUBCOUNTY, TEREGO DISTRICT, ARUA CITY" /></div>
              <div class="form-group"><label for="checkout-note">Delivery note <span class="text-muted">(optional)</span></label><textarea id="checkout-note" name="note" placeholder="Nearby landmark or delivery instructions"></textarea></div>
            </div>

            <div class="checkout-card">
              <div class="checkout-card-heading"><span class="checkout-step">2</span><div><h2>Choose payment method</h2><p>Select how you would like to pay in Ugandan shillings.</p></div></div>
              <div class="payment-methods">
                <label class="payment-method selected"><input type="radio" name="paymentMethod" value="mobile-money" checked /><span class="payment-method-icon">${icons.phoneMobile}</span><span><strong>Mobile Money</strong><small>MTN or Airtel Money</small></span></label>
                <label class="payment-method"><input type="radio" name="paymentMethod" value="bank-transfer" /><span class="payment-method-icon">${icons.bank || icons.wallet}</span><span><strong>Bank Transfer</strong><small>Choose your preferred bank</small></span></label>
                <label class="payment-method"><input type="radio" name="paymentMethod" value="google-pay" /><span class="payment-method-icon">G</span><span><strong>Google Pay</strong><small>Continue securely with Google</small></span></label>
                <label class="payment-method"><input type="radio" name="paymentMethod" value="card" /><span class="payment-method-icon">${icons.creditCard}</span><span><strong>Debit or credit card</strong><small>Visa or Mastercard</small></span></label>
                <label class="payment-method"><input type="radio" name="paymentMethod" value="cash" /><span class="payment-method-icon">${icons.wallet}</span><span><strong>Cash on delivery</strong><small>Pay when your order arrives</small></span></label>
              </div>
              <div class="payment-panel" data-payment-panel="mobile-money">
                <div class="form-row"><div class="form-group"><label for="mobile-provider">Provider</label><select id="mobile-provider" name="mobileProvider"><option>MTN Mobile Money</option><option>Airtel Money</option></select></div><div class="form-group"><label for="mobile-number">Mobile Money number</label><input id="mobile-number" name="mobileNumber" inputmode="tel" placeholder="+256 700 000 000" /></div></div>
                <p class="payment-note">After placing the order, follow the prompt on your phone to approve the UGX payment.</p>
              </div>
              <div class="payment-panel hidden" data-payment-panel="bank-transfer">
                <div class="form-group"><label for="bank-name">Preferred bank</label><select id="bank-name" name="bankName"><option>Centenary Bank</option><option>Stanbic Bank Uganda</option><option>Equity Bank Uganda</option><option>Other bank</option></select></div>
                <p class="payment-note">Your order reference and bank instructions will be confirmed by the ROBZ team at ${businessInfo.phone} before you transfer funds.</p>
              </div>
              <div class="payment-panel hidden" data-payment-panel="google-pay"><p class="payment-note">Continue securely with Google Pay. Availability depends on the device and account region.</p><button class="btn btn-outline mt-2" type="button" id="google-pay-btn">Open Google Pay</button></div>
              <div class="payment-panel hidden" data-payment-panel="card">
                <div class="form-group"><label for="card-number">Card number</label><input id="card-number" name="cardNumber" inputmode="numeric" autocomplete="cc-number" placeholder="0000 0000 0000 0000" /></div>
                <div class="form-row"><div class="form-group"><label for="card-expiry">Expiry</label><input id="card-expiry" name="cardExpiry" autocomplete="cc-exp" placeholder="MM / YY" /></div><div class="form-group"><label for="card-cvc">CVC</label><input id="card-cvc" name="cardCvc" inputmode="numeric" autocomplete="cc-csc" placeholder="123" /></div></div>
                <p class="payment-note">Card details are only collected for the selected checkout method and are not stored by this demo.</p>
              </div>
              <div class="payment-panel hidden" data-payment-panel="cash"><p class="payment-note">Please have the exact UGX amount ready when your order is delivered. Our team will call to confirm the delivery time.</p></div>
            </div>
            <div class="checkout-action-row"><button class="btn btn-primary btn-lg" type="submit">Place Order · ${formatPrice(total)}</button><button class="btn btn-ghost" type="button" data-nav="cart">Back to Cart</button></div>
            <p class="checkout-status" id="checkout-status" role="status" aria-live="polite"></p>
          </form>
          <aside class="checkout-card checkout-order-summary"><h2>Your order</h2>${cartItems.map(item => `<div class="checkout-item"><img src="${item.image}" alt="${item.name}" /><div><strong>${item.name}</strong><small>${item.qty} × ${formatPrice(item.price)}</small></div><span>${formatPrice(item.price * item.qty)}</span></div>`).join('')}<div class="cart-summary-row"><span>Subtotal</span><span>${formatPrice(subtotal)}</span></div><div class="cart-summary-row"><span>Platform fee</span><span>${formatPrice(fee)}</span></div><div class="cart-summary-total"><span>Total</span><span class="price">${formatPrice(total)}</span></div><p class="payment-note">All prices are shown in Ugandan shillings. Delivery is coordinated from OCODRI.</p></aside>
        </div>
      </div>
    </section>
  `
  const wrapper = pageWrapper(content, true, [{ label: 'Home', path: '' }, { label: 'Cart', path: 'cart' }, { label: 'Checkout' }])

  setTimeout(() => {
    const form = document.getElementById('checkout-form')
    const status = document.getElementById('checkout-status')
    document.querySelectorAll('[name="paymentMethod"]').forEach(radio => radio.addEventListener('change', () => {
      document.querySelectorAll('.payment-method').forEach(method => method.classList.toggle('selected', method.querySelector('input').checked))
      document.querySelectorAll('[data-payment-panel]').forEach(panel => panel.classList.toggle('hidden', panel.getAttribute('data-payment-panel') !== radio.value || !radio.checked))
    }))
    document.getElementById('google-pay-btn')?.addEventListener('click', () => window.open('https://pay.google.com/', '_blank', 'noopener,noreferrer'))
    form?.addEventListener('submit', event => {
      event.preventDefault()
      if (!form.checkValidity()) { status.textContent = 'Please complete your delivery details before placing the order.'; status.className = 'checkout-status error'; form.querySelector(':invalid')?.focus(); return }
      const method = form.elements.paymentMethod.value
      if (method === 'mobile-money' && !form.elements.mobileNumber.value.trim()) { status.textContent = 'Enter the Mobile Money number to continue.'; status.className = 'checkout-status error'; form.elements.mobileNumber.focus(); return }
      const orderId = `OC-${Date.now().toString().slice(-8)}`
      localStorage.setItem('robz_last_order', JSON.stringify({ orderId, total, method, createdAt: new Date().toISOString() }))
      cart.length = 0
      localStorage.removeItem('robz_cart')
      form.innerHTML = `<div class="checkout-success">${icons.check}<h2>Order ${orderId} received</h2><p>Your order has been recorded for confirmation. ROBZ will contact you at ${businessInfo.phone} with the next payment step.</p><button class="btn btn-primary mt-3" type="button" data-nav="marketplace">Continue Shopping</button></div>`
      showToast('Order placed successfully.')
      bindNavLinks()
    })
    bindNavLinks()
  }, 100)
  return wrapper
}
