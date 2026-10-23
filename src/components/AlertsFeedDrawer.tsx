import React from 'react';
import { IncidentAlert } from '../types';

interface AlertsFeedDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  alerts: IncidentAlert[];
  onVote: (alertId: string, type: 'confirm' | 'dismiss') => void;
  onNewReport: () => void;
}

export const AlertsFeedDrawer: React.FC<AlertsFeedDrawerProps> = ({
  isOpen,
  onClose,
  alerts,
  onVote,
  onNewReport
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center bg-black/60 backdrop-blur-sm animate-fade-in">
      <div className="w-full max-w-md bg-white rounded-t-3xl max-h-[85vh] flex flex-col shadow-2xl border-t border-purple-200 animate-slide-up">
        {/* Drawer Handle & Header */}
        <div className="p-4 pb-2 border-b border-gray-100 flex flex-col">
          <div className="w-12 h-1 bg-gray-300 rounded-full mx-auto mb-3"></div>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-[#eaddff] text-[#25005a] flex items-center justify-center">
                <span className="material-symbols-outlined text-[20px]">cell_merge</span>
              </div>
              <div>
                <h3 className="font-headline font-bold text-sm text-[#00236f]">
                  Red de Alertas Comunitarias
                </h3>
                <span className="font-body text-[11px] text-[#444651]">
                  Sector 4 • Radio de 300 metros
                </span>
              </div>
            </div>
            <button
              onClick={onClose}
              className="p-1.5 rounded-full hover:bg-gray-100 text-gray-500"
            >
              <span className="material-symbols-outlined text-[20px]">close</span>
            </button>
          </div>
        </div>

        {/* Alerts List */}
        <div className="flex-1 overflow-y-auto p-4 space-y-3">
          {alerts.map((al) => (
            <div
              key={al.id}
              className="p-3.5 rounded-xl bg-white border border-[#e9edff] shadow-sm flex flex-col gap-2"
            >
              <div className="flex items-start justify-between gap-2">
                <div className="flex items-center gap-2 min-w-0">
                  <div className="w-8 h-8 rounded-lg bg-[#ffdad6] text-[#ba1a1a] flex items-center justify-center shrink-0">
                    <span className="material-symbols-outlined text-[18px]">{al.icon}</span>
                  </div>
                  <div className="min-w-0">
                    <h4 className="font-headline text-xs font-bold text-gray-900 truncate">
                      {al.title}
                    </h4>
                    <span className="text-[11px] text-gray-500 block truncate">
                      {al.timeAgo} • {al.location}
                    </span>
                  </div>
                </div>
                <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${al.badgeBg} ${al.badgeText}`}>
                  {al.status}
                </span>
              </div>

              <p className="font-body text-xs text-gray-700 bg-gray-50 p-2 rounded-lg">
                "{al.description}"
              </p>

              <div className="flex items-center justify-between pt-1">
                <span className="text-[10px] text-gray-400 font-medium">
                  Reportado por: {al.author}
                </span>

                <div className="flex items-center gap-1.5">
                  <button
                    onClick={() => onVote(al.id, 'confirm')}
                    className={`px-2.5 py-1 rounded-lg text-[11px] font-bold flex items-center gap-1 transition-colors ${
                      al.userVoted === 'confirm'
                        ? 'bg-emerald-600 text-white'
                        : 'bg-[#712ae2] text-white hover:bg-[#5a1ec4]'
                    }`}
                  >
                    <span className="material-symbols-outlined text-[14px]">check</span>
                    {al.confirmations}
                  </button>
                  <button
                    onClick={() => onVote(al.id, 'dismiss')}
                    className={`px-2 py-1 rounded-lg text-[11px] font-semibold flex items-center gap-0.5 ${
                      al.userVoted === 'dismiss'
                        ? 'bg-gray-300 text-gray-800'
                        : 'bg-gray-100 text-gray-500 hover:bg-gray-200'
                    }`}
                  >
                    <span className="material-symbols-outlined text-[14px]">close</span>
                    {al.dismissals}
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Footer Action */}
        <div className="p-4 border-t border-gray-100 bg-gray-50">
          <button
            onClick={() => {
              onClose();
              onNewReport();
            }}
            className="w-full py-3 rounded-xl bg-[#00236f] text-white font-headline text-xs font-bold flex items-center justify-center gap-2 shadow-md active:scale-[0.98] transition-all"
          >
            <span className="material-symbols-outlined text-[18px]">add_alert</span>
            Reportar Nueva Incidencia en Cuadrante
          </button>
        </div>
      </div>
    </div>
  );
};
