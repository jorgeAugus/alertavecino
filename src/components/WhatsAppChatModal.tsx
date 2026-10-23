import React, { useState } from 'react';
import { ASSET_URLS } from '../data/mockData';

interface WhatsAppChatModalProps {
  isOpen: boolean;
  onClose: () => void;
}

interface ChatMessage {
  id: string;
  sender: 'operator' | 'user';
  text: string;
  time: string;
}

export const WhatsAppChatModal: React.FC<WhatsAppChatModalProps> = ({ isOpen, onClose }) => {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: '1',
      sender: 'operator',
      text: 'Buenas tardes. Le atiende Operador María Ruiz de la Central de Serenazgo de San Borja. Su cuadrante asignado es el 4B. ¿En qué podemos apoyarle de inmediato?',
      time: '12:04'
    }
  ]);
  const [inputText, setInputText] = useState('');
  const [isTyping, setIsTyping] = useState(false);

  if (!isOpen) return null;

  const handleSendMessage = (textToSend?: string) => {
    const text = textToSend || inputText.trim();
    if (!text) return;

    const newMsg: ChatMessage = {
      id: String(Date.now()),
      sender: 'user',
      text,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages((prev) => [...prev, newMsg]);
    setInputText('');
    setIsTyping(true);

    setTimeout(() => {
      let reply = 'Recibido. Estamos alertando a la unidad del cuadrante para verificación preventiva.';
      const lower = text.toLowerCase();
      if (lower.includes('moto') || lower.includes('sospechoso')) {
        reply = 'Entendido. Móvil #14 ya se encuentra patrullando el sector y se dirige al punto. Por favor permanezca seguro dentro del local.';
      } else if (lower.includes('cupo') || lower.includes('extorsion') || lower.includes('amenaza')) {
        reply = 'Su reporte ha sido clasificado como Prioridad Confidencial. Ningún vecino verá este chat. Nuestro grupo especial de investigación municipal y PNP 105 están coordinando.';
      } else if (lower.includes('billete') || lower.includes('estafa')) {
        reply = 'Alerta de billete falso registrada. Estamos notificando a los 18 comercios aliados de su manzana para evitar que sean sorprendidos.';
      } else if (lower.includes('ubicacion') || lower.includes('gps')) {
        reply = 'Ubicación confirmada: Av. Las Artes Norte / Sector 4. Patrulla visualizando su fachada en monitoreo de cámaras.';
      }

      setMessages((prev) => [
        ...prev,
        {
          id: String(Date.now() + 1),
          sender: 'operator',
          text: reply,
          time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        }
      ]);
      setIsTyping(false);
    }, 1200);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 bg-black/70 backdrop-blur-sm animate-fade-in">
      <div className="w-full max-w-sm h-[580px] bg-[#efeae2] rounded-2xl overflow-hidden shadow-2xl flex flex-col border border-emerald-900/20">
        {/* WhatsApp Header */}
        <div className="bg-[#075e54] text-white p-3 flex items-center justify-between shadow-md">
          <div className="flex items-center gap-2.5">
            <button
              onClick={onClose}
              className="p-1 hover:bg-white/10 rounded-full transition-colors"
            >
              <span className="material-symbols-outlined text-[20px]">arrow_back</span>
            </button>
            <div className="relative">
              <img
                src={ASSET_URLS.officerAvatar}
                alt="Operador Serenazgo"
                className="w-9 h-9 rounded-full object-cover ring-1 ring-white/50"
              />
              <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-emerald-400 rounded-full border border-white"></span>
            </div>
            <div className="flex flex-col">
              <span className="font-headline text-[13px] font-bold leading-tight flex items-center gap-1">
                Central Serenazgo SB
                <span className="material-symbols-outlined text-[14px] text-emerald-300">verified</span>
              </span>
              <span className="font-body text-[10px] text-emerald-200">
                Operador María Ruiz • Turno Activo
              </span>
            </div>
          </div>

          <div className="flex items-center gap-1 text-white">
            <button
              onClick={() => handleSendMessage('Ubicación GPS enviada: Av. Las Artes Norte 412')}
              className="p-1.5 hover:bg-white/10 rounded-full"
              title="Compartir GPS"
            >
              <span className="material-symbols-outlined text-[19px]">near_me</span>
            </button>
            <button onClick={onClose} className="p-1.5 hover:bg-white/10 rounded-full">
              <span className="material-symbols-outlined text-[19px]">close</span>
            </button>
          </div>
        </div>

        {/* Encryption notice */}
        <div className="bg-[#ffeecd] px-3 py-1.5 text-center text-[10px] text-[#554228] font-medium border-b border-[#e5d5b7] flex items-center justify-center gap-1">
          <span className="material-symbols-outlined text-[12px]">lock</span>
          <span>Canal municipal blindado con cifrado de extremo a extremo</span>
        </div>

        {/* Message Thread */}
        <div className="flex-1 overflow-y-auto p-3 flex flex-col gap-2.5 text-xs">
          {messages.map((msg) => (
            <div
              key={msg.id}
              className={`max-w-[82%] rounded-xl px-3 py-2 shadow-sm ${
                msg.sender === 'user'
                  ? 'bg-[#d9fdd3] text-gray-900 self-end rounded-tr-none'
                  : 'bg-white text-gray-900 self-start rounded-tl-none'
              }`}
            >
              <p className="font-body leading-relaxed">{msg.text}</p>
              <span className="block text-[9px] text-gray-400 text-right mt-1 font-mono">
                {msg.time} {msg.sender === 'user' && '✓✓'}
              </span>
            </div>
          ))}

          {isTyping && (
            <div className="bg-white rounded-xl px-3 py-2 text-gray-500 self-start text-[11px] flex items-center gap-1.5 shadow-sm">
              <span className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce"></span>
              <span className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce [animation-delay:0.2s]"></span>
              <span className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce [animation-delay:0.4s]"></span>
              <span className="text-[10px] ml-1">Escribiendo...</span>
            </div>
          )}
        </div>

        {/* Quick action chips */}
        <div className="bg-white/80 p-2 border-t border-gray-200 overflow-x-auto flex items-center gap-1.5 whitespace-nowrap">
          <button
            onClick={() => handleSendMessage('Persona o vehículo sospechoso en la puerta')}
            className="px-2.5 py-1 rounded-full bg-gray-100 hover:bg-gray-200 text-gray-700 text-[11px] font-medium transition-colors"
          >
            👀 Sospechoso en puerta
          </button>
          <button
            onClick={() => handleSendMessage('Solicito presencia de patrullero por favor')}
            className="px-2.5 py-1 rounded-full bg-gray-100 hover:bg-gray-200 text-gray-700 text-[11px] font-medium transition-colors"
          >
            🚓 Solicitar patrullaje
          </button>
          <button
            onClick={() => handleSendMessage('Envío ubicación actual para monitoreo de cámara')}
            className="px-2.5 py-1 rounded-full bg-gray-100 hover:bg-gray-200 text-gray-700 text-[11px] font-medium transition-colors"
          >
            📍 Enviar mi GPS
          </button>
        </div>

        {/* Input Bar */}
        <div className="bg-[#f0f2f5] p-2 flex items-center gap-2 border-t border-gray-300">
          <input
            type="text"
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
            placeholder="Escriba un mensaje a la central..."
            className="flex-1 bg-white rounded-full px-3.5 py-2 text-xs focus:outline-none focus:ring-1 focus:ring-emerald-500 shadow-inner"
          />
          <button
            onClick={() => handleSendMessage()}
            className="w-9 h-9 rounded-full bg-[#00a884] hover:bg-[#008f6f] text-white flex items-center justify-center shadow-md active:scale-95 transition-all"
          >
            <span className="material-symbols-outlined text-[18px]">send</span>
          </button>
        </div>
      </div>
    </div>
  );
};
