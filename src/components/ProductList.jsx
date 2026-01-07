import ProductCard from './ProductCard';
import { useState } from 'react';

const ProductList = ({ products, onAddToCart }) => {
  const [activeCategory, setActiveCategory] = useState('Összes');

  // Egyedi kategóriák kinyerése a termékekből + "Összes" opció
  const categories = ['Összes', ...new Set(products.map(p => p.category))];

  // Szűrés logika
  const filteredProducts = activeCategory === 'Összes' 
    ? products 
    : products.filter(product => product.category === activeCategory);

  return (
    <section className="py-24 bg-wax-100" id="webshop">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-serif font-bold text-earth-dark mb-4">Termékkínálatunk</h2>
          <div className="w-24 h-1 bg-lavender mx-auto mb-6 rounded-full"></div>
          <p className="text-lg text-earth max-w-2xl mx-auto mb-8">
            Válogass kézzel készült, prémium szójaviasz gyertyáink közül. 
            Minden darab egyedi, és szeretettel készült.
          </p>

          {/* Kategória szűrő gombok */}
          <div className="flex flex-wrap justify-center gap-4">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setActiveCategory(category)}
                className={`px-6 py-2 rounded-full font-medium transition-all duration-300 border-2 
                  ${activeCategory === category 
                    ? 'bg-lavender border-lavender text-white shadow-md transform scale-105' 
                    : 'bg-transparent border-wax-200 text-earth hover:border-lavender hover:text-lavender'
                  }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {filteredProducts.length > 0 ? (
            filteredProducts.map((product) => (
              <ProductCard 
                key={product.id} 
                product={product} 
                onAddToCart={onAddToCart}
              />
            ))
          ) : (
             <div className="col-span-full text-center py-12 text-earth">
               Ebben a kategóriában jelenleg nincs termék.
             </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default ProductList;
