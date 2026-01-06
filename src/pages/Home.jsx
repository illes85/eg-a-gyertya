import { ShoppingBag, Star, Wind } from 'lucide-react';
import ProductList from '../components/ProductList';
import Cart from '../components/Cart';
import { useState } from 'react';
import { Link } from 'react-router-dom';

const Home = ({ products, cartItems, addToCart, removeFromCart, updateQuantity }) => {
  const [isCartOpen, setIsCartOpen] = useState(false);
  const totalItems = cartItems.reduce((total, item) => total + item.quantity, 0);

  return (
    <div className="min-h-screen bg-wax-100">
      {/* Navbar */}
      <nav className="fixed w-full bg-white/80 backdrop-blur-md z-50 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex-shrink-0">
              <h1 className="text-2xl font-serif text-lavender font-bold">Ég a gyertya</h1>
            </div>
            <div className="hidden md:block">
              <div className="ml-10 flex items-baseline space-x-8">
                <Link to="/" className="hover:text-lavender transition-colors font-medium">Kezdőlap</Link>
                <a href="#webshop" className="hover:text-lavender transition-colors font-medium">Webshop</a>
                <Link to="/admin" className="hover:text-lavender transition-colors font-medium text-lavender-dark">Admin</Link>
              </div>
            </div>
            <div className="flex items-center space-x-4">
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
            </div>
          </div>
        </div>
      </nav>

      <Cart 
        isOpen={isCartOpen} 
        onClose={() => setIsCartOpen(false)}
        cartItems={cartItems}
        onRemoveItem={removeFromCart}
        onUpdateQuantity={updateQuantity}
      />

      {/* Hero Section */}
      <div className="relative pt-16">
        <div className="absolute inset-0 z-0">
             <div className="w-full h-full bg-gradient-to-r from-wax-100 via-wax-50 to-lavender-light/20"></div>
        </div>
        
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 md:py-32">
          <div className="text-center md:text-left md:w-1/2">
            <div className="flex items-center justify-center md:justify-start gap-2 text-lavender font-medium mb-4">
               <Wind className="w-5 h-5 animate-pulse" />
               <span>Természetes szójaviasz</span>
            </div>
            <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight text-earth-dark">
              Fényt és illatot hozunk <br/>
              <span className="text-lavender italic">az otthonodba.</span>
            </h1>
            <p className="text-lg md:text-xl text-earth mb-8 leading-relaxed">
              Kézzel öntött, 100% természetes illatgyertyák és egyedi lakásdekorációk. 
              Tedd varázslatossá a mindennapokat.
            </p>
            <div className="flex flex-col md:flex-row gap-4 justify-center md:justify-start">
              <a href="#webshop" className="bg-lavender hover:bg-lavender-dark text-white px-8 py-3 rounded-full font-medium transition-all shadow-lg hover:shadow-xl transform hover:-translate-y-1 text-center">
                Vásárlás
              </a>
              <button className="border-2 border-lavender text-lavender hover:bg-lavender-light/20 px-8 py-3 rounded-full font-medium transition-colors">
                Tudj meg többet
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Features */}
      <div className="bg-white py-20 relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
           <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
              <div className="text-center p-8 bg-wax-50 rounded-3xl border border-wax-100 hover:border-lavender/20 transition-all hover:shadow-lg">
                <div className="w-16 h-16 bg-lavender/10 rounded-2xl flex items-center justify-center mx-auto mb-6">
                  <Star className="w-8 h-8 text-lavender" />
                </div>
                <h3 className="text-xl font-bold mb-3 text-earth-dark">100% Természetes</h3>
                <p className="text-earth">Csak a legtisztább szójaviaszt és természetes illóolajokat használjuk.</p>
              </div>
              <div className="text-center p-8 bg-wax-50 rounded-3xl border border-wax-100 hover:border-lavender/20 transition-all hover:shadow-lg">
                 <div className="w-16 h-16 bg-lavender/10 rounded-2xl flex items-center justify-center mx-auto mb-6">
                  <Wind className="w-8 h-8 text-lavender" />
                </div>
                <h3 className="text-xl font-bold mb-3 text-earth-dark">Kézzel Készült</h3>
                <p className="text-earth">Minden egyes gyertya gondos odafigyeléssel, kézzel készül műhelyünkben.</p>
              </div>
              <div className="text-center p-8 bg-wax-50 rounded-3xl border border-wax-100 hover:border-lavender/20 transition-all hover:shadow-lg">
                 <div className="w-16 h-16 bg-lavender/10 rounded-2xl flex items-center justify-center mx-auto mb-6">
                  <ShoppingBag className="w-8 h-8 text-lavender" />
                </div>
                <h3 className="text-xl font-bold mb-3 text-earth-dark">Fenntartható</h3>
                <p className="text-earth">Környezetbarát csomagolás és újrahasznosítható alapanyagok.</p>
              </div>
           </div>
        </div>
      </div>

      {/* Product List Section */}
      {/* Most már props-ból kapja a termékeket is */}
      <ProductList products={products} onAddToCart={addToCart} />

      {/* Footer */}
      <footer className="bg-earth-dark text-white py-12">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h2 className="text-2xl font-serif font-bold mb-4 italic">Ég a gyertya</h2>
          <p className="text-wax-200 mb-8 max-w-md mx-auto">Prémium, kézműves szójaviasz gyertyák az otthonod melegéért.</p>
          <div className="border-t border-white/10 pt-8 text-sm text-wax-200">
            © 2026 Ég a gyertya. Minden jog fenntartva.
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Home;
