import { X, Trash2, Plus, Minus, ShoppingBag } from 'lucide-react';

const Cart = ({ isOpen, onClose, cartItems, onRemoveItem, onUpdateQuantity }) => {
  const totalPrice = cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/30 backdrop-blur-sm transition-opacity" 
        onClick={onClose}
      />
      
      {/* Sidebar */}
      <div className="absolute inset-y-0 right-0 max-w-md w-full flex pl-10 pointer-events-none">
        <div className="w-full h-full bg-white shadow-2xl pointer-events-auto flex flex-col transform transition-transform duration-300 animate-slide-in">
          
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b border-wax-200">
            <h2 className="text-xl font-serif font-bold text-earth-dark flex items-center gap-2">
              <ShoppingBag className="w-5 h-5" />
              Kosár
            </h2>
            <button 
              onClick={onClose}
              className="p-2 hover:bg-wax-100 rounded-full transition-colors text-earth"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          {/* Cart Items */}
          <div className="flex-1 overflow-y-auto p-6">
            {cartItems.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-center text-earth-light space-y-4">
                <ShoppingBag className="w-16 h-16 opacity-20" />
                <p className="text-lg">A kosarad jelenleg üres.</p>
                <button 
                  onClick={onClose}
                  className="text-lavender font-medium hover:underline"
                >
                  Vásárlás folytatása
                </button>
              </div>
            ) : (
              <ul className="space-y-6">
                {cartItems.map((item) => (
                  <li key={item.id} className="flex py-2">
                    <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-wax-200">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="h-full w-full object-cover object-center"
                      />
                    </div>

                    <div className="ml-4 flex flex-1 flex-col">
                      <div>
                        <div className="flex justify-between text-base font-medium text-earth-dark">
                          <h3>{item.name}</h3>
                          <p className="ml-4">{(item.price * item.quantity).toLocaleString()} Ft</p>
                        </div>
                        <p className="mt-1 text-sm text-earth">{item.category}</p>
                      </div>
                      <div className="flex flex-1 items-end justify-between text-sm">
                        <div className="flex items-center border border-wax-200 rounded-lg">
                            <button 
                              onClick={() => onUpdateQuantity(item.id, Math.max(0, item.quantity - 1))}
                              className="p-2 hover:bg-wax-100 rounded-l-lg transition-colors"
                            >
                                <Minus className="w-3 h-3" />
                            </button>
                            <span className="px-3 font-medium text-earth-dark">{item.quantity}</span>
                            <button 
                               onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}
                               className="p-2 hover:bg-wax-100 rounded-r-lg transition-colors"
                            >
                                <Plus className="w-3 h-3" />
                            </button>
                        </div>

                        <button
                          type="button"
                          onClick={() => onRemoveItem(item.id)}
                          className="font-medium text-red-500 hover:text-red-600 flex items-center gap-1 transition-colors"
                        >
                          <Trash2 className="w-4 h-4" />
                          <span className="hidden sm:inline">Törlés</span>
                        </button>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </div>

          {/* Footer */}
          {cartItems.length > 0 && (
            <div className="border-t border-wax-200 p-6 bg-wax-50">
              <div className="flex justify-between text-base font-medium text-earth-dark mb-4">
                <p>Összesen</p>
                <p className="text-xl font-bold font-serif">{totalPrice.toLocaleString()} Ft</p>
              </div>
              <p className="mt-0.5 text-sm text-earth mb-6">
                A szállítási költség a pénztárnál kerül kiszámításra.
              </p>
              <button
                className="w-full rounded-full border border-transparent bg-lavender px-6 py-4 text-base font-medium text-white shadow-sm hover:bg-lavender-dark transition-all hover:shadow-lg"
              >
                Tovább a pénztárhoz
              </button>
              <div className="mt-6 flex justify-center text-center text-sm text-earth">
                <p>
                  vagy{' '}
                  <button
                    type="button"
                    className="font-medium text-lavender hover:text-lavender-dark"
                    onClick={onClose}
                  >
                    Vásárlás folytatása
                    <span aria-hidden="true"> &rarr;</span>
                  </button>
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Cart;
