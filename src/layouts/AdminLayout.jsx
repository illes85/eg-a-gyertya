import { LayoutDashboard, Package, Settings, LogOut } from 'lucide-react';
import { Link } from 'react-router-dom';

const AdminLayout = ({ children }) => {
  return (
    <div className="flex h-screen bg-wax-50">
      {/* Sidebar */}
      <aside className="w-64 bg-white border-r border-wax-200 hidden md:flex flex-col">
        <div className="p-6 border-b border-wax-200">
          <Link to="/" className="text-xl font-serif font-bold text-lavender hover:opacity-80 transition-opacity block">
            Ég a gyertya
          </Link>
          <span className="text-xs text-earth uppercase tracking-widest">Admin</span>
        </div>
        
        <nav className="flex-1 p-4 space-y-1">
          <Link to="/admin" className="flex items-center gap-3 px-4 py-3 text-lavender bg-lavender/10 rounded-xl font-medium transition-colors">
            <LayoutDashboard className="w-5 h-5" />
            Vezérlőpult
          </Link>
          <a href="#" className="flex items-center gap-3 px-4 py-3 text-earth-dark hover:bg-wax-100 rounded-xl font-medium transition-colors">
            <Package className="w-5 h-5" />
            Termékek
          </a>
          <a href="#" className="flex items-center gap-3 px-4 py-3 text-earth-dark hover:bg-wax-100 rounded-xl font-medium transition-colors">
            <Settings className="w-5 h-5" />
            Beállítások
          </a>
        </nav>

        <div className="p-4 border-t border-wax-200">
          <Link to="/" className="flex items-center gap-3 px-4 py-3 text-red-500 hover:bg-red-50 rounded-xl font-medium transition-colors">
            <LogOut className="w-5 h-5" />
            Kilépés
          </Link>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-auto">
        <header className="bg-white border-b border-wax-200 px-8 py-4 flex justify-between items-center sticky top-0 z-10">
           <h2 className="text-xl font-bold text-earth-dark">Vezérlőpult</h2>
           <div className="flex items-center gap-4">
              <div className="w-8 h-8 rounded-full bg-lavender text-white flex items-center justify-center font-bold">A</div>
           </div>
        </header>
        <div className="p-8">
          {children}
        </div>
      </main>
    </div>
  );
};

export default AdminLayout;
