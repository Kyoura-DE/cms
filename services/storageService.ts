import { Article } from '../types';
import { INITIAL_ARTICLES, STORAGE_KEY } from '../constants';

export const getArticles = (): Article[] => {
  const stored = localStorage.getItem(STORAGE_KEY);
  if (!stored) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(INITIAL_ARTICLES));
    return INITIAL_ARTICLES;
  }
  try {
    return JSON.parse(stored);
  } catch (e) {
    console.error("Failed to parse articles", e);
    return INITIAL_ARTICLES;
  }
};

export const getArticleById = (id: string): Article | undefined => {
  const articles = getArticles();
  return articles.find(a => a.id === id);
};

export const saveArticle = (article: Article): void => {
  const articles = getArticles();
  const index = articles.findIndex(a => a.id === article.id);
  
  if (index >= 0) {
    // Update existing
    articles[index] = article;
  } else {
    // Create new
    articles.unshift(article);
  }
  
  localStorage.setItem(STORAGE_KEY, JSON.stringify(articles));
};

export const deleteArticle = (id: string): void => {
  const articles = getArticles();
  const filtered = articles.filter(a => a.id !== id);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(filtered));
};
