import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCvStore } from '../stores/cvStore';
import { HTMLPreview } from '../templates/HTMLPreviews';


const templates = [
  { id: 'modern', name: 'Nowoczesny', desc: 'Przejrzysty i zbalansowany układ dwukolumnowy. Świetny dla marketingu, sprzedaży i pracy biurowej.', bgGradient: 'from-sky-400 to-blue-500' },
  { id: 'classic', name: 'Klasyczny', desc: 'Tradycyjny, elegancki szablon z centrowanym nagłówkiem. Idealny dla stanowisk kierowniczych, finansów i prawa.', bgGradient: 'from-slate-700 to-slate-900' },
  { id: 'minimal', name: 'Minimalistyczny', desc: 'Maksymalnie uproszczona struktura stawiająca na czytelność tekstu. Wybór projektantów i minimalistów.', bgGradient: 'from-zinc-400 to-zinc-500' },
  { id: 'technical', name: 'Techniczny', desc: 'Zagęszczony układ z elementami o stałej szerokości (monospace). Stworzony dla programistów i inżynierów.', bgGradient: 'from-emerald-400 to-teal-500' },
];

const accentColors = [
  { id: 'sky', value: '#0ea5e9' },
  { id: 'navy', value: '#1e3a8a' },
  { id: 'emerald', value: '#10b981' },
  { id: 'rose', value: '#f43f5e' },
];

export default function Landing() {
  const navigate = useNavigate();
  const { data, setTemplate, setColorPreset } = useCvStore();
  
  // States for interactive hero mockup
  const [selectedTemplate, setSelectedTemplate] = useState('modern');
  const [selectedColor, setSelectedColor] = useState('#0ea5e9');

  const startWithTemplate = (templateId: string) => {
    setTemplate(templateId);
    navigate('/builder');
  };

  const handleStartFree = () => {
    setTemplate(selectedTemplate);
    setColorPreset(selectedColor);
    navigate('/builder');
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 selection:bg-sky-500/10 selection:text-sky-600 font-sans">
      {/* Navigation */}
      <header className="sticky top-0 z-40 bg-white/80 backdrop-blur-md border-b border-slate-200/65">
        <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 md:px-6">
          <div className="flex items-center gap-2">
            <span className="h-7 w-7 rounded-lg bg-gradient-to-tr from-sky-400 to-blue-600 flex items-center justify-center text-white font-black text-sm shadow-xs">
              C
            </span>
            <span className="text-base font-extrabold tracking-tight text-slate-900">cv-free.pl</span>
          </div>
          <nav className="hidden md:flex items-center gap-6 text-sm font-semibold text-slate-600">
            <a href="#templates" className="hover:text-slate-900 transition">Szablony</a>
            <a href="#benefits" className="hover:text-slate-900 transition">Zalety</a>
            <a href="#faq" className="hover:text-slate-900 transition">FAQ</a>
          </nav>
          <button
            onClick={handleStartFree}
            className="rounded-xl bg-sky-500 hover:bg-sky-600 text-white px-4 py-2 text-xs font-bold shadow-md hover:shadow-lg transition cursor-pointer"
          >
            Stwórz CV
          </button>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative mx-auto max-w-6xl px-4 py-12 md:px-6 md:py-24 grid gap-12 md:grid-cols-2 md:items-center">
        {/* Left Side: Copy */}
        <div className="space-y-6 max-w-lg">
          <span className="inline-flex items-center gap-1.5 rounded-full bg-sky-50 border border-sky-100 text-sky-600 px-3 py-1 text-xs font-semibold">
            <span className="h-1.5 w-1.5 rounded-full bg-sky-500 animate-pulse" />
            100% Darmowy Kreator CV • Bez Logowania
          </span>
          <h1 className="text-3xl font-extrabold tracking-tight text-slate-900 sm:text-5xl leading-tight">
            Stwórz profesjonalne CV w 5 minut. <span className="bg-gradient-to-r from-sky-500 to-blue-600 bg-clip-text text-transparent">Całkowicie za darmo.</span>
          </h1>
          <p className="text-slate-500 text-sm sm:text-base leading-relaxed">
            Bez zakładania konta, bez ukrytych opłat i bez szpecących znaków wodnych. Twoje dane są w pełni bezpieczne i nie opuszczają Twojej przeglądarki.
          </p>
          <div className="flex flex-col sm:flex-row gap-3">
            <button
              onClick={handleStartFree}
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-sky-500 to-blue-600 px-6 py-3.5 text-sm font-bold text-white shadow-md hover:shadow-lg transition cursor-pointer"
            >
              Rozpocznij za darmo
              <span className="material-symbols-outlined text-lg">arrow_forward</span>
            </button>
            <a
              href="#templates"
              className="inline-flex items-center justify-center rounded-xl bg-white border border-slate-200 hover:border-slate-300 text-slate-700 px-6 py-3.5 text-sm font-bold shadow-xs transition"
            >
              Zobacz szablony
            </a>
          </div>
          {/* Trust points */}
          <div className="grid grid-cols-2 gap-x-4 gap-y-2 pt-2 text-xs font-semibold text-slate-500">
            <div className="flex items-center gap-1.5">
              <span className="material-symbols-outlined text-emerald-500 text-base font-bold">check_circle</span>
              <span>Zgodne z systemami ATS</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="material-symbols-outlined text-emerald-500 text-base font-bold">check_circle</span>
              <span>100% Prywatności danych</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="material-symbols-outlined text-emerald-500 text-base font-bold">check_circle</span>
              <span>Format PDF wysokiej jakości</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="material-symbols-outlined text-emerald-500 text-base font-bold">check_circle</span>
              <span>Brak znaków wodnych</span>
            </div>
          </div>
        </div>

        {/* Right Side: Interactive Mockup Widget */}
        <div className="bg-white border border-slate-200 rounded-3xl p-6 shadow-xl relative group">
          {/* Floating Widget Header */}
          <div className="flex items-center justify-between mb-4 pb-4 border-b border-slate-100">
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Podgląd na żywo</span>
            </div>
            {/* Color Switcher */}
            <div className="flex items-center gap-1.5">
              {accentColors.map((color) => (
                <button
                  key={color.id}
                  onClick={() => setSelectedColor(color.value)}
                  className={`h-5 w-5 rounded-full border transition hover:scale-105 cursor-pointer ${
                    selectedColor === color.value ? 'border-slate-800 scale-105 ring-2 ring-slate-800/10' : 'border-slate-200'
                  }`}
                  style={{ backgroundColor: color.value }}
                />
              ))}
            </div>
          </div>

          {/* Miniature Interactive Resume Representation */}
          <div className="rounded-xl border border-slate-200/80 bg-white p-5 min-h-[300px] flex flex-col justify-between shadow-xs select-none">
            {selectedTemplate === 'modern' ? (
              // Modern Mockup
              <div className="space-y-4">
                <div className="flex items-center gap-3 border-b pb-3" style={{ borderBottomColor: selectedColor }}>
                  <div className="h-10 w-10 rounded-full bg-slate-100 border flex items-center justify-center text-slate-400 shrink-0">
                    <span className="material-symbols-outlined text-xl">person</span>
                  </div>
                  <div>
                    <div className="h-4 w-28 bg-slate-800 rounded-md" />
                    <div className="h-2.5 w-20 bg-slate-200 rounded-md mt-1" style={{ backgroundColor: `${selectedColor}30` }} />
                  </div>
                </div>
                <div className="grid grid-cols-[80px_1fr] gap-4">
                  <div className="space-y-3">
                    <div className="h-2 w-12 rounded bg-slate-300" style={{ backgroundColor: selectedColor }} />
                    <div className="space-y-1.5">
                      <div className="h-2 w-16 bg-slate-150 rounded" />
                      <div className="h-2 w-14 bg-slate-150 rounded" />
                    </div>
                    <div className="h-2 w-16 rounded bg-slate-300" style={{ backgroundColor: selectedColor }} />
                    <div className="flex flex-wrap gap-1">
                      <div className="h-3 w-8 bg-slate-100 rounded" />
                      <div className="h-3 w-10 bg-slate-100 rounded" />
                    </div>
                  </div>
                  <div className="space-y-3">
                    <div className="h-2 w-16 bg-slate-300 rounded" />
                    <div className="space-y-1">
                      <div className="h-1.5 w-full bg-slate-100 rounded" />
                      <div className="h-1.5 w-full bg-slate-100 rounded" />
                      <div className="h-1.5 w-2/3 bg-slate-100 rounded" />
                    </div>
                    <div className="h-2 w-16 bg-slate-300 rounded" />
                    <div className="space-y-1.5">
                      <div className="h-2 w-24 bg-slate-800 rounded" />
                      <div className="h-1.5 w-16 bg-slate-200 rounded" />
                    </div>
                  </div>
                </div>
              </div>
            ) : selectedTemplate === 'classic' ? (
              // Classic Mockup
              <div className="space-y-4 text-center">
                <div className="border-b pb-3 flex flex-col items-center">
                  <div className="h-4.5 w-36 bg-slate-800 rounded-md" />
                  <div className="h-2.5 w-24 bg-slate-200 rounded-md mt-1.5" style={{ backgroundColor: `${selectedColor}30` }} />
                  <div className="h-2 w-48 bg-slate-100 rounded-md mt-2" />
                </div>
                <div className="space-y-3 text-left">
                  <div className="h-2.5 w-full border-b" style={{ borderBottomColor: selectedColor }} />
                  <div className="space-y-1.5">
                    <div className="flex justify-between">
                      <div className="h-2.5 w-28 bg-slate-800 rounded" />
                      <div className="h-2 w-12 bg-slate-100 rounded" />
                    </div>
                    <div className="h-2 w-16 bg-slate-300 rounded" />
                    <div className="h-1.5 w-full bg-slate-100 rounded" />
                  </div>
                  <div className="h-2.5 w-full border-b" style={{ borderBottomColor: selectedColor }} />
                  <div className="flex justify-between">
                    <div className="h-2.5 w-20 bg-slate-800 rounded" />
                    <div className="h-2 w-12 bg-slate-100 rounded" />
                  </div>
                </div>
              </div>
            ) : selectedTemplate === 'minimal' ? (
              // Minimal Mockup
              <div className="space-y-4">
                <div>
                  <div className="h-4.5 w-32 bg-slate-800 rounded-md" />
                  <div className="h-2.5 w-24 bg-slate-300 rounded-md mt-1" />
                  <div className="h-2 w-40 bg-slate-100 rounded-md mt-2" />
                </div>
                <div className="space-y-3">
                  <div className="h-2.5 w-20 bg-slate-800 rounded border-b border-slate-200 pb-1" />
                  <div className="space-y-1.5">
                    <div className="flex justify-between">
                      <div className="h-2 w-28 bg-slate-800 rounded" />
                      <div className="h-2 w-12 bg-slate-100 rounded" />
                    </div>
                    <div className="h-2 w-16 bg-slate-300 rounded" />
                  </div>
                  <div className="h-2.5 w-20 bg-slate-800 rounded border-b border-slate-200 pb-1" />
                  <div className="flex flex-wrap gap-1">
                    <div className="h-3.5 w-10 border border-slate-200 rounded" />
                    <div className="h-3.5 w-8 border border-slate-200 rounded" />
                    <div className="h-3.5 w-12 border border-slate-200 rounded" />
                  </div>
                </div>
              </div>
            ) : (
              // Technical Mockup
              <div className="space-y-4">
                <div className="flex justify-between border-b pb-2">
                  <div>
                    <div className="h-4.5 w-28 bg-slate-800 rounded-md" />
                    <div className="h-2.5 w-20 bg-slate-200 rounded-md mt-1" style={{ backgroundColor: `${selectedColor}30` }} />
                  </div>
                  <div className="space-y-0.5 align-right text-right">
                    <div className="h-1.5 w-16 bg-slate-100 rounded ml-auto" />
                    <div className="h-1.5 w-12 bg-slate-100 rounded ml-auto" />
                  </div>
                </div>
                <div className="space-y-3">
                  <div className="h-3 w-28 bg-slate-100 border-l-2 rounded-r" style={{ borderLeftColor: selectedColor }} />
                  <div className="space-y-1.5 font-mono">
                    <div className="flex justify-between">
                      <div className="h-2 w-24 bg-slate-800 rounded" />
                      <div className="h-1.5 w-10 bg-slate-100 rounded" />
                    </div>
                    <div className="h-1.5 w-full bg-slate-100 rounded" />
                  </div>
                  <div className="h-3 w-28 bg-slate-100 border-l-2 rounded-r" style={{ borderLeftColor: selectedColor }} />
                  <div className="flex flex-wrap gap-1">
                    <div className="h-3.5 w-12 bg-slate-100 rounded" />
                    <div className="h-3.5 w-8 bg-slate-100 rounded" />
                  </div>
                </div>
              </div>
            )}

            {/* Simulated file download button */}
            <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between">
              <span className="text-[10px] text-slate-400 font-semibold">Format pliku: PDF (A4)</span>
              <button
                onClick={handleStartFree}
                className="rounded-lg bg-slate-800 hover:bg-slate-900 text-white text-[10px] font-bold px-3 py-1.5 transition flex items-center gap-1 cursor-pointer"
              >
                <span className="material-symbols-outlined text-xs">edit</span>
                <span>Zacznij Edycję</span>
              </button>
            </div>
          </div>

          {/* Interactive Widget Selector Tabs */}
          <div className="grid grid-cols-4 gap-1.5 mt-4">
            {templates.map((t) => (
              <button
                key={t.id}
                onClick={() => setSelectedTemplate(t.id)}
                className={`py-1.5 rounded-lg text-[10px] font-bold text-center border transition cursor-pointer ${
                  selectedTemplate === t.id
                    ? 'border-slate-800 bg-slate-800 text-white shadow-xs'
                    : 'border-slate-200 bg-slate-50 text-slate-600 hover:bg-slate-100'
                }`}
              >
                {t.name.split('')[0] + t.name.slice(1, 4)}...
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Template Gallery Section */}
      <section id="templates" className="bg-white border-y border-slate-200/60 py-16 md:py-24">
        <div className="mx-auto max-w-6xl px-4 md:px-6">
          <div className="text-center max-w-xl mx-auto mb-12 space-y-3">
            <h2 className="text-2xl font-black text-slate-900 md:text-3xl tracking-tight">
              Wybierz profesjonalny szablon
            </h2>
            <p className="text-slate-500 text-sm">
              Wszystkie szablony są zoptymalizowane pod kątem czytelności i systemów rekrutacyjnych ATS. Możesz zmienić szablon w dowolnym momencie.
            </p>
          </div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {templates.map((t) => (
              <div key={t.id} className="rounded-2xl border border-slate-200 bg-white p-5 flex flex-col justify-between shadow-xs hover:shadow-md transition">
                <div className="space-y-3">
                  {/* Live scaled-down template preview as a card thumbnail */}
                  <div className="h-44 overflow-hidden rounded-xl border border-slate-200 bg-white relative shadow-inner select-none pointer-events-none mb-1 flex justify-center">
                    <div
                      style={{
                        width: '794px',
                        height: '1123px',
                        transform: 'scale(0.24)', // Scale down to fit the card width/height nicely
                        transformOrigin: 'top center',
                        position: 'absolute',
                        top: '8px',
                      }}
                    >
                      <HTMLPreview data={{ ...data, template: t.id }} />
                    </div>
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-slate-800">{t.name}</h3>
                    <p className="text-slate-500 text-xs mt-1.5 leading-relaxed">{t.desc}</p>
                  </div>
                </div>
                <button
                  onClick={() => startWithTemplate(t.id)}
                  className="mt-5 w-full rounded-lg border border-slate-200 hover:border-sky-500 hover:text-sky-600 py-2.5 text-center text-xs font-bold text-slate-700 transition cursor-pointer"
                >
                  Użyj tego szablonu
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features & Benefits Section */}
      <section id="benefits" className="py-16 md:py-24">
        <div className="mx-auto max-w-6xl px-4 md:px-6">
          <div className="text-center max-w-xl mx-auto mb-16 space-y-3">
            <h2 className="text-2xl font-black text-slate-900 md:text-3xl tracking-tight">
              Dlaczego powinieneś wybrać cv-free.pl?
            </h2>
            <p className="text-slate-500 text-sm">
              Łączymy łatwość obsługi z absolutnym bezpieczeństwem danych osobowych.
            </p>
          </div>

          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {[
              {
                icon: 'no_accounts',
                title: 'Brak rejestracji',
                desc: 'Nie musisz zakładać konta ani zostawiać swojego e-maila. Od razu przechodzisz do tworzenia dokumentu.',
              },
              {
                icon: 'lock',
                title: 'Prywatność (Local First)',
                desc: 'Twoje dane nie są przesyłane na serwery. Są zapisywane wyłącznie w pamięci lokalnej Twojej przeglądarki.',
              },
              {
                icon: 'contract_edit',
                title: '100% Zgodność z ATS',
                desc: 'Nasze pliki PDF są w pełni wektorowe. Oznacza to, że systemy filtrujące bez problemu odczytają Twoje CV.',
              },
              {
                icon: 'price_check',
                title: 'Naprawdę darmowy',
                desc: 'Brak ukrytych paywalli przy próbie pobrania pliku. PDF jest wygenerowany za darmo i bez znaków wodnych.',
              },
            ].map((b) => (
              <div key={b.title} className="bg-white border border-slate-200 rounded-2xl p-5 space-y-3 shadow-xs">
                <div className="h-10 w-10 rounded-lg bg-sky-50 text-sky-500 flex items-center justify-center">
                  <span className="material-symbols-outlined font-bold text-xl">{b.icon}</span>
                </div>
                <h3 className="text-xs font-bold text-slate-800 uppercase tracking-wider">{b.title}</h3>
                <p className="text-slate-500 text-xs leading-relaxed">{b.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Guide Steps */}
      <section className="bg-slate-900 text-white py-16 md:py-24 relative overflow-hidden">
        {/* Decorative background glow */}
        <div className="absolute -bottom-24 -left-24 h-64 w-64 bg-sky-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="mx-auto max-w-6xl px-4 md:px-6 relative z-10">
          <div className="text-center max-w-xl mx-auto mb-16 space-y-3">
            <h2 className="text-2xl font-black md:text-3xl tracking-tight text-white">
              Czysty proces w 3 krokach
            </h2>
            <p className="text-sky-200/60 text-sm">
              Prosta ścieżka od pustej kartki do gotowego dokumentu.
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-3">
            {[
              { step: '01', title: 'Wypełnij dane', desc: 'Uzupełnij przejrzyste sekcje (Dane, Doświadczenie, Edukacja, Certyfikaty).' },
              { step: '02', title: 'Wybierz styl', desc: 'Dobierz jeden z profesjonalnych szablonów, ustaw kolor akcentu i czcionkę.' },
              { step: '03', title: 'Pobierz PDF', desc: 'Pobierz gotowy, wektorowy plik PDF bezpośrednio na swój dysk - bez opłat.' },
            ].map((s) => (
              <div key={s.step} className="space-y-4">
                <div className="text-3xl font-black text-sky-400">{s.step}</div>
                <h3 className="text-base font-bold">{s.title}</h3>
                <p className="text-slate-400 text-xs leading-relaxed">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section id="faq" className="py-16 md:py-24 bg-white border-t border-slate-200/60">
        <div className="mx-auto max-w-4xl px-4 md:px-6">
          <div className="text-center mb-12 space-y-3">
            <h2 className="text-2xl font-black text-slate-900 md:text-3xl tracking-tight">
              Często zadawane pytania
            </h2>
            <p className="text-slate-500 text-sm">
              Wszystko co musisz wiedzieć o cv-free.pl.
            </p>
          </div>

          <div className="space-y-6">
            {[
              {
                q: 'Czy ten kreator naprawdę jest w 100% darmowy?',
                a: 'Tak. W przeciwieństwie do wielu kreatorów internetowych, cv-free.pl nie ukrywa pobierania PDF za płatną subskrypcją. Projekt powstał z myślą o prostym tworzeniu bezpłatnego CV, a przychód planowany jest w przyszłości z płatnej platformy generowania CV przez sztuczną inteligencję (gen-cv.pl).',
              },
              {
                q: 'Czy moje dane osobowe są bezpieczne?',
                a: 'Jak najbardziej. Zastosowaliśmy podejście "Local First". Wszystkie wpisywane dane są przechowywane w pamięci lokalnej Twojej przeglądarki (localStorage). Nigdy nie przesyłamy danych na serwery zewnętrzne, co gwarantuje pełne bezpieczeństwo danych osobowych.',
              },
              {
                q: 'Czym jest zgodność z systemami rekrutacyjnymi ATS?',
                a: 'Systemy ATS (Applicant Tracking Systems) to oprogramowanie skanujące nadesłane pliki CV. Wiele darmowych edytorów (jak np. Canva) eksportuje CV jako obrazek, przez co systemy te widzą pusty plik. Nasz generator tworzy wektorowy PDF, w którym tekst jest w pełni zaznaczalny, ułatwiając pomyślną weryfikację.',
              },
            ].map((faq) => (
              <div key={faq.q} className="rounded-xl border border-slate-200 p-5 space-y-2">
                <h4 className="text-xs font-bold text-slate-800 uppercase tracking-wider">{faq.q}</h4>
                <p className="text-slate-500 text-xs leading-relaxed">{faq.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action Banner */}
      <section className="bg-slate-50 border-t border-slate-200/60 py-16 text-center">
        <div className="mx-auto max-w-xl px-4 space-y-6">
          <h2 className="text-2xl font-black text-slate-900 md:text-3xl tracking-tight">
            Gotowy do napisania CV?
          </h2>
          <p className="text-slate-500 text-sm">
            Zajmie Ci to tylko 5 minut. Zacznij pisać już teraz — bez rejestracji i bez opłat.
          </p>
          <button
            onClick={handleStartFree}
            className="inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-sky-500 to-blue-600 px-8 py-4 text-xs font-bold text-white shadow-md hover:shadow-lg transition cursor-pointer"
          >
            Stwórz CV za darmo
            <span className="material-symbols-outlined text-sm font-bold">arrow_forward</span>
          </button>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-slate-200/65 bg-white py-8">
        <div className="mx-auto max-w-6xl px-4 md:px-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold text-slate-400">© {new Date().getFullYear()} cv-free.pl • Wszelkie prawa zastrzeżone.</span>
          </div>
          <div className="flex items-center gap-4 text-xs font-bold text-slate-400">
            <span className="hover:text-slate-700 cursor-pointer">Polityka Prywatności</span>
            <span className="hover:text-slate-700 cursor-pointer">Regulamin</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
