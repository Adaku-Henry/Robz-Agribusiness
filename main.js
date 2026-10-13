import './style.css'
import {
  setNavigateCallback, setRerenderCallback,
  addToCart, icons, bindHeaderEvents
} from './app-core.js'

import {
  renderHome, renderMarketplace, renderProductDetail, renderCategory, renderCart, renderCheckout
} from './pages-main.js'

import {
  renderAbout, renderServices, renderContact, renderBlog, renderBlogPost, renderFAQ
} from './pages-info.js'

import {
  renderPlatform, renderFarmPlanner, renderProfitability, renderTraceability,
  renderCooperative, renderContracts, renderBuyerDemand, renderQuality,
  renderProcessor, renderDirectory, renderAcademy, renderAgriAssist,
  renderClimate, renderWallet, renderDocuments, renderRewards, renderUSSD, renderProfile
} from './pages-platform.js'

// ===== ROUTER =====
const routes = {
  '': { renderer: renderHome, title: 'ROBZ Agricultural Marketplace' },
  'marketplace': { renderer: renderMarketplace, title: 'Marketplace — ROBZ' },
  'product/:id': { renderer: renderProductDetail, title: 'Product — ROBZ' },
  'category/:id': { renderer: renderCategory, title: 'Category — ROBZ' },
  'about': { renderer: renderAbout, title: 'About Us — ROBZ' },
  'services': { renderer: renderServices, title: 'Services — ROBZ' },
  'contact': { renderer: renderContact, title: 'Contact — ROBZ' },
  'blog': { renderer: renderBlog, title: 'Blog — ROBZ' },
  'blog/:id': { renderer: renderBlogPost, title: 'Article — ROBZ' },
  'faq': { renderer: renderFAQ, title: 'FAQ — ROBZ' },
  'cart': { renderer: renderCart, title: 'Cart — ROBZ' },
  'checkout': { renderer: renderCheckout, title: 'Checkout — ROBZ' },
  'farm-planner': { renderer: renderFarmPlanner, title: 'Farm Planner — ROBZ' },
  'profitability': { renderer: renderProfitability, title: 'Farm Profitability — ROBZ' },
  'traceability': { renderer: renderTraceability, title: 'Traceability — ROBZ' },
  'cooperative': { renderer: renderCooperative, title: 'Cooperative Portal — ROBZ' },
  'contracts': { renderer: renderContracts, title: 'Contracts — ROBZ' },
  'buyer-demand': { renderer: renderBuyerDemand, title: 'Buyer Demand Board — ROBZ' },
  'quality': { renderer: renderQuality, title: 'Quality Center — ROBZ' },
  'directory': { renderer: renderDirectory, title: 'Agribusiness Directory — ROBZ' },
  'academy': { renderer: renderAcademy, title: 'ROBZ Academy — ROBZ' },
  'agri-assist': { renderer: renderAgriAssist, title: 'ROBZ Agri Assist — ROBZ' },
  'processor': { renderer: renderProcessor, title: 'Processor Portal — ROBZ' },
  'climate': { renderer: renderClimate, title: 'Climate-Smart Agriculture — ROBZ' },
  'wallet': { renderer: renderWallet, title: 'Transaction Center — ROBZ' },
  'profile': { renderer: renderProfile, title: 'My Profile — ROBZ' },
  'documents': { renderer: renderDocuments, title: 'Document Vault — ROBZ' },
  'rewards': { renderer: renderRewards, title: 'ROBZ Rewards — ROBZ' },
  'ussd': { renderer: renderUSSD, title: 'USSD Platform — ROBZ' },
  'platform': { renderer: renderPlatform, title: 'The ROBZ Platform — ROBZ' }
}

function doNavigate(path) {
  window.history.pushState({}, '', '/' + path)
  doHandleRoute()
  window.scrollTo(0, 0)
}

function doHandleRoute() {
  const path = window.location.pathname.slice(1) || ''
  const parts = path.split('/').filter(Boolean)

  let matched = null
  let params = {}

  if (routes[path]) {
    matched = routes[path]
  } else {
    for (const [pattern, route] of Object.entries(routes)) {
      const patternParts = pattern.split('/').filter(Boolean)
      if (patternParts.length !== parts.length) continue
      let isMatch = true
      const routeParams = {}
      for (let i = 0; i < patternParts.length; i++) {
        if (patternParts[i].startsWith(':')) {
          routeParams[patternParts[i].slice(1)] = parts[i]
        } else if (patternParts[i] !== parts[i]) {
          isMatch = false
          break
        }
      }
      if (isMatch) { matched = route; params = routeParams; break }
    }
  }

  if (matched) {
    document.title = matched.title
    const app = document.getElementById('app')
    app.innerHTML = ''
    app.appendChild(matched.renderer(params))
    bindHeaderEvents()
  } else {
    doNavigate('')
  }
}

// Wire callbacks so app-core's navigate() and handleRoute() work
setNavigateCallback(doNavigate)
setRerenderCallback(doHandleRoute)

window.addEventListener('popstate', doHandleRoute)

// Global click delegation for data-nav and data-add-cart
document.addEventListener('click', (e) => {
  const navEl = e.target.closest('[data-nav]')
  if (navEl) {
    e.preventDefault()
    e.stopPropagation()
    const path = navEl.getAttribute('data-nav')
    doNavigate(path)
    const mobileNav = document.getElementById('mobile-nav')
    if (mobileNav) mobileNav.classList.remove('open')
    const menuBtn = document.getElementById('mobile-menu-btn')
    if (menuBtn) menuBtn.innerHTML = icons.menu
    return
  }
  const addBtn = e.target.closest('[data-add-cart]')
  if (addBtn) {
    e.preventDefault()
    e.stopPropagation()
    addToCart(addBtn.getAttribute('data-add-cart'))
    return
  }
})

// Header scroll effect
window.addEventListener('scroll', () => {
  const header = document.querySelector('.header')
  if (header) {
    if (window.scrollY > 10) header.classList.add('scrolled')
    else header.classList.remove('scrolled')
  }
})

// Initialize
doHandleRoute()
