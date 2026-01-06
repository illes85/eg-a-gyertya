import { Package, DollarSign, TrendingUp, Users, Plus, Pencil, Trash2 } from 'lucide-react';
import { useState } from 'react';
import ProductModal from '../components/ProductModal';

const AdminDashboard = ({ products, onAddProduct, onUpdateProduct, onDeleteProduct }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentProduct, setCurrentProduct] = useState(null);

  const stats = [
    { title: 'Összes termék', value: products.length, icon: Package, color: 'text-blue-500', bg: 'bg-blue-100' },
    { title: 'Bevétel', value: '125.000 Ft', icon: DollarSign, color: 'text-green-500', bg: 'bg-green-100' },
    { title: 'Látogatók', value: '1,234', icon: Users, color: 'text-purple-500', bg: 'bg-purple-100' },
    { title: 'Növekedés', value: '+12%', icon: TrendingUp, color: 'text-orange-500', bg: 'bg-orange-100' },
  ];

  const handleOpenAdd = () => {
    setCurrentProduct(null);
    setIsModalOpen(true);
  };

  const handleOpenEdit = (product) => {
    setCurrentProduct(product);
    setIsModalOpen(true);
  };

  const handleSave = (productData) => {
    if (currentProduct) {
      // Szerkesztés
      onUpdateProduct({ ...currentProduct, ...productData });
    } else {
      // Új hozzáadása
      onAddProduct(productData);
    }
  };

  return (
    <div className="space-y-8">
      {/* Stat Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <div key={index} className="bg-white p-6 rounded-2xl border border-wax-200 shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <div className={`p-3 rounded-xl ${stat.bg} ${stat.color}`}>
                <stat.icon className="w-6 h-6" />
              </div>
            </div>
            <h3 className="text-earth text-sm font-medium">{stat.title}</h3>
            <p className="text-2xl font-bold text-earth-dark mt-1">{stat.value}</p>
          </div>
        ))}
      </div>

      {/* Product List */}
      <div className="bg-white rounded-2xl border border-wax-200 shadow-sm overflow-hidden">
        <div className="px-6 py-4 border-b border-wax-200 flex justify-between items-center">
          <h3 className="font-bold text-earth-dark">Termékek listája</h3>
          <button 
            onClick={handleOpenAdd}
            className="flex items-center gap-2 bg-lavender hover:bg-lavender-dark text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors"
          >
            <Plus className="w-4 h-4" />
            Új termék
          </button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-wax-50 text-earth text-xs uppercase font-medium">
              <tr>
                <th className="px-6 py-3">Termék</th>
                <th className="px-6 py-3">Kategória</th>
                <th className="px-6 py-3">Ár</th>
                <th className="px-6 py-3 text-right">Művelet</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-wax-100">
              {products.map((product) => (
                <tr key={product.id} className="hover:bg-wax-50/50 transition-colors">
                  <td className="px-6 py-4 flex items-center gap-3">
                    <img src={product.image} alt={product.name} className="w-10 h-10 rounded-lg object-cover" />
                    <span className="font-medium text-earth-dark">{product.name}</span>
                  </td>
                  <td className="px-6 py-4 text-earth">{product.category}</td>
                  <td className="px-6 py-4 font-medium text-earth-dark">{product.price.toLocaleString()} Ft</td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <button 
                        onClick={() => handleOpenEdit(product)}
                        className="p-2 text-earth hover:text-lavender hover:bg-lavender/10 rounded-lg transition-colors"
                        title="Szerkesztés"
                      >
                        <Pencil className="w-4 h-4" />
                      </button>
                      <button 
                        onClick={() => onDeleteProduct(product.id)}
                        className="p-2 text-earth hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                        title="Törlés"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal */}
      <ProductModal 
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSave={handleSave}
        productToEdit={currentProduct}
      />
    </div>
  );
};

export default AdminDashboard;
