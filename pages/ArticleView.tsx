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

  if (loading) return <div className="text-center py-16 text-slate-500">Memuat...</div>;
  if (!article) return <div className="text-center py-16 text-slate-500">Artikel tidak ditemukan.</div>;

  return (
    <article className="max-w-3xl mx-auto">
      <SEO 
        title={article.title} 
        description={article.excerpt} 
        image={article.imageUrl}
        type="article"
      />
      
      <Link to="/" className="inline-flex items-center gap-1 text-slate-500 hover:text-slate-900 mb-6 pl-0">
        <IconArrowLeft className="w-4 h-4" />
        Kembali ke Beranda
      </Link>

      <header className="mb-8">
        <div className="flex items-center gap-3 text-xs md:text-sm mb-4">
          <span className="bg-primary-light text-primary px-3 py-1 rounded-full font-semibold uppercase">
            {article.category}
          </span>
          <span className="text-slate-400">•</span>
          <span className="text-slate-500">{article.date}</span>
        </div>
        
        <h1 className="text-3xl md:text-5xl font-extrabold leading-tight mb-6 text-slate-900">
          {article.title}
        </h1>
        
        <div className="flex items-center gap-3 pb-8 border-b border-slate-200">
          <div className="w-10 h-10 bg-slate-200 rounded-full flex items-center justify-center font-bold text-slate-500 text-sm">
            {article.author.charAt(0)}
          </div>
          <div>
            <p className="font-semibold text-slate-900 text-sm">{article.author}</p>
            <p className="text-xs text-slate-500">Jurnalis Nusantara News</p>
          </div>
        </div>
      </header>

      <div className="rounded-xl overflow-hidden mb-10 shadow-md">
        <img src={article.imageUrl} alt={article.title} className="w-full h-auto block" />
      </div>

      <div className="font-serif text-lg leading-loose text-slate-700 whitespace-pre-wrap">
        {article.content}
      </div>
      
      <div className="mt-12 pt-8 border-t border-slate-200 text-center">
        <p className="text-sm text-slate-500 italic">
          Akhir dari artikel. Terima kasih telah membaca.
        </p>
      </div>
    </article>
  );
};

export default ArticleView;