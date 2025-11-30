import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { getArticleById, saveArticle } from '../../services/storageService';
import { generateArticleDraft } from '../../services/geminiService';
import { Article, ArticleCategory } from '../../types';
import { IconSparkles, IconArrowLeft } from '../../components/Icons';

const Editor: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const isEditing = !!id;

  const [formData, setFormData] = useState<Article>({
    id: Date.now().toString(),
    title: '',
    content: '',
    excerpt: '',
    author: 'Admin',
    category: ArticleCategory.TEKNOLOGI,
    date: new Date().toISOString().split('T')[0],
    imageUrl: `https://picsum.photos/seed/${Date.now()}/800/600`
  });

  const [aiLoading, setAiLoading] = useState(false);
  const [aiPrompt, setAiPrompt] = useState('');

  useEffect(() => {
    if (isEditing && id) {
      const existing = getArticleById(id);
      if (existing) {
        setFormData(existing);
      } else {
        alert('Artikel tidak ditemukan');
        navigate('/admin');
      }
    }
  }, [isEditing, id, navigate]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    saveArticle(formData);
    navigate('/admin');
  };

  const handleGenerateAI = async (isRandom: boolean = false) => {
    if (!isRandom && !aiPrompt) return alert("Masukkan topik artikel terlebih dahulu");
    
    setAiLoading(true);
    try {
      // Jika isRandom true, kita kirim string kosong sebagai topic, service akan menanganinya
      const topicToSend = isRandom ? "" : aiPrompt;
      const draft = await generateArticleDraft(topicToSend, formData.category);
      setFormData(prev => ({
        ...prev,
        ...draft,
        // Keep author and date if already set, or default
        id: prev.id 
      }));
    } catch (error) {
      alert("Gagal menghasilkan konten. Pastikan API Key valid atau coba lagi nanti.");
    } finally {
      setAiLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto pb-20">
      <button 
        onClick={() => navigate('/admin')} 
        className="inline-flex items-center text-slate-500 hover:text-slate-900 mb-6"
      >
        <IconArrowLeft className="w-4 h-4 mr-2" />
        Kembali ke Dashboard
      </button>

      <h1 className="text-2xl font-bold text-slate-900 mb-8">
        {isEditing ? 'Edit Artikel' : 'Buat Artikel Baru'}
      </h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Form */}
        <div className="lg:col-span-2 space-y-6">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Judul Artikel</label>
              <input
                type="text"
                name="title"
                required
                value={formData.title}
                onChange={handleChange}
                className="w-full px-4 py-2 rounded-lg border border-slate-300 focus:ring-2 focus:ring-red-500 focus:border-transparent outline-none"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Kategori</label>
                <select
                  name="category"
                  value={formData.category}
                  onChange={handleChange}
                  className="w-full px-4 py-2 rounded-lg border border-slate-300 focus:ring-2 focus:ring-red-500 outline-none"
                >
                  {Object.values(ArticleCategory).map(cat => (
                    <option key={cat} value={cat}>{cat}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Penulis</label>
                <input
                  type="text"
                  name="author"
                  required
                  value={formData.author}
                  onChange={handleChange}
                  className="w-full px-4 py-2 rounded-lg border border-slate-300 focus:ring-2 focus:ring-red-500 outline-none"
                />
              </div>
            </div>

             <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">URL Gambar Header</label>
              <input
                type="text"
                name="imageUrl"
                value={formData.imageUrl}
                onChange={handleChange}
                className="w-full px-4 py-2 rounded-lg border border-slate-300 focus:ring-2 focus:ring-red-500 outline-none text-sm text-slate-600"
              />
              <p className="mt-1 text-xs text-slate-400">Default: Menggunakan gambar random dari picsum</p>
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Ringkasan (Excerpt)</label>
              <textarea
                name="excerpt"
                rows={3}
                required
                value={formData.excerpt}
                onChange={handleChange}
                className="w-full px-4 py-2 rounded-lg border border-slate-300 focus:ring-2 focus:ring-red-500 outline-none"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Konten Utama</label>
              <textarea
                name="content"
                rows={15}
                required
                value={formData.content}
                onChange={handleChange}
                className="w-full px-4 py-2 rounded-lg border border-slate-300 focus:ring-2 focus:ring-red-500 outline-none font-serif leading-relaxed"
              />
            </div>

            <div className="flex items-center justify-end gap-4 pt-4">
              <button
                type="button"
                onClick={() => navigate('/admin')}
                className="px-6 py-2 rounded-lg text-slate-600 hover:bg-slate-100 font-medium"
              >
                Batal
              </button>
              <button
                type="submit"
                className="px-6 py-2 rounded-lg bg-red-600 text-white hover:bg-red-700 font-medium shadow-md"
              >
                {isEditing ? 'Simpan Perubahan' : 'Publikasikan Artikel'}
              </button>
            </div>
          </form>
        </div>

        {/* AI Sidebar */}
        <div className="lg:col-span-1">
          <div className="bg-gradient-to-br from-indigo-50 to-purple-50 rounded-xl p-6 border border-indigo-100 shadow-sm sticky top-24">
            <div className="flex items-center gap-2 mb-4 text-indigo-700">
              <IconSparkles className="w-5 h-5" />
              <h3 className="font-bold">Asisten Penulis AI</h3>
            </div>
            <p className="text-sm text-slate-600 mb-4">
              Biarkan AI menulis draf awal untuk Anda. 
            </p>
            
            <div className="space-y-4">
              <div>
                <label className="text-xs font-semibold text-slate-500 uppercase">Mode Manual</label>
                <div className="mt-1 flex gap-2">
                  <input
                    type="text"
                    placeholder="Topik spesifik..."
                    value={aiPrompt}
                    onChange={(e) => setAiPrompt(e.target.value)}
                    className="w-full px-3 py-2 rounded-md border border-indigo-200 focus:ring-2 focus:ring-indigo-500 outline-none bg-white text-sm"
                  />
                </div>
                <button
                  type="button"
                  onClick={() => handleGenerateAI(false)}
                  disabled={aiLoading}
                  className="mt-2 w-full py-2 bg-indigo-600 text-white rounded-md text-sm font-medium hover:bg-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                  {aiLoading ? "Sedang Menulis..." : "Buat dari Topik"}
                </button>
              </div>

              <div className="border-t border-indigo-200 pt-4">
                <label className="text-xs font-semibold text-slate-500 uppercase">Mode Otomatis</label>
                <p className="text-xs text-slate-500 mb-2">AI akan memilih topik trending sesuai kategori {formData.category}.</p>
                <button
                  type="button"
                  onClick={() => handleGenerateAI(true)}
                  disabled={aiLoading}
                  className="w-full py-2 bg-white text-indigo-600 border border-indigo-200 rounded-md text-sm font-medium hover:bg-indigo-50 disabled:opacity-50 flex items-center justify-center gap-2"
                >
                   {aiLoading ? (
                      "Sedang Mencari Ide..."
                   ) : (
                      <>
                        <IconSparkles className="w-4 h-4" />
                        Surprise Me (Random)
                      </>
                   )}
                </button>
              </div>
            </div>
            
            <div className="mt-4 p-3 bg-yellow-50 border border-yellow-100 rounded-md">
              <p className="text-xs text-yellow-800">
                <strong>Catatan:</strong> Konten yang dihasilkan AI akan menimpa judul, ringkasan, dan konten yang ada di form.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Editor;