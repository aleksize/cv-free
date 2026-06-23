import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Landing from './pages/Landing';
import Builder from './pages/Builder';
import PrivacyPolicy from './pages/PrivacyPolicy';
import TermsOfService from './pages/TermsOfService';
import CookieConsent from './components/CookieConsent';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/builder" element={<Builder />} />
        <Route path="/polityka-prywatnosci" element={<PrivacyPolicy />} />
        <Route path="/regulamin" element={<TermsOfService />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
      <CookieConsent />
    </BrowserRouter>
  );
}
