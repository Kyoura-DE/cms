import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { IconMenu } from './Icons';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const location = useLocation();
  const isAdmin = location.pathname.startsWith('/admin');

  return (
    <div className="min-h-screen flex flex-col bg-slate-50">
      {/* Navbar */}
      <nav className="sticky top-0 z-50 bg-white border-b border-slate-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <Link to="/" className="flex-shrink-0 flex items-center gap-2">
                <div className="w-8 h-8 bg-red-600 rounded-lg flex items-center justify-center text-white font-bold text-xl">N</div>
                <span className="font-bold text-xl tracking-tight text-slate-900">Nusantara News</span>
              </Link>
              {!isAdmin && (
                <div className="hidden sm:ml-8 sm:flex sm:space-x-8">
                  <Link to="/" className="border-transparent text-slate-500 hover:border-red-500 hover:text-slate-900 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium">
                    Beranda
                  </Link>
                  <Link to="/" className="border-transparent text-slate-500 hover:border-red-500 hover:text-slate-900 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium">
                    Terpopuler
                  </Link>
                </div>
              )}
            </div>
            <div className="flex items-center gap-4">
              <Link 
                to={isAdmin ? "/" : "/admin"} 
                className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                  isAdmin 
                    ? "text-slate-600 hover:text-slate-900 hover:bg-slate-100" 
                    : "bg-slate-900 text-white hover:bg-slate-800"
                }`}
              >
                {isAdmin ? "Ke Situs Utama" : "Admin Panel"}
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Content */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {children}
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-slate-200 mt-auto">
        <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
          <p className="text-center text-slate-400 text-sm">
            &copy; {new Date().getFullYear()} Nusantara News. Dibuat dengan React & Gemini AI.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Layout;
