import React, { useState, useEffect } from 'react';
import { MunicipalCamera } from '../types';
import { CAMERAS } from '../data/mockData';
import { playCameraSnap } from '../utils/audio';

interface CameraViewerModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialCameraId?: string;
}

export const CameraViewerModal: React.FC<CameraViewerModalProps> = ({
  isOpen,
  onClose,
  initialCameraId = 'cam-sb-049'
}) => {
  const [selectedCam, setSelectedCam] = useState<MunicipalCamera>(
    CAMERAS.find((c) => c.id === initialCameraId) || CAMERAS[0]
  );
  const [timestamp, setTimestamp] = useState('');
  const [snapshotTaken, setSnapshotTaken] = useState(false);
  const [nightVision, setNightVision] = useState(true);

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setTimestamp(
        `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-${String(
          now.getDate()
        ).padStart(2, '0')} ${String(now.getHours()).padStart(2, '0')}:${String(
          now.getMinutes()
        ).padStart(2, '0')}:${String(now.getSeconds()).padStart(2, '0')} GMT-5`
      );
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  if (!isOpen) return null;

  const handleSnapshot = () => {
    playCameraSnap();
    setSnapshotTaken(true);
    setTimeout(() => setSnapshotTaken(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 bg-black/85 backdrop-blur-md animate-fade-in">
      <div className="w-full max-w-md bg-[#141b2b] rounded-2xl overflow-hidden shadow-2xl flex flex-col text-white border border-gray-700">
        {/* Header */}
        <div className="p-3 bg-[#0d121c] flex items-center justify-between border-b border-gray-800">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-red-500 animate-pulse"></span>
            <div>
              <span className="font-headline font-bold text-sm block">
                {selectedCam.name} ({selectedCam.code})
              </span>
              <span className="font-body text-[11px] text-gray-400">
                {selectedCam.intersection}
              </span>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 hover:bg-white/10 rounded-full text-gray-300 transition-colors"
          >
            <span className="material-symbols-outlined text-[20px]">close</span>
          </button>
        </div>

        {/* Camera Selector Tabs */}
        <div className="flex bg-[#192233] p-1.5 gap-1 overflow-x-auto text-xs">
          {CAMERAS.map((cam) => (
            <button
              key={cam.id}
              onClick={() => setSelectedCam(cam)}
              className={`px-3 py-1.5 rounded-lg whitespace-nowrap transition-colors flex items-center gap-1.5 ${
                selectedCam.id === cam.id
                  ? 'bg-[#00236f] text-white font-bold'
                  : 'bg-transparent text-gray-400 hover:text-white'
              }`}
            >
              <span className="material-symbols-outlined text-[14px]">videocam</span>
              {cam.code}
            </button>
          ))}
        </div>

        {/* Video Frame */}
        <div className="relative w-full h-56 bg-black flex items-center justify-center overflow-hidden">
          <img
            src={selectedCam.imageUrl}
            alt={selectedCam.name}
            className={`w-full h-full object-cover transition-all duration-300 ${
              nightVision ? 'contrast-125 saturate-50 brightness-95' : 'brightness-110'
            }`}
          />

          {/* OSD Overlays */}
          <div className="absolute top-2 left-2 bg-black/70 px-2 py-0.5 rounded text-[10px] font-mono tracking-wider flex items-center gap-1.5">
            <span className="text-red-400 font-bold">REC ●</span>
            <span>{timestamp}</span>
          </div>

          <div className="absolute top-2 right-2 bg-black/70 px-2 py-0.5 rounded text-[10px] font-mono text-emerald-400">
            FPS: 30 | 1080p PTZ
          </div>

          {/* Crosshair guide overlay */}
          <div className="absolute inset-0 pointer-events-none flex items-center justify-center opacity-30">
            <div className="w-12 h-12 border border-white/60 rounded-full flex items-center justify-center">
              <div className="w-2 h-2 bg-white/80 rounded-full"></div>
            </div>
          </div>

          {snapshotTaken && (
            <div className="absolute inset-0 bg-white/80 flex items-center justify-center text-gray-900 font-bold text-sm transition-opacity">
              <div className="bg-white p-3 rounded-xl shadow-xl flex items-center gap-2">
                <span className="material-symbols-outlined text-emerald-600">check_circle</span>
                <span>Captura Guardada en Evidencias</span>
              </div>
            </div>
          )}

          <div className="absolute bottom-2 left-2 right-2 flex items-center justify-between text-[11px] text-white/90 drop-shadow">
            <span className="bg-black/60 px-2 py-0.5 rounded backdrop-blur-sm">
              {selectedCam.intersection}
            </span>
            <span className="bg-emerald-700/80 px-2 py-0.5 rounded backdrop-blur-sm font-bold">
              Enlace Fibra Óptica OK
            </span>
          </div>
        </div>

        {/* Camera Toolbar */}
        <div className="p-3 bg-[#111723] flex items-center justify-between text-xs">
          <div className="flex items-center gap-2">
            <button
              onClick={() => setNightVision(!nightVision)}
              className={`px-3 py-1.5 rounded-lg flex items-center gap-1.5 transition-colors ${
                nightVision ? 'bg-[#712ae2] text-white font-bold' : 'bg-gray-800 text-gray-300'
              }`}
            >
              <span className="material-symbols-outlined text-[16px]">nightlight</span>
              {nightVision ? 'Visión Nocturna ON' : 'Visión Normal'}
            </button>

            <button
              onClick={handleSnapshot}
              className="px-3 py-1.5 rounded-lg bg-gray-800 hover:bg-gray-700 text-gray-200 flex items-center gap-1.5 transition-colors"
            >
              <span className="material-symbols-outlined text-[16px]">photo_camera</span>
              Capturar Cuadro
            </button>
          </div>

          <button
            onClick={() => {
              alert('Cámara transmitiendo directo al Móvil 14 de Serenazgo en ronda.');
            }}
            className="px-3 py-1.5 rounded-lg bg-[#00236f] hover:bg-[#1e3a8a] text-white font-semibold flex items-center gap-1"
          >
            <span className="material-symbols-outlined text-[15px]">send</span>
            Enviar a Patrulla
          </button>
        </div>
      </div>
    </div>
  );
};
