import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// Components
import Header from './components/layout/Header';
import Footer from './components/layout/Footer';

// Pages
import HomePage from './pages/HomePage';
import ProductListingPage from './pages/ProductListingPage';
import ProductDetailPage from './pages/ProductDetailPage';
import CheckoutPage from './pages/CheckoutPage';
import ProfilePage from './pages/ProfilePage';
import NotFoundPage from './pages/NotFoundPage';

// Admin Pages
import AdminDashboard from './pages/admin/AdminDashboard';
import UserManagement from './pages/admin/UserManagement';
import BookingManagement from './pages/admin/BookingManagement';
import CommissionManagement from './pages/admin/CommissionManagement';
import DisputeCenter from './pages/admin/DisputeCenter';
import CMSManagement from './pages/admin/CMSManagement';
import NotificationCenter from './pages/admin/NotificationCenter';
import AnalyticsDashboard from './pages/admin/AnalyticsDashboard';
import PromotionManagement from './pages/admin/PromotionManagement';

// Chat Components
import ChatWidget from './components/chat/ChatWidget';

// PWA Registration
import { registerSW } from './pwa';

function App() {
  // Register service worker for PWA
  React.useEffect(() => {
    registerSW();
  }, []);

  return (
    <Router>
      <div className="flex flex-col min-h-screen bg-gray-50">
        <Header />
        <main className="flex-grow">
          <Routes>
            {/* Public Routes */}
            <Route path="/" element={<HomePage />} />
            <Route path="/products" element={<ProductListingPage />} />
            <Route path="/products/:id" element={<ProductDetailPage />} />
            <Route path="/checkout" element={<CheckoutPage />} />
            <Route path="/profile" element={<ProfilePage />} />

            {/* Admin Routes */}
            <Route path="/admin" element={<AdminDashboard />} />
            <Route path="/admin/users" element={<UserManagement />} />
            <Route path="/admin/bookings" element={<BookingManagement />} />
            <Route path="/admin/commissions" element={<CommissionManagement />} />
            <Route path="/admin/disputes" element={<DisputeCenter />} />
            <Route path="/admin/cms" element={<CMSManagement />} />
            <Route path="/admin/notifications" element={<NotificationCenter />} />
            <Route path="/admin/analytics" element={<AnalyticsDashboard />} />
            <Route path="/admin/promotions" element={<PromotionManagement />} />

            {/* 404 Route */}
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </main>
        <Footer />
        <ChatWidget />
      </div>
    </Router>
  );
}

export default App;