import './styles.css';

type MagnetMetric = {
  id: string;
  name: string;
  product: string;
  status: 'Live' | 'Needs attention' | 'Testing';
  visitors: number;
  optIns: number;
  conversionRate: number;
  newLeads: number;
  revenue: number;
  topSource: string;
  trend: number;
};

type SourceMetric = {
  source: string;
  visitors: number;
  optIns: number;
  conversionRate: number;
};

const magnets: MagnetMetric[] = [
  {
    id: 'resolve-starter-kit',
    name: 'Resolve Starter Kit',
    product: 'RapidGrade',
    status: 'Live',
    visitors: 18420,
    optIns: 3194,
    conversionRate: 17.34,
    newLeads: 612,
    revenue: 24890,
    topSource: 'YouTube',
    trend: 8.7,
  },
  {
    id: 'color-checklist',
    name: 'Color Grade Checklist',
    product: 'Qazi Toolkit',
    status: 'Live',
    visitors: 12980,
    optIns: 1821,
    conversionRate: 14.03,
    newLeads: 344,
    revenue: 11240,
    topSource: 'Instagram',
    trend: 3.1,
  },
  {
    id: 'qazverse-preview',
    name: 'QazVerse Preview Pack',
    product: 'QazVerse',
    status: 'Testing',
    visitors: 6744,
    optIns: 805,
    conversionRate: 11.94,
    newLeads: 129,
    revenue: 8890,
    topSource: 'Email',
    trend: -2.4,
  },
  {
    id: 'client-grade-map',
    name: 'Client Grade Map',
    product: 'Freelance Colorist',
    status: 'Needs attention',
    visitors: 4288,
    optIns: 389,
    conversionRate: 9.07,
    newLeads: 78,
    revenue: 3140,
    topSource: 'QDM',
    trend: -6.8,
  },
];

const sources: SourceMetric[] = [
  { source: 'YouTube', visitors: 15880, optIns: 2710, conversionRate: 17.07 },
  { source: 'Instagram / QDM', visitors: 11240, optIns: 1672, conversionRate: 14.88 },
  { source: 'Email', visitors: 7524, optIns: 928, conversionRate: 12.33 },
  { source: 'Organic / SEO', visitors: 5420, optIns: 613, conversionRate: 11.31 },
  { source: 'Affiliate / Partners', visitors: 2368, optIns: 286, conversionRate: 12.08 },
];

const totals = magnets.reduce(
  (acc, item) => {
    acc.visitors += item.visitors;
    acc.optIns += item.optIns;
    acc.newLeads += item.newLeads;
    acc.revenue += item.revenue;
    return acc;
  },
  { visitors: 0, optIns: 0, newLeads: 0, revenue: 0 },
);

const blendedConversion = (totals.optIns / totals.visitors) * 100;
const bestMagnet = [...magnets].sort((a, b) => b.conversionRate - a.conversionRate)[0];
const needsAttention = magnets.filter((item) => item.status === 'Needs attention');

const app = document.querySelector<HTMLDivElement>('#app');
if (!app) throw new Error('Missing #app root');

app.innerHTML = `
  <main class="dashboard-shell">
    <header class="topbar">
      <div>
        <p class="eyebrow">Qazi Lead Magnet Command Center</p>
        <h1>Performance dashboard for lead magnets.</h1>
        <p class="lede">Internal view for tracking opt-ins, conversion rate, source quality, and revenue impact across active lead magnets.</p>
      </div>
      <div class="date-card" aria-label="Reporting window">
        <span>Reporting window</span>
        <strong>Last 30 days</strong>
        <small>Mock data until live backend is connected</small>
      </div>
    </header>

    <section class="metric-grid" aria-label="Key metrics">
      ${metricCard('Total visitors', formatNumber(totals.visitors), '+5.8%', 'Traffic into lead magnet pages')}
      ${metricCard('Opt-ins', formatNumber(totals.optIns), '+7.2%', 'New email captures')}
      ${metricCard('Blended CVR', `${blendedConversion.toFixed(1)}%`, '+1.4%', 'Visitor → opt-in conversion')}
      ${metricCard('Revenue influenced', formatCurrency(totals.revenue), '+9.6%', 'Downstream sales attribution')}
    </section>

    <section class="two-column">
      <article class="panel large-panel">
        <div class="panel-header">
          <div>
            <p class="eyebrow small">Funnel health</p>
            <h2>Visitor → opt-in performance</h2>
          </div>
          <span class="status-pill good">${bestMagnet.name} winning</span>
        </div>
        <div class="funnel">
          ${funnelStep('Visitors', totals.visitors, 100)}
          ${funnelStep('Opt-ins', totals.optIns, blendedConversion)}
          ${funnelStep('New leads this week', totals.newLeads, (totals.newLeads / totals.optIns) * 100)}
        </div>
      </article>

      <article class="panel">
        <div class="panel-header compact">
          <div>
            <p class="eyebrow small">Priority</p>
            <h2>Needs attention</h2>
          </div>
        </div>
        <div class="attention-list">
          ${needsAttention
            .map(
              (item) => `
                <div class="attention-item">
                  <strong>${item.name}</strong>
                  <span>${item.conversionRate.toFixed(1)}% CVR · ${item.trend.toFixed(1)}% trend</span>
                  <p>Check source-message match, CTA clarity, and thank-you page routing.</p>
                </div>
              `,
            )
            .join('') || '<p class="muted">No lead magnets need attention.</p>'}
        </div>
      </article>
    </section>

    <section class="two-column source-row">
      <article class="panel">
        <div class="panel-header compact">
          <div>
            <p class="eyebrow small">Source breakdown</p>
            <h2>Where leads are coming from</h2>
          </div>
        </div>
        <div class="source-list">
          ${sources.map(sourceRow).join('')}
        </div>
      </article>

      <article class="panel">
        <div class="panel-header compact">
          <div>
            <p class="eyebrow small">Operator notes</p>
            <h2>What this repo is for</h2>
          </div>
        </div>
        <ul class="notes-list">
          <li>Dashboard UI for internal lead magnet performance.</li>
          <li>Designed to plug into Kit, QZD/go links, Hyros, or a backend API.</li>
          <li>No customer-facing opt-in flow in this repo.</li>
          <li>Current numbers are seeded placeholders for layout review only.</li>
        </ul>
      </article>
    </section>

    <section class="panel table-panel">
      <div class="panel-header">
        <div>
          <p class="eyebrow small">Lead magnet inventory</p>
          <h2>Campaign performance table</h2>
        </div>
        <button class="ghost-btn" type="button">Export CSV</button>
      </div>
      <div class="table-wrap">
        <table>
          <thead>
            <tr>
              <th>Lead magnet</th>
              <th>Product</th>
              <th>Status</th>
              <th>Visitors</th>
              <th>Opt-ins</th>
              <th>CVR</th>
              <th>Top source</th>
              <th>Revenue</th>
              <th>Trend</th>
            </tr>
          </thead>
          <tbody>
            ${magnets.map(tableRow).join('')}
          </tbody>
        </table>
      </div>
    </section>
  </main>
`;

function metricCard(label: string, value: string, trend: string, subcopy: string) {
  return `
    <article class="metric-card">
      <span>${label}</span>
      <strong>${value}</strong>
      <div><b>${trend}</b> ${subcopy}</div>
    </article>
  `;
}

function funnelStep(label: string, value: number, percent: number) {
  return `
    <div class="funnel-step">
      <div class="funnel-copy">
        <span>${label}</span>
        <strong>${formatNumber(value)}</strong>
      </div>
      <div class="bar-track"><div class="bar-fill" style="width:${Math.max(5, Math.min(100, percent))}%"></div></div>
      <em>${percent.toFixed(1)}%</em>
    </div>
  `;
}

function sourceRow(item: SourceMetric) {
  return `
    <div class="source-item">
      <div>
        <strong>${item.source}</strong>
        <span>${formatNumber(item.visitors)} visitors · ${formatNumber(item.optIns)} opt-ins</span>
      </div>
      <b>${item.conversionRate.toFixed(1)}%</b>
    </div>
  `;
}

function tableRow(item: MagnetMetric) {
  const statusClass = item.status === 'Live' ? 'good' : item.status === 'Testing' ? 'testing' : 'warning';
  const trendClass = item.trend >= 0 ? 'up' : 'down';
  return `
    <tr>
      <td><strong>${item.name}</strong><span>${item.id}</span></td>
      <td>${item.product}</td>
      <td><span class="status-pill ${statusClass}">${item.status}</span></td>
      <td>${formatNumber(item.visitors)}</td>
      <td>${formatNumber(item.optIns)}</td>
      <td>${item.conversionRate.toFixed(1)}%</td>
      <td>${item.topSource}</td>
      <td>${formatCurrency(item.revenue)}</td>
      <td class="trend ${trendClass}">${item.trend >= 0 ? '+' : ''}${item.trend.toFixed(1)}%</td>
    </tr>
  `;
}

function formatNumber(value: number) {
  return new Intl.NumberFormat('en-US').format(value);
}

function formatCurrency(value: number) {
  return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(value);
}
