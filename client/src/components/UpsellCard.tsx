interface UpsellCardProps {
  onClose: () => void;
}

export default function UpsellCard({ onClose }: UpsellCardProps) {
  return (
    <div className="fixed inset-0 z-50 bg-slate-900/40 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-white border border-slate-200 rounded-2xl max-w-md w-full shadow-2xl p-6 relative overflow-hidden animate-scale-up">
        {/* Subtle decorative gradient background bubble */}
        <div className="absolute -top-24 -right-24 h-48 w-48 bg-sky-400/10 rounded-full blur-3xl pointer-events-none" />

        {/* Success Header Icon */}
        <div className="flex items-center gap-3.5 mb-4">
          <div className="h-10 w-10 rounded-full bg-emerald-50 border border-emerald-100 flex items-center justify-center text-emerald-500 shrink-0">
            <span className="material-symbols-outlined font-bold text-xl">check</span>
          </div>
          <div>
            <h3 className="text-sm font-bold text-slate-800 tracking-tight">Pobieranie rozpoczęte!</h3>
            <p className="text-xs text-slate-500">Twój darmowy plik PDF jest gotowy.</p>
          </div>
        </div>

        {/* Card Body */}
        <div className="space-y-3 mb-6">
          <p className="text-xs text-slate-600 leading-relaxed">
            Stworzyłeś świetną bazę! Czy wiesz, że możesz <span className="font-bold text-sky-600">zwiększyć szanse na rozmowę o 60%</span>?
          </p>
          <div className="bg-sky-50/50 border border-sky-100/60 rounded-xl p-3.5 space-y-2">
            <h4 className="text-xs font-bold text-sky-900 flex items-center gap-1.5">
              <span className="material-symbols-outlined text-base">psychology</span>
              Wyskocz na wyższy poziom z gen-cv.pl:
            </h4>
            <ul className="text-[11px] text-sky-800 space-y-1.5 list-none pl-0">
              <li className="flex items-start gap-1.5">
                <span className="text-sky-500 font-bold">•</span>
                <span>Automatyczne redagowanie opisów przez AI pod konkretną ofertę pracy.</span>
              </li>
              <li className="flex items-start gap-1.5">
                <span className="text-sky-500 font-bold">•</span>
                <span>Analiza słów kluczowych pod kątem zgodności z systemami rekrutacyjnymi ATS.</span>
              </li>
              <li className="flex items-start gap-1.5">
                <span className="text-sky-500 font-bold">•</span>
                <span>List motywacyjny dopasowany stylistycznie do Twojego CV.</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Actions */}
        <div className="flex flex-col gap-2.5">
          <a
            href="https://gen-cv.pl"
            target="_blank"
            rel="noopener noreferrer"
            className="w-full rounded-xl bg-gradient-to-r from-sky-500 to-blue-600 hover:from-sky-600 hover:to-blue-700 text-white py-3 text-center text-xs font-bold shadow-md hover:shadow-lg transition duration-200 flex items-center justify-center gap-1.5 cursor-pointer"
          >
            <span>Ulepsz CV przy użyciu AI (gen-cv.pl)</span>
            <span className="material-symbols-outlined text-sm font-bold">arrow_forward</span>
          </a>
          <button
            onClick={onClose}
            className="w-full rounded-xl border border-slate-200 bg-white hover:bg-slate-50 py-2.5 text-xs font-bold text-slate-500 hover:text-slate-800 transition duration-150 cursor-pointer"
          >
            Dziękuję, zostaję przy wersji darmowej
          </button>
        </div>
      </div>
    </div>
  );
}
