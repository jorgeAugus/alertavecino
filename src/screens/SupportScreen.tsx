import React, { useState } from 'react';
import { SecurityWorkshop, IncidentAlert } from '../types';
import { ASSET_URLS, INITIAL_ALERTS, INITIAL_WORKSHOPS } from '../data/mockData';
import { playSuccessChime, playTone } from '../utils/audio';

interface SupportScreenProps {
  onOpenWhatsAppModal: () => void;
  onOpenOfficerModal: () => void;
}

export const SupportScreen: React.FC<SupportScreenProps> = ({
  onOpenWhatsAppModal,
  onOpenOfficerModal
}) => {
  const [alerts, setAlerts] = useState<IncidentAlert[]>(INITIAL_ALERTS);
  const [workshops, setWorkshops] = useState<SecurityWorkshop[]>(INITIAL_WORKSHOPS);
  const [voteFeedbackMessage, setVoteFeedbackMessage] = useState<string | null>(null);

  const handleVote = (alertId: string, type: 'confirm' | 'dismiss') => {
    playTone(type === 'confirm' ? 880 : 400, 0.1, 'sine', 0.2);
    setAlerts((prev) =>
      prev.map((al) => {
        if (al.id !== alertId) return al;
        if (al.userVoted) return al; // already voted

        return {
          ...al,
          userVoted: type,
          confirmations: type === 'confirm' ? al.confirmations + 1 : al.confirmations,
          dismissals: type === 'dismiss' ? al.dismissals + 1 : al.dismissals
        };
      })
    );

    if (type === 'confirm') {
      setVoteFeedbackMessage('✓ Alerta confirmada. Tu verificación fue notificada al móvil de serenazgo.');
    } else {
      setVoteFeedbackMessage('Has marcado este reporte como descartado.');
    }

    setTimeout(() => {
      setVoteFeedbackMessage(null);
    }, 4000);
  };

  const handleRsvp = (workshopId: string) => {
    playSuccessChime();
    setWorkshops((prev) =>
      prev.map((ws) => {
        if (ws.id !== workshopId) return ws;
        const newRsvp = !ws.userRsvp;
        return {
          ...ws,
          userRsvp: newRsvp,
          seatsReserved: newRsvp ? ws.seatsReserved + 1 : ws.seatsReserved - 1
        };
      })
    );
  };

  return (
    <div className="flex flex-col w-full px-4 pb-24 space-y-6">
      {/* Subheader */}
      <div className="flex flex-col pt-2">
        <div className="flex items-center gap-1.5 text-[#00236f] mb-1">
          <span className="material-symbols-outlined text-[18px]">verified_user</span>
          <span className="font-body text-xs uppercase tracking-wider font-semibold text-[#00236f]">
            Red de Conexión Municipal
          </span>
        </div>
        <h1 className="font-headline text-[22px] font-bold text-[#141b2b] tracking-tight">
          Soporte 24/7 y Comunidad
        </h1>
        <p className="font-body text-xs text-[#444651] mt-0.5">
          Conexión directa con la central y participación vecinal activa
        </p>
      </div>

      {/* Section 1: WhatsApp Integration Widget */}
      <section className="flex flex-col">
        <div className="bg-white rounded-xl p-4 shadow-sm border border-[#e9edff] relative overflow-hidden">
          {/* Top banner strip */}
          <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-[#128C7E] via-[#25D366] to-[#00236f]"></div>

          <div className="flex items-start gap-3 mt-1">
            {/* Operator Avatar */}
            <div
              onClick={onOpenOfficerModal}
              className="relative shrink-0 cursor-pointer group"
              title="Ver acreditación oficial"
            >
              <img
                alt="Operador Serenazgo"
                className="w-14 h-14 rounded-full object-cover shadow-sm ring-2 ring-emerald-500/30 group-hover:scale-105 transition-transform"
                src={ASSET_URLS.officerAvatar}
              />
              <span className="absolute bottom-0 right-0 w-3.5 h-3.5 bg-emerald-500 rounded-full border-2 border-white"></span>
            </div>

            {/* Operator Details */}
            <div className="flex flex-col min-w-0 flex-1">
              <div className="flex items-center gap-1.5 flex-wrap">
                <span className="font-headline text-xs text-[#141b2b] font-bold truncate">
                  Operador María Ruiz
                </span>
                <span className="inline-flex items-center px-2 py-0.5 rounded-full bg-[#e1e8fd] text-[#00236f] font-body text-[10px] font-semibold">
                  Central Serenazgo
                </span>
              </div>
              <div className="flex items-center gap-1 mt-0.5">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
                <span className="font-body text-[11px] text-emerald-700 font-medium">
                  Turno activo - Respuesta &lt; 45s
                </span>
              </div>
            </div>
          </div>

          {/* Card Copy */}
          <div className="mt-3 pt-1">
            <h2 className="font-headline text-sm font-bold text-[#00236f] tracking-tight">
              Canal Prioritario de Emergencia 24/7
            </h2>
            <p className="font-body text-xs text-[#444651] mt-1 leading-relaxed">
              Respuesta inmediata por chat encriptado para comerciantes y vecinos registrados. Atendida por personal de guardia en tiempo real.
            </p>
          </div>

          {/* Action Button */}
          <div className="mt-3">
            <button
              onClick={onOpenWhatsAppModal}
              type="button"
              id="whatsappBtn"
              className="w-full flex items-center justify-center gap-2.5 py-3 px-4 rounded-xl bg-[#25D366] text-[#064e23] font-body text-xs font-bold shadow-sm active:scale-[0.98] transition-all hover:bg-[#20ba59] cursor-pointer"
            >
              <span
                className="material-symbols-outlined text-[20px] material-symbols-fill"
              >
                chat
              </span>
              <span>Iniciar Chat de Emergencia WhatsApp</span>
            </button>
          </div>

          {/* Footer trust badge */}
          <div className="flex items-center justify-between mt-3 pt-2 text-[#444651] font-body text-[11px] border-t border-[#f1f3ff]">
            <span className="flex items-center gap-1">
              <span className="material-symbols-outlined text-[14px] text-[#128C7E]">lock</span>
              Cifrado de extremo a extremo
            </span>
            <span className="font-semibold text-[#00236f]">Cuadrante 4B asignado</span>
          </div>
        </div>
      </section>

      {/* Section 2: Calificación Comunitaria de Incidentes */}
      <section className="flex flex-col space-y-3">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="font-headline text-sm font-bold text-[#141b2b] tracking-tight">
              Validación Comunitaria
            </h2>
            <p className="font-body text-xs text-[#444651]">
              {alerts.length} reportes activos en tu cuadrante
            </p>
          </div>
          <span className="px-2 py-1 rounded-full bg-[#dce1ff] text-[#264191] font-body text-[11px] font-bold">
            Sector 4
          </span>
        </div>

        {/* Global Feedback Banner */}
        {voteFeedbackMessage && (
          <div className="bg-emerald-50 border border-emerald-200 text-emerald-800 p-2.5 rounded-xl text-center text-xs font-semibold animate-fade-in">
            {voteFeedbackMessage}
          </div>
        )}

        {/* Incident Card 1 */}
        {alerts[0] && (
          <div className="bg-white rounded-xl p-4 shadow-sm border border-[#e9edff] flex flex-col space-y-3">
            {/* Header */}
            <div className="flex items-start justify-between gap-2">
              <div className="flex items-center gap-2.5 min-w-0">
                <div className="w-9 h-9 rounded-lg bg-[#ffdad6] text-[#93000a] flex items-center justify-center shrink-0">
                  <span className="material-symbols-outlined text-[20px]">two_wheeler</span>
                </div>
                <div className="min-w-0">
                  <h3 className="font-headline text-xs font-bold text-[#141b2b] truncate">
                    {alerts[0].title}
                  </h3>
                  <div className="flex items-center gap-1.5 text-[#444651] font-body text-[11px]">
                    <span className="text-[#ba1a1a] font-semibold">{alerts[0].timeAgo}</span>
                    <span>•</span>
                    <span className="truncate">{alerts[0].location}</span>
                  </div>
                </div>
              </div>
              <span className="px-2 py-0.5 rounded-full bg-amber-100 text-amber-900 font-body text-[10px] font-bold shrink-0">
                {alerts[0].status}
              </span>
            </div>

            {/* Body / Details */}
            <div className="bg-[#f1f3ff] p-2.5 rounded-lg">
              <p className="font-body text-xs text-[#141b2b] leading-relaxed">
                "{alerts[0].description}"
              </p>
            </div>

            {/* Voting Prompt & Controls */}
            <div className="flex flex-col space-y-2 pt-1">
              <span className="font-body text-xs text-[#444651] font-medium">
                ¿Viste este incidente o notas actividad sospechosa?
              </span>
              <div className="grid grid-cols-2 gap-2">
                <button
                  type="button"
                  onClick={() => handleVote(alerts[0].id, 'confirm')}
                  className={`flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-lg font-body text-xs font-bold shadow-sm active:scale-[0.98] transition-all cursor-pointer ${
                    alerts[0].userVoted === 'confirm'
                      ? 'bg-emerald-600 text-white'
                      : 'bg-[#712ae2] text-white hover:bg-[#5a1ec4]'
                  }`}
                >
                  <span className="material-symbols-outlined text-[18px]">check_circle</span>
                  <span>Confirmar Alerta ({alerts[0].confirmations})</span>
                </button>

                <button
                  type="button"
                  onClick={() => handleVote(alerts[0].id, 'dismiss')}
                  className={`flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-lg font-body text-xs font-semibold active:scale-[0.98] transition-all cursor-pointer ${
                    alerts[0].userVoted === 'dismiss'
                      ? 'bg-[#dce2f7] text-[#141b2b]'
                      : 'bg-[#e9edff] text-[#444651] hover:bg-[#dce2f7]'
                  }`}
                >
                  <span className="material-symbols-outlined text-[18px]">close</span>
                  <span>Descartar ({alerts[0].dismissals})</span>
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Incident Card 2 */}
        {alerts[1] && (
          <div className="bg-white rounded-xl p-4 shadow-sm border border-[#e9edff] flex flex-col space-y-2">
            <div className="flex items-start justify-between gap-2">
              <div className="flex items-center gap-2.5 min-w-0">
                <div className="w-9 h-9 rounded-lg bg-amber-100 text-amber-900 flex items-center justify-center shrink-0">
                  <span className="material-symbols-outlined text-[20px]">payments</span>
                </div>
                <div className="min-w-0">
                  <h3 className="font-headline text-xs font-bold text-[#141b2b] truncate">
                    {alerts[1].title}
                  </h3>
                  <div className="flex items-center gap-1.5 text-[#444651] font-body text-[11px]">
                    <span>{alerts[1].timeAgo}</span>
                    <span>•</span>
                    <span className="truncate">{alerts[1].location}</span>
                  </div>
                </div>
              </div>
              <span className="px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-900 font-body text-[10px] font-bold shrink-0">
                Alerta Alta
              </span>
            </div>

            <p className="font-body text-xs text-[#444651] leading-relaxed">
              {alerts[1].description}
            </p>

            {/* Verification Badge */}
            <div className="flex items-center gap-2 pt-1">
              <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-[#f5f3ff] text-[#712ae2] font-body text-xs font-semibold">
                <span
                  className="material-symbols-outlined text-[16px] material-symbols-fill"
                >
                  storefront
                </span>
                <span>Validado por {alerts[1].confirmations} comerciantes vecinos</span>
              </div>
            </div>
          </div>
        )}
      </section>

      {/* Section 3: Talleres Presenciales de Seguridad Digital */}
      <section className="flex flex-col space-y-3 pb-2">
        <div>
          <h2 className="font-headline text-sm font-bold text-[#141b2b] tracking-tight">
            Talleres Presenciales de Seguridad Digital
          </h2>
          <p className="font-body text-xs text-[#444651] mt-0.5">
            Organizados por la Municipalidad y la Gerencia de Seguridad Ciudadana
          </p>
        </div>

        {/* Workshop List */}
        <div className="flex flex-col space-y-3">
          {workshops.map((ws) => (
            <div
              key={ws.id}
              className="bg-white rounded-xl p-4 shadow-sm border border-[#e9edff] flex flex-col space-y-3"
            >
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-xl bg-[#dce1ff] flex flex-col items-center justify-center shrink-0 text-[#00236f]">
                  <span className="font-headline text-[14px] font-extrabold leading-none">
                    {ws.day}
                  </span>
                  <span className="font-body text-[9px] uppercase font-bold leading-none mt-0.5">
                    {ws.month}
                  </span>
                </div>
                <div className="flex-1 min-w-0">
                  <span
                    className={`inline-block px-2 py-0.5 rounded font-body text-[10px] font-bold mb-1 ${ws.tagColor}`}
                  >
                    {ws.tag}
                  </span>
                  <h3 className="font-headline text-xs font-bold text-[#141b2b] leading-snug">
                    {ws.title}
                  </h3>
                  <p className="font-body text-xs text-[#444651] mt-1 leading-relaxed">
                    {ws.description}
                  </p>
                </div>
              </div>

              <div className="bg-[#f1f3ff] rounded-lg p-2.5 flex flex-col space-y-1 text-[#444651] font-body text-xs">
                <div className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-[16px] text-[#00236f]">
                    schedule
                  </span>
                  <span>{ws.time}</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-[16px] text-[#00236f]">
                    location_on
                  </span>
                  <span className="truncate">{ws.location}</span>
                </div>
              </div>

              <div className="flex items-center justify-between gap-2 pt-0.5">
                <div className="flex items-center gap-1.5 text-[#444651] font-body text-[11px]">
                  <span className="material-symbols-outlined text-[16px] text-[#712ae2]">
                    groups
                  </span>
                  <span>
                    {ws.userRsvp
                      ? `¡Tu cupo está asegurado! (${ws.seatsReserved} registrados)`
                      : `${ws.seatsReserved} de ${ws.seatsTotal} cupos reservados`}
                  </span>
                </div>
                <button
                  type="button"
                  onClick={() => handleRsvp(ws.id)}
                  className={`py-2 px-3.5 rounded-lg font-body text-xs font-bold shadow-sm active:scale-[0.98] transition-all cursor-pointer ${
                    ws.userRsvp
                      ? 'bg-emerald-600 text-white'
                      : 'bg-[#712ae2] text-white hover:bg-[#5a1ec4]'
                  }`}
                >
                  {ws.userRsvp ? (
                    <span className="flex items-center gap-1">
                      <span className="material-symbols-outlined text-[16px]">check</span>
                      Registrado
                    </span>
                  ) : (
                    'Inscribirme (RSVP) - Gratis'
                  )}
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};
