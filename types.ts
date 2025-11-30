export interface Article {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  author: string;
  category: ArticleCategory;
  date: string;
  imageUrl: string;
}

export enum ArticleCategory {
  TEKNOLOGI = 'Teknologi',
  BISNIS = 'Bisnis',
  POLITIK = 'Politik',
  OLAHRAGA = 'Olahraga',
  HIBURAN = 'Hiburan',
  GAYA_HIDUP = 'Gaya Hidup',
  TRAVEL = 'Travel',
  KULINER = 'Kuliner',
  KESEHATAN = 'Kesehatan',
  OTOMOTIF = 'Otomotif',
  EDUKASI = 'Edukasi',
  UMUM = 'Umum'
}

export interface GenerationRequest {
  topic: string;
  category: ArticleCategory;
}

export interface AIArticleResponse {
  title: string;
  excerpt: string;
  content: string;
}

export type ThemeMode = 'light' | 'dark';
