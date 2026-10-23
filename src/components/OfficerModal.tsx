import React from 'react';
import { ASSET_URLS } from '../data/mockData';

interface OfficerModalProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenChat: () => void;
}

export const OfficerModal: React.FC<OfficerModalProps> = ({ isOpen, onClose, onOpenChat }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-fade-in">
      <div className="w-full max-w-sm bg-white rounded-2xl overflow-hidden shadow-2xl flex flex-col border border-blue-100">
        {/* Top Header */}
        <div className="bg-[#00236f] text-white p-4 relative">
          <button
            onClick={onClose}
            className="absolute top-3.5 right-3.5 p-1 rounded-full hover:bg-white/10 text-white/80"
          >
            <span className="material-symbols-outlined text-[20px]">close</span>
          </button>
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-emerald-400">badge</span>
            <span className="font-headline font-bold text-sm">Acreditación Municipal 2026</span>
          </div>
          <p className="text-[11px] text-blue-200 mt-0.5">
            Gerencia de Seguridad Ciudadana • Municipalidad de San Borja
          </p>
        </div>

        {/* Profile Card */}
        <div className="p-4 flex flex-col items-center text-center">
          <div className="relative mb-2">
            <img
              src={ASSET_URLS.officerAvatar}
              alt="Operador María Ruiz"
              className="w-20 h-20 rounded-full object-cover ring-4 ring-emerald-500/30 shadow-md"
            />
            <span className="absolute bottom-1 right-1 w-4 h-4 bg-emerald-500 rounded-full border-2 border-white"></span>
          </div>

          <h3 className="font-headline font-bold text-gray-900 text-[16px]">
            Operador María Ruiz C.
          </h3>
          <span className="px-2.5 py-0.5 rounded-full bg-blue-100 text-[#00236f] font-semibold text-xs mt-1">
            Placa de Servicio: SB-OP-1044
          </span>
          <span className="text-emerald-700 text-xs font-semibold mt-1 flex items-center gap-1">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
            En Turno Activo • Tiempo promedio respuesta: 38 segundos
          </span>

          <div className="w-full mt-4 bg-gray-50 rounded-xl p-3 border border-gray-200 text-left text-xs space-y-1.5">
            <div className="flex justify-between">
              <span className="text-gray-500">Base Central:</span>
              <span className="font-medium text-gray-800">Centro de Monitoreo San Borja</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-500">Cuadrante asignado:</span>
              <span className="font-bold text-[#00236f]">Sector 4 (Cuadrante 3B & 4B)</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-500">Unidades en ronda:</span>
              <span className="font-medium text-gray-800">Móvil 14 y Móvil 08 (Motorizado)</span>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="w-full mt-4 flex flex-col gap-2">
            <button
              onClick={() => {
                onClose();
                onOpenChat();
              }}
              className="w-full py-2.5 rounded-xl bg-[#25D366] text-[#064e23] font-bold text-xs flex items-center justify-center gap-2 shadow-sm active:scale-[0.98] transition-all"
            >
              <span className="material-symbols-outlined text-[18px]">chat</span>
              Abrir Chat Directo con María
            </button>

            <a
              href="tel:016311000"
              className="w-full py-2.5 rounded-xl bg-gray-100 hover:bg-gray-200 text-gray-800 font-semibold text-xs flex items-center justify-center gap-1.5 transition-colors"
            >
              <span className="material-symbols-outlined text-[16px] text-[#00236f]">call</span>
              Central Telefónica Serenazgo: (01) 631-1000
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};
