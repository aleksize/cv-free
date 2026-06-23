import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { CvData, Experience, Education, Skill, Language, Certificate, CustomSection } from '../types/cv';

const emptyPersonal = (): CvData['personal'] => ({
  fullName: '',
  jobTitle: '',
  photo: '',
  email: '',
  phone: '',
  location: '',
  website: '',
  linkedin: '',
  summary: '',
});

interface CvState {
  data: CvData;
  setPersonal: (patch: Partial<CvData['personal']>) => void;
  addExperience: () => void;
  updateExperience: (id: string, patch: Partial<Experience>) => void;
  removeExperience: (id: string) => void;
  addEducation: () => void;
  updateEducation: (id: string, patch: Partial<Education>) => void;
  removeEducation: (id: string) => void;
  addSkill: () => void;
  updateSkill: (id: string, patch: Partial<Skill>) => void;
  removeSkill: (id: string) => void;
  addLanguage: () => void;
  updateLanguage: (id: string, patch: Partial<Language>) => void;
  removeLanguage: (id: string) => void;
  addCertificate: () => void;
  updateCertificate: (id: string, patch: Partial<Certificate>) => void;
  removeCertificate: (id: string) => void;
  addCustomSection: () => void;
  updateCustomSection: (id: string, patch: Partial<CustomSection>) => void;
  removeCustomSection: (id: string) => void;
  setTemplate: (template: string) => void;
  setColorPreset: (colorPreset: string) => void;
  setFont: (font: string) => void;
  setSpacing: (spacing: 'small' | 'medium' | 'large') => void;
  setMargin: (margin: 'small' | 'medium' | 'large') => void;
  setRodoClause: (rodoClause: string) => void;
  setShowRodo: (showRodo: boolean) => void;
  setShowWatermark: (showWatermark: boolean) => void;
  reset: () => void;
  loadDemoData: () => void;
}

export const demoData: CvData = {
  personal: {
    fullName: 'Jan Kowalski',
    jobTitle: 'Senior React Developer',
    photo: '', // Empty by default, user can upload
    email: 'jan.kowalski@email.pl',
    phone: '+48 500 600 700',
    location: 'Warszawa, Polska',
    website: 'https://jankowalski.dev',
    linkedin: 'linkedin.com/in/jankowalski',
    summary: 'Doświadczony programista front-end z ponad 6-letnim stażem w projektowaniu i wdrażaniu skalowalnych aplikacji internetowych. Specjalizuję się w technologiach React, TypeScript oraz optymalizacji Core Web Vitals. Posiadam praktyczną wiedzę z zakresu architektury micro-frontends i systemów design system.',
  },
  experience: [
    {
      id: 'demo-exp-1',
      company: 'Tech Solutions Sp. z o.o.',
      role: 'Senior Front-end Developer',
      startDate: '2022-03',
      endDate: 'Obecnie',
      description: '• Kierowanie 5-osobowym zespołem deweloperów front-end.\n• Wdrożenie architektury mikrofront-endów, co przyspieszyło proces wdrażania zmian o 40%.\n• Refaktoryzacja legacy code i optymalizacja wydajności, skutkująca poprawą Core Web Vitals o 30%.\n• Nadzorowanie integracji z systemami API RESTful i GraphQL.',
    },
    {
      id: 'demo-exp-2',
      company: 'Software House SA',
      role: 'React Developer',
      startDate: '2020-01',
      endDate: '2022-02',
      description: '• Budowanie aplikacji jednostronicowych (SPA) przy użyciu React, Redux Toolkit i TypeScript.\n• Tworzenie autorskich komponentów UI zgodnych z wytycznymi WCAG 2.1.\n• Automatyzacja testów jednostkowych (Jest, React Testing Library), co zwiększyło pokrycie kodu o 45%.',
    },
  ],
  education: [
    {
      id: 'demo-edu-1',
      university: 'Politechnika Warszawska',
      degree: 'Magister Inżynier Informatyki',
      startDate: '2018',
      endDate: '2020',
    },
    {
      id: 'demo-edu-2',
      university: 'Politechnika Warszawska',
      degree: 'Licencjat (Inżynier) Informatyki',
      startDate: '2014',
      endDate: '2018',
    },
  ],
  skills: [
    { id: 's1', name: 'React' },
    { id: 's2', name: 'TypeScript' },
    { id: 's3', name: 'Redux Toolkit' },
    { id: 's4', name: 'Next.js' },
    { id: 's5', name: 'Tailwind CSS v4' },
    { id: 's6', name: 'GraphQL / REST' },
    { id: 's7', name: 'Jest / Cypress' },
    { id: 's8', name: 'Git & CI/CD' },
  ],
  languages: [
    { id: 'l1', name: 'Polski', level: 'Ojczysty (Native)' },
    { id: 'l2', name: 'Angielski', level: 'C1 (Zaawansowany)' },
    { id: 'l3', name: 'Niemiecki', level: 'A2 (Podstawowy)' },
  ],
  certificates: [
    { id: 'c1', name: 'AWS Certified Cloud Practitioner', issuer: 'Amazon Web Services', date: '2024' },
    { id: 'c2', name: 'Professional Scrum Master I (PSM I)', issuer: 'Scrum.org', date: '2023' },
  ],
  customSections: [
    {
      id: 'cs1',
      title: 'Zainteresowania',
      content: 'Pasjonat technologii IoT, druku 3D oraz kolarstwa szosowego. W wolnym czasie rozwijam własne biblioteki open-source na platformie GitHub.',
    },
  ],
  template: 'modern',
  colorPreset: '#0ea5e9',
  font: 'Inter',
  spacing: 'medium',
  margin: 'medium',
  rodoClause: 'Wyrażam zgodę na przetwarzanie moich danych osobowych dla potrzeb niezbędnych do realizacji procesu tej oraz przyszłych rekrutacji zgodnie z art. 6 ust. 1 lit. a Rozporządzenia Parlamentu Europejskiego i Rady (UE) 2016/679 z dnia 27 kwietnia 2016 w sprawie ochrony osób fizycznych w związku z przetwarzaniem danych osobowych i w sprawie swobodnego przepływu takich danych oraz uchylenia dyrektywy 95/46/WE (ogólne rozporządzenie o ochronie danych).',
  showRodo: true,
  showWatermark: true,
};

const initialData: CvData = {
  personal: emptyPersonal(),
  experience: [],
  education: [],
  skills: [],
  languages: [],
  certificates: [],
  customSections: [],
  template: 'modern',
  colorPreset: '#0ea5e9',
  font: 'Inter',
  spacing: 'medium',
  margin: 'medium',
  rodoClause: 'Wyrażam zgodę na przetwarzanie moich danych osobowych dla potrzeb niezbędnych do realizacji procesu tej oraz przyszłych rekrutacji zgodnie z art. 6 ust. 1 lit. a Rozporządzenia Parlamentu Europejskiego i Rady (UE) 2016/679 z dnia 27 kwietnia 2016 w sprawie ochrony osób fizycznych w związku z przetwarzaniem danych osobowych i w sprawie swobodnego przepływu takich danych oraz uchylenia dyrektywy 95/46/WE (ogólne rozporządzenie o ochronie danych).',
  showRodo: true,
  showWatermark: true,
};

export const useCvStore = create<CvState>()(
  persist(
    (set) => ({
      data: initialData, // Start with empty fields (with placeholders) by default
      setPersonal: (patch) =>
        set((state) => ({
          data: {
            ...state.data,
            personal: { ...state.data.personal, ...patch },
          },
        })),
      addExperience: () =>
        set((state) => ({
          data: {
            ...state.data,
            experience: [
              ...state.data.experience,
              { id: crypto.randomUUID(), company: '', role: '', startDate: '', endDate: '', description: '' },
            ],
          },
        })),
      updateExperience: (id, patch) =>
        set((state) => ({
          data: {
            ...state.data,
            experience: state.data.experience.map((item) =>
              item.id === id ? { ...item, ...patch } : item,
            ),
          },
        })),
      removeExperience: (id) =>
        set((state) => ({
          data: {
            ...state.data,
            experience: state.data.experience.filter((item) => item.id !== id),
          },
        })),
      addEducation: () =>
        set((state) => ({
          data: {
            ...state.data,
            education: [
              ...state.data.education,
              { id: crypto.randomUUID(), university: '', degree: '', startDate: '', endDate: '' },
            ],
          },
        })),
      updateEducation: (id, patch) =>
        set((state) => ({
          data: {
            ...state.data,
            education: state.data.education.map((item) =>
              item.id === id ? { ...item, ...patch } : item,
            ),
          },
        })),
      removeEducation: (id) =>
        set((state) => ({
          data: {
            ...state.data,
            education: state.data.education.filter((item) => item.id !== id),
          },
        })),
      addSkill: () =>
        set((state) => ({
          data: {
            ...state.data,
            skills: [...state.data.skills, { id: crypto.randomUUID(), name: '' }],
          },
        })),
      updateSkill: (id, patch) =>
        set((state) => ({
          data: {
            ...state.data,
            skills: state.data.skills.map((item) =>
              item.id === id ? { ...item, ...patch } : item,
            ),
          },
        })),
      removeSkill: (id) =>
        set((state) => ({
          data: {
            ...state.data,
            skills: state.data.skills.filter((item) => item.id !== id),
          },
        })),
      addLanguage: () =>
        set((state) => ({
          data: {
            ...state.data,
            languages: [...state.data.languages, { id: crypto.randomUUID(), name: '', level: '' }],
          },
        })),
      updateLanguage: (id, patch) =>
        set((state) => ({
          data: {
            ...state.data,
            languages: state.data.languages.map((item) =>
              item.id === id ? { ...item, ...patch } : item,
            ),
          },
        })),
      removeLanguage: (id) =>
        set((state) => ({
          data: {
            ...state.data,
            languages: state.data.languages.filter((item) => item.id !== id),
          },
        })),
      addCertificate: () =>
        set((state) => ({
          data: {
            ...state.data,
            certificates: [
              ...state.data.certificates,
              { id: crypto.randomUUID(), name: '', issuer: '', date: '' },
            ],
          },
        })),
      updateCertificate: (id, patch) =>
        set((state) => ({
          data: {
            ...state.data,
            certificates: state.data.certificates.map((item) =>
              item.id === id ? { ...item, ...patch } : item,
            ),
          },
        })),
      removeCertificate: (id) =>
        set((state) => ({
          data: {
            ...state.data,
            certificates: state.data.certificates.filter((item) => item.id !== id),
          },
        })),
      addCustomSection: () =>
        set((state) => ({
          data: {
            ...state.data,
            customSections: [
              ...state.data.customSections,
              { id: crypto.randomUUID(), title: '', content: '' },
            ],
          },
        })),
      updateCustomSection: (id, patch) =>
        set((state) => ({
          data: {
            ...state.data,
            customSections: state.data.customSections.map((item) =>
              item.id === id ? { ...item, ...patch } : item,
            ),
          },
        })),
      removeCustomSection: (id) =>
        set((state) => ({
          data: {
            ...state.data,
            customSections: state.data.customSections.filter((item) => item.id !== id),
          },
        })),
      setTemplate: (template) =>
        set((state) => ({
          data: { ...state.data, template },
        })),
      setColorPreset: (colorPreset) =>
        set((state) => ({
          data: { ...state.data, colorPreset },
        })),
      setFont: (font) =>
        set((state) => ({
          data: { ...state.data, font },
        })),
      setSpacing: (spacing) =>
        set((state) => ({
          data: { ...state.data, spacing },
        })),
      setMargin: (margin) =>
        set((state) => ({
          data: { ...state.data, margin },
        })),
      setRodoClause: (rodoClause) =>
        set((state) => ({
          data: { ...state.data, rodoClause },
        })),
      setShowRodo: (showRodo) =>
        set((state) => ({
          data: { ...state.data, showRodo },
        })),
      setShowWatermark: (showWatermark) =>
        set((state) => ({
          data: { ...state.data, showWatermark },
        })),
      reset: () => set({ data: initialData }),
      loadDemoData: () => set({ data: demoData }),
    }),
    {
      name: 'cv-free-storage',
    },
  ),
);
