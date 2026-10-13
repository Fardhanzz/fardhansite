const http = require('http');
const fs = require('fs');
const path = require('path');

const PORT = process.env.PORT || 3000;

const MIME_TYPES = {
  '.html': 'text/html; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.gif': 'image/gif',
  '.svg': 'image/svg+xml',
  '.ico': 'image/x-icon',
  '.webp': 'image/webp',
  '.woff': 'font/woff',
  '.woff2': 'font/woff2',
  '.ttf': 'font/ttf',
};

const server = http.createServer((req, res) => {
  let reqUrl = decodeURI(req.url.split('?')[0]);
  if (reqUrl === '' || reqUrl === '/') reqUrl = '/index.html';

  const safePath = path.normalize(reqUrl).replace(/^(\.\.[\/\\])+/, '');
  let filePath = path.join(__dirname, safePath);

  // Jika mengarah ke direktori, arahkan ke index.html di dalamnya
  if (fs.existsSync(filePath) && fs.statSync(filePath).isDirectory()) {
    filePath = path.join(filePath, 'index.html');
  }

  // Jika tanpa ekstensi dan file tidak ada, coba tambahkan .html atau fallback ke index.html
  if (!fs.existsSync(filePath)) {
    if (fs.existsSync(filePath + '.html')) {
      filePath = filePath + '.html';
    } else if (!path.extname(filePath)) {
      // Fallback SPA routing ke index.html utama
      filePath = path.join(__dirname, 'index.html');
    }
  }

  const ext = path.extname(filePath).toLowerCase();
  const contentType = MIME_TYPES[ext] || 'application/octet-stream';

  fs.readFile(filePath, (err, content) => {
    if (err) {
      console.warn(`[404 Not Found] ${req.url} -> ${filePath}`);
      if (err.code === 'ENOENT') {
        res.writeHead(404, { 'Content-Type': 'text/html; charset=utf-8' });
        res.end(`
          <!DOCTYPE html>
          <html>
            <head><title>404 Not Found</title></head>
            <body style="font-family: sans-serif; text-align: center; padding: 50px;">
              <h1>404 - Halaman Tidak Ditemukan</h1>
              <p>Path yang diminta: <code>${req.url}</code></p>
              <p><a href="/">Kembali ke Beranda FardhanSite</a></p>
            </body>
          </html>
        `);
      } else {
        res.writeHead(500);
        res.end(`Server Error: ${err.code}`);
      }
    } else {
      res.writeHead(200, { 'Content-Type': contentType });
      res.end(content);
    }
  });
});

server.listen(PORT, () => {
  console.log(`\n======================================================`);
  console.log(`☕ FardhanSite - Freelance Cafe & Eatery Specialist`);
  console.log(`======================================================`);
  console.log(`🚀 Dev Server siap diakses di:`);
  console.log(`   👉 http://localhost:${PORT}/`);
  console.log(`======================================================\n`);
});
