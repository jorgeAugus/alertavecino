import React, { useState } from 'react';

interface CashlessModalProps {
  isOpen: boolean;
  onClose: () => void;
  entityName: string;
}

export const CashlessModal: React.FC<CashlessModalProps> = ({
  isOpen,
  onClose,
  entityName
}) => {
  const [activeTab, setActiveTab] = useState<'info' | 'qr' | 'settings'>('info');
  const [yapeLinked, setYapeLinked] = useState(true);
  const [plinLinked, setPlinLinked] = useState(true);
  const [autoDeposit, setAutoDeposit] = useState(true);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-fade-in">
      <div className="w-full max-w-sm bg-white rounded-2xl overflow-hidden shadow-2xl flex flex-col border border-purple-200">
        {/* Header */}
        <div className="bg-gradient-to-r from-[#00236f] via-[#1e3a8a] to-[#712ae2] text-white p-4 relative">
          <button
            onClick={onClose}
            className="absolute top-3.5 right-3.5 p-1 rounded-full hover:bg-white/20 text-white/90"
          >
            <span className="material-symbols-outlined text-[20px]">close</span>
          </button>
          <div className="flex items-center gap-2 mb-1">
            <span className="material-symbols-outlined text-[20px] text-[#eaddff]">security</span>
            <span className="font-headline text-[15px] font-bold">Plataforma de Cobro Seguro</span>
          </div>
          <span className="inline-block px-2 py-0.5 rounded-full bg-[#712ae2] text-[10px] font-bold uppercase tracking-wider text-white">
            Estrategia Anti-Extorsión Municipal
          </span>
        </div>

        {/* Tab switcher */}
        <div className="flex border-b border-gray-200 bg-gray-50 text-xs">
          <button
            onClick={() => setActiveTab('info')}
            className={`flex-1 py-2.5 font-semibold text-center border-b-2 transition-colors ${
              activeTab === 'info'
                ? 'border-[#712ae2] text-[#712ae2] bg-white'
                : 'border-transparent text-gray-500 hover:text-gray-900'
            }`}
          >
            Beneficios
          </button>
          <button
            onClick={() => setActiveTab('qr')}
            className={`flex-1 py-2.5 font-semibold text-center border-b-2 transition-colors ${
              activeTab === 'qr'
                ? 'border-[#712ae2] text-[#712ae2] bg-white'
                : 'border-transparent text-gray-500 hover:text-gray-900'
            }`}
          >
            Código QR Blindado
          </button>
          <button
            onClick={() => setActiveTab('settings')}
            className={`flex-1 py-2.5 font-semibold text-center border-b-2 transition-colors ${
              activeTab === 'settings'
                ? 'border-[#712ae2] text-[#712ae2] bg-white'
                : 'border-transparent text-gray-500 hover:text-gray-900'
            }`}
          >
            Billeteras
          </button>
        </div>

        {/* Body Content */}
        <div className="p-4 flex flex-col gap-3 text-xs text-gray-700 max-h-[420px] overflow-y-auto">
          {activeTab === 'info' && (
            <>
              <div className="bg-[#e9edff] p-3 rounded-xl border border-[#dce2f7]">
                <h4 className="font-headline font-bold text-[#00236f] text-[13px] mb-1">
                  ¿Cómo te protege el Cobro Sin Efectivo?
                </h4>
                <p className="font-body text-gray-600 leading-relaxed">
                  Los delincuentes que cobran cupos u organizan asaltos a bodegas buscan dinero en efectivo inmediato. Al exhibir el sello oficial municipal de <strong>"Local 100% Cobro Digital / Cero Efectivo en Caja"</strong>, el atractivo delictivo disminuye más de un 80%.
                </p>
              </div>

              <div className="space-y-2">
                <div className="flex items-start gap-2.5 p-2.5 rounded-lg bg-gray-50 border border-gray-200">
                  <span className="material-symbols-outlined text-[#712ae2] text-[18px] shrink-0">
                    qr_code_scanner
                  </span>
                  <div>
                    <span className="font-bold text-gray-900 block">QR Único Interoperable</span>
                    <span className="text-gray-500 text-[11px]">
                      Acepta Yape, Plin y cualquier entidad bancaria peruana sin cobro de comisiones abusivas.
                    </span>
                  </div>
                </div>

                <div className="flex items-start gap-2.5 p-2.5 rounded-lg bg-gray-50 border border-gray-200">
                  <span className="material-symbols-outlined text-emerald-600 text-[18px] shrink-0">
                    verified_user
                  </span>
                  <div>
                    <span className="font-bold text-gray-900 block">Sello QR Antifraude Municipal</span>
                    <span className="text-gray-500 text-[11px]">
                      Evita que peguen stickers de otros QR sobre el tuyo. Notifica al instante si hay manipulación.
                    </span>
                  </div>
                </div>

                <div className="flex items-start gap-2.5 p-2.5 rounded-lg bg-gray-50 border border-gray-200">
                  <span className="material-symbols-outlined text-[#1e3a8a] text-[18px] shrink-0">
                    account_balance
                  </span>
                  <div>
                    <span className="font-bold text-gray-900 block">Bóveda Automática Bancaria</span>
                    <span className="text-gray-500 text-[11px]">
                      El dinero recibido va a tu cuenta blindada y no queda accesible en la tienda física.
                    </span>
                  </div>
                </div>
              </div>

              <button
                onClick={() => setActiveTab('qr')}
                className="mt-1 w-full py-2.5 rounded-xl bg-[#712ae2] text-white font-bold text-xs shadow-md active:scale-[0.98] transition-all"
              >
                Ver Mi QR Municipal Protegido
              </button>
            </>
          )}

          {activeTab === 'qr' && (
            <div className="flex flex-col items-center text-center gap-3">
              <div className="p-4 bg-white rounded-2xl shadow-lg border-2 border-[#712ae2]/30 flex flex-col items-center">
                <div className="flex items-center gap-1.5 mb-2">
                  <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
                  <span className="font-headline font-bold text-[13px] text-[#00236f]">
                    {entityName}
                  </span>
                </div>

                {/* Simulated QR Code Graphic */}
                <div className="relative w-44 h-44 bg-[#f9f9ff] rounded-xl border border-dashed border-gray-300 p-2 flex items-center justify-center">
                  <svg className="w-full h-full text-[#141b2b]" viewBox="0 0 100 100" fill="currentColor">
                    {/* QR Finder patterns */}
                    <rect x="5" y="5" width="26" height="26" rx="3" fill="#00236f" />
                    <rect x="9" y="9" width="18" height="18" fill="white" />
                    <rect x="13" y="13" width="10" height="10" fill="#712ae2" />

                    <rect x="69" y="5" width="26" height="26" rx="3" fill="#00236f" />
                    <rect x="73" y="9" width="18" height="18" fill="white" />
                    <rect x="77" y="13" width="10" height="10" fill="#712ae2" />

                    <rect x="5" y="69" width="26" height="26" rx="3" fill="#00236f" />
                    <rect x="9" y="73" width="18" height="18" fill="white" />
                    <rect x="13" y="77" width="10" height="10" fill="#712ae2" />

                    {/* Data matrix dots */}
                    <rect x="36" y="8" width="6" height="6" />
                    <rect x="46" y="8" width="6" height="6" />
                    <rect x="56" y="8" width="6" height="6" />
                    <rect x="36" y="20" width="6" height="6" />
                    <rect x="46" y="24" width="8" height="6" />
                    <rect x="8" y="38" width="6" height="6" />
                    <rect x="20" y="38" width="8" height="6" />
                    <rect x="35" y="38" width="6" height="6" />
                    <rect x="48" y="38" width="6" height="6" />
                    <rect x="60" y="38" width="8" height="6" />
                    <rect x="78" y="38" width="6" height="6" />

                    <rect x="38" y="52" width="6" height="6" />
                    <rect x="50" y="50" width="6" height="6" />
                    <rect x="65" y="52" width="6" height="6" />
                    <rect x="80" y="52" width="6" height="6" />

                    <rect x="36" y="68" width="6" height="6" />
                    <rect x="48" y="68" width="8" height="6" />
                    <rect x="68" y="68" width="6" height="6" />
                    <rect x="82" y="68" width="6" height="6" />
                    <rect x="40" y="82" width="8" height="6" />
                    <rect x="60" y="82" width="8" height="6" />
                  </svg>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-10 h-10 rounded-full bg-white shadow-md flex items-center justify-center border border-[#712ae2]/30">
                      <span className="material-symbols-outlined text-[#712ae2] text-[20px]">
                        verified
                      </span>
                    </div>
                  </div>
                </div>

                <div className="mt-2 flex items-center gap-1.5 text-[11px] text-[#00236f] font-bold">
                  <span>Yape</span> • <span>Plin</span> • <span>Interbancario CCE</span>
                </div>
                <span className="text-[10px] text-gray-400">
                  ID Municipal: SB-MERCHANT-4412
                </span>
              </div>

              <div className="text-[11px] text-gray-500">
                Puedes imprimir este cartel oficial con sello reflectivo y colocarlo visiblemente en el mostrador.
              </div>

              <button
                onClick={() => {
                  alert('Cartel oficial enviado a tu correo registrado para impresión.');
                }}
                className="w-full py-2.5 rounded-xl bg-[#00236f] text-white font-bold text-xs flex items-center justify-center gap-1.5 active:scale-[0.98] transition-all"
              >
                <span className="material-symbols-outlined text-[16px]">print</span>
                Descargar Cartel Oficial para Mostrador
              </button>
            </div>
          )}

          {activeTab === 'settings' && (
            <div className="space-y-3">
              <div className="flex items-center justify-between p-3 rounded-xl bg-gray-50 border border-gray-200">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-lg bg-[#712ae2]/10 text-[#712ae2] flex items-center justify-center font-bold text-xs">
                    Y
                  </div>
                  <div>
                    <span className="font-bold text-gray-900 block">Yape Comercial</span>
                    <span className="text-gray-500 text-[11px]">BCP • Vinculado a 987***210</span>
                  </div>
                </div>
                <input
                  type="checkbox"
                  checked={yapeLinked}
                  onChange={(e) => setYapeLinked(e.target.checked)}
                  className="w-4 h-4 text-[#712ae2] rounded accent-[#712ae2]"
                />
              </div>

              <div className="flex items-center justify-between p-3 rounded-xl bg-gray-50 border border-gray-200">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-lg bg-emerald-100 text-emerald-700 flex items-center justify-center font-bold text-xs">
                    P
                  </div>
                  <div>
                    <span className="font-bold text-gray-900 block">Plin Interoperable</span>
                    <span className="text-gray-500 text-[11px]">BBVA / Interbank / Scotiabank</span>
                  </div>
                </div>
                <input
                  type="checkbox"
                  checked={plinLinked}
                  onChange={(e) => setPlinLinked(e.target.checked)}
                  className="w-4 h-4 text-[#712ae2] rounded accent-[#712ae2]"
                />
              </div>

              <div className="flex items-center justify-between p-3 rounded-xl bg-gray-50 border border-gray-200">
                <div className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-[#00236f] text-[20px]">
                    savings
                  </span>
                  <div>
                    <span className="font-bold text-gray-900 block">Auto-Bóveda Nocturna</span>
                    <span className="text-gray-500 text-[11px]">
                      Transferir saldo a cuenta de ahorros a las 8:00 PM
                    </span>
                  </div>
                </div>
                <input
                  type="checkbox"
                  checked={autoDeposit}
                  onChange={(e) => setAutoDeposit(e.target.checked)}
                  className="w-4 h-4 text-[#712ae2] rounded accent-[#712ae2]"
                />
              </div>

              <button
                onClick={onClose}
                className="w-full mt-2 py-2.5 rounded-xl bg-[#712ae2] text-white font-bold text-xs active:scale-[0.98] transition-all"
              >
                Guardar Configuración
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
