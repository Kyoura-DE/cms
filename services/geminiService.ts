import { GoogleGenAI, Type } from "@google/genai";
import { Article, ArticleCategory } from "../types";

const SYSTEM_INSTRUCTION = `
Anda adalah jurnalis senior profesional untuk portal berita online Indonesia "Nusantara News". 
Tugas Anda adalah menulis artikel berita yang menarik, faktual, dan mudah dibaca dalam Bahasa Indonesia.
Gaya penulisan harus informatif namun mengalir (seperti gaya jurnalistik feature).
Gunakan paragraf yang rapi. Jangan gunakan markdown heading (#) di dalam konten, hanya teks biasa dengan paragraf.
`;

export const generateArticleDraft = async (topic: string, category: string): Promise<Partial<Article>> => {
  if (!process.env.API_KEY) {
    throw new Error("API Key tidak ditemukan");
  }

  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

  // Logika jika topik kosong (Auto Generate Random)
  let finalPrompt = "";
  if (!topic || topic.trim() === "") {
    finalPrompt = `Pilihkan satu topik berita yang SANGAT TRENDING dan RELEVAN di Indonesia saat ini yang berkaitan dengan kategori "${category}". 
    Buatkan artikel lengkap tentang topik tersebut. 
    Berikan output dalam format JSON dengan struktur: title, excerpt, content (minimal 400 kata).
    Pastikan konten original dan menarik.`;
  } else {
    finalPrompt = `Buatkan draf artikel lengkap tentang topik: "${topic}". Kategori: ${category}.
    Berikan output dalam format JSON dengan struktur: title, excerpt, content (minimal 300 kata).
    Konten harus dalam Bahasa Indonesia yang baik dan benar (EYD).`;
  }

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: finalPrompt,
      config: {
        systemInstruction: SYSTEM_INSTRUCTION,
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            title: { type: Type.STRING, description: "Judul artikel yang menarik (Clickbait yang elegan)" },
            excerpt: { type: Type.STRING, description: "Ringkasan singkat artikel 1-2 kalimat" },
            content: { type: Type.STRING, description: "Isi lengkap artikel, gunakan enter untuk memisahkan paragraf." },
          },
          required: ["title", "excerpt", "content"]
        }
      }
    });

    let text = response.text || "{}";
    // Clean up potential markdown formatting if model outputs it
    text = text.replace(/```json/g, "").replace(/```/g, "").trim();

    const data = JSON.parse(text);
    
    return {
      title: data.title,
      excerpt: data.excerpt,
      content: data.content,
      category: category as ArticleCategory,
      author: 'AI Assistant',
      date: new Date().toISOString().split('T')[0],
      imageUrl: `https://picsum.photos/seed/${Math.floor(Math.random() * 1000)}/800/600`
    };

  } catch (error) {
    console.error("Gemini Error:", error);
    throw error;
  }
};