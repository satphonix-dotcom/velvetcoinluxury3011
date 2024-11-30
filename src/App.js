import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './store';
import { useAuth } from './hooks/useAuth';

// Pages
import Home from './components/pages/Home';
import About from './components/pages/About';
import FAQ from './components/pages/FAQ';
import Terms from './components/pages/Terms';
import Privacy from './components/pages/Privacy';
import Shipping from './components/pages/Shipping';
import ProductDetails from './components/products/ProductDetails';
import ProductList from './components/products/ProductList';
import Login from './components/auth/Login';
import Register from './components/auth/Register';
import Profile from './components/auth/Profile';
import PrivateRoute from './components/auth/PrivateRoute';
import CartPage from './components/cart/CartPage';
import CheckoutPage from './components/checkout/CheckoutPage';
import OrderConfirmation from './components/checkout/OrderConfirmation';
import SearchResults from './components/search/SearchResults';
import OrderList from './components/orders/OrderList';
import OrderDetails from './components/orders/OrderDetails';
import VendorDashboard from './components/vendor/VendorDashboard';
import VendorOrders from './components/vendor/OrderManagement';
import VendorRegistration from './components/vendor/VendorRegistration';

// Admin Components
import AdminDashboard from './components/admin/AdminDashboard';
import AdminProducts from './components/admin/ProductManagement';
import AdminUsers from './components/admin/UserManagement';
import AdminOrders from './components/admin/OrderManagement';
import AdminContent from './components/admin/ContentEditor';
import AdminAnalytics from './components/admin/Analytics';
import AdminSettings from './components/admin/Settings';

const AppContent = () => {
  useAuth();

  return (
    <Routes>
      {/* Public Routes */}
      <Route path="/" element={<Home />} />
      <Route path="/about" element={<About />} />
      <Route path="/faq" element={<FAQ />} />
      <Route path="/terms" element={<Terms />} />
      <Route path="/privacy" element={<Privacy />} />
      <Route path="/shipping" element={<Shipping />} />
      <Route path="/products" element={<ProductList />} />
      <Route path="/product/:id" element={<ProductDetails />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/cart" element={<CartPage />} />
      <Route path="/search" element={<SearchResults />} />
      <Route path="/vendor/register" element={<VendorRegistration />} />

      {/* Protected Routes */}
      <Route path="/profile" element={<PrivateRoute><Profile /></PrivateRoute>} />
      <Route path="/checkout" element={<PrivateRoute><CheckoutPage /></PrivateRoute>} />
      <Route path="/order-confirmation/:orderId" element={<PrivateRoute><OrderConfirmation /></PrivateRoute>} />
      <Route path="/orders" element={<PrivateRoute><OrderList /></PrivateRoute>} />
      <Route path="/orders/:orderId" element={<PrivateRoute><OrderDetails /></PrivateRoute>} />

      {/* Vendor Routes */}
      <Route path="/vendor/dashboard" element={<PrivateRoute roles={['vendor']}><VendorDashboard /></PrivateRoute>} />
      <Route path="/vendor/orders" element={<PrivateRoute roles={['vendor']}><VendorOrders /></PrivateRoute>} />

      {/* Admin Routes */}
      <Route path="/admin" element={<PrivateRoute roles={['admin']}><AdminDashboard /></PrivateRoute>} />
      <Route path="/admin/products" element={<PrivateRoute roles={['admin']}><AdminProducts /></PrivateRoute>} />
      <Route path="/admin/users" element={<PrivateRoute roles={['admin']}><AdminUsers /></PrivateRoute>} />
      <Route path="/admin/orders" element={<PrivateRoute roles={['admin']}><AdminOrders /></PrivateRoute>} />
      <Route path="/admin/content" element={<PrivateRoute roles={['admin']}><AdminContent /></PrivateRoute>} />
      <Route path="/admin/analytics" element={<PrivateRoute roles={['admin']}><AdminAnalytics /></PrivateRoute>} />
      <Route path="/admin/settings" element={<PrivateRoute roles={['admin']}><AdminSettings /></PrivateRoute>} />
    </Routes>
  );
};

function App() {
  return (
    <Provider store={store}>
      <Router>
        <AppContent />
      </Router>
    </Provider>
  );
}

export default App;