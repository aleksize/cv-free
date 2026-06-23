import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

// ==========================================
// KONFIGURACJA IDENTYFIKATORÓW ŚLEDZENIA
// Wpisz tutaj swoje klucze, aby włączyć statystyki
// ==========================================
const GA_TRACKING_ID = 'G-FLKT77XSGS'; // Np. 'G-XXXXXXXXXX'
const FB_PIXEL_ID = '';    // Np. '123456789012345'

/**
 * Inicjalizacja skryptów analitycznych i śledzących po wyrażeniu zgody
 */
function initTracking(gaId: string, pixelId: string) {
  // 1. Google Analytics (GA4)
  if (gaId && !document.getElementById('ga-script')) {
    const script1 = document.createElement('script');
    script1.id = 'ga-script';
    script1.async = true;
    script1.src = `https://www.googletagmanager.com/gtag/js?id=${gaId}`;
    document.head.appendChild(script1);

    const script2 = document.createElement('script');
    script2.id = 'ga-init-script';
    script2.innerHTML = `
      window.dataLayer = window.dataLayer || [];
      function gtag(){dataLayer.push(arguments);}
      gtag('js', new Date());
      gtag('config', '${gaId}', { 'anonymize_ip': true });
    `;
    document.head.appendChild(script2);
  }

  // 2. Facebook Pixel
  if (pixelId && !document.getElementById('fb-pixel-script')) {
    const scriptPixel = document.createElement('script');
    scriptPixel.id = 'fb-pixel-script';
    scriptPixel.innerHTML = `
      !function(f,b,e,v,n,t,s)
      {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
      n.callMethod.apply(n,arguments):n.queue.push(arguments)};
      if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
      n.queue=[];t=b.createElement(e);t.async=!0;
      t.src=v;s=b.getElementsByTagName(e)[0];
      s.parentNode.insertBefore(t,s)}(window, document,'script',
      'https://connect.facebook.net/en_US/fbevents.js');
      fbq('init', '${pixelId}');
      fbq('track', 'PageView');
    `;
    document.head.appendChild(scriptPixel);
  }
}

export default function CookieConsent() {
  const [showBanner, setShowBanner] = useState(false);

  useEffect(() => {
    // Sprawdź czy użytkownik dokonał już wyboru
    const consent = localStorage.getItem('cv-free-cookie-consent');
    if (!consent) {
      // Pokaż baner z małym opóźnieniem
      const timer = setTimeout(() => setShowBanner(true), 1200);
      return () => clearTimeout(timer);
    } else if (consent === 'all') {
      // Wyrażono zgodę - załaduj skrypty od razu
      initTracking(GA_TRACKING_ID, FB_PIXEL_ID);
    }
  }, []);

  const handleAcceptAll = () => {
    localStorage.setItem('cv-free-cookie-consent', 'all');
    setShowBanner(false);
    initTracking(GA_TRACKING_ID, FB_PIXEL_ID);
  };

  const handleRejectAll = () => {
    localStorage.setItem('cv-free-cookie-consent', 'rejected');
    setShowBanner(false);
  };

  if (!showBanner) return null;

  return (
    <div className="fixed bottom-4 left-4 right-4 md:left-auto md:right-6 md:max-w-md z-50 animate-fade-in-up">
      <div className="bg-white/95 backdrop-blur-md border border-slate-200/80 rounded-2xl p-5 shadow-2xl flex flex-col gap-4">
        {/* Header / Icon */}
        <div className="flex items-start gap-3">
          <div className="h-10 w-10 rounded-xl bg-sky-50 text-sky-500 flex items-center justify-center shrink-0">
            <span className="material-symbols-outlined text-2xl font-bold">cookie</span>
          </div>
          <div className="space-y-1">
            <h4 className="text-sm font-bold text-slate-900 tracking-tight">Szanujemy Twoją prywatność</h4>
            <p className="text-xs text-slate-500 leading-relaxed">
              Używamy plików cookie i technologii śledzących, aby mierzyć ruch i optymalizować działanie naszego darmowego kreatora CV.
            </p>
          </div>
        </div>

        {/* Content Link */}
        <p className="text-[11px] text-slate-400 leading-normal">
          Zgadzając się na wszystkie pliki cookie pomagasz nam rozwijać projekt. Więcej szczegółów przeczytasz w naszej{' '}
          <Link to="/polityka-prywatnosci" className="text-sky-600 hover:underline font-semibold">
            Polityce Prywatności
          </Link>
          .
        </p>

        {/* Actions */}
        <div className="flex items-center gap-3 mt-1">
          <button
            onClick={handleRejectAll}
            className="flex-1 rounded-xl border border-slate-200 hover:border-slate-300 hover:bg-slate-50 py-2.5 text-xs font-bold text-slate-600 transition cursor-pointer text-center"
          >
            Odrzuć
          </button>
          <button
            onClick={handleAcceptAll}
            className="flex-1 rounded-xl bg-sky-500 hover:bg-sky-600 text-white py-2.5 text-xs font-bold shadow-md hover:shadow-lg transition cursor-pointer text-center"
          >
            Akceptuj wszystkie
          </button>
        </div>
      </div>
    </div>
  );
}
