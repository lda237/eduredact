
  import React from 'react';
  import { Routes, Route, useLocation } from 'react-router-dom';
  import { Navbar } from './components/layout/Navbar';
  import { Footer } from './components/layout/Footer';
  import { HomePage } from './pages/HomePage';
  import { ServicesPage } from './pages/ServicesPage';
  import PricingPage from './pages/PricingPage';
  import { AboutPage } from './pages/AboutPage';
  import { ServiceDetailPage } from './pages/ServiceDetailPage';
  import { EstimationPage } from './pages/EstimationPage';
  import { ContactPage } from './pages/ContactPage';
  import LoginPage from './pages/LoginPage';
  import ClientDashboardPage from './pages/ClientDashboardPage';
  import WriterDashboardPage from './pages/WriterDashboardPage';
  import RegisterPage from './pages/RegisterPage';
  import { DashboardLayout } from './components/layout/DashboardLayout';

  
        
        const App: React.FC = () => {
          const location = useLocation();
          
          // Détermine si la route actuelle est un tableau de bord
          const isDashboardRoute = location.pathname.startsWith('/client/dashboard') || 
                                  location.pathname.startsWith('/writer/dashboard') ||
                                  location.pathname.startsWith('/orders') ||
                                  location.pathname.startsWith('/profile') ||
                                  location.pathname.startsWith('/messages');
          
          return (
            <>
              {!isDashboardRoute && <Navbar />}
              
              <Routes>
                {/* Public routes */}
                <Route path="/" element={<HomePage />} />
                <Route path="/services" element={<ServicesPage />} />
                <Route path="/pricing" element={<PricingPage />} />
                <Route path="/about" element={<AboutPage />} />
                <Route path="/service/:id" element={<ServiceDetailPage />} />
                <Route path="/estimation" element={<EstimationPage />} />
                <Route path="/contact" element={<ContactPage />} />
                <Route path="/login" element={<LoginPage />} />
                <Route path="/tarifs" element={<PricingPage />} />
                <Route path="/a-propos" element={<AboutPage />} />
                <Route path="/register" element={<RegisterPage />} />
                
                {/* Dashboard routes with layout */}
                <Route element={<DashboardLayout children={undefined}>{/* Will render nested routes here */}</DashboardLayout>}>
                  {/* Client routes */}
                  <Route path="/client" element={<ClientDashboardPage />} />
                  <Route path="/writer" element={<WriterDashboardPage />} />
                  <Route path="/orders" element={<div>Commandes du client</div>} />
                  <Route path="/profile" element={<div>Profil du client</div>} />
                  <Route path="/messages" element={<div>Messages</div>} />
                  
                  {/* Writer routes */}
                  <Route path="/writer/dashboard" element={<WriterDashboardPage />} />
                  <Route path="/writer/orders" element={<div>Commandes du rédacteur</div>} />
                  <Route path="/writer/profile" element={<div>Profil du rédacteur</div>} />
                </Route>
              </Routes>
              
              {!isDashboardRoute && <Footer />}
            </>
          );
        };
        
        export default App;
        