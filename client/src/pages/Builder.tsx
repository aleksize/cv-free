import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import LeftPanel from '../components/LeftPanel';
import CenterPanel from '../components/CenterPanel';
import RightPanel from '../components/RightPanel';
import UpsellCard from '../components/UpsellCard';

export default function Builder() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<'editor' | 'settings' | 'preview'>('editor');
  const [showUpsell, setShowUpsell] = useState(false);

  const handleDownloadStart = () => {
    // Can be used for logging or global loader states
  };

  const handleDownloadEnd = () => {
    // Show premium upsell after successful PDF export
    setShowUpsell(true);
  };

  return (
    <div className="flex h-screen flex-col overflow-hidden bg-slate-100/40 select-none">
      {/* Top Navbar */}
      <header className="sticky top-0 z-30 border-b border-slate-200 bg-white px-4 md:px-6 h-14 flex items-center justify-between shrink-0 shadow-xs">
        <div className="flex items-center gap-3">
          <button
            onClick={() => navigate('/')}
            className="flex items-center gap-1.5 hover:text-sky-600 text-slate-600 font-bold transition text-xs cursor-pointer"
          >
            <span className="material-symbols-outlined text-base">arrow_back</span>
            <span className="hidden sm:inline">Strona główna</span>
          </button>
          <div className="h-4 w-px bg-slate-200 hidden sm:block" />
          <div className="flex items-center gap-1.5">
            <span className="h-6 w-6 rounded-md bg-gradient-to-tr from-sky-400 to-blue-600 flex items-center justify-center text-white font-extrabold text-xs shadow-xs">
              C
            </span>
            <span className="text-xs font-black text-slate-800 tracking-tight">cv-free.pl</span>
            <span className="hidden md:inline bg-sky-50 border border-sky-100 text-sky-600 text-[10px] px-1.5 py-0.5 rounded-full font-bold">
              Darmowy Edytor
            </span>
          </div>
        </div>

        {/* Mobile Tab Switcher in Navbar */}
        <div className="flex md:hidden items-center bg-slate-100 rounded-lg p-0.5 border border-slate-200 text-[10.5px]">
          <button
            onClick={() => setActiveTab('editor')}
            className={`px-3 py-1.5 rounded-md font-bold transition ${
              activeTab === 'editor' ? 'bg-white text-slate-800 shadow-xs' : 'text-slate-500 hover:text-slate-800'
            }`}
          >
            Dane
          </button>
          <button
            onClick={() => setActiveTab('settings')}
            className={`px-3 py-1.5 rounded-md font-bold transition ${
              activeTab === 'settings' ? 'bg-white text-slate-800 shadow-xs' : 'text-slate-500 hover:text-slate-800'
            }`}
          >
            Styl
          </button>
          <button
            onClick={() => setActiveTab('preview')}
            className={`px-3 py-1.5 rounded-md font-bold transition ${
              activeTab === 'preview' ? 'bg-white text-slate-800 shadow-xs' : 'text-slate-500 hover:text-slate-800'
            }`}
          >
            Podgląd
          </button>
        </div>

        <div className="flex items-center gap-2">
          {/* External links */}
          <a
            href="https://gen-cv.pl"
            target="_blank"
            rel="noopener noreferrer"
            className="hidden sm:flex items-center gap-1 text-[11px] font-black text-sky-600 hover:text-sky-700 bg-sky-50 hover:bg-sky-100/60 border border-sky-100 px-2.5 py-1.5 rounded-lg transition"
          >
            <span>Ulepsz z AI (gen-cv.pl)</span>
            <span className="material-symbols-outlined text-xs font-bold">arrow_forward</span>
          </a>
        </div>
      </header>

      {/* Main Workspace Panels Container */}
      <div className="flex-1 flex overflow-hidden min-h-0 relative">
        {/* LEFT PANEL (Forms) */}
        <div
          className={`${
            activeTab === 'editor' ? 'flex' : 'hidden'
          } md:flex h-full shrink-0 w-full md:w-auto`}
        >
          <LeftPanel />
        </div>

        {/* CENTER PANEL (A4 Preview) */}
        <div
          className={`${
            activeTab === 'preview' ? 'flex' : 'hidden'
          } md:flex flex-1 h-full min-w-0`}
        >
          <CenterPanel onDownloadStart={handleDownloadStart} onDownloadEnd={handleDownloadEnd} />
        </div>

        {/* RIGHT PANEL (Settings) */}
        <div
          className={`${
            activeTab === 'settings' ? 'flex' : 'hidden'
          } lg:flex h-full shrink-0 w-full lg:w-auto`}
        >
          <RightPanel onDownloadStart={handleDownloadStart} onDownloadEnd={handleDownloadEnd} />
        </div>
      </div>

      {/* Premium AI Upsell dialog modal */}
      {showUpsell && <UpsellCard onClose={() => setShowUpsell(false)} />}
    </div>
  );
}
