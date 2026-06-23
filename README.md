# CV Creator — cv-free.pl
> Darmowe CV w 30 sekund. AI wersja na gen-cv.pl.

![License: MIT](https://img.shields.io/badge/license-MIT-blue)

---

## Co to jest

CV Creator to nowoczesny konstruktor CV bez rejestracji. Wpisz dane, wybierz styl, pobierz PDF.

### Dwa osobne produkty

- **cv-free.pl** — darmowy konstruktor, bez AI, bez limitów, bez rejestracji. Technicznie maksymalnie prosty.
- **gen-cv.pl** — płatna wersja z AI (DeepSeek/Gemini Flash), subskrypcje, zaawansowana generacja.

Dlaczego osobno: `cv-free.pl` działa na czystym React + PDF, bez API, bez kluczy, bez free-tier problemów. SEO na „darmowe CV” działa organicznie. Konwersja do płatnej wersji następuje naturalnie po pobraniu PDF.

---

## Demo

*(link po pierwszym deployie)*

## Technologie

- **Frontend:** React + TypeScript + Vite + Tailwind
- **PDF:** `@react-pdf/renderer`
- **Stan:** Zustand
- **Formularze:** React Hook Form + Zod
- **Hosting:** FTP (az.pl) / Vercel
- **Backend:** brak w MVP — wszystko na kliencie

## Szybki start

```bash
cd client
npm install
npm run dev
```

## Dokumentacja

- `01-architecture.md` — architektura, domena i model biznesowy
- `02-setup-guide.md` — setup i deploy
- `03-implementation-plan.md` — plan sprintów
- `04-design.md` — UX/UI specyfikacja 2026

## Roadmap

- [x] Architektura + specyfikacja UX 2026
- [ ] MVP: builder w jednym ekranie, 5–8 stylów, PDF, localStorage
- [ ] Phase 2: drag-and-drop, import LinkedIn, więcej szablonów
- [ ] gen-cv.pl — oddzielny projekt z AI i płatnościami

## Licencja

MIT
