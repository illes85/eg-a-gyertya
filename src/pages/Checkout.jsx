import { Link } from 'react-router-dom';
import { ArrowLeft, CreditCard, Truck, CheckCircle, ShoppingBag } from 'lucide-react';
import { useState } from 'react';

const Checkout = ({ cartItems }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    address: '',
    city: '',
    zip: '',
    cardName: '',
    cardNumber: '',
    expiry: '',
    cvc: ''
  });
  const [isSuccess, setIsSuccess] = useState(false);

  const subtotal = cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);
  const shippingCost = subtotal > 15000 ? 0 : 1990;
  const total = subtotal + shippingCost;

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Itt lenne a validáció és a fizetési kapu hívás
    setTimeout(() => {
      setIsSuccess(true);
      window.scrollTo(0, 0);
    }, 1500);
  };

  if (isSuccess) {
    return (
      <div className="min-h-screen bg-wax-100 flex items-center justify-center p-4">
        <div className="bg-white p-8 md:p-12 rounded-3xl shadow-xl max-w-lg w-full text-center animate-scale-in">
          <div className="w-20 h-20 bg-green-100 text-green-500 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle className="w-10 h-10" />
          </div>
          <h2 className="text-3xl font-serif font-bold text-earth-dark mb-4">Sikeres rendelés!</h2>
          <p className="text-earth mb-8">
            Köszönjük a vásárlást, {formData.name}!<br/>
            A rendelésedről küldtünk egy visszaigazoló emailt a(z) {formData.email} címre.
          </p>
          <Link to="/" className="inline-block bg-lavender hover:bg-lavender-dark text-white px-8 py-3 rounded-full font-medium transition-colors">
            Vissza a főoldalra
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-wax-100 font-sans text-earth-dark">
      {/* Navbar */}
      <nav className="fixed w-full bg-white/80 backdrop-blur-md z-50 shadow-sm border-b border-wax-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <Link to="/" className="flex items-center gap-2 text-earth hover:text-lavender transition-colors">
              <ArrowLeft className="w-5 h-5" />
              <span className="font-medium hidden sm:inline">Vásárlás folytatása</span>
            </Link>
            <h1 className="text-xl font-serif font-bold text-lavender">Pénztár</h1>
            <div className="w-20"></div> 
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-12">
        <div className="lg:grid lg:grid-cols-12 lg:gap-x-12 lg:items-start">
          
          {/* Űrlap */}
          <section className="lg:col-span-7">
            <form onSubmit={handleSubmit} className="space-y-8">
              
              {/* Szállítási adatok */}
              <div className="bg-white p-6 rounded-2xl shadow-sm border border-wax-200">
                <h2 className="text-xl font-bold flex items-center gap-2 mb-6 text-earth-dark">
                  <Truck className="w-5 h-5 text-lavender" />
                  Szállítási adatok
                </h2>
                <div className="grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6">
                  <div className="sm:col-span-6">
                    <label className="block text-sm font-medium text-earth-dark mb-1">Teljes név</label>
                    <input type="text" name="name" required value={formData.name} onChange={handleChange} className="w-full px-4 py-2 rounded-lg border border-wax-200 focus:border-lavender focus:ring-1 focus:ring-lavender outline-none transition-all" />
                  </div>
                  <div className="sm:col-span-6">
                    <label className="block text-sm font-medium text-earth-dark mb-1">Email cím</label>
                    <input type="email" name="email" required value={formData.email} onChange={handleChange} className="w-full px-4 py-2 rounded-lg border border-wax-200 focus:border-lavender focus:ring-1 focus:ring-lavender outline-none transition-all" />
                  </div>
                  <div className="sm:col-span-6">
                    <label className="block text-sm font-medium text-earth-dark mb-1">Utca, házszám</label>
                    <input type="text" name="address" required value={formData.address} onChange={handleChange} className="w-full px-4 py-2 rounded-lg border border-wax-200 focus:border-lavender focus:ring-1 focus:ring-lavender outline-none transition-all" />
                  </div>
                  <div className="sm:col-span-3">
                    <label className="block text-sm font-medium text-earth-dark mb-1">Város</label>
                    <input type="text" name="city" required value={formData.city} onChange={handleChange} className="w-full px-4 py-2 rounded-lg border border-wax-200 focus:border-lavender focus:ring-1 focus:ring-lavender outline-none transition-all" />
                  </div>
                  <div className="sm:col-span-3">
                    <label className="block text-sm font-medium text-earth-dark mb-1">Irányítószám</label>
                    <input type="text" name="zip" required value={formData.zip} onChange={handleChange} className="w-full px-4 py-2 rounded-lg border border-wax-200 focus:border-lavender focus:ring-1 focus:ring-lavender outline-none transition-all" />
                  </div>
                </div>
              </div>

              {/* Fizetési adatok (Demo) */}
              <div className="bg-white p-6 rounded-2xl shadow-sm border border-wax-200">
                <h2 className="text-xl font-bold flex items-center gap-2 mb-6 text-earth-dark">
                  <CreditCard className="w-5 h-5 text-lavender" />
                  Fizetés (Biztonságos)
                </h2>
                <div className="grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6">
                   <div className="sm:col-span-6">
                    <label className="block text-sm font-medium text-earth-dark mb-1">Kártyán szereplő név</label>
                    <input type="text" name="cardName" required value={formData.cardName} onChange={handleChange} className="w-full px-4 py-2 rounded-lg border border-wax-200 focus:border-lavender focus:ring-1 focus:ring-lavender outline-none transition-all" />
                  </div>
                   <div className="sm:col-span-6">
                    <label className="block text-sm font-medium text-earth-dark mb-1">Kártyaszám</label>
                    <input type="text" name="cardNumber" required placeholder="0000 0000 0000 0000" value={formData.cardNumber} onChange={handleChange} className="w-full px-4 py-2 rounded-lg border border-wax-200 focus:border-lavender focus:ring-1 focus:ring-lavender outline-none transition-all" />
                  </div>
                  <div className="sm:col-span-3">
                    <label className="block text-sm font-medium text-earth-dark mb-1">Lejárat (HH/ÉÉ)</label>
                    <input type="text" name="expiry" required placeholder="MM/YY" value={formData.expiry} onChange={handleChange} className="w-full px-4 py-2 rounded-lg border border-wax-200 focus:border-lavender focus:ring-1 focus:ring-lavender outline-none transition-all" />
                  </div>
                   <div className="sm:col-span-3">
                    <label className="block text-sm font-medium text-earth-dark mb-1">CVC</label>
                    <input type="text" name="cvc" required placeholder="123" value={formData.cvc} onChange={handleChange} className="w-full px-4 py-2 rounded-lg border border-wax-200 focus:border-lavender focus:ring-1 focus:ring-lavender outline-none transition-all" />
                  </div>
                </div>
              </div>

              <button type="submit" className="w-full bg-lavender hover:bg-lavender-dark text-white text-lg font-bold py-4 rounded-2xl shadow-lg hover:shadow-xl transition-all transform hover:-translate-y-1">
                Megrendelés elküldése ({total.toLocaleString()} Ft)
              </button>
            </form>
          </section>

          {/* Összesítés */}
          <section className="lg:col-span-5 mt-12 lg:mt-0">
             <div className="bg-white p-6 rounded-2xl shadow-sm border border-wax-200 sticky top-24">
                <h2 className="text-xl font-bold flex items-center gap-2 mb-6 text-earth-dark">
                  <ShoppingBag className="w-5 h-5 text-lavender" />
                  Rendelés összesítése
                </h2>
                
                {cartItems.length === 0 ? (
                    <div className="text-center py-8 text-earth">A kosarad üres.</div>
                ) : (
                    <ul className="divide-y divide-wax-100">
                        {cartItems.map((item) => (
                            <li key={item.id} className="py-4 flex items-start">
                                <img src={item.image} alt={item.name} className="w-16 h-16 rounded-lg object-cover border border-wax-200 bg-wax-50" />
                                <div className="ml-4 flex-1">
                                    <h3 className="font-medium text-earth-dark">{item.name}</h3>
                                    <p className="text-sm text-earth text-sm mt-1">{item.quantity} db x {item.price.toLocaleString()} Ft</p>
                                </div>
                                <div className="font-medium text-earth-dark">{(item.price * item.quantity).toLocaleString()} Ft</div>
                            </li>
                        ))}
                    </ul>
                )}

                <div className="border-t border-wax-200 mt-6 pt-6 space-y-4">
                    <div className="flex justify-between text-earth">
                        <span>Részösszeg</span>
                        <span>{subtotal.toLocaleString()} Ft</span>
                    </div>
                     <div className="flex justify-between text-earth">
                        <span>Szállítás</span>
                        <span>{shippingCost === 0 ? 'Ingyenes' : `${shippingCost.toLocaleString()} Ft`}</span>
                    </div>
                    <div className="flex justify-between text-xl font-bold text-earth-dark border-t border-wax-200 pt-4">
                        <span>Összesen</span>
                        <span>{total.toLocaleString()} Ft</span>
                    </div>
                </div>
             </div>
          </section>
        </div>
      </main>
    </div>
  );
};

export default Checkout;
