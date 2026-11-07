import React from 'react';
import { NavLink } from 'react-router-dom';
import { LayoutDashboard, BookOpen, BarChart3, TrendingUp } from 'lucide-react';

export const Sidebar: React.FC = () => {
  const navItems = [
    { name: 'Dashboard', path: '/', icon: LayoutDashboard },
    { name: 'Journal', path: '/journal', icon: BookOpen },
    { name: 'Analytics', path: '/analytics', icon: BarChart3 },
  ];

  return (
    <aside className="w-64 bg-dark-card border-r border-dark-border flex flex-col justify-between hidden md:flex shrink-0">
      <div className="p-6">
        <div className="flex items-center gap-3 mb-8">
          <div className="w-10 h-10 rounded-lg bg-brand-500/10 border border-brand-500/30 flex items-center justify-center text-brand-500">
            <TrendingUp className="w-6 h-6" />
          </div>
          <div>
            <h2 className="text-lg font-bold text-white leading-none">Wall Street</h2>
            <span className="text-xs font-semibold text-brand-500 uppercase tracking-widest">Trios Engine</span>
          </div>
        </div>

        <nav className="space-y-1.5">
          {navItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) =>
                `flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-colors ${
                  isActive
                    ? 'bg-brand-500/10 text-brand-500 border-l-2 border-brand-500'
                    : 'text-dark-muted hover:text-slate-100 hover:bg-dark-border/50'
                }`
              }
            >
              <item.icon className="w-5 h-5" />
              {item.name}
            </NavLink>
          ))}
        </nav>
      </div>

      <div className="p-4 border-t border-dark-border text-xs text-dark-muted text-center">
        Wall Street Trios v1.0.0
      </div>
    </aside>
  );
};