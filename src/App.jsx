import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import AdminDashboard from './pages/AdminDashboard';
import AdminLayout from './layouts/AdminLayout';
import { products as initialProducts } from './data/products';

function App() {
  // Központi állapot a termékeknek, hogy az admin felületen is módosítható legyen
  const [products, setProducts] = useState(initialProducts);
  const [cartItems, setCartItems] = useState([]);

  // --- Webshop Logic ---
  const handleAddToCart = (product) => {
    setCartItems(prevItems => {
      const existingItem = prevItems.find(item => item.id === product.id);
      if (existingItem) {
        return prevItems.map(item =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prevItems, { ...product, quantity: 1 }];
    });
  };

  const handleRemoveFromCart = (productId) => {
    setCartItems(prevItems => prevItems.filter(item => item.id !== productId));
  };

  const handleUpdateQuantity = (productId, newQuantity) => {
    if (newQuantity === 0) {
      handleRemoveFromCart(productId);
      return;
    }
    setCartItems(prevItems =>
      prevItems.map(item =>
        item.id === productId
          ? { ...item, quantity: newQuantity }
          : item
      )
    );
  };

  // --- Admin Logic ---
  const handleAddProduct = (newProductData) => {
    const newId = products.length > 0 ? Math.max(...products.map(p => p.id)) + 1 : 1;
    const newProduct = { ...newProductData, id: newId };
    setProducts([...products, newProduct]);
  };

  const handleUpdateProduct = (updatedProduct) => {
    setProducts(products.map(p => p.id === updatedProduct.id ? updatedProduct : p));
  };

  const handleDeleteProduct = (productId) => {
    if (window.confirm('Biztosan törölni szeretnéd ezt a terméket?')) {
      setProducts(products.filter(p => p.id !== productId));
    }
  };

  return (
    <Router>
      <Routes>
        {/* Publikus oldal (Webshop) */}
        <Route 
          path="/" 
          element={
            <Home 
              products={products}
              cartItems={cartItems}
              addToCart={handleAddToCart}
              removeFromCart={handleRemoveFromCart}
              updateQuantity={handleUpdateQuantity}
            />
          } 
        />

        {/* Admin oldal */}
        <Route 
          path="/admin" 
          element={
            <AdminLayout>
              <AdminDashboard 
                products={products} 
                onAddProduct={handleAddProduct}
                onUpdateProduct={handleUpdateProduct}
                onDeleteProduct={handleDeleteProduct}
              />
            </AdminLayout>
          } 
        />
      </Routes>
    </Router>
  );
}

export default App;


