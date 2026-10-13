import {
  navigate, el, formatPrice, getIcon, icons, pageWrapper, categories, products, stats, businessInfo, showToast,
  getProfile, saveProfile, resetProfile
} from './app-core.js'

function bindNav() {
  setTimeout(() => {
    document.querySelectorAll('[data-nav]').forEach(l => l.onclick = e => { e.preventDefault(); navigate(l.getAttribute('data-nav')) })
  }, 100)
}

function escapeProfileValue(value) {
  return String(value ?? '').replace(/[&<>"']/g, character => ({
    '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;'
  })[character])
}

// ===== PROFILE =====
export function renderProfile() {
  const profile = getProfile()
  const safeProfile = Object.fromEntries(Object.entries(profile).map(([key, value]) => [key, typeof value === 'string' ? escapeProfileValue(value) : value]))
  const displayName = safeProfile.fullName || 'Your name'
  const initials = (profile.fullName || 'RO').trim().split(/\s+/).slice(0, 2).map(part => part[0]?.toUpperCase() || '').join('')
  const profileImage = safeProfile.avatar
    ? `<img src="${safeProfile.avatar}" alt="Profile photo" />`
    : `<span>${escapeProfileValue(initials)}</span>`

  const content = `
    <section class="profile-page">
      <div class="container">
        <header class="profile-heading">
          <div>
            <p class="profile-eyebrow">ACCOUNT</p>
            <h1>My profile</h1>
            <p>Manage your personal and farm details.</p>
          </div>
          <span class="profile-saved-note" id="profile-save-note" role="status">Saved on this device</span>
        </header>

        <div class="profile-layout">
          <aside class="profile-sidebar">
            <div class="profile-identity">
              <div class="profile-avatar" id="profile-avatar">${profileImage}</div>
              <h2 id="profile-display-name">${displayName}</h2>
              <p id="profile-display-role">${safeProfile.role}</p>
              <label class="btn btn-outline btn-sm profile-photo-button" for="profile-photo">${icons.plus} Change photo</label>
              <input id="profile-photo" type="file" accept="image/png,image/jpeg,image/webp" class="profile-photo-input" aria-label="Upload profile photo" />
            </div>
            <nav class="profile-nav" aria-label="Profile sections">
              <a href="#personal-details">${icons.users}<span>Personal details</span></a>
              <a href="#farm-details">${icons.sprout}<span>Farm or business</span></a>
              <a href="#preferences">${icons.check}<span>Preferences</span></a>
            </nav>
            <div class="profile-completion">
              <div class="profile-completion-heading"><strong>Profile strength</strong><span id="profile-completion-value">0%</span></div>
              <div class="progress-bar"><div class="progress-bar-fill" id="profile-completion-bar" style="width:0%"></div></div>
              <p>Complete your details to help partners know your business.</p>
            </div>
          </aside>

          <form class="profile-form" id="profile-form">
            <input type="hidden" name="avatar" value="${safeProfile.avatar}" />
            <section class="profile-section" id="personal-details">
              <div class="profile-section-heading"><div><h2>Personal details</h2><p>How partners can identify and contact you.</p></div></div>
              <div class="form-row">
                <div class="form-group"><label for="profile-full-name">Full name</label><input id="profile-full-name" name="fullName" type="text" autocomplete="name" value="${safeProfile.fullName}" required maxlength="100" placeholder="Your full name" /></div>
                <div class="form-group"><label for="profile-role">I am a</label><select id="profile-role" name="role"><option${profile.role === 'Farmer' ? ' selected' : ''}>Farmer</option><option${profile.role === 'Buyer' ? ' selected' : ''}>Buyer</option><option${profile.role === 'Cooperative' ? ' selected' : ''}>Cooperative</option><option${profile.role === 'Processor' ? ' selected' : ''}>Processor</option><option${profile.role === 'Agribusiness' ? ' selected' : ''}>Agribusiness</option><option${profile.role === 'Other' ? ' selected' : ''}>Other</option></select></div>
              </div>
              <div class="form-row">
                <div class="form-group"><label for="profile-email">Email address</label><input id="profile-email" name="email" type="email" autocomplete="email" value="${safeProfile.email}" required maxlength="254" placeholder="name@example.com" /></div>
                <div class="form-group"><label for="profile-phone">Phone number</label><input id="profile-phone" name="phone" type="tel" autocomplete="tel" value="${safeProfile.phone}" maxlength="30" placeholder="+256 700 000 000" /></div>
              </div>
              <div class="form-group"><label for="profile-location">Location</label><input id="profile-location" name="location" type="text" autocomplete="address-level2" value="${safeProfile.location}" maxlength="120" placeholder="District, region, country" /></div>
              <div class="form-group"><label for="profile-bio">About you <span class="profile-optional">Optional</span></label><textarea id="profile-bio" name="bio" maxlength="500" placeholder="A short introduction to your work">${safeProfile.bio}</textarea><div class="form-meta"><span>Help others understand what you do.</span><span id="profile-bio-count">${profile.bio.length} / 500</span></div></div>
            </section>

            <section class="profile-section" id="farm-details">
              <div class="profile-section-heading"><div><h2>Farm or business</h2><p>Details that help us tailor ROBZ to your work.</p></div></div>
              <div class="form-row">
                <div class="form-group"><label for="profile-organization">Farm or business name</label><input id="profile-organization" name="organization" type="text" value="${safeProfile.organization}" maxlength="120" placeholder="Name of your farm or business" /></div>
                <div class="form-group"><label for="profile-farm-size">Farm size (acres)</label><input id="profile-farm-size" name="farmSize" type="number" min="0" step="0.1" value="${safeProfile.farmSize}" placeholder="e.g. 12" /></div>
              </div>
              <div class="form-group"><label for="profile-crops">Main crops or products</label><input id="profile-crops" name="crops" type="text" value="${safeProfile.crops}" maxlength="200" placeholder="e.g. Maize, beans, honey" /></div>
            </section>

            <section class="profile-section" id="preferences">
              <div class="profile-section-heading"><div><h2>Preferences</h2><p>Choose what updates you receive.</p></div></div>
              <label class="profile-toggle"><input type="checkbox" name="emailUpdates"${profile.emailUpdates ? ' checked' : ''} /><span><strong>Email updates</strong><small>Product news, market updates, and account activity.</small></span></label>
              <label class="profile-toggle"><input type="checkbox" name="smsUpdates"${profile.smsUpdates ? ' checked' : ''} /><span><strong>SMS updates</strong><small>Important order and account notifications by text.</small></span></label>
            </section>

            <footer class="profile-form-actions">
              <button class="btn btn-outline" type="button" id="profile-reset">Reset profile</button>
              <button class="btn btn-primary" type="submit">Save changes</button>
            </footer>
            <p class="profile-form-status" id="profile-form-status" role="status" aria-live="polite"></p>
          </form>
        </div>
      </div>
    </section>
  `
  const wrapper = pageWrapper(content, true, [{ label: 'Home', path: '' }, { label: 'My Profile' }])

  setTimeout(() => {
    const form = document.getElementById('profile-form')
    const status = document.getElementById('profile-form-status')
    const avatar = document.getElementById('profile-avatar')
    const updateCompletion = () => {
      const fields = ['fullName', 'email', 'phone', 'location', 'organization', 'farmSize', 'crops', 'bio']
      const completed = fields.filter(name => String(form.elements[name].value).trim()).length
      const percent = Math.round(completed / fields.length * 100)
      document.getElementById('profile-completion-value').textContent = `${percent}%`
      document.getElementById('profile-completion-bar').style.width = `${percent}%`
    }
    const updateIdentity = () => {
      const name = form.elements.fullName.value.trim() || 'Your name'
      const initials = name.split(/\s+/).slice(0, 2).map(part => part[0]?.toUpperCase() || '').join('')
      document.getElementById('profile-display-name').textContent = name
      document.getElementById('profile-display-role').textContent = form.elements.role.value
      if (!form.elements.avatar.value) avatar.innerHTML = `<span>${escapeProfileValue(initials)}</span>`
    }
    const fillForm = saved => {
      Object.entries(saved).forEach(([name, value]) => {
        const field = form.elements[name]
        if (!field) return
        if (field.type === 'checkbox') field.checked = Boolean(value)
        else if (field.type !== 'file') field.value = value ?? ''
      })
      if (saved.avatar) avatar.innerHTML = `<img src="${escapeProfileValue(saved.avatar)}" alt="Profile photo" />`
      else avatar.innerHTML = `<span>${escapeProfileValue((saved.fullName || 'RO').trim().split(/\s+/).slice(0, 2).map(part => part[0]?.toUpperCase() || '').join(''))}</span>`
      document.getElementById('profile-bio-count').textContent = `${(saved.bio || '').length} / 500`
      updateIdentity()
      updateCompletion()
    }

    form.addEventListener('input', event => {
      updateCompletion()
      if (event.target.name === 'fullName' || event.target.name === 'role') updateIdentity()
      if (event.target.name === 'bio') document.getElementById('profile-bio-count').textContent = `${event.target.value.length} / 500`
    })
    form.addEventListener('submit', event => {
      event.preventDefault()
      if (!form.reportValidity()) return
      const values = Object.fromEntries(new FormData(form))
      values.emailUpdates = form.elements.emailUpdates.checked
      values.smsUpdates = form.elements.smsUpdates.checked
      const saved = saveProfile(values)
      fillForm(saved)
      status.textContent = 'Your profile has been saved on this device.'
      status.className = 'profile-form-status form-status-success'
      document.getElementById('profile-save-note').textContent = 'Changes saved just now'
      showToast('Profile saved successfully.')
    })
    document.getElementById('profile-reset').addEventListener('click', () => {
      const defaults = resetProfile()
      fillForm(defaults)
      status.textContent = 'Profile details were reset.'
      status.className = 'profile-form-status'
      document.getElementById('profile-save-note').textContent = 'Saved on this device'
      showToast('Profile reset.')
    })
    document.getElementById('profile-photo').addEventListener('change', event => {
      const file = event.target.files?.[0]
      if (!file) return
      if (!['image/jpeg', 'image/png', 'image/webp'].includes(file.type) || file.size > 2 * 1024 * 1024) {
        status.textContent = 'Choose a JPG, PNG, or WebP image under 2 MB.'
        status.className = 'profile-form-status form-status-error'
        event.target.value = ''
        return
      }
      const reader = new FileReader()
      reader.addEventListener('load', () => {
        form.elements.avatar.value = reader.result
        avatar.innerHTML = `<img src="${reader.result}" alt="Profile photo preview" />`
        status.textContent = 'Photo ready. Save changes to keep it.'
        status.className = 'profile-form-status'
      })
      reader.readAsDataURL(file)
    })
    updateCompletion()
    bindNav()
  }, 0)
  return wrapper
}

// ===== PLATFORM OVERVIEW =====
export function renderPlatform() {
  const content = `
    <div class="page-banner">
      <div class="container">
        <h1>The ROBZ Platform</h1>
        <p>A digital operating system for the entire agricultural value chain</p>
      </div>
    </div>
    <section class="section">
      <div class="container">
        <div class="section-header">
          <span class="badge badge-primary">Platform Modules</span>
          <h2>Everything Connected, Everything Integrated</h2>
          <p>Each module feeds the next stage of the agricultural value chain</p>
        </div>
        <div class="feature-grid">
          ${[
            { icon: 'sprout', title: 'Farm Planning & Crop Calendar', desc: 'Plan your season: crop selection, planting dates, input requirements, and expected harvest. Connects directly to input purchasing.', link: 'farm-planner' },
            { icon: 'chart', title: 'Farm Profitability Dashboard', desc: 'Track revenue, production costs, labor, inputs, and transport. See net profit per acre and per kilogram.', link: 'profitability' },
            { icon: 'qr', title: 'Produce Traceability', desc: 'Every batch gets a unique ID and QR code. Track the journey from farm to buyer with full transparency.', link: 'traceability' },
            { icon: 'users', title: 'Cooperative Management', desc: 'Manage members, farms, production, collection, warehouse, bulk orders, and member payments.', link: 'cooperative' },
            { icon: 'clipboard', title: 'Contract Trading', desc: 'Create purchase agreements, manage deliveries, track contract payments, and resolve disputes.', link: 'contracts' },
            { icon: 'store', title: 'Buyer Demand Board', desc: 'Buyers post what they need. Farmers and cooperatives respond. Demand-driven trading made simple.', link: 'buyer-demand' },
            { icon: 'flask', title: 'Quality & Certification', desc: 'Inspections, grading, moisture testing, lab results, and certificates for every batch.', link: 'quality' },
            { icon: 'factory', title: 'Processor Portal', desc: 'Raw material requirements, supplier network, purchase orders, production batches, and finished products.', link: 'processor' },
            { icon: 'globe', title: 'Agribusiness Directory', desc: 'Find farmers, cooperatives, buyers, processors, transporters, warehouses, and financial institutions.', link: 'directory' },
            { icon: 'book', title: 'ROBZ Academy', desc: 'Courses, lessons, videos, quizzes, and certificates. Track your learning progress.', link: 'academy' },
            { icon: 'robot', title: 'ROBZ Agri Assist', desc: 'AI assistant that answers using your farm data and authorized knowledge base.', link: 'agri-assist' },
            { icon: 'sun', title: 'Climate-Smart Agriculture', desc: 'Climate information, water management, soil conservation, drought and flood preparedness.', link: 'climate' },
            { icon: 'wallet', title: 'Transaction Center', desc: 'Wallet, deposits, withdrawals, payments, refunds, invoices, receipts, and statements.', link: 'wallet' },
            { icon: 'file', title: 'Document Vault', desc: 'Invoices, receipts, contracts, certificates, delivery notes, and loan documents in one place.', link: 'documents' },
            { icon: 'award', title: 'Rewards Program', desc: 'Earn points for profile completion, training, transactions, and referrals. Redeem for benefits.', link: 'rewards' },
            { icon: 'phoneMobile', title: 'USSD Platform', desc: 'Access ROBZ without a smartphone. Market prices, sell produce, buy inputs, check orders via USSD.', link: 'ussd' }
          ].map(m => `
            <div class="feature-item" style="cursor:pointer" data-nav="${m.link}">
              <div class="feature-item-icon">${getIcon(m.icon)}</div>
              <div>
                <h4>${m.title}</h4>
                <p>${m.desc}</p>
                <span style="color:var(--primary-600);font-size:0.8rem;font-weight:600;margin-top:0.5rem;display:inline-block">Explore ${icons.arrow}</span>
              </div>
            </div>
          `).join('')}
        </div>
      </div>
    </section>
    <section class="section bg-light">
      <div class="container">
        <div class="section-header">
          <span class="badge badge-accent">The Value Chain Loop</span>
          <h2>How Every Module Connects</h2>
        </div>
        <div class="value-chain">
          ${[
            { title: 'Farm Planning', desc: 'Plan crops, calculate inputs, estimate harvest', icon: 'sprout' },
            { title: 'Input Procurement', desc: 'Buy seeds, fertilizers, equipment through marketplace', icon: 'store' },
            { title: 'Production', desc: 'Grow with agronomy support and climate guidance', icon: 'leaf' },
            { title: 'Harvest & Quality', desc: 'Grade, test moisture, certify, and inspect', icon: 'check' },
            { title: 'Traceability', desc: 'Assign batch IDs and QR codes to every lot', icon: 'qr' },
            { title: 'Collection & Warehouse', desc: 'Aggregate through cooperatives and collection centers', icon: 'factory' },
            { title: 'B2B Marketplace', desc: 'Sell to buyers, processors, and exporters', icon: 'store' },
            { title: 'Contract & Payment', desc: 'Execute contracts, secure payments, settle transactions', icon: 'wallet' },
            { title: 'Logistics & Delivery', desc: 'Farm-to-market transport with tracking', icon: 'truck' },
            { title: 'Analytics & Next Season', desc: 'Profitability insights drive better planning', icon: 'chart' }
          ].map((step, i, arr) => `
            <div class="value-chain-step">
              <div style="display:flex;align-items:center;gap:0.5rem;justify-content:center">
                <span style="font-size:1.5rem">${getIcon(step.icon)}</span>
                <h4>${step.title}</h4>
              </div>
              <p>${step.desc}</p>
            </div>
            ${i < arr.length - 1 ? `<div class="value-chain-arrow">${icons.arrowDown}</div>` : ''}
          `).join('')}
        </div>
      </div>
    </section>
  `
  const wrapper = pageWrapper(content, true, [{ label: 'Home', path: '' }, { label: 'Platform' }])
  bindNav()
  return wrapper
}

// ===== FARM PLANNER =====
export function renderFarmPlanner() {
  const content = `
    <div class="page-banner">
      <div class="container">
        <h1>Farm Planner</h1>
        <p>Plan your season from planting to harvest with intelligent calculators</p>
      </div>
    </div>
    <section class="section">
      <div class="container" style="max-width:900px">
        <div class="dash-card" style="padding:2rem;margin-bottom:1.5rem">
          <h2 style="margin-bottom:1rem">Create Your Farm Plan</h2>
          <div class="form-row">
            <div class="form-group">
              <label>Farm Size (acres)</label>
              <input type="number" id="fp-acres" value="3" min="0.1" step="0.1" />
            </div>
            <div class="form-group">
              <label>Crop</label>
              <select id="fp-crop">
                <option value="maize">Maize</option>
                <option value="rice">Rice</option>
                <option value="wheat">Wheat</option>
                <option value="soybeans">Soybeans</option>
                <option value="tomatoes">Tomatoes</option>
              </select>
            </div>
          </div>
          <div class="form-row">
            <div class="form-group">
              <label>Planting Date</label>
              <input type="date" id="fp-date" />
            </div>
            <div class="form-group">
              <label>Expected Yield (bags/acre)</label>
              <input type="number" id="fp-yield" value="40" min="1" />
            </div>
          </div>
          <button class="btn btn-primary btn-lg" id="fp-calculate" style="width:100%">Calculate Farm Plan</button>
        </div>

        <div id="fp-results" style="display:none">
          <div class="dashboard-grid mb-4">
            <div class="dash-card">
              <div class="dash-card-icon green">${icons.sprout}</div>
              <h4>Seed Required</h4>
              <div class="value" id="fp-seed">--</div>
              <div class="sub">kg of seed</div>
            </div>
            <div class="dash-card">
              <div class="dash-card-icon amber">${icons.flask}</div>
              <h4>Fertilizer</h4>
              <div class="value" id="fp-fert">--</div>
              <div class="sub">kg NPK 15-15-15</div>
            </div>
            <div class="dash-card">
              <div class="dash-card-icon blue">${icons.wallet}</div>
              <h4>Est. Cost</h4>
              <div class="value" id="fp-cost">--</div>
              <div class="sub">total investment</div>
            </div>
            <div class="dash-card">
              <div class="dash-card-icon green">${icons.chart}</div>
              <h4>Est. Revenue</h4>
              <div class="value" id="fp-revenue">--</div>
              <div class="sub">at market price</div>
            </div>
          </div>
          <div class="dash-card" style="padding:2rem">
            <h3 style="margin-bottom:1rem">Season Calendar</h3>
            <table class="data-table">
              <thead><tr><th>Stage</th><th>Timing</th><th>Activities</th></tr></thead>
              <tbody id="fp-calendar"></tbody>
            </table>
          </div>
          <div class="dash-card" style="padding:2rem;margin-top:1rem">
            <h3 style="margin-bottom:0.5rem">Estimated Profit</h3>
            <div style="font-size:2.5rem;font-family:var(--font-heading);font-weight:800;color:var(--primary-600)" id="fp-profit">--</div>
            <p style="color:var(--neutral-500);font-size:0.85rem;margin-top:0.5rem">This is an estimate for decision support only. Actual results depend on weather, market conditions, and farm management.</p>
          </div>
          <div class="flex gap-2 mt-4">
            <button class="btn btn-primary" data-nav="marketplace">Buy Inputs Now</button>
            <button class="btn btn-outline" data-nav="profitability">Track Profitability</button>
          </div>
        </div>
      </div>
    </section>
  `
  const wrapper = pageWrapper(content, true, [{ label: 'Home', path: '' }, { label: 'Farm Planner' }])

  setTimeout(() => {
    const cropData = {
      maize: { seedPerAcre: 6, fertPerAcre: 50, seedPrice: 2800, fertPrice: 320, marketPrice: 320, stages: [
        ['Land Preparation', 'Week 1-2', 'Clear, plow, and harrow the field'],
        ['Planting', 'Week 3', 'Plant seeds at 60cm x 30cm spacing'],
        ['Fertilizer Application', 'Week 5-6', 'Apply NPK as basal, then urea at 6 weeks'],
        ['Weed Control', 'Week 4-8', 'Manual weeding or herbicide application'],
        ['Pest Management', 'Week 6-12', 'Monitor for fall armyworm and stem borers'],
        ['Harvest', 'Week 16-18', 'Harvest when cobs are dry and hard']
      ]},
      rice: { seedPerAcre: 8, fertPerAcre: 60, seedPrice: 3000, fertPrice: 320, marketPrice: 380, stages: [
        ['Nursery', 'Week 1-3', 'Prepare seedbed and germinate seeds'],
        ['Land Prep', 'Week 2-3', 'Puddle field for transplanting'],
        ['Transplanting', 'Week 4', 'Transplant seedlings at 20cm x 20cm'],
        ['Fertilizer', 'Week 6', 'Apply NPK and top-dress with urea'],
        ['Weed Control', 'Week 5-10', 'Hand weed or use herbicides'],
        ['Harvest', 'Week 16-20', 'Harvest when 80% of grains are golden']
      ]},
      wheat: { seedPerAcre: 5, fertPerAcre: 55, seedPrice: 4500, fertPrice: 320, marketPrice: 450, stages: [
        ['Land Prep', 'Week 1', 'Plow and level the field'],
        ['Sowing', 'Week 2', 'Drill seeds at 20cm row spacing'],
        ['Irrigation', 'Week 3-14', 'Irrigate at critical growth stages'],
        ['Fertilizer', 'Week 4', 'Apply NPK basal, urea top-dress at 30 days'],
        ['Pest Control', 'Week 8-12', 'Monitor for rust and aphids'],
        ['Harvest', 'Week 16-18', 'Harvest when grain moisture is below 12%']
      ]},
      soybeans: { seedPerAcre: 4, fertPerAcre: 30, seedPrice: 3500, fertPrice: 320, marketPrice: 500, stages: [
        ['Land Prep', 'Week 1', 'Plow and harrow to fine tilth'],
        ['Inoculation', 'Week 2', 'Treat seeds with rhizobium inoculant'],
        ['Planting', 'Week 2', 'Plant at 45cm x 10cm spacing'],
        ['Weed Control', 'Week 3-6', 'Hand weed at 3 and 6 weeks'],
        ['Pest Monitor', 'Week 6-12', 'Watch for pod borers and aphids'],
        ['Harvest', 'Week 14-16', 'Harvest when pods turn brown']
      ]},
      tomatoes: { seedPerAcre: 0.2, fertPerAcre: 80, seedPrice: 5000, fertPrice: 320, marketPrice: 45, stages: [
        ['Nursery', 'Week 1-4', 'Raise seedlings in trays or seedbed'],
        ['Land Prep', 'Week 3', 'Prepare beds with compost and manure'],
        ['Transplanting', 'Week 5', 'Transplant at 60cm x 45cm spacing'],
        ['Staking', 'Week 7', 'Stake plants and prune suckers'],
        ['Pest & Disease', 'Week 6-14', 'Spray for blight, fruit borers, and whiteflies'],
        ['Harvest', 'Week 12-18', 'Harvest at breaker stage for transport']
      ]}
    }

    document.getElementById('fp-calculate')?.addEventListener('click', () => {
      const acres = parseFloat(document.getElementById('fp-acres').value) || 1
      const crop = document.getElementById('fp-crop').value
      const expYield = parseFloat(document.getElementById('fp-yield').value) || 40
      const data = cropData[crop]
      if (!data) return

      const seed = (data.seedPerAcre * acres).toFixed(1)
      const fert = Math.round(data.fertPerAcre * acres)
      const seedCost = Math.round(data.seedPrice * seed)
      const fertCost = Math.round(data.fertPrice * fert)
      const laborCost = Math.round(acres * 50000)
      const totalCost = seedCost + fertCost + laborCost
      const totalBags = Math.round(expYield * acres)
      const revenue = totalBags * data.marketPrice
      const profit = revenue - totalCost

      document.getElementById('fp-seed').textContent = seed
      document.getElementById('fp-fert').textContent = fert
      document.getElementById('fp-cost').textContent = formatPrice(totalCost)
      document.getElementById('fp-revenue').textContent = formatPrice(revenue)
      document.getElementById('fp-profit').textContent = formatPrice(profit)

      document.getElementById('fp-calendar').innerHTML = data.stages.map(s =>
        `<tr><td><strong>${s[0]}</strong></td><td>${s[1]}</td><td>${s[2]}</td></tr>`
      ).join('')

      document.getElementById('fp-results').style.display = 'block'
      document.getElementById('fp-results').scrollIntoView({ behavior: 'smooth' })
    })
    bindNav()
  }, 100)
  return wrapper
}

// ===== PROFITABILITY =====
export function renderProfitability() {
  const content = `
    <div class="page-banner">
      <div class="container">
        <h1>Farm Profitability Dashboard</h1>
        <p>Track your costs, revenue, and net profit with precision</p>
      </div>
    </div>
    <section class="section">
      <div class="container">
        <div class="dashboard-grid mb-6">
          <div class="dash-card">
            <div class="dash-card-icon green">${icons.chart}</div>
            <h4>Total Revenue</h4>
            <div class="value">${formatPrice(1850000)}</div>
            <div class="sub">This season</div>
          </div>
          <div class="dash-card">
            <div class="dash-card-icon red">${icons.wallet}</div>
            <h4>Total Costs</h4>
            <div class="value">${formatPrice(920000)}</div>
            <div class="sub">Inputs + labor + transport</div>
          </div>
          <div class="dash-card">
            <div class="dash-card-icon green">${icons.check}</div>
            <h4>Net Profit</h4>
            <div class="value" style="color:var(--primary-600)">${formatPrice(930000)}</div>
            <div class="sub">50.3% margin</div>
          </div>
          <div class="dash-card">
            <div class="dash-card-icon amber">${icons.sprout}</div>
            <h4>Profit / Acre</h4>
            <div class="value">${formatPrice(310000)}</div>
            <div class="sub">3 acres cultivated</div>
          </div>
        </div>

        <div style="display:grid;gap:1.5rem;grid-template-columns:1fr" class="profit-grid">
          <div class="dash-card" style="padding:2rem">
            <h3 style="margin-bottom:1rem">Cost Breakdown</h3>
            ${[
              { label: 'Seeds', amount: 84000, color: 'var(--primary-500)' },
              { label: 'Fertilizer', amount: 160000, color: 'var(--accent-500)' },
              { label: 'Pesticides', amount: 76000, color: 'var(--secondary-500)' },
              { label: 'Labor', amount: 350000, color: 'var(--success-500)' },
              { label: 'Transport', amount: 150000, color: 'var(--neutral-400)' },
              { label: 'Equipment Fuel', amount: 100000, color: 'var(--soil-400)' }
            ].map(c => `
              <div style="margin-bottom:1rem">
                <div class="flex justify-between" style="font-size:0.875rem;margin-bottom:0.25rem">
                  <span style="font-weight:600">${c.label}</span>
                  <span>${formatPrice(c.amount)}</span>
                </div>
                <div class="progress-bar">
                  <div class="progress-bar-fill" style="width:${(c.amount / 920000 * 100).toFixed(0)}%;background:${c.color}"></div>
                </div>
              </div>
            `).join('')}
          </div>
          <div class="dash-card" style="padding:2rem">
            <h3 style="margin-bottom:1rem">Season Comparison</h3>
            <table class="data-table">
              <thead><tr><th>Season</th><th>Revenue</th><th>Costs</th><th>Profit</th><th>Margin</th></tr></thead>
              <tbody>
                ${[
                  ['2024 Season A', 1200000, 780000, 420000, '35%'],
                  ['2024 Season B', 1450000, 850000, 600000, '41%'],
                  ['2025 Season A', 1650000, 890000, 760000, '46%'],
                  ['2025 Season B', 1850000, 920000, 930000, '50%']
                ].map(r => `<tr><td><strong>${r[0]}</strong></td><td>${formatPrice(r[1])}</td><td>${formatPrice(r[2])}</td><td style="color:var(--primary-600);font-weight:700">${formatPrice(r[3])}</td><td><span class="badge badge-success">${r[4]}</span></td></tr>`).join('')}
              </tbody>
            </table>
          </div>
        </div>

        <div class="cta-section mt-6">
          <h2>Want Detailed Financial Reports?</h2>
          <p>Export cost-per-kg, budget vs actual, and crop profitability reports</p>
          <button class="btn btn-white btn-lg mt-3">Export Reports</button>
        </div>
      </div>
    </section>
  `
  const wrapper = pageWrapper(content, true, [{ label: 'Home', path: '' }, { label: 'Profitability' }])
  bindNav()
  return wrapper
}

// ===== TRACEABILITY =====
export function renderTraceability() {
  const content = `
    <div class="page-banner">
      <div class="container">
        <h1>Produce Traceability</h1>
        <p>Track every batch from farm to buyer with full transparency</p>
      </div>
    </div>
    <section class="section">
      <div class="container" style="max-width:900px">
        <div class="dash-card" style="padding:2rem;margin-bottom:2rem;text-align:center">
          <div style="font-size:3rem;margin-bottom:1rem">${icons.qr}</div>
          <h2>Trace a Batch</h2>
          <p style="color:var(--neutral-500);margin-top:0.5rem">Enter a batch ID or scan a QR code to view the full journey</p>
          <div class="flex gap-2 justify-center mt-3" style="flex-wrap:wrap">
            <input type="text" placeholder="e.g. RBZ-MZ-GUL-2026-00125" style="max-width:400px" id="trace-input" />
            <button class="btn btn-primary" id="trace-btn">Trace Batch</button>
          </div>
        </div>

        <div id="trace-result" style="display:none">
          <div class="dash-card" style="padding:2rem;margin-bottom:1rem">
            <div class="flex justify-between flex-wrap gap-2">
              <div>
                <span class="badge badge-primary">Batch ID</span>
                <h3 style="margin-top:0.5rem;font-family:var(--font-mono);font-size:1.1rem">RBZ-MZ-GUL-2026-00125</h3>
              </div>
              <span class="badge badge-success" style="height:fit-content">${icons.check} PASSED</span>
            </div>
          </div>
          <div class="value-chain">
            ${[
              { title: 'Farm', desc: 'OCODRI Farm Community', detail: 'Farmer: John Okello', icon: 'sprout' },
              { title: 'Harvest', desc: 'September 20, 2026', detail: '25 MT harvested', icon: 'wheat' },
              { title: 'Collection', desc: 'OCODRI Collection Center', detail: 'Received Sept 22, 2026', icon: 'store' },
              { title: 'Quality Inspection', desc: 'Grade A, Moisture 12.5%', detail: 'Inspector: Lab Tech #3', icon: 'flask' },
              { title: 'Warehouse', desc: 'OCODRI Warehouse, Bay 4', detail: 'Stored at 14°C', icon: 'factory' },
              { title: 'Dispatch', desc: 'To OCODRI Buyer Network', detail: 'Truck: ARU 2345, Oct 1', icon: 'truck' },
              { title: 'Delivery', desc: 'Received by XYZ Foods', detail: 'Oct 3, 2026 - Confirmed', icon: 'check' }
            ].map((step, i, arr) => `
              <div class="value-chain-step">
                <div style="display:flex;align-items:center;gap:0.5rem;justify-content:center">
                  <span style="font-size:1.5rem">${getIcon(step.icon)}</span>
                  <h4>${step.title}</h4>
                </div>
                <p>${step.desc}</p>
                <p style="font-size:0.75rem;color:var(--neutral-400)">${step.detail}</p>
              </div>
              ${i < arr.length - 1 ? `<div class="value-chain-arrow">${icons.arrowDown}</div>` : ''}
            `).join('')}
          </div>
        </div>

        <div class="grid grid-3 mt-6">
          ${[
            { icon: 'qr', title: 'Unique Batch IDs', desc: 'Every batch gets a unique identifier for tracking' },
            { icon: 'shield', title: 'Quality Verified', desc: 'Each stage includes quality checks and certifications' },
            { icon: 'globe', title: 'Buyer Transparency', desc: 'Buyers can scan QR codes to see full product history' }
          ].map(f => `
            <div class="feature-item">
              <div class="feature-item-icon">${getIcon(f.icon)}</div>
              <div><h4>${f.title}</h4><p>${f.desc}</p></div>
            </div>
          `).join('')}
        </div>
      </div>
    </section>
  `
  const wrapper = pageWrapper(content, true, [{ label: 'Home', path: '' }, { label: 'Traceability' }])
  setTimeout(() => {
    document.getElementById('trace-btn')?.addEventListener('click', () => {
      const input = document.getElementById('trace-input')
      if (input.value.trim()) {
        document.getElementById('trace-result').style.display = 'block'
        document.getElementById('trace-result').scrollIntoView({ behavior: 'smooth' })
      } else {
        input.value = 'RBZ-MZ-GUL-2026-00125'
        document.getElementById('trace-result').style.display = 'block'
        document.getElementById('trace-result').scrollIntoView({ behavior: 'smooth' })
      }
    })
    bindNav()
  }, 100)
  return wrapper
}

// ===== COOPERATIVE =====
export function renderCooperative() {
  const content = `
    <div class="page-banner">
      <div class="container">
        <h1>Cooperative Portal</h1>
        <p>Manage members, production, collection, and payments in one place</p>
      </div>
    </div>
    <section class="section">
      <div class="container">
        <div class="dashboard-grid mb-6">
          <div class="dash-card"><div class="dash-card-icon green">${icons.users}</div><h4>Members</h4><div class="value">248</div><div class="sub">Registered farmers</div></div>
          <div class="dash-card"><div class="dash-card-icon amber">${icons.sprout}</div><h4>Total Farms</h4><div class="value">312</div><div class="sub">acres tracked</div></div>
          <div class="dash-card"><div class="dash-card-icon blue">${icons.store}</div><h4>Produce Collected</h4><div class="value">1,250 MT</div><div class="sub">this season</div></div>
          <div class="dash-card"><div class="dash-card-icon green">${icons.wallet}</div><h4>Member Payments</h4><div class="value">${formatPrice(48500000)}</div><div class="sub">disbursed</div></div>
        </div>

        <div style="display:grid;gap:1.5rem;grid-template-columns:1fr" class="coop-grid">
          <div class="dash-card" style="padding:2rem">
            <h3 style="margin-bottom:1rem">Recent Member Activity</h3>
            <table class="data-table">
              <thead><tr><th>Member</th><th>Farm</th><th>Produce</th><th>Qty</th><th>Status</th></tr></thead>
              <tbody>
                ${[
                  ['John Okello', 'OCODRI', 'Maize', '2.5 MT', 'Collected'],
                  ['Mary Adoch', 'OCODRI', 'Beans', '1.8 MT', 'Pending'],
                  ['Peter Luta', 'OCODRI', 'Maize', '3.2 MT', 'Paid'],
                  ['Grace Lamwo', 'OCODRI', 'Rice', '4.0 MT', 'Collected'],
                  ['Samuel Otto', 'OCODRI', 'Soybeans', '2.1 MT', 'Quality Check']
                ].map(r => `<tr><td><strong>${r[0]}</strong></td><td>${r[1]}</td><td>${r[2]}</td><td>${r[3]}</td><td><span class="badge ${r[4] === 'Paid' ? 'badge-success' : r[4] === 'Pending' ? 'badge-warning' : 'badge-primary'}">${r[4]}</span></td></tr>`).join('')}
              </tbody>
            </table>
          </div>
          <div class="dash-card" style="padding:2rem">
            <h3 style="margin-bottom:1rem">Collection Centers</h3>
            ${[
              { name: 'OCODRI Collection Center A', stock: '450 MT', capacity: 800 },
              { name: 'OCODRI Collection Center B', stock: '380 MT', capacity: 600 },
              { name: 'OCODRI Collection Center C', stock: '220 MT', capacity: 400 },
              { name: 'OCODRI Collection Center D', stock: '200 MT', capacity: 350 }
            ].map(c => `
              <div style="margin-bottom:1rem">
                <div class="flex justify-between" style="font-size:0.875rem;margin-bottom:0.25rem">
                  <span style="font-weight:600">${icons.location} ${c.name}</span>
                  <span>${c.stock} / ${c.capacity} MT</span>
                </div>
                <div class="progress-bar"><div class="progress-bar-fill" style="width:${(c.stock / c.capacity * 100).toFixed(0)}%"></div></div>
              </div>
            `).join('')}
          </div>
        </div>
      </div>
    </section>
  `
  const wrapper = pageWrapper(content, true, [{ label: 'Home', path: '' }, { label: 'Cooperative' }])
  bindNav()
  return wrapper
}

// ===== CONTRACTS =====
export function renderContracts() {
  const content = `
    <div class="page-banner">
      <div class="container">
        <h1>Contract Trading</h1>
        <p>Professional B2B purchase agreements with full lifecycle management</p>
      </div>
    </div>
    <section class="section">
      <div class="container">
        <div class="dashboard-grid mb-6">
          <div class="dash-card"><div class="dash-card-icon green">${icons.clipboard}</div><h4>Active</h4><div class="value">12</div><div class="sub">contracts</div></div>
          <div class="dash-card"><div class="dash-card-icon amber">${icons.clock}</div><h4>Pending</h4><div class="value">5</div><div class="sub">awaiting response</div></div>
          <div class="dash-card"><div class="dash-card-icon blue">${icons.check}</div><h4>Completed</h4><div class="value">38</div><div class="sub">this year</div></div>
          <div class="dash-card"><div class="dash-card-icon red">${icons.shield}</div><h4>Disputes</h4><div class="value">1</div><div class="sub">in resolution</div></div>
        </div>

        <div class="dash-card" style="padding:2rem;margin-bottom:1rem">
          <h3 style="margin-bottom:1rem">Active Contracts</h3>
          <table class="data-table">
            <thead><tr><th>Contract ID</th><th>Buyer</th><th>Commodity</th><th>Qty</th><th>Price/kg</th><th>Delivery</th><th>Status</th></tr></thead>
            <tbody>
              ${[
                ['CT-2026-001', 'XYZ Foods Ltd', 'Maize', '100 MT', '\u20A6320', 'Oct 15-30', 'Active'],
                ['CT-2026-002', 'ABC Millers', 'Rice', '50 MT', '\u20A6380', 'Nov 1-15', 'Active'],
                ['CT-2026-003', 'Northern Trade', 'Soybeans', '80 MT', '\u20A6500', 'Oct 20-Nov 5', 'Pending'],
                ['CT-2026-004', 'Grain Co. Ltd', 'Wheat', '200 MT', '\u20A6450', 'Nov 10-30', 'Active'],
                ['CT-2026-005', 'Agro Processors', 'Maize', '150 MT', '\u20A6315', 'Dec 1-15', 'Pending']
              ].map(r => `<tr><td><strong>${r[0]}</strong></td><td>${r[1]}</td><td>${r[2]}</td><td>${r[3]}</td><td>${r[4]}</td><td>${r[5]}</td><td><span class="badge ${r[6] === 'Active' ? 'badge-success' : 'badge-warning'}">${r[6]}</span></td></tr>`).join('')}
            </tbody>
          </table>
        </div>

        <div class="grid grid-3 mt-4">
          ${[
            { icon: 'clipboard', title: 'Contract Templates', desc: 'Standard templates for grains, legumes, and processed products' },
            { icon: 'truck', title: 'Delivery Tracking', desc: 'Monitor contract deliveries against agreed schedules' },
            { icon: 'wallet', title: 'Payment Management', desc: 'Track contract payments and settlement terms' }
          ].map(f => `<div class="feature-item"><div class="feature-item-icon">${getIcon(f.icon)}</div><div><h4>${f.title}</h4><p>${f.desc}</p></div></div>`).join('')}
        </div>
      </div>
    </section>
  `
  const wrapper = pageWrapper(content, true, [{ label: 'Home', path: '' }, { label: 'Contracts' }])
  bindNav()
  return wrapper
}

// ===== BUYER DEMAND =====
export function renderBuyerDemand() {
  const savedDemands = JSON.parse(localStorage.getItem('robz_demands') || '[]')
  const sampleDemands = [
    { commodity: 'Maize', qty: '500 MT', grade: 'Grade A', buyer: 'OCODRI Buyer Network', location: 'OCODRI', delivery: 'Oct 15-30', verified: true, price: 'Negotiable' },
    { commodity: 'Beans', qty: '200 MT', grade: 'Grade A', buyer: 'OCODRI Trade', location: 'OCODRI', delivery: 'Nov 1-20', verified: true, price: 'UGX 650/kg' },
    { commodity: 'Rice', qty: '300 MT', grade: 'Premium', buyer: 'OCODRI Millers', location: 'OCODRI', delivery: 'Oct 25-Nov 10', verified: true, price: 'UGX 400/kg' },
    { commodity: 'Soybeans', qty: '150 MT', grade: 'Grade A', buyer: 'OCODRI Processors', location: 'OCODRI', delivery: 'Nov 5-20', verified: false, price: 'Negotiable' },
    { commodity: 'Wheat', qty: '400 MT', grade: 'Grade A', buyer: 'OCODRI Grain Co.', location: 'OCODRI', delivery: 'Dec 1-15', verified: true, price: 'UGX 480/kg' },
    { commodity: 'Tomatoes', qty: '50 MT', grade: 'Fresh', buyer: 'OCODRI Fresh Market', location: 'OCODRI', delivery: 'Weekly', verified: true, price: 'UGX 45/kg' }
  ]
  const demands = [...savedDemands, ...sampleDemands]

  const content = `
    <div class="page-banner">
      <div class="container">
        <h1>Buyer Demand Board</h1>
        <p>Demand-driven trading — buyers post what they need, farmers respond</p>
      </div>
    </div>
    <section class="section">
      <div class="container">
        <div class="flex justify-between items-center mb-4 flex-wrap gap-2">
          <h2 style="font-size:1.5rem">Open Demand Requests</h2>
          <button class="btn btn-primary" id="post-demand-btn">Post Demand</button>
        </div>
        <div class="demand-composer hidden" id="demand-composer">
          <div class="demand-composer-heading"><div><h2>Tell farmers what you need</h2><p>Give clear details so local producers can respond with confidence.</p></div><button class="btn btn-ghost" type="button" id="close-demand-btn">Close</button></div>
          <form id="demand-form">
            <div class="form-row">
              <div class="form-group"><label for="demand-commodity">Commodity</label><input id="demand-commodity" name="commodity" required placeholder="e.g. Maize" /></div>
              <div class="form-group"><label for="demand-quantity">Quantity</label><div class="quantity-input"><input id="demand-quantity" name="quantity" type="number" min="1" required placeholder="500" /><select name="unit" aria-label="Quantity unit"><option>kg</option><option>bags</option><option>MT</option><option>crates</option></select></div></div>
            </div>
            <div class="form-row">
              <div class="form-group"><label for="demand-grade">Quality or grade</label><select id="demand-grade" name="grade"><option>Grade A</option><option>Premium</option><option>Fresh</option><option>Any acceptable grade</option></select></div>
              <div class="form-group"><label for="demand-price">Target price</label><input id="demand-price" name="price" placeholder="e.g. UGX 650/kg or Negotiable" /></div>
            </div>
            <div class="form-row">
              <div class="form-group"><label for="demand-delivery">Delivery window</label><input id="demand-delivery" name="delivery" required placeholder="e.g. Within 14 days" /></div>
              <div class="form-group"><label for="demand-contact">Contact phone</label><input id="demand-contact" name="contact" type="tel" required placeholder="+256 700 000 000" /></div>
            </div>
            <button class="btn btn-primary" type="submit">Publish Demand</button>
            <span class="demand-form-status" id="demand-form-status" role="status"></span>
          </form>
        </div>
        <div class="grid grid-2">
          ${demands.map((d, index) => `
            <div class="dash-card" style="padding:1.5rem">
              <div class="flex justify-between items-start mb-2">
                <div>
                  <h3 style="font-size:1.25rem">${d.commodity}</h3>
                  <p style="color:var(--neutral-500);font-size:0.85rem">${d.buyer} ${d.verified ? '<span class="badge badge-success" style="margin-left:0.5rem">Verified</span>' : '<span class="badge badge-neutral" style="margin-left:0.5rem">Unverified</span>'}</p>
                </div>
                <span class="badge badge-primary">${d.qty}</span>
              </div>
              <div class="grid grid-2" style="gap:0.5rem;font-size:0.85rem">
                <div><span style="color:var(--neutral-400)">Grade:</span> <strong>${d.grade}</strong></div>
                <div><span style="color:var(--neutral-400)">Price:</span> <strong>${d.price}</strong></div>
                <div><span style="color:var(--neutral-400)">Location:</span> <strong>${d.location}</strong></div>
                <div><span style="color:var(--neutral-400)">Delivery:</span> <strong>${d.delivery}</strong></div>
              </div>
              <button class="btn btn-outline btn-sm mt-3" style="width:100%" data-demand-response="${index}">Respond to Demand</button>
            </div>
          `).join('')}
        </div>
      </div>
    </section>
  `
  const wrapper = pageWrapper(content, true, [{ label: 'Home', path: '' }, { label: 'Buyer Demand' }])
  setTimeout(() => {
    const composer = document.getElementById('demand-composer')
    document.getElementById('post-demand-btn')?.addEventListener('click', () => composer.classList.toggle('hidden'))
    document.getElementById('close-demand-btn')?.addEventListener('click', () => composer.classList.add('hidden'))
    document.getElementById('demand-form')?.addEventListener('submit', event => {
      event.preventDefault()
      const form = event.currentTarget
      if (!form.checkValidity()) { form.querySelector(':invalid')?.focus(); return }
      const values = Object.fromEntries(new FormData(form))
      const newDemand = { commodity: values.commodity, qty: `${values.quantity} ${values.unit}`, grade: values.grade, buyer: 'You', location: 'OCODRI', delivery: values.delivery, verified: false, price: values.price || 'Negotiable' }
      localStorage.setItem('robz_demands', JSON.stringify([newDemand, ...savedDemands]))
      document.getElementById('demand-form-status').textContent = 'Demand published. Farmers can now respond.'
      showToast('Demand published successfully.')
      navigate('buyer-demand')
    })
    document.querySelectorAll('[data-demand-response]').forEach(button => button.addEventListener('click', () => {
      showToast('Response started. Contact details will be shared after verification.')
    }))
    bindNav()
  }, 100)
  return wrapper
}

// ===== QUALITY =====
export function renderQuality() {
  const content = `
    <div class="page-banner">
      <div class="container">
        <h1>ROBZ Quality Center</h1>
        <p>Inspections, grading, testing, and certification for every batch</p>
      </div>
    </div>
    <section class="section">
      <div class="container">
        <div class="dashboard-grid mb-6">
          <div class="dash-card"><div class="dash-card-icon green">${icons.check}</div><h4>Approved</h4><div class="value">1,245</div><div class="sub">batches this year</div></div>
          <div class="dash-card"><div class="dash-card-icon red">${icons.close}</div><h4>Rejected</h4><div class="value">38</div><div class="sub">failed inspection</div></div>
          <div class="dash-card"><div class="dash-card-icon amber">${icons.flask}</div><h4>Pending</h4><div class="value">24</div><div class="sub">awaiting test</div></div>
          <div class="dash-card"><div class="dash-card-icon blue">${icons.award}</div><h4>Certificates</h4><div class="value">1,180</div><div class="sub">issued</div></div>
        </div>

        <div class="dash-card" style="padding:2rem;margin-bottom:1rem">
          <h3 style="margin-bottom:1rem">Recent Quality Inspections</h3>
          <table class="data-table">
            <thead><tr><th>Batch ID</th><th>Commodity</th><th>Origin</th><th>Grade</th><th>Moisture</th><th>Result</th></tr></thead>
            <tbody>
              ${[
                ['RBZ-MZ-OCO-2026-00125', 'Maize', 'OCODRI', 'A', '12.5%', 'Passed'],
                ['RBZ-RC-OCO-2026-00089', 'Rice', 'OCODRI', 'Premium', '13.2%', 'Passed'],
                ['RBZ-SB-OCO-2026-00034', 'Soybeans', 'OCODRI', 'A', '11.8%', 'Passed'],
                ['RBZ-WH-OCO-2026-00067', 'Wheat', 'OCODRI', 'B', '14.5%', 'Rejected'],
                ['RBZ-BN-OCO-2026-00045', 'Beans', 'OCODRI', 'A', '12.0%', 'Passed']
              ].map(r => `<tr><td style="font-family:var(--font-mono);font-size:0.8rem"><strong>${r[0]}</strong></td><td>${r[1]}</td><td>${r[2]}</td><td><span class="badge badge-primary">Grade ${r[3]}</span></td><td>${r[4]}</td><td><span class="badge ${r[5] === 'Passed' ? 'badge-success' : 'badge-error'}">${r[5]}</span></td></tr>`).join('')}
            </tbody>
          </table>
        </div>

        <div class="grid grid-3 mt-4">
          ${[
            { icon: 'flask', title: 'Moisture Testing', desc: 'Digital moisture meters ensure grains meet storage standards' },
            { icon: 'award', title: 'Grading & Certification', desc: 'Produce graded against national and international standards' },
            { icon: 'qr', title: 'Full Traceability', desc: 'Every batch linked to farm, harvest, and inspection records' }
          ].map(f => `<div class="feature-item"><div class="feature-item-icon">${getIcon(f.icon)}</div><div><h4>${f.title}</h4><p>${f.desc}</p></div></div>`).join('')}
        </div>
      </div>
    </section>
  `
  const wrapper = pageWrapper(content, true, [{ label: 'Home', path: '' }, { label: 'Quality' }])
  bindNav()
  return wrapper
}

// ===== PROCESSOR =====
export function renderProcessor() {
  const content = `
    <div class="page-banner">
      <div class="container">
        <h1>Processor Portal</h1>
        <p>Manage raw material supply, production, and finished product distribution</p>
      </div>
    </div>
    <section class="section">
      <div class="container">
        <div class="dashboard-grid mb-6">
          <div class="dash-card"><div class="dash-card-icon green">${icons.factory}</div><h4>Raw Material</h4><div class="value">850 MT</div><div class="sub">in stock</div></div>
          <div class="dash-card"><div class="dash-card-icon amber">${icons.truck}</div><h4>Incoming</h4><div class="value">320 MT</div><div class="sub">scheduled delivery</div></div>
          <div class="dash-card"><div class="dash-card-icon blue">${icons.store}</div><h4>Finished Goods</h4><div class="value">580 MT</div><div class="sub">ready for sale</div></div>
          <div class="dash-card"><div class="dash-card-icon green">${icons.wallet}</div><h4>Monthly Revenue</h4><div class="value">${formatPrice(125000000)}</div><div class="sub">from processed goods</div></div>
        </div>

        <div style="display:grid;gap:1.5rem;grid-template-columns:1fr" class="proc-grid">
          <div class="dash-card" style="padding:2rem">
            <h3 style="margin-bottom:1rem">Raw Material Requirements</h3>
            ${[
              { name: 'Maize', required: 500, available: 350, unit: 'MT' },
              { name: 'Rice', required: 300, available: 280, unit: 'MT' },
              { name: 'Soybeans', required: 200, available: 120, unit: 'MT' },
              { name: 'Wheat', required: 400, available: 100, unit: 'MT' }
            ].map(r => `
              <div style="margin-bottom:1rem">
                <div class="flex justify-between" style="font-size:0.875rem;margin-bottom:0.25rem">
                  <span style="font-weight:600">${r.name}</span>
                  <span style="color:${r.available < r.required ? 'var(--error-500)' : 'var(--success-500)'}">${r.available} / ${r.required} ${r.unit}</span>
                </div>
                <div class="progress-bar"><div class="progress-bar-fill" style="width:${(r.available / r.required * 100).toFixed(0)}%;background:${r.available < r.required ? 'var(--error-500)' : 'var(--success-500)'}"></div></div>
                ${r.available < r.required ? '<div style="font-size:0.75rem;color:var(--error-500);margin-top:0.25rem">Shortfall — post demand on Buyer Demand Board</div>' : ''}
              </div>
            `).join('')}
          </div>
          <div class="dash-card" style="padding:2rem">
            <h3 style="margin-bottom:1rem">Production Batches</h3>
            <table class="data-table">
              <thead><tr><th>Batch</th><th>Product</th><th>Input</th><th>Output</th><th>Status</th></tr></thead>
              <tbody>
                ${[
                  ['PRD-001', 'Maize Flour', '120 MT', '95 MT', 'Complete'],
                  ['PRD-002', 'Rice Bran Oil', '80 MT', '12 MT', 'Processing'],
                  ['PRD-003', 'Soybean Meal', '100 MT', '78 MT', 'Complete'],
                  ['PRD-004', 'Wheat Flour', '150 MT', '125 MT', 'Processing']
                ].map(r => `<tr><td><strong>${r[0]}</strong></td><td>${r[1]}</td><td>${r[2]}</td><td>${r[3]}</td><td><span class="badge ${r[4] === 'Complete' ? 'badge-success' : 'badge-warning'}">${r[4]}</span></td></tr>`).join('')}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </section>
  `
  const wrapper = pageWrapper(content, true, [{ label: 'Home', path: '' }, { label: 'Processor' }])
  bindNav()
  return wrapper
}

// ===== DIRECTORY =====
export function renderDirectory() {
  const content = `
    <div class="page-banner">
      <div class="container">
        <h1>Agribusiness Directory</h1>
        <p>The business directory for the entire agricultural ecosystem</p>
      </div>
    </div>
    <section class="section">
      <div class="container">
        <div class="flex gap-2 mb-4 flex-wrap">
          <input type="text" placeholder="Search by name, location, or commodity..." style="flex:1;min-width:250px" />
          <select style="width:auto;min-width:160px">
            <option>All Categories</option>
            <option>Farmers</option>
            <option>Cooperatives</option>
            <option>Buyers</option>
            <option>Processors</option>
            <option>Agro-dealers</option>
            <option>Transporters</option>
            <option>Warehouses</option>
          </select>
          <button class="btn btn-primary">Search</button>
        </div>
        <div class="grid grid-3">
          ${[
            { name: 'OCODRI Growers Co-op', type: 'Cooperative', location: 'OCODRI', members: 248, verified: true, icon: 'users' },
            { name: 'OCODRI Foods Ltd', type: 'Buyer', location: 'OCODRI', capacity: '5000 MT/year', verified: true, icon: 'store' },
            { name: 'OCODRI Machinery Hub', type: 'Equipment Supplier', location: 'OCODRI', capacity: 'Tractors & implements', verified: true, icon: 'tractor' },
            { name: 'OCODRI Apiaries', type: 'Farmer/Producer', location: 'OCODRI', capacity: '5,000 L honey/year', verified: true, icon: 'honey' },
            { name: 'OCODRI Transport', type: 'Transporter', location: 'OCODRI', capacity: '50 trucks', verified: false, icon: 'truck' },
            { name: 'OCODRI Grain Co.', type: 'Processor', location: 'OCODRI', capacity: '200 MT/day milling', verified: true, icon: 'factory' },
            { name: 'OCODRI Agro-Dealer', type: 'Agro-dealer', location: 'OCODRI', capacity: 'Seeds & inputs', verified: true, icon: 'sprout' },
            { name: 'OCODRI Water Systems', type: 'Service Provider', location: 'OCODRI', capacity: 'Irrigation systems', verified: true, icon: 'droplet' },
            { name: 'OCODRI Orchards', type: 'Farmer/Producer', location: 'OCODRI', capacity: 'Apples & fruits', verified: true, icon: 'apple' }
          ].map(b => `
            <div class="dash-card" style="padding:1.5rem">
              <div class="flex items-start gap-2 mb-2">
                <div class="dash-card-icon" style="margin:0">${getIcon(b.icon)}</div>
                <div style="flex:1">
                  <h4 style="font-size:1rem">${b.name}</h4>
                  <p style="font-size:0.8rem;color:var(--neutral-500)">${b.type}</p>
                </div>
                ${b.verified ? '<span class="badge badge-success">Verified</span>' : '<span class="badge badge-neutral">Unverified</span>'}
              </div>
              <div style="font-size:0.85rem;color:var(--neutral-600)">
                <div style="display:flex;align-items:center;gap:0.5rem;margin-bottom:0.25rem">${icons.location} ${b.location}</div>
                <div style="display:flex;align-items:center;gap:0.5rem">${icons.chart} ${b.capacity || b.members + ' members'}</div>
              </div>
              <button class="btn btn-outline btn-sm mt-3" style="width:100%">View Profile</button>
            </div>
          `).join('')}
        </div>
      </div>
    </section>
  `
  const wrapper = pageWrapper(content, true, [{ label: 'Home', path: '' }, { label: 'Directory' }])
  bindNav()
  return wrapper
}

// ===== ACADEMY =====
export function renderAcademy() {
  const content = `
    <div class="page-banner">
      <div class="container">
        <h1>ROBZ Academy</h1>
        <p>Learn modern farming with structured courses, videos, and certifications</p>
      </div>
    </div>
    <section class="section">
      <div class="container">
        <div class="dash-card" style="padding:2rem;margin-bottom:2rem">
          <h3 style="margin-bottom:1rem">Your Learning Progress</h3>
          ${[
            { name: 'Maize Production', progress: 80, color: 'var(--primary-500)' },
            { name: 'Financial Literacy', progress: 60, color: 'var(--accent-500)' },
            { name: 'Post-Harvest Handling', progress: 100, color: 'var(--success-500)' },
            { name: 'Agribusiness Management', progress: 40, color: 'var(--secondary-500)' },
            { name: 'Climate-Smart Agriculture', progress: 25, color: 'var(--soil-400)' }
          ].map(c => `
            <div style="margin-bottom:1rem">
              <div class="flex justify-between" style="font-size:0.875rem;margin-bottom:0.25rem">
                <span style="font-weight:600">${c.name}</span>
                <span>${c.progress}% ${c.progress === 100 ? icons.check : ''}</span>
              </div>
              <div class="progress-bar"><div class="progress-bar-fill" style="width:${c.progress}%;background:${c.color}"></div></div>
            </div>
          `).join('')}
        </div>

        <h2 style="margin-bottom:1rem">Available Courses</h2>
        <div class="grid grid-3">
          ${[
            { title: 'Maize Production Masterclass', lessons: 12, duration: '6 hours', level: 'Beginner', img: 'https://images.pexels.com/photos/13566357/pexels-photo-13566357.jpeg?auto=compress&cs=tinysrgb&h=400&w=600' },
            { title: 'Drip Irrigation Setup', lessons: 8, duration: '4 hours', level: 'Intermediate', img: 'https://images.pexels.com/photos/17765487/pexels-photo-17765487.jpeg?auto=compress&cs=tinysrgb&h=400&w=600' },
            { title: 'Poultry Farming Essentials', lessons: 15, duration: '8 hours', level: 'Beginner', img: 'https://images.pexels.com/photos/5216141/pexels-photo-5216141.jpeg?auto=compress&cs=tinysrgb&h=400&w=600' },
            { title: 'Organic Farming Practices', lessons: 10, duration: '5 hours', level: 'Intermediate', img: 'https://images.pexels.com/photos/4975357/pexels-photo-4975357.jpeg?auto=compress&cs=tinysrgb&h=400&w=600' },
            { title: 'Beekeeping for Beginners', lessons: 7, duration: '3 hours', level: 'Beginner', img: 'https://images.pexels.com/photos/14022964/pexels-photo-14022964.jpeg?auto=compress&cs=tinysrgb&h=400&w=600' },
            { title: 'Soil Science & Testing', lessons: 9, duration: '4 hours', level: 'Advanced', img: 'https://images.pexels.com/photos/12940879/pexels-photo-12940879.jpeg?auto=compress&cs=tinysrgb&h=400&w=600' }
          ].map(c => `
            <div class="blog-card" style="cursor:pointer">
              <div class="blog-card-img"><img src="${c.img}" alt="${c.title}" loading="lazy" /></div>
              <div class="blog-card-body">
                <div class="flex gap-1 mb-1">
                  <span class="badge badge-primary">${c.level}</span>
                  <span class="badge badge-neutral">${c.lessons} lessons</span>
                </div>
                <h3 style="font-size:1rem">${c.title}</h3>
                <p style="font-size:0.85rem;color:var(--neutral-500);margin-top:0.5rem">${icons.clock} ${c.duration}</p>
                <button class="btn btn-primary btn-sm mt-3" style="width:100%">Start Course</button>
              </div>
            </div>
          `).join('')}
        </div>
      </div>
    </section>
  `
  const wrapper = pageWrapper(content, true, [{ label: 'Home', path: '' }, { label: 'Academy' }])
  bindNav()
  return wrapper
}

// ===== AGRI ASSIST =====
export function renderAgriAssist() {
  const content = `
    <div class="page-banner">
      <div class="container">
        <h1>ROBZ Agri Assist</h1>
        <p>Your AI-powered agricultural assistant — answers based on your data and our knowledge base</p>
      </div>
    </div>
    <section class="section">
      <div class="container" style="max-width:800px">
        <div class="dash-card" style="padding:2rem;margin-bottom:1rem">
          <div style="display:flex;gap:1rem;align-items:flex-start">
            <div style="width:56px;height:56px;border-radius:16px;background:linear-gradient(135deg,var(--primary-500),var(--primary-700));display:flex;align-items:center;justify-content:center;color:white;flex-shrink:0;font-size:1.75rem">${icons.robot}</div>
            <div>
              <h3>ROBZ Agri Assist</h3>
              <p style="color:var(--neutral-500);font-size:0.875rem;margin-top:0.25rem">Ask me about market prices, your orders, farm planning, buyer demand, training, and more.</p>
            </div>
          </div>
        </div>

        <div id="chat-messages" style="min-height:300px;margin-bottom:1rem">
          <div class="dash-card" style="padding:1.5rem;margin-bottom:0.75rem">
            <div style="display:flex;gap:0.75rem;align-items:flex-start">
              <div style="width:36px;height:36px;border-radius:50%;background:var(--primary-100);display:flex;align-items:center;justify-content:center;flex-shrink:0">${icons.robot}</div>
              <div>
                <p style="font-size:0.9rem">Hello! I'm your ROBZ Agri Assistant. I can help you with:</p>
                <ul style="margin-top:0.5rem;padding-left:1.5rem;font-size:0.85rem;color:var(--neutral-600);line-height:1.8">
                  <li>Current market prices for crops</li>
                  <li>Finding buyers for your produce</li>
                  <li>Farm planning and input calculations</li>
                  <li>Your pending orders and payments</li>
                  <li>Agricultural training recommendations</li>
                </ul>
                <p style="font-size:0.85rem;margin-top:0.5rem">What would you like to know?</p>
              </div>
            </div>
          </div>
        </div>

        <div class="flex gap-2">
          <input type="text" id="chat-input" placeholder="Ask me anything about farming..." />
          <button class="btn btn-primary" id="chat-send">Send</button>
        </div>

        <div style="margin-top:1.5rem">
          <p style="font-size:0.8rem;color:var(--neutral-400);margin-bottom:0.5rem">Try asking:</p>
          <div class="flex gap-1 flex-wrap">
            ${['What is the maize price?', 'Find buyers for beans', 'When should I plant rice?', 'Show my pending orders', 'Find training near me'].map(q =>
              `<button class="btn btn-outline btn-sm" data-q="${q}" style="cursor:pointer">${q}</button>`
            ).join('')}
          </div>
        </div>

        <div style="margin-top:1.5rem;padding:1rem;background:var(--neutral-50);border-radius:12px;font-size:0.8rem;color:var(--neutral-500)">
          ${icons.shield} <strong>Privacy & Accuracy:</strong> Agri Assist uses your authorized data and our knowledge base. Responses are decision support, not guaranteed outcomes. Your data is never shared without permission.
        </div>
      </div>
    </section>
  `
  const wrapper = pageWrapper(content, true, [{ label: 'Home', path: '' }, { label: 'Agri Assist' }])
  setTimeout(() => {
    const responses = {
      'price': 'Current market prices: Maize \u20A6320/50kg, Rice \u20A6380/25kg, Wheat \u20A6450/50kg, Soybeans \u20A6500/50kg. Prices vary by location and quality grade.',
      'buyer': 'I found 6 active buyer demand requests on the Buyer Demand Board. The largest is XYZ Foods Ltd looking for 500 MT of Grade A Maize, delivery Oct 15-30. Would you like to see all demands?',
      'plant': 'Based on your region, the optimal planting window for rice is March-April for the main season. Prepare your nursery 3 weeks before transplanting. Need seeds? I can show you hybrid options in the marketplace.',
      'order': 'You have 3 pending orders: 1) 10 bags maize seeds (shipped), 2) Drip irrigation kit (processing), 3) 5 liters raw honey (delivered). Total pending value: \u20A6223,000.',
      'training': 'There are 6 courses available in ROBZ Academy. Based on your profile, I recommend "Maize Production Masterclass" (80% complete) and "Climate-Smart Agriculture" (25% complete). Shall I open the Academy?',
      'default': 'I can help with market prices, buyer demand, farm planning, orders, payments, and training. Could you ask about one of these topics? You can also try the suggested questions below.'
    }
    function getResponse(q) {
      const lower = q.toLowerCase()
      if (lower.includes('price')) return responses.price
      if (lower.includes('buyer') || lower.includes('sell')) return responses.buyer
      if (lower.includes('plant') || lower.includes('when')) return responses.plant
      if (lower.includes('order')) return responses.order
      if (lower.includes('train') || lower.includes('learn') || lower.includes('course')) return responses.training
      return responses.default
    }
    function sendMessage(q) {
      const chat = document.getElementById('chat-messages')
      chat.insertAdjacentHTML('beforeend', `<div class="dash-card" style="padding:1.5rem;margin-bottom:0.75rem"><div style="display:flex;gap:0.75rem;align-items:flex-start;justify-content:flex-end"><div style="text-align:right"><p style="font-size:0.9rem">${q}</p></div></div></div>`)
      setTimeout(() => {
        chat.insertAdjacentHTML('beforeend', `<div class="dash-card" style="padding:1.5rem;margin-bottom:0.75rem"><div style="display:flex;gap:0.75rem;align-items:flex-start"><div style="width:36px;height:36px;border-radius:50%;background:var(--primary-100);display:flex;align-items:center;justify-content:center;flex-shrink:0">${icons.robot}</div><div><p style="font-size:0.9rem">${getResponse(q)}</p></div></div></div>`)
        chat.scrollTop = chat.scrollHeight
      }, 500)
    }
    document.getElementById('chat-send')?.addEventListener('click', () => {
      const input = document.getElementById('chat-input')
      if (input.value.trim()) { sendMessage(input.value); input.value = '' }
    })
    document.getElementById('chat-input')?.addEventListener('keypress', e => {
      if (e.key === 'Enter') { document.getElementById('chat-send').click() }
    })
    document.querySelectorAll('[data-q]').forEach(btn => {
      btn.onclick = () => sendMessage(btn.getAttribute('data-q'))
    })
    bindNav()
  }, 100)
  return wrapper
}

// ===== CLIMATE =====
export function renderClimate() {
  const content = `
    <div class="page-banner">
      <div class="container">
        <h1>Climate-Smart Agriculture</h1>
        <p>Practices and information to build resilience against climate change</p>
      </div>
    </div>
    <section class="section">
      <div class="container">
        <div class="grid grid-3 mb-6">
          ${[
            { icon: 'sun', title: 'Climate Information', desc: 'Weather forecasts, seasonal predictions, and climate advisories for your region', img: 'https://images.pexels.com/photos/33786601/pexels-photo-33786601.jpeg?auto=compress&cs=tinysrgb&h=400&w=600' },
            { icon: 'droplet', title: 'Water Management', desc: 'Drip irrigation, rainwater harvesting, and efficient water use strategies', img: 'https://images.pexels.com/photos/17765487/pexels-photo-17765487.jpeg?auto=compress&cs=tinysrgb&h=400&w=600' },
            { icon: 'leaf', title: 'Soil Conservation', desc: 'Contour farming, mulching, cover crops, and organic matter management', img: 'https://images.pexels.com/photos/12940879/pexels-photo-12940879.jpeg?auto=compress&cs=tinysrgb&h=400&w=600' }
          ].map(c => `
            <div class="service-card">
              <div class="service-card-img"><img src="${c.img}" alt="${c.title}" loading="lazy" /></div>
              <div class="service-card-body">
                <div class="service-card-icon">${getIcon(c.icon)}</div>
                <h3>${c.title}</h3>
                <p>${c.desc}</p>
              </div>
            </div>
          `).join('')}
        </div>
        <div class="grid grid-4">
          ${[
            { icon: 'sun', title: 'Drought Preparedness', desc: 'Drought-tolerant varieties, water storage, and contingency plans' },
            { icon: 'droplet', title: 'Flood Preparedness', desc: 'Drainage systems, raised beds, and flood-resistant crops' },
            { icon: 'sprout', title: 'Sustainable Inputs', desc: 'Organic fertilizers, biopesticides, and composting' },
            { icon: 'leaf', title: 'Agroforestry', desc: 'Integrating trees with crops for multiple benefits' }
          ].map(f => `<div class="feature-item"><div class="feature-item-icon">${getIcon(f.icon)}</div><div><h4>${f.title}</h4><p>${f.desc}</p></div></div>`).join('')}
        </div>
      </div>
    </section>
  `
  const wrapper = pageWrapper(content, true, [{ label: 'Home', path: '' }, { label: 'Climate-Smart Ag' }])
  bindNav()
  return wrapper
}

// ===== WALLET =====
export function renderWallet() {
  const content = `
    <div class="page-banner">
      <div class="container">
        <h1>Transaction Center</h1>
        <p>Your wallet, payments, invoices, and financial records in one place</p>
      </div>
    </div>
    <section class="section">
      <div class="container">
        <div class="dashboard-grid mb-6">
          <div class="dash-card"><div class="dash-card-icon green">${icons.wallet}</div><h4>Wallet Balance</h4><div class="value">${formatPrice(345000)}</div><div class="sub">available</div></div>
          <div class="dash-card"><div class="dash-card-icon amber">${icons.arrowDown}</div><h4>Pending In</h4><div class="value">${formatPrice(125000)}</div><div class="sub">3 transactions</div></div>
          <div class="dash-card"><div class="dash-card-icon red">${icons.arrow}</div><h4>Pending Out</h4><div class="value">${formatPrice(45000)}</div><div class="sub">2 transactions</div></div>
          <div class="dash-card"><div class="dash-card-icon blue">${icons.chart}</div><h4>This Month</h4><div class="value">${formatPrice(890000)}</div><div class="sub">total volume</div></div>
        </div>
        <div class="dash-card" style="padding:2rem;margin-bottom:1rem">
          <h3 style="margin-bottom:1rem">Recent Transactions</h3>
          <table class="data-table">
            <thead><tr><th>Date</th><th>Description</th><th>Type</th><th>Amount</th><th>Status</th></tr></thead>
            <tbody>
              ${[
                ['Sep 24', 'Maize sale to XYZ Foods', 'Credit', '+\u20A6320,000', 'Completed'],
                ['Sep 22', 'Seed purchase - AgroSeed', 'Debit', '-\u20A628,000', 'Completed'],
                ['Sep 20', 'Fertilizer purchase', 'Debit', '-\u20A632,000', 'Completed'],
                ['Sep 18', 'Honey sale - 10L', 'Credit', '+\u20A635,000', 'Completed'],
                ['Sep 15', 'Tractor rental', 'Debit', '-\u20A615,000', 'Pending']
              ].map(r => `<tr><td>${r[0]}</td><td>${r[1]}</td><td><span class="badge ${r[2] === 'Credit' ? 'badge-success' : 'badge-error'}">${r[2]}</span></td><td style="font-weight:700">${r[3]}</td><td><span class="badge ${r[4] === 'Completed' ? 'badge-success' : 'badge-warning'}">${r[4]}</span></td></tr>`).join('')}
            </tbody>
          </table>
        </div>
        <div class="grid grid-3 mt-4">
          ${[
            { icon: 'wallet', title: 'Deposits & Withdrawals', desc: 'Add funds via bank transfer or mobile money' },
            { icon: 'file', title: 'Invoices & Receipts', desc: 'Download or share payment documents' },
            { icon: 'chart', title: 'Statements', desc: 'Monthly and seasonal financial statements' }
          ].map(f => `<div class="feature-item"><div class="feature-item-icon">${getIcon(f.icon)}</div><div><h4>${f.title}</h4><p>${f.desc}</p></div></div>`).join('')}
        </div>
      </div>
    </section>
  `
  const wrapper = pageWrapper(content, true, [{ label: 'Home', path: '' }, { label: 'Transaction Center' }])
  bindNav()
  return wrapper
}

// ===== DOCUMENTS =====
export function renderDocuments() {
  const content = `
    <div class="page-banner">
      <div class="container">
        <h1>Document Vault</h1>
        <p>All your agricultural documents, certificates, and records in one secure place</p>
      </div>
    </div>
    <section class="section">
      <div class="container">
        <div class="flex gap-2 mb-4 flex-wrap">
          <input type="text" placeholder="Search documents..." style="flex:1;min-width:200px" />
          <select style="width:auto;min-width:140px">
            <option>All Types</option>
            <option>Invoices</option>
            <option>Receipts</option>
            <option>Contracts</option>
            <option>Certificates</option>
            <option>Delivery Notes</option>
          </select>
          <button class="btn btn-primary">Search</button>
        </div>
        <div class="grid grid-4">
          ${[
            { type: 'Invoice', name: 'INV-2026-0145', date: 'Sep 24, 2026', icon: 'file' },
            { type: 'Receipt', name: 'RCP-2026-0321', date: 'Sep 22, 2026', icon: 'check' },
            { type: 'Contract', name: 'CT-2026-001', date: 'Sep 15, 2026', icon: 'clipboard' },
            { type: 'Certificate', name: 'QUAL-MZ-00125', date: 'Sep 20, 2026', icon: 'award' },
            { type: 'Delivery Note', name: 'DN-2026-0089', date: 'Sep 18, 2026', icon: 'truck' },
            { type: 'Invoice', name: 'INV-2026-0144', date: 'Sep 17, 2026', icon: 'file' },
            { type: 'Certificate', name: 'ORG-2026-0023', date: 'Sep 10, 2026', icon: 'award' },
            { type: 'Receipt', name: 'RCP-2026-0320', date: 'Sep 8, 2026', icon: 'check' }
          ].map(d => `
            <div class="dash-card" style="padding:1.5rem;text-align:center">
              <div style="font-size:2rem;margin-bottom:0.5rem;color:var(--primary-500)">${getIcon(d.icon)}</div>
              <span class="badge badge-primary" style="margin-bottom:0.5rem">${d.type}</span>
              <h4 style="font-size:0.9rem;font-family:var(--font-mono)">${d.name}</h4>
              <p style="font-size:0.75rem;color:var(--neutral-500)">${d.date}</p>
              <div class="flex gap-1 justify-center mt-3">
                <button class="btn btn-outline btn-sm">View</button>
                <button class="btn btn-ghost btn-sm">Download</button>
              </div>
            </div>
          `).join('')}
        </div>
      </div>
    </section>
  `
  const wrapper = pageWrapper(content, true, [{ label: 'Home', path: '' }, { label: 'Documents' }])
  bindNav()
  return wrapper
}

// ===== REWARDS =====
export function renderRewards() {
  const content = `
    <div class="page-banner">
      <div class="container">
        <h1>ROBZ Rewards</h1>
        <p>Earn points for farming activities and redeem for valuable benefits</p>
      </div>
    </div>
    <section class="section">
      <div class="container">
        <div class="dash-card" style="padding:2rem;text-align:center;margin-bottom:2rem;background:linear-gradient(135deg,var(--primary-600),var(--primary-800));color:white">
          <div style="font-size:3rem;font-family:var(--font-heading);font-weight:800">${icons.award}</div>
          <div style="font-size:3rem;font-family:var(--font-heading);font-weight:800;margin-top:0.5rem">2,450</div>
          <p style="color:rgba(255,255,255,0.85)">Total Points Earned</p>
          <div class="progress-bar" style="margin-top:1rem;max-width:300px;margin-left:auto;margin-right:auto;background:rgba(255,255,255,0.2)">
            <div class="progress-bar-fill" style="width:65%;background:var(--accent-400)"></div>
          </div>
          <p style="color:rgba(255,255,255,0.7);font-size:0.85rem;margin-top:0.5rem">550 points to Gold Tier</p>
        </div>
        <h2 style="margin-bottom:1rem">How to Earn Points</h2>
        <div class="grid grid-4">
          ${[
            { icon: 'users', title: 'Complete Profile', points: 100 },
            { icon: 'check', title: 'Verified Farm', points: 200 },
            { icon: 'book', title: 'Complete Training', points: 150 },
            { icon: 'clipboard', title: 'Keep Farm Records', points: 50 },
            { icon: 'store', title: 'Complete Transaction', points: 25 },
            { icon: 'users', title: 'Refer a Farmer', points: 300 },
            { icon: 'award', title: 'Get Certified', points: 500 },
            { icon: 'leaf', title: 'Sustainable Practices', points: 100 }
          ].map(r => `
            <div class="dash-card" style="padding:1.5rem;text-align:center">
              <div style="font-size:1.5rem;color:var(--primary-500);margin-bottom:0.5rem">${getIcon(r.icon)}</div>
              <h4 style="font-size:0.85rem">${r.title}</h4>
              <div style="font-family:var(--font-heading);font-weight:800;color:var(--accent-600);margin-top:0.25rem">+${r.points} pts</div>
            </div>
          `).join('')}
        </div>
        <h2 style="margin-top:2rem;margin-bottom:1rem">Available Rewards</h2>
        <div class="grid grid-3">
          ${[
            { name: 'Free Training Course', cost: 500, icon: 'book' },
            { name: '10% Input Discount', cost: 1000, icon: 'store' },
            { name: 'Free Quality Inspection', cost: 750, icon: 'flask' },
            { name: 'Priority Listing', cost: 1500, icon: 'chart' },
            { name: 'Free Delivery Voucher', cost: 800, icon: 'truck' },
            { name: 'Premium Membership (1yr)', cost: 3000, icon: 'award' }
          ].map(r => `
            <div class="dash-card" style="padding:1.5rem;text-align:center">
              <div style="font-size:2rem;color:var(--accent-500);margin-bottom:0.5rem">${getIcon(r.icon)}</div>
              <h4 style="font-size:0.95rem">${r.name}</h4>
              <div style="font-family:var(--font-heading);font-weight:800;color:var(--primary-600);margin-top:0.5rem">${r.cost} points</div>
              <button class="btn ${2500 >= r.cost ? 'btn-primary' : 'btn-ghost'} btn-sm mt-3" style="width:100%" ${2500 < r.cost ? 'disabled' : ''}>${2500 >= r.cost ? 'Redeem' : 'Not enough points'}</button>
            </div>
          `).join('')}
        </div>
      </div>
    </section>
  `
  const wrapper = pageWrapper(content, true, [{ label: 'Home', path: '' }, { label: 'Rewards' }])
  bindNav()
  return wrapper
}

// ===== USSD =====
export function renderUSSD() {
  const content = `
    <div class="page-banner">
      <div class="container">
        <h1>ROBZ USSD Platform</h1>
        <p>Access ROBZ without a smartphone — works on any mobile phone</p>
      </div>
    </div>
    <section class="section">
      <div class="container" style="max-width:700px">
        <div class="dash-card" style="padding:2rem;text-align:center;margin-bottom:2rem">
          <div style="font-size:4rem;margin-bottom:1rem">${icons.phoneMobile}</div>
          <h2>Dial *726# to Get Started</h2>
          <p style="color:var(--neutral-500);margin-top:0.5rem">No internet needed. No smartphone needed. Standard SMS rates apply.</p>
        </div>

        <div class="dash-card" style="padding:2rem;background:var(--neutral-900);color:var(--neutral-100);border-radius:20px;max-width:360px;margin:0 auto;font-family:var(--font-mono);font-size:0.85rem">
          <div style="text-align:center;margin-bottom:1rem;color:var(--neutral-400);font-size:0.75rem">ROBZ AGRI-BUSINESS</div>
          <div style="line-height:2.2">
            <div>1. Market Prices</div>
            <div>2. Sell Produce</div>
            <div>3. Buy Inputs</div>
            <div>4. My Orders</div>
            <div>5. My Payments</div>
            <div>6. My Credit</div>
            <div>7. Weather</div>
            <div>8. Farm Records</div>
            <div>9. Extension Worker</div>
            <div>0. Help</div>
          </div>
          <div style="margin-top:1rem;padding-top:1rem;border-top:1px solid var(--neutral-700);text-align:center;color:var(--neutral-400);font-size:0.75rem">Reply with option number</div>
        </div>

        <div class="grid grid-2 mt-6">
          ${[
            { icon: 'chart', title: 'Check Prices', desc: 'Get current market prices for any crop instantly' },
            { icon: 'store', title: 'Sell Produce', desc: 'List your harvest and connect with buyers' },
            { icon: 'sprout', title: 'Buy Inputs', desc: 'Order seeds and fertilizer via USSD' },
            { icon: 'wallet', title: 'Check Payments', desc: 'See your balance and recent transactions' },
            { icon: 'sun', title: 'Weather Info', desc: 'Local weather forecasts for your area' },
            { icon: 'phone', title: 'Extension Worker', desc: 'Request a call from an agricultural expert' }
          ].map(f => `<div class="feature-item"><div class="feature-item-icon">${getIcon(f.icon)}</div><div><h4>${f.title}</h4><p>${f.desc}</p></div></div>`).join('')}
        </div>
      </div>
    </section>
  `
  const wrapper = pageWrapper(content, true, [{ label: 'Home', path: '' }, { label: 'USSD' }])
  bindNav()
  return wrapper
}
