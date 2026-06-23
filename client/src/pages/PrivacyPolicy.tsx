import { Link } from 'react-router-dom';

export default function PrivacyPolicy() {
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
              Ochrona danych osobowych
            </span>
            <h1 className="text-3xl font-black tracking-tight text-slate-900 sm:text-4xl leading-tight">
              Polityka Prywatności
            </h1>
            <p className="text-slate-500 text-xs font-medium">
              Ostatnia aktualizacja: 23 czerwca 2026 r.
            </p>
          </div>

          <div className="space-y-6 text-sm text-slate-600 leading-relaxed text-justify">
            <p>
              Niniejsza Polityka Prywatności określa zasady przetwarzania i ochrony danych osobowych osób korzystających z serwisu internetowego <strong>cv-free.pl</strong> (dalej jako „Serwis”). Dokładamy wszelkich starań, aby zapewnić najwyższy poziom prywatności i bezpieczeństwa naszych Użytkowników.
            </p>

            {/* Sec 1 */}
            <div className="space-y-3">
              <h2 className="text-lg font-bold text-slate-900 tracking-tight flex items-center gap-2">
                <span className="h-5 w-5 rounded-md bg-sky-50 text-sky-500 flex items-center justify-center text-xs font-black">1</span>
                Administrator Danych Osobowych
              </h2>
              <p>
                Administratorem danych osobowych w rozumieniu RODO (Rozporządzenia Parlamentu Europejskiego i Rady (UE) 2016/679 z dnia 27 kwietnia 2016 r. w sprawie ochrony osób fizycznych w związku z przetwarzaniem danych osobowych...) jest spółka:
              </p>
              <div className="bg-slate-50 rounded-2xl p-4 border border-slate-200/50 space-y-1.5 text-xs text-slate-700 font-medium">
                <p className="text-sm font-bold text-slate-900">Donner Spółka z ograniczoną odpowiedzialnością (Donner Sp. z o.o.)</p>
                <p>Adres siedziby: ul. Turkusowa 33 lok. 25, 70-778 Szczecin, Polska</p>
                <p>Wpisana do rejestru przedsiębiorców Krajowego Rejestru Sądowego (KRS) pod numerem: <strong>0000520328</strong></p>
                <p>NIP: <strong>8513177877</strong> | REGON: <strong>321560124</strong></p>
                <p>Kontakt mailowy: <a href="mailto:kontakt@cv-free.pl" className="text-sky-600 hover:underline">kontakt@cv-free.pl</a></p>
              </div>
            </div>

            {/* Sec 2 */}
            <div className="space-y-3">
              <h2 className="text-lg font-bold text-slate-900 tracking-tight flex items-center gap-2">
                <span className="h-5 w-5 rounded-md bg-sky-50 text-sky-500 flex items-center justify-center text-xs font-black">2</span>
                Zasada &quot;Local First&quot; — Twoje dane są bezpieczne
              </h2>
              <div className="bg-emerald-50/50 rounded-2xl p-4 border border-emerald-100 flex items-start gap-3">
                <span className="material-symbols-outlined text-emerald-500 mt-0.5">verified_user</span>
                <div className="space-y-1.5">
                  <p className="text-xs font-bold text-emerald-800 uppercase tracking-wider">Maksymalna prywatność</p>
                  <p className="text-xs text-emerald-700 leading-relaxed">
                    Nasz Serwis działa w oparciu o architekturę <strong>Local-First</strong>. Oznacza to, że wszelkie dane wprowadzane w edytorze CV (w tym imiona, nazwiska, wizerunek, dane kontaktowe, informacje o edukacji i pracy) <strong>nie są przesyłane na serwery zewnętrzne, nie są tam zapisywane ani gromadzone przez Administratora</strong>. Ostateczny plik PDF z CV jest generowany bezpośrednio na Twoim urządzeniu w przeglądarce.
                  </p>
                </div>
              </div>
              <p>
                Dane wpisywane przez Użytkownika w formularzach kreatora zapisywane są wyłącznie lokalnie, w pamięci podręcznej przeglądarki internetowej Użytkownika (tzw. <code>localStorage</code>). Administrator nie posiada fizycznego dostępu do tych danych, nie przechowuje ich w żadnej centralnej bazie danych ani nie profiluje pod ich kątem. Dane te są zachowywane w przeglądarce Użytkownika wyłącznie w celu wygody (aby przy ponownym otwarciu Serwisu dane nie zostały utracone).
              </p>
            </div>

            {/* Sec 3 */}
            <div className="space-y-3">
              <h2 className="text-lg font-bold text-slate-900 tracking-tight flex items-center gap-2">
                <span className="h-5 w-5 rounded-md bg-sky-50 text-sky-500 flex items-center justify-center text-xs font-black">3</span>
                Cele i zakres przetwarzania danych
              </h2>
              <p>
                Przetwarzanie danych na urządzeniu końcowym Użytkownika odbywa się wyłącznie w celu:
              </p>
              <ul className="list-disc list-inside pl-2 space-y-1">
                <li>Odwzorowania zawartości CV w szablonach graficznych na ekranie.</li>
                <li>Umożliwienia eksportu i pobrania CV w postaci pliku PDF.</li>
                <li>Zapewnienia wygody użytkowania (zapisywanie stanu formularzy w <code>localStorage</code> w celu późniejszej edycji).</li>
              </ul>
              <p>
                Użytkownik decyduje, jakie dane wprowadza w kreatorze. Podanie jakichkolwiek danych osobowych jest całkowicie dobrowolne i nie jest warunkiem korzystania z Serwisu (istnieje możliwość generowania dokumentu z fikcyjnymi lub częściowymi danymi).
              </p>
            </div>

            {/* Sec 4 */}
            <div className="space-y-3">
              <h2 className="text-lg font-bold text-slate-900 tracking-tight flex items-center gap-2">
                <span className="h-5 w-5 rounded-md bg-sky-50 text-sky-500 flex items-center justify-center text-xs font-black">4</span>
                Hosting i logi serwera
              </h2>
              <p>
                Korzystanie z Serwisu wiąże się z przesyłaniem zapytań do serwera, na którym hostowana jest strona. Każde zapytanie skierowane do serwera zapisywane jest w logach serwera. Logi obejmują m.in. adres IP Użytkownika, datę i czas zapytania, informacje o przeglądarce internetowej i systemie operacyjnym.
              </p>
              <p>
                Dane zapisane w logach serwera mają charakter wyłącznie techniczny i administracyjny. Nie są one kojarzone z konkretnymi osobami korzystającymi z Serwisu i nie są wykorzystywane przez Administratora w celu identyfikacji Użytkowników. Służą one wyłącznie do celów statystycznych, diagnostycznych oraz optymalizacji stabilności strony.
              </p>
            </div>

            {/* Sec 5 */}
            <div className="space-y-3">
              <h2 className="text-lg font-bold text-slate-900 tracking-tight flex items-center gap-2">
                <span className="h-5 w-5 rounded-md bg-sky-50 text-sky-500 flex items-center justify-center text-xs font-black">5</span>
                Pliki Cookies i technologie śledzące
              </h2>
              <p>
                Serwis może wykorzystywać pliki cookies (ciasteczka) oraz pamięć lokalną w celu prawidłowego działania funkcji interaktywnych. Pliki cookies to dane informatyczne przechowywane na urządzeniu końcowym Użytkownika.
              </p>
              <p>
                W ramach Serwisu stosowane są:
              </p>
              <ul className="list-disc list-inside pl-2 space-y-1">
                <li><strong>Cookies techniczne:</strong> niezbędne do prawidłowego wyświetlania witryny i zapamiętywania preferencji stylu (np. rozmiar czcionki, wybrany szablon).</li>
                <li><strong>Statystyki i analityka:</strong> możemy korzystać z zewnętrznych narzędzi (np. Google Analytics) zbierających anonimowe informacje o odwiedzinach w Serwisie (czas spędzony na stronie, odwiedzone podstrony, źródło ruchu). Pomaga nam to stale usprawniać nasz bezpłatny produkt.</li>
              </ul>
              <p>
                Przeglądarki internetowe zazwyczaj domyślnie dopuszczają przechowywanie plików cookies. Użytkownik ma możliwość w każdej chwili zmienić te ustawienia w swojej przeglądarce, blokując zapisywanie cookies bądź usuwając istniejące.
              </p>
            </div>

            {/* Sec 6 */}
            <div className="space-y-3">
              <h2 className="text-lg font-bold text-slate-900 tracking-tight flex items-center gap-2">
                <span className="h-5 w-5 rounded-md bg-sky-50 text-sky-500 flex items-center justify-center text-xs font-black">6</span>
                Prawa Użytkownika
              </h2>
              <p>
                Użytkownikowi przysługuje prawo dostępu do swoich danych, ich poprawiania, a także trwałego usunięcia. Ponieważ dane nie są przesyłane do naszej bazy danych na serwerze, Użytkownik realizuje te prawa bezpośrednio na swoim urządzeniu poprzez:
              </p>
              <ul className="list-disc list-inside pl-2 space-y-1">
                <li>Ręczną edycję lub usuwanie wpisów w polach formularza.</li>
                <li>Kliknięcie przycisku <strong>&quot;Wyczyść wszystkie dane&quot;</strong> w lewym dolnym rogu kreatora, co trwale usuwa cały stan z pamięci <code>localStorage</code>.</li>
                <li>Wyczyszczenie pamięci podręcznej i plików cookies w opcjach swojej przeglądarki internetowej.</li>
              </ul>
            </div>

            {/* Sec 7 */}
            <div className="space-y-3">
              <h2 className="text-lg font-bold text-slate-900 tracking-tight flex items-center gap-2">
                <span className="h-5 w-5 rounded-md bg-sky-50 text-sky-500 flex items-center justify-center text-xs font-black">7</span>
                Kontakt
              </h2>
              <p>
                W przypadku jakichkolwiek pytań, wątpliwości lub sugestii dotyczących Polityki Prywatności, zasad bezpieczeństwa lub działania Serwisu, prosimy o kontakt pod adresem poczty elektronicznej: <a href="mailto:kontakt@cv-free.pl" className="text-sky-600 hover:underline">kontakt@cv-free.pl</a>.
              </p>
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
