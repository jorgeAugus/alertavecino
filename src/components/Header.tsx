import React from 'react';
import { ScreenTab } from '../types';
import { ASSET_URLS } from '../data/mockData';

interface HeaderProps {
  currentTab: ScreenTab;
  onOpenOfficerModal: () => void;
  onTabChange: (tab: ScreenTab) => void;
}

export const Header: React.FC<HeaderProps> = ({ currentTab, onOpenOfficerModal }) => {
  const getSubheaderTitle = () => {
    switch (currentTab) {
      case 'inicio':
        return 'Inicio';
      case 'mapa':
        return 'Mapa de Alertas';
      case 'reportar':
        return 'Reportar';
      case 'soporte':
        return 'Soporte 24/7';
      default:
        return 'Inicio';
    }
  };

  return (
    <header className="fixed top-0 w-full z-50 bg-[#f9f9ff]/90 backdrop-blur-xl pt-safe shadow-[0_1px_8px_rgba(0,0,0,0.04)] border-b border-[#e9edff]/80">
      <div className="max-w-md mx-auto h-16 px-4 flex items-center justify-between gap-2">
        {/* Brand & Subtitle */}
        <div className="flex items-center gap-2.5 min-w-0">
          <img
            alt="AlertaVecino Logo Escudo"
            className="h-8 w-auto object-contain shrink-0 drop-shadow-sm"
            src={ASSET_URLS.logoShield}
            onError={(e) => {
              // fallback
              (e.currentTarget as HTMLImageElement).src = '/assets/aistudio/Image_1_46ee3db8.png';
            }}
          />
          <div className="flex flex-col min-w-0">
            <div className="flex items-center gap-1.5">
              <span className="font-headline text-[17px] font-bold text-[#00236f] tracking-tight truncate leading-tight">
                AlertaVecino
              </span>
              <span className="px-1.5 py-0.5 rounded-full bg-[#1e3a8a] text-white font-body text-[10px] tracking-wide uppercase font-bold shrink-0">
                Municipal
              </span>
            </div>
            <span className="font-body text-[11px] text-[#444651] font-medium truncate">
              {getSubheaderTitle()}
            </span>
          </div>
        </div>

        {/* Status & Officer Profile */}
        <div className="flex items-center gap-2.5 shrink-0">
          <div className="flex flex-col items-end">
            <span className="flex items-center gap-1 font-body text-[10px] text-[#444651] font-semibold leading-none">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
              Conectada
            </span>
            <span className="font-body text-[9px] text-[#757682] leading-tight">
              Serenazgo 24/7
            </span>
          </div>

          <button
            onClick={onOpenOfficerModal}
            className="relative flex items-center justify-center p-0.5 rounded-full hover:ring-2 hover:ring-[#712ae2]/40 transition-all focus:outline-none"
            title="Ver información del operador de guardia"
          >
            <img
              alt="Operador de Guardia"
              className="w-8 h-8 rounded-full object-cover ring-2 ring-emerald-500/30"
              src={ASSET_URLS.officerAvatar}
              onError={(e) => {
                (e.currentTarget as HTMLImageElement).src = '/assets/aistudio/Image_1_46ee3db8.png';
              }}
            />
            <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-emerald-500 rounded-full border-2 border-white"></span>
          </button>
        </div>
      </div>
    </header>
  );
};
