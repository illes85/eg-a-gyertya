import ProductCard from './ProductCard';

const ProductList = ({ products, onAddToCart }) => {
  return (
    <section className="py-24 bg-wax-100" id="webshop">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-serif font-bold text-earth-dark mb-4">Termékkínálatunk</h2>
          <div className="w-24 h-1 bg-lavender mx-auto mb-6 rounded-full"></div>
          <p className="text-lg text-earth max-w-2xl mx-auto">
            Válogass kézzel készült, prémium szójaviasz gyertyáink közül. 
            Minden darab egyedi, és szeretettel készült.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {products.map((product) => (
            <ProductCard 
              key={product.id} 
              product={product} 
              onAddToCart={onAddToCart}
            />
          ))}
        </div>
        
        <div className="mt-16 text-center">
          <button className="border-2 border-lavender text-lavender hover:bg-lavender hover:text-white px-10 py-4 rounded-full font-medium transition-all duration-300">
            Összes termék megtekintése
          </button>
        </div>
      </div>
    </section>
  );
};

export default ProductList;
