import { ShoppingCart, Plus, Eye } from 'lucide-react';
import { useState } from 'react';
import ImageGallery from './ImageGallery';

const ProductCard = ({ product, onAddToCart }) => {
  const [isGalleryOpen, setIsGalleryOpen] = useState(false);

  return (
    <>
      <div className="group bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border border-wax-200">
        {/* Kép konténer - Kattintásra galéria */}
        <div 
          className="relative aspect-square overflow-hidden cursor-pointer"
          onClick={() => setIsGalleryOpen(true)}
        >
          <img 
            src={product.image} 
            alt={product.name}
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
          />
          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300" />
          
          {/* Nagyítás ikon középen (hoverre) */}
          <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
             <div className="bg-white/20 backdrop-blur-md p-3 rounded-full text-white">
                <Eye className="w-8 h-8" />
             </div>
          </div>

          <button 
            onClick={(e) => { e.stopPropagation(); onAddToCart(product); }}
            className="absolute bottom-4 right-4 bg-white/90 backdrop-blur-sm p-3 rounded-full shadow-lg opacity-0 group-hover:opacity-100 transform translate-y-4 group-hover:translate-y-0 transition-all duration-300 hover:bg-lavender hover:text-white z-10"
          >
            <Plus className="w-5 h-5" />
          </button>
        </div>

        {/* Tartalom */}
        <div className="p-6">
          <div className="flex justify-between items-start mb-2">
            <div>
              <span className="text-xs font-medium text-lavender uppercase tracking-wider">{product.category}</span>
              <h3 className="text-xl font-bold text-earth-dark mt-1">{product.name}</h3>
            </div>
            <span className="text-lg font-serif font-bold text-lavender">{product.price.toLocaleString()} Ft</span>
          </div>
          
          <p className="text-sm text-earth line-clamp-2 mb-4">
            {product.description}
          </p>

          <div className="flex flex-wrap gap-2">
            {product.features.map((feature, index) => (
              <span key={index} className="text-[10px] bg-wax-100 text-earth px-2 py-1 rounded-full border border-wax-200">
                {feature}
              </span>
            ))}
          </div>

          <button 
            onClick={() => onAddToCart(product)}
            className="w-full mt-6 bg-wax-200 hover:bg-lavender hover:text-white text-earth-dark font-medium py-3 rounded-xl transition-colors flex items-center justify-center gap-2 group/btn"
          >
            <ShoppingCart className="w-4 h-4 group-hover/btn:scale-110 transition-transform" />
            Kosárba teszem
          </button>
        </div>
      </div>

      {/* Galéria Modális Ablak */}
      <ImageGallery 
        images={product.images || [product.image]} 
        isOpen={isGalleryOpen} 
        onClose={() => setIsGalleryOpen(false)} 
      />
    </>
  );
};

export default ProductCard;
