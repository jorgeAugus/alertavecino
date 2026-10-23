import React, { useState, useRef, useEffect } from 'react';
import { ScreenTab, UserMode } from '../types';
import { ASSET_URLS } from '../data/mockData';
import { playRadioChirp, playTick, playSuccessChime } from '../utils/audio';

interface HomeScreenProps {
  onNavigate: (tab: ScreenTab) => void;
  onTriggerPanic: () => void;
  onOpenLiveCamera: (camId: string) => void;
  onOpenAlertsList: () => void;
}

export const HomeScreen: React.FC<HomeScreenProps> = ({
  onNavigate,
  onTriggerPanic,
  onOpenLiveCamera,
  onOpenAlertsList
}) => {
  const [userMode, setUserMode] = useState<UserMode>('comercio');
  const [holding, setHolding] = useState(false);
  const [holdProgress, setHoldProgress] = useState(0); // 0 to 1
  const [statusMessage, setStatusMessage] = useState('Mantén presionado 3 seg para activar');
  const [isAlertActive, setIsAlertActive] = useState(false);

  const holdDuration = 3000;
  const startTimeRef = useRef<number>(0);
  const animFrameRef = useRef<number | null>(null);

  const totalLength = 289; // Circumference for r=46: 2 * Math.PI * 46 ≈ 289

  const resetHold = () => {
    if (animFrameRef.current) {
      cancelAnimationFrame(animFrameRef.current);
      animFrameRef.current = null;
    }
    setHolding(false);
    setHoldProgress(0);
    if (!isAlertActive) {
      setStatusMessage('Mantén presionado 3 seg para activar');
    }
  };

  const startHold = (e: React.MouseEvent | React.TouchEvent) => {
    e.preventDefault();
    if (isAlertActive) return;

    setHolding(true);
    startTimeRef.current = Date.now();
    setStatusMessage('Enviando alerta en 3...');
    playTick();

    const step = () => {
      const elapsed = Date.now() - startTimeRef.current;
      const progress = Math.min(elapsed / holdDuration, 1);
      setHoldProgress(progress);

      const remainingSec = Math.ceil((holdDuration - elapsed) / 1000);
      if (remainingSec > 0) {
        setStatusMessage(`Enviando alerta en ${remainingSec}...`);
      }

      if (progress < 1) {
        animFrameRef.current = requestAnimationFrame(step);
      } else {
        triggerPanicAlert();
      }
    };

    animFrameRef.current = requestAnimationFrame(step);
  };

  const triggerPanicAlert = () => {
    if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
    animFrameRef.current = null;
    setHolding(false);
    setHoldProgress(1);
    setIsAlertActive(true);
    setStatusMessage('¡ALERTA TRANSMITIDA A CENTRAL!');
    playSuccessChime();

    if (navigator.vibrate) {
      navigator.vibrate([200, 100, 200, 100, 300]);
    }

    onTriggerPanic();

    setTimeout(() => {
      setIsAlertActive(false);
      resetHold();
    }, 4500);
  };

  useEffect(() => {
    const handleMouseUp = () => {
      if (holding && holdProgress < 1) {
        resetHold();
      }
    };
    window.addEventListener('mouseup', handleMouseUp);
    window.addEventListener('touchend', handleMouseUp);
    return () => {
      window.removeEventListener('mouseup', handleMouseUp);
      window.removeEventListener('touchend', handleMouseUp);
      if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
    };
  }, [holding, holdProgress]);

  const dashOffset = totalLength - holdProgress * totalLength;

  return (
    <div className="flex flex-col w-full px-4 pb-24 gap-4 select-none">
      {/* Profile Selector & Identity Bar */}
      <div className="w-full bg-white rounded-xl p-3 shadow-sm border border-[#e9edff] flex flex-col gap-3">
        <div className="flex p-1 bg-[#e1e8fd] rounded-lg">
          <button
            onClick={() => setUserMode('comercio')}
            className={`flex-1 py-2 px-3 rounded-md flex items-center justify-center gap-1.5 transition-all duration-200 cursor-pointer ${
              userMode === 'comercio'
                ? 'bg-[#1e3a8a] text-white shadow-sm font-semibold'
                : 'text-[#444651] hover:text-[#141b2b]'
            }`}
          >
            <span className="material-symbols-outlined text-[18px]">store</span>
            <span className="font-body text-xs font-semibold truncate">Modo Comercio</span>
          </button>
          <button
            onClick={() => setUserMode('vecino')}
            className={`flex-1 py-2 px-3 rounded-md flex items-center justify-center gap-1.5 transition-all duration-200 cursor-pointer ${
              userMode === 'vecino'
                ? 'bg-[#1e3a8a] text-white shadow-sm font-semibold'
                : 'text-[#444651] hover:text-[#141b2b]'
            }`}
          >
            <span className="material-symbols-outlined text-[18px]">home_pin</span>
            <span className="font-body text-xs font-semibold truncate">Modo Vecino</span>
          </button>
        </div>

        <div className="flex items-center justify-between px-1 pt-0.5">
          <div className="flex items-center gap-2 min-w-0">
            <div className="w-8 h-8 rounded-full bg-[#eaddff] flex items-center justify-center text-[#25005a] shrink-0">
              <span className="material-symbols-outlined text-[18px]">
                {userMode === 'comercio' ? 'storefront' : 'family_restroom'}
              </span>
            </div>
            <div className="flex flex-col min-w-0">
              <div className="flex items-center gap-1">
                <span className="font-headline text-[13px] text-[#00236f] font-bold truncate">
                  {userMode === 'comercio' ? 'Bodega Don Lucho' : 'Familia Mendoza'}
                </span>
                <span
                  className="material-symbols-outlined text-[#712ae2] text-[16px] shrink-0 material-symbols-fill"
                >
                  verified
                </span>
              </div>
              <span className="font-body text-[11px] text-[#444651] truncate">
                {userMode === 'comercio'
                  ? 'Sector 4 • San Borja'
                  : 'Calle Las Letras 342 • San Borja'}
              </span>
            </div>
          </div>

          <div className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-[#e9edff] rounded-full shrink-0">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
            <span className="font-body text-[11px] text-[#444651] font-semibold">
              Monitoreo Activo
            </span>
          </div>
        </div>
      </div>

      {/* Realtime Serenazgo Presence Pill Banner */}
      <div
        onClick={() => {
          playRadioChirp();
          onNavigate('mapa');
        }}
        className="w-full bg-white rounded-xl p-3.5 shadow-sm border border-[#e9edff] flex items-center justify-between gap-3 cursor-pointer hover:bg-[#f1f3ff] transition-colors"
      >
        <div className="flex items-center gap-3 min-w-0">
          <div className="w-10 h-10 rounded-lg bg-[#e1e8fd] flex items-center justify-center text-[#00236f] shrink-0 relative">
            <span className="material-symbols-outlined text-[22px]">local_police</span>
            <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-emerald-500 rounded-full"></span>
          </div>
          <div className="flex flex-col min-w-0">
            <span className="font-headline text-xs text-[#141b2b] font-bold truncate">
              Patrullaje Serenazgo en zona
            </span>
            <span className="font-body text-xs text-[#444651] truncate">
              Sector 4 • Móvil #14 a 2 min
            </span>
          </div>
        </div>
        <div className="px-2 py-1 bg-[#e1e8fd] rounded-full text-[#00236f] font-body text-[11px] font-bold shrink-0 flex items-center gap-1">
          <span className="w-1.5 h-1.5 rounded-full bg-[#712ae2] animate-ping"></span>
          En Ronda
        </div>
      </div>

      {/* Core Interactive Panic Hero Unit */}
      <div className="w-full bg-white rounded-xl p-5 shadow-sm border border-[#e9edff] flex flex-col items-center text-center relative overflow-hidden">
        <div className="flex items-center gap-1.5 mb-2">
          <span className="material-symbols-outlined text-[#712ae2] text-[18px]">cell_tower</span>
          <span className="font-body text-xs text-[#712ae2] font-bold uppercase tracking-wider">
            Transmisión Inmediata 105 & Serenazgo
          </span>
        </div>

        {/* SOS Button Container with Pulsing Rings */}
        <div className="relative my-4 flex items-center justify-center">
          {/* Outer pulsing rings */}
          <div
            className={`absolute w-52 h-52 rounded-full bg-[#eaddff]/60 transition-all ${
              holding ? 'scale-110 opacity-90 animate-pulse' : 'animate-ping opacity-60'
            }`}
          ></div>
          <div className="absolute w-44 h-44 rounded-full bg-[#8a4cfc]/15"></div>

          {/* Main Press & Hold Trigger */}
          <button
            id="panicTrigger"
            aria-label="Botón de Pánico SOS"
            onMouseDown={startHold}
            onTouchStart={startHold}
            className={`relative w-36 h-36 rounded-full bg-gradient-to-tr from-[#00236f] via-[#1e3a8a] to-[#712ae2] text-white shadow-xl flex flex-col items-center justify-center transition-transform active:scale-95 touch-none z-10 cursor-pointer overflow-hidden focus:outline-none ${
              holding ? 'ring-4 ring-[#ba1a1a]/40 scale-105' : ''
            }`}
          >
            {/* SVG Progress Ring for 3s press */}
            <svg
              className="absolute inset-0 w-full h-full -rotate-90 pointer-events-none"
              viewBox="0 0 100 100"
            >
              <circle
                cx="50"
                cy="50"
                fill="transparent"
                r="46"
                stroke="rgba(255,255,255,0.2)"
                strokeWidth="6"
              />
              <circle
                cx="50"
                cy="50"
                fill="transparent"
                r="46"
                stroke={holding ? '#ffdad6' : '#ffffff'}
                strokeWidth="6"
                strokeDasharray={totalLength}
                strokeDashoffset={dashOffset}
                strokeLinecap="round"
                className="transition-all duration-75"
              />
            </svg>

            <span
              className={`material-symbols-outlined text-[36px] mb-0.5 material-symbols-fill transition-transform ${
                holding ? 'scale-125 text-red-200' : 'text-white'
              }`}
            >
              emergency
            </span>
            <span className="font-headline text-[18px] font-extrabold tracking-tight leading-none text-white">
              SOS
            </span>
            <span className="font-body text-[10px] tracking-widest uppercase font-bold text-[#b6c4ff] mt-0.5">
              PÁNICO
            </span>
          </button>
        </div>

        {/* Feedback microcopy & tactile guide */}
        <div className="flex flex-col items-center mt-2 max-w-[280px]">
          <p
            className={`font-headline text-[13px] font-semibold text-center transition-colors ${
              holding || isAlertActive ? 'text-[#ba1a1a] font-bold scale-105' : 'text-[#141b2b]'
            }`}
          >
            {statusMessage}
          </p>
          <span className="font-body text-[11px] text-[#444651] text-center mt-0.5 leading-snug">
            Envía coordenadas GPS precisas y abre canal silencioso con la Central de Emergencias
          </span>
        </div>

        {/* Active Shield Guard Indicator Pill */}
        <div className="mt-4 inline-flex items-center gap-1.5 px-3 py-1 bg-[#e1e8fd] rounded-full">
          <span className="material-symbols-outlined text-[#712ae2] text-[16px]">verified_user</span>
          <span className="font-body text-[11px] text-[#444651] font-medium">
            Enlace Directo Municipal Encriptado
          </span>
        </div>
      </div>

      {/* Quick Actions Grid */}
      <div className="flex flex-col gap-2.5">
        <div className="flex items-center justify-between px-1">
          <span className="font-headline text-sm font-bold text-[#00236f]">
            Acciones Comunitarias
          </span>
          <span className="font-body text-xs text-[#712ae2] font-semibold">Sector 4</span>
        </div>

        {/* Card 1: Reportar Incidente Comercial / Vecinal */}
        <div
          onClick={() => onNavigate('reportar')}
          className="w-full bg-white rounded-xl p-3.5 shadow-sm border border-[#e9edff] flex items-start gap-3 cursor-pointer hover:bg-[#f1f3ff] transition-all"
        >
          <div className="w-11 h-11 rounded-xl bg-[#ffdad6] text-[#93000a] flex items-center justify-center shrink-0">
            <span className="material-symbols-outlined text-[24px]">crisis_alert</span>
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-center justify-between gap-1 mb-0.5">
              <span className="font-headline text-xs font-semibold text-[#141b2b] truncate">
                {userMode === 'comercio'
                  ? 'Reportar Incidente Comercial'
                  : 'Reportar Alerta Residencial'}
              </span>
              <span className="px-2 py-0.5 bg-[#ffdad6] text-[#93000a] font-body text-[10px] font-bold rounded-full shrink-0">
                Prioridad Alta
              </span>
            </div>
            <p className="font-body text-xs text-[#444651] line-clamp-2">
              {userMode === 'comercio'
                ? 'Alerta de extorsión, cobro de cupos o actitud sospechosa en perímetro comercial.'
                : 'Ruidos molestos, vehículos extraños o sospechosos merodeando veredas.'}
            </p>
          </div>
        </div>

        {/* Card 2: Red de Alertas Comunitarias */}
        <div
          onClick={onOpenAlertsList}
          className="w-full bg-white rounded-xl p-3.5 shadow-sm border border-[#e9edff] flex items-start gap-3 cursor-pointer hover:bg-[#f1f3ff] transition-all"
        >
          <div className="w-11 h-11 rounded-xl bg-[#eaddff] text-[#25005a] flex items-center justify-center shrink-0">
            <span className="material-symbols-outlined text-[24px]">cell_merge</span>
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-center justify-between gap-1 mb-0.5">
              <span className="font-headline text-xs font-semibold text-[#141b2b] truncate">
                Red de Alertas Comunitarias
              </span>
              <span className="px-2 py-0.5 bg-[#e1e8fd] text-[#444651] font-body text-[10px] font-bold rounded-full shrink-0">
                3 activas
              </span>
            </div>
            <p className="font-body text-xs text-[#444651] line-clamp-2">
              Avisos comunitarios verificados por comerciantes vecinos a menos de 300 metros.
            </p>
          </div>
        </div>

        {/* Card 3: Talleres y Capacitación Vecinal */}
        <div
          onClick={() => onNavigate('soporte')}
          className="w-full bg-white rounded-xl p-3.5 shadow-sm border border-[#e9edff] flex items-start gap-3 cursor-pointer hover:bg-[#f1f3ff] transition-all"
        >
          <div className="w-11 h-11 rounded-xl bg-[#e1e8fd] text-[#00236f] flex items-center justify-center shrink-0">
            <span className="material-symbols-outlined text-[24px]">school</span>
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-center justify-between gap-1 mb-0.5">
              <span className="font-headline text-xs font-semibold text-[#141b2b] truncate">
                Talleres de Autoprotección
              </span>
              <span className="px-2 py-0.5 bg-[#e9edff] text-[#00236f] font-body text-[10px] font-bold rounded-full shrink-0">
                Módulo 2
              </span>
            </div>
            <p className="font-body text-xs text-[#444651] line-clamp-2">
              Protocolos de serenazgo digital y prevención ante robos en locales y viviendas.
            </p>
          </div>
        </div>
      </div>

      {/* Local Municipal Camera Watch Thumbnail Card */}
      <div className="w-full bg-white rounded-xl p-3.5 shadow-sm border border-[#e9edff] flex flex-col gap-2.5">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1.5">
            <span className="material-symbols-outlined text-[#00236f] text-[18px]">videocam</span>
            <span className="font-headline text-[13px] text-[#00236f] font-bold">
              Cámara Municipal Vinculada
            </span>
          </div>
          <span className="font-body text-[11px] text-[#444651]">CAM-SB-049</span>
        </div>

        <div
          onClick={() => onOpenLiveCamera('cam-sb-049')}
          className="relative w-full h-28 rounded-lg overflow-hidden bg-[#e1e8fd] flex items-center justify-center cursor-pointer group"
        >
          <img
            className="w-full h-full object-cover transition-transform group-hover:scale-105 duration-300"
            alt="Monochrome surveillance view"
            src={ASSET_URLS.cameraFeed}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#00236f]/80 via-transparent to-transparent flex items-end p-2.5 justify-between">
            <div className="flex items-center gap-1.5 text-white font-body text-[11px]">
              <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse"></span>
              <span>Av. Las Artes Norte c/ Av. San Luis</span>
            </div>
            <span className="text-white font-body text-[10px] bg-[#00236f]/90 px-2 py-0.5 rounded backdrop-blur-sm flex items-center gap-1">
              <span className="material-symbols-outlined text-[12px]">fullscreen</span>
              En Vivo
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
