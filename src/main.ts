import './styles.css';

type Lead = {
  email: string;
  firstName?: string;
  goal?: string;
  createdAt: string;
};

const STORAGE_KEY = 'qazi-lead-magnet-signup';

const benefits = [
  'The exact shot-check order Qazi uses before touching a grade',
  'A practical node-tree starter map for faster Resolve decisions',
  'Common beginner mistakes that make grades look muddy or amateur',
];

const app = document.querySelector<HTMLDivElement>('#app');

if (!app) {
  throw new Error('Missing #app root');
}

const appRoot = app;

function savedLead(): Lead | null {
  const raw = window.localStorage.getItem(STORAGE_KEY);
  if (!raw) return null;
  try {
    return JSON.parse(raw) as Lead;
  } catch {
    window.localStorage.removeItem(STORAGE_KEY);
    return null;
  }
}

function leadMagnetUrl(): string {
  return import.meta.env.VITE_LEAD_MAGNET_URL || '#';
}

function renderSuccess(lead: Lead) {
  appRoot.innerHTML = `
    <section class="page-shell success-shell">
      <div class="success-card">
        <p class="eyebrow">You’re in</p>
        <h1>Check your inbox${lead.firstName ? `, ${escapeHtml(lead.firstName)}` : ''}.</h1>
        <p class="lede">The free color grading blueprint is queued up for <strong>${escapeHtml(lead.email)}</strong>.</p>
        <div class="next-box">
          <span class="next-label">Next step</span>
          <p>Open it, watch the first section, then use the checklist on your next grade.</p>
        </div>
        <div class="actions">
          <a class="primary-btn" href="${leadMagnetUrl()}" ${leadMagnetUrl() === '#' ? 'aria-disabled="true"' : ''}>Open the blueprint</a>
          <button class="ghost-btn" data-reset>Use another email</button>
        </div>
      </div>
    </section>
  `;

  appRoot.querySelector<HTMLButtonElement>('[data-reset]')?.addEventListener('click', () => {
    window.localStorage.removeItem(STORAGE_KEY);
    renderOptIn();
  });
}

function renderOptIn() {
  appRoot.innerHTML = `
    <section class="page-shell">
      <div class="hero-grid">
        <section class="hero-copy" aria-labelledby="page-title">
          <p class="eyebrow">Free Resolve training download</p>
          <h1 id="page-title">Get the Color Grading Blueprint before your next grade.</h1>
          <p class="lede">A clean, practical guide for building better-looking grades without guessing, overcorrecting, or stacking random nodes.</p>
          <div class="proof-row" aria-label="Included in the download">
            <span>PDF checklist</span>
            <span>Resolve workflow</span>
            <span>Beginner-safe</span>
          </div>
          <ul class="benefit-list">
            ${benefits.map((item) => `<li>${escapeHtml(item)}</li>`).join('')}
          </ul>
        </section>

        <aside class="form-card" aria-label="Download form">
          <div class="card-header">
            <span class="badge">Instant access</span>
            <h2>Send me the blueprint</h2>
            <p>No fluff. Just a focused starting point for cleaner grades.</p>
          </div>

          <form id="lead-form" novalidate>
            <label>
              First name <span>optional</span>
              <input name="firstName" autocomplete="given-name" placeholder="Waqas" />
            </label>
            <label>
              Email address
              <input name="email" type="email" autocomplete="email" placeholder="you@example.com" required />
            </label>
            <label>
              What are you trying to improve?
              <select name="goal">
                <option value="Better skin tones">Better skin tones</option>
                <option value="Cleaner contrast">Cleaner contrast</option>
                <option value="Resolve workflow">Resolve workflow</option>
                <option value="Client-ready grades">Client-ready grades</option>
              </select>
            </label>
            <p class="error" role="alert" hidden></p>
            <button class="primary-btn full" type="submit">Get the free blueprint</button>
          </form>
          <p class="privacy">We’ll only use this to send the download and relevant color grading training.</p>
        </aside>
      </div>
    </section>
  `;

  const form = appRoot.querySelector<HTMLFormElement>('#lead-form');
  const error = appRoot.querySelector<HTMLParagraphElement>('.error');

  form?.addEventListener('submit', (event) => {
    event.preventDefault();
    const data = new FormData(form);
    const email = String(data.get('email') || '').trim().toLowerCase();
    const firstName = String(data.get('firstName') || '').trim();
    const goal = String(data.get('goal') || '').trim();

    if (!isValidEmail(email)) {
      showError(error, 'Drop in a real email so we know where to send it.');
      return;
    }

    const lead: Lead = {
      email,
      firstName: firstName || undefined,
      goal: goal || undefined,
      createdAt: new Date().toISOString(),
    };

    // Placeholder persistence for first version. Swap this for Kit/ConvertKit,
    // Tally, or a serverless endpoint when the integration is approved.
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(lead));
    renderSuccess(lead);
  });
}

function isValidEmail(value: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

function showError(node: HTMLParagraphElement | null, message: string) {
  if (!node) return;
  node.textContent = message;
  node.hidden = false;
}

function escapeHtml(value: string): string {
  return value.replace(/[&<>'"]/g, (char) => {
    const entities: Record<string, string> = {
      '&': '&amp;',
      '<': '&lt;',
      '>': '&gt;',
      "'": '&#039;',
      '"': '&quot;',
    };
    return entities[char] || char;
  });
}

const existing = savedLead();
if (existing) {
  renderSuccess(existing);
} else {
  renderOptIn();
}
