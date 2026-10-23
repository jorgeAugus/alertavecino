import React, { useState } from 'react';
import { ASSET_URLS, PATROLS, CAMERAS, CONNECTED_STORES, INITIAL_ALERTS } from '../data/mockData';
import { PatrolUnit, MunicipalCamera, ConnectedStore, IncidentAlert } from '../types';
import { playRadioChirp } from '../utils/audio';

interface MapScreenProps {
  onOpenLiveCamera: (camId: string) => void;
  onNavigateToReport: () => void;
}

export const MapScreen: React.FC<MapScreenProps> = ({
  onOpenLiveCamera,
  onNavigateToReport
}) => {
  const [activeFilter, setActiveFilter] = useState<'all' | 'patrols' | 'alerts' | 'cameras' | 'stores'>('all');
  const [selectedItem, setSelectedItem] = useState<{
    type: 'patrol' | 'alert' | 'camera' | 'store';
    data: PatrolUnit | IncidentAlert | MunicipalCamera | ConnectedStore;
  } | null>(null);

  const handleSelect = (
    type: 'patrol' | 'alert' | 'camera' | 'store',
    data: PatrolUnit | IncidentAlert | MunicipalCamera | ConnectedStore
  ) => {
    playRadioChirp();
    setSelectedItem({ type, data });
  };

  return (
    <div className="flex flex-col w-full h-[calc(100vh-8rem)] relative select-none">
      {/* Top Filter Floating Bar */}
      <div className="absolute top-2 left-3 right-3 z-30 flex items-center gap-1.5 overflow-x-auto p-1 bg-white/90 backdrop-blur-md rounded-xl shadow-md border border-[#e9edff] text-xs">
        <button
          onClick={() => setActiveFilter('all')}
          className={`px-3 py-1.5 rounded-lg whitespace-nowrap transition-all font-semibold ${
            activeFilter === 'all'
              ? 'bg-[#00236f] text-white shadow-sm'
              : 'text-[#444651] hover:bg-gray-100'
          }`}
        >
          Todo el Sector 4
        </button>
        <button
          onClick={() => setActiveFilter('patrols')}
          className={`px-3 py-1.5 rounded-lg whitespace-nowrap transition-all font-semibold flex items-center gap-1 ${
            activeFilter === 'patrols'
              ? 'bg-[#1e3a8a] text-white shadow-sm'
              : 'text-[#444651] hover:bg-gray-100'
          }`}
        >
          <span className="material-symbols-outlined text-[14px]">local_police</span>
          Patrullas ({PATROLS.length})
        </button>
        <button
          onClick={() => setActiveFilter('alerts')}
          className={`px-3 py-1.5 rounded-lg whitespace-nowrap transition-all font-semibold flex items-center gap-1 ${
            activeFilter === 'alerts'
              ? 'bg-[#ba1a1a] text-white shadow-sm'
              : 'text-[#444651] hover:bg-gray-100'
          }`}
        >
          <span className="material-symbols-outlined text-[14px]">warning</span>
          Alertas ({INITIAL_ALERTS.length})
        </button>
        <button
          onClick={() => setActiveFilter('cameras')}
          className={`px-3 py-1.5 rounded-lg whitespace-nowrap transition-all font-semibold flex items-center gap-1 ${
            activeFilter === 'cameras'
              ? 'bg-[#712ae2] text-white shadow-sm'
              : 'text-[#444651] hover:bg-gray-100'
          }`}
        >
          <span className="material-symbols-outlined text-[14px]">videocam</span>
          Cámaras ({CAMERAS.length})
        </button>
        <button
          onClick={() => setActiveFilter('stores')}
          className={`px-3 py-1.5 rounded-lg whitespace-nowrap transition-all font-semibold flex items-center gap-1 ${
            activeFilter === 'stores'
              ? 'bg-emerald-700 text-white shadow-sm'
              : 'text-[#444651] hover:bg-gray-100'
          }`}
        >
          <span className="material-symbols-outlined text-[14px]">storefront</span>
          Comercios ({CONNECTED_STORES.length})
        </button>
      </div>

      {/* Main Interactive Map View */}
      <div
        className="flex-1 w-full h-full relative overflow-hidden bg-[#d3daef]"
        style={{
          backgroundImage: `url('${ASSET_URLS.mapBackground}')`,
          backgroundSize: 'cover',
          backgroundPosition: 'center'
        }}
      >
        {/* Radar Ring at Center (Bodega Don Lucho / User Base) */}
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none">
          <div className="w-64 h-64 rounded-full border-2 border-[#712ae2]/40 bg-[#712ae2]/10 animate-ping opacity-75"></div>
          <div className="absolute inset-0 w-64 h-64 rounded-full border border-dashed border-[#712ae2]/60"></div>
        </div>

        {/* User Shop Pin */}
        <div
          onClick={() =>
            handleSelect('store', CONNECTED_STORES[0])
          }
          className="absolute left-[50%] top-[50%] -translate-x-1/2 -translate-y-1/2 z-20 cursor-pointer group"
        >
          <div className="w-10 h-10 rounded-full bg-[#00236f] text-white flex items-center justify-center shadow-xl ring-4 ring-white group-hover:scale-110 transition-transform">
            <span className="material-symbols-outlined text-[20px] material-symbols-fill">
              storefront
            </span>
          </div>
          <span className="absolute -bottom-6 left-1/2 -translate-x-1/2 bg-[#00236f] text-white px-2 py-0.5 rounded-md text-[9px] font-bold whitespace-nowrap shadow-md">
            Tu Local (Bodega Don Lucho)
          </span>
        </div>

        {/* Patrol Units Pins */}
        {(activeFilter === 'all' || activeFilter === 'patrols') &&
          PATROLS.map((patrol) => (
            <div
              key={patrol.id}
              onClick={() => handleSelect('patrol', patrol)}
              style={{ left: `${patrol.coords.x}%`, top: `${patrol.coords.y}%` }}
              className="absolute -translate-x-1/2 -translate-y-1/2 z-20 cursor-pointer group"
            >
              <div className="relative">
                <div className="w-9 h-9 rounded-full bg-[#1e3a8a] text-white flex items-center justify-center shadow-lg ring-2 ring-emerald-400 group-hover:scale-110 transition-transform">
                  <span className="material-symbols-outlined text-[18px]">
                    local_police
                  </span>
                </div>
                <span className="absolute -top-1 -right-1 w-3 h-3 rounded-full bg-emerald-500 border-2 border-white animate-pulse"></span>
              </div>
              <div className="absolute top-10 left-1/2 -translate-x-1/2 bg-white/95 px-2 py-0.5 rounded shadow text-[10px] font-bold text-[#00236f] whitespace-nowrap flex items-center gap-1">
                <span>{patrol.name}</span>
                <span className="text-emerald-600 font-extrabold">{patrol.etaMin}m</span>
              </div>
            </div>
          ))}

        {/* Active Incident Alerts Pins */}
        {(activeFilter === 'all' || activeFilter === 'alerts') &&
          INITIAL_ALERTS.map((alert) => (
            <div
              key={alert.id}
              onClick={() => handleSelect('alert', alert)}
              style={{ left: `${alert.coords.x}%`, top: `${alert.coords.y}%` }}
              className="absolute -translate-x-1/2 -translate-y-1/2 z-20 cursor-pointer group"
            >
              <div className="w-9 h-9 rounded-full bg-[#ba1a1a] text-white flex items-center justify-center shadow-xl ring-2 ring-white animate-bounce group-hover:scale-110 transition-transform">
                <span className="material-symbols-outlined text-[18px]">{alert.icon}</span>
              </div>
              <div className="absolute top-10 left-1/2 -translate-x-1/2 bg-red-900/90 text-white px-2 py-0.5 rounded shadow text-[9px] font-bold whitespace-nowrap">
                {alert.title}
              </div>
            </div>
          ))}

        {/* Security Cameras Pins */}
        {(activeFilter === 'all' || activeFilter === 'cameras') &&
          CAMERAS.map((cam) => (
            <div
              key={cam.id}
              onClick={() => handleSelect('camera', cam)}
              style={{ left: `${cam.coords.x}%`, top: `${cam.coords.y}%` }}
              className="absolute -translate-x-1/2 -translate-y-1/2 z-20 cursor-pointer group"
            >
              <div className="w-8 h-8 rounded-full bg-[#712ae2] text-white flex items-center justify-center shadow-lg ring-2 ring-white group-hover:scale-110 transition-transform">
                <span className="material-symbols-outlined text-[16px]">videocam</span>
              </div>
              <span className="absolute top-9 left-1/2 -translate-x-1/2 bg-gray-900/90 text-white px-1.5 py-0.5 rounded text-[9px] font-mono whitespace-nowrap">
                {cam.code}
              </span>
            </div>
          ))}

        {/* Connected Stores Pins */}
        {(activeFilter === 'all' || activeFilter === 'stores') &&
          CONNECTED_STORES.slice(1).map((store) => (
            <div
              key={store.id}
              onClick={() => handleSelect('store', store)}
              style={{ left: `${store.coords.x}%`, top: `${store.coords.y}%` }}
              className="absolute -translate-x-1/2 -translate-y-1/2 z-10 cursor-pointer group"
            >
              <div className="w-7 h-7 rounded-full bg-emerald-600 text-white flex items-center justify-center shadow ring-1 ring-white group-hover:scale-110 transition-transform">
                <span className="material-symbols-outlined text-[14px]">store</span>
              </div>
              <span className="absolute top-8 left-1/2 -translate-x-1/2 bg-white/90 text-emerald-900 px-1.5 py-0.5 rounded text-[8px] font-bold whitespace-nowrap shadow-sm">
                {store.name}
              </span>
            </div>
          ))}

        {/* Compass & Quick Reset Floating Controls */}
        <div className="absolute right-3 bottom-20 z-20 flex flex-col gap-2">
          <button
            onClick={() => {
              setSelectedItem(null);
              setActiveFilter('all');
            }}
            className="w-10 h-10 rounded-full bg-white text-gray-700 shadow-lg flex items-center justify-center hover:bg-gray-50 active:scale-95"
            title="Centrar en mi ubicación"
          >
            <span className="material-symbols-outlined text-[20px] text-[#00236f]">my_location</span>
          </button>
          <button
            onClick={onNavigateToReport}
            className="w-10 h-10 rounded-full bg-[#ba1a1a] text-white shadow-lg flex items-center justify-center hover:bg-red-700 active:scale-95"
            title="Reportar alerta en este punto"
          >
            <span className="material-symbols-outlined text-[20px]">add_alert</span>
          </button>
        </div>

        {/* Legend / Status Pill */}
        <div className="absolute left-3 bottom-20 z-20 bg-white/90 backdrop-blur-md px-3 py-1.5 rounded-xl shadow-md border border-gray-200 text-[11px] flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
          <span className="font-semibold text-gray-800">
            Cuadrante 3B: 18 comercios conectados
          </span>
        </div>
      </div>

      {/* Selected Item Drawer / Bottom Sheet */}
      {selectedItem && (
        <div className="absolute bottom-0 left-0 right-0 z-40 bg-white rounded-t-2xl shadow-2xl border-t border-gray-200 p-4 animate-slide-up">
          <div className="flex items-start justify-between">
            <div className="flex items-center gap-2.5">
              <div className="w-10 h-10 rounded-xl bg-[#e9edff] flex items-center justify-center text-[#00236f]">
                <span className="material-symbols-outlined text-[22px]">
                  {selectedItem.type === 'patrol'
                    ? 'local_police'
                    : selectedItem.type === 'alert'
                    ? 'warning'
                    : selectedItem.type === 'camera'
                    ? 'videocam'
                    : 'storefront'}
                </span>
              </div>
              <div>
                <h3 className="font-headline text-sm font-bold text-[#141b2b]">
                  {'name' in selectedItem.data
                    ? selectedItem.data.name
                    : 'title' in selectedItem.data
                    ? selectedItem.data.title
                    : 'Detalle de Punto'}
                </h3>
                <span className="font-body text-xs text-[#444651]">
                  {'location' in selectedItem.data
                    ? selectedItem.data.location
                    : 'address' in selectedItem.data
                    ? selectedItem.data.address
                    : 'intersection' in selectedItem.data
                    ? selectedItem.data.intersection
                    : 'sector' in selectedItem.data
                    ? selectedItem.data.sector
                    : ''}
                </span>
              </div>
            </div>
            <button
              onClick={() => setSelectedItem(null)}
              className="p-1 rounded-full text-gray-400 hover:text-gray-600"
            >
              <span className="material-symbols-outlined text-[18px]">close</span>
            </button>
          </div>

          {'description' in selectedItem.data && (
            <p className="font-body text-xs text-gray-600 mt-2 bg-gray-50 p-2 rounded-lg">
              "{selectedItem.data.description}"
            </p>
          )}

          <div className="mt-3 flex items-center gap-2">
            {selectedItem.type === 'camera' && (
              <button
                onClick={() => onOpenLiveCamera(selectedItem.data.id)}
                className="flex-1 py-2 px-3 rounded-xl bg-[#712ae2] text-white font-bold text-xs flex items-center justify-center gap-1.5"
              >
                <span className="material-symbols-outlined text-[16px]">play_circle</span>
                Abrir Transmisión en Vivo
              </button>
            )}

            {selectedItem.type === 'alert' && (
              <button
                onClick={onNavigateToReport}
                className="flex-1 py-2 px-3 rounded-xl bg-[#ba1a1a] text-white font-bold text-xs flex items-center justify-center gap-1.5"
              >
                <span className="material-symbols-outlined text-[16px]">reply</span>
                Añadir Información a esta Alerta
              </button>
            )}

            {selectedItem.type === 'patrol' && (
              <div className="flex-1 p-2 rounded-xl bg-[#dce1ff] text-[#00236f] text-xs font-semibold flex items-center justify-between">
                <span>Tiempo de llegada a tu bodega:</span>
                <span className="font-bold text-sm">
                  {(selectedItem.data as PatrolUnit).etaMin} min
                </span>
              </div>
            )}

            {selectedItem.type === 'store' && (
              <div className="flex-1 p-2 rounded-xl bg-emerald-50 text-emerald-800 text-xs font-semibold flex items-center gap-1.5">
                <span className="material-symbols-outlined text-[16px]">verified</span>
                <span>Comercio Miembro Verificado de la Red Municipal</span>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
