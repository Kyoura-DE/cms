import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getArticles } from '../services/storageService';
import { Article } from '../types';
import SEO from '../components/SEO';
import { IconSearch } from '../components/Icons';

const Home: React.FC = () => {
  const [articles, setArticles] = useState<Article[]>([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    setArticles(getArticles());
  }, []);

  const filteredArticles = articles.filter(article => 
    article.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    article.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const [featured, ...rest] = filteredArticles;

  return (
    <div>
      <SEO 
        title="Nusantara News - Berita Terkini" 
        description="Baca berita terbaru seputar teknologi, bisnis, gaya hidup dan wisata di Indonesia."
      />

      {/* Search Bar */}
      <div className="relative max-w-lg mx-auto mb-10">
        <IconSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-slate-400 w-5 h-5" />
        <input
          type="text"
          placeholder="Cari berita..."
          className="w-full py-3 px-4 pl-12 rounded-full border border-slate-200 focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary-light transition-all bg-white shadow-sm"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      {/* Featured Section */}
      {featured && !searchTerm && (
        <section className="mb-12">
          <Link to={`/article/${featured.id}`} className="group relative block rounded-2xl overflow-hidden shadow-lg aspect-video md:aspect-[21/9]">
            <img 
              src={featured.imageUrl} 
              alt={featured.title} 
              className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent flex flex-col justify-end p-6 md:p-10 text-white">
              <span className="bg-primary text-white px-3 py-1 rounded text-xs font-bold uppercase w-fit mb-3">
                {featured.category}
              </span>
              <h2 className="text-2xl md:text-4xl font-bold mb-2 leading-tight">
                {featured.title}
              </h2>
              <p className="text-sm md:text-lg text-slate-200 max-w-2xl line-clamp-2">
                {featured.excerpt}
              </p>
            </div>
          </Link>
        </section>
      )}

      {/* Article Grid */}
      <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-8">
        {(searchTerm ? filteredArticles : rest).map(article => (
          <Link key={article.id} to={`/article/${article.id}`} className="group bg-white border border-slate-200 rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-all hover:-translate-y-0.5 flex flex-col h-full">
            <div className="relative aspect-video overflow-hidden">
              <img 
                src={article.imageUrl} 
                alt={article.title} 
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <span className="absolute top-4 left-4 bg-white/95 px-2 py-1 rounded text-xs font-semibold text-slate-900 shadow-sm">
                {article.category}
              </span>
            </div>
            <div className="p-5 flex flex-col flex-1">
              <div className="text-xs text-slate-500 mb-2 flex items-center gap-2">
                <span>{article.date}</span>
                <span>•</span>
                <span>{article.author}</span>
              </div>
              <h3 className="text-lg font-bold mb-2 leading-snug text-slate-900 group-hover:text-primary transition-colors">
                {article.title}
              </h3>
              <p className="text-sm text-slate-500 mb-4 line-clamp-3 flex-1">
                {article.excerpt}
              </p>
              <div className="text-sm font-semibold text-primary flex items-center gap-1 mt-auto">
                Baca Selengkapnya 
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </div>
            </div>
          </Link>
        ))}
      </section>

      {articles.length === 0 && (
        <div className="text-center py-20 text-slate-500">
          <p>Belum ada artikel. Silakan tambahkan melalui panel admin.</p>
        </div>
      )}
    </div>
  );
};

export default Home;