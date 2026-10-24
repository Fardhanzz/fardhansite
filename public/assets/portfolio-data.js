/**
 * =============================================================================
 * FardhanSite - Portfolio Data Source
 * =============================================================================
 * File ini adalah sumber data tunggal untuk seluruh proyek portofolio FardhanSite.
 * Untuk menambah, mengubah, atau menghapus proyek, cukup edit file ini tanpa perlu
 * menyentuh kode HTML landing page.
 *
 * PANDUAN PENGISIAN FIELD:
 * - id          : (Wajib) Identifier unik tanpa spasi, misal 'kopi-senja'.
 * - slug        : (Wajib) Identifier URL/anchor, misal 'kopi-senja-specialty'.
 * - title       : (Wajib) Nama proyek yang tampil di kartu dan modal.
 * - category    : (Wajib) Kategori bisnis (contoh: 'Specialty Coffee', 'Casual Dining', 'Family Resto').
 * - summary     : (Wajib) Ringkasan 1-2 kalimat untuk kartu portofolio.
 * - projectType : (Wajib) 'demo' | 'concept' | 'client'.
 * - thumbnail   : (Wajib) Path gambar utama, rasio landscape yang konsisten.
 * - screenshots : (Opsional) Array path gambar preview tambahan.
 * - features    : (Wajib) Daftar fitur utama yang diimplementasikan (array of strings).
 * - liveUrl     : (Opsional) URL demo publik yang aktif. Kosongkan ('') jika belum ada.
 *                 JANGAN masukkan URL dummy/palsu. Jika kosong, tombol demo disembunyikan otomatis.
 * - detailUrl   : (Opsional) Anchor detail (misal '#detail-kopi-senja').
 * - role        : (Wajib) Kontribusi nyata Mas Fardhan pada proyek.
 * - techStack   : (Wajib) Teknologi yang benar-benar digunakan (array of strings).
 * - status      : (Wajib) Label status jujur (misal 'Concept Project', 'Demo Project', 'Live Client').
 * - problemGoal : (Opsional) Latar belakang kebutuhan/tujuan proyek untuk halaman/modal detail.
 * - solution    : (Opsional) Solusi desain dan implementasi teknis yang dikerjakan.
 * =============================================================================
 */

window.PORTFOLIO_PROJECTS = [
  {
    id: "pt-atelier",
    slug: "pt-atelier-specialty-coffee",
    title: "Pt. Atelier Specialty Coffee & Roastery",
    category: "Specialty Coffee & Roastery",
    summary: "Website coffee roastery modern dengan kalkulator takaran seduh pour-over interaktif, katalog beans single origin, dan panduan kunjungan ke outlet fisik.",
    projectType: "demo",
    thumbnail: "assets/images/pt-atelier.png",
    screenshots: [
      "assets/images/pt-atelier.png"
    ],
    features: [
      "Kalkulator Kalibrasi Seduh (Pour Calibration)",
      "Katalog Biji Kopi Single Origin & Tasting Notes",
      "Navigasi Profil Roastery & Jam Operasional",
      "Integrasi Menu Digital & Rute Kunjungan"
    ],
    liveUrl: "https://demo-portfolio1-six.vercel.app/",
    detailUrl: "#detail-pt-atelier",
    role: "Desain Antarmuka (UI/UX) & Implementasi Frontend Web Responsif",
    techStack: ["Google Antigravity", "Tailwind CSS", "Interactive JavaScript", "Vercel"],
    status: "Live Demo",
    problemGoal: "Kedai kopi specialty dan roastery membutuhkan representasi digital bernuansa editorial minimalis yang mencerminkan dedikasi seduh ('deliberate craft'), dilengkapi alat kalibrasi interaktif untuk pengunjung serta kurasi biji kopi musiman.",
    solution: "Merancang antarmuka bersih dengan palet warna natural, fitur kalkulator rasio air dan takaran seduh real-time, tata letak menu terstruktur, serta tombol navigasi cepat untuk mengunjungi roastery fisik."
  },
  {
    id: "ruang-seduh",
    slug: "ruang-seduh-coffee-house",
    title: "Ruang Seduh Coffee House",
    category: "Specialty Coffee & Roastery",
    summary: "Website kedai kopi spesialti & roastery Bandung dengan kurasi single-origin Nusantara, katalog menu musiman, dan integrasi reservasi meja digital.",
    projectType: "demo",
    thumbnail: "assets/images/ruang-seduh.png",
    screenshots: [
      "assets/images/ruang-seduh.png"
    ],
    features: [
      "Katalog Kopi Single-Origin Nusantara",
      "Menu Musiman & Tasting Notes",
      "Sistem Alur Reservasi Meja Digital",
      "Panduan Jam Buka & Lokasi Citarum"
    ],
    liveUrl: "https://demo-portfolio2-five.vercel.app/",
    detailUrl: "#detail-ruang-seduh",
    role: "Desain Antarmuka (UI/UX) & Implementasi Frontend Web Responsif",
    techStack: ["Google Antigravity", "Tailwind CSS", "Playfair Display", "Vercel"],
    status: "Live Demo",
    problemGoal: "Kedai kopi spesialti di Citarum, Bandung membutuhkan website bernuansa hangat dan tenang yang mencerminkan filosofi seduh lambat, serta memudahkan reservasi meja dan eksplorasi profil kopi single-origin lokal.",
    solution: "Menghadirkan tata letak bertema arsitektural hangat dengan tipografi editorial, daftar menu musiman bergradasi visual, kurasi daerah asal biji kopi, dan tombol reservasi meja instan."
  },
  {
    id: "senja-cafe",
    slug: "senja-cafe-kitchen",
    title: "SENJA Café & Kitchen",
    category: "Artisanal Cafe & Kitchen",
    summary: "Website kafe & kitchen di Jalan Riau Bandung dengan menu sourdough oven kayu bakar, kopi single-origin Priangan, dan panduan kunjungan sanctuary.",
    projectType: "demo",
    thumbnail: "assets/images/senja-cafe.png",
    screenshots: [
      "assets/images/senja-cafe.png"
    ],
    features: [
      "Katalog Menu Hearth Bakery & Wild Sourdough",
      "Kurasi Kopi Single-Origin Priangan Kalita",
      "Agenda Komunitas & Kalender Gatherings",
      "Galeri Visual Suasana & Panduan Lokasi Riau"
    ],
    liveUrl: "https://demo-portfolio3.vercel.app/",
    detailUrl: "#detail-senja-cafe",
    role: "Desain Antarmuka (UI/UX) & Implementasi Frontend Web Responsif",
    techStack: ["Google Antigravity", "Tailwind CSS", "Semantic HTML5", "Vercel"],
    status: "Live Demo",
    problemGoal: "Kafe dan kitchen bernuansa sanctuary di Jalan Riau Bandung membutuhkan website editorial berestetika hangat yang merefleksikan konsep slow living, artisan baking, dan kenyamanan berkumpul.",
    solution: "Merancang tata letak bertema golden light dengan tipografi serif elegan, navigasi menu musiman terstruktur, galeri visual arsip suasana, serta informasi jam operasional dan lokasi yang lengkap."
  }
];
