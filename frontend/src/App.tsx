import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Navbar } from './components/layout/Navbar';
import { Footer } from './components/layout/Footer';
import { HomePage } from './pages/HomePage';
import { ServicesPage } from './pages/ServicesPage';
import { PricingPage } from './pages/PricingPage';
import { AboutPage } from './pages/AboutPage';
import { ServiceDetailPage } from './pages/ServiceDetailPage';
import { EstimationPage } from './pages/EstimationPage';
import { ContactPage } from './pages/ContactPage';

const App: React.FC = () => {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/a-propos" element={<AboutPage />} />
        <Route path="/tarifs" element={<PricingPage />} />
        <Route path="/services" element={<ServicesPage />} />
        <Route path="/service/:id" element={<ServiceDetailPage />} />
        <Route path="/estimation" element={<EstimationPage />} />
        <Route path="/contact" element={<ContactPage />} />

      </Routes>
      <Footer />
    </Router>
  );
};

export default App;