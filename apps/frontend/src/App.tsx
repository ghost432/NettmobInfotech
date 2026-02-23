import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Layout } from "./components/layout/Layout";
import { Home } from "./pages/Home";
import { Services } from "./pages/Services";
import { About } from "./pages/About";
import { Contact } from "./pages/Contact";
import { Login } from "./pages/auth/Login";
import { Register } from "./pages/auth/Register";
import { Navigate } from "react-router-dom";
import { ProtectedRoute } from "./components/auth/ProtectedRoute";
import { AdminDashboard } from "./pages/admin/AdminDashboard";
import { ServiceDetail } from "./pages/ServiceDetail";
import { QuoteRequest } from "./pages/QuoteRequest";
import { CahierDesCharges } from "./pages/CahierDesCharges";
import NotFound from "./pages/NotFound";
import { Actus } from "./pages/Actus";
import { ActusDetail } from "./pages/ActusDetail";
import { Expertise } from "./pages/Expertise";
import { PrivacyPolicy } from "./pages/PrivacyPolicy";
import { RGPD } from "./pages/RGPD";
import { Preloader } from "./components/common/Preloader";
import { WhatsAppButton } from "./components/common/WhatsAppButton";
import { ScrollToTop } from "./components/common/ScrollToTop";
import { ScrollToTopButton } from "./components/common/ScrollToTopButton";
import { useLocation } from "react-router-dom";
import { useAnalytics } from "./hooks/useAnalytics";

import { LanguageWatcher } from "./components/common/LanguageWatcher";

function App() {
  return (
    <>
      <Preloader />
      <Router>
        <ScrollToTop />
        <Routes>
          <Route path="/en/*" element={<AppContent />} />
          <Route path="/es/*" element={<AppContent />} />
          <Route path="/de/*" element={<AppContent />} />
          <Route path="/*" element={<AppContent />} />
        </Routes>
      </Router>
    </>
  );
}

function AppContent() {
  const location = useLocation();
  const isAdminPage = location.pathname.startsWith("/admin");

  return (
    <>
      <LanguageWatcher />
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/services" element={<Services />} />
          <Route path="/services/:slug" element={<ServiceDetail />} />
          <Route path="/expertise" element={<Expertise />} />
          <Route path="/demande-de-devis" element={<QuoteRequest />} />
          <Route path="/cahier-des-charges" element={<CahierDesCharges />} />
          <Route path="/politique-confidentialite" element={<PrivacyPolicy />} />
          <Route path="/rgpd" element={<RGPD />} />

          <Route path="/actus" element={<Actus />} />
          <Route path="/actus/:slug" element={<ActusDetail />} />
          <Route path="/a-propos" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/admin" element={
            <ProtectedRoute adminOnly>
              <AdminDashboard />
            </ProtectedRoute>
          }>
            <Route index element={<Navigate to="stats" replace />} />
            <Route path="stats" element={<AdminDashboard />} />
            <Route path="messages" element={<AdminDashboard />} />
            <Route path="quotations" element={<AdminDashboard />} />
            <Route path="specifications" element={<AdminDashboard />} />
            <Route path="users" element={<AdminDashboard />} />
            <Route path="blog" element={<AdminDashboard />} />
            <Route path="analytics" element={<AdminDashboard />} />
            <Route path="ads" element={<AdminDashboard />} />
            <Route path="mailing" element={<AdminDashboard />} />
          </Route>
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Layout>
      {!isAdminPage && (
        <>
          <ScrollToTopButton />
          <WhatsAppButton />
        </>
      )}
      <AnalyticsTracker />
    </>
  );
}

function AnalyticsTracker() {
  useAnalytics();
  return null;
}

export default App;
