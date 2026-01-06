import { X, Save, Image as ImageIcon } from 'lucide-react';
import { useState, useEffect } from 'react';

const ProductModal = ({ isOpen, onClose, onSave, productToEdit }) => {
  const initialFormState = {
    name: '',
    price: '',
    category: 'Gyertya',
    description: '',
    image: '',
    features: '' // Vesszővel elválasztva kezeljük
  };

  const [formData, setFormData] = useState(initialFormState);

  // Amikor megnyílik vagy változik a szerkesztendő termék, töltsük be az adatokat
  useEffect(() => {
    if (productToEdit) {
      setFormData({
        ...productToEdit,
        features: productToEdit.features ? productToEdit.features.join(', ') : ''
      });
    } else {
      setFormData(initialFormState);
    }
  }, [productToEdit, isOpen]);

  const handleSubmit = (e) => {
    e.preventDefault();
    // Adatok formázása mentés előtt
    const productData = {
      ...formData,
      price: Number(formData.price),
      features: formData.features.split(',').map(f => f.trim()).filter(f => f !== ''),
      // Ha nincs kép megadva, egy alapértelmezett placeholder
      image: formData.image || 'https://images.unsplash.com/photo-1603006905003-be475563bc59?auto=format&fit=crop&q=80&w=800'
    };
    onSave(productData);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={onClose}></div>
      
      <div className="relative bg-white rounded-2xl shadow-xl w-full max-w-lg overflow-hidden animate-scale-in">
        <div className="flex justify-between items-center p-6 border-b border-wax-200">
          <h2 className="text-xl font-serif font-bold text-earth-dark">
            {productToEdit ? 'Termék szerkesztése' : 'Új termék hozzáadása'}
          </h2>
          <button onClick={onClose} className="text-earth hover:text-red-500 transition-colors">
            <X className="w-6 h-6" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          {/* Név */}
          <div>
            <label className="block text-sm font-medium text-earth-dark mb-1">Termék neve</label>
            <input
              type="text"
              required
              value={formData.name}
              onChange={(e) => setFormData({...formData, name: e.target.value})}
              className="w-full px-4 py-2 rounded-lg border border-wax-200 focus:border-lavender focus:ring-1 focus:ring-lavender outline-none transition-all"
              placeholder="pl. Levendula Álom"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            {/* Ár */}
            <div>
              <label className="block text-sm font-medium text-earth-dark mb-1">Ár (Ft)</label>
              <input
                type="number"
                required
                min="0"
                value={formData.price}
                onChange={(e) => setFormData({...formData, price: e.target.value})}
                className="w-full px-4 py-2 rounded-lg border border-wax-200 focus:border-lavender focus:ring-1 focus:ring-lavender outline-none transition-all"
                placeholder="4500"
              />
            </div>
            {/* Kategória */}
            <div>
              <label className="block text-sm font-medium text-earth-dark mb-1">Kategória</label>
              <select
                value={formData.category}
                onChange={(e) => setFormData({...formData, category: e.target.value})}
                className="w-full px-4 py-2 rounded-lg border border-wax-200 focus:border-lavender focus:ring-1 focus:ring-lavender outline-none transition-all bg-white"
              >
                <option value="Gyertya">Gyertya</option>
                <option value="Szett">Szett</option>
                <option value="Dekoráció">Dekoráció</option>
              </select>
            </div>
          </div>

          {/* Kép URL */}
          <div>
            <label className="block text-sm font-medium text-earth-dark mb-1">Kép URL</label>
            <div className="flex gap-2">
              <input
                type="url"
                value={formData.image}
                onChange={(e) => setFormData({...formData, image: e.target.value})}
                className="w-full px-4 py-2 rounded-lg border border-wax-200 focus:border-lavender focus:ring-1 focus:ring-lavender outline-none transition-all"
                placeholder="https://..."
              />
              <div className="w-10 h-10 flex-shrink-0 bg-wax-100 rounded-lg border border-wax-200 flex items-center justify-center overflow-hidden">
                {formData.image ? (
                  <img src={formData.image} alt="Preview" className="w-full h-full object-cover" />
                ) : (
                  <ImageIcon className="w-5 h-5 text-earth/50" />
                )}
              </div>
            </div>
          </div>

          {/* Leírás */}
          <div>
            <label className="block text-sm font-medium text-earth-dark mb-1">Leírás</label>
            <textarea
              required
              rows="3"
              value={formData.description}
              onChange={(e) => setFormData({...formData, description: e.target.value})}
              className="w-full px-4 py-2 rounded-lg border border-wax-200 focus:border-lavender focus:ring-1 focus:ring-lavender outline-none transition-all resize-none"
              placeholder="Rövid leírás a termékről..."
            />
          </div>

           {/* Jellemzők */}
           <div>
            <label className="block text-sm font-medium text-earth-dark mb-1">Jellemzők (vesszővel elválasztva)</label>
            <input
              type="text"
              value={formData.features}
              onChange={(e) => setFormData({...formData, features: e.target.value})}
              className="w-full px-4 py-2 rounded-lg border border-wax-200 focus:border-lavender focus:ring-1 focus:ring-lavender outline-none transition-all"
              placeholder="pl. 20 óra égés, Szójaviasz, Vegán"
            />
          </div>

          <div className="pt-4 flex gap-3">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-4 py-2 rounded-xl border border-wax-200 text-earth-dark hover:bg-wax-50 font-medium transition-colors"
            >
              Mégse
            </button>
            <button
              type="submit"
              className="flex-1 px-4 py-2 rounded-xl bg-lavender text-white hover:bg-lavender-dark font-medium transition-colors flex items-center justify-center gap-2"
            >
              <Save className="w-4 h-4" />
              Mentés
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ProductModal;
