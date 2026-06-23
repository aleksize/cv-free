import { useState } from 'react';
import { useCvStore } from '../stores/cvStore';
import { pdf } from '@react-pdf/renderer';
import { CvDocument } from '../templates/PDFRenderer';

const templates = [
  { id: 'modern', name: 'Nowoczesny', desc: 'Układ dwukolumnowy, z lewym panelem', color: 'from-sky-400 to-blue-500' },
  { id: 'classic', name: 'Klasyczny', desc: 'Tradycyjny układ, centrowany nagłówek', color: 'from-slate-700 to-slate-900' },
  { id: 'minimal', name: 'Minimalistyczny', desc: 'Dużo przestrzeni, czysta typografia', color: 'from-zinc-300 to-zinc-400' },
  { id: 'technical', name: 'Techniczny', desc: 'Wysokie zagęszczenie, styl monospace', color: 'from-emerald-400 to-teal-500' },
];

const colors = [
  { id: 'sky', value: '#0ea5e9', name: 'Błękitny' },
  { id: 'navy', value: '#1e3a8a', name: 'Granatowy' },
  { id: 'emerald', value: '#10b981', name: 'Szmaragdowy' },
  { id: 'slate', value: '#475569', name: 'Szary' },
  { id: 'rose', value: '#f43f5e', name: 'Różany' },
  { id: 'amber', value: '#f59e0b', name: 'Bursztynowy' },
];

const fonts = [
  { id: 'Inter', name: 'Inter' },
  { id: 'Roboto', name: 'Roboto' },
  { id: 'Montserrat', name: 'Montserrat' },
];

interface RightPanelProps {
  onDownloadStart: () => void;
  onDownloadEnd: () => void;
}

export default function RightPanel({ onDownloadStart, onDownloadEnd }: RightPanelProps) {
  const { data, setTemplate, setColorPreset, setFont, setSpacing, setMargin, loadDemoData, setShowWatermark } = useCvStore();
  const [isGenerating, setIsGenerating] = useState(false);

  const handleDownloadPdf = async () => {
    setIsGenerating(true);
    onDownloadStart();
    try {
      const doc = <CvDocument data={data} />;
      const blob = await pdf(doc).toBlob();
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `${data.personal.fullName.replace(/\s+/g, '_') || 'cv'}_free.pdf`;
      link.click();
      URL.revokeObjectURL(url);
    } catch (e) {
      console.error('Błąd PDF:', e);
      alert('Nie udało się wygenerować PDF. Spróbuj ponownie.');
    } finally {
      setIsGenerating(false);
      onDownloadEnd();
    }
  };

  return (
    <aside className="w-full md:w-[320px] bg-slate-50 border-l border-slate-200 overflow-y-auto flex flex-col h-full shrink-0">
      {/* Panel Header */}
      <div className="p-5 border-b border-slate-200 bg-white">
        <h2 className="text-base font-bold text-slate-800 tracking-tight">Wygląd i styl</h2>
        <p className="text-xs text-slate-500 mt-1">Dostosuj szablon, czcionki i układ PDF.</p>
      </div>

      <div className="flex-1 p-5 space-y-6">
        {/* 1. SZABLON */}
        <div className="space-y-2">
          <label className="text-[10px] font-bold uppercase tracking-wider text-slate-500">Wybierz Szablon</label>
          <div className="grid grid-cols-1 gap-2.5">
            {templates.map((t) => (
              <button
                key={t.id}
                onClick={() => setTemplate(t.id)}
                className={`flex items-center gap-3 w-full p-2.5 rounded-xl border text-left transition ${
                  data.template === t.id
                    ? 'border-sky-500 bg-sky-50/40 ring-1 ring-sky-500'
                    : 'border-slate-200 bg-white hover:border-slate-300'
                }`}
              >
                <div className={`h-8 w-8 rounded-lg bg-gradient-to-br ${t.color} shrink-0 shadow-inner`} />
                <div className="min-w-0">
                  <p className="text-xs font-bold text-slate-800">{t.name}</p>
                  <p className="text-[10px] text-slate-400 truncate">{t.desc}</p>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* 2. KOLOR AKCENTU */}
        <div className="space-y-2">
          <label className="text-[10px] font-bold uppercase tracking-wider text-slate-500">Kolor akcentu</label>
          <div className="flex flex-wrap gap-2.5">
            {colors.map((c) => (
              <button
                key={c.id}
                onClick={() => setColorPreset(c.value)}
                className={`h-8 w-8 rounded-full border transition relative flex items-center justify-center cursor-pointer ${
                  data.colorPreset === c.value
                    ? 'border-slate-900 scale-105 shadow-sm'
                    : 'border-slate-200 hover:scale-105'
                }`}
                style={{ backgroundColor: c.value }}
                title={c.name}
              >
                {data.colorPreset === c.value && (
                  <span className="material-symbols-outlined text-white text-base font-bold">check</span>
                )}
              </button>
            ))}
          </div>
        </div>

        {/* 3. CZCIONKA */}
        <div className="space-y-2">
          <label className="text-[10px] font-bold uppercase tracking-wider text-slate-500">Krój pisma</label>
          <div className="grid grid-cols-3 gap-2">
            {fonts.map((f) => (
              <button
                key={f.id}
                onClick={() => setFont(f.id)}
                className={`rounded-lg border py-2 text-center text-xs font-semibold transition ${
                  data.font === f.id
                    ? 'border-sky-500 bg-sky-50/50 text-sky-600'
                    : 'border-slate-200 bg-white text-slate-600 hover:border-slate-300'
                }`}
              >
                {f.name}
              </button>
            ))}
          </div>
        </div>

        {/* 4. ODSTĘPY (SPACING) */}
        <div className="space-y-2">
          <label className="text-[10px] font-bold uppercase tracking-wider text-slate-500">Odstępy (Zagęszczenie)</label>
          <div className="grid grid-cols-3 gap-2">
            {(['small', 'medium', 'large'] as const).map((s) => (
              <button
                key={s}
                onClick={() => setSpacing(s)}
                className={`rounded-lg border py-1.5 text-center text-xs font-semibold transition ${
                  data.spacing === s
                    ? 'border-sky-500 bg-sky-50/50 text-sky-600'
                    : 'border-slate-200 bg-white text-slate-600 hover:border-slate-300'
                }`}
              >
                {s === 'small' ? 'Wąskie' : s === 'medium' ? 'Średnie' : 'Szerokie'}
              </button>
            ))}
          </div>
        </div>

        {/* 5. MARGINESY (MARGINS) */}
        <div className="space-y-2">
          <label className="text-[10px] font-bold uppercase tracking-wider text-slate-500">Marginesy strony</label>
          <div className="grid grid-cols-3 gap-2">
            {(['small', 'medium', 'large'] as const).map((m) => (
              <button
                key={m}
                onClick={() => setMargin(m)}
                className={`rounded-lg border py-1.5 text-center text-xs font-semibold transition ${
                  data.margin === m
                    ? 'border-sky-500 bg-sky-50/50 text-sky-600'
                    : 'border-slate-200 bg-white text-slate-600 hover:border-slate-300'
                }`}
              >
                {m === 'small' ? 'Wąskie' : m === 'medium' ? 'Średnie' : 'Szerokie'}
              </button>
            ))}
          </div>
        </div>

        {/* 6. DODATKOWE */}
        <div className="space-y-2 pt-4 border-t border-slate-200">
          <label className="text-[10px] font-bold uppercase tracking-wider text-slate-500">Dodatkowe opcje</label>
          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              id="showWatermark"
              className="rounded text-sky-600 focus:ring-sky-500 h-4 w-4 border-slate-300 transition cursor-pointer"
              checked={data.showWatermark}
              onChange={(e) => setShowWatermark(e.target.checked)}
            />
            <label htmlFor="showWatermark" className="text-xs font-semibold text-slate-700 cursor-pointer select-none">
              Pokaż stopkę (Wygenerowano przez cv-free.pl)
            </label>
          </div>
        </div>

        {/* Demo data helper */}
        <div className="pt-4 border-t border-slate-200 space-y-2">
          <p className="text-[10px] text-slate-400 leading-normal">
            Potrzebujesz zobaczyć gotowy układ? Wczytaj nasze profesjonalnie przygotowane dane demonstracyjne.
          </p>
          <button
            onClick={loadDemoData}
            className="w-full rounded-lg border border-slate-200 hover:border-slate-300 hover:bg-slate-100 bg-white py-2 text-xs font-semibold text-slate-700 transition"
          >
            Wczytaj dane demo
          </button>
        </div>
      </div>

      {/* Action CTA Download */}
      <div className="p-4 border-t border-slate-200 bg-white">
        <button
          onClick={handleDownloadPdf}
          disabled={isGenerating}
          className="w-full rounded-xl bg-sky-500 hover:bg-sky-600 disabled:bg-slate-300 text-white py-3 text-sm font-bold shadow-md hover:shadow-lg transition duration-200 flex items-center justify-center gap-2 cursor-pointer"
        >
          {isGenerating ? (
            <>
              <svg className="animate-spin h-4 w-4 text-white" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
              </svg>
              <span>Generowanie pliku...</span>
            </>
          ) : (
            <>
              <span className="material-symbols-outlined font-bold text-lg">download</span>
              <span>Pobierz CV w PDF</span>
            </>
          )}
        </button>
      </div>
    </aside>
  );
}
