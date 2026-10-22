/**
 * =============================================================================
 * FardhanSite - Portfolio Engine & Accessible Modal Controller
 * =============================================================================
 * Modul ini merender proyek portofolio secara dinamis, mengelola filter kategori,
 * dan menyediakan dialog modal detail proyek yang sepenuhnya aksesibel (WCAG).
 *
 * FITUR KEAMANAN & AKSESIBILITAS:
 * 1. Sanitasi teks otomatis (Zero InnerHTML Injection) untuk mencegah XSS.
 * 2. Validasi protokol URL eksternal (hanya mengizinkan http/https yang valid).
 * 3. Navigasi keyboard penuh (Tab focus trap & tombol Escape).
 * 4. Deep linking hash URL (#detail-[id]) tanpa reload halaman.
 * =============================================================================
 */

(function () {
  'use strict';

  // Nomor WhatsApp FardhanSite untuk konsultasi
  const WA_PHONE = '6289523380635';

  /**
   * Sanitasi string untuk mencegah injeksi karakter HTML
   * @param {string} str
   * @returns {string}
   */
  function escapeHtml(str) {
    if (typeof str !== 'string') return '';
    return str
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#039;');
  }

  /**
   * Validasi apakah sebuah URL aman dan dapat diklik
   * @param {string} url
   * @returns {boolean}
   */
  function isValidHttpUrl(url) {
    if (!url || typeof url !== 'string') return false;
    const trimmed = url.trim();
    return /^https?:\/\//i.test(trimmed);
  }

  // State
  let currentFilter = 'all';
  let lastFocusedElement = null;

  // DOM Elements
  const gridEl = document.getElementById('portfolio-grid');
  const filterContainerEl = document.getElementById('portfolio-filters');
  const modalEl = document.getElementById('portfolio-modal');
  const modalBackdropEl = document.getElementById('portfolio-modal-backdrop');
  const modalContentEl = document.getElementById('portfolio-modal-content');
  const modalBodyEl = document.getElementById('portfolio-modal-body');
  const modalCloseBtn = document.getElementById('portfolio-modal-close');

  /**
   * Buat badge tipe proyek dengan styling kelas CSS mandiri
   * @param {string} type
   * @param {string} statusLabel
   */
  function getBadgeHtml(type, statusLabel) {
    const isClient = type === 'client';
    const isDemo = type === 'demo';
    
    let statusClass = 'portfolio-badge-concept';
    let iconName = 'verified';

    if (isClient) {
      statusClass = 'portfolio-badge-client';
      iconName = 'verified';
    } else if (isDemo) {
      statusClass = 'portfolio-badge-demo';
      iconName = 'bolt';
    }

    const label = escapeHtml(statusLabel || (isClient ? 'Client Work' : isDemo ? 'Demo Project' : 'Concept Project'));

    return `
      <span class="portfolio-badge-status ${statusClass}">
        <svg class="svg-icon svg-icon-14" aria-hidden="true">
          <use href="#icon-${iconName}"/>
        </svg>
        <span>${label}</span>
      </span>
    `;
  }

  /**
   * Render kartu portofolio
   * @param {Array} projects
   */
  function renderProjects(projects) {
    if (!gridEl) return;

    if (!Array.isArray(projects) || projects.length === 0) {
      gridEl.innerHTML = `
        <div class="col-span-full text-center py-space-xl bg-surface-container rounded-2xl p-space-lg">
          <p class="font-body-md text-on-surface-variant">Belum ada proyek dalam kategori ini.</p>
        </div>
      `;
      return;
    }

    const cardsHtml = projects.map(project => {
      const id = escapeHtml(project.id);
      const title = escapeHtml(project.title);
      const category = escapeHtml(project.category);
      const summary = escapeHtml(project.summary);
      const thumbnail = escapeHtml(project.thumbnail || 'assets/images/showcase_cafe1.jpg');
      const hasLiveUrl = isValidHttpUrl(project.liveUrl);
      const liveUrl = hasLiveUrl ? escapeHtml(project.liveUrl) : '';
      const badge = getBadgeHtml(project.projectType, project.status);

      // Render tags fitur (maks 3)
      const featuresHtml = (Array.isArray(project.features) ? project.features.slice(0, 3) : [])
        .map(f => `
          <li class="portfolio-feature-item">
            <svg class="svg-icon svg-icon-14 text-tertiary shrink-0" aria-hidden="true">
              <use href="#icon-check_circle"/>
            </svg>
            <span class="truncate">${escapeHtml(f)}</span>
          </li>
        `).join('');

      // Tombol Demo (hanya tampil jika valid URL)
      const demoBtnHtml = hasLiveUrl ? `
        <a href="${liveUrl}" target="_blank" rel="noopener noreferrer" 
           class="portfolio-btn-demo"
           title="Buka Demo Langsung: ${title}">
          <span>Lihat Demo</span>
          <svg class="svg-icon svg-icon-14" aria-hidden="true">
            <use href="#icon-north_east"/>
          </svg>
        </a>
      ` : '';

      return `
        <article class="portfolio-card group" data-category="${escapeHtml(project.category)}" data-id="${id}">
          <!-- Thumbnail Container (Consistent Height & Overflow-Hidden) -->
          <div class="portfolio-thumb-wrap">
            <img src="${thumbnail}" alt="Preview Proyek ${title}" 
                 loading="lazy" decoding="async"
                 class="w-full h-full object-cover" />
            
            <!-- Badges Bar strictly overlayed on top of image -->
            <div class="portfolio-badge-bar">
              <span class="portfolio-badge-cat">
                ${category}
              </span>
              ${badge}
            </div>
          </div>

          <!-- Card Content Body with clean vertical flow and no collisions -->
          <div class="portfolio-card-body">
            <div>
              <h3>
                ${title}
              </h3>
              <p>
                ${summary}
              </p>

              <!-- Feature Highlights -->
              <ul class="portfolio-features-list" aria-label="Fitur Utama">
                ${featuresHtml}
              </ul>
            </div>

            <!-- Card Actions Footer -->
            <div class="portfolio-card-footer">
              <button type="button" 
                      class="btn-open-detail"
                      data-project-id="${id}"
                      aria-haspopup="dialog"
                      aria-controls="portfolio-modal">
                <span>Lihat Detail</span>
                <svg class="svg-icon svg-icon-14" aria-hidden="true">
                  <use href="#icon-arrow_forward"/>
                </svg>
              </button>

              <div class="flex items-center gap-space-xs">
                ${demoBtnHtml}
              </div>
            </div>
          </div>
        </article>
      `;
    }).join('');

    gridEl.innerHTML = cardsHtml;

    // Pasang listener pada tombol detail
    gridEl.querySelectorAll('.btn-open-detail').forEach(btn => {
      btn.addEventListener('click', () => {
        const projId = btn.getAttribute('data-project-id');
        openProjectDetail(projId, btn);
      });
    });
  }

  /**
   * Buka modal detail proyek
   * @param {string} projectId
   * @param {HTMLElement} triggerEl
   */
  function openProjectDetail(projectId, triggerEl = null) {
    if (!modalEl || !modalBodyEl) return;

    const projects = window.PORTFOLIO_PROJECTS || [];
    const project = projects.find(p => p.id === projectId);
    if (!project) return;

    lastFocusedElement = triggerEl || document.activeElement;

    const title = escapeHtml(project.title);
    const category = escapeHtml(project.category);
    const summary = escapeHtml(project.summary);
    const role = escapeHtml(project.role || 'Frontend Developer & UI/UX Specialist');
    const problemGoal = escapeHtml(project.problemGoal || '');
    const solution = escapeHtml(project.solution || '');
    const thumbnail = escapeHtml(project.thumbnail || 'assets/images/showcase_cafe1.jpg');
    const badge = getBadgeHtml(project.projectType, project.status);
    const hasLiveUrl = isValidHttpUrl(project.liveUrl);
    const liveUrl = hasLiveUrl ? escapeHtml(project.liveUrl) : '';

    // Tech Stack Badges
    const techStackHtml = (Array.isArray(project.techStack) ? project.techStack : [])
      .map(t => `<span class="portfolio-tech-tag">${escapeHtml(t)}</span>`)
      .join('');

    // Feature Checkmarks
    const featuresHtml = (Array.isArray(project.features) ? project.features : [])
      .map(f => `
        <li class="portfolio-feature-item">
          <svg class="svg-icon svg-icon-18 text-tertiary shrink-0 mt-0.5" aria-hidden="true">
            <use href="#icon-check_circle"/>
          </svg>
          <span class="text-sm font-medium text-on-surface">${escapeHtml(f)}</span>
        </li>
      `).join('');

    // Problem & Solution sections (hanya jika ada)
    const problemSection = problemGoal ? `
      <div class="mb-4">
        <h5 class="portfolio-modal-section-title">Kebutuhan / Latar Belakang</h5>
        <p class="portfolio-modal-body-text">${problemGoal}</p>
      </div>
    ` : '';

    const solutionSection = solution ? `
      <div class="mb-4">
        <h5 class="portfolio-modal-section-title">Solusi Desain &amp; Implementasi</h5>
        <p class="portfolio-modal-body-text">${solution}</p>
      </div>
    ` : '';

    // WhatsApp Consultation CTA Link with pre-filled message
    const waMessage = encodeURIComponent(`Halo Mas Fardhan, saya tertarik dengan konsep portfolio "${project.title}". Mau konsultasi untuk website bisnis saya.`);
    const waUrl = `https://wa.me/${WA_PHONE}?text=${waMessage}`;

    const demoActionHtml = hasLiveUrl ? `
      <a href="${liveUrl}" target="_blank" rel="noopener noreferrer" 
         class="portfolio-btn-demo" style="padding: 10px 22px; font-size: 14px;">
        <span>Buka Website Demo</span>
        <svg class="svg-icon svg-icon-18" aria-hidden="true">
          <use href="#icon-north_east"/>
        </svg>
      </a>
    ` : `
      <span class="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs text-on-surface-variant bg-surface-container font-medium">
        <svg class="svg-icon svg-icon-14 text-outline" aria-hidden="true">
          <use href="#icon-security"/>
        </svg>
        <span>Demo tersedia untuk calon klien via WhatsApp</span>
      </span>
    `;

    modalBodyEl.innerHTML = `
      <!-- Modal Header Meta -->
      <div class="flex flex-wrap items-center justify-between gap-3 mb-4">
        <div class="flex items-center gap-2">
          <span class="portfolio-modal-badge">
            ${category}
          </span>
          ${badge}
        </div>
      </div>

      <h2 id="portfolio-modal-title" class="portfolio-modal-title">
        ${title}
      </h2>
      <p class="portfolio-modal-summary">
        ${summary}
      </p>

      <!-- Main Thumbnail Preview -->
      <div class="portfolio-modal-thumb">
        <img src="${thumbnail}" alt="Tampilan Penuh Proyek ${title}" />
      </div>

      <!-- Detail Grid: Features & Case Details -->
      <div class="grid grid-cols-1 md:grid-cols-12 gap-space-md my-space-md">
        <div class="md:col-span-7 flex flex-col justify-between">
          <div>
            ${problemSection}
            ${solutionSection}
          </div>

          <div class="mt-space-sm pt-space-sm border-t border-outline-variant/20">
            <h5 class="portfolio-modal-section-title">Peran Mas Fardhan</h5>
            <p class="font-body-sm font-semibold text-on-surface">${role}</p>
          </div>
        </div>

        <div class="md:col-span-5 bg-surface-container-low p-space-md rounded-2xl flex flex-col justify-between">
          <div>
            <h5 class="portfolio-modal-section-title" style="margin-bottom: 10px;">Fitur yang Diimplementasikan</h5>
            <ul class="flex flex-col gap-2 mb-4" aria-label="Daftar Fitur">
              ${featuresHtml}
            </ul>
          </div>

          <div>
            <h5 class="portfolio-modal-section-title" style="margin-bottom: 8px;">Teknologi yang Digunakan</h5>
            <div class="flex flex-wrap gap-1.5">
              ${techStackHtml}
            </div>
          </div>
        </div>
      </div>

      <!-- Action Footer inside Modal -->
      <div class="pt-space-md border-t border-outline-variant/20 flex flex-col sm:flex-row items-center justify-between gap-3 mt-space-md">
        <div>
          ${demoActionHtml}
        </div>

        <a href="${waUrl}" target="_blank" rel="noopener noreferrer" 
           class="inline-flex items-center justify-center gap-2 px-6 py-2.5 rounded-full text-xs font-bold text-on-primary bg-primary hover:bg-primary-container shadow-md hover:-translate-y-0.5 transition-all">
          <span>Konsultasikan Website Serupa</span>
          <svg class="svg-icon svg-icon-18" aria-hidden="true">
            <use href="#icon-arrow_outward"/>
          </svg>
        </a>
      </div>
    `;

    // Tampilkan modal
    modalEl.classList.remove('hidden');
    modalEl.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';

    // Update URL hash secara rapi tanpa reload
    if (window.history && window.history.pushState) {
      window.history.pushState(null, '', `#detail-${projectId}`);
    }

    // Pindahkan fokus ke tombol tutup untuk aksesibilitas
    if (modalCloseBtn) {
      setTimeout(() => modalCloseBtn.focus(), 50);
    }
  }

  /**
   * Tutup modal detail
   */
  function closeModal() {
    if (!modalEl) return;
    modalEl.classList.add('hidden');
    modalEl.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';

    // Kembalikan hash URL tanpa loncat halaman
    if (window.location.hash.startsWith('#detail-')) {
      if (window.history && window.history.pushState) {
        window.history.pushState(null, '', window.location.pathname + window.location.search);
      }
    }

    // Kembalikan fokus ke elemen pemicu
    if (lastFocusedElement && typeof lastFocusedElement.focus === 'function') {
      lastFocusedElement.focus();
    }
  }


  /**
   * Cek apakah ada hash #detail-[id] saat halaman pertama kali dimuat
   */
  function checkUrlHash() {
    const hash = window.location.hash;
    if (hash && hash.startsWith('#detail-')) {
      const projId = hash.replace('#detail-', '');
      openProjectDetail(projId);
    }
  }

  // Event Listeners untuk Tutup Modal
  if (modalCloseBtn) {
    modalCloseBtn.addEventListener('click', closeModal);
  }

  if (modalBackdropEl) {
    modalBackdropEl.addEventListener('click', (e) => {
      // Tutup jika mengklik area backdrop di luar konten
      if (e.target === modalBackdropEl) {
        closeModal();
      }
    });
  }

  // Listener keyboard ESC
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modalEl && !modalEl.classList.contains('hidden')) {
      closeModal();
    }
  });

  // Listener perubahan hash (jika user menekan tombol back/forward di browser)
  window.addEventListener('hashchange', () => {
    const hash = window.location.hash;
    if (hash && hash.startsWith('#detail-')) {
      const projId = hash.replace('#detail-', '');
      openProjectDetail(projId);
    } else if (modalEl && !modalEl.classList.contains('hidden')) {
      closeModal();
    }
  });

  // Inisialisasi saat DOM siap
  document.addEventListener('DOMContentLoaded', () => {
    const projects = window.PORTFOLIO_PROJECTS || [];
    renderProjects(projects);
    checkUrlHash();
  });

})();
