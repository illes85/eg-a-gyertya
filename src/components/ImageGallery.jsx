import { X, ChevronLeft, ChevronRight } from 'lucide-react';
import { useState, useEffect } from 'react';

const ImageGallery = ({ images, isOpen, onClose }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  // Billentyűzet kezelés (ESC, Nyilak)
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (!isOpen) return;
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowLeft') prevImage();
      if (e.key === 'ArrowRight') nextImage();
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, currentIndex]); // eslint-disable-line react-hooks/exhaustive-deps

  // Ha megnyitjuk, mindig az első képpel kezdjen (vagy lehetne paraméterezni)
  useEffect(() => {
    if (isOpen) {
      setCurrentIndex(0);
      document.body.style.overflow = 'hidden'; // Görgetés tiltása
    } else {
      document.body.style.overflow = 'unset'; // Görgetés visszaállítása
    }
  }, [isOpen]);

  const nextImage = () => {
    setCurrentIndex((prev) => (prev + 1) % images.length);
  };

  const prevImage = () => {
    setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center bg-black/95 backdrop-blur-sm animate-fade-in">
      {/* Bezárás gomb */}
      <button 
        onClick={onClose}
        className="absolute top-6 right-6 text-white/70 hover:text-white transition-colors p-2 z-50"
      >
        <X className="w-8 h-8" />
      </button>

      {/* Balra nyíl */}
      <button 
        onClick={(e) => { e.stopPropagation(); prevImage(); }}
        className="absolute left-4 md:left-8 text-white/50 hover:text-white transition-colors p-4 rounded-full hover:bg-white/10 z-50"
      >
        <ChevronLeft className="w-10 h-10" />
      </button>

      {/* Jobbra nyíl */}
      <button 
        onClick={(e) => { e.stopPropagation(); nextImage(); }}
        className="absolute right-4 md:right-8 text-white/50 hover:text-white transition-colors p-4 rounded-full hover:bg-white/10 z-50"
      >
        <ChevronRight className="w-10 h-10" />
      </button>

      {/* Fő kép konténer */}
      <div className="relative w-full h-full flex flex-col items-center justify-center p-4 md:p-12">
        <img 
          src={images[currentIndex]} 
          alt={`Gallery image ${currentIndex + 1}`}
          className="max-h-[80vh] max-w-full object-contain rounded-lg shadow-2xl animate-scale-in"
          onClick={(e) => e.stopPropagation()} 
        />
        
        {/* Kicsi előnézeti képek (thumbnails) */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex gap-4 overflow-x-auto max-w-full px-4 pb-2" onClick={(e) => e.stopPropagation()}>
            {images.map((img, index) => (
                <button
                    key={index}
                    onClick={() => setCurrentIndex(index)}
                    className={`w-16 h-16 md:w-20 md:h-20 rounded-lg overflow-hidden border-2 transition-all flex-shrink-0 ${
                        index === currentIndex ? 'border-lavender opacity-100 scale-110' : 'border-transparent opacity-50 hover:opacity-100'
                    }`}
                >
                    <img src={img} alt={`Thumbnail ${index}`} className="w-full h-full object-cover" />
                </button>
            ))}
        </div>
      </div>
    </div>
  );
};

export default ImageGallery;
