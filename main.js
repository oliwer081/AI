// main.js — UI orchestration

document.addEventListener('DOMContentLoaded', () => {

  // ── Mobile nav ──────────────────────────────────────────────
  const toggle = document.querySelector('.nav-toggle');
  const links  = document.querySelector('.nav-links');
  if (toggle && links) {
    toggle.addEventListener('click', e => { e.stopPropagation(); links.classList.toggle('open'); });
    document.addEventListener('click', () => links.classList.remove('open'));
  }

  // ── Active nav link ──────────────────────────────────────────
  const path = window.location.pathname;
  document.querySelectorAll('.nav-links a').forEach(a => {
    const href = a.getAttribute('href') || '';
    const tail = href.replace('../', '').replace('./', '');
    if (path.endsWith(tail) && tail !== '') a.classList.add('active');
    if ((path.endsWith('/') || path.endsWith('index.html')) && tail === '../index.html') a.classList.add('active');
  });

  // ── Tab switching ────────────────────────────────────────────
  document.querySelectorAll('[data-tabs]').forEach(container => {
    const group = container.dataset.tabs;
    const btns  = container.querySelectorAll('.tab-btn');
    const panels = document.querySelectorAll(`.tab-panel[data-tabs="${group}"]`);

    btns.forEach(btn => {
      btn.addEventListener('click', () => {
        btns.forEach(b => b.classList.remove('active'));
        panels.forEach(p => p.classList.remove('active'));
        btn.classList.add('active');
        const target = btn.dataset.tab;
        document.querySelector(`.tab-panel[data-tabs="${group}"][data-tab="${target}"]`)?.classList.add('active');
      });
    });
  });

  // ── Page tabs (href-based) ───────────────────────────────────
  document.querySelectorAll('.page-tab[href]').forEach(tab => {
    const hash = tab.getAttribute('href').replace('#', '');
    if (window.location.hash === '#' + hash || (!window.location.hash && tab.dataset.default)) {
      tab.classList.add('active');
    }
  });

  // ── Sidebar active state on scroll ──────────────────────────
  const sideLinks = document.querySelectorAll('.sidebar-nav a[href^="#"]');
  if (sideLinks.length) {
    const sections = [...sideLinks].map(a => document.getElementById(a.getAttribute('href').slice(1))).filter(Boolean);
    const observer = new IntersectionObserver(entries => {
      entries.forEach(e => {
        if (e.isIntersecting) {
          sideLinks.forEach(l => l.classList.remove('active'));
          const match = document.querySelector(`.sidebar-nav a[href="#${e.target.id}"]`);
          if (match) match.classList.add('active');
        }
      });
    }, { rootMargin: '-15% 0px -70% 0px', threshold: 0 });
    sections.forEach(s => observer.observe(s));
  }

  // ── Render move notation ─────────────────────────────────────
  document.querySelectorAll('[data-algo]').forEach(el => {
    el.innerHTML = renderMoves(el.dataset.algo);
  });

  // ── Render case algo text (non-decorated) ───────────────────
  document.querySelectorAll('.case-algo[data-algotext]').forEach(el => {
    el.textContent = el.dataset.algotext;
  });
});

function renderMoves(str) {
  return str.trim().split(/\s+/).map(m => {
    let cls = 'move';
    if (m.includes("'")) cls += ' prime';
    else if (/\d/.test(m) && m !== 'M' && m !== 'S' && m !== 'E') cls += ' double';
    if (/^[xyz]/.test(m)) cls += ' rotation';
    return `<span class="${cls}">${m}</span>`;
  }).join('');
}

// Expose globally
window.renderMoves = renderMoves;
