import React, { useState } from 'react';
import { DispatchMode, ThreatCategory } from '../types';
import { ASSET_URLS, INITIAL_THREAT_CATEGORIES } from '../data/mockData';
import { playRadioChirp, playSuccessChime, playTone } from '../utils/audio';

interface ReportScreenProps {
  onOpenCashless: () => void;
  onOpenMap: () => void;
  onAlertDispatched: (title: string, mode: DispatchMode) => void;
}

export const ReportScreen: React.FC<ReportScreenProps> = ({
  onOpenCashless,
  onOpenMap,
  onAlertDispatched
}) => {
  const [dispatchMode, setDispatchMode] = useState<DispatchMode>('community');
  const [selectedThreat, setSelectedThreat] = useState<ThreatCategory>(
    INITIAL_THREAT_CATEGORIES[0]
  );
  const [showCategoryDropdown, setShowCategoryDropdown] = useState(false);
  const [quickEvidencePhoto, setQuickEvidencePhoto] = useState<string | null>(null);
  const [audioRecording, setAudioRecording] = useState(false);
  const [audioRecordedSeconds, setAudioRecordedSeconds] = useState(0);
  const [hasAudioEvidence, setHasAudioEvidence] = useState(false);
  const [dispatching, setDispatching] = useState(false);
  const [dispatchSuccess, setDispatchSuccess] = useState(false);
  const [customNotes, setCustomNotes] = useState('');

  // Audio recording countdown simulation
  const startAudioRecording = () => {
    if (audioRecording) return;
    setAudioRecording(true);
    setAudioRecordedSeconds(0);
    setHasAudioEvidence(false);
    playTone(800, 0.1, 'sine', 0.2);

    let sec = 0;
    const interval = setInterval(() => {
      sec++;
      setAudioRecordedSeconds(sec);
      if (sec >= 15) {
        clearInterval(interval);
        setAudioRecording(false);
        setHasAudioEvidence(true);
        playTone(600, 0.15, 'sine', 0.2);
      }
    }, 1000);
  };

  const handleSimulatePhoto = () => {
    playTone(1200, 0.05, 'triangle', 0.15);
    // set a photo evidence simulator thumbnail
    setQuickEvidencePhoto(ASSET_URLS.cameraFeed);
  };

  const handleDispatch = () => {
    if (dispatching || dispatchSuccess) return;

    playRadioChirp();
    setDispatching(true);

    setTimeout(() => {
      setDispatching(false);
      setDispatchSuccess(true);
      playSuccessChime();

      onAlertDispatched(selectedThreat.name, dispatchMode);

      setTimeout(() => {
        setDispatchSuccess(false);
      }, 4000);
    }, 1400);
  };

  return (
    <div className="flex flex-col w-full pb-24">
      <div className="px-4 pt-3 pb-4 flex flex-col gap-4">
        {/* Subheader / Context Bar */}
        <div className="flex items-start justify-between gap-2">
          <div className="flex flex-col min-w-0">
            <div className="flex items-center gap-1">
              <span
                className="material-symbols-outlined text-[#712ae2] text-[20px] material-symbols-fill"
              >
                broadcast_on_home
              </span>
              <h1 className="font-headline text-[22px] font-bold text-[#00236f] tracking-tight">
                Canal Directo de Alerta
              </h1>
            </div>
            <p className="font-body text-xs text-[#444651] mt-0.5">
              Reporte de seguridad inmediata para comercios y vecinos en red
            </p>
          </div>
          <div className="flex items-center gap-1 px-2.5 py-1 bg-[#e9edff] rounded-full shrink-0">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping"></span>
            <span className="font-body text-[10px] text-[#00236f] font-bold tracking-wider uppercase">
              Enlace Activo
            </span>
          </div>
        </div>

        {/* Dispatch Mode Selector (Civic vs Confidential) */}
        <div className="flex flex-col gap-1.5">
          <span className="font-body text-xs text-[#444651] font-bold uppercase tracking-wider">
            Modo de Despacho
          </span>
          <div className="grid grid-cols-1 gap-2.5">
            {/* Option A (Community) */}
            <label
              onClick={() => setDispatchMode('community')}
              className={`cursor-pointer relative flex items-start gap-3 p-3.5 rounded-xl bg-white shadow-sm transition-all duration-200 border ${
                dispatchMode === 'community'
                  ? 'border-[#712ae2] shadow-md ring-1 ring-[#712ae2]/30'
                  : 'border-[#e9edff] opacity-80'
              }`}
            >
              <input
                type="radio"
                name="dispatch_mode"
                value="community"
                checked={dispatchMode === 'community'}
                onChange={() => setDispatchMode('community')}
                className="mt-1 w-4 h-4 text-[#00236f] accent-[#00236f] shrink-0"
              />
              <div className="flex flex-col min-w-0 flex-1">
                <div className="flex items-center justify-between">
                  <span className="font-headline text-xs font-bold text-[#141b2b] flex items-center gap-1.5">
                    Compartir con la Red de Vecinos
                    <span className="px-1.5 py-0.5 rounded-full bg-[#eaddff] text-[#25005a] font-body text-[10px] font-bold">
                      Recomendado
                    </span>
                  </span>
                </div>
                <p className="font-body text-xs text-[#444651] mt-0.5">
                  Notificación simultánea a bodegas, comercios del cuadrante y base de Serenazgo.
                </p>
              </div>
              <div className="w-8 h-8 rounded-lg bg-[#e9edff] flex items-center justify-center text-[#00236f] shrink-0">
                <span className="material-symbols-outlined text-[18px]">hub</span>
              </div>
            </label>

            {/* Option B (Confidential / Extortion Shield) */}
            <label
              onClick={() => setDispatchMode('confidential')}
              className={`cursor-pointer relative flex items-start gap-3 p-3.5 rounded-xl bg-white shadow-sm transition-all duration-200 border ${
                dispatchMode === 'confidential'
                  ? 'border-[#ba1a1a] shadow-md ring-1 ring-[#ba1a1a]/30'
                  : 'border-[#e9edff] opacity-80'
              }`}
            >
              <input
                type="radio"
                name="dispatch_mode"
                value="confidential"
                checked={dispatchMode === 'confidential'}
                onChange={() => setDispatchMode('confidential')}
                className="mt-1 w-4 h-4 text-[#00236f] accent-[#00236f] shrink-0"
              />
              <div className="flex flex-col min-w-0 flex-1">
                <div className="flex items-center justify-between">
                  <span className="font-headline text-xs font-bold text-[#141b2b] flex items-center gap-1.5">
                    Enviar Solo a Serenazgo
                    <span className="px-1.5 py-0.5 rounded-full bg-[#ffdad6] text-[#93000a] font-body text-[10px] font-bold">
                      Confidencial
                    </span>
                  </span>
                </div>
                <p className="font-body text-xs text-[#444651] mt-0.5">
                  Canal blindado y encriptado. Máxima discreción contra cobro de cupos y represalias.
                </p>
              </div>
              <div className="w-8 h-8 rounded-lg bg-[#e9edff] flex items-center justify-center text-[#ba1a1a] shrink-0">
                <span className="material-symbols-outlined text-[18px]">lock</span>
              </div>
            </label>
          </div>
        </div>

        {/* Threat / Crime Category Selection */}
        <div className="flex flex-col gap-1.5">
          <div className="flex items-center justify-between">
            <label className="font-body text-xs text-[#444651] font-bold uppercase tracking-wider">
              Tipo de Amenaza o Incidente
            </label>
            <span className="font-body text-xs text-[#712ae2] font-semibold">
              Prioridad {selectedThreat.priority}
            </span>
          </div>

          <div className="bg-white p-3.5 rounded-xl shadow-sm border border-[#e9edff] flex flex-col gap-3">
            {/* Active Selected Threat Button (with Dropdown Toggle) */}
            <div
              onClick={() => setShowCategoryDropdown(!showCategoryDropdown)}
              className="flex items-center justify-between p-2.5 rounded-lg bg-[#ffdad6]/40 cursor-pointer hover:bg-[#ffdad6]/60 transition-colors"
            >
              <div className="flex items-center gap-2.5 min-w-0">
                <div className="w-7 h-7 rounded-md bg-[#ba1a1a] flex items-center justify-center text-white shrink-0 shadow-sm">
                  <span className="material-symbols-outlined text-[16px]">
                    {selectedThreat.icon}
                  </span>
                </div>
                <span className="font-body text-xs text-[#141b2b] font-bold truncate">
                  {selectedThreat.name}
                </span>
              </div>
              <span className="material-symbols-outlined text-[#757682] text-[18px] shrink-0">
                {showCategoryDropdown ? 'expand_less' : 'expand_more'}
              </span>
            </div>

            {/* Dropdown Menu when opened */}
            {showCategoryDropdown && (
              <div className="border border-gray-200 rounded-lg p-1.5 bg-gray-50 flex flex-col gap-1 max-h-48 overflow-y-auto">
                {INITIAL_THREAT_CATEGORIES.map((cat) => (
                  <button
                    key={cat.id}
                    onClick={() => {
                      setSelectedThreat(cat);
                      setShowCategoryDropdown(false);
                    }}
                    className={`w-full text-left p-2 rounded-md flex items-center gap-2 transition-colors text-xs ${
                      selectedThreat.id === cat.id
                        ? 'bg-[#1e3a8a] text-white font-bold'
                        : 'text-gray-700 hover:bg-white'
                    }`}
                  >
                    <span className="material-symbols-outlined text-[16px]">{cat.icon}</span>
                    <span className="truncate">{cat.name}</span>
                  </button>
                ))}
              </div>
            )}

            {/* Quick Tag Chips */}
            <div className="flex items-center gap-2 overflow-x-auto pb-1 -mx-0.5 px-0.5">
              <button
                type="button"
                onClick={() => setSelectedThreat(INITIAL_THREAT_CATEGORIES[1])}
                className={`shrink-0 px-3 py-1.5 rounded-full font-body text-xs font-semibold flex items-center gap-1 transition-all ${
                  selectedThreat.id === 'robo'
                    ? 'bg-[#00236f] text-white shadow-sm'
                    : 'bg-[#e9edff] text-[#00236f]'
                }`}
              >
                <span className="material-symbols-outlined text-[14px]">store</span>
                Robo a Comercio
              </button>
              <button
                type="button"
                onClick={() => setSelectedThreat(INITIAL_THREAT_CATEGORIES[2])}
                className={`shrink-0 px-3 py-1.5 rounded-full font-body text-xs font-semibold flex items-center gap-1 transition-all ${
                  selectedThreat.id === 'sospechoso'
                    ? 'bg-[#00236f] text-white shadow-sm'
                    : 'bg-[#f1f3ff] text-[#444651]'
                }`}
              >
                <span className="material-symbols-outlined text-[14px]">visibility</span>
                Sospechoso en Zona
              </button>
              <button
                type="button"
                onClick={() => setSelectedThreat(INITIAL_THREAT_CATEGORIES[3])}
                className={`shrink-0 px-3 py-1.5 rounded-full font-body text-xs font-semibold flex items-center gap-1 transition-all ${
                  selectedThreat.id === 'moto'
                    ? 'bg-[#00236f] text-white shadow-sm'
                    : 'bg-[#f1f3ff] text-[#444651]'
                }`}
              >
                <span className="material-symbols-outlined text-[14px]">two_wheeler</span>
                Moto sin Placa
              </button>
            </div>
          </div>
        </div>

        {/* Live Telemetry Mini-Map Card */}
        <div className="flex flex-col gap-1.5">
          <div className="flex items-center justify-between">
            <label className="font-body text-xs text-[#444651] font-bold uppercase tracking-wider">
              Geolocalización en Tiempo Real
            </label>
            <span className="flex items-center gap-1 text-[11px] font-body text-emerald-700 font-semibold">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
              GPS Preciso ±3m
            </span>
          </div>

          <div className="bg-white rounded-xl p-3.5 shadow-sm border border-[#e9edff] flex flex-col gap-3">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-[#dce1ff] flex items-center justify-center text-[#00236f] shrink-0">
                <span
                  className="material-symbols-outlined text-[18px] material-symbols-fill"
                >
                  storefront
                </span>
              </div>
              <div className="flex flex-col min-w-0">
                <span className="font-headline text-xs font-bold text-[#141b2b] truncate">
                  Bodega Doña Rosa — Cuadrante 3B
                </span>
                <span className="font-body text-[11px] text-[#444651] truncate">
                  Av. Las Artes Norte 412, San Borja, Lima
                </span>
              </div>
            </div>

            {/* Stylized Map Frame with Radius Overlay and Patrol Markers */}
            <div
              onClick={onOpenMap}
              className="relative w-full h-36 rounded-lg overflow-hidden bg-[#e9edff] cursor-pointer group"
              style={{
                backgroundImage: `url('${ASSET_URLS.mapBackground}')`,
                backgroundSize: 'cover',
                backgroundPosition: 'center'
              }}
            >
              {/* Translucent Radar Pulse Center */}
              <div className="absolute inset-0 bg-[#00236f]/20 backdrop-blur-[1px] flex items-center justify-center">
                {/* Alert Coverage Radius Ring (300m) */}
                <div className="relative w-28 h-28 rounded-full bg-[#712ae2]/15 flex items-center justify-center">
                  <div className="w-20 h-20 rounded-full bg-[#712ae2]/25 animate-ping opacity-60"></div>
                  {/* User Pin Point */}
                  <div className="absolute w-7 h-7 rounded-full bg-[#00236f] flex items-center justify-center text-white shadow-lg ring-2 ring-white">
                    <span className="material-symbols-outlined text-[15px]">store</span>
                  </div>
                </div>

                {/* Nearby Serenazgo Patrol Marker (#14) */}
                <div className="absolute top-4 right-8 flex items-center gap-1 bg-white/95 px-2 py-0.5 rounded-full shadow-md">
                  <span className="material-symbols-outlined text-[#00236f] text-[14px]">
                    local_police
                  </span>
                  <span className="font-body text-[10px] font-bold text-[#00236f]">
                    Móvil 14 (Serenazgo)
                  </span>
                </div>

                {/* Radio Range Pill */}
                <div className="absolute bottom-2.5 left-2.5 bg-white/90 px-2 py-0.5 rounded-md backdrop-blur-sm shadow-sm flex items-center gap-1">
                  <span className="material-symbols-outlined text-[12px] text-[#712ae2]">
                    wifi_tethering
                  </span>
                  <span className="font-body text-[10px] text-[#141b2b] font-medium">
                    Cobertura alerta: Radio 300m
                  </span>
                </div>

                {/* Nearby Count Pill */}
                <div className="absolute bottom-2.5 right-2.5 bg-white/90 px-2 py-0.5 rounded-md backdrop-blur-sm shadow-sm flex items-center gap-1">
                  <span className="material-symbols-outlined text-[12px] text-emerald-600">
                    store
                  </span>
                  <span className="font-body text-[10px] text-[#141b2b] font-semibold">
                    18 comercios conectados
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Quick Evidence Upload (Discreet Audio / Photo) */}
        <div className="flex flex-col gap-1.5">
          <label className="font-body text-xs text-[#444651] font-bold uppercase tracking-wider">
            Evidencia Opcional Rápida
          </label>
          <div className="grid grid-cols-2 gap-2.5">
            <button
              type="button"
              onClick={handleSimulatePhoto}
              className={`flex items-center gap-2 p-3 rounded-xl bg-white shadow-sm transition-all text-left border ${
                quickEvidencePhoto ? 'border-emerald-500 ring-1 ring-emerald-500/30' : 'border-[#e9edff]'
              }`}
            >
              <div className="w-9 h-9 rounded-lg bg-[#e9edff] flex items-center justify-center text-[#00236f] shrink-0">
                <span className="material-symbols-outlined text-[20px]">
                  {quickEvidencePhoto ? 'check' : 'photo_camera'}
                </span>
              </div>
              <div className="flex flex-col min-w-0">
                <span className="font-body text-xs text-[#141b2b] font-bold">
                  {quickEvidencePhoto ? 'Foto Adjunta' : 'Captura Rápida'}
                </span>
                <span className="font-body text-[10px] text-[#444651] truncate">
                  {quickEvidencePhoto ? 'Imagen lista' : 'Foto o video corto'}
                </span>
              </div>
            </button>

            <button
              type="button"
              onClick={startAudioRecording}
              className={`flex items-center gap-2 p-3 rounded-xl bg-white shadow-sm transition-all text-left border ${
                audioRecording
                  ? 'border-red-500 ring-2 ring-red-500/30 bg-red-50'
                  : hasAudioEvidence
                  ? 'border-emerald-500 ring-1 ring-emerald-500/30'
                  : 'border-[#e9edff]'
              }`}
            >
              <div
                className={`w-9 h-9 rounded-lg flex items-center justify-center shrink-0 ${
                  audioRecording
                    ? 'bg-red-500 text-white animate-pulse'
                    : 'bg-[#ffdad6]/60 text-[#ba1a1a]'
                }`}
              >
                <span className="material-symbols-outlined text-[20px]">
                  {audioRecording ? 'mic' : hasAudioEvidence ? 'check' : 'mic'}
                </span>
              </div>
              <div className="flex flex-col min-w-0">
                <span className="font-body text-xs text-[#141b2b] font-bold">
                  {audioRecording
                    ? `Grabando (${audioRecordedSeconds}s)`
                    : hasAudioEvidence
                    ? 'Audio 15s Listo'
                    : 'Audio Discreto'}
                </span>
                <span className="font-body text-[10px] text-[#444651] truncate">
                  {audioRecording ? 'Micrófono activo' : 'Grabar 15 seg'}
                </span>
              </div>
            </button>
          </div>

          {/* Quick optional notes field */}
          <div className="mt-1">
            <input
              type="text"
              placeholder="Detalle adicional opcional (color de vehículo, descripción)..."
              value={customNotes}
              onChange={(e) => setCustomNotes(e.target.value)}
              className="w-full bg-white border border-[#e9edff] rounded-xl px-3 py-2 text-xs text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-[#712ae2]"
            />
          </div>
        </div>

        {/* Cashless Protection Feature (Micro-Banner) */}
        <div className="relative overflow-hidden rounded-xl bg-gradient-to-r from-[#00236f] to-[#1e3a8a] p-4 shadow-sm text-white">
          <div className="relative z-10 flex flex-col gap-2">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-1.5">
                <span
                  className="material-symbols-outlined text-[#eaddff] text-[20px] material-symbols-fill"
                >
                  security
                </span>
                <span className="font-headline text-[13px] font-bold tracking-tight text-white">
                  Plataforma de Cobro Seguro
                </span>
              </div>
              <span className="px-2 py-0.5 rounded-full bg-[#712ae2] text-white font-body text-[10px] font-bold">
                Anti-Extorsión
              </span>
            </div>
            <p className="font-body text-xs text-[#e1e8fd] leading-snug">
              Reduce el manejo de efectivo en caja para minimizar riesgo de robo en tu bodega. Activa cobro QR interoperable sin comisiones para clientes verificados.
            </p>
            <button
              onClick={onOpenCashless}
              className="inline-flex items-center gap-1 font-body text-xs text-[#eaddff] font-bold hover:underline pt-1 text-left"
            >
              Vincular Yape / Plin Seguro
              <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
            </button>
          </div>

          {/* Subtle Decorative Brand Accents */}
          <div className="absolute -right-6 -bottom-6 w-28 h-28 rounded-full bg-[#712ae2]/20 blur-xl pointer-events-none"></div>
          <div className="absolute right-3 top-3 opacity-15 pointer-events-none">
            <span className="material-symbols-outlined text-[64px]">qr_code_scanner</span>
          </div>
        </div>

        {/* Dispatch Action Section */}
        <div className="pt-1 flex flex-col gap-2">
          <button
            id="dispatch-btn"
            type="button"
            disabled={dispatching || dispatchSuccess}
            onClick={handleDispatch}
            className={`w-full h-14 rounded-xl font-body text-sm font-bold flex items-center justify-center gap-2.5 shadow-lg active:scale-[0.98] transition-all cursor-pointer ${
              dispatchSuccess
                ? 'bg-emerald-600 text-white'
                : dispatching
                ? 'bg-[#712ae2] text-white opacity-80'
                : dispatchMode === 'confidential'
                ? 'bg-[#ba1a1a] text-white shadow-[#ba1a1a]/30'
                : 'bg-[#712ae2] text-white shadow-[#712ae2]/30'
            }`}
          >
            {dispatching ? (
              <>
                <span className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
                <span>Conectando con Centro de Operaciones...</span>
              </>
            ) : dispatchSuccess ? (
              <>
                <span className="material-symbols-outlined text-[22px]">check_circle</span>
                <span>¡Alerta Transmitida a Cuadrante 3B!</span>
              </>
            ) : (
              <>
                <span className="material-symbols-outlined text-[22px]">
                  {dispatchMode === 'confidential' ? 'lock' : 'send'}
                </span>
                <span>
                  {dispatchMode === 'confidential'
                    ? 'Despachar Alerta Confidencial'
                    : 'Despachar Alerta Inmediata'}
                </span>
              </>
            )}
          </button>

          {/* Real-time Municipal Response Indicator */}
          <div className="flex items-center justify-center gap-1.5 py-1 text-center">
            <span className="material-symbols-outlined text-[#ba1a1a] text-[16px]">timer</span>
            <span className="font-body text-xs text-[#444651] font-medium">
              Tiempo de respuesta estimado Serenazgo:{' '}
              <span className="font-bold text-[#141b2b]">3 min</span>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
