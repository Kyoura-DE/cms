import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getArticleById } from '../services/storageService';
import { Article } from '../types';
import { IconArrowLeft } from '../components/Icons';
import SEO from '../components/SEO';

const ArticleView: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [article, setArticle] = useState<Article | undefined>(undefined);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (id) {
      const found = getArticleById(id);
      setArticle(found);
    }
    setLoading(false);
  }, [id]);

  if (loading) return <div className="text-center py-20">Memuat...</div>;
  if (!article) return <div className="text-center py-20">Artikel tidak ditemukan.</div>;

  return (
    <article className="max-w-3xl mx-auto">
      <SEO 
        title={article.title} 
        description={article.excerpt} 
        image={article.imageUrl}
        type="article"
      />
      
      <Link to="/" className="inline-flex items-center text-slate-500 hover:text-red-600 mb-6 transition-colors">
        <IconArrowLeft className="w-4 h-4 mr-2" />
        Kembali ke Beranda
      </Link>

      <header className="mb-8">
        <div className="flex items-center gap-2 mb-4">
          <span className="px-3 py-1 bg-red-50 text-red-600 rounded-full text-xs font-semibold uppercase tracking-wide">
            {article.category}
          </span>
          <span className="text-slate-400 text-xs">•</span>
          <span className="text-slate-500 text-xs font-medium">{article.date}</span>
        </div>
        <h1 className="text-3xl md:text-5xl font-bold text-slate-900 leading-tight mb-6">
          {article.title}
        </h1>
        <div className="flex items-center gap-3 border-b border-slate-100 pb-8">
          <div className="w-10 h-10 rounded-full bg-slate-200 flex items-center justify-center text-slate-500 font-bold">
            {article.author.charAt(0)}
          </div>
          <div>
            <p className="text-sm font-semibold text-slate-900">{article.author}</p>
            <p className="text-xs text-slate-500">Jurnalis Nusantara News</p>
          </div>
        </div>
      </header>

      <div className="mb-10 rounded-xl overflow-hidden shadow-sm">
        <img src={article.imageUrl} alt={article.title} className="w-full h-auto object-cover" />
      </div>

      <div className="article-body prose prose-lg prose-slate max-w-none text-slate-700 leading-relaxed whitespace-pre-wrap">
        {article.content}
      </div>
      
      <div className="mt-12 pt-8 border-t border-slate-200">
        <p className="text-center text-sm text-slate-500 italic">
          Akhir dari artikel. Terima kasih telah membaca.
        </p>
      </div>
    </article>
  );
};

export default ArticleView;