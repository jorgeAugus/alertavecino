import React, { useState, useEffect } from 'react';
import { startSiren, stopSiren, playRadioChirp } from '../utils/audio';

interface PanicModalProps {
  isOpen: boolean;
  onClose: () => void;
  entityName: string;
  location: string;
}

export const PanicModal: React.FC<PanicModalProps> = ({
  isOpen,
  onClose,
  entityName,
  location
}) => {
  const [etaSeconds, setEtaSeconds] = useState(115); // 1m 55s
  const [sirenActive, setSirenActive] = useState(false);
  const [audioRecording, setAudioRecording] = useState(true);
  const [cancelled, setCancelled] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setEtaSeconds(115);
      setCancelled(false);
      playRadioChirp();

      const timer = setInterval(() => {
        setEtaSeconds((prev) => (prev > 0 ? prev - 1 : 0));
      }, 1000);

      return () => {
        clearInterval(timer);
        stopSiren();
      };
    } else {
      stopSiren();
      setSirenActive(false);
    }
  }, [isOpen]);

  const toggleSiren = () => {
    if (sirenActive) {
      stopSiren();
      setSirenActive(false);
    } else {
      startSiren();
      setSirenActive(true);
    }
  };

  const handleCancel = () => {
    stopSiren();
    setCancelled(true);
    setTimeout(() => {
      onClose();
    }, 1200);
  };

  if (!isOpen) return null;

  const minutes = Math.floor(etaSeconds / 60);
  const seconds = etaSeconds % 60;
  const formattedTime = `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-md animate-fade-in">
      <div className="w-full max-w-sm bg-[#ffffff] rounded-2xl overflow-hidden shadow-2xl flex flex-col border border-red-200">
        {/* Top Emergency Red Banner */}
        <div className="bg-gradient-to-r from-[#ba1a1a] via-[#87000a] to-[#ba1a1a] p-4 text-white flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-white animate-ping"></div>
            <div className="flex flex-col">
              <span className="font-headline text-[15px] font-extrabold uppercase tracking-wider">
                SOS En Proceso
              </span>
              <span className="font-body text-[11px] text-red-100">
                Alerta Prioritaria Transmitida
              </span>
            </div>
          </div>
          <button
            onClick={toggleSiren}
            className={`px-2.5 py-1 rounded-full text-[11px] font-bold flex items-center gap-1 transition-all ${
              sirenActive ? 'bg-white text-red-700 animate-pulse' : 'bg-red-800 text-red-200'
            }`}
          >
            <span className="material-symbols-outlined text-[14px]">
              {sirenActive ? 'volume_up' : 'volume_off'}
            </span>
            {sirenActive ? 'Sirena ON' : 'Activar Sirena'}
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-4 flex flex-col gap-3">
          {cancelled ? (
            <div className="py-8 flex flex-col items-center text-center">
              <div className="w-14 h-14 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mb-2">
                <span className="material-symbols-outlined text-[32px]">check_circle</span>
              </div>
              <h3 className="font-headline font-bold text-gray-900 text-[16px]">
                Alerta Cancelada por el Usuario
              </h3>
              <p className="font-body text-xs text-gray-500 mt-1">
                Se notificó a la Central que no se requiere intervención.
              </p>
            </div>
          ) : (
            <>
              {/* Dispatch Telemetry */}
              <div className="bg-[#f1f3ff] p-3 rounded-xl flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <div className="w-10 h-10 rounded-lg bg-[#00236f] text-white flex items-center justify-center">
                    <span className="material-symbols-outlined text-[20px]">local_police</span>
                  </div>
                  <div>
                    <span className="font-headline text-[13px] font-bold text-[#00236f] block">
                      Móvil #14 (Serenazgo San Borja)
                    </span>
                    <span className="font-body text-[11px] text-[#444651]">
                      En camino a tu ubicación
                    </span>
                  </div>
                </div>
                <div className="text-right">
                  <span className="font-headline text-[18px] font-extrabold text-[#ba1a1a]">
                    {formattedTime}
                  </span>
                  <span className="block font-body text-[9px] text-[#757682] uppercase font-bold">
                    ETA estimado
                  </span>
                </div>
              </div>

              {/* Geolocation Card */}
              <div className="border border-gray-200 rounded-xl p-3 flex flex-col gap-1.5 text-xs">
                <div className="flex items-center justify-between text-gray-500">
                  <span className="font-semibold text-gray-700">Comercio / Emisor:</span>
                  <span className="text-emerald-700 font-bold flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
                    GPS En vivo (±2m)
                  </span>
                </div>
                <div className="font-medium text-gray-900">{entityName}</div>
                <div className="text-gray-500">{location}</div>
                <div className="font-mono text-[10px] text-gray-400">
                  Coord: -12.08864, -77.00128 • Sector 4 Cuadrante 3B
                </div>
              </div>

              {/* Silent Audio & Operations Link */}
              <div className="bg-amber-50 border border-amber-200 rounded-xl p-2.5 flex items-center gap-2 text-xs text-amber-900">
                <div className="w-7 h-7 rounded-full bg-amber-200 flex items-center justify-center shrink-0">
                  <span className="material-symbols-outlined text-[16px] animate-pulse">mic</span>
                </div>
                <div className="flex-1">
                  <span className="font-bold block">Canal de Audio Silencioso Abierto</span>
                  <span className="text-[11px] text-amber-800">
                    La central de Serenazgo está escuchando en tiempo real para evaluar la situación.
                  </span>
                </div>
              </div>

              {/* Controls */}
              <div className="flex flex-col gap-2 pt-2">
                <button
                  onClick={handleCancel}
                  className="w-full py-2.5 px-4 rounded-xl bg-gray-100 hover:bg-gray-200 text-gray-700 font-semibold text-xs active:scale-[0.98] transition-all"
                >
                  Cancelar Alerta (Falsa Alarma o Resuelto)
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};
