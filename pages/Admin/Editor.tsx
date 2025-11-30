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
        id: prev.id 
      }));
    } catch (error) {
      alert("Gagal menghasilkan konten. Pastikan API Key valid atau coba lagi nanti.");
    } finally {
      setAiLoading(false);
    }
  };

  return (
    <div className="pb-20">
      <button 
        onClick={() => navigate('/admin')} 
        className="inline-flex items-center gap-1 text-slate-500 hover:text-slate-900 mb-6 pl-0"
      >
        <IconArrowLeft className="w-4 h-4" />
        Kembali ke Dashboard
      </button>

      <h1 className="text-2xl font-bold text-slate-900 mb-8">
        {isEditing ? 'Edit Artikel' : 'Buat Artikel Baru'}
      </h1>

      <div className="grid grid-cols-1 lg:grid-cols-[2fr_1fr] gap-8">
        {/* Main Form */}
        <div>
          <form onSubmit={handleSubmit}>
            <div className="mb-6">
              <label className="block text-sm font-medium text-slate-900 mb-2">Judul Artikel</label>
              <input
                type="text"
                name="title"
                required
                value={formData.title}
                onChange={handleChange}
                className="w-full px-4 py-2 rounded-md border border-slate-200 focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary-light transition-all bg-white"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
              <div>
                <label className="block text-sm font-medium text-slate-900 mb-2">Kategori</label>
                <select
                  name="category"
                  value={formData.category}
                  onChange={handleChange}
                  className="w-full px-4 py-2 rounded-md border border-slate-200 focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary-light transition-all bg-white"
                >
                  {Object.values(ArticleCategory).map(cat => (
                    <option key={cat} value={cat}>{cat}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-900 mb-2">Penulis</label>
                <input
                  type="text"
                  name="author"
                  required
                  value={formData.author}
                  onChange={handleChange}
                  className="w-full px-4 py-2 rounded-md border border-slate-200 focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary-light transition-all bg-white"
                />
              </div>
            </div>

             <div className="mb-6">
              <label className="block text-sm font-medium text-slate-900 mb-2">URL Gambar Header</label>
              <input
                type="text"
                name="imageUrl"
                value={formData.imageUrl}
                onChange={handleChange}
                className="w-full px-4 py-2 rounded-md border border-slate-200 focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary-light transition-all bg-white text-slate-500"
              />
              <p className="text-xs text-slate-400 mt-1">Default: Menggunakan gambar random dari picsum</p>
            </div>

            <div className="mb-6">
              <label className="block text-sm font-medium text-slate-900 mb-2">Ringkasan (Excerpt)</label>
              <textarea
                name="excerpt"
                rows={3}
                required
                value={formData.excerpt}
                onChange={handleChange}
                className="w-full px-4 py-2 rounded-md border border-slate-200 focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary-light transition-all bg-white"
              />
            </div>

            <div className="mb-6">
              <label className="block text-sm font-medium text-slate-900 mb-2">Konten Utama</label>
              <textarea
                name="content"
                rows={15}
                required
                value={formData.content}
                onChange={handleChange}
                className="w-full px-4 py-2 rounded-md border border-slate-200 focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary-light transition-all bg-white font-serif leading-relaxed"
              />
            </div>

            <div className="flex justify-end gap-4 mt-8">
              <button
                type="button"
                onClick={() => navigate('/admin')}
                className="px-4 py-2 rounded-md border border-slate-200 text-slate-500 bg-white hover:bg-slate-50 hover:text-slate-900 transition-colors font-medium text-sm"
              >
                Batal
              </button>
              <button
                type="submit"
                className="px-4 py-2 rounded-md bg-primary text-white hover:bg-primary-hover transition-colors font-medium text-sm"
              >
                {isEditing ? 'Simpan Perubahan' : 'Publikasikan Artikel'}
              </button>
            </div>
          </form>
        </div>

        {/* AI Sidebar */}
        <div>
          <div className="bg-gradient-to-br from-indigo-50 to-purple-50 border border-indigo-100 rounded-xl p-6 sticky top-24">
            <div className="flex items-center gap-2 mb-4 text-secondary">
              <IconSparkles className="w-5 h-5" />
              <h3 className="font-bold">Asisten Penulis AI</h3>
            </div>
            <p className="text-sm text-slate-500 mb-6">
              Biarkan AI menulis draf awal untuk Anda. 
            </p>
            
            <div className="flex flex-col gap-6">
              <div>
                <label className="text-xs font-bold text-slate-400 uppercase block mb-2">Mode Manual</label>
                <input
                  type="text"
                  placeholder="Topik spesifik..."
                  value={aiPrompt}
                  onChange={(e) => setAiPrompt(e.target.value)}
                  className="w-full px-4 py-2 mb-2 rounded-md border border-slate-200 focus:outline-none focus:border-secondary focus:ring-2 focus:ring-secondary-light bg-white text-sm"
                />
                <button
                  type="button"
                  onClick={() => handleGenerateAI(false)}
                  disabled={aiLoading}
                  className="w-full px-4 py-2 rounded-md bg-secondary text-white hover:bg-secondary-hover transition-colors font-medium text-sm disabled:opacity-50"
                >
                  {aiLoading ? "Sedang Menulis..." : "Buat dari Topik"}
                </button>
              </div>

              <div className="border-t border-indigo-100 pt-4">
                <label className="text-xs font-bold text-slate-400 uppercase block mb-2">Mode Otomatis</label>
                <p className="text-xs text-slate-500 mb-2">AI akan memilih topik trending sesuai kategori {formData.category}.</p>
                <button
                  type="button"
                  onClick={() => handleGenerateAI(true)}
                  disabled={aiLoading}
                  className="w-full px-4 py-2 rounded-md border border-secondary text-secondary bg-white hover:bg-secondary-light transition-colors font-medium text-sm flex items-center justify-center gap-2 disabled:opacity-50"
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
            
            <div className="mt-6 p-3 bg-yellow-50 border border-yellow-100 rounded-md">
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