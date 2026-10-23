import React from 'react';
import { ScreenTab } from '../types';

interface BottomNavProps {
  currentTab: ScreenTab;
  onTabChange: (tab: ScreenTab) => void;
  unreadAlertsCount?: number;
}

export const BottomNav: React.FC<BottomNavProps> = ({
  currentTab,
  onTabChange,
  unreadAlertsCount = 1
}) => {
  return (
    <nav className="fixed bottom-0 w-full z-50 pb-safe bg-[#f9f9ff]/90 backdrop-blur-xl shadow-[0_-2px_12px_rgba(0,0,0,0.05)] border-t border-[#e9edff]/80">
      <div className="max-w-md mx-auto flex justify-around items-center h-16 px-1">
        {/* Inicio */}
        <button
          onClick={() => onTabChange('inicio')}
          aria-current={currentTab === 'inicio' ? 'page' : undefined}
          className={`flex flex-col items-center justify-center w-16 h-12 transition-all cursor-pointer ${
            currentTab === 'inicio'
              ? 'text-[#712ae2] font-semibold scale-105'
              : 'text-[#444651] hover:text-[#141b2b]'
          }`}
        >
          <span
            className={`material-symbols-outlined text-[22px] transition-transform ${
              currentTab === 'inicio' ? 'material-symbols-fill scale-110' : ''
            }`}
          >
            home
          </span>
          <span className="font-body text-[11px] mt-0.5 leading-none">Inicio</span>
        </button>

        {/* Mapa */}
        <button
          onClick={() => onTabChange('mapa')}
          aria-current={currentTab === 'mapa' ? 'page' : undefined}
          className={`flex flex-col items-center justify-center w-16 h-12 transition-all cursor-pointer ${
            currentTab === 'mapa'
              ? 'text-[#712ae2] font-semibold scale-105'
              : 'text-[#444651] hover:text-[#141b2b]'
          }`}
        >
          <span
            className={`material-symbols-outlined text-[22px] transition-transform ${
              currentTab === 'mapa' ? 'material-symbols-fill scale-110' : ''
            }`}
          >
            location_on
          </span>
          <span className="font-body text-[11px] mt-0.5 leading-none">Mapa</span>
        </button>

        {/* Reportar */}
        <button
          onClick={() => onTabChange('reportar')}
          aria-current={currentTab === 'reportar' ? 'page' : undefined}
          className={`flex flex-col items-center justify-center w-16 h-12 transition-all cursor-pointer ${
            currentTab === 'reportar'
              ? 'text-[#712ae2] font-semibold scale-105'
              : 'text-[#444651] hover:text-[#141b2b]'
          }`}
        >
          <div className="relative flex items-center justify-center">
            <span
              className={`material-symbols-outlined text-[22px] transition-transform ${
                currentTab === 'reportar' ? 'material-symbols-fill scale-110' : ''
              }`}
            >
              shield
            </span>
            {unreadAlertsCount > 0 && (
              <span className="absolute -top-1 -right-1 w-2 h-2 bg-[#ba1a1a] rounded-full animate-ping"></span>
            )}
            <span className="absolute -top-1 -right-1 w-2 h-2 bg-[#ba1a1a] rounded-full"></span>
          </div>
          <span className="font-body text-[11px] mt-0.5 leading-none">Reportar</span>
        </button>

        {/* Soporte */}
        <button
          onClick={() => onTabChange('soporte')}
          aria-current={currentTab === 'soporte' ? 'page' : undefined}
          className={`flex flex-col items-center justify-center w-16 h-12 transition-all cursor-pointer ${
            currentTab === 'soporte'
              ? 'text-[#712ae2] font-semibold scale-105'
              : 'text-[#444651] hover:text-[#141b2b]'
          }`}
        >
          <span
            className={`material-symbols-outlined text-[22px] transition-transform ${
              currentTab === 'soporte' ? 'material-symbols-fill scale-110' : ''
            }`}
          >
            headset_mic
          </span>
          <span className="font-body text-[11px] mt-0.5 leading-none">Soporte</span>
        </button>
      </div>
    </nav>
  );
};
