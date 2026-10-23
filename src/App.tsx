/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { ScreenTab, DispatchMode, IncidentAlert } from './types';
import { INITIAL_ALERTS } from './data/mockData';
import { Header } from './components/Header';
import { BottomNav } from './components/BottomNav';
import { HomeScreen } from './screens/HomeScreen';
import { ReportScreen } from './screens/ReportScreen';
import { SupportScreen } from './screens/SupportScreen';
import { MapScreen } from './screens/MapScreen';
import { PanicModal } from './components/PanicModal';
import { WhatsAppChatModal } from './components/WhatsAppChatModal';
import { CashlessModal } from './components/CashlessModal';
import { CameraViewerModal } from './components/CameraViewerModal';
import { OfficerModal } from './components/OfficerModal';
import { AlertsFeedDrawer } from './components/AlertsFeedDrawer';
import { playSuccessChime } from './utils/audio';

export default function App() {
  const [currentTab, setCurrentTab] = useState<ScreenTab>('inicio');
  const [alerts, setAlerts] = useState<IncidentAlert[]>(INITIAL_ALERTS);

  // Modals state
  const [isPanicOpen, setIsPanicOpen] = useState(false);
  const [isWhatsAppOpen, setIsWhatsAppOpen] = useState(false);
  const [isCashlessOpen, setIsCashlessOpen] = useState(false);
  const [isCameraViewerOpen, setIsCameraViewerOpen] = useState(false);
  const [activeCameraId, setActiveCameraId] = useState('cam-sb-049');
  const [isOfficerModalOpen, setIsOfficerModalOpen] = useState(false);
  const [isAlertsDrawerOpen, setIsAlertsDrawerOpen] = useState(false);

  // Toast notification state
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (message: string) => {
    setToastMessage(message);
    setTimeout(() => {
      setToastMessage(null);
    }, 4500);
  };

  const handleAlertDispatched = (title: string, mode: DispatchMode) => {
    const isConfidential = mode === 'confidential';
    showToast(
      isConfidential
        ? `🛡️ Alerta Confidencial transmitida exclusivamente a Serenazgo y PNP.`
        : `📢 Alerta transmitida a Cuadrante 3B y 18 comercios aliados.`
    );

    // If community mode, add to alerts list
    if (!isConfidential) {
      const newAlert: IncidentAlert = {
        id: `alert-${Date.now()}`,
        title,
        timeAgo: 'Hace 1 min',
        location: 'Av. Las Artes Norte 412 (Bodega Doña Rosa)',
        description: 'Alerta prioritaria reportada por comerciante del cuadrante.',
        category: 'Amenaza Reportada',
        status: 'En Verificación',
        confirmations: 1,
        dismissals: 0,
        icon: 'warning',
        badgeBg: 'bg-red-100',
        badgeText: 'text-red-900',
        author: 'Bodega Doña Rosa',
        coords: { x: 50, y: 50 }
      };
      setAlerts((prev) => [newAlert, ...prev]);
    }
  };

  const handleVoteAlert = (alertId: string, type: 'confirm' | 'dismiss') => {
    setAlerts((prev) =>
      prev.map((al) => {
        if (al.id !== alertId) return al;
        if (al.userVoted) return al;
        return {
          ...al,
          userVoted: type,
          confirmations: type === 'confirm' ? al.confirmations + 1 : al.confirmations,
          dismissals: type === 'dismiss' ? al.dismissals + 1 : al.dismissals
        };
      })
    );
    playSuccessChime();
  };

  const openCameraModal = (camId: string) => {
    setActiveCameraId(camId);
    setIsCameraViewerOpen(true);
  };

  return (
    <div className="min-h-screen bg-[#f3f4f9] flex justify-center text-[#141b2b]">
      {/* Mobile Shell Frame */}
      <div className="w-full max-w-md min-h-screen bg-[#f9f9ff] flex flex-col relative shadow-2xl overflow-x-hidden">
        {/* Fixed Header */}
        <Header
          currentTab={currentTab}
          onOpenOfficerModal={() => setIsOfficerModalOpen(true)}
          onTabChange={setCurrentTab}
        />

        {/* Global Toast Notification */}
        {toastMessage && (
          <div className="fixed top-20 left-4 right-4 max-w-md mx-auto z-50 animate-slide-down">
            <div className="bg-[#00236f] text-white p-3 rounded-xl shadow-xl flex items-center justify-between gap-2 border border-blue-400/30">
              <div className="flex items-center gap-2 text-xs font-semibold">
                <span>{toastMessage}</span>
              </div>
              <button
                onClick={() => setToastMessage(null)}
                className="p-1 hover:bg-white/10 rounded-full text-white/80"
              >
                <span className="material-symbols-outlined text-[16px]">close</span>
              </button>
            </div>
          </div>
        )}

        {/* Active Screen View */}
        <main className="flex-1 flex flex-col w-full pt-16 bg-[#f9f9ff]">
          {currentTab === 'inicio' && (
            <HomeScreen
              onNavigate={setCurrentTab}
              onTriggerPanic={() => setIsPanicOpen(true)}
              onOpenLiveCamera={openCameraModal}
              onOpenAlertsList={() => setIsAlertsDrawerOpen(true)}
            />
          )}

          {currentTab === 'mapa' && (
            <MapScreen
              onOpenLiveCamera={openCameraModal}
              onNavigateToReport={() => setCurrentTab('reportar')}
            />
          )}

          {currentTab === 'reportar' && (
            <ReportScreen
              onOpenCashless={() => setIsCashlessOpen(true)}
              onOpenMap={() => setCurrentTab('mapa')}
              onAlertDispatched={handleAlertDispatched}
            />
          )}

          {currentTab === 'soporte' && (
            <SupportScreen
              onOpenWhatsAppModal={() => setIsWhatsAppOpen(true)}
              onOpenOfficerModal={() => setIsOfficerModalOpen(true)}
            />
          )}
        </main>

        {/* Fixed Bottom Navigation */}
        <BottomNav
          currentTab={currentTab}
          onTabChange={setCurrentTab}
          unreadAlertsCount={alerts.filter((a) => !a.userVoted).length}
        />

        {/* Modals & Drawers */}
        <PanicModal
          isOpen={isPanicOpen}
          onClose={() => setIsPanicOpen(false)}
          entityName="Bodega Don Lucho (Cuadrante 3B)"
          location="Av. Las Artes Norte 412, San Borja, Lima"
        />

        <WhatsAppChatModal
          isOpen={isWhatsAppOpen}
          onClose={() => setIsWhatsAppOpen(false)}
        />

        <CashlessModal
          isOpen={isCashlessOpen}
          onClose={() => setIsCashlessOpen(false)}
          entityName="Bodega Don Lucho"
        />

        <CameraViewerModal
          isOpen={isCameraViewerOpen}
          onClose={() => setIsCameraViewerOpen(false)}
          initialCameraId={activeCameraId}
        />

        <OfficerModal
          isOpen={isOfficerModalOpen}
          onClose={() => setIsOfficerModalOpen(false)}
          onOpenChat={() => setIsWhatsAppOpen(true)}
        />

        <AlertsFeedDrawer
          isOpen={isAlertsDrawerOpen}
          onClose={() => setIsAlertsDrawerOpen(false)}
          alerts={alerts}
          onVote={handleVoteAlert}
          onNewReport={() => setCurrentTab('reportar')}
        />
      </div>
    </div>
  );
}
