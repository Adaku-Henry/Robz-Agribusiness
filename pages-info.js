import {
  navigate, el, formatPrice, getStars, getCategoryById, getProductById, addToCart,
  showToast, getIcon, icons, pageWrapper, categories, products, blogPosts, faqs,
  testimonials, services, stats, businessInfo, localImages
} from './app-core.js'

// ===== ABOUT =====
export function renderAbout() {
  const content = `
    <div class="page-banner">
      <div class="container">
        <h1>About ROBZ</h1>
        <p>Farm inputs, extension support, and practical market solutions for West Nile farmers</p>
      </div>
    </div>

    <section class="section">
      <div class="container">
        <div style="display:grid;gap:2rem;grid-template-columns:1fr;max-width:900px;margin:0 auto" class="about-grid">
          <div>
            <span class="badge badge-primary">Our Story</span>
            <h2 style="font-size:2rem;margin-top:0.5rem">A local agribusiness built around farmers' needs</h2>
            <p style="color:var(--neutral-600);line-height:1.8;margin-top:1rem">${businessInfo.description}</p>
            <p style="color:var(--neutral-600);line-height:1.8;margin-top:1rem">Our vision is to uplift smallholder farmers to the world, while our mission is to become the leading agribusiness company in Ajiraku Parish, Bileafe Sub-County, Terego, and eventually across West Nile and Uganda. We help farmers access the right products, training, and markets to improve yield, income, and long-term resilience.</p>
          </div>
          <div style="border-radius:20px;overflow:hidden;box-shadow:var(--shadow-lg)">
            <img src="${localImages.field}" alt="Agricultural landscape in Ocodri" style="width:100%;height:300px;object-fit:cover" />
          </div>
        </div>
      </div>
    </section>

    <section class="section bg-light">
      <div class="container">
        <div class="section-header">
          <span class="badge badge-primary">Mission & Vision</span>
          <h2>Growing people and communities</h2>
          <p>We believe agriculture grows strongest when farmers have access to the right inputs, knowledge, and market support.</p>
        </div>
        <div class="feature-grid">
          ${[
            { icon: 'sprout', title: 'Vision', desc: 'To uplift smallholder farmers to the world and help them participate in stronger, more sustainable agricultural value chains.' },
            { icon: 'shield', title: 'Mission', desc: 'To become the leading agribusiness company in Terego District and beyond, serving farmers with trusted products and services.' },
            { icon: 'chart', title: 'Customer Focus', desc: 'We work with individual farmers, schools, farmer groups, NGOs, partners, and contract service farming clients.' },
            { icon: 'users', title: 'Community Impact', desc: 'Our work supports farmer groups and local communities through training, market access, and practical agricultural services.' },
            { icon: 'leaf', title: 'Climate-Smart Agriculture', desc: 'We promote sustainable farming practices and training that strengthen resilience in changing conditions.' },
            { icon: 'globe', title: 'Regional Growth', desc: 'The business is designed to expand into more branches and stronger local agricultural networks across West Nile.' }
          ].map(f => `
            <div class="feature-item">
              <div class="feature-item-icon">${getIcon(f.icon)}</div>
              <div>
                <h4>${f.title}</h4>
                <p>${f.desc}</p>
              </div>
            </div>
          `).join('')}
        </div>
      </div>
    </section>

    <section class="section">
      <div class="container">
        <div class="section-header">
          <span class="badge badge-accent">By the Numbers</span>
          <h2>Our Impact</h2>
        </div>
        <div class="grid grid-4">
          ${stats.map(s => `<div class="stat-item" style="background:white;padding:2rem;border-radius:20px;border:1px solid var(--neutral-200)"><div class="stat-value" style="color:var(--primary-600)">${s.value}</div><div class="stat-label" style="color:var(--neutral-500)">${s.label}</div></div>`).join('')}
        </div>
      </div>
    </section>

    <section class="section bg-light">
      <div class="container">
        <div class="section-header">
          <span class="badge badge-primary">Leadership</span>
          <h2>Meet the Team</h2>
          <p>The people building ROBZ for Africa's farmers</p>
        </div>
        <div class="grid grid-4">
          ${[
            { name: 'Anguzu Robinson', role: 'Founder & CEO', img: 'https://images.pexels.com/photos/9368704/pexels-photo-9368704.jpeg?auto=compress&cs=tinysrgb&h=400&w=400' },
            { name: 'Dr. Amina', role: 'Chief Agronomist', img: 'https://images.pexels.com/photos/28753124/pexels-photo-28753124.jpeg?auto=compress&cs=tinysrgb&h=400&w=400' },
            { name: 'James Atiku', role: 'CTO', img: 'https://images.pexels.com/photos/10221659/pexels-photo-10221659.jpeg?auto=compress&cs=tinysrgb&h=400&w=400' },
            { name: 'Grace Alezuyo', role: 'Head of Operations', img: 'https://images.pexels.com/photos/34705724/pexels-photo-34705724.jpeg?auto=compress&cs=tinysrgb&h=400&w=400' }
          ].map(t => `
            <div style="text-align:center;background:white;padding:2rem;border-radius:20px;border:1px solid var(--neutral-200);transition:all 0.3s ease" class="team-card">
              <img src="${t.img}" alt="${t.name}" style="width:120px;height:120px;border-radius:50%;object-fit:cover;margin:0 auto 1rem" loading="lazy" />
              <h4 style="font-size:1.1rem">${t.name}</h4>
              <p style="color:var(--primary-600);font-size:0.875rem;font-weight:600">${t.role}</p>
            </div>
          `).join('')}
        </div>
      </div>
    </section>

    <section class="section">
      <div class="container">
        <div class="cta-section">
          <h2>Join the ROBZ Community</h2>
          <p>Whether you're a farmer, buyer, or agribusiness, there's a place for you</p>
          <button class="btn btn-white btn-lg mt-3" data-nav="contact">Get in Touch</button>
        </div>
      </div>
    </section>
  `
  const wrapper = pageWrapper(content, true, [{ label: 'Home', path: '' }, { label: 'About' }])
  setTimeout(() => { document.querySelectorAll('[data-nav]').forEach(l => l.onclick = e => { e.preventDefault(); navigate(l.getAttribute('data-nav')) }) }, 100)
  return wrapper
}

// ===== SERVICES =====
export function renderServices() {
  const content = `
    <div class="page-banner">
      <div class="container">
        <h1>Our Services</h1>
        <p>Practical farm support for farmers, farmer groups, schools, NGOs, and agribusiness partners</p>
      </div>
    </div>
    <section class="section">
      <div class="container">
        <div class="grid grid-3">
          ${services.map((s, i) => `
            <div class="service-card fade-in" style="animation-delay:${i * 0.05}s">
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
    <section class="section bg-light">
      <div class="container">
        <div class="section-header">
          <span class="badge badge-primary">How We Work</span>
          <h2>Simple support that matches farmer needs</h2>
        </div>
        <div class="grid grid-4">
          ${[
            { num: '01', title: 'Assess Need', desc: 'We understand what each farmer or group needs, from inputs to extension advice.' },
            { num: '02', title: 'Supply & Advise', desc: 'We provide the right farm inputs and expert consultation for better productivity.' },
            { num: '03', title: 'Deliver & Support', desc: 'Our team handles logistics, product delivery, and follow-up support on the ground.' },
            { num: '04', title: 'Link to Market', desc: 'We help farmers connect to buyers and create stronger market opportunities.' }
          ].map(step => `
            <div style="text-align:center;padding:2rem;background:white;border-radius:20px;border:1px solid var(--neutral-200)">
              <div style="font-family:var(--font-heading);font-size:2.5rem;font-weight:800;color:var(--primary-200)">${step.num}</div>
              <h4 style="margin-top:0.5rem">${step.title}</h4>
              <p style="color:var(--neutral-500);font-size:0.875rem;margin-top:0.5rem">${step.desc}</p>
            </div>
          `).join('')}
        </div>
      </div>
    </section>
  `
  const wrapper = pageWrapper(content, true, [{ label: 'Home', path: '' }, { label: 'Services' }])
  setTimeout(() => { document.querySelectorAll('[data-nav]').forEach(l => l.onclick = e => { e.preventDefault(); navigate(l.getAttribute('data-nav')) }) }, 100)
  return wrapper
}

// ===== CONTACT =====
export function renderContact() {
  const content = `
    <div class="page-banner">
      <div class="container">
        <h1>Contact Us</h1>
        <p>We're here to help you grow</p>
      </div>
    </div>
    <section class="section">
      <div class="container">
        <div style="display:grid;gap:2rem;grid-template-columns:1fr" class="contact-grid">
          <div>
            <h2 style="font-size:1.75rem;margin-bottom:1rem">Send Us a Message</h2>
            <form id="contact-form" novalidate>
              <div class="form-row">
                <div class="form-group">
                  <label for="contact-first-name">First Name</label>
                  <input id="contact-first-name" name="firstName" type="text" required autocomplete="given-name" placeholder="John" />
                </div>
                <div class="form-group">
                  <label for="contact-last-name">Last Name</label>
                  <input id="contact-last-name" name="lastName" type="text" required autocomplete="family-name" placeholder="Doe" />
                </div>
              </div>
              <div class="form-row">
                <div class="form-group">
                  <label for="contact-email">Email</label>
                  <input id="contact-email" name="email" type="email" required autocomplete="email" placeholder="john@example.com" />
                </div>
                <div class="form-group">
                  <label for="contact-phone">Phone</label>
                  <input id="contact-phone" name="phone" type="tel" autocomplete="tel" placeholder="+256 700 000 000" />
                </div>
              </div>
              <div class="form-group">
                <label for="contact-role">I am a...</label>
                <select id="contact-role" name="role">
                  <option>Farmer / Producer</option>
                  <option>Buyer / Trader</option>
                  <option>Cooperative / Aggregator</option>
                  <option>Processor</option>
                  <option>Service Provider</option>
                  <option>Other</option>
                </select>
              </div>
              <div class="form-group">
                <label for="contact-message">Message</label>
                <textarea id="contact-message" name="message" required minlength="10" maxlength="1000" placeholder="Tell us how we can help..."></textarea>
                <div class="form-meta"><span id="contact-form-status" role="status" aria-live="polite">Your message is saved as you type.</span><span id="contact-message-count">0 / 1000</span></div>
              </div>
              <button type="submit" class="btn btn-primary btn-lg" id="contact-submit">Send Message</button>
            </form>
          </div>
          <div>
            <h2 style="font-size:1.75rem;margin-bottom:1rem">Contact Information</h2>
            <div class="contact-info-card">
              <div class="contact-info-icon">${icons.mail}</div>
              <div><h4>Email</h4><p>${businessInfo.email}</p></div>
            </div>
            <div class="contact-info-card">
              <div class="contact-info-icon">${icons.phone}</div>
              <div><h4>Phone</h4><p>${businessInfo.phone}</p></div>
            </div>
            <div class="contact-info-card">
              <div class="contact-info-icon">${icons.location}</div>
              <div><h4>Address</h4><p>${businessInfo.address}</p></div>
            </div>
            <div class="contact-info-card">
              <div class="contact-info-icon">${icons.clock}</div>
              <div><h4>Hours</h4><p>${businessInfo.hours}</p></div>
            </div>
            <div style="border-radius:20px;overflow:hidden;margin-top:1rem;box-shadow:var(--shadow-md)">
              <img src="${localImages.community}" alt="ROBZ agricultural community" style="width:100%;height:200px;object-fit:cover" />
            </div>
          </div>
        </div>
      </div>
    </section>
  `
  const wrapper = pageWrapper(content, true, [{ label: 'Home', path: '' }, { label: 'Contact' }])
  setTimeout(() => {
    const form = document.getElementById('contact-form')
    if (form) {
      const storageKey = 'robz_contact_draft'
      const fields = ['firstName', 'lastName', 'email', 'phone', 'role', 'message']
      const status = document.getElementById('contact-form-status')
      const messageCount = document.getElementById('contact-message-count')
      const savedDraft = JSON.parse(localStorage.getItem(storageKey) || '{}')

      fields.forEach(name => {
        if (savedDraft[name] !== undefined) form.elements[name].value = savedDraft[name]
      })

      const updateFieldState = field => {
        const valid = field.checkValidity()
        field.classList.toggle('is-valid', valid && field.value.trim() !== '')
        field.classList.toggle('is-invalid', !valid && field.value.trim() !== '')
        return valid
      }

      const saveDraft = () => {
        const draft = Object.fromEntries(fields.map(name => [name, form.elements[name].value]))
        localStorage.setItem(storageKey, JSON.stringify(draft))
        if (messageCount) messageCount.textContent = `${form.elements.message.value.length} / 1000`
        fields.forEach(name => updateFieldState(form.elements[name]))
      }

      fields.forEach(name => form.elements[name].addEventListener('input', saveDraft))
      saveDraft()

      form.addEventListener('submit', e => {
        e.preventDefault()
        const valid = fields.every(name => updateFieldState(form.elements[name]))
        if (!valid) {
          status.textContent = 'Please check the highlighted fields before sending.'
          status.className = 'form-status-error'
          form.querySelector('.is-invalid')?.focus()
          return
        }

        const subject = `ROBZ enquiry from ${form.elements.firstName.value.trim()} ${form.elements.lastName.value.trim()}`
        const body = [
          `Name: ${form.elements.firstName.value.trim()} ${form.elements.lastName.value.trim()}`,
          `Email: ${form.elements.email.value.trim()}`,
          `Phone: ${form.elements.phone.value.trim() || 'Not provided'}`,
          `I am a: ${form.elements.role.value}`,
          '',
          form.elements.message.value.trim()
        ].join('\n')
        window.location.href = `mailto:${businessInfo.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`
        localStorage.removeItem(storageKey)
        status.textContent = 'Your email app is opening with this message ready to send.'
        status.className = 'form-status-success'
        showToast('Message prepared for sending.')
      })
    }
    document.querySelectorAll('[data-nav]').forEach(l => l.onclick = e => { e.preventDefault(); navigate(l.getAttribute('data-nav')) })
  }, 100)
  return wrapper
}

// ===== BLOG =====
export function renderBlog() {
  const content = `
    <div class="page-banner">
      <div class="container">
        <h1>ROBZ Knowledge Hub</h1>
        <p>Expert insights, practical guides, and the latest in agricultural innovation</p>
      </div>
    </div>
    <section class="section">
      <div class="container">
        <div class="grid grid-3">
          ${blogPosts.map((b, i) => `
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
      </div>
    </section>
  `
  const wrapper = pageWrapper(content, true, [{ label: 'Home', path: '' }, { label: 'Blog' }])
  setTimeout(() => { document.querySelectorAll('[data-nav]').forEach(l => l.onclick = e => { e.preventDefault(); navigate(l.getAttribute('data-nav')) }) }, 100)
  return wrapper
}

// ===== BLOG POST =====
export function renderBlogPost(params) {
  const post = blogPosts.find(b => b.id === params.id)
  if (!post) { navigate('blog'); return el('div') }
  const related = blogPosts.filter(b => b.id !== post.id).slice(0, 3)

  const content = `
    <section class="section">
      <div class="container" style="max-width:800px">
        <div class="flex gap-2 mb-2 flex-wrap">
          <span class="badge badge-primary">${post.category}</span>
          <span class="text-muted">${post.date}</span>
        </div>
        <h1 style="font-size:2rem;font-weight:800;margin-bottom:1rem">${post.title}</h1>
        <div class="flex items-center gap-2 mb-4">
          <img src="https://images.pexels.com/photos/28753124/pexels-photo-28753124.jpeg?auto=compress&cs=tinysrgb&h=80&w=80" style="width:48px;height:48px;border-radius:50%;object-fit:cover" alt="${post.author}" />
          <div>
            <div style="font-weight:700;font-size:0.9rem">${post.author}</div>
            <div style="font-size:0.8rem;color:var(--neutral-500)">Agricultural Expert</div>
          </div>
        </div>
        <div style="border-radius:20px;overflow:hidden;margin-bottom:2rem;box-shadow:var(--shadow-md)">
          <img src="${post.image}" alt="${post.title}" style="width:100%;height:400px;object-fit:cover" />
        </div>
        <div style="font-size:1.1rem;line-height:1.8;color:var(--neutral-700)">
          <p style="font-weight:600;font-size:1.2rem;margin-bottom:1rem">${post.excerpt}</p>
          <p>${post.content}</p>
          <p style="margin-top:1.5rem">At ROBZ, we're committed to providing farmers with the knowledge and tools they need to succeed. Our platform goes beyond simple buying and selling — we offer farm planning tools, profitability dashboards, quality certification, and full produce traceability.</p>
          <p style="margin-top:1.5rem">Ready to put these insights into practice? Explore our marketplace for quality inputs, or use our farm planner to map out your next season. Our team of agronomists is always available to help you make the best decisions for your farm.</p>
        </div>
      </div>
    </section>
    ${related.length > 0 ? `
      <section class="section bg-light">
        <div class="container">
          <div class="section-header-left">
            <h2>Related Articles</h2>
          </div>
          <div class="grid grid-3">
            ${related.map((b, i) => `
              <div class="blog-card fade-in" style="animation-delay:${i * 0.05}s" data-nav="blog/${b.id}">
                <div class="blog-card-img"><img src="${b.image}" alt="${b.title}" loading="lazy" /></div>
                <div class="blog-card-body">
                  <div class="blog-card-meta"><span class="badge badge-primary">${b.category}</span><span>${b.date}</span></div>
                  <h3>${b.title}</h3>
                  <p>${b.excerpt}</p>
                  <span class="blog-card-read">Read More ${icons.arrow}</span>
                </div>
              </div>
            `).join('')}
          </div>
        </div>
      </section>
    ` : ''}
  `
  const wrapper = pageWrapper(content, true, [{ label: 'Home', path: '' }, { label: 'Blog', path: 'blog' }, { label: post.title }])
  setTimeout(() => { document.querySelectorAll('[data-nav]').forEach(l => l.onclick = e => { e.preventDefault(); navigate(l.getAttribute('data-nav')) }) }, 100)
  return wrapper
}

// ===== FAQ =====
export function renderFAQ() {
  const content = `
    <div class="page-banner">
      <div class="container">
        <h1>Frequently Asked Questions</h1>
        <p>Everything you need to know about ROBZ</p>
      </div>
    </div>
    <section class="section">
      <div class="container" style="max-width:800px">
        ${faqs.map((f, i) => `
          <div class="faq-item ${i === 0 ? 'open' : ''}" data-faq="${i}">
            <div class="faq-question">
              <span>${f.q}</span>
              <span class="faq-icon">${icons.plus}</span>
            </div>
            <div class="faq-answer">
              <p style="padding-bottom:0.5rem">${f.a}</p>
            </div>
          </div>
        `).join('')}
        <div class="text-center mt-6">
          <p style="color:var(--neutral-500)">Still have questions?</p>
          <button class="btn btn-primary mt-2" data-nav="contact">Contact Us</button>
        </div>
      </div>
    </section>
  `
  const wrapper = pageWrapper(content, true, [{ label: 'Home', path: '' }, { label: 'FAQ' }])
  setTimeout(() => {
    document.querySelectorAll('[data-faq]').forEach(item => {
      item.querySelector('.faq-question').onclick = () => item.classList.toggle('open')
    })
    document.querySelectorAll('[data-nav]').forEach(l => l.onclick = e => { e.preventDefault(); navigate(l.getAttribute('data-nav')) })
  }, 100)
  return wrapper
}
