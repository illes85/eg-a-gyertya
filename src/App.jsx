import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import About from './pages/About';
import Checkout from './pages/Checkout';
import AdminDashboard from './pages/AdminDashboard';
import AdminLayout from './layouts/AdminLayout';
import Navbar from './components/Navbar';
import Cart from './components/Cart';
import { products as initialProducts } from './data/products';

function App() {
  // Központi állapot
  const [products, setProducts] = useState(initialProducts);
  const [cartItems, setCartItems] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false); // Felemelt állapot

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
    setIsCartOpen(true); // Kosár megnyitása
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
      <Navbar cartItems={cartItems} setIsCartOpen={setIsCartOpen} />
      <Cart 
        isOpen={isCartOpen} 
        onClose={() => setIsCartOpen(false)}
        cartItems={cartItems}
        onRemoveItem={handleRemoveFromCart}
        onUpdateQuantity={handleUpdateQuantity}
      />
      <Routes>
        {/* Publikus oldal (Webshop) */}
        <Route 
          path="/" 
          element={
            <Home 
              products={products}
              addToCart={handleAddToCart}
            />
          } 
        />
        <Route path="/about" element={<About />} />
        <Route path="/checkout" element={<Checkout cartItems={cartItems} />} />

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