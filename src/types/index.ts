export type ScreenTab = 'inicio' | 'mapa' | 'reportar' | 'soporte';

export type UserMode = 'comercio' | 'vecino';

export type DispatchMode = 'community' | 'confidential';

export interface ThreatCategory {
  id: string;
  name: string;
  icon: string;
  priority: 'Alta' | 'Media' | 'Inmediata';
  description: string;
}

export interface IncidentAlert {
  id: string;
  title: string;
  timeAgo: string;
  location: string;
  description: string;
  category: string;
  status: 'En Verificación' | 'Confirmada' | 'Alerta Alta' | 'Atendida';
  confirmations: number;
  dismissals: number;
  userVoted?: 'confirm' | 'dismiss';
  icon: string;
  badgeBg: string;
  badgeText: string;
  author: string;
  coords: { x: number; y: number }; // Percentage coords on map
}

export interface SecurityWorkshop {
  id: string;
  day: string;
  month: string;
  tag: string;
  tagColor: string;
  title: string;
  description: string;
  time: string;
  location: string;
  seatsTotal: number;
  seatsReserved: number;
  userRsvp: boolean;
  freePassRequirement: string;
}

export interface PatrolUnit {
  id: string;
  name: string;
  type: 'Automóvil' | 'Motocicleta' | 'A pie';
  status: 'En Ronda' | 'Atendiendo' | 'Disponible';
  etaMin: number;
  sector: string;
  lastPing: string;
  coords: { x: number; y: number };
}

export interface MunicipalCamera {
  id: string;
  code: string;
  name: string;
  intersection: string;
  status: 'En Vivo' | 'Grabando';
  imageUrl: string;
  coords: { x: number; y: number };
}

export interface ConnectedStore {
  id: string;
  name: string;
  address: string;
  type: string;
  cuadrante: string;
  owner: string;
  verified: boolean;
  coords: { x: number; y: number };
}
