import React, { useState } from 'react';
import { Home, LayoutDashboard, BookOpen, BarChart2, Shield } from 'lucide-react';
import HomePage from './pages/HomePage';
import DashboardPage from './pages/DashboardPage';
import JournalPage from './pages/JournalPage';
import AnalyticsPage from './pages/AnalyticsPage';
import LiveTicker from './components/LiveTicker';

export default function App(): JSX.Element {
  const [activeTab, setActiveTab] = useState<'home' | 'dashboard' | 'journal' | 'analytics'>('home');
  const [activeUser, setActiveUser] = useState<string>('Team All');

  return (
    <div className="min-h-screen bg-[#0b0e14] text-slate-200 font-sans flex flex-col select-none">
      
      {/* TOP NAVIGATION BAR */}
      <header className="bg-[#0f141c] border-b border-slate-800 px-6 py-4 flex flex-col sm:flex-row items-center justify-between gap-4 sticky top-0 z-40 shadow-md">
        <div className="flex items-center gap-3">
          <h1 className="text-lg font-extrabold text-white tracking-wider flex items-center gap-2">
            <span className="w-1.5 h-6 bg-sky-500 rounded-full"></span> WALL STREET TRIOS PRO
          </h1>
        </div>

        {/* 4-PAGE ROUTING BUTTONS */}
        <nav className="flex items-center bg-slate-900 border border-slate-800 p-1 rounded-xl gap-1 overflow-x-auto">
          <button 
            onClick={() => setActiveTab('home')}
            className={`px-3.5 py-1.5 rounded-lg text-xs font-bold flex items-center gap-1.5 transition cursor-pointer ${activeTab === 'home' ? 'bg-sky-500 text-slate-950 shadow-md' : 'text-slate-400 hover:text-white'}`}
          >
            <Home size={14} /> Home
          </button>
          <button 
            onClick={() => setActiveTab('dashboard')}
            className={`px-3.5 py-1.5 rounded-lg text-xs font-bold flex items-center gap-1.5 transition cursor-pointer ${activeTab === 'dashboard' ? 'bg-sky-500 text-slate-950 shadow-md' : 'text-slate-400 hover:text-white'}`}
          >
            <LayoutDashboard size={14} /> Dashboard
          </button>
          <button 
            onClick={() => setActiveTab('journal')}
            className={`px-3.5 py-1.5 rounded-lg text-xs font-bold flex items-center gap-1.5 transition cursor-pointer ${activeTab === 'journal' ? 'bg-sky-500 text-slate-950 shadow-md' : 'text-slate-400 hover:text-white'}`}
          >
            <BookOpen size={14} /> Journal
          </button>
          <button 
            onClick={() => setActiveTab('analytics')}
            className={`px-3.5 py-1.5 rounded-lg text-xs font-bold flex items-center gap-1.5 transition cursor-pointer ${activeTab === 'analytics' ? 'bg-sky-500 text-slate-950 shadow-md' : 'text-slate-400 hover:text-white'}`}
          >
            <BarChart2 size={14} /> Analytics
          </button>
        </nav>

        <div className="flex items-center gap-2 text-xs text-slate-400 font-mono">
          <Shield size={14} className="text-emerald-400" /> Active Profile: <strong className="text-sky-400">{activeUser}</strong>
        </div>
      </header>

      {/* LIVE SCROLLING TICKER TAPE */}
      <LiveTicker />

      {/* DYNAMIC PAGE RENDER */}
      <main className="flex-1 p-6 max-w-7xl w-full mx-auto">
        {activeTab === 'home' && (
          <HomePage 
            setActiveTab={setActiveTab} 
            activeUser={activeUser} 
            setActiveUser={setActiveUser} 
          />
        )}
        {activeTab === 'dashboard' && (
          <DashboardPage 
            activeUser={activeUser} 
            setActiveUser={setActiveUser} 
          />
        )}
        {activeTab === 'journal' && (
          <JournalPage 
            activeUser={activeUser} 
          />
        )}
        {activeTab === 'analytics' && (
          <AnalyticsPage 
            activeUser={activeUser} 
          />
        )}
      </main>

    </div>
  );
}