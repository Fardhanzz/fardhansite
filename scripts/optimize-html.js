const fs = require('fs');
const path = require('path');

const cssPath = path.join(__dirname, '..', 'public', 'assets', 'css', 'styles.css');
const minifiedCss = fs.readFileSync(cssPath, 'utf8').trim();

function optimizeHtmlFile(filePath) {
  let rawContent = fs.readFileSync(filePath, 'utf8');
  const isCrlf = rawContent.includes('\r\n');
  let content = rawContent.replace(/\r\n/g, '\n');

  // 1. Replace the entire font/stylesheet loading in <head>
  // From after apple-touch-icon down to </head>
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

  // 2. Switch all icon images from .png to .webp for Next-Gen Image optimization
  content = content.replace('src="assets/images/logo.png" alt="F.Site Logo"', 'src="assets/images/logo.webp" alt="F.Site Logo"');
  content = content.replace('src="assets/images/google-antigravity.png"', 'src="assets/images/google-antigravity.webp"');
  content = content.replace('src="assets/images/n8n.png"', 'src="assets/images/n8n.webp"');
  content = content.replace('src="assets/images/claude.png"', 'src="assets/images/claude.webp"');
  content = content.replace('src="assets/images/gemini.png"', 'src="assets/images/gemini.webp"');
  content = content.replace('src="assets/images/whatsapp.png"', 'src="assets/images/whatsapp.webp"');
  // Also check footer logo:
  content = content.replace('src="assets/images/logo.png" alt="F.Site Logo" width="32"', 'src="assets/images/logo.webp" alt="F.Site Logo" width="32"');

  // 3. Ensure cv-auto on offscreen sections
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
