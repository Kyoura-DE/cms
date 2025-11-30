import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getArticles, deleteArticle } from '../../services/storageService';
import { Article } from '../../types';
import { IconPlus, IconEdit, IconTrash } from '../../components/Icons';

const Dashboard: React.FC = () => {
  const [articles, setArticles] = useState<Article[]>([]);
  const [refresh, setRefresh] = useState(0);

  useEffect(() => {
    setArticles(getArticles());
  }, [refresh]);

  const handleDelete = (id: string) => {
    if (window.confirm('Apakah Anda yakin ingin menghapus artikel ini?')) {
      deleteArticle(id);
      setRefresh(prev => prev + 1);
    }
  };

  return (
    <div>
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 mb-1">Dashboard Admin</h1>
          <p className="text-slate-500">Kelola semua artikel berita dari sini.</p>
        </div>
        <Link 
          to="/admin/create" 
          className="inline-flex items-center gap-2 bg-primary text-white px-4 py-2 rounded-md font-medium hover:bg-primary-hover transition-colors"
        >
          <IconPlus className="w-5 h-5" />
          Buat Artikel Baru
        </Link>
      </div>

      <div className="bg-white border border-slate-200 rounded-xl overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full border-collapse">
            <thead>
              <tr>
                <th className="bg-slate-50 p-4 text-xs font-semibold uppercase text-slate-500 border-b border-slate-200 w-[40%] text-left">Judul</th>
                <th className="bg-slate-50 p-4 text-xs font-semibold uppercase text-slate-500 border-b border-slate-200 text-left">Kategori</th>
                <th className="bg-slate-50 p-4 text-xs font-semibold uppercase text-slate-500 border-b border-slate-200 text-left">Penulis</th>
                <th className="bg-slate-50 p-4 text-xs font-semibold uppercase text-slate-500 border-b border-slate-200 text-left">Tanggal</th>
                <th className="bg-slate-50 p-4 text-xs font-semibold uppercase text-slate-500 border-b border-slate-200 text-right">Aksi</th>
              </tr>
            </thead>
            <tbody>
              {articles.map((article) => (
                <tr key={article.id} className="hover:bg-slate-50">
                  <td className="p-4 border-b border-slate-200">
                    <div className="font-medium text-slate-900 line-clamp-1" title={article.title}>{article.title}</div>
                  </td>
                  <td className="p-4 border-b border-slate-200">
                    <span className="text-xs px-2 py-1 bg-slate-100 rounded-full font-semibold text-slate-700">
                      {article.category}
                    </span>
                  </td>
                  <td className="p-4 border-b border-slate-200 text-sm text-slate-500">
                    {article.author}
                  </td>
                  <td className="p-4 border-b border-slate-200 text-sm text-slate-500">
                    {article.date}
                  </td>
                  <td className="p-4 border-b border-slate-200 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <Link to={`/admin/edit/${article.id}`} className="p-2 rounded text-slate-500 hover:bg-slate-100 hover:text-slate-900 transition-colors">
                        <IconEdit className="w-4 h-4" />
                      </Link>
                      <button 
                        onClick={() => handleDelete(article.id)}
                        className="p-2 rounded text-slate-500 hover:bg-red-50 hover:text-primary transition-colors"
                      >
                        <IconTrash className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
              {articles.length === 0 && (
                <tr>
                  <td colSpan={5} className="p-12 text-center text-slate-500">
                    Tidak ada artikel ditemukan.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;