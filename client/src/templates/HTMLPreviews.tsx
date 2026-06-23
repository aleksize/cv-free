import type { CvData } from '../types/cv';

interface PreviewProps {
  data: CvData;
}

export function HTMLPreview({ data }: PreviewProps) {
  const renderTemplate = () => {
    switch (data.template) {
      case 'classic':
        return <ClassicPreview data={data} />;
      case 'minimal':
        return <MinimalPreview data={data} />;
      case 'technical':
        return <TechnicalPreview data={data} />;
      case 'modern':
      default:
        return <ModernPreview data={data} />;
    }
  };

  const fontStyle = {
    fontFamily:
      data.font === 'Roboto'
        ? "'Roboto', sans-serif"
        : data.font === 'Montserrat'
        ? "'Montserrat', sans-serif"
        : "'Inter', sans-serif",
  };

  return (
    <div style={fontStyle} className="h-full w-full bg-white text-slate-800">
      {renderTemplate()}
    </div>
  );
}

// ----------------------------------------------------
// 1. CLASSIC TEMPLATE
// ----------------------------------------------------
function ClassicPreview({ data }: PreviewProps) {
  const accent = data.colorPreset;
  const paddingClass = data.margin === 'small' ? 'p-6' : data.margin === 'large' ? 'p-12' : 'p-9';
  const itemGapClass = data.spacing === 'small' ? 'space-y-1' : data.spacing === 'large' ? 'space-y-4' : 'space-y-2.5';
  const sectionGapClass = data.spacing === 'small' ? 'space-y-3' : data.spacing === 'large' ? 'space-y-7' : 'space-y-5';

  return (
    <div className={`h-full w-full flex flex-col ${paddingClass} text-[11px] leading-relaxed`}>
      {/* Header */}
      <div className="flex flex-col items-center border-b border-slate-200 pb-3 mb-4 text-center">
        <div className="flex items-center justify-center gap-4">
          {data.personal.photo && (
            <img
              src={data.personal.photo}
              alt={data.personal.fullName}
              className="w-12 h-12 rounded-full object-cover border border-slate-200"
            />
          )}
          <div>
            <h2 className="text-xl font-bold uppercase tracking-wide text-slate-900 leading-tight">
              {data.personal.fullName || 'Imię i nazwisko'}
            </h2>
            <p className="text-xs font-semibold uppercase tracking-wider mt-0.5" style={{ color: accent }}>
              {data.personal.jobTitle || 'Stanowisko'}
            </p>
          </div>
        </div>

        <div className="flex flex-wrap justify-center gap-x-3 gap-y-1 mt-2 text-[9px] text-slate-500">
          {data.personal.email && <span>{data.personal.email}</span>}
          {data.personal.phone && <span>• {data.personal.phone}</span>}
          {data.personal.location && <span>• {data.personal.location}</span>}
          {data.personal.website && (
            <span>
              •{' '}
              <a href={data.personal.website} target="_blank" rel="noreferrer" className="hover:underline">
                {data.personal.website.replace(/^https?:\/\//, '')}
              </a>
            </span>
          )}
          {data.personal.linkedin && <span>• {data.personal.linkedin}</span>}
        </div>
      </div>

      <div className={sectionGapClass}>
        {/* Profile Summary */}
        {data.personal.summary && (
          <div>
            <h3 className="text-[10px] font-bold uppercase tracking-wider pb-1 mb-1.5 border-b" style={{ borderBottomColor: accent }}>
              Profil zawodowy
            </h3>
            <p className="text-[10px] text-slate-600 leading-relaxed whitespace-pre-line">{data.personal.summary}</p>
          </div>
        )}

        {/* Experience */}
        {data.experience.length > 0 && (
          <div>
            <h3 className="text-[10px] font-bold uppercase tracking-wider pb-1 mb-2.5 border-b" style={{ borderBottomColor: accent }}>
              Doświadczenie zawodowe
            </h3>
            <div className={itemGapClass}>
              {data.experience.map((exp) => (
                <div key={exp.id}>
                  <div className="flex justify-between items-baseline font-bold text-slate-900">
                    <span className="text-[10px]">{exp.role || 'Stanowisko'}</span>
                    <span className="text-[9px] text-slate-500 font-normal">
                      {exp.startDate} {exp.endDate ? `— ${exp.endDate}` : ''}
                    </span>
                  </div>
                  <div className="text-[9px] text-slate-500 font-medium mb-1">{exp.company || 'Firma'}</div>
                  {exp.description && (
                    <p className="text-[9px] text-slate-600 whitespace-pre-line leading-relaxed">
                      {exp.description}
                    </p>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Education */}
        {data.education.length > 0 && (
          <div>
            <h3 className="text-[10px] font-bold uppercase tracking-wider pb-1 mb-2.5 border-b" style={{ borderBottomColor: accent }}>
              Wykształcenie
            </h3>
            <div className={itemGapClass}>
              {data.education.map((edu) => (
                <div key={edu.id}>
                  <div className="flex justify-between items-baseline font-bold text-slate-900">
                    <span className="text-[10px]">{edu.degree || 'Kierunek / Tytuł'}</span>
                    <span className="text-[9px] text-slate-500 font-normal">
                      {edu.startDate} {edu.endDate ? `— ${edu.endDate}` : ''}
                    </span>
                  </div>
                  <div className="text-[9px] text-slate-500 font-medium">{edu.university || 'Uczelnia'}</div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Two columns for bottom details */}
        <div className="grid grid-cols-2 gap-6 pt-1">
          {/* Left Column */}
          {(data.skills.length > 0 || data.languages.length > 0) && (
            <div className="space-y-4">
              {data.skills.length > 0 && (
                <div>
                  <h3 className="text-[10px] font-bold uppercase tracking-wider pb-1 mb-1.5 border-b" style={{ borderBottomColor: accent }}>
                    Umiejętności
                  </h3>
                  <div className="flex flex-wrap gap-1">
                    {data.skills.map((skill) => (
                      <span key={skill.id} className="bg-slate-100 text-slate-700 px-2 py-0.5 rounded text-[9px] font-medium">
                        {skill.name}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {data.languages.length > 0 && (
                <div>
                  <h3 className="text-[10px] font-bold uppercase tracking-wider pb-1 mb-1.5 border-b" style={{ borderBottomColor: accent }}>
                    Języki obce
                  </h3>
                  <div className="space-y-1">
                    {data.languages.map((lang) => (
                      <div key={lang.id} className="flex justify-between text-[9px]">
                        <span className="font-semibold text-slate-800">{lang.name}</span>
                        <span className="text-slate-500">{lang.level}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Right Column */}
          {(data.certificates.length > 0 || data.customSections.length > 0) && (
            <div className="space-y-4">
              {data.certificates.length > 0 && (
                <div>
                  <h3 className="text-[10px] font-bold uppercase tracking-wider pb-1 mb-1.5 border-b" style={{ borderBottomColor: accent }}>
                    Certyfikaty
                  </h3>
                  <div className="space-y-1.5">
                    {data.certificates.map((cert) => (
                      <div key={cert.id} className="text-[9px]">
                        <p className="font-bold text-slate-800 leading-tight">{cert.name}</p>
                        <p className="text-slate-500 leading-tight">
                          {cert.issuer} {cert.date ? `(${cert.date})` : ''}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {data.customSections.map((sec) => (
                <div key={sec.id}>
                  <h3 className="text-[10px] font-bold uppercase tracking-wider pb-1 mb-1.5 border-b" style={{ borderBottomColor: accent }}>
                    {sec.title || 'Inne'}
                  </h3>
                  <p className="text-[9px] text-slate-600 whitespace-pre-line leading-relaxed">{sec.content}</p>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {(data.showRodo || data.showWatermark) && (
        <div className="mt-auto pt-2">
          {data.showRodo && data.rodoClause && (
            <div className="border-t border-slate-200 pt-2 text-[7.5px] text-slate-400 leading-normal text-justify">
              {data.rodoClause}
            </div>
          )}
          {data.showWatermark && (
            <div className="text-center text-[8px] text-slate-400 mt-1.5 font-medium">
              Wygenerowano przez www.cv-free.pl
            </div>
          )}
        </div>
      )}
    </div>
  );
}

// ----------------------------------------------------
// 2. MODERN TEMPLATE
// ----------------------------------------------------
function ModernPreview({ data }: PreviewProps) {
  const accent = data.colorPreset;
  const paddingClass = data.margin === 'small' ? 'p-5' : data.margin === 'large' ? 'p-10' : 'p-8';
  const itemGapClass = data.spacing === 'small' ? 'space-y-1' : data.spacing === 'large' ? 'space-y-4' : 'space-y-2.5';

  return (
    <div className={`h-full w-full flex flex-col ${paddingClass} text-[10px] leading-relaxed`}>
      {/* Header */}
      <div className="flex items-center gap-4 border-b-2 pb-4 mb-4" style={{ borderBottomColor: accent }}>
        {data.personal.photo && (
          <img
            src={data.personal.photo}
            alt={data.personal.fullName}
            className="w-14 h-14 rounded-full object-cover border-2"
            style={{ borderColor: accent }}
          />
        )}
        <div>
          <h2 className="text-2xl font-extrabold text-slate-900 tracking-tight leading-none">
            {data.personal.fullName || 'Imię i nazwisko'}
          </h2>
          <p className="text-xs font-semibold tracking-wide mt-1.5" style={{ color: accent }}>
            {data.personal.jobTitle || 'Stanowisko'}
          </p>
        </div>
      </div>

      {/* Two Column Layout */}
      <div className="flex flex-1 gap-6 min-h-0">
        {/* Sidebar */}
        <div className="w-[150px] shrink-0 flex flex-col gap-5">
          {/* Contact */}
          <div>
            <h4 className="text-[9px] font-bold uppercase tracking-wider border-l-2 pl-2 mb-2" style={{ borderLeftColor: accent }}>
              Kontakt
            </h4>
            <div className="space-y-2 text-[9px]">
              {data.personal.email && (
                <div>
                  <p className="text-[7.5px] text-slate-400 font-bold uppercase">Email</p>
                  <p className="text-slate-700 truncate">{data.personal.email}</p>
                </div>
              )}
              {data.personal.phone && (
                <div>
                  <p className="text-[7.5px] text-slate-400 font-bold uppercase">Telefon</p>
                  <p className="text-slate-700">{data.personal.phone}</p>
                </div>
              )}
              {data.personal.location && (
                <div>
                  <p className="text-[7.5px] text-slate-400 font-bold uppercase">Lokalizacja</p>
                  <p className="text-slate-700">{data.personal.location}</p>
                </div>
              )}
              {data.personal.website && (
                <div>
                  <p className="text-[7.5px] text-slate-400 font-bold uppercase">Strona WWW</p>
                  <p className="text-slate-700 truncate">{data.personal.website.replace(/^https?:\/\//, '')}</p>
                </div>
              )}
              {data.personal.linkedin && (
                <div>
                  <p className="text-[7.5px] text-slate-400 font-bold uppercase">LinkedIn</p>
                  <p className="text-slate-700 truncate">{data.personal.linkedin}</p>
                </div>
              )}
            </div>
          </div>

          {/* Skills */}
          {data.skills.length > 0 && (
            <div>
              <h4 className="text-[9px] font-bold uppercase tracking-wider border-l-2 pl-2 mb-2" style={{ borderLeftColor: accent }}>
                Umiejętności
              </h4>
              <div className="flex flex-wrap gap-1">
                {data.skills.map((skill) => (
                  <span
                    key={skill.id}
                    className="bg-slate-100 text-slate-700 px-2 py-0.5 rounded text-[8.5px] font-medium"
                  >
                    {skill.name}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Languages */}
          {data.languages.length > 0 && (
            <div>
              <h4 className="text-[9px] font-bold uppercase tracking-wider border-l-2 pl-2 mb-2" style={{ borderLeftColor: accent }}>
                Języki
              </h4>
              <div className="space-y-1 text-[8.5px]">
                {data.languages.map((lang) => (
                  <div key={lang.id} className="flex justify-between">
                    <span className="font-semibold text-slate-800">{lang.name}</span>
                    <span className="text-slate-500 text-[8px]">{lang.level}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Main Content Area */}
        <div className="flex-1 flex flex-col gap-4">
          {/* Summary */}
          {data.personal.summary && (
            <div>
              <h3 className="text-[10px] font-bold uppercase tracking-wider pb-1 mb-1.5 border-b border-slate-200">
                Profil zawodowy
              </h3>
              <p className="text-[9.5px] text-slate-600 leading-relaxed whitespace-pre-line">{data.personal.summary}</p>
            </div>
          )}

          {/* Experience */}
          {data.experience.length > 0 && (
            <div>
              <h3 className="text-[10px] font-bold uppercase tracking-wider pb-1 mb-2 border-b border-slate-200">
                Doświadczenie zawodowe
              </h3>
              <div className={itemGapClass}>
                {data.experience.map((exp) => (
                  <div key={exp.id}>
                    <div className="flex justify-between items-baseline">
                      <span className="text-[10px] font-bold text-slate-900">{exp.role || 'Stanowisko'}</span>
                      <span className="text-[8.5px] text-slate-500">
                        {exp.startDate} {exp.endDate ? `— ${exp.endDate}` : ''}
                      </span>
                    </div>
                    <div className="text-[9px] font-semibold mb-1" style={{ color: accent }}>{exp.company || 'Firma'}</div>
                    {exp.description && (
                      <p className="text-[9px] text-slate-600 whitespace-pre-line leading-relaxed">
                        {exp.description}
                      </p>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Education */}
          {data.education.length > 0 && (
            <div>
              <h3 className="text-[10px] font-bold uppercase tracking-wider pb-1 mb-2 border-b border-slate-200">
                Wykształcenie
              </h3>
              <div className={itemGapClass}>
                {data.education.map((edu) => (
                  <div key={edu.id}>
                    <div className="flex justify-between items-baseline font-semibold text-slate-900">
                      <span className="text-[9.5px]">{edu.degree || 'Kierunek'}</span>
                      <span className="text-[8.5px] text-slate-500 font-normal">
                        {edu.startDate} {edu.endDate ? `— ${edu.endDate}` : ''}
                      </span>
                    </div>
                    <div className="text-[8.5px] text-slate-500">{edu.university || 'Uczelnia'}</div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Certificates */}
          {data.certificates.length > 0 && (
            <div>
              <h3 className="text-[10px] font-bold uppercase tracking-wider pb-1 mb-1.5 border-b border-slate-200">
                Certyfikaty
              </h3>
              <div className="grid grid-cols-2 gap-2">
                {data.certificates.map((cert) => (
                  <div key={cert.id} className="text-[8.5px]">
                    <p className="font-bold text-slate-800 leading-tight">{cert.name}</p>
                    <p className="text-slate-500 leading-tight">
                      {cert.issuer} {cert.date ? `| ${cert.date}` : ''}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Custom Sections */}
          {data.customSections.map((sec) => (
            <div key={sec.id}>
              <h3 className="text-[10px] font-bold uppercase tracking-wider pb-1 mb-1.5 border-b border-slate-200">
                {sec.title || 'Inne'}
              </h3>
              <p className="text-[8.5px] text-slate-600 whitespace-pre-line leading-relaxed">{sec.content}</p>
            </div>
          ))}
        </div>
      </div>

      {(data.showRodo || data.showWatermark) && (
        <div className="mt-auto pt-2">
          {data.showRodo && data.rodoClause && (
            <div className="border-t border-slate-200 pt-2 text-[7.5px] text-slate-400 leading-normal text-justify">
              {data.rodoClause}
            </div>
          )}
          {data.showWatermark && (
            <div className="text-center text-[8px] text-slate-400 mt-1.5 font-medium">
              Wygenerowano przez www.cv-free.pl
            </div>
          )}
        </div>
      )}
    </div>
  );
}

// ----------------------------------------------------
// 3. MINIMAL TEMPLATE
// ----------------------------------------------------
function MinimalPreview({ data }: PreviewProps) {
  const paddingClass = data.margin === 'small' ? 'p-6' : data.margin === 'large' ? 'p-14' : 'p-10';
  const itemGapClass = data.spacing === 'small' ? 'space-y-1' : data.spacing === 'large' ? 'space-y-4' : 'space-y-2.5';
  const sectionGapClass = data.spacing === 'small' ? 'space-y-3' : data.spacing === 'large' ? 'space-y-7' : 'space-y-5';

  return (
    <div className={`h-full w-full flex flex-col ${paddingClass} text-[10px] leading-relaxed text-zinc-700`}>
      {/* Header */}
      <div className="mb-5">
        <div className="flex items-center gap-4">
          {data.personal.photo && (
            <img
              src={data.personal.photo}
              alt={data.personal.fullName}
              className="w-12 h-12 rounded object-cover border border-zinc-200"
            />
          )}
          <div>
            <h2 className="text-xl font-bold tracking-tight text-zinc-900 leading-none">
              {data.personal.fullName || 'Imię i nazwisko'}
            </h2>
            <p className="text-[9.5px] font-medium text-zinc-400 uppercase tracking-wider mt-1">
              {data.personal.jobTitle || 'Stanowisko'}
            </p>
          </div>
        </div>

        <div className="flex flex-wrap gap-x-4 gap-y-1 mt-3 text-[8.5px] text-zinc-400">
          {data.personal.email && <span>{data.personal.email}</span>}
          {data.personal.phone && <span>• {data.personal.phone}</span>}
          {data.personal.location && <span>• {data.personal.location}</span>}
          {data.personal.website && <span>• {data.personal.website.replace(/^https?:\/\//, '')}</span>}
          {data.personal.linkedin && <span>• {data.personal.linkedin}</span>}
        </div>
      </div>

      <div className={sectionGapClass}>
        {/* Profile Summary */}
        {data.personal.summary && (
          <div>
            <h3 className="text-[9px] font-bold text-zinc-900 uppercase tracking-widest pb-1 border-b border-zinc-200 mb-2">
              O mnie
            </h3>
            <p className="text-[9px] text-zinc-600 leading-relaxed whitespace-pre-line">{data.personal.summary}</p>
          </div>
        )}

        {/* Experience */}
        {data.experience.length > 0 && (
          <div>
            <h3 className="text-[9px] font-bold text-zinc-900 uppercase tracking-widest pb-1 border-b border-zinc-200 mb-2">
              Doświadczenie
            </h3>
            <div className={itemGapClass}>
              {data.experience.map((exp) => (
                <div key={exp.id}>
                  <div className="flex justify-between items-baseline font-bold text-zinc-950">
                    <span className="text-[9.5px]">{exp.role || 'Stanowisko'}</span>
                    <span className="text-[8.5px] text-zinc-400 font-normal">
                      {exp.startDate} {exp.endDate ? `— ${exp.endDate}` : ''}
                    </span>
                  </div>
                  <div className="text-[8.5px] text-zinc-400 font-medium">{exp.company || 'Firma'}</div>
                  {exp.description && (
                    <p className="text-[8.5px] text-zinc-600 whitespace-pre-line leading-relaxed mt-1">
                      {exp.description}
                    </p>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Education */}
        {data.education.length > 0 && (
          <div>
            <h3 className="text-[9px] font-bold text-zinc-900 uppercase tracking-widest pb-1 border-b border-zinc-200 mb-2">
              Edukacja
            </h3>
            <div className={itemGapClass}>
              {data.education.map((edu) => (
                <div key={edu.id}>
                  <div className="flex justify-between items-baseline font-semibold text-zinc-900">
                    <span className="text-[9.5px]">{edu.degree || 'Kierunek'}</span>
                    <span className="text-[8.5px] text-zinc-400 font-normal">
                      {edu.startDate} {edu.endDate ? `— ${edu.endDate}` : ''}
                    </span>
                  </div>
                  <div className="text-[8.5px] text-zinc-400">{edu.university || 'Uczelnia'}</div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Bottom grid */}
        <div className="grid grid-cols-2 gap-8 pt-1">
          {/* Left Col */}
          {(data.skills.length > 0 || data.languages.length > 0) && (
            <div className="space-y-4">
              {data.skills.length > 0 && (
                <div>
                  <h3 className="text-[9px] font-bold text-zinc-900 uppercase tracking-widest pb-1 border-b border-zinc-200 mb-2">
                    Umiejętności
                  </h3>
                  <div className="flex flex-wrap gap-1">
                    {data.skills.map((skill) => (
                      <span key={skill.id} className="border border-zinc-200 text-zinc-700 px-2 py-0.5 rounded text-[8.5px]">
                        {skill.name}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {data.languages.length > 0 && (
                <div>
                  <h3 className="text-[9px] font-bold text-zinc-900 uppercase tracking-widest pb-1 border-b border-zinc-200 mb-2">
                    Języki
                  </h3>
                  <div className="space-y-1">
                    {data.languages.map((lang) => (
                      <div key={lang.id} className="flex justify-between text-[8.5px]">
                        <span className="font-semibold text-zinc-800">{lang.name}</span>
                        <span className="text-zinc-400">{lang.level}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Right Col */}
          {(data.certificates.length > 0 || data.customSections.length > 0) && (
            <div className="space-y-4">
              {data.certificates.length > 0 && (
                <div>
                  <h3 className="text-[9px] font-bold text-zinc-900 uppercase tracking-widest pb-1 border-b border-zinc-200 mb-2">
                    Certyfikaty
                  </h3>
                  <div className="space-y-1.5">
                    {data.certificates.map((cert) => (
                      <div key={cert.id} className="text-[8.5px]">
                        <p className="font-semibold text-zinc-900 leading-tight">{cert.name}</p>
                        <p className="text-zinc-400 leading-tight">
                          {cert.issuer} {cert.date ? `(${cert.date})` : ''}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {data.customSections.map((sec) => (
                <div key={sec.id}>
                  <h3 className="text-[9px] font-bold text-zinc-900 uppercase tracking-widest pb-1 border-b border-zinc-200 mb-2">
                    {sec.title || 'Inne'}
                  </h3>
                  <p className="text-[8.5px] text-zinc-500 whitespace-pre-line leading-relaxed">{sec.content}</p>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {(data.showRodo || data.showWatermark) && (
        <div className="mt-auto pt-2">
          {data.showRodo && data.rodoClause && (
            <div className="border-t border-zinc-200 pt-2 text-[7.5px] text-zinc-400 leading-normal text-justify">
              {data.rodoClause}
            </div>
          )}
          {data.showWatermark && (
            <div className="text-center text-[8px] text-zinc-400 mt-1.5 font-medium">
              Wygenerowano przez www.cv-free.pl
            </div>
          )}
        </div>
      )}
    </div>
  );
}

// ----------------------------------------------------
// 4. TECHNICAL TEMPLATE
// ----------------------------------------------------
function TechnicalPreview({ data }: PreviewProps) {
  const accent = data.colorPreset;
  const paddingClass = data.margin === 'small' ? 'p-5' : data.margin === 'large' ? 'p-10' : 'p-8';
  const itemGapClass = data.spacing === 'small' ? 'space-y-1' : data.spacing === 'large' ? 'space-y-3.5' : 'space-y-2';
  const sectionGapClass = data.spacing === 'small' ? 'space-y-2.5' : data.spacing === 'large' ? 'space-y-6' : 'space-y-4.5';

  return (
    <div className={`h-full w-full flex flex-col ${paddingClass} text-[9.5px] leading-relaxed text-gray-800`}>
      {/* Header */}
      <div className="flex justify-between items-start border-b border-gray-300 pb-2 mb-3">
        <div className="flex items-center gap-3">
          {data.personal.photo && (
            <img
              src={data.personal.photo}
              alt={data.personal.fullName}
              className="w-12 h-12 rounded-full object-cover"
            />
          )}
          <div>
            <h2 className="text-lg font-bold text-gray-900 leading-none">
              {data.personal.fullName || 'Imię i nazwisko'}
            </h2>
            <p className="text-[9.5px] font-semibold mt-1" style={{ color: accent }}>
              {data.personal.jobTitle || 'Stanowisko'}
            </p>
          </div>
        </div>

        <div className="text-right text-[8px] text-gray-500 space-y-0.5">
          {data.personal.email && <p>{data.personal.email}</p>}
          {data.personal.phone && <p>{data.personal.phone}</p>}
          {data.personal.location && <p>{data.personal.location}</p>}
          {data.personal.website && <p>{data.personal.website}</p>}
          {data.personal.linkedin && <p>{data.personal.linkedin}</p>}
        </div>
      </div>

      <div className={sectionGapClass}>
        {/* Profile Summary */}
        {data.personal.summary && (
          <div>
            <h3 className="text-[9px] font-bold text-gray-900 uppercase bg-gray-100 px-2 py-0.5 border-l-4 mb-2" style={{ borderLeftColor: accent }}>
              Opis zawodowy
            </h3>
            <p className="text-[9px] text-gray-700 leading-relaxed whitespace-pre-line">{data.personal.summary}</p>
          </div>
        )}

        {/* Experience */}
        {data.experience.length > 0 && (
          <div>
            <h3 className="text-[9px] font-bold text-gray-900 uppercase bg-gray-100 px-2 py-0.5 border-l-4 mb-2" style={{ borderLeftColor: accent }}>
              Doświadczenie zawodowe
            </h3>
            <div className={itemGapClass}>
              {data.experience.map((exp) => (
                <div key={exp.id}>
                  <div className="flex justify-between items-baseline font-bold text-gray-900">
                    <span className="text-[9.5px]">{exp.role || 'Stanowisko'}</span>
                    <span className="text-[8px] text-gray-500 font-normal">
                      {exp.startDate} {exp.endDate ? `— ${exp.endDate}` : ''}
                    </span>
                  </div>
                  <div className="text-[8.5px] text-gray-500 font-medium">{exp.company || 'Firma'}</div>
                  {exp.description && (
                    <p className="text-[8.5px] text-gray-600 whitespace-pre-line leading-relaxed mt-1 font-mono">
                      {exp.description}
                    </p>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Education */}
        {data.education.length > 0 && (
          <div>
            <h3 className="text-[9px] font-bold text-gray-900 uppercase bg-gray-100 px-2 py-0.5 border-l-4 mb-2" style={{ borderLeftColor: accent }}>
              Edukacja
            </h3>
            <div className={itemGapClass}>
              {data.education.map((edu) => (
                <div key={edu.id}>
                  <div className="flex justify-between items-baseline font-semibold text-gray-900">
                    <span className="text-[9.5px]">{edu.degree || 'Kierunek / Tytuł'}</span>
                    <span className="text-[8px] text-gray-500 font-normal">
                      {edu.startDate} {edu.endDate ? `— ${edu.endDate}` : ''}
                    </span>
                  </div>
                  <div className="text-[8.5px] text-gray-500">{edu.university || 'Uczelnia'}</div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Grid for Skills and other elements */}
        <div className="grid grid-cols-2 gap-5 pt-1">
          {/* Left Col */}
          {(data.skills.length > 0 || data.languages.length > 0) && (
            <div className="space-y-3">
              {data.skills.length > 0 && (
                <div>
                  <h3 className="text-[9px] font-bold text-gray-900 uppercase bg-gray-100 px-2 py-0.5 border-l-4 mb-2" style={{ borderLeftColor: accent }}>
                    Kluczowe umiejętności
                  </h3>
                  <div className="flex flex-wrap gap-1.5">
                    {data.skills.map((skill) => (
                      <span
                        key={skill.id}
                        className="bg-gray-50 border border-gray-200 text-gray-800 px-2 py-0.5 rounded text-[8px] font-mono"
                      >
                        {skill.name}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {data.languages.length > 0 && (
                <div>
                  <h3 className="text-[9px] font-bold text-gray-900 uppercase bg-gray-100 px-2 py-0.5 border-l-4 mb-2" style={{ borderLeftColor: accent }}>
                    Języki obce
                  </h3>
                  <div className="space-y-1">
                    {data.languages.map((lang) => (
                      <div key={lang.id} className="flex justify-between text-[8.5px]">
                        <span className="font-semibold text-gray-800">{lang.name}</span>
                        <span className="text-gray-500">{lang.level}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Right Col */}
          {(data.certificates.length > 0 || data.customSections.length > 0) && (
            <div className="space-y-3">
              {data.certificates.length > 0 && (
                <div>
                  <h3 className="text-[9px] font-bold text-gray-900 uppercase bg-gray-100 px-2 py-0.5 border-l-4 mb-2" style={{ borderLeftColor: accent }}>
                    Certyfikaty
                  </h3>
                  <div className="space-y-1">
                    {data.certificates.map((cert) => (
                      <div key={cert.id} className="text-[8.5px]">
                        <p className="font-bold text-gray-950 leading-tight">{cert.name}</p>
                        <p className="text-gray-500 leading-tight">
                          {cert.issuer} {cert.date ? `(${cert.date})` : ''}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {data.customSections.map((sec) => (
                <div key={sec.id}>
                  <h3 className="text-[9px] font-bold text-gray-900 uppercase bg-gray-100 px-2 py-0.5 border-l-4 mb-2" style={{ borderLeftColor: accent }}>
                    {sec.title || 'Inne'}
                  </h3>
                  <p className="text-[8.5px] text-gray-700 whitespace-pre-line leading-relaxed">{sec.content}</p>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {(data.showRodo || data.showWatermark) && (
        <div className="mt-auto pt-2">
          {data.showRodo && data.rodoClause && (
            <div className="border-t border-slate-200 pt-2 text-[7.5px] text-slate-400 leading-normal text-justify">
              {data.rodoClause}
            </div>
          )}
          {data.showWatermark && (
            <div className="text-center text-[8px] text-slate-400 mt-1.5 font-medium">
              Wygenerowano przez www.cv-free.pl
            </div>
          )}
        </div>
      )}
    </div>
  );
}
