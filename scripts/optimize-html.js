const fs = require('fs');
const path = require('path');

const cssPath = path.join(__dirname, '..', 'public', 'assets', 'css', 'styles.css');
const minifiedCss = fs.readFileSync(cssPath, 'utf8').trim();

const svgIcons = {
  arrow_outward: 'M6.4 18L5 16.6L14.6 7H6V5h12v12h-2V8.4L6.4 18Z',
  north_east: 'M9 5v2h6.59L4 18.59 5.41 20 17 8.41V15h2V5H9Z',
  arrow_downward: 'M11 4v12.17l-5.59-5.59L4 12l8 8 8-8-1.41-1.41L13 16.17V4h-2Z',
  arrow_forward: 'm12 4-1.41 1.41L16.17 11H4v2h12.17l-5.58 5.59L12 20l8-8-8-8Z',
  keyboard_arrow_up: 'M7.41 15.41 12 10.83l4.59 4.58L18 14l-6-6-6 6 1.41 1.41Z',
  person: 'M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z',
  menu: 'M3 18h18v-2H3v2zm0-5h18v-2H3v2zm0-7v2h18V6H3z',
  close: 'M19 6.41 17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12 19 6.41Z',
  qr_code_2: 'M3 11h8V3H3v8zm2-6h4v4H5V5zM3 21h8v-8H3v8zm2-6h4v4H5v-4zm8-12v8h8V3h-8zm6 6h-4V5h4v4zm0 10h2v2h-2zm-6-6h2v2h-2zm2 2h2v2h-2zm-2 2h2v2h-2zm2 2h2v2h-2zm2-2h2v2h-2zm0-4h2v2h-2zm2 2h2v2h-2z',
  chat: 'M20 2H4c-1.1 0-1.99.9-1.99 2L2 22l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zM6 9h12v2H6V9zm8 5H6v-2h8v2zm4-6H6V6h12v2z',
  storefront: 'm21.9 8.89-.95-4.27A2.008 2.008 0 0 0 18.99 3H5a2 2 0 0 0-1.95 1.62l-.95 4.27A1.97 1.97 0 0 0 2 10v1a2 2 0 0 0 2 2v6c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2v-6c1.1 0 2-.9 2-2v-1c0-.4-.12-.77-.1-1.11zM18 19H6v-6h12v6zm2-8H4v-1l.95-4.28c.09-.4.44-.72.85-.72h12.4c.41 0 .76.32.85.72L20 10v1z',
  restaurant_menu: 'M8.1 13.34l2.83-2.83L3.91 3.5c-1.56 1.56-1.56 4.09 0 5.66l4.19 4.18zm6.78-1.81c1.53.71 3.68.21 5.27-1.38 1.91-1.91 2.28-4.65.81-6.12-1.46-1.46-4.2-1.1-6.12.81-1.59 1.59-2.09 3.74-1.38 5.27L3.7 19.87l1.41 1.41 9.77-9.75zm0 0L20.47 17l-1.41 1.41-5.59-5.59 1.41-1.29z',
  event_seat: 'M4 18v3h3v-3h10v3h3v-3c1.1 0 2-.9 2-2V9c0-1.1-.9-2-2-2V4c0-.55-.45-1-1-1H5c-.55 0-1 .45-1 1v3c-1.1 0-2 .9-2 2v7c0 1.1.9 2 2 2zM6 5h12v2H6V5zm-2 6h16v5H4v-5z',
  coffee: 'M18.5 3H6c-1.1 0-2 .9-2 2v5.71c0 3.83 2.95 7.18 6.78 7.29 4.01.11 7.22-3.1 7.22-7.09V9h.5c2.48 0 4.5-2.02 4.5-4.5S20.98 3 18.5 3zm0 4H18V5h.5c1.38 0 2.5 1.12 2.5 2.5S19.88 7 18.5 7zM4 19h16v2H4z',
  timer: 'M15 1H9v2h6V1zm-4 13h2V8h-2v6zm8.03-6.61l1.42-1.42c-.43-.51-.9-.99-1.41-1.41l-1.42 1.42A8.962 8.962 0 0 0 12 4c-4.97 0-9 4.03-9 9s4.02 9 9 9 9-4.03 9-9c0-2.12-.74-4.07-1.97-5.61zM12 20c-3.87 0-7-3.13-7-7s3.13-7 7-7 7 3.13 7 7-3.13 7-7 7z',
  security: 'M12 1 3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4zm0 10.99h7c-.53 4.12-3.28 7.79-7 8.94V12H5V6.3l7-3.11v8.8z',
  location_on: 'M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z',
  support_agent: 'M21 12.22C21 6.73 16.74 3 12 3c-4.69 0-9 3.65-9 9.28-.6.34-1 .98-1 1.72v2c0 1.1.9 2 2 2h1v-6.1c0-3.87 3.13-7 7-7s7 3.13 7 7V19h-8v2h8c1.1 0 2-.9 2-2v-1.22c.59-.31 1-.92 1-1.64v-2.3c0-.7-.41-1.31-1-1.62zM9 13c.55 0 1 .45 1 1s-.45 1-1 1-1-.45-1-1 .45-1 1-1zm6 0c.55 0 1 .45 1 1s-.45 1-1 1-1-.45-1-1 .45-1 1-1z',
  check_circle: 'M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z',
  star: 'M12 17.27 18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z',
  verified: 'm23 12-2.44-2.79.34-3.69-3.61-.82-1.89-3.2L12 2.96 8.6 1.5 6.71 4.69 3.1 5.5l.34 3.7L1 12l2.44 2.79-.34 3.7 3.61.82L8.6 22.5l3.4-1.47 3.4 1.46 1.89-3.19 3.61-.82-.34-3.69L23 12zm-12.91 4.72-3.8-3.81 1.48-1.48 2.32 2.33 5.85-5.87 1.48 1.48-7.33 7.35z',
  edit_note: 'M3 10h11v2H3v-2zm0-2h11v2H3V8zm0-2h11v2H3V6zm11.77 10.17 1.41-1.41 4.24 4.24-1.41 1.41-4.24-4.24zm6.36-6.36c.39-.39 1.02-.39 1.41 0l1.41 1.41c.39.39.39 1.02 0 1.41l-1.41 1.41-2.83-2.83 1.42-1.4zM13 19.12V22h2.88l8.13-8.13-2.88-2.88L13 19.12z',
  send: 'M2.01 21 23 12 2.01 3 2 10l15 2-15 2z',
  bolt: 'M11 21h-1l1-7H7.5c-.88 0-.33-.75-.31-.78C8.48 10.94 10.42 7.54 13 3h1l-1 7h3.5c.49 0 .56.33.47.51l-.07.15C12.96 17.55 11 21 11 21z'
};

const spriteSvg = `  <!-- SVG Sprite Definitions (Zero Network Requests, 100% Crisp Vector, Eliminates 316KB Google Font) -->
  <svg xmlns="http://www.w3.org/2000/svg" style="display:none" aria-hidden="true">
    <defs>
${Object.entries(svgIcons).map(([id, d]) => `      <symbol id="icon-${id}" viewBox="0 0 24 24"><path d="${d}"/></symbol>`).join('\n')}
    </defs>
  </svg>`;

function optimizeHtmlFile(filePath) {
  let rawContent = fs.readFileSync(filePath, 'utf8');
  const isCrlf = rawContent.includes('\r\n');
  let content = rawContent.replace(/\r\n/g, '\n');

  // 1. Replace the entire font/stylesheet loading in <head>
  const headPattern = /<!-- Preconnect[\s\S]*?<\/head>/;
  const newHeadContent = `<!-- Preconnect & Preload Primary Font for Instant Paint (Zero Render-Blocking) -->
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin/>
  <link rel="preload" href="https://fonts.gstatic.com/s/plusjakartasans/v12/LDIoaomQNQcsA88c7O9yZ4KMCoOg4Ko20yw.woff2" as="font" type="font/woff2" crossorigin/>

  <!-- Pre-compiled Production CSS with Inlined @font-face: Zero Network Delay & Instant First Paint -->
  <style id="app-styles">
${minifiedCss}
  </style>
</head>`;

  if (!headPattern.test(content)) {
    console.error(`Error: headPattern not found in ${filePath}`);
    process.exit(1);
  }
  content = content.replace(headPattern, newHeadContent);

  // 2. Insert SVG Sprite right after <body ...>
  // Remove any previously inserted SVG sprite first to prevent duplicates
  content = content.replace(/\s*<!-- SVG Sprite Definitions[\s\S]*?<\/svg>/, '');
  const bodyPattern = /(<body[^>]*>)/;
  content = content.replace(bodyPattern, `$1\n\n${spriteSvg}`);

  // 3. Convert all Material Symbols <span> to <svg> symbol references
  let replacedCount = 0;
  content = content.replace(/<span\s+([^>]*class="[^"]*material-symbols-outlined[^"]*"[^>]*)>([^<]+)<\/span>/g, (match, attrs, iconName) => {
    iconName = iconName.trim();
    if (!svgIcons[iconName]) {
      console.warn(`Warning: Unknown icon "${iconName}" in ${filePath}`);
      return match;
    }
    replacedCount++;

    // Extract classes
    let classMatch = attrs.match(/class="([^"]*)"/);
    let otherAttrs = attrs.replace(/class="[^"]*"/, '').trim();
    let classes = classMatch ? classMatch[1] : '';

    // Remove material-symbols-outlined
    classes = classes.replace(/material-symbols-outlined/g, '').trim();

    // Size mapping
    let sizeClass = 'svg-icon-24';
    const sizeMatch = classes.match(/text-\[(\d+)px\]/);
    if (sizeMatch) {
      const px = sizeMatch[1];
      sizeClass = `svg-icon-${px}`;
      classes = classes.replace(/text-\[\d+px\]/g, '').trim();
    }

    // Combine classes
    const finalClass = `svg-icon ${sizeClass} ${classes}`.replace(/\s+/g, ' ').trim();
    const attrStr = otherAttrs ? ` ${otherAttrs}` : '';

    return `<svg class="${finalClass}" aria-hidden="true"${attrStr}><use href="#icon-${iconName}"/></svg>`;
  });
  console.log(`[${path.basename(filePath)}] Converted ${replacedCount} Material Symbols spans to native SVG icons.`);

  // 4. Update Mobile Menu Toggle JS to support SVG use element
  const oldMobileMenuJs = `      // 2. Mobile Menu Toggle
      const mobileToggle = document.getElementById('mobile-menu-toggle');
      const mobileMenu = document.getElementById('mobile-menu');
      const mobileMenuIcon = document.getElementById('mobile-menu-icon');

      if (mobileToggle && mobileMenu) {
        mobileToggle.addEventListener('click', () => {
          const isHidden = mobileMenu.classList.contains('hidden');
          if (isHidden) {
            mobileMenu.classList.remove('hidden');
            if (mobileMenuIcon) mobileMenuIcon.textContent = 'close';
          } else {
            mobileMenu.classList.add('hidden');
            if (mobileMenuIcon) mobileMenuIcon.textContent = 'menu';
          }
        });

        // Close mobile menu on clicking any link
        document.querySelectorAll('.mobile-nav-link').forEach(link => {
          link.addEventListener('click', () => {
            mobileMenu.classList.add('hidden');
            if (mobileMenuIcon) mobileMenuIcon.textContent = 'menu';
          });
        });
      }`;

  const newMobileMenuJs = `      // 2. Mobile Menu Toggle
      const mobileToggle = document.getElementById('mobile-menu-toggle');
      const mobileMenu = document.getElementById('mobile-menu');
      const mobileMenuIcon = document.getElementById('mobile-menu-icon');

      function updateMobileMenuIcon(iconName) {
        if (!mobileMenuIcon) return;
        const useEl = mobileMenuIcon.querySelector('use');
        if (useEl) {
          useEl.setAttribute('href', '#icon-' + iconName);
        } else {
          mobileMenuIcon.textContent = iconName;
        }
      }

      if (mobileToggle && mobileMenu) {
        mobileToggle.addEventListener('click', () => {
          const isHidden = mobileMenu.classList.contains('hidden');
          if (isHidden) {
            mobileMenu.classList.remove('hidden');
            updateMobileMenuIcon('close');
          } else {
            mobileMenu.classList.add('hidden');
            updateMobileMenuIcon('menu');
          }
        });

        // Close mobile menu on clicking any link
        document.querySelectorAll('.mobile-nav-link').forEach(link => {
          link.addEventListener('click', () => {
            mobileMenu.classList.add('hidden');
            updateMobileMenuIcon('menu');
          });
        });
      }`;

  if (content.includes(oldMobileMenuJs)) {
    content = content.replace(oldMobileMenuJs, newMobileMenuJs);
  } else if (!content.includes('updateMobileMenuIcon')) {
    console.warn(`Notice: oldMobileMenuJs pattern not found exactly in ${filePath}`);
  }

  // 5. Switch all icon images from .png to .webp
  content = content.replace(/src="assets\/images\/logo\.png"/g, 'src="assets/images/logo.webp"');
  content = content.replace(/src="assets\/images\/google-antigravity\.png"/g, 'src="assets/images/google-antigravity.webp"');
  content = content.replace(/src="assets\/images\/n8n\.png"/g, 'src="assets/images/n8n.webp"');
  content = content.replace(/src="assets\/images\/claude\.png"/g, 'src="assets/images/claude.webp"');
  content = content.replace(/src="assets\/images\/gemini\.png"/g, 'src="assets/images/gemini.webp"');
  content = content.replace(/src="assets\/images\/whatsapp\.png"/g, 'src="assets/images/whatsapp.webp"');

  // 6. Ensure cv-auto on offscreen sections
  const sectionsToOptimize = [
    ['<section class="w-full bg-[#121316] text-[#F3F4F6] py-space-section relative" id="tentang">', '<section class="w-full bg-[#121316] text-[#F3F4F6] py-space-section relative cv-auto" id="tentang">'],
    ['<section class="w-full bg-surface py-space-section relative" id="kelebihan">', '<section class="w-full bg-surface py-space-section relative cv-auto" id="kelebihan">'],
    ['<section class="w-full bg-surface-container-low py-space-section" id="harga">', '<section class="w-full bg-surface-container-low py-space-section cv-auto" id="harga">'],
    ['<section class="w-full bg-surface py-space-section relative" id="kontak">', '<section class="w-full bg-surface py-space-section relative cv-auto" id="kontak">'],
    ['<footer class="w-full bg-surface-container-lowest border-t border-outline-variant/20">', '<footer class="w-full bg-surface-container-lowest border-t border-outline-variant/20 cv-auto">']
  ];

  for (const [target, replacement] of sectionsToOptimize) {
    if (content.includes(target)) {
      content = content.replace(target, replacement);
    }
  }

  if (isCrlf) {
    content = content.replace(/\n/g, '\r\n');
  }

  fs.writeFileSync(filePath, content, 'utf8');
  console.log(`Successfully updated: ${filePath}`);
}

const rootIndex = path.join(__dirname, '..', 'index.html');
const publicIndex = path.join(__dirname, '..', 'public', 'index.html');

optimizeHtmlFile(rootIndex);
optimizeHtmlFile(publicIndex);
