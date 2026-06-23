import React, { useState } from 'react';
import { useCvStore } from '../stores/cvStore';

export default function LeftPanel() {
  const {
    data,
    setPersonal,
    addExperience,
    updateExperience,
    removeExperience,
    addEducation,
    updateEducation,
    removeEducation,
    addSkill,
    updateSkill,
    removeSkill,
    addLanguage,
    updateLanguage,
    removeLanguage,
    addCertificate,
    updateCertificate,
    removeCertificate,
    addCustomSection,
    updateCustomSection,
    removeCustomSection,
    setRodoClause,
    setShowRodo,
    reset,
  } = useCvStore();

  const [activeSection, setActiveSection] = useState<string | null>('personal');

  const toggleSection = (section: string) => {
    setActiveSection(activeSection === section ? null : section);
  };

  const handlePhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      const img = new Image();
      img.onload = () => {
        const canvas = document.createElement('canvas');
        const MAX_WIDTH = 120;
        const MAX_HEIGHT = 120;
        let width = img.width;
        let height = img.height;

        if (width > height) {
          if (width > MAX_WIDTH) {
            height *= MAX_WIDTH / width;
            width = MAX_WIDTH;
          }
        } else {
          if (height > MAX_HEIGHT) {
            width *= MAX_HEIGHT / height;
            height = MAX_HEIGHT;
          }
        }
        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext('2d');
        ctx?.drawImage(img, 0, 0, width, height);
        const dataUrl = canvas.toDataURL('image/jpeg', 0.85);
        setPersonal({ photo: dataUrl });
      };
      img.src = event.target?.result as string;
    };
    reader.readAsDataURL(file);
  };

  const removePhoto = () => {
    setPersonal({ photo: '' });
  };

  return (
    <aside className="w-full md:w-[420px] bg-white border-r border-slate-200 overflow-y-auto flex flex-col h-full shrink-0 shadow-sm z-10">
      {/* Panel Header */}
      <div className="p-5 border-b border-slate-200 bg-slate-50/50">
        <h2 className="text-base font-bold text-slate-800 tracking-tight">Dane Twojego CV</h2>
        <p className="text-xs text-slate-500 mt-1">Uzupełnij swoje dane. Zmiany są automatycznie zapisywane.</p>
      </div>

      <div className="flex-1 p-4 space-y-3">
        {/* 1. DANE OSOBOWE */}
        <div className="rounded-xl border border-slate-200 overflow-hidden bg-white">
          <button
            onClick={() => toggleSection('personal')}
            className={`w-full flex items-center justify-between px-4 py-3 text-left font-semibold text-sm transition ${
              activeSection === 'personal' ? 'bg-sky-50/50 text-sky-600' : 'text-slate-800 hover:bg-slate-50'
            }`}
          >
            <div className="flex items-center gap-2.5">
              <span className="material-symbols-outlined text-lg">person</span>
              <span>Dane osobowe</span>
            </div>
            <span className={`material-symbols-outlined text-lg transition-transform duration-200 ${
              activeSection === 'personal' ? 'rotate-180 text-sky-600' : 'text-slate-400'
            }`}>
              expand_more
            </span>
          </button>

          {activeSection === 'personal' && (
            <div className="p-4 border-t border-slate-100 space-y-4 accordion-enter">
              {/* Photo Upload */}
              <div className="flex items-center gap-4">
                <div className="h-16 w-16 rounded-full bg-slate-100 border border-slate-200 flex items-center justify-center overflow-hidden shrink-0">
                  {data.personal.photo ? (
                    <img src={data.personal.photo} alt="Avatar" className="h-full w-full object-cover" />
                  ) : (
                    <span className="material-symbols-outlined text-slate-400 text-3xl">account_circle</span>
                  )}
                </div>
                <div className="flex flex-col gap-1.5">
                  <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">Zdjęcie profilowe</span>
                  <div className="flex items-center gap-2">
                    <label className="cursor-pointer rounded-lg bg-sky-50 hover:bg-sky-100 text-sky-600 px-3 py-1.5 text-xs font-semibold transition border border-sky-100">
                      Dodaj zdjęcie
                      <input type="file" accept="image/*" className="hidden" onChange={handlePhotoChange} />
                    </label>
                    {data.personal.photo && (
                      <button
                        onClick={removePhoto}
                        className="rounded-lg text-rose-600 hover:bg-rose-50 px-2 py-1.5 text-xs font-semibold transition border border-transparent hover:border-rose-100"
                      >
                        Usuń
                      </button>
                    )}
                  </div>
                </div>
              </div>

              {/* Personal details fields */}
              <div className="grid grid-cols-1 gap-3">
                <div className="flex flex-col gap-1">
                  <label className="text-[10px] font-bold uppercase tracking-wider text-slate-500">Imię i nazwisko</label>
                  <input
                    type="text"
                    className="h-10 rounded-lg border border-slate-200 px-3 text-sm text-slate-800 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-sky-500/20 focus:border-sky-500 transition"
                    placeholder="np. Jan Kowalski"
                    value={data.personal.fullName}
                    onChange={(e) => setPersonal({ fullName: e.target.value })}
                  />
                </div>
                <div className="flex flex-col gap-1">
                  <label className="text-[10px] font-bold uppercase tracking-wider text-slate-500">Stanowisko</label>
                  <input
                    type="text"
                    className="h-10 rounded-lg border border-slate-200 px-3 text-sm text-slate-800 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-sky-500/20 focus:border-sky-500 transition"
                    placeholder="np. Senior React Developer"
                    value={data.personal.jobTitle}
                    onChange={(e) => setPersonal({ jobTitle: e.target.value })}
                  />
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div className="flex flex-col gap-1">
                    <label className="text-[10px] font-bold uppercase tracking-wider text-slate-500">Email</label>
                    <input
                      type="email"
                      className="h-10 rounded-lg border border-slate-200 px-3 text-sm text-slate-800 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-sky-500/20 focus:border-sky-500 transition"
                      placeholder="jan@email.pl"
                      value={data.personal.email}
                      onChange={(e) => setPersonal({ email: e.target.value })}
                    />
                  </div>
                  <div className="flex flex-col gap-1">
                    <label className="text-[10px] font-bold uppercase tracking-wider text-slate-500">Telefon</label>
                    <input
                      type="text"
                      className="h-10 rounded-lg border border-slate-200 px-3 text-sm text-slate-800 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-sky-500/20 focus:border-sky-500 transition"
                      placeholder="+48 500 600 700"
                      value={data.personal.phone}
                      onChange={(e) => setPersonal({ phone: e.target.value })}
                    />
                  </div>
                </div>
                <div className="flex flex-col gap-1">
                  <label className="text-[10px] font-bold uppercase tracking-wider text-slate-500">Lokalizacja</label>
                  <input
                    type="text"
                    className="h-10 rounded-lg border border-slate-200 px-3 text-sm text-slate-800 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-sky-500/20 focus:border-sky-500 transition"
                    placeholder="np. Warszawa, Polska"
                    value={data.personal.location}
                    onChange={(e) => setPersonal({ location: e.target.value })}
                  />
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div className="flex flex-col gap-1">
                    <label className="text-[10px] font-bold uppercase tracking-wider text-slate-500">Strona WWW</label>
                    <input
                      type="text"
                      className="h-10 rounded-lg border border-slate-200 px-3 text-sm text-slate-800 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-sky-500/20 focus:border-sky-500 transition"
                      placeholder="https://jankowalski.dev"
                      value={data.personal.website}
                      onChange={(e) => setPersonal({ website: e.target.value })}
                    />
                  </div>
                  <div className="flex flex-col gap-1">
                    <label className="text-[10px] font-bold uppercase tracking-wider text-slate-500">LinkedIn</label>
                    <input
                      type="text"
                      className="h-10 rounded-lg border border-slate-200 px-3 text-sm text-slate-800 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-sky-500/20 focus:border-sky-500 transition"
                      placeholder="linkedin.com/in/username"
                      value={data.personal.linkedin}
                      onChange={(e) => setPersonal({ linkedin: e.target.value })}
                    />
                  </div>
                </div>
                <div className="flex flex-col gap-1">
                  <label className="text-[10px] font-bold uppercase tracking-wider text-slate-500">Podsumowanie zawodowe</label>
                  <textarea
                    className="rounded-lg border border-slate-200 px-3 py-2 text-sm text-slate-800 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-sky-500/20 focus:border-sky-500 transition resize-y"
                    rows={4}
                    placeholder="Opisz krótko swoje doświadczenie, kluczowe sukcesy i kierunek rozwoju..."
                    value={data.personal.summary}
                    onChange={(e) => setPersonal({ summary: e.target.value })}
                  />
                </div>
              </div>
            </div>
          )}
        </div>

        {/* 2. DOŚWIADCZENIE */}
        <div className="rounded-xl border border-slate-200 overflow-hidden bg-white">
          <button
            onClick={() => toggleSection('experience')}
            className={`w-full flex items-center justify-between px-4 py-3 text-left font-semibold text-sm transition ${
              activeSection === 'experience' ? 'bg-sky-50/50 text-sky-600' : 'text-slate-800 hover:bg-slate-50'
            }`}
          >
            <div className="flex items-center gap-2.5">
              <span className="material-symbols-outlined text-lg">work</span>
              <span>Doświadczenie zawodowe</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="bg-slate-100 text-slate-600 text-[10px] px-1.5 py-0.5 rounded font-bold">
                {data.experience.length}
              </span>
              <span className={`material-symbols-outlined text-lg transition-transform duration-200 ${
                activeSection === 'experience' ? 'rotate-180 text-sky-600' : 'text-slate-400'
              }`}>
                expand_more
              </span>
            </div>
          </button>

          {activeSection === 'experience' && (
            <div className="p-4 border-t border-slate-100 space-y-4 accordion-enter">
              {data.experience.map((exp, index) => (
                <div key={exp.id} className="p-3 border border-slate-100 bg-slate-50/50 rounded-xl space-y-3 relative group">
                  <div className="flex justify-between items-center">
                    <span className="text-[10px] font-bold text-slate-400 uppercase">Pozycja #{index + 1}</span>
                    <button
                      onClick={() => removeExperience(exp.id)}
                      className="text-rose-600 hover:text-rose-800 text-xs font-semibold flex items-center gap-0.5"
                    >
                      <span className="material-symbols-outlined text-base">delete</span>
                      <span>Usuń</span>
                    </button>
                  </div>

                  <div className="grid grid-cols-1 gap-2.5">
                    <div className="grid grid-cols-2 gap-3">
                      <div className="flex flex-col gap-1">
                        <label className="text-[9px] font-bold uppercase tracking-wider text-slate-500">Stanowisko</label>
                        <input
                          type="text"
                          className="h-9 rounded-lg border border-slate-200 px-3 text-xs text-slate-800 focus:outline-none focus:ring-2 focus:ring-sky-500/20 focus:border-sky-500 transition"
                          placeholder="np. React Developer"
                          value={exp.role}
                          onChange={(e) => updateExperience(exp.id, { role: e.target.value })}
                        />
                      </div>
                      <div className="flex flex-col gap-1">
                        <label className="text-[9px] font-bold uppercase tracking-wider text-slate-500">Firma / Pracodawca</label>
                        <input
                          type="text"
                          className="h-9 rounded-lg border border-slate-200 px-3 text-xs text-slate-800 focus:outline-none focus:ring-2 focus:ring-sky-500/20 focus:border-sky-500 transition"
                          placeholder="np. Google"
                          value={exp.company}
                          onChange={(e) => updateExperience(exp.id, { company: e.target.value })}
                        />
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-3">
                      <div className="flex flex-col gap-1">
                        <label className="text-[9px] font-bold uppercase tracking-wider text-slate-500">Od (RRRR-MM)</label>
                        <input
                          type="text"
                          className="h-9 rounded-lg border border-slate-200 px-3 text-xs text-slate-800 focus:outline-none focus:ring-2 focus:ring-sky-500/20 focus:border-sky-500 transition"
                          placeholder="np. 2020-01"
                          value={exp.startDate}
                          onChange={(e) => updateExperience(exp.id, { startDate: e.target.value })}
                        />
                      </div>
                      <div className="flex flex-col gap-1">
                        <label className="text-[9px] font-bold uppercase tracking-wider text-slate-500">Do (lub "Obecnie")</label>
                        <input
                          type="text"
                          className="h-9 rounded-lg border border-slate-200 px-3 text-xs text-slate-800 focus:outline-none focus:ring-2 focus:ring-sky-500/20 focus:border-sky-500 transition"
                          placeholder="np. Obecnie"
                          value={exp.endDate}
                          onChange={(e) => updateExperience(exp.id, { endDate: e.target.value })}
                        />
                      </div>
                    </div>
                    <div className="flex flex-col gap-1">
                      <label className="text-[9px] font-bold uppercase tracking-wider text-slate-500">Opis obowiązków i sukcesów</label>
                      <textarea
                        className="rounded-lg border border-slate-200 px-3 py-2 text-xs text-slate-800 focus:outline-none focus:ring-2 focus:ring-sky-500/20 focus:border-sky-500 transition resize-y"
                        rows={3}
                        placeholder="• Budowa panelu admina w React&#10;• Optymalizacja Core Web Vitals..."
                        value={exp.description}
                        onChange={(e) => updateExperience(exp.id, { description: e.target.value })}
                      />
                    </div>
                  </div>
                </div>
              ))}
              <button
                onClick={addExperience}
                className="w-full flex items-center justify-center gap-1.5 rounded-lg border border-dashed border-slate-300 hover:border-sky-500 hover:text-sky-600 bg-white py-2 text-xs font-semibold text-slate-600 transition"
              >
                <span className="material-symbols-outlined text-base">add</span>
                <span>Dodaj doświadczenie</span>
              </button>
            </div>
          )}
        </div>

        {/* 3. WYKSZTAŁCENIE */}
        <div className="rounded-xl border border-slate-200 overflow-hidden bg-white">
          <button
            onClick={() => toggleSection('education')}
            className={`w-full flex items-center justify-between px-4 py-3 text-left font-semibold text-sm transition ${
              activeSection === 'education' ? 'bg-sky-50/50 text-sky-600' : 'text-slate-800 hover:bg-slate-50'
            }`}
          >
            <div className="flex items-center gap-2.5">
              <span className="material-symbols-outlined text-lg">school</span>
              <span>Wykształcenie</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="bg-slate-100 text-slate-600 text-[10px] px-1.5 py-0.5 rounded font-bold">
                {data.education.length}
              </span>
              <span className={`material-symbols-outlined text-lg transition-transform duration-200 ${
                activeSection === 'education' ? 'rotate-180 text-sky-600' : 'text-slate-400'
              }`}>
                expand_more
              </span>
            </div>
          </button>

          {activeSection === 'education' && (
            <div className="p-4 border-t border-slate-100 space-y-4 accordion-enter">
              {data.education.map((edu, index) => (
                <div key={edu.id} className="p-3 border border-slate-100 bg-slate-50/50 rounded-xl space-y-3 relative">
                  <div className="flex justify-between items-center">
                    <span className="text-[10px] font-bold text-slate-400 uppercase">Szkoła #{index + 1}</span>
                    <button
                      onClick={() => removeEducation(edu.id)}
                      className="text-rose-600 hover:text-rose-800 text-xs font-semibold flex items-center gap-0.5"
                    >
                      <span className="material-symbols-outlined text-base">delete</span>
                      <span>Usuń</span>
                    </button>
                  </div>

                  <div className="grid grid-cols-1 gap-2.5">
                    <div className="flex flex-col gap-1">
                      <label className="text-[9px] font-bold uppercase tracking-wider text-slate-500">Uczelnia / Szkoła</label>
                      <input
                        type="text"
                        className="h-9 rounded-lg border border-slate-200 px-3 text-xs text-slate-800 focus:outline-none focus:ring-2 focus:ring-sky-500/20 focus:border-sky-500 transition"
                        placeholder="np. Politechnika Warszawska"
                        value={edu.university}
                        onChange={(e) => updateEducation(edu.id, { university: e.target.value })}
                      />
                    </div>
                    <div className="flex flex-col gap-1">
                      <label className="text-[9px] font-bold uppercase tracking-wider text-slate-500">Kierunek / Stopień</label>
                      <input
                        type="text"
                        className="h-9 rounded-lg border border-slate-200 px-3 text-xs text-slate-800 focus:outline-none focus:ring-2 focus:ring-sky-500/20 focus:border-sky-500 transition"
                        placeholder="np. Magister Inżynier Informatyki"
                        value={edu.degree}
                        onChange={(e) => updateEducation(edu.id, { degree: e.target.value })}
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-3">
                      <div className="flex flex-col gap-1">
                        <label className="text-[9px] font-bold uppercase tracking-wider text-slate-500">Rok rozpoczęcia</label>
                        <input
                          type="text"
                          className="h-9 rounded-lg border border-slate-200 px-3 text-xs text-slate-800 focus:outline-none focus:ring-2 focus:ring-sky-500/20 focus:border-sky-500 transition"
                          placeholder="np. 2018"
                          value={edu.startDate}
                          onChange={(e) => updateEducation(edu.id, { startDate: e.target.value })}
                        />
                      </div>
                      <div className="flex flex-col gap-1">
                        <label className="text-[9px] font-bold uppercase tracking-wider text-slate-500">Rok ukończenia</label>
                        <input
                          type="text"
                          className="h-9 rounded-lg border border-slate-200 px-3 text-xs text-slate-800 focus:outline-none focus:ring-2 focus:ring-sky-500/20 focus:border-sky-500 transition"
                          placeholder="np. 2020"
                          value={edu.endDate}
                          onChange={(e) => updateEducation(edu.id, { endDate: e.target.value })}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              ))}
              <button
                onClick={addEducation}
                className="w-full flex items-center justify-center gap-1.5 rounded-lg border border-dashed border-slate-300 hover:border-sky-500 hover:text-sky-600 bg-white py-2 text-xs font-semibold text-slate-600 transition"
              >
                <span className="material-symbols-outlined text-base">add</span>
                <span>Dodaj wykształcenie</span>
              </button>
            </div>
          )}
        </div>

        {/* 4. UMIEJĘTNOŚCI */}
        <div className="rounded-xl border border-slate-200 overflow-hidden bg-white">
          <button
            onClick={() => toggleSection('skills')}
            className={`w-full flex items-center justify-between px-4 py-3 text-left font-semibold text-sm transition ${
              activeSection === 'skills' ? 'bg-sky-50/50 text-sky-600' : 'text-slate-800 hover:bg-slate-50'
            }`}
          >
            <div className="flex items-center gap-2.5">
              <span className="material-symbols-outlined text-lg">psychology</span>
              <span>Umiejętności</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="bg-slate-100 text-slate-600 text-[10px] px-1.5 py-0.5 rounded font-bold">
                {data.skills.length}
              </span>
              <span className={`material-symbols-outlined text-lg transition-transform duration-200 ${
                activeSection === 'skills' ? 'rotate-180 text-sky-600' : 'text-slate-400'
              }`}>
                expand_more
              </span>
            </div>
          </button>

          {activeSection === 'skills' && (
            <div className="p-4 border-t border-slate-100 space-y-3 accordion-enter">
              <div className="flex flex-wrap gap-2 mb-2">
                {data.skills.map((skill) => (
                  <div
                    key={skill.id}
                    className="flex items-center gap-1.5 bg-slate-100 text-slate-700 rounded-lg px-2.5 py-1 text-xs font-medium border border-slate-200"
                  >
                    <input
                      type="text"
                      className="bg-transparent focus:outline-none w-20 text-xs text-slate-800 font-medium"
                      value={skill.name}
                      placeholder="Umiejętność"
                      onChange={(e) => updateSkill(skill.id, { name: e.target.value })}
                    />
                    <button
                      onClick={() => removeSkill(skill.id)}
                      className="text-slate-400 hover:text-rose-600 flex items-center transition"
                      aria-label="Usuń"
                    >
                      <span className="material-symbols-outlined text-sm">close</span>
                    </button>
                  </div>
                ))}
              </div>
              <button
                onClick={addSkill}
                className="w-full flex items-center justify-center gap-1.5 rounded-lg border border-dashed border-slate-300 hover:border-sky-500 hover:text-sky-600 bg-white py-2 text-xs font-semibold text-slate-600 transition"
              >
                <span className="material-symbols-outlined text-base">add</span>
                <span>Dodaj umiejętność</span>
              </button>
            </div>
          )}
        </div>

        {/* 5. JĘZYKI OBCE */}
        <div className="rounded-xl border border-slate-200 overflow-hidden bg-white">
          <button
            onClick={() => toggleSection('languages')}
            className={`w-full flex items-center justify-between px-4 py-3 text-left font-semibold text-sm transition ${
              activeSection === 'languages' ? 'bg-sky-50/50 text-sky-600' : 'text-slate-800 hover:bg-slate-50'
            }`}
          >
            <div className="flex items-center gap-2.5">
              <span className="material-symbols-outlined text-lg">language</span>
              <span>Języki obce</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="bg-slate-100 text-slate-600 text-[10px] px-1.5 py-0.5 rounded font-bold">
                {data.languages.length}
              </span>
              <span className={`material-symbols-outlined text-lg transition-transform duration-200 ${
                activeSection === 'languages' ? 'rotate-180 text-sky-600' : 'text-slate-400'
              }`}>
                expand_more
              </span>
            </div>
          </button>

          {activeSection === 'languages' && (
            <div className="p-4 border-t border-slate-100 space-y-3 accordion-enter">
              {data.languages.map((lang) => (
                <div key={lang.id} className="flex gap-2 items-center bg-slate-50/50 p-2 border border-slate-100 rounded-lg">
                  <input
                    type="text"
                    className="h-8 flex-1 rounded-lg border border-slate-200 px-2 text-xs text-slate-800 focus:outline-none focus:ring-1 focus:ring-sky-500/20 focus:border-sky-500 transition"
                    placeholder="Język np. Angielski"
                    value={lang.name}
                    onChange={(e) => updateLanguage(lang.id, { name: e.target.value })}
                  />
                  <input
                    type="text"
                    className="h-8 w-28 rounded-lg border border-slate-200 px-2 text-xs text-slate-800 focus:outline-none focus:ring-1 focus:ring-sky-500/20 focus:border-sky-500 transition"
                    placeholder="Poziom np. B2"
                    value={lang.level}
                    onChange={(e) => updateLanguage(lang.id, { level: e.target.value })}
                  />
                  <button
                    onClick={() => removeLanguage(lang.id)}
                    className="text-slate-400 hover:text-rose-600 p-1 flex items-center transition"
                  >
                    <span className="material-symbols-outlined text-lg">delete</span>
                  </button>
                </div>
              ))}
              <button
                onClick={addLanguage}
                className="w-full flex items-center justify-center gap-1.5 rounded-lg border border-dashed border-slate-300 hover:border-sky-500 hover:text-sky-600 bg-white py-2 text-xs font-semibold text-slate-600 transition"
              >
                <span className="material-symbols-outlined text-base">add</span>
                <span>Dodaj język</span>
              </button>
            </div>
          )}
        </div>

        {/* 6. CERTYFIKATY I KURSY */}
        <div className="rounded-xl border border-slate-200 overflow-hidden bg-white">
          <button
            onClick={() => toggleSection('certificates')}
            className={`w-full flex items-center justify-between px-4 py-3 text-left font-semibold text-sm transition ${
              activeSection === 'certificates' ? 'bg-sky-50/50 text-sky-600' : 'text-slate-800 hover:bg-slate-50'
            }`}
          >
            <div className="flex items-center gap-2.5">
              <span className="material-symbols-outlined text-lg">military_tech</span>
              <span>Certyfikaty i kursy</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="bg-slate-100 text-slate-600 text-[10px] px-1.5 py-0.5 rounded font-bold">
                {data.certificates.length}
              </span>
              <span className={`material-symbols-outlined text-lg transition-transform duration-200 ${
                activeSection === 'certificates' ? 'rotate-180 text-sky-600' : 'text-slate-400'
              }`}>
                expand_more
              </span>
            </div>
          </button>

          {activeSection === 'certificates' && (
            <div className="p-4 border-t border-slate-100 space-y-3 accordion-enter">
              {data.certificates.map((cert) => (
                <div key={cert.id} className="p-3 border border-slate-100 bg-slate-50/50 rounded-xl space-y-2.5">
                  <div className="flex justify-between items-center">
                    <span className="text-[9px] font-bold text-slate-400 uppercase">Wpis</span>
                    <button
                      onClick={() => removeCertificate(cert.id)}
                      className="text-rose-600 hover:text-rose-800 text-xs font-semibold flex items-center gap-0.5"
                    >
                      <span className="material-symbols-outlined text-base">delete</span>
                      <span>Usuń</span>
                    </button>
                  </div>
                  <div className="flex flex-col gap-2">
                    <input
                      type="text"
                      className="h-8 rounded-lg border border-slate-200 px-3 text-xs text-slate-800 focus:outline-none focus:ring-1 focus:ring-sky-500/20 focus:border-sky-500 transition"
                      placeholder="Nazwa certyfikatu / kursu"
                      value={cert.name}
                      onChange={(e) => updateCertificate(cert.id, { name: e.target.value })}
                    />
                    <div className="grid grid-cols-2 gap-2">
                      <input
                        type="text"
                        className="h-8 rounded-lg border border-slate-200 px-3 text-xs text-slate-800 focus:outline-none focus:ring-1 focus:ring-sky-500/20 focus:border-sky-500 transition"
                        placeholder="Wystawca np. AWS"
                        value={cert.issuer}
                        onChange={(e) => updateCertificate(cert.id, { issuer: e.target.value })}
                      />
                      <input
                        type="text"
                        className="h-8 rounded-lg border border-slate-200 px-3 text-xs text-slate-800 focus:outline-none focus:ring-1 focus:ring-sky-500/20 focus:border-sky-500 transition"
                        placeholder="Rok np. 2024"
                        value={cert.date}
                        onChange={(e) => updateCertificate(cert.id, { date: e.target.value })}
                      />
                    </div>
                  </div>
                </div>
              ))}
              <button
                onClick={addCertificate}
                className="w-full flex items-center justify-center gap-1.5 rounded-lg border border-dashed border-slate-300 hover:border-sky-500 hover:text-sky-600 bg-white py-2 text-xs font-semibold text-slate-600 transition"
              >
                <span className="material-symbols-outlined text-base">add</span>
                <span>Dodaj certyfikat</span>
              </button>
            </div>
          )}
        </div>

        {/* 7. WŁASNA SEKCJA */}
        <div className="rounded-xl border border-slate-200 overflow-hidden bg-white">
          <button
            onClick={() => toggleSection('custom')}
            className={`w-full flex items-center justify-between px-4 py-3 text-left font-semibold text-sm transition ${
              activeSection === 'custom' ? 'bg-sky-50/50 text-sky-600' : 'text-slate-800 hover:bg-slate-50'
            }`}
          >
            <div className="flex items-center gap-2.5">
              <span className="material-symbols-outlined text-lg">add_box</span>
              <span>Własna sekcja</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="bg-slate-100 text-slate-600 text-[10px] px-1.5 py-0.5 rounded font-bold">
                {data.customSections.length}
              </span>
              <span className={`material-symbols-outlined text-lg transition-transform duration-200 ${
                activeSection === 'custom' ? 'rotate-180 text-sky-600' : 'text-slate-400'
              }`}>
                expand_more
              </span>
            </div>
          </button>

          {activeSection === 'custom' && (
            <div className="p-4 border-t border-slate-100 space-y-3 accordion-enter">
              {data.customSections.map((sec) => (
                <div key={sec.id} className="p-3 border border-slate-100 bg-slate-50/50 rounded-xl space-y-2.5">
                  <div className="flex justify-between items-center">
                    <span className="text-[9px] font-bold text-slate-400 uppercase">Sekcja niestandardowa</span>
                    <button
                      onClick={() => removeCustomSection(sec.id)}
                      className="text-rose-600 hover:text-rose-800 text-xs font-semibold flex items-center gap-0.5"
                    >
                      <span className="material-symbols-outlined text-base">delete</span>
                      <span>Usuń</span>
                    </button>
                  </div>
                  <div className="flex flex-col gap-2">
                    <input
                      type="text"
                      className="h-8 rounded-lg border border-slate-200 px-3 text-xs text-slate-800 focus:outline-none focus:ring-1 focus:ring-sky-500/20 focus:border-sky-500 transition font-bold"
                      placeholder="Tytuł sekcji np. Zainteresowania"
                      value={sec.title}
                      onChange={(e) => updateCustomSection(sec.id, { title: e.target.value })}
                    />
                    <textarea
                      className="rounded-lg border border-slate-200 px-3 py-2 text-xs text-slate-800 focus:outline-none focus:ring-1 focus:ring-sky-500/20 focus:border-sky-500 transition resize-y"
                      rows={3}
                      placeholder="Zawartość sekcji..."
                      value={sec.content}
                      onChange={(e) => updateCustomSection(sec.id, { content: e.target.value })}
                    />
                  </div>
                </div>
              ))}
              <button
                onClick={addCustomSection}
                className="w-full flex items-center justify-center gap-1.5 rounded-lg border border-dashed border-slate-300 hover:border-sky-500 hover:text-sky-600 bg-white py-2 text-xs font-semibold text-slate-600 transition"
              >
                <span className="material-symbols-outlined text-base">add</span>
                <span>Dodaj własną sekcję</span>
              </button>
            </div>
          )}
        </div>

        {/* 8. KLAUZULA RODO */}
        <div className="rounded-xl border border-slate-200 overflow-hidden bg-white">
          <button
            onClick={() => toggleSection('rodo')}
            className={`w-full flex items-center justify-between px-4 py-3 text-left font-semibold text-sm transition ${
              activeSection === 'rodo' ? 'bg-sky-50/50 text-sky-600' : 'text-slate-800 hover:bg-slate-50'
            }`}
          >
            <div className="flex items-center gap-2.5">
              <span className="material-symbols-outlined text-lg">gavel</span>
              <span>Klauzula RODO</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className={`h-2 w-2 rounded-full ${data.showRodo ? 'bg-emerald-500' : 'bg-slate-300'}`} />
              <span className={`material-symbols-outlined text-lg transition-transform duration-200 ${
                activeSection === 'rodo' ? 'rotate-180 text-sky-600' : 'text-slate-400'
              }`}>
                expand_more
              </span>
            </div>
          </button>

          {activeSection === 'rodo' && (
            <div className="p-4 border-t border-slate-100 space-y-3 accordion-enter">
              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  id="showRodo"
                  className="rounded text-sky-600 focus:ring-sky-500 h-4 w-4 border-slate-300 transition cursor-pointer"
                  checked={data.showRodo}
                  onChange={(e) => setShowRodo(e.target.checked)}
                />
                <label htmlFor="showRodo" className="text-xs font-semibold text-slate-700 cursor-pointer select-none">
                  Dołącz klauzulę RODO do CV
                </label>
              </div>

              {data.showRodo && (
                <div className="flex flex-col gap-1">
                  <label className="text-[9px] font-bold uppercase tracking-wider text-slate-500">Treść klauzuli</label>
                  <textarea
                    className="rounded-lg border border-slate-200 px-3 py-2 text-xs text-slate-800 focus:outline-none focus:ring-2 focus:ring-sky-500/20 focus:border-sky-500 transition resize-y font-normal"
                    rows={6}
                    placeholder="Wpisz treść klauzuli o ochronie danych osobowych..."
                    value={data.rodoClause}
                    onChange={(e) => setRodoClause(e.target.value)}
                  />
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Clear/Reset bar */}
      <div className="p-4 border-t border-slate-200 bg-slate-50 flex items-center gap-3">
        <button
          onClick={reset}
          className="flex-1 rounded-lg border border-slate-200 hover:border-rose-200 hover:text-rose-600 hover:bg-rose-50/20 bg-white py-2 text-xs font-semibold text-slate-600 transition"
        >
          Wyczyść wszystkie dane
        </button>
      </div>
    </aside>
  );
}
