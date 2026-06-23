import { Link } from 'react-router-dom';

export default function TermsOfService() {
  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 selection:bg-sky-500/10 selection:text-sky-600 font-sans">
      {/* Navigation */}
      <header className="sticky top-0 z-40 bg-white/80 backdrop-blur-md border-b border-slate-200/65">
        <div className="mx-auto flex h-16 max-w-4xl items-center justify-between px-4 md:px-6">
          <Link to="/" className="flex items-center gap-2 group">
            <span className="h-7 w-7 rounded-lg bg-gradient-to-tr from-sky-400 to-blue-600 flex items-center justify-center text-white font-black text-sm shadow-xs transition group-hover:scale-105">
              C
            </span>
            <span className="text-base font-extrabold tracking-tight text-slate-900">cv-free.pl</span>
          </Link>
          <Link
            to="/"
            className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-500 hover:text-slate-900 transition"
          >
            <span className="material-symbols-outlined text-sm font-bold">arrow_back</span>
            Powrót do strony głównej
          </Link>
        </div>
      </header>

      {/* Main Content */}
      <main className="mx-auto max-w-4xl px-4 py-12 md:px-6 md:py-16">
        <div className="bg-white border border-slate-200 rounded-3xl p-6 md:p-10 shadow-sm space-y-8">
          <div className="space-y-3 border-b border-slate-100 pb-6">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-slate-50 border border-slate-100 text-slate-500 px-3 py-1 text-[10px] font-bold uppercase tracking-wider">
              Zasady i warunki serwisu
            </span>
            <h1 className="text-3xl font-black tracking-tight text-slate-900 sm:text-4xl leading-tight">
              Regulamin Serwisu
            </h1>
            <p className="text-slate-500 text-xs font-medium">
              Ostatnia aktualizacja: 23 czerwca 2026 r.
            </p>
          </div>

          <div className="space-y-6 text-sm text-slate-600 leading-relaxed text-justify">
            <p>
              Niniejszy Regulamin (dalej: „Regulamin”) określa zasady bezpłatnego korzystania z kreatora CV dostępnego pod adresem internetowym <strong>cv-free.pl</strong> (dalej: „Serwis”).
            </p>

            {/* Sec 1 */}
            <div className="space-y-3">
              <h2 className="text-lg font-bold text-slate-900 tracking-tight flex items-center gap-2">
                <span className="h-5 w-5 rounded-md bg-sky-50 text-sky-500 flex items-center justify-center text-xs font-black">1</span>
                Postanowienia ogólne
              </h2>
              <ol className="list-decimal list-inside pl-1 space-y-2">
                <li>
                  Właścicielem i administratorem Serwisu jest spółka <strong>Donner Spółka z ograniczoną odpowiedzialnością</strong> z siedzibą przy ul. Turkusowej 33 lok. 25, 70-778 Szczecin, wpisana do Krajowego Rejestru Sądowego pod numerem KRS: 0000520328, NIP: 8513177877, REGON: 321560124 (dalej jako „Administrator”).
                </li>
                <li>
                  Serwis świadczy bezpłatną usługę drogą elektroniczną polegającą na dostarczeniu interaktywnego narzędzia do tworzenia życiorysu zawodowego (CV) oraz generowania go w formacie pliku PDF na urządzeniu Użytkownika.
                </li>
                <li>
                  Przed rozpoczęciem korzystania z Serwisu, Użytkownik zobowiązany jest do zapoznania się z treścią niniejszego Regulaminu. Rozpoczęcie korzystania z kreatora oznacza akceptację jego warunków.
                </li>
                <li>
                  Z Serwisu może korzystać każda osoba fizyczna mająca pełną zdolność do czynności prawnych.
                </li>
              </ol>
            </div>

            {/* Sec 2 */}
            <div className="space-y-3">
              <h2 className="text-lg font-bold text-slate-900 tracking-tight flex items-center gap-2">
                <span className="h-5 w-5 rounded-md bg-sky-50 text-sky-500 flex items-center justify-center text-xs font-black">2</span>
                Zasady świadczenia usług
              </h2>
              <ol className="list-decimal list-inside pl-1 space-y-2">
                <li>
                  Korzystanie z Serwisu oraz generowanie dokumentów PDF jest w <strong>100% bezpłatne</strong>.
                </li>
                <li>
                  Serwis <strong>nie wymaga rejestracji konta ani logowania</strong>. Dostęp do kreatora jest natychmiastowy po wejściu na stronę.
                </li>
                <li>
                  Dane wprowadzane przez Użytkownika w formularzu są zapisywane lokalnie w pamięci przeglądarki (<code>localStorage</code>) w celu umożliwienia kontynuacji edycji przy kolejnej wizycie na stronie.
                </li>
                <li>
                  Użytkownik ma możliwość w dowolnym momencie wyczyszczenia wszystkich danych z pamięci podręcznej za pomocą przycisku &quot;Wyczyść wszystkie dane&quot; udostępnionego w interfejsie edytora.
                </li>
              </ol>
            </div>

            {/* Sec 3 */}
            <div className="space-y-3">
              <h2 className="text-lg font-bold text-slate-900 tracking-tight flex items-center gap-2">
                <span className="h-5 w-5 rounded-md bg-sky-50 text-sky-500 flex items-center justify-center text-xs font-black">3</span>
                Odpowiedzialność za treść
              </h2>
              <ol className="list-decimal list-inside pl-1 space-y-2">
                <li>
                  Użytkownik ponosi wyłączną odpowiedzialność za treść informacji, które wprowadza do kreatora CV. Administrator nie weryfikuje prawdziwości, rzetelności ani zgodności z prawem danych wpisywanych przez Użytkownika.
                </li>
                <li>
                  Zabrania się wprowadzania do generatora treści o charakterze bezprawnym, naruszających dobra osobiste osób trzecich, wulgarnych czy wprowadzających rekruterów w błąd.
                </li>
                <li>
                  Administrator nie ponosi odpowiedzialności za treść dokumentów wygenerowanych przez Użytkowników ani za skutki ich użycia w procesach rekrutacyjnych.
                </li>
              </ol>
            </div>

            {/* Sec 4 */}
            <div className="space-y-3">
              <h2 className="text-lg font-bold text-slate-900 tracking-tight flex items-center gap-2">
                <span className="h-5 w-5 rounded-md bg-sky-50 text-sky-500 flex items-center justify-center text-xs font-black">4</span>
                Prawa autorskie i znak wodny
              </h2>
              <ol className="list-decimal list-inside pl-1 space-y-2">
                <li>
                  Szablony graficzne, kod źródłowy, grafiki, teksty marketingowe oraz układ Serwisu stanowią własność intelektualną Administratora i są chronione prawem autorskim.
                </li>
                <li>
                  Użytkownik otrzymuje niewyłączną, nieograniczoną terytorialnie licencję na korzystanie z wygenerowanych plików PDF w celach osobistych i zawodowych (aplikowanie na oferty pracy, drukowanie, wysyłanie pocztą elektroniczną).
                </li>
                <li>
                  Wygenerowane dokumenty mogą zawierać w dolnej stopce informację <code>Wygenerowano przez www.cv-free.pl</code>. Użytkownik ma pełne i bezpłatne prawo do wyłączenia tej stopki w opcjach kreatora w panelu bocznym. Administrator nie pobiera za to żadnych opłat.
                </li>
              </ol>
            </div>

            {/* Sec 5 */}
            <div className="space-y-3">
              <h2 className="text-lg font-bold text-slate-900 tracking-tight flex items-center gap-2">
                <span className="h-5 w-5 rounded-md bg-sky-50 text-sky-500 flex items-center justify-center text-xs font-black">5</span>
                Usługi partnerskie i AI (Upsell)
              </h2>
              <ol className="list-decimal list-inside pl-1 space-y-2">
                <li>
                  Serwis ma charakter demonstracyjny i promocyjny dla darmowego tworzenia podstawowych CV. Może on zawierać odnośniki oraz informacje o płatnym, partnerskim serwisie <strong>gen-cv.pl</strong>, który oferuje zaawansowane narzędzia do automatycznego generowania dokumentów z pomocą modeli sztucznej inteligencji (AI).
                </li>
                <li>
                  Korzystanie z serwisu <strong>gen-cv.pl</strong> jest całkowicie dobrowolne, niezależne od Serwisu cv-free.pl i podlega osobnemu regulaminowi oraz cennikowi opisanemu na tamtej stronie.
                </li>
              </ol>
            </div>

            {/* Sec 6 */}
            <div className="space-y-3">
              <h2 className="text-lg font-bold text-slate-900 tracking-tight flex items-center gap-2">
                <span className="h-5 w-5 rounded-md bg-sky-50 text-sky-500 flex items-center justify-center text-xs font-black">6</span>
                Wymogi techniczne
              </h2>
              <ol className="list-decimal list-inside pl-1 space-y-2">
                <li>
                  Do prawidłowego korzystania z Serwisu niezbędne są:
                  <ul className="list-disc list-inside pl-4 mt-1 space-y-0.5 text-slate-500">
                    <li>Urządzenie z dostępem do sieci Internet,</li>
                    <li>Przeglądarka internetowa z obsługą języka JavaScript oraz pamięci <code>localStorage</code>,</li>
                    <li>Oprogramowanie do odczytu plików w formacie PDF.</li>
                  </ul>
                </li>
              </ol>
            </div>

            {/* Sec 7 */}
            <div className="space-y-3">
              <h2 className="text-lg font-bold text-slate-900 tracking-tight flex items-center gap-2">
                <span className="h-5 w-5 rounded-md bg-sky-50 text-sky-500 flex items-center justify-center text-xs font-black">7</span>
                Reklamacje i zgłoszenia błędów
              </h2>
              <ol className="list-decimal list-inside pl-1 space-y-2">
                <li>
                  Wszelkie reklamacje, błędy techniczne w działaniu kreatora lub pytania dotyczące funkcjonowania Serwisu należy zgłaszać pod adresem e-mail: <a href="mailto:kontakt@cv-free.pl" className="text-sky-600 hover:underline">kontakt@cv-free.pl</a>.
                </li>
                <li>
                  Administrator dokłada starań, aby rozpatrzyć zgłoszenie w terminie do 14 dni roboczych od dnia jego wpłynięcia.
                </li>
              </ol>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-slate-200/65 bg-white py-8">
        <div className="mx-auto max-w-4xl px-4 md:px-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold text-slate-400">© {new Date().getFullYear()} cv-free.pl • Wszelkie prawa zastrzeżone.</span>
          </div>
          <div className="flex items-center gap-4 text-xs font-bold text-slate-400">
            <Link to="/polityka-prywatnosci" className="hover:text-slate-700">Polityka Prywatności</Link>
            <Link to="/regulamin" className="hover:text-slate-700">Regulamin</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
