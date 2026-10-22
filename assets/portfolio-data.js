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
    id: "kopi-senja",
    slug: "kopi-senja-specialty",
    title: "Kopi Senja Roastery & Cafe",
    category: "Specialty Coffee & Roastery",
    summary: "Konsep website coffee shop modern dengan etalase beans signature, menu minuman interaktif, dan panduan rute ke outlet fisik.",
    projectType: "concept",
    thumbnail: "assets/images/showcase_cafe1.jpg",
    screenshots: [
      "assets/images/showcase_cafe1.jpg"
    ],
    features: [
      "Katalog Biji Kopi & Tasting Notes",
      "Menu Minuman & Pastry Interaktif",
      "Integrasi Titik Lokasi & Jam Operasional",
      "Pemesanan Cepat via Tombol WhatsApp"
    ],
    liveUrl: "", // Isi dengan URL demo nyata jika sudah online (contoh: https://kopisenja.vercel.app)
    detailUrl: "#detail-kopi-senja",
    role: "Desain Antarmuka (UI/UX) & Implementasi Frontend Web",
    techStack: ["Google Antigravity", "Tailwind CSS", "Semantic HTML5", "WhatsApp API"],
    status: "Concept Project",
    problemGoal: "Kedai kopi specialty membutuhkan representasi visual online yang merefleksikan estetika hangat tempat mereka, sekaligus memudahkan pengunjung melihat varian beans dan jam operasional tanpa harus menelusuri feed media sosial yang panjang.",
    solution: "Merancang antarmuka bernuansa hangat dengan tipografi modern, kartu tasting notes yang terstruktur, integrasi Google Maps, dan tombol WhatsApp instan untuk reservasi tempat sangrai & acara komunitas."
  },
  {
    id: "bistro-aroma",
    slug: "bistro-aroma-eatery",
    title: "Bistro Aroma Casual Dining",
    category: "Casual Dining & Eatery",
    summary: "Konsep website restoran kasual dengan penyajian hidangan chef recommendations, sistem menu QR digital, dan alur booking meja.",
    projectType: "concept",
    thumbnail: "assets/images/showcase_cafe2.jpg",
    screenshots: [
      "assets/images/showcase_cafe2.jpg"
    ],
    features: [
      "Katalog Menu Makanan Utama & Dessert",
      "Desain Menu QR Siap Scan di Meja",
      "Formulir Reservasi Meja ke WhatsApp",
      "Optimasi Gambar & Loading Cepat"
    ],
    liveUrl: "", // Isi dengan URL demo nyata jika sudah online
    detailUrl: "#detail-bistro-aroma",
    role: "Desain UI/UX & Frontend Development",
    techStack: ["Google Stitch", "Vanilla JavaScript", "Tailwind CSS", "n8n Workflow"],
    status: "Concept Project",
    problemGoal: "Restoran modern menghadapi tantangan antrean reservasi akhir pekan dan kebutuhan menu digital yang higienis serta selalu up-to-date tanpa mencetak ulang buku menu fisik berkali-kali.",
    solution: "Membangun tampilan menu visual dengan pembagian kategori jelas (Appetizer, Main Course, Drinks), alur reservasi terarah yang otomatis mengisi pesan WhatsApp terformat, serta arsitektur ringan yang hemat kuota pengunjung."
  },
  {
    id: "selera-nusantara",
    slug: "selera-nusantara-resto",
    title: "Selera Nusantara Family Resto",
    category: "Family Resto & Catering",
    summary: "Konsep website restoran keluarga bernuansa tradisional-modern dengan paket hidangan katering, galeri suasana, dan kontak pemesanan cepat.",
    projectType: "concept",
    thumbnail: "assets/images/showcase_cafe3.jpg",
    screenshots: [
      "assets/images/showcase_cafe3.jpg"
    ],
    features: [
      "Pilihan Paket Katering Keluarga & Acara",
      "Galeri Foto Suasana & Area VIP Resto",
      "Daftar Menu Tradisional Unggulan",
      "Konsultasi Acara Khusus via WhatsApp"
    ],
    liveUrl: "", // Isi dengan URL demo nyata jika sudah online
    detailUrl: "#detail-selera-nusantara",
    role: "Frontend Developer & Layout Designer",
    techStack: ["Google Antigravity", "HTML5 Semantik", "Modern CSS", "WhatsApp API"],
    status: "Concept Project",
    problemGoal: "Restoran keluarga membutuhkan wadah untuk menampilkan paket prasmanan, ruang VIP keluarga, dan kemudahan bagi pelanggan korporat maupun perorangan dalam memesan paket katering.",
    solution: "Menghadirkan tata letak yang bersih dan terstruktur untuk paket-paket katering lengkap dengan detail porsi, galeri suasana tempat yang nyaman, serta call-to-action yang langsung menghubungkan klien ke admin pemesanan."
  }
];
