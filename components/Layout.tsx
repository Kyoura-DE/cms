import React from 'react';
import { Link, useLocation } from 'react-router-dom';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const location = useLocation();
  const isAdmin = location.pathname.startsWith('/admin');

  return (
    <div className="min-h-screen flex flex-col">
      <nav className="sticky top-0 z-50 bg-white/90 backdrop-blur-md border-b border-slate-200 h-16 flex items-center">
        <div className="container max-w-7xl mx-auto px-4 flex justify-between items-center w-full">
          <div className="flex-1 flex items-center">
            <Link to="/" className="flex items-center gap-3 font-bold text-xl text-slate-900">
              <div className="w-8 h-8 bg-primary text-white rounded-md flex items-center justify-center">N</div>
              <span>Nusantara News</span>
            </Link>
            {!isAdmin && (
              <div className="hidden sm:flex gap-8 ml-8">
                <Link to="/" className="text-slate-500 text-sm font-medium py-1 border-b-2 border-transparent hover:text-slate-900 hover:border-primary transition-colors">Beranda</Link>
                <Link to="/" className="text-slate-500 text-sm font-medium py-1 border-b-2 border-transparent hover:text-slate-900 hover:border-primary transition-colors">Terpopuler</Link>
              </div>
            )}
          </div>
          <div className="flex items-center gap-4">
            <Link 
              to={isAdmin ? "/" : "/admin"} 
              className={`inline-flex items-center justify-center px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                isAdmin 
                  ? "text-slate-500 hover:text-slate-900" 
                  : "bg-slate-900 text-white hover:bg-slate-800"
              }`}
            >
              {isAdmin ? "Ke Situs Utama" : "Admin Panel"}
            </Link>
          </div>
        </div>
      </nav>

      <main className="flex-1 container max-w-7xl mx-auto px-4 py-8">
        {children}
      </main>

      <footer className="bg-white border-t border-slate-200 py-8 mt-auto text-center text-slate-500 text-sm">
        <div className="container max-w-7xl mx-auto px-4">
          <p>&copy; {new Date().getFullYear()} Nusantara News. Dibuat dengan React & Gemini AI.</p>
        </div>
      </footer>
    </div>
  );
};

export default Layout;