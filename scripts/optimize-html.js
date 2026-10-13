const fs = require('fs');
const path = require('path');

const cssPath = path.join(__dirname, '..', 'public', 'assets', 'css', 'styles.css');
const minifiedCss = fs.readFileSync(cssPath, 'utf8').trim();

function optimizeHtmlFile(filePath) {
  let rawContent = fs.readFileSync(filePath, 'utf8');
  const isCrlf = rawContent.includes('\r\n');
  let content = rawContent.replace(/\r\n/g, '\n');

  // Regex to match anything between preconnect and </head>
  const headPattern = /<!-- Preconnect to Font Origins for Faster First Paint -->[\s\S]*?<\/head>/;

  const newHeadContent = `<!-- Preconnect to Font Origins for Faster First Paint -->
  <link rel="preconnect" href="https://fonts.googleapis.com"/>
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin/>

  <!-- Fonts & Google Icons: Combined in 1 Single Optimized Request with display=swap -->
  <link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;600;700;800&amp;family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@24,400,0,0&amp;display=swap" rel="stylesheet"/>

  <!-- Pre-compiled Production CSS: Inlined for Zero Network Delay & Instant First Paint -->
  <style id="app-styles">
${minifiedCss}
  </style>
</head>`;

  if (!headPattern.test(content)) {
    console.error(`Error: headPattern not found in ${filePath}`);
    process.exit(1);
  }

  content = content.replace(headPattern, newHeadContent);

  // Ensure cv-auto on offscreen sections
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
