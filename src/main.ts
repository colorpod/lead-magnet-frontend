import './styles.css';

type SetupItem = {
  label: string;
  status: 'Ready' | 'Needs source' | 'Next';
  description: string;
};

const setupItems: SetupItem[] = [
  {
    label: 'Lead magnet inventory',
    status: 'Next',
    description: 'Add each new lead magnet, owner, funnel URL, thank-you URL, and offer path.',
  },
  {
    label: 'Traffic tracking',
    status: 'Needs source',
    description: 'Connect page views and source/UTM data from the link/router layer.',
  },
  {
    label: 'Opt-in tracking',
    status: 'Needs source',
    description: 'Connect Kit/ConvertKit forms, tags, or events for confirmed email captures.',
  },
  {
    label: 'Revenue attribution',
    status: 'Needs source',
    description: 'Connect Hyros or checkout attribution after the lead enters a sales path.',
  },
];

const app = document.querySelector<HTMLDivElement>('#app');
if (!app) throw new Error('Missing #app root');

app.innerHTML = `
  <main class="dashboard-shell">
    <header class="hero">
      <p class="eyebrow">Qazi Lead Magnet Monitor</p>
      <h1>Keep tabs on the new lead magnet system.</h1>
      <p class="lede">
        This is the internal starting point: no fake stats, no customer-facing opt-in page.
        The dashboard is ready for real data once the lead magnet backend/events are connected.
      </p>
      <div class="hero-actions">
        <a class="primary-btn" href="#setup">Start wiring data</a>
        <a class="secondary-btn" href="#inventory">View inventory shell</a>
      </div>
    </header>

    <section class="status-grid" aria-label="System status">
      ${statusCard('Lead magnets tracked', 'Not connected', 'Waiting for inventory')}
      ${statusCard('Opt-ins captured', 'Not connected', 'Waiting for form/event source')}
      ${statusCard('Top source', 'Not connected', 'Waiting for source attribution')}
      ${statusCard('Revenue impact', 'Not connected', 'Waiting for Hyros/checkout mapping')}
    </section>

    <section class="two-column" id="setup">
      <article class="panel">
        <div class="panel-header">
          <div>
            <p class="eyebrow small">Setup checklist</p>
            <h2>What needs to be connected</h2>
          </div>
          <span class="pill neutral">Starter shell</span>
        </div>
        <div class="checklist">
          ${setupItems.map(setupRow).join('')}
        </div>
      </article>

      <article class="panel">
        <div class="panel-header compact">
          <div>
            <p class="eyebrow small">Live truth</p>
            <h2>No fake numbers</h2>
          </div>
        </div>
        <div class="empty-state strong-empty">
          <strong>Dashboard waiting for real events.</strong>
          <p>
            Once the lead magnet system starts sending real events, this page should show actual views,
            opt-ins, conversion rate, source quality, and downstream revenue impact.
          </p>
        </div>
      </article>
    </section>

    <section class="panel" id="inventory">
      <div class="panel-header">
        <div>
          <p class="eyebrow small">Lead magnet inventory</p>
          <h2>Tracking shell</h2>
        </div>
        <span class="pill warning">No lead magnets added yet</span>
      </div>

      <div class="inventory-shell">
        <div class="inventory-row header-row">
          <span>Lead magnet</span>
          <span>Funnel URL</span>
          <span>Opt-in source</span>
          <span>Status</span>
          <span>Notes</span>
        </div>
        <div class="inventory-row empty-row">
          <span>Add first lead magnet</span>
          <span>—</span>
          <span>—</span>
          <span><b>Waiting</b></span>
          <span>Connect real funnel + backend events before showing metrics.</span>
        </div>
      </div>
    </section>

    <section class="panel roadmap-panel">
      <div class="panel-header compact">
        <div>
          <p class="eyebrow small">Backend contract</p>
          <h2>Minimum events this needs</h2>
        </div>
      </div>
      <div class="event-grid">
        ${eventCard('page_view', 'Lead magnet page loaded with source/UTM/referrer.')}
        ${eventCard('opt_in', 'Email captured or confirmed by form/tag provider.')}
        ${eventCard('thank_you_view', 'User reaches confirmation / delivery page.')}
        ${eventCard('revenue_match', 'Lead later maps to Hyros/order/customer revenue.')}
      </div>
    </section>
  </main>
`;

function statusCard(label: string, value: string, subcopy: string) {
  return `
    <article class="status-card">
      <span>${label}</span>
      <strong>${value}</strong>
      <p>${subcopy}</p>
    </article>
  `;
}

function setupRow(item: SetupItem) {
  const className = item.status === 'Ready' ? 'good' : item.status === 'Next' ? 'warning' : 'neutral';
  return `
    <div class="setup-row">
      <div>
        <strong>${item.label}</strong>
        <p>${item.description}</p>
      </div>
      <span class="pill ${className}">${item.status}</span>
    </div>
  `;
}

function eventCard(name: string, description: string) {
  return `
    <article class="event-card">
      <code>${name}</code>
      <p>${description}</p>
    </article>
  `;
}
