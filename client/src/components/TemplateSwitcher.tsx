import { useCvStore } from '../stores/cvStore';
import type { Template } from '../types/cv';

const templates: Template[] = [
  { id: 'classic', name: 'Klasyczny' },
  { id: 'modern', name: 'Nowoczesny' },
  { id: 'minimal', name: 'Minimal' },
  { id: 'technical', name: 'Techniczny' },
  { id: 'senior', name: 'Senior' },
];

export default function TemplateSwitcher() {
  const { data, setTemplate } = useCvStore();

  return (
    <div className="flex flex-col gap-2">
      <label className="text-[11px] font-semibold uppercase tracking-wider text-slate-600">Styl CV</label>
      <div className="flex flex-wrap gap-2">
        {templates.map((template) => (
          <button
            key={template.id}
            className={`rounded-full border px-3 py-1.5 text-xs font-semibold transition ${
              data.template === template.id
                ? 'border-primary bg-primary/10 text-primary'
                : 'border-slate-200 bg-white text-slate-700 hover:border-slate-300'
            }`}
            onClick={() => setTemplate(template.id)}
          >
            {template.name}
          </button>
        ))}
      </div>
    </div>
  );
}
