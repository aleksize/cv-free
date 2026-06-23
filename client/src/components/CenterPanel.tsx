import { useState, useRef, useEffect } from 'react';
import { useCvStore } from '../stores/cvStore';
import { HTMLPreview } from '../templates/HTMLPreviews';
import { pdf } from '@react-pdf/renderer';
import { CvDocument } from '../templates/PDFRenderer';

interface CenterPanelProps {
  onDownloadStart: () => void;
  onDownloadEnd: () => void;
}

export default function CenterPanel({ onDownloadStart, onDownloadEnd }: CenterPanelProps) {
  const { data } = useCvStore();
  const [zoom, setZoom] = useState(0.75);
  const [isGenerating, setIsGenerating] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const zoomIn = () => setZoom((z) => Math.min(z + 0.05, 1.2));
  const zoomOut = () => setZoom((z) => Math.max(z - 0.05, 0.3));
  const resetZoom = () => setZoom(0.75);

  const fitToWidth = () => {
    if (!containerRef.current) return;
    const parentWidth = containerRef.current.clientWidth;
    const padding = window.innerWidth < 768 ? 20 : 48; // Tighter padding on mobile
    const availableWidth = parentWidth - padding;
    const fitScale = Math.min(availableWidth / 794, 1.2);
    setZoom(fitScale);
  };

  useEffect(() => {
    // Wait a brief moment to ensure layouts are computed, then fit
    const timer = setTimeout(() => {
      fitToWidth();
    }, 100);

    window.addEventListener('resize', fitToWidth);
    return () => {
      clearTimeout(timer);
      window.removeEventListener('resize', fitToWidth);
    };
  }, []);

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
      console.error('Błąd podczas generowania PDF:', e);
      alert('Nie udało się wygenerować pliku PDF. Spróbuj ponownie.');
    } finally {
      setIsGenerating(false);
      onDownloadEnd();
    }
  };

  const scaledWidth = 794 * zoom;
  const scaledHeight = 1123 * zoom;

  return (
    <section className="flex-1 bg-slate-100/60 overflow-y-auto flex flex-col h-full relative">
      {/* Top Preview Toolbar */}
      <div className="sticky top-0 z-20 w-full bg-white border-b border-slate-200 px-4 py-2.5 flex items-center justify-between shadow-xs">
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1 bg-slate-100 rounded-lg p-0.5 border border-slate-200">
            <button
              onClick={zoomOut}
              className="p-1.5 rounded-md hover:bg-white text-slate-600 hover:text-slate-900 transition flex items-center cursor-pointer"
              title="Pomniejsz"
            >
              <span className="material-symbols-outlined text-base">remove</span>
            </button>
            <span className="text-xs font-semibold px-2 text-slate-700 min-w-10 text-center">
              {Math.round(zoom * 100)}%
            </span>
            <button
              onClick={zoomIn}
              className="p-1.5 rounded-md hover:bg-white text-slate-600 hover:text-slate-900 transition flex items-center cursor-pointer"
              title="Powiększ"
            >
              <span className="material-symbols-outlined text-base">add</span>
            </button>
            <button
              onClick={fitToWidth}
              className="p-1.5 rounded-md hover:bg-white text-slate-600 hover:text-slate-900 transition flex items-center text-xs font-bold px-1.5 cursor-pointer"
              title="Dopasuj do szerokości"
            >
              Dopasuj
            </button>
            <button
              onClick={resetZoom}
              className="p-1.5 rounded-md hover:bg-white text-slate-600 hover:text-slate-900 transition flex items-center text-xs font-bold px-1.5 cursor-pointer"
              title="Domyślny zoom"
            >
              1:1
            </button>
          </div>

          {/* Autosave status indicator */}
          <div className="hidden sm:flex items-center gap-1.5 text-emerald-600 text-xs font-semibold bg-emerald-50 border border-emerald-100 px-2 py-1 rounded-lg">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
            Zapisano w przeglądarce
          </div>
        </div>

        {/* Download PDF button */}
        <button
          onClick={handleDownloadPdf}
          disabled={isGenerating}
          className="rounded-lg bg-sky-500 hover:bg-sky-600 disabled:bg-slate-300 text-white px-4 py-2 text-xs font-semibold shadow-xs flex items-center gap-1.5 transition cursor-pointer"
        >
          {isGenerating ? (
            <>
              <svg className="animate-spin h-3.5 w-3.5 text-white" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
              </svg>
              <span>Generowanie...</span>
            </>
          ) : (
            <>
              <span className="material-symbols-outlined text-base">download</span>
              <span>Pobierz PDF</span>
            </>
          )}
        </button>
      </div>

      {/* Preview Sheet Area */}
      <div ref={containerRef} className="flex-1 flex justify-center py-8 overflow-x-hidden min-w-0">
        <div
          style={{
            width: `${scaledWidth}px`,
            height: `${scaledHeight}px`,
            position: 'relative',
            overflow: 'hidden',
          }}
        >
          <div
            className="bg-white shadow-lg border border-slate-200/80 shrink-0 select-none overflow-hidden"
            style={{
              width: '794px',
              height: '1123px',
              transform: `scale(${zoom})`,
              transformOrigin: 'top left',
              position: 'absolute',
              left: 0,
              top: 0,
            }}
          >
            <HTMLPreview data={data} />
          </div>
        </div>
      </div>
    </section>
  );
}
