import { useState, useEffect } from 'react';
import { ShoppingBag, Menu, X } from 'lucide-react';
import { Link, useLocation, useNavigate } from 'react-router-dom';

const Navbar = ({ cartItems, setIsCartOpen }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const totalItems = cartItems.reduce((total, item) => total + item.quantity, 0);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  const handleLogoClick = (e) => {
    if (location.pathname === '/') {
      e.preventDefault();
      // Töröljük a hash-t az URL-ből és frissítjük az állapotot
      window.history.pushState("", document.title, "/");
      scrollToTop();
    }
  };

  const menuItems = [
    { name: 'Kezdőlap', path: '/', isLink: true },
    { name: 'Webshop', path: '/#webshop', isLink: false },
    { name: 'Rólunk', path: '/about', isLink: true },
  ];

  return (
    <nav className={`fixed w-full z-50 transition-all duration-300 ${isScrolled || location.pathname !== '/' ? 'bg-white shadow-sm py-2' : 'bg-white/80 backdrop-blur-md py-4'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex-shrink-0">
            <Link 
              to="/" 
              onClick={handleLogoClick}
              className="text-2xl font-serif text-lavender font-bold hover:opacity-80 transition-opacity"
            >
              Ég a gyertya
            </Link>
          </div>
          
          {/* Desktop Menu */}
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-8">
              {menuItems.map((item) => (
                item.isLink ? (
                  <Link 
                    key={item.name}
                    to={item.path} 
                    onClick={item.path === '/' ? handleLogoClick : undefined}
                    className="hover:text-lavender transition-colors font-medium text-earth-dark"
                  >
                    {item.name}
                  </Link>
                ) : (
                  <a 
                    key={item.name}
                    href={item.path} 
                    className="hover:text-lavender transition-colors font-medium text-earth-dark"
                  >
                    {item.name}
                  </a>
                )
              ))}
            </div>
          </div>

          <div className="flex items-center space-x-2">
            <button 
              onClick={() => setIsCartOpen(true)}
              className="p-2 hover:bg-wax-200 rounded-full transition-colors relative group"
            >
              <ShoppingBag className="w-6 h-6 text-earth group-hover:text-lavender" />
              {totalItems > 0 && (
                <span className="absolute top-0 right-0 bg-lavender text-white text-[10px] rounded-full w-4 h-4 flex items-center justify-center animate-bounce">
                  {totalItems}
                </span>
              )}
            </button>

            {/* Mobile Menu Button */}
            <button 
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden p-2 hover:bg-wax-200 rounded-full transition-colors text-earth"
            >
              {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      {isMenuOpen && (
        <div className="md:hidden bg-white border-t border-wax-100 animate-in slide-in-from-top duration-300">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 shadow-lg">
            {menuItems.map((item) => (
              item.isLink ? (
                <Link 
                  key={item.name}
                  to={item.path} 
                  onClick={(e) => {
                      if (item.path === '/') handleLogoClick(e);
                      setIsMenuOpen(false);
                  }}
                  className="block px-3 py-2 rounded-md text-base font-medium hover:bg-wax-50 hover:text-lavender transition-colors text-earth-dark"
                >
                  {item.name}
                </Link>
              ) : (
                <a 
                  key={item.name}
                  href={item.path} 
                  onClick={() => setIsMenuOpen(false)}
                  className="block px-3 py-2 rounded-md text-base font-medium hover:bg-wax-50 hover:text-lavender transition-colors text-earth-dark"
                >
                  {item.name}
                </a>
              )
            ))}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
