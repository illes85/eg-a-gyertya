import { useState, useEffect } from 'react';
import { Star, Wind, ShoppingBag, ArrowUp } from 'lucide-react';
import ProductList from '../components/ProductList';
import { Link, useLocation } from 'react-router-dom';

// Dinamikusan beolvassuk az összes videót a hero mappából
const heroVideos = import.meta.glob('../vids/hero/*.mp4', { eager: true, import: 'default' });
const videoList = Object.values(heroVideos);

const Home = ({ products, addToCart }) => {
  const [showScrollTop, setShowScrollTop] = useState(false);
  // Kezdésnek az első videót állítjuk be, de az useEffect azonnal felülírja ha több van
  const [currentHeroVideo, setCurrentHeroVideo] = useState(videoList[0]);
  const location = useLocation();

  useEffect(() => {
    // Random videó kiválasztása a dinamikus listából
    if (videoList.length > 0) {
      const randomVideo = videoList[Math.floor(Math.random() * videoList.length)];
      setCurrentHeroVideo(randomVideo);
    }

    const handleScroll = () => {
      if (window.scrollY > 300) {
        setShowScrollTop(true);
      } else {
        setShowScrollTop(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Hash navigáció kezelése (pl. másik oldalról érkezve)
  useEffect(() => {
    if (location.hash) {
      const elem = document.getElementById(location.hash.slice(1));
      if (elem) {
        setTimeout(() => {
          elem.scrollIntoView({ behavior: 'smooth' });
        }, 100); // Kis késleltetés a renderelés miatt
      }
    }
  }, [location]);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  return (
    <div className="min-h-screen bg-wax-100 relative pt-16">
      {/* Hero Section */}
      <div className="relative">
        <div className="absolute inset-0 z-0 overflow-hidden h-full">
             <video 
                key={currentHeroVideo} // Fontos: key attribútum a re-rendereléshez
                autoPlay 
                loop 
                muted 
                playsInline 
                className="absolute inset-0 w-full h-full object-cover transition-opacity duration-1000"
             >
                <source src={currentHeroVideo} type="video/mp4" />
             </video>
             <div className="absolute inset-0 bg-white/60 backdrop-blur-[2px]"></div>
             {/* Fade out effect at the bottom */}
             <div className="absolute bottom-0 left-0 w-full h-48 bg-gradient-to-t from-wax-100 to-transparent z-10"></div>
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
              <a href="#more-info" className="border-2 border-lavender text-lavender hover:bg-lavender-light/20 px-8 py-3 rounded-full font-medium transition-colors text-center cursor-pointer">
                Tudj meg többet
              </a>
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

      {/* More Info Section */}
      <section id="more-info" className="py-24 bg-wax-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-center gap-12">
            <div className="w-full md:w-1/2">
               <div className="relative rounded-3xl overflow-hidden shadow-xl aspect-[4/3]">
                 <img 
                   src="https://images.unsplash.com/photo-1603006905003-be475563bc59?auto=format&fit=crop&q=80&w=1000" 
                   alt="Gyertyakészítés folyamata" 
                   className="object-cover w-full h-full hover:scale-105 transition-transform duration-700"
                 />
                 <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                 <div className="absolute bottom-6 left-6 text-white">
                    <p className="font-serif italic text-lg">"A fény születése"</p>
                 </div>
               </div>
            </div>
            <div className="w-full md:w-1/2 space-y-6">
               <h2 className="text-3xl md:text-4xl font-serif font-bold text-earth-dark">
                 Több mint egy egyszerű láng
               </h2>
               <div className="w-20 h-1 bg-lavender rounded-full"></div>
               <p className="text-lg text-earth leading-relaxed">
                 Az <strong>Ég a gyertya</strong> műhelyében minden darab egyedi történetet mesél el. 
                 Nem ipari sorozatgyártásban készülnek, hanem gondos odafigyeléssel, lépésről lépésre.
               </p>
               <p className="text-earth leading-relaxed">
                 A felhasznált szójaviasz nemcsak környezetbarát, de égése során nem bocsát ki káros anyagokat, 
                 így tisztán élvezheted a természetes illóolajok aromaterápiás hatását. 
                 Minden tégelyt úgy tervezünk, hogy miután a gyertya leégett, új életet kezdhessen otthonodban – 
                 akár ékszertartóként vagy kaspóként.
               </p>
               <div className="pt-4">
                 <Link to="/about" className="text-lavender font-bold hover:text-lavender-dark transition-colors inline-flex items-center gap-2 group">
                   Ismerd meg a teljes történetünket 
                   <span className="transform group-hover:translate-x-1 transition-transform">→</span>
                 </Link>
               </div>
            </div>
          </div>
        </div>
      </section>

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

      {/* Back to Top Button */}
      <button
        onClick={scrollToTop}
        className={`fixed bottom-8 right-8 bg-lavender hover:bg-lavender-dark text-white p-3 rounded-full shadow-lg transition-all duration-300 z-40 ${
          showScrollTop ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10 pointer-events-none'
        }`}
        aria-label="Vissza a tetejére"
      >
        <ArrowUp className="w-6 h-6" />
      </button>
    </div>
  );
};

export default Home;
