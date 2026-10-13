const fs = require('fs');
const path = require('path');

const cssPath = path.join(__dirname, '..', 'public', 'assets', 'css', 'styles.css');
const minifiedCss = fs.readFileSync(cssPath, 'utf8').trim();

function optimizeHtmlFile(filePath) {
  let rawContent = fs.readFileSync(filePath, 'utf8');
  // Detect if file uses CRLF
  const isCrlf = rawContent.includes('\r\n');
  let content = rawContent.replace(/\r\n/g, '\n');

  // 1. Google Fonts Non-blocking async loading + Inlined Critical CSS
  const headTarget = `  <!-- Fonts & Google Icons (with display=swap) -->
  <link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&amp;display=swap" rel="stylesheet"/>
  <link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@24,400,0,0&amp;display=swap" rel="stylesheet"/>

  <!-- Pre-compiled Minified Production CSS (High Performance, 0ms TBT) -->
  <link rel="stylesheet" href="assets/css/styles.css"/>`;

  const headReplacement = `  <!-- Fonts & Google Icons (Asynchronous Non-blocking Load with Fallback) -->
  <link rel="preload" as="style" href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&amp;display=swap"/>
  <link rel="preload" as="style" href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@24,400,0,0&amp;display=swap"/>
  <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&amp;display=swap" media="print" onload="this.media='all'"/>
  <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@24,400,0,0&amp;display=swap" media="print" onload="this.media='all'"/>
  <noscript>
    <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&amp;display=swap"/>
    <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@24,400,0,0&amp;display=swap"/>
  </noscript>

  <!-- Pre-compiled Production CSS: Inlined for Zero Network Delay & Instant First Paint -->
  <style id="app-styles">
${minifiedCss}
  </style>
  <link rel="preload" href="assets/css/styles.css" as="style"/>`;

  if (!content.includes(headTarget)) {
    console.error(`Error: headTarget not found in ${filePath}`);
    process.exit(1);
  }
  content = content.replace(headTarget, headReplacement);

  // 2. Offscreen sections content-visibility: auto
  content = content.replace(
    '<section class="w-full bg-[#121316] text-[#F3F4F6] py-space-section relative" id="tentang">',
    '<section class="w-full bg-[#121316] text-[#F3F4F6] py-space-section relative cv-auto" id="tentang">'
  );
  content = content.replace(
    '<section class="w-full bg-surface py-space-section relative" id="kelebihan">',
    '<section class="w-full bg-surface py-space-section relative cv-auto" id="kelebihan">'
  );
  content = content.replace(
    '<section class="w-full bg-surface-container-low py-space-section" id="harga">',
    '<section class="w-full bg-surface-container-low py-space-section cv-auto" id="harga">'
  );
  content = content.replace(
    '<section class="w-full bg-surface py-space-section relative" id="kontak">',
    '<section class="w-full bg-surface py-space-section relative cv-auto" id="kontak">'
  );
  content = content.replace(
    '<footer class="w-full bg-surface-container-lowest border-t border-outline-variant/20">',
    '<footer class="w-full bg-surface-container-lowest border-t border-outline-variant/20 cv-auto">'
  );

  // 3. Throttled Scroll Listener (requestAnimationFrame)
  const scrollTarget = `      // 4. Active Navigation Highlight based on scroll position
      const sections = document.querySelectorAll('section[id]');
      const navLinks = document.querySelectorAll('.nav-link');

      function highlightNavOnScroll() {
        const scrollY = window.pageYOffset;
        sections.forEach(current => {
          const sectionHeight = current.offsetHeight;
          const sectionTop = current.offsetTop - 120;
          const sectionId = current.getAttribute('id');
          if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
            navLinks.forEach(link => {
              if (link.getAttribute('data-section') === sectionId) {
                link.classList.add('bg-surface-container-high', 'text-on-surface', 'font-semibold');
                link.classList.remove('text-on-surface-variant');
              } else {
                link.classList.remove('bg-surface-container-high', 'font-semibold');
                link.classList.add('text-on-surface-variant');
              }
            });
          }
        });
      }
      window.addEventListener('scroll', highlightNavOnScroll, { passive: true });

      // 5. Back to Top Button visibility & click
      const backToTopBtn = document.getElementById('back-to-top');
      if (backToTopBtn) {
        window.addEventListener('scroll', () => {
          if (window.pageYOffset > 400) {
            backToTopBtn.classList.remove('opacity-0', 'translate-y-4', 'pointer-events-none');
            backToTopBtn.classList.add('opacity-100', 'translate-y-0');
          } else {
            backToTopBtn.classList.add('opacity-0', 'translate-y-4', 'pointer-events-none');
            backToTopBtn.classList.remove('opacity-100', 'translate-y-0');
          }
        }, { passive: true });

        backToTopBtn.addEventListener('click', () => {
          window.scrollTo({ top: 0, behavior: 'smooth' });
        });
      }`;

  const scrollReplacement = `      // 4. Active Navigation & Back to Top (Throttled with requestAnimationFrame for 60fps mobile performance)
      const sections = document.querySelectorAll('section[id]');
      const navLinks = document.querySelectorAll('.nav-link');
      const backToTopBtn = document.getElementById('back-to-top');

      let isScrollTicking = false;
      function handleOptimizedScroll() {
        const scrollY = window.pageYOffset || window.scrollY || 0;

        // Navigation active link detection
        sections.forEach(current => {
          const sectionHeight = current.offsetHeight;
          const sectionTop = current.offsetTop - 120;
          const sectionId = current.getAttribute('id');
          if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
            navLinks.forEach(link => {
              if (link.getAttribute('data-section') === sectionId) {
                link.classList.add('bg-surface-container-high', 'text-on-surface', 'font-semibold');
                link.classList.remove('text-on-surface-variant');
              } else {
                link.classList.remove('bg-surface-container-high', 'font-semibold');
                link.classList.add('text-on-surface-variant');
              }
            });
          }
        });

        // Back to top button visibility
        if (backToTopBtn) {
          if (scrollY > 400) {
            backToTopBtn.classList.remove('opacity-0', 'translate-y-4', 'pointer-events-none');
            backToTopBtn.classList.add('opacity-100', 'translate-y-0');
          } else {
            backToTopBtn.classList.add('opacity-0', 'translate-y-4', 'pointer-events-none');
            backToTopBtn.classList.remove('opacity-100', 'translate-y-0');
          }
        }

        isScrollTicking = false;
      }

      window.addEventListener('scroll', () => {
        if (!isScrollTicking) {
          isScrollTicking = true;
          window.requestAnimationFrame(handleOptimizedScroll);
        }
      }, { passive: true });

      if (backToTopBtn) {
        backToTopBtn.addEventListener('click', () => {
          window.scrollTo({ top: 0, behavior: 'smooth' });
        });
      }`;

  if (!content.includes(scrollTarget)) {
    console.error(`Error: scrollTarget not found in ${filePath}`);
    process.exit(1);
  }
  content = content.replace(scrollTarget, scrollReplacement);

  if (isCrlf) {
    content = content.replace(/\n/g, '\r\n');
  }

  fs.writeFileSync(filePath, content, 'utf8');
  console.log(`Successfully optimized: ${filePath}`);
}

const rootIndex = path.join(__dirname, '..', 'index.html');
const publicIndex = path.join(__dirname, '..', 'public', 'index.html');

optimizeHtmlFile(rootIndex);
optimizeHtmlFile(publicIndex);
