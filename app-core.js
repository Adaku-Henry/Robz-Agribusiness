import './style.css'
import {
  categories, products, blogPosts, faqs, testimonials, services, stats, businessInfo, localImages
} from './data.js'

// ===== STATE =====
let cart = JSON.parse(localStorage.getItem('robz_cart') || '[]')
const profileStorageKey = 'robz_profile_v1'
const defaultProfile = {
  fullName: '',
  email: '',
  phone: '',
  role: 'Farmer',
  location: '',
  organization: '',
  farmSize: '',
  crops: '',
  bio: '',
  avatar: '',
  emailUpdates: true,
  smsUpdates: false
}

function getProfile() {
  try {
    const saved = JSON.parse(localStorage.getItem(profileStorageKey) || '{}')
    return { ...defaultProfile, ...(saved && typeof saved === 'object' ? saved : {}) }
  } catch {
    return { ...defaultProfile }
  }
}

function saveProfile(profile) {
  const saved = { ...getProfile(), ...profile, updatedAt: new Date().toISOString() }
  localStorage.setItem(profileStorageKey, JSON.stringify(saved))
  return saved
}

function resetProfile() {
  localStorage.removeItem(profileStorageKey)
  return getProfile()
}

// Router callbacks — set by main.js
let navigateCallback = (path) => {}
let rerenderCallback = () => {}

function setNavigateCallback(fn) { navigateCallback = fn }
function setRerenderCallback(fn) { rerenderCallback = fn }

function navigate(path) {
  navigateCallback(path)
}

function handleRoute() {
  rerenderCallback()
}

// ===== ICONS (inline SVG) =====
const icons = {
  cart: '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="9" cy="21" r="1"/><circle cx="20" cy="21" r="1"/><path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"/></svg>',
  menu: '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="18" x2="21" y2="18"/></svg>',
  close: '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>',
  search: '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>',
  chevron: '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="6 9 12 15 18 9"/></svg>',
  arrow: '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 5 19"/></svg>',
  arrowDown: '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="12" y1="5" x2="12" y2="19"/><polyline points="19 12 12 19 5 12"/></svg>',
  plus: '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>',
  minus: '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><line x1="5" y1="12" x2="19" y2="12"/></svg>',
  trash: '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="3 6 5 6 21 6"/><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/></svg>',
  star: '<svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>',
  check: '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg>',
  phone: '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg>',
  mail: '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>',
  location: '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>',
  clock: '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>',
  truck: '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="1" y="3" width="15" height="13"/><polygon points="16 8 20 8 23 11 23 16 16 16 16 8"/><circle cx="5.5" cy="18.5" r="2.5"/><circle cx="18.5" cy="18.5" r="2.5"/></svg>',
  leaf: '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.48 19 2c1 2 2 4.18 2 8 0 5.5-4.78 10-10 10z"/><path d="M2 21c0-3 1.85-5.36 5.08-6"/></svg>',
  shield: '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>',
  creditCard: '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="1" y="4" width="22" height="16" rx="2" ry="2"/><line x1="1" y1="10" x2="23" y2="10"/></svg>',
  users: '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>',
  store: '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 9l1-5h16l1 5"/><path d="M4 9v11a1 1 0 0 0 1 1h14a1 1 0 0 0 1-1V9"/><line x1="3" y1="9" x2="21" y2="9"/></svg>',
  wheat: '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M2 22 16 8"/><path d="M3.47 12.53 5 11l1.53 1.53a3.5 3.5 0 0 1 0 4.94L5 19l-1.53-1.53a3.5 3.5 0 0 1 0-4.94Z"/><path d="M7.47 8.53 9 7l1.53 1.53a3.5 3.5 0 0 1 0 4.94L9 15l-1.53-1.53a3.5 3.5 0 0 1 0-4.94Z"/><path d="M11.47 4.53 13 3l1.53 1.53a3.5 3.5 0 0 1 0 4.94L13 11l-1.53-1.53a3.5 3.5 0 0 1 0-4.94Z"/></svg>',
  sprout: '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M7 20h10"/><path d="M10 20c5.5-2.5.8-6.4 3-10"/><path d="M9.5 9.4c1.1.8 1.8 2.2 2.3 3.7-2 .2-3.5.9-4.7 2.2-1.2-2.8-.5-4.6 2.4-5.9Z"/></svg>',
  droplet: '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 22a7 7 0 0 0 7-7c0-2-1-3.9-3-5.5s-3.5-4-4-6.5c-.5 2.5-2 4.9-4 6.5C6 11.1 5 13 5 15a7 7 0 0 0 7 7z"/></svg>',
  honey: '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M16 11h1a3 3 0 0 0 0-6 4 4 0 0 0-7.5-1A4.5 4.5 0 0 0 4 8.5 3.5 3.5 0 0 0 7 12"/><path d="M9 17h6"/><path d="M10 21h4"/></svg>',
  cow: '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 4h-2a4 4 0 0 0-4 4v8a4 4 0 0 0 4 4h2"/><circle cx="8" cy="8" r="3"/><path d="M18 8v8"/></svg>',
  apple: '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 20.94c1.5 0 2.75 1.06 4 1.06 3 0 6-8 6-12.22A4.91 4.91 0 0 0 17 5c-2.22 0-4.06 1.4-5 2.5C11.06 6.4 9.22 5 7 5a4.91 4.91 0 0 0-5 4.78C2 14 5 22 8 22c1.25 0 2.5-1.06 4-1.06Z"/><path d="M10 2c1 .5 2 2 2 5"/></svg>',
  carrot: '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M2 27h6l3-10"/><path d="M6 17 8 21"/><path d="M11 13l1 2"/><path d="M14 10l1 2"/><path d="M8 5 4 7"/><path d="M16 3l-4 2"/><path d="M12 22 8 6"/></svg>',
  tractor: '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 4h9v7"/><path d="M5 11h6"/><path d="M9 18a3 3 0 1 0-6 0 3 3 0 0 0 6 0z"/><path d="M21 18a4 4 0 1 0-8 0 4 4 0 0 0 8 0z"/><path d="M12 18v-7h6l3 3v4"/></svg>',
  facebook: '<svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/></svg>',
  twitter: '<svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z"/></svg>',
  instagram: '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/></svg>',
  linkedin: '<svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect x="2" y="9" width="4" height="12"/><circle cx="4" cy="4" r="2"/></svg>',
  play: '<svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor"><polygon points="5 3 19 12 5 21 5 3"/></svg>',
  robot: '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="8" width="18" height="12" rx="2"/><path d="M12 8V4"/><circle cx="12" cy="4" r="1"/><circle cx="9" cy="14" r="1"/><circle cx="15" cy="14" r="1"/></svg>',
  chart: '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="20" x2="18" y2="10"/><line x1="12" y1="20" x2="12" y2="4"/><line x1="6" y1="20" x2="6" y2="14"/><line x1="3" y1="20" x2="21" y2="20"/></svg>',
  file: '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/></svg>',
  award: '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="8" r="7"/><polyline points="8.21 13.89 7 23 12 20 17 23 15.79 13.88"/></svg>',
  sun: '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="5"/><line x1="12" y1="1" x2="12" y2="3"/><line x1="12" y1="21" x2="12" y2="23"/><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/><line x1="1" y1="12" x2="3" y2="12"/><line x1="21" y1="12" x2="23" y2="12"/><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/></svg>',
  book: '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/></svg>',
  qr: '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/><line x1="14" y1="14" x2="14" y2="21"/><line x1="21" y1="14" x2="21" y2="21"/><line x1="14" y1="17" x2="21" y2="17"/></svg>',
  wallet: '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 12V7H5a2 2 0 0 1 0-4h14v4"/><path d="M3 5v14a2 2 0 0 0 2 2h16v-5"/><path d="M18 12a2 2 0 0 0 0 4h4v-4Z"/></svg>',
  phoneMobile: '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="5" y="2" width="14" height="20" rx="2" ry="2"/><line x1="12" y1="18" x2="12.01" y2="18"/></svg>',
  layers: '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="12 2 2 7 12 12 22 7 12 2"/><polyline points="2 17 12 22 22 17"/><polyline points="2 12 12 17 22 12"/></svg>',
  factory: '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M2 20h20V8l-6 4V8l-6 4V4H4v16z"/></svg>',
  flask: '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M9 3h6v5l5 9a3 3 0 0 1-3 5H7a3 3 0 0 1-3-5l5-9V3z"/><line x1="9" y1="3" x2="15" y2="3"/></svg>',
  clipboard: '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"/><rect x="8" y="2" width="8" height="4" rx="1" ry="1"/></svg>',
  globe: '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/></svg>'
}

function getIcon(name) { return icons[name] || icons.leaf }

// ===== HELPER FUNCTIONS =====
function el(tag, className, html) {
  const e = document.createElement(tag)
  if (className) e.className = className
  if (html !== undefined) e.innerHTML = html
  return e
}

function formatPrice(price) {
  return 'UGX ' + price.toLocaleString('en-UG')
}

function getStars(rating) {
  const full = Math.floor(rating)
  const half = rating % 1 >= 0.5
  return '\u2605'.repeat(full) + (half ? '\u2606' : '') + '\u2606'.repeat(5 - full - (half ? 1 : 0))
}

function getCategoryById(id) {
  return categories.find(c => c.id === id)
}

function getProductById(id) {
  return products.find(p => p.id === id)
}

function saveCart() {
  localStorage.setItem('robz_cart', JSON.stringify(cart))
  updateCartCount()
}

function addToCart(productId, qty = 1) {
  const existing = cart.find(item => item.id === productId)
  if (existing) {
    existing.qty += qty
  } else {
    cart.push({ id: productId, qty })
  }
  saveCart()
  showToast('Added to cart!')
}

function removeFromCart(productId) {
  cart = cart.filter(item => item.id !== productId)
  saveCart()
  handleRoute()
}

function updateCartQty(productId, delta) {
  const item = cart.find(i => i.id === productId)
  if (item) {
    item.qty += delta
    if (item.qty <= 0) {
      removeFromCart(productId)
    } else {
      saveCart()
      handleRoute()
    }
  }
}

function getCartTotal() {
  return cart.reduce((sum, item) => {
    const product = getProductById(item.id)
    return sum + (product ? product.price * item.qty : 0)
  }, 0)
}

function getCartCount() {
  return cart.reduce((sum, item) => sum + item.qty, 0)
}

function updateCartCount() {
  const countEl = document.querySelector('.cart-count')
  if (countEl) {
    const count = getCartCount()
    countEl.textContent = count
    countEl.style.display = count > 0 ? 'flex' : 'none'
  }
}

function showToast(message) {
  const existing = document.querySelector('.toast')
  if (existing) existing.remove()
  const toast = el('div', 'toast', `${icons.check} ${message}`)
  document.body.appendChild(toast)
  requestAnimationFrame(() => toast.classList.add('show'))
  setTimeout(() => {
    toast.classList.remove('show')
    setTimeout(() => toast.remove(), 300)
  }, 2500)
}

// ===== HEADER =====
function renderHeader() {
  const header = el('header', 'header')
  header.innerHTML = `
    <div class="container header-inner">
      <div class="logo" data-nav="">
        <img class="logo-image" src="${localImages.logo}" alt="ROBZ logo" />
        <span>ROBZ</span>
      </div>
      <nav class="nav">
        <span class="nav-link" data-nav="">Home</span>
        <div class="nav-dropdown">
          <span class="nav-link" data-nav="marketplace">Marketplace ${icons.chevron}</span>
          <div class="nav-dropdown-menu">
            <div class="nav-dropdown-item" data-nav="marketplace">All Products</div>
            <div class="nav-dropdown-item" data-nav="buyer-demand">Buyer Demand Board</div>
            <div class="nav-dropdown-item" data-nav="contracts">Contract Trading</div>
            <div class="nav-dropdown-item" data-nav="processor">Processor Portal</div>
            ${categories.map(c => `<div class="nav-dropdown-item" data-nav="category/${c.id}">${c.name}</div>`).join('')}
          </div>
        </div>
        <div class="nav-dropdown">
          <span class="nav-link">Farm Tools ${icons.chevron}</span>
          <div class="nav-dropdown-menu">
            <div class="nav-dropdown-item" data-nav="farm-planner">Farm Planner</div>
            <div class="nav-dropdown-item" data-nav="profitability">Profitability Dashboard</div>
            <div class="nav-dropdown-item" data-nav="traceability">Produce Traceability</div>
            <div class="nav-dropdown-item" data-nav="quality">Quality Center</div>
            <div class="nav-dropdown-item" data-nav="cooperative">Cooperative Portal</div>
          </div>
        </div>
        <div class="nav-dropdown">
          <span class="nav-link">Resources ${icons.chevron}</span>
          <div class="nav-dropdown-menu">
            <div class="nav-dropdown-item" data-nav="blog">Blog & Articles</div>
            <div class="nav-dropdown-item" data-nav="academy">ROBZ Academy</div>
            <div class="nav-dropdown-item" data-nav="directory">Business Directory</div>
            <div class="nav-dropdown-item" data-nav="climate">Climate-Smart Ag</div>
            <div class="nav-dropdown-item" data-nav="agri-assist">Agri Assist AI</div>
            <div class="nav-dropdown-item" data-nav="ussd">USSD Platform</div>
          </div>
        </div>
        <div class="nav-dropdown">
          <span class="nav-link">Account ${icons.chevron}</span>
          <div class="nav-dropdown-menu">
            <div class="nav-dropdown-item" data-nav="profile">My Profile</div>
            <div class="nav-dropdown-item" data-nav="wallet">Transaction Center</div>
            <div class="nav-dropdown-item" data-nav="documents">Document Vault</div>
            <div class="nav-dropdown-item" data-nav="rewards">Rewards Program</div>
            <div class="nav-dropdown-item" data-nav="platform">Platform Overview</div>
          </div>
        </div>
        <span class="nav-link" data-nav="about">About</span>
        <span class="nav-link" data-nav="contact">Contact</span>
      </nav>
      <div class="header-actions">
        <button class="cart-btn" data-nav="cart">
          ${icons.cart}
          <span class="cart-count" style="display:${getCartCount() > 0 ? 'flex' : 'none'}">${getCartCount()}</span>
        </button>
        <button class="mobile-menu-btn" id="mobile-menu-btn">${icons.menu}</button>
      </div>
    </div>
    <div class="mobile-nav" id="mobile-nav">
      <div class="mobile-nav-section">Main</div>
      <div class="mobile-nav-link" data-nav="">Home</div>
      <div class="mobile-nav-link" data-nav="marketplace">Marketplace</div>
      <div class="mobile-nav-link" data-nav="buyer-demand">Buyer Demand Board</div>
      <div class="mobile-nav-link" data-nav="contracts">Contract Trading</div>
      <div class="mobile-nav-link" data-nav="processor">Processor Portal</div>
      <div class="mobile-nav-section">Farm Tools</div>
      <div class="mobile-nav-link" data-nav="farm-planner">Farm Planner</div>
      <div class="mobile-nav-link" data-nav="profitability">Profitability Dashboard</div>
      <div class="mobile-nav-link" data-nav="traceability">Produce Traceability</div>
      <div class="mobile-nav-link" data-nav="quality">Quality Center</div>
      <div class="mobile-nav-link" data-nav="cooperative">Cooperative Portal</div>
      <div class="mobile-nav-section">Resources</div>
      <div class="mobile-nav-link" data-nav="blog">Blog & Articles</div>
      <div class="mobile-nav-link" data-nav="academy">ROBZ Academy</div>
      <div class="mobile-nav-link" data-nav="directory">Business Directory</div>
      <div class="mobile-nav-link" data-nav="climate">Climate-Smart Agriculture</div>
      <div class="mobile-nav-link" data-nav="agri-assist">Agri Assist AI</div>
      <div class="mobile-nav-link" data-nav="ussd">USSD Platform</div>
      <div class="mobile-nav-section">Account</div>
      <div class="mobile-nav-link" data-nav="profile">My Profile</div>
      <div class="mobile-nav-link" data-nav="wallet">Transaction Center</div>
      <div class="mobile-nav-link" data-nav="documents">Document Vault</div>
      <div class="mobile-nav-link" data-nav="rewards">Rewards Program</div>
      <div class="mobile-nav-link" data-nav="platform">Platform Overview</div>
      <div class="mobile-nav-section">Company</div>
      <div class="mobile-nav-link" data-nav="about">About Us</div>
      <div class="mobile-nav-link" data-nav="services">Services</div>
      <div class="mobile-nav-link" data-nav="contact">Contact</div>
      <div class="mobile-nav-link" data-nav="faq">FAQ</div>
    </div>
  `
  return header
}

function bindHeaderEvents() {
  const menuBtn = document.getElementById('mobile-menu-btn')
  const mobileNav = document.getElementById('mobile-nav')
  if (menuBtn && mobileNav) {
    menuBtn.addEventListener('click', () => {
      mobileNav.classList.toggle('open')
      menuBtn.innerHTML = mobileNav.classList.contains('open') ? icons.close : icons.menu
    })
  }
  updateCartCount()
}

// ===== FOOTER =====
function renderFooter() {
  const footer = el('footer', 'footer')
  footer.innerHTML = `
    <div class="container">
      <div class="grid grid-4">
        <div>
          <div class="logo" style="margin-bottom:1rem" data-nav="">
            <img class="logo-image" src="${localImages.logo}" alt="ROBZ logo" />
            <span>ROBZ</span>
          </div>
          <p style="font-size:0.875rem;line-height:1.7">${businessInfo.description}</p>
          <div class="footer-social" style="margin-top:1rem">
            <a href="#">${icons.facebook}</a>
            <a href="#">${icons.twitter}</a>
            <a href="#">${icons.instagram}</a>
            <a href="#">${icons.linkedin}</a>
          </div>
        </div>
        <div>
          <h4>Marketplace</h4>
          <div class="footer-links">
            <a data-nav="marketplace">All Products</a>
            <a data-nav="buyer-demand">Buyer Demand</a>
            <a data-nav="contracts">Contracts</a>
            <a data-nav="processor">Processor Portal</a>
            ${categories.slice(0, 3).map(c => `<a data-nav="category/${c.id}">${c.name}</a>`).join('')}
          </div>
        </div>
        <div>
          <h4>Farm Tools</h4>
          <div class="footer-links">
            <a data-nav="farm-planner">Farm Planner</a>
            <a data-nav="profitability">Profitability</a>
            <a data-nav="traceability">Traceability</a>
            <a data-nav="quality">Quality Center</a>
            <a data-nav="cooperative">Cooperative Portal</a>
            <a data-nav="academy">ROBZ Academy</a>
          </div>
        </div>
        <div>
          <h4>Company</h4>
          <div class="footer-links">
            <a data-nav="about">About Us</a>
            <a data-nav="services">Services</a>
            <a data-nav="contact">Contact</a>
            <a data-nav="blog">Blog</a>
            <a data-nav="faq">FAQ</a>
            <a data-nav="platform">Platform Overview</a>
          </div>
        </div>
      </div>
      <div class="footer-bottom">
        <span>&copy; 2026 ${businessInfo.name}. All rights reserved.</span>
        <span>${businessInfo.tagline}</span>
      </div>
    </div>
  `
  return footer
}

// ===== PAGE WRAPPER =====
function pageWrapper(content, showBreadcrumb = false, breadcrumbItems = []) {
  const wrapper = el('div')
  wrapper.appendChild(renderHeader())
  const main = el('main')
  if (showBreadcrumb && breadcrumbItems.length > 0) {
    const bc = el('div', 'container', `<div class="breadcrumb" style="padding-top:1rem">${breadcrumbItems.map((b, i) => {
      const isLast = i === breadcrumbItems.length - 1
      return isLast ? `<span class="current">${b.label}</span>` : `<a data-nav="${b.path}">${b.label}</a><span class="sep">/</span>`
    }).join('')}</div>`)
    main.appendChild(bc)
  }
  if (typeof content === 'string') {
    main.insertAdjacentHTML('beforeend', content)
  } else {
    main.appendChild(content)
  }
  wrapper.appendChild(main)
  wrapper.appendChild(renderFooter())
  return wrapper
}

export {
  navigate, handleRoute, setNavigateCallback, setRerenderCallback,
  el, formatPrice, getStars, getCategoryById, getProductById,
  addToCart, removeFromCart, updateCartQty, getCartTotal, getCartCount,
  showToast, getIcon, icons, cart, pageWrapper,
  getProfile, saveProfile, resetProfile,
  renderHeader, renderFooter, bindHeaderEvents,
  categories, products, blogPosts, faqs, testimonials, services, stats, businessInfo, localImages
}
