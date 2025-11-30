import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getArticles } from '../services/storageService';
import { Article } from '../types';
import SEO from '../components/SEO';

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
    <div className="space-y-10">
      <SEO 
        title="Nusantara News - Berita Terkini" 
        description="Baca berita terbaru seputar teknologi, bisnis, gaya hidup dan wisata di Indonesia."
      />

      {/* Search Bar */}
      <div className="relative max-w-lg mx-auto">
        <input
          type="text"
          placeholder="Cari berita..."
          className="w-full pl-4 pr-10 py-3 rounded-full border border-slate-200 shadow-sm focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <div className="absolute right-3 top-3 text-slate-400">
           <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
        </div>
      </div>

      {featured && !searchTerm && (
        <section className="mb-12">
          <Link to={`/article/${featured.id}`} className="group relative block rounded-2xl overflow-hidden shadow-lg aspect-video md:aspect-[21/9]">
            <img 
              src={featured.imageUrl} 
              alt={featured.title} 
              className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent flex flex-col justify-end p-6 md:p-10 text-white">
              <span className="inline-block px-3 py-1 mb-3 text-xs font-bold uppercase tracking-wider bg-red-600 rounded-sm w-fit">
                {featured.category}
              </span>
              <h2 className="text-2xl md:text-4xl font-bold mb-2 group-hover:text-red-200 transition-colors">
                {featured.title}
              </h2>
              <p className="text-slate-200 line-clamp-2 max-w-2xl text-sm md:text-lg">
                {featured.excerpt}
              </p>
            </div>
          </Link>
        </section>
      )}

      <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {(searchTerm ? filteredArticles : rest).map(article => (
          <Link key={article.id} to={`/article/${article.id}`} className="group flex flex-col h-full bg-white rounded-xl shadow-sm hover:shadow-md transition-all overflow-hidden border border-slate-100">
            <div className="relative aspect-[16/9] overflow-hidden">
              <img 
                src={article.imageUrl} 
                alt={article.title} 
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
              />
              <div className="absolute top-4 left-4">
                <span className="px-2 py-1 text-xs font-semibold bg-white/90 backdrop-blur-sm text-slate-800 rounded shadow-sm">
                  {article.category}
                </span>
              </div>
            </div>
            <div className="p-5 flex-1 flex flex-col">
              <div className="text-xs text-slate-500 mb-2 flex items-center gap-2">
                <span>{article.date}</span>
                <span>•</span>
                <span>{article.author}</span>
              </div>
              <h3 className="text-lg font-bold text-slate-900 mb-2 leading-tight group-hover:text-red-600 transition-colors">
                {article.title}
              </h3>
              <p className="text-slate-600 text-sm line-clamp-3 mb-4 flex-1">
                {article.excerpt}
              </p>
              <div className="text-red-600 text-sm font-semibold flex items-center gap-1 mt-auto">
                Baca Selengkapnya 
                <svg className="w-4 h-4 transition-transform group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </div>
            </div>
          </Link>
        ))}
      </section>

      {articles.length === 0 && (
        <div className="text-center py-20">
          <p className="text-slate-500">Belum ada artikel. Silakan tambahkan melalui panel admin.</p>
        </div>
      )}
    </div>
  );
};

export default Home;