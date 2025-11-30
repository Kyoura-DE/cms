import { Article, ArticleCategory } from './types';

export const INITIAL_ARTICLES: Article[] = [
  {
    id: '1',
    title: 'Masa Depan AI di Indonesia: Peluang dan Tantangan',
    excerpt: 'Bagaimana kecerdasan buatan membentuk ulang lanskap industri teknologi di nusantara.',
    content: `Kecerdasan Buatan (AI) telah menjadi topik hangat di seluruh dunia, tidak terkecuali di Indonesia. Dengan populasi digital yang terus berkembang, adopsi teknologi ini menjanjikan efisiensi yang belum pernah terjadi sebelumnya di berbagai sektor.

Mulai dari layanan pelanggan otomatis hingga analisis data besar untuk pertanian, AI mulai menunjukkan dampaknya. Startup lokal berlomba-lomba mengintegrasikan model bahasa besar untuk melayani kebutuhan pasar lokal yang unik.

Namun, tantangan infrastruktur dan kesenjangan talenta digital masih menjadi hambatan utama. Pemerintah dan sektor swasta perlu bersinergi untuk memastikan Indonesia tidak hanya menjadi konsumen, tetapi juga pemain kunci dalam revolusi AI global ini.`,
    author: 'Budi Santoso',
    category: ArticleCategory.TEKNOLOGI,
    date: '2023-10-25',
    imageUrl: 'https://picsum.photos/seed/tech/800/600'
  },
  {
    id: '2',
    title: 'Pesona Tersembunyi Labuan Bajo',
    excerpt: 'Menjelajahi keindahan alam Flores yang memukau mata dunia.',
    content: `Labuan Bajo bukan lagi sekadar pelabuhan kecil di ujung barat Flores. Kini, ia telah menjelma menjadi gerbang menuju surga dunia. Taman Nasional Komodo, dengan kadal purbanya yang ikonik, hanyalah awal dari petualangan.

Pulau Padar menawarkan pemandangan tiga pantai berwarna berbeda yang surealis. Pink Beach memanjakan mata dengan pasir merah mudanya yang langka. Bawah lautnya? Salah satu yang terbaik di dunia, rumah bagi manta ray raksasa dan terumbu karang yang sehat.

Pembangunan infrastruktur yang masif telah membuat akses ke sini semakin mudah, menjadikan Labuan Bajo destinasi wajib bagi para pelancong yang mencari pengalaman tak terlupakan.`,
    author: 'Siti Aminah',
    category: ArticleCategory.TRAVEL,
    date: '2023-10-28',
    imageUrl: 'https://picsum.photos/seed/travel/800/600'
  },
  {
    id: '3',
    title: 'Strategi UMKM Go Digital 2024',
    excerpt: 'Langkah praktis bagi pelaku usaha mikro untuk menembus pasar digital.',
    content: `Digitalisasi bukan lagi pilihan, melainkan keharusan bagi UMKM untuk bertahan dan berkembang. Tahun 2024 diprediksi akan menjadi tahun di mana perdagangan sosial (social commerce) semakin mendominasi.

Pelaku UMKM perlu memahami pentingnya kehadiran digital, bukan hanya sekadar memiliki akun media sosial, tetapi membangun interaksi yang bermakna dengan pelanggan. Penggunaan data sederhana untuk memahami preferensi konsumen akan menjadi kunci kemenangan.

Selain itu, adopsi sistem pembayaran digital (QRIS) yang semakin luas memudahkan transaksi. Saatnya UMKM Indonesia naik kelas dengan memanfaatkan teknologi yang ada.`,
    author: 'Reza Rahardian',
    category: ArticleCategory.BISNIS,
    date: '2023-11-01',
    imageUrl: 'https://picsum.photos/seed/business/800/600'
  }
];

export const STORAGE_KEY = 'nusantara_articles_v1';
